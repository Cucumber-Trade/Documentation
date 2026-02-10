'use client';

import { createContext, useContext, ReactNode, useMemo, memo } from 'react';
import { usePathname } from 'next/navigation';
import { tabs, getSidebarForPath, getActiveTab, NavItem } from '@/config/navigation';

interface NavigationContextType {
  activeTab: string;
  sidebar: NavItem[];
  tabs: typeof tabs;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = memo(function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Memoize computed values to prevent unnecessary recalculations
  const activeTab = useMemo(() => getActiveTab(pathname), [pathname]);
  const sidebar = useMemo(() => getSidebarForPath(pathname), [pathname]);

  const value = useMemo(
    () => ({ activeTab, sidebar, tabs }),
    [activeTab, sidebar]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
});

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
