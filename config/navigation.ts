import { Home, BookOpen, MessageSquare, Settings, Zap, Rocket, Code, Shield } from 'lucide-react';

export interface NavItem {
  name: string;
  href?: string;
  icon?: any;
  children?: NavItem[];
}

export interface Tab {
  id: string;
  name: string;
  href: string;
  sidebar: NavItem[];
}

// Define the tabs that appear in the header
export const tabs: Tab[] = [
  {
    id: 'docs',
    name: 'Docs',
    href: '/',
    sidebar: [
      {
        name: 'Getting Started',
        icon: Home,
        children: [
          { name: 'Introduction', href: '/' },
          { name: 'Quick Start', href: '/quick-start' },
          { name: 'Installation', href: '/installation' },
        ],
      },
    ],
  },
  {
    id: 'trading-bots',
    name: 'Trading Bots',
    href: '/trading-bots',
    sidebar: [
      {
        name: 'Overview',
        icon: Code,
        children: [
          { name: 'What are Trading Bots?', href: '/trading-bots' },
          { name: 'Bot Architecture', href: '/trading-bots/architecture' },
        ],
      },
      {
        name: 'Built-in Bots',
        icon: Zap,
        children: [
          { name: 'Market Maker Bot', href: '/trading-bots/market-maker' },
          { name: 'Custom Bots', href: '/trading-bots/custom' },
        ],
      },
    ],
  },
  {
    id: 'api',
    name: 'API',
    href: '/api',
    sidebar: [
      {
        name: 'API Reference',
        icon: BookOpen,
        children: [
          { name: 'Overview', href: '/api' },
          { name: 'Authentication', href: '/api/auth' },
          { name: 'Endpoints', href: '/api/endpoints' },
        ],
      },
      {
        name: 'SDK',
        icon: Code,
        children: [
          { name: 'JavaScript/TypeScript', href: '/api/sdk/js' },
          { name: 'Python', href: '/api/sdk/python' },
        ],
      },
    ],
  },
  {
    id: 'roadmap',
    name: 'Roadmap',
    href: '/roadmap',
    sidebar: [
      {
        name: 'Roadmap',
        icon: Rocket,
        href: '/roadmap',
      },
    ],
  },
];

// Helper function to get sidebar for a given path
export function getSidebarForPath(pathname: string): NavItem[] {
  // Find the matching tab based on the pathname
  const matchingTab = tabs.find(tab => {
    if (tab.href === '/') return true;
    return pathname.startsWith(tab.href);
  });

  return matchingTab?.sidebar || [];
}

// Helper function to get active tab for a given path
export function getActiveTab(pathname: string): string {
  const matchingTab = tabs.find(tab => {
    if (tab.href === '/') return true;
    return pathname.startsWith(tab.href);
  });

  return matchingTab?.id || 'docs';
}

// Helper function to get the first page in a tab's sidebar
export function getFirstPageInTab(tabId: string): string {
  const tab = tabs.find(t => t.id === tabId);
  if (!tab) return '/';
  
  // If tab has a direct href, use it
  if (tab.href) return tab.href;
  
  // Otherwise, find the first child with an href
  const findFirstHref = (items: NavItem[]): string | null => {
    for (const item of items) {
      if (item.href) return item.href;
      if (item.children) {
        const childHref = findFirstHref(item.children);
        if (childHref) return childHref;
      }
    }
    return null;
  };
  
  return findFirstHref(tab.sidebar) || tab.href;
}
