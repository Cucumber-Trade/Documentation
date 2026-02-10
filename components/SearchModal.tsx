'use client';

import { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { Search, File, ArrowRight, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import FlexSearch from 'flexsearch';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  href: string;
  category: string;
}

// Mock search data - will be replaced with actual content indexing
const searchData: SearchResult[] = [
  { id: '1', title: 'Introduction', content: 'Get started with the documentation', href: '/', category: 'Getting Started' },
  { id: '2', title: 'Quick Start', content: 'Quick start guide', href: '/quick-start', category: 'Getting Started' },
  { id: '3', title: 'Installation', content: 'Installation guide', href: '/installation', category: 'Getting Started' },
];

const SearchResultItem = memo(function SearchResultItem({
  result,
  isSelected,
  onSelect,
  onHover
}: {
  result: SearchResult;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
        isSelected
          ? 'bg-cucumber-green/10 border-l-2 border-cucumber-green'
          : 'hover:bg-white/5'
      }`}
    >
      <File className="h-4 w-4 text-zinc-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-white truncate">
            {result.title}
          </span>
          <span className="text-xs text-zinc-500 flex-shrink-0">
            {result.category}
          </span>
        </div>
        <p className="text-xs text-zinc-500 truncate">
          {result.content}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 text-zinc-600 flex-shrink-0" />
    </button>
  );
});

const SearchModal = memo(function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Initialize FlexSearch index with useMemo
  const searchIndex = useMemo(() => {
    const index = new FlexSearch.Index({
      tokenize: 'forward',
      cache: true,
    });

    searchData.forEach((item, idx) => {
      index.add(idx, `${item.title} ${item.content} ${item.category}`);
    });

    return index;
  }, []);

  const handleSelect = useCallback((result: SearchResult) => {
    router.push(result.href);
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, [router]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openModal();
      }

      // Escape to close
      if (e.key === 'Escape') {
        closeModal();
      }

      // Arrow navigation
      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, handleSelect, openModal, closeModal]);

  // Search functionality with debouncing
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    // Use requestAnimationFrame for smoother updates
    const rafId = requestAnimationFrame(() => {
      const searchResults = searchIndex.search(query, { limit: 10 });
      const filteredResults = searchResults
        .map((idx) => searchData[idx as number])
        .filter(Boolean);

      setResults(filteredResults);
      setSelectedIndex(0);
    });

    return () => cancelAnimationFrame(rafId);
  }, [query, searchIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-black/50 backdrop-blur-xl border border-white/[0.08] rounded-md shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.08]">
                <Search className="h-5 w-5 text-zinc-500 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documentation..."
                  autoFocus
                  className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-sm"
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-[11px] bg-zinc-800/80 rounded border border-white/[0.08] text-zinc-400">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                    <Command className="h-8 w-8 mx-auto mb-3 opacity-50" />
                    <p>Type to search documentation...</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                    <p>No results found for "{query}"</p>
                  </div>
                ) : (
                  <div className="py-2 contain-paint">
                    {results.map((result, index) => (
                      <SearchResultItem
                        key={result.id}
                        result={result}
                        isSelected={index === selectedIndex}
                        onSelect={() => handleSelect(result)}
                        onHover={() => setSelectedIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.08] bg-zinc-900/50">
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-800/80 rounded border border-white/[0.08]">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-zinc-800/80 rounded border border-white/[0.08]">↓</kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-800/80 rounded border border-white/[0.08]">↵</kbd>
                    <span>Select</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
});

export default SearchModal;
