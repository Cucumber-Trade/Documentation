'use client';

import { Search, Github, Command, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useNavigation } from '@/contexts/NavigationContext';
import { useState, useCallback, memo } from 'react';
import MobileSidebar from './MobileSidebar';

const Header = memo(function Header() {
  const { activeTab, tabs } = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSearchClick = useCallback(() => {
    setSearchOpen(true);
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
    window.dispatchEvent(event);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(prev => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-black/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center">
          {/* Zone 1 (Left): Logo + Mobile Menu */}
          <div className="flex flex-1 items-center gap-4">
            {/* Mobile Sidebar Button */}
            <button
              onClick={toggleMobileSidebar}
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-md active:scale-95"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative h-8 w-auto"
              >
                <Image
                  src="/assets/logos/Main Horizontal Logo.svg"
                  alt="Logo"
                  width={200}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </motion.div>
            </Link>
          </div>
          
          {/* Zone 2 (Center): Navigation Tabs with Sliding Underline */}
          <nav className="hidden md:flex flex-none items-center gap-1 relative">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  prefetch={true}
                  className="relative px-4 py-2 text-[13px] transition-colors duration-200"
                >
                  <span className={`relative z-10 ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-white'
                  }`}>
                    {tab.name}
                  </span>
                  
                  {/* Active Tab Indicator - Squared */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/5 rounded-md border border-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Zone 3 (Right): Search Pill + Social Icons */}
          <div className="flex flex-1 items-center justify-end gap-3">
            {/* Search Pill - Command Bar Style */}
            <motion.button
              onClick={handleSearchClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/[0.08] rounded-md text-[13px] text-zinc-500 hover:text-zinc-300 hover:border-white/20 transition-all duration-200"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-1 text-[11px] bg-zinc-800/80 rounded border border-white/[0.08] text-zinc-400">
                <Command className="h-2.5 w-2.5" />
                <span>K</span>
              </kbd>
            </motion.button>
            
            {/* Mobile Search Icon */}
            <motion.button
              onClick={handleSearchClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="sm:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </motion.button>
            
            {/* GitHub Icon */}
            <motion.a
              href="https://github.com/Cucumber-Trade"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </motion.a>
            
            {/* X (Twitter) Icon */}
            <motion.a
              href="https://x.com/TradeOnCucumber"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/[0.08] bg-black/95 backdrop-blur-xl"
        >
          <nav className="px-6 py-4 space-y-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  prefetch={true}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-2 rounded-md text-sm transition-colors active:scale-98 ${
                    isActive
                      ? 'text-white bg-white/5 border-l-2 border-cucumber-green'
                      : 'text-zinc-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileSidebarOpen} onClose={closeMobileSidebar} />
    </header>
  );
});

export default Header;
