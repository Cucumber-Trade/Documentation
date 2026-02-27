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
        className={`relative flex items-center gap-3 py-2 text-[13px] rounded-md transition-all duration-200 ${
          isActive
            ? 'text-white bg-cucumber-green/8 font-medium'
            : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
        }`}
        style={{ paddingLeft: `${level * 14 + 16}px`, paddingRight: '12px' }}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-cucumber-green rounded-full" />
        )}
        {Icon && <Icon className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />}
        <span>{item.name}</span>
      </Link>
    );
  }

  // If it has children, render as static header with always-visible children
  return (
    <div>
      {/* Static Header */}
      <div
        className="flex items-center gap-3 py-2.5 text-[11px] text-zinc-500 font-semibold uppercase tracking-[0.12em]"
        style={{ paddingLeft: `${level * 14 + 16}px` }}
      >
        {Icon && <Icon className="h-3.5 w-3.5 flex-shrink-0 opacity-50" />}
        <span>{item.name}</span>
      </div>

      {/* Always Visible Children */}
      {hasChildren && (
        <div className="space-y-0.5">
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

  if (sidebar.length === 0) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-[7rem] bottom-0 w-[260px] border-r border-white/[0.06] bg-black/30 backdrop-blur-xl hidden lg:block overflow-y-auto smooth-scroll custom-scrollbar">
      <nav className="px-3 py-6 space-y-1 contain-paint">
        {sidebar.map((item, index) => (
          <NavGroup key={`${item.name}-${index}`} item={item} />
        ))}
      </nav>
    </aside>
  );
});

export default Sidebar;
