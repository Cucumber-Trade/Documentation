'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAdjacentPages } from '@/config/navigation';

export default function PageNavigation() {
  const pathname = usePathname();
  const { prev, next } = getAdjacentPages(pathname);

  if (!prev && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-zinc-200 dark:border-white/[0.06] not-prose">
      <div className="grid grid-cols-2 gap-4">
        {/* Previous Page */}
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-3 p-4 rounded-lg border border-zinc-200 dark:border-white/[0.08] hover:border-cucumber-green/50 bg-transparent hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4 text-zinc-500 dark:text-zinc-500 group-hover:text-cucumber-green transition-colors flex-shrink-0" />
            <div className="min-w-0">
              <span className="block text-xs text-zinc-500 dark:text-zinc-500 mb-1">Previous</span>
              <span className="block text-sm font-medium text-zinc-700 dark:text-white group-hover:text-cucumber-green transition-colors truncate">
                {prev.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {/* Next Page */}
        {next ? (
          <Link
            href={next.href}
            className="group flex items-center justify-end gap-3 p-4 rounded-lg border border-zinc-200 dark:border-white/[0.08] hover:border-cucumber-green/50 bg-transparent hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-all duration-200 text-right"
          >
            <div className="min-w-0">
              <span className="block text-xs text-zinc-500 dark:text-zinc-500 mb-1">Next</span>
              <span className="block text-sm font-medium text-zinc-700 dark:text-white group-hover:text-cucumber-green transition-colors truncate">
                {next.title}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-500 dark:text-zinc-500 group-hover:text-cucumber-green transition-colors flex-shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
