'use client';

import Link from 'next/link';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigation } from '@/contexts/NavigationContext';
import { NavItem } from '@/config/navigation';

const NavGroup = memo(function NavGroup({ item, level = 0 }: { item: NavItem; level?: number }) {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;
  const isActive = pathname === item.href;

  // If it's a leaf node with href, render as link
  if (!hasChildren && item.href) {
    return (
      <Link
        href={item.href}
        prefetch={true}
        className={`flex items-center gap-3 px-3 py-2 text-[13px] rounded-md transition-all duration-200 active:scale-98 ${
          isActive
            ? 'text-white bg-cucumber-green/10 border-l-2 border-cucumber-green'
            : 'text-zinc-400 hover:text-white hover:bg-white/5'
        }`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
      >
        {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
        <span>{item.name}</span>
      </Link>
    );
  }

  // If it has children, render as static header with always-visible children
  return (
    <div>
      {/* Static Header - Non-clickable */}
      <div
        className="flex items-center gap-3 px-3 py-2 text-[13px] text-zinc-500 font-semibold uppercase tracking-wider"
        style={{ paddingLeft: `${level * 12 + 12}px` }}
      >
        {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
        <span>{item.name}</span>
      </div>
      
      {/* Always Visible Children - NO ACCORDION */}
      {hasChildren && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child, childIndex) => (
            <NavGroup key={`${child.name}-${child.href || childIndex}`} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
});

const Sidebar = memo(function Sidebar() {
  const { sidebar } = useNavigation();

  // Don't render sidebar if there's no content
  if (sidebar.length === 0) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[280px] border-r border-white/[0.08] bg-black/50 backdrop-blur-xl hidden lg:block overflow-y-auto smooth-scroll custom-scrollbar">
      <nav className="p-4 space-y-1 contain-paint">
        {sidebar.map((item, index) => (
          <NavGroup key={`${item.name}-${index}`} item={item} />
        ))}
      </nav>
    </aside>
  );
});

export default Sidebar;
