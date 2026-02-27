'use client';

import { X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useNavigation } from '@/contexts/NavigationContext';
import { NavItem } from '@/config/navigation';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavGroup = memo(function NavGroup({ item, level = 0, onLinkClick }: { item: NavItem; level?: number; onLinkClick: () => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;
  const isActive = pathname === item.href;

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  if (!hasChildren && item.href) {
    return (
      <Link
        href={item.href}
        onClick={onLinkClick}
        prefetch={true}
        className={`flex items-center gap-3 px-3 py-2 text-[13px] rounded-md transition-all duration-200 active:scale-98 ${
          isActive
            ? 'text-zinc-900 dark:text-white bg-cucumber-green/10 border-l-2 border-cucumber-green'
            : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5'
        }`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
      >
        {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
        <span>{item.name}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full px-3 py-2 text-[13px] text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 rounded-md transition-colors active:scale-98"
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
          <span className="font-semibold">{item.name}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-1">
              {item.children!.map((child, childIndex) => (
                <NavGroup key={`${child.name}-${child.href || childIndex}`} item={child} level={level + 1} onLinkClick={onLinkClick} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const MobileSidebar = memo(function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { sidebar } = useNavigation();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Handle swipe to close
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    // If swiped left more than 50px, close the sidebar
    if (swipeDistance > 50) {
      onClose();
    }
  }, [onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if no sidebar content
  if (sidebar.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/[0.08] z-50 lg:hidden overflow-y-auto smooth-scroll custom-scrollbar gpu-accelerated"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-white/[0.08]">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Navigation</h2>
              <button
                onClick={onClose}
                className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-white/5"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1 contain-paint">
              {sidebar.map((item, index) => (
                <NavGroup key={`${item.name}-${index}`} item={item} onLinkClick={onClose} />
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

export default MobileSidebar;
