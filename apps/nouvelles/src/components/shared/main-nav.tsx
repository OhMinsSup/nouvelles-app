'use client';
import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '~/components/icons';
import { cn } from '~/utils/utils';
import { NAV_CONFIG, NavItem } from '~/constants/nav';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import SkipRenderOnClient from './skip-render-on-client';
import { useTheme } from 'next-themes';

export default function MainNav() {
  return (
    <>
      <MainNav.Logo />
      <div className="flex gap-6 md:gap-10">
        <nav className="hidden gap-6 md:flex">
          {NAV_CONFIG.mainNav.map((item, index) => (
            <MainNav.Item key={index} item={item} />
          ))}
        </nav>
      </div>
      <nav>
        <MainNav.Menu />
      </nav>
    </>
  );
}

interface ItemProps {
  item: NavItem;
}

MainNav.Item = function Item({ item }: ItemProps) {
  switch (item.type) {
    case 'link': {
      return <MainNav.Link item={item} />;
    }
    default: {
      return null;
    }
  }
};

MainNav.Link = function Item({ item }: ItemProps) {
  const pathname = usePathname();
  const href = item.href as string;
  const isActive =
    href === '/' ? pathname === '/' : pathname.startsWith(href) && href !== '/';

  return (
    <Link
      href={item.disabled ? '#' : href}
      className={cn(
        'px-8 py-5 mx-[2px] my-1 flex items-center text-lg font-medium transition-colors hover:bg-foreground/5 hover:rounded-md sm:text-sm',
        isActive ? 'text-foreground' : 'text-foreground/60',
        item.disabled && 'cursor-not-allowed opacity-80',
      )}
    >
      <item.icon />
    </Link>
  );
};

MainNav.Menu = function Item() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const onClick = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          'hover:text-foreground leading-tight',
          open ? 'text-foreground' : 'text-foreground/60',
        )}
      >
        <Icons.alignLeft />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" sideOffset={20}>
        <DropdownMenuItem onClick={onClick}>모드전환</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

MainNav.Logo = function Item() {
  const { systemTheme } = useTheme();

  return (
    <Link href={PAGE_ENDPOINTS.ROOT} className="items-center space-x-2 md:flex">
      <SkipRenderOnClient shouldRenderOnClient={() => systemTheme === 'dark'}>
        <Icons.logo className="hidden h-8 w-8 dark:block" />
      </SkipRenderOnClient>
      <SkipRenderOnClient shouldRenderOnClient={() => systemTheme === 'light'}>
        <Icons.logo className="block h-8 w-8 dark:hidden" />
      </SkipRenderOnClient>
    </Link>
  );
};