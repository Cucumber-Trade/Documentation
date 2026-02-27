import Image from 'next/image';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/[0.06] mt-0">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <Image
              src="/assets/logos/horizontal-logo-black.svg"
              alt="CucumberTrade"
              width={140}
              height={24}
              className="h-6 w-auto opacity-60 dark:hidden"
            />
            <Image
              src="/assets/logos/Main Horizontal Logo.svg"
              alt="CucumberTrade"
              width={140}
              height={24}
              className="h-6 w-auto opacity-60 hidden dark:block"
            />
          </div>

          {/* Center: Links */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://www.cucumber.trade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 dark:text-zinc-500 hover:text-cucumber-green transition-colors duration-200"
            >
              Cucumber.Trade
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <a
              href="https://www.cucumber.trade/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 dark:text-zinc-500 hover:text-cucumber-green transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <a
              href="https://www.cucumber.trade/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 dark:text-zinc-500 hover:text-cucumber-green transition-colors duration-200"
            >
              Terms and Conditions
            </a>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/CucumberTrade"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-500 dark:text-zinc-500 hover:text-cucumber-green transition-colors duration-200"
              aria-label="X (Twitter)"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/Cucumber-Trade"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-500 dark:text-zinc-500 hover:text-cucumber-green transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
