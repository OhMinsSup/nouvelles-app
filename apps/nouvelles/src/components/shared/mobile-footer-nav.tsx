'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SkipRenderOnClient, useMediaQuery } from '@nouvelles/react';
import { cn } from '~/utils/utils';
import type { NavItem } from '~/constants/nav';
import { NAV_CONFIG } from '~/constants/nav';

export default function MobileFooterNav() {
  const isMobile = useMediaQuery('(max-width: 768px)', false);
  return (
    <SkipRenderOnClient shouldRenderOnClient={() => isMobile}>
      <nav className="fixed bottom-0 z-40 flex w-full items-center justify-around border-t bg-white py-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 md:hidden">
        {NAV_CONFIG.mainNav.map((item, index) => (
          <div className="relative w-max" key={index}>
            <MobileFooterNav.Item item={item} />
          </div>
        ))}
      </nav>
    </SkipRenderOnClient>
  );
}

interface ItemProps {
  item: NavItem;
}

MobileFooterNav.Item = function Item({ item }: ItemProps) {
  switch (item.type) {
    case 'link': {
      return <MobileFooterNav.Link item={item} />;
    }
    default: {
      return null;
    }
  }
};

MobileFooterNav.Link = function Item({ item }: ItemProps) {
  const pathname = usePathname();
  const href = item.href as string;
  const isActive =
    href === '/' ? pathname === '/' : pathname.startsWith(href) && href !== '/';

  return (
    <Link
      className={cn(
        'h-10 p-4 flex items-center text-lg font-medium transition-colors hover:bg-foreground/5 hover:rounded-md sm:text-sm',
        isActive ? 'text-foreground' : 'text-foreground/60',
        item.disabled && 'cursor-not-allowed opacity-80',
      )}
      href={item.disabled ? '#' : href}
    >
      <item.icon />
    </Link>
  );
};
