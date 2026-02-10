'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface CardProps {
  title?: string;
  icon?: LucideIcon;
  href?: string;
  children: ReactNode;
}

export default function Card({ title, icon: Icon, href, children }: CardProps) {
  const content = (
    <div className="flex flex-col h-full">
      {(title || Icon) && (
        <div className="flex items-center gap-3 mb-3">
          {Icon && (
            <motion.div
              className="p-2 bg-cucumber-green/10 rounded-md"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(85, 228, 97, 0.2)' }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="h-5 w-5 text-cucumber-green" />
            </motion.div>
          )}
          {title && (
            <h3 className="text-lg font-semibold text-white transition-colors duration-200 group-hover:text-cucumber-green">{title}</h3>
          )}
        </div>
      )}
      <div className="text-zinc-400 text-sm leading-relaxed transition-colors duration-200 group-hover:text-zinc-300">
        {children}
      </div>
    </div>
  );

  const className = "group block p-6 rounded-md border border-white/[0.08] bg-black/50 backdrop-blur-xl hover:border-cucumber-green/50 hover:bg-gradient-to-br hover:from-white/5 transition-all duration-300 will-change-transform";

  if (href) {
    const isExternal = href.startsWith('http');
    
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={className}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <Link href={href} className="block">
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={className}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {content}
    </motion.div>
  );
}
