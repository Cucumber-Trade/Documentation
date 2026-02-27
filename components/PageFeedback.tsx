'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThumbsUp, ThumbsDown, Pencil, CircleAlert } from 'lucide-react';

const GITHUB_REPO = 'https://github.com/Cucumber-Trade/Documentation';

export default function PageFeedback() {
  const pathname = usePathname();
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  // Build GitHub URLs based on current page path
  const filePath = pathname === '/'
    ? 'app/(docs)/page.mdx'
    : `app/(docs)${pathname}/page.mdx`;

  const suggestEditsUrl = `${GITHUB_REPO}/edit/main/${filePath}`;
  const raiseIssueUrl = `${GITHUB_REPO}/issues/new?title=${encodeURIComponent(`Docs feedback: ${pathname}`)}&body=${encodeURIComponent(`**Page:** ${pathname}\n\n**Issue:**\n\n`)}`;

  const handleFeedback = (type: 'yes' | 'no') => {
    setFeedback(type);
  };

  return (
    <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-white/[0.06] not-prose">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Feedback question */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500 dark:text-zinc-500">Was this page helpful?</span>
          {feedback ? (
            <span className="text-sm text-cucumber-green font-medium">Thanks for the feedback!</span>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleFeedback('yes')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:text-cucumber-green hover:border-cucumber-green/50 transition-all duration-200"
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                Yes
              </button>
              <button
                onClick={() => handleFeedback('no')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:text-red-400 hover:border-red-400/50 transition-all duration-200"
              >
                <ThumbsDown className="h-3.5 w-3.5" />
                No
              </button>
            </div>
          )}
        </div>

        {/* Right: GitHub links */}
        <div className="flex items-center gap-3">
          <a
            href={suggestEditsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500 hover:text-cucumber-green transition-colors duration-200"
          >
            <Pencil className="h-3.5 w-3.5" />
            Suggest Edits
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <a
            href={raiseIssueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500 hover:text-cucumber-green transition-colors duration-200"
          >
            <CircleAlert className="h-3.5 w-3.5" />
            Raise Issue
          </a>
        </div>
      </div>
    </div>
  );
}
