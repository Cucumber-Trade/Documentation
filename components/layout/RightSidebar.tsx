'use client';

import { useEffect, useState, useCallback, memo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const RightSidebar = memo(function RightSidebar() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 128; // Account for fixed header + sub-header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL without triggering navigation
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  }, []);

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    headingElementsRef.current = {};

    // Small delay to ensure DOM is fully rendered after navigation
    const timeoutId = setTimeout(() => {
      // Extract h2 and h3 headings from prose content only (exclude .not-prose cards)
      const headings = document.querySelectorAll('article h2, article h3');
      const tocItems: TocItem[] = Array.from(headings)
        .filter((heading) => {
          // Skip headings without a valid id
          if (!heading.id) return false;
          // Skip headings inside .not-prose containers (card titles, etc.)
          if (heading.closest('.not-prose')) return false;
          return true;
        })
        .map((heading) => ({
          id: heading.id,
          text: heading.textContent?.replace(/^Link to section\s*/, '') || '',
          level: parseInt(heading.tagName.charAt(1)),
        }));
      setToc(tocItems);

      // Reset active ID when page changes
      setActiveId('');

      // Optimized Intersection Observer for active heading
      observerRef.current = new IntersectionObserver(
        (entries) => {
          // Store all entries
          entries.forEach((entry) => {
            headingElementsRef.current[entry.target.id] = entry;
          });

          // Use requestAnimationFrame to batch DOM updates
          requestAnimationFrame(() => {
            // Find the most visible heading
            const visibleHeadings = Object.values(headingElementsRef.current)
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => {
                // Prioritize headings closer to the top of the viewport
                return a.boundingClientRect.top - b.boundingClientRect.top;
              });

            if (visibleHeadings.length > 0) {
              setActiveId(visibleHeadings[0].target.id);
            }
          });
        },
        {
          rootMargin: '-80px 0px -70% 0px',
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        }
      );

      // Only observe headings that are in the TOC
      const tocIds = new Set(tocItems.map(item => item.id));
      headings.forEach((heading) => {
        if (heading.id && tocIds.has(heading.id)) {
          observerRef.current?.observe(heading);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]);

  if (toc.length === 0) {
    return null;
  }

  return (
    <aside className="fixed right-0 top-[7rem] bottom-0 w-[240px] border-l border-zinc-200 dark:border-white/[0.08] bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md hidden xl:block overflow-y-auto smooth-scroll custom-scrollbar transition-colors duration-200">
      <nav className="p-6 contain-paint">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          On this page
        </h4>
        <AnimatePresence mode="wait">
          {toc.length > 0 ? (
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {toc.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <motion.li
                    key={item.id}
                    style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleClick(e, item.id)}
                      className={`relative flex items-center text-[13px] py-1.5 transition-all duration-200 ${
                        isActive
                          ? 'text-cucumber-green font-semibold translate-x-1'
                          : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:translate-x-0.5'
                      }`}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layoutId="activeIndicator"
                            className="absolute -left-3 w-1 h-4 bg-cucumber-green rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>
                      <span className="truncate">{item.text}</span>
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          ) : (
            <motion.p
              className="text-xs text-zinc-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No headings found
            </motion.p>
          )}
        </AnimatePresence>
      </nav>
    </aside>
  );
});

export default RightSidebar;
