'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Save scroll position before navigation
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        `scroll-${pathname}`,
        JSON.stringify({
          x: window.scrollX,
          y: window.scrollY,
        })
      );
    };

    // Restore scroll position after navigation
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedPosition) {
        try {
          const { x, y } = JSON.parse(savedPosition);
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            window.scrollTo({
              top: y,
              left: x,
              behavior: 'instant' as ScrollBehavior,
            });
          });
        } catch (e) {
          // Ignore parsing errors
        }
      } else {
        // Scroll to top for new pages
        window.scrollTo(0, 0);
      }
    };

    // Restore position on mount
    restoreScrollPosition();

    // Save position before leaving
    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [pathname]);

  return null;
}
