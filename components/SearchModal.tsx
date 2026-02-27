'use client';

import { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { Search, File, ArrowRight } from 'lucide-react';
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

// Complete search dataset covering all documentation pages
const searchData: SearchResult[] = [
  // Getting Started
  { id: '1', title: 'Welcome to CucumberTrade', content: 'Introduction to CucumberTrade documentation and platform overview', href: '/', category: 'Getting Started' },
  { id: '2', title: 'Vision & Roadmap', content: 'Long-term vision, development roadmap, and future milestones', href: '/vision', category: 'Getting Started' },
  { id: '3', title: 'Platform Overview', content: 'High-level overview of the CucumberTrade platform architecture and key features', href: '/overview', category: 'Getting Started' },
  { id: '4', title: 'User Quickstart', content: 'Step-by-step guide to get started trading with agents on CucumberTrade', href: '/quick-start', category: 'Getting Started' },
  { id: '5', title: 'Developer Installation', content: 'Local development environment setup, dependencies, and build instructions', href: '/installation', category: 'Getting Started' },
  // Core Infrastructure
  { id: '6', title: 'Core Infrastructure', content: 'Overview of the platform infrastructure, agents, arenas, and LLM integration', href: '/infrastructure', category: 'Core Infrastructure' },
  { id: '7', title: 'Agent Mechanics', content: 'How AI trading agents work, strategy creation, lifecycle states, and USDT trading', href: '/infrastructure/agents', category: 'Core Infrastructure' },
  { id: '8', title: 'Arena Execution Engine', content: 'Arena creation, USDT buy-in model, prize pool formula, leverage, and settlement', href: '/infrastructure/arenas', category: 'Core Infrastructure' },
  { id: '9', title: 'LLM Integration Layer', content: 'Supported LLM models including Claude 3.5 Sonnet, GPT-4o, and Gemini 2.5', href: '/infrastructure/llms', category: 'Core Infrastructure' },
  { id: '10', title: 'Data Schemas', content: 'Data structures, JSON schemas, and type definitions for the platform', href: '/infrastructure/schemas', category: 'Core Infrastructure' },
  // Protocol Economics
  { id: '11', title: 'Protocol Economics', content: 'Overview of $CUC token economics, fees, staking, and governance', href: '/economics', category: 'Protocol Economics' },
  { id: '12', title: 'Token Utility & Supply', content: '$CUC token distribution, supply schedule, contract addresses on Base network', href: '/economics/tokenomics', category: 'Protocol Economics' },
  { id: '13', title: 'Fee Routing & Rewards', content: '1% trading fee and 15% protocol fee structure, revenue distribution model', href: '/economics/fees', category: 'Protocol Economics' },
  { id: '14', title: 'Staking & Vesting Logic', content: 'Staking rewards from protocol fees, team vesting schedules and unlock dates', href: '/economics/staking', category: 'Protocol Economics' },
  { id: '15', title: 'Deflationary Mechanisms', content: 'Token burn mechanics, buyback-and-burn from protocol fee allocation', href: '/economics/burn', category: 'Protocol Economics' },
  { id: '16', title: 'Governance & Voting', content: 'On-chain governance proposals, voting process, and decision-making framework', href: '/economics/governance', category: 'Protocol Economics' },
  // Developer Interface
  { id: '17', title: 'Developer Interface', content: 'Overview of developer tools, APIs, smart contracts, and WebSocket streams', href: '/developers', category: 'Developer Interface' },
  { id: '18', title: 'Smart Contract Logic', content: 'Smart contract architecture on Base, contract interactions and integration guide', href: '/developers/contracts', category: 'Developer Interface' },
  { id: '19', title: 'REST API Reference', content: 'REST API endpoints for agents, arenas, trading, and account management', href: '/developers/rest', category: 'Developer Interface' },
  { id: '20', title: 'WebSocket Streams', content: 'Real-time WebSocket feeds for live arena data, prices, and trade updates', href: '/developers/websocket', category: 'Developer Interface' },
  // Ecosystem & Trust
  { id: '21', title: 'Ecosystem & Trust', content: 'Security, audits, deployed addresses, partnerships, and brand assets', href: '/ecosystem', category: 'Ecosystem & Trust' },
  { id: '22', title: 'Security & Audits', content: 'Platform security practices, audit information, and bug bounty program', href: '/ecosystem/security', category: 'Ecosystem & Trust' },
  { id: '23', title: 'Deployed Addresses', content: 'Verified contract addresses on Base network with Basescan links', href: '/ecosystem/deployments', category: 'Ecosystem & Trust' },
  { id: '24', title: 'Partnership Program', content: 'How to partner with CucumberTrade, integration opportunities, and contact info', href: '/ecosystem/partners', category: 'Ecosystem & Trust' },
  { id: '25', title: 'Brand & Media Kit', content: 'Official logos, brand colors, typography guidelines, and downloadable assets', href: '/ecosystem/branding', category: 'Ecosystem & Trust' },
  // Support & Guides
  { id: '26', title: 'Support & Guides', content: 'Tutorials, FAQs, community channels, and legal information', href: '/support', category: 'Support & Guides' },
  { id: '27', title: 'User Tutorials', content: 'Step-by-step tutorials for creating agents, joining arenas, and trading', href: '/support/tutorials', category: 'Support & Guides' },
  { id: '28', title: 'Help Center & FAQs', content: 'Frequently asked questions about $CUC token, agents, arenas, and fees', href: '/support/help', category: 'Support & Guides' },
  { id: '29', title: 'Contact & Community', content: 'Get in touch via hello@cucumber.trade, Twitter @CucumberTrade, and Discord', href: '/support/contact', category: 'Support & Guides' },
  { id: '30', title: 'Legal & Disclaimers', content: 'Terms of service, privacy policy, risk disclaimers, and legal notices', href: '/support/legal', category: 'Support & Guides' },
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
          : 'hover:bg-zinc-100 dark:hover:bg-white/5'
      }`}
    >
      <File className="h-4 w-4 text-zinc-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-zinc-900 dark:text-white truncate">
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
      <ArrowRight className="h-4 w-4 text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
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
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-white/95 dark:bg-black/50 backdrop-blur-xl border border-zinc-200 dark:border-white/[0.08] rounded-md shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-200 dark:border-white/[0.08]">
                <Search className="h-5 w-5 text-zinc-500 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documentation..."
                  autoFocus
                  className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-500 outline-none text-sm"
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-[11px] bg-zinc-100 dark:bg-zinc-800/80 rounded border border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                    <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                    <p>Type to search documentation...</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                    <p>No results found for &ldquo;{query}&rdquo;</p>
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
              <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 rounded border border-zinc-200 dark:border-white/[0.08]">&uarr;</kbd>
                    <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 rounded border border-zinc-200 dark:border-white/[0.08]">&darr;</kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 rounded border border-zinc-200 dark:border-white/[0.08]">&crarr;</kbd>
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
