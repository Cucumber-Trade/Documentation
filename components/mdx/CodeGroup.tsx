'use client';

import { ReactNode, useState, Children, isValidElement } from 'react';
import { motion } from 'framer-motion';

interface CodeGroupProps {
  children: ReactNode;
}

interface CodeProps {
  title?: string;
  children: ReactNode;
}

export function Code({ title, children }: CodeProps) {
  return (
    <div data-title={title}>
      {children}
    </div>
  );
}

export default function CodeGroup({ children }: CodeGroupProps) {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = Children.toArray(children).filter(isValidElement).map((child: any) => {
    return {
      title: child.props['data-title'] || child.props.title || 'Code',
      content: child,
    };
  });

  return (
    <div className="my-6 rounded-md border border-white/[0.08] bg-zinc-900/50 overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 pt-3 border-b border-white/[0.08] bg-zinc-900/80">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className="relative px-4 py-2 text-sm transition-colors"
          >
            <span className={`relative z-10 ${
              activeTab === index ? 'text-white' : 'text-zinc-500 hover:text-white'
            }`}>
              {tab.title}
            </span>
            
            {activeTab === index && (
              <motion.div
                layoutId="activeCodeTab"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-cucumber-green"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={activeTab === index ? 'block' : 'hidden'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
