'use client';
import React, { useId } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { SkipRenderOnClient } from '@nouvelles/react';
// import { useTheme } from 'next-themes';
// import { Icons } from '~/components/icons';
import { cn } from '~/utils/utils';
import type { NavItem } from '~/constants/nav';
import { NAV_CONFIG } from '~/constants/nav';
// import { PAGE_ENDPOINTS } from '~/constants/constants';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '~/components/ui/dropdown-menu';

export default function MainNav() {
  const id = useId();
  return (
    <>
      {NAV_CONFIG.mainNav.map((item) => (
        <MainNav.Item item={item} key={id} />
      ))}
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
  const href = item.href as unknown as string;
  const isActive =
    href === '/' ? pathname === '/' : pathname.startsWith(href) && href !== '/';

  return (
    <Link
      className={cn(
        'flex items-center space-x-3',
        isActive ? 'text-foreground' : 'text-foreground/60',
        item.disabled && 'cursor-not-allowed opacity-80',
      )}
      href={item.disabled ? '#' : href}
    >
      <item.icon />
      {item.title ? <span>{item.title}</span> : null}
    </Link>
  );
};

// MainNav.Menu = function Item() {
//   const [open, setOpen] = useState(false);
//   const { setTheme, theme } = useTheme();

//   const onClick = useCallback(() => {
//     setTheme(theme === 'light' ? 'dark' : 'light');
//   }, [setTheme, theme]);

//   return (
//     <DropdownMenu onOpenChange={setOpen} open={open}>
//       <DropdownMenuTrigger
//         className={cn(
//           'hover:text-foreground leading-tight',
//           open ? 'text-foreground' : 'text-foreground/60',
//         )}
//       >
//         <Icons.alignLeft />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56" sideOffset={20}>
//         <DropdownMenuItem onClick={onClick}>모드전환</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// MainNav.Logo = function Item() {
//   const { systemTheme } = useTheme();

//   return (
//     <Link className="items-center space-x-2 md:flex" href={PAGE_ENDPOINTS.ROOT}>
//       <SkipRenderOnClient shouldRenderOnClient={() => systemTheme === 'dark'}>
//         <Icons.logo className="hidden h-8 w-8 dark:block" />
//       </SkipRenderOnClient>
//       <SkipRenderOnClient shouldRenderOnClient={() => systemTheme === 'light'}>
//         <Icons.logo className="block h-8 w-8 dark:hidden" />
//       </SkipRenderOnClient>
//     </Link>
//   );
// };
