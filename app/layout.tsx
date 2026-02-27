import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Footer from "@/components/layout/Footer";
import SearchModal from "@/components/SearchModal";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollRestoration from "@/components/ScrollRestoration";

export const metadata: Metadata = {
  title: "CucumberTrade Documentation",
  description: "The ultimate trading infrastructure for modern finance.",
  icons: {
    icon: [
      { url: '/assets/favicons/Favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/logos/Logo Symbol.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/assets/logos/Logo Symbol.svg', type: 'image/svg+xml' },
    ],
    other: [
      { rel: 'mask-icon', url: '/assets/favicons/Favicon.svg', color: '#55E461' },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#04070B',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className="antialiased bg-white text-zinc-900 dark:bg-black dark:text-white transition-colors duration-200">
        <ThemeProvider>
          <NavigationProvider>
            <ScrollRestoration />

            {/* Header - Fixed at top */}
            <Header />

            {/* Three-column layout */}
            <div className="flex">
              {/* Left Sidebar - Fixed */}
              <Sidebar />

              {/* Main Content - Center column with max-w-3xl */}
              <main className="flex-1 lg:pl-[260px] xl:pr-[240px] pt-[7rem] min-h-screen">
                {children}
                <Footer />
              </main>

              {/* Right Sidebar - Fixed (Table of Contents) */}
              <RightSidebar />
            </div>

            {/* Search Modal */}
            <SearchModal />
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
