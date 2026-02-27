import { Rocket, Server, Coins, Code, Shield, LifeBuoy } from 'lucide-react';

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

// Define the tabs that appear in the sub-header
export const tabs: Tab[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    href: '/',
    sidebar: [
      {
        name: 'Getting Started',
        icon: Rocket,
        children: [
          { name: 'Vision & Roadmap', href: '/vision' },
          { name: 'Platform Overview', href: '/overview' },
          { name: 'User Quickstart', href: '/quick-start' },
          { name: 'Developer Installation', href: '/installation' },
        ],
      },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Core Infrastructure',
    href: '/infrastructure',
    sidebar: [
      {
        name: 'Core Infrastructure',
        icon: Server,
        children: [
          { name: 'Agent Mechanics', href: '/infrastructure/agents' },
          { name: 'Arena Execution Engine', href: '/infrastructure/arenas' },
          { name: 'LLM Integration Layer', href: '/infrastructure/llms' },
          { name: 'Data Schemas', href: '/infrastructure/schemas' },
        ],
      },
    ],
  },
  {
    id: 'economics',
    name: 'Protocol Economics',
    href: '/economics',
    sidebar: [
      {
        name: 'Protocol Economics',
        icon: Coins,
        children: [
          { name: 'Token Utility & Supply', href: '/economics/tokenomics' },
          { name: 'Fee Routing & Rewards', href: '/economics/fees' },
          { name: 'Staking & Vesting Logic', href: '/economics/staking' },
          { name: 'Deflationary Mechanisms', href: '/economics/burn' },
          { name: 'Governance & Voting', href: '/economics/governance' },
        ],
      },
    ],
  },
  {
    id: 'developers',
    name: 'Developer Interface',
    href: '/developers',
    sidebar: [
      {
        name: 'Developer Interface',
        icon: Code,
        children: [
          { name: 'Smart Contract Logic', href: '/developers/contracts' },
          { name: 'REST API Reference', href: '/developers/rest' },
          { name: 'WebSocket Streams', href: '/developers/websocket' },
        ],
      },
    ],
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem & Trust',
    href: '/ecosystem',
    sidebar: [
      {
        name: 'Ecosystem & Trust',
        icon: Shield,
        children: [
          { name: 'Security & Audits', href: '/ecosystem/security' },
          { name: 'Deployed Addresses', href: '/ecosystem/deployments' },
          { name: 'Partnership Program', href: '/ecosystem/partners' },
          { name: 'Brand & Media Kit', href: '/ecosystem/branding' },
        ],
      },
    ],
  },
  {
    id: 'support',
    name: 'Support & Guides',
    href: '/support',
    sidebar: [
      {
        name: 'Support & Guides',
        icon: LifeBuoy,
        children: [
          { name: 'User Tutorials', href: '/support/tutorials' },
          { name: 'Help Center & FAQs', href: '/support/help' },
          { name: 'Contact & Community', href: '/support/contact' },
          { name: 'Legal & Disclaimers', href: '/support/legal' },
        ],
      },
    ],
  },
];

// Helper function to get sidebar for a given path
export function getSidebarForPath(pathname: string): NavItem[] {
  // Check specific tabs first (non-root paths)
  const specificTab = tabs.find(tab => {
    if (tab.href === '/') return false;
    return pathname.startsWith(tab.href);
  });

  if (specificTab) return specificTab.sidebar;

  // Fall back to root tab
  const rootTab = tabs.find(tab => tab.href === '/');
  return rootTab?.sidebar || [];
}

// Helper function to get active tab for a given path
export function getActiveTab(pathname: string): string {
  // Check specific tabs first (non-root paths)
  const specificTab = tabs.find(tab => {
    if (tab.href === '/') return false;
    return pathname.startsWith(tab.href);
  });

  if (specificTab) return specificTab.id;

  // Fall back to root tab
  return tabs.find(tab => tab.href === '/')?.id || 'getting-started';
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
