'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '~/utils/utils';
import type { NavItem } from '~/constants/nav';
import { NAV_CONFIG } from '~/constants/nav';
import { buttonVariants } from '~/components/ui/button';
import { useLayoutStore } from '~/store/useLayoutStore';

export default function MainNav() {
  return (
    <>
      {NAV_CONFIG.mainNav.map((item) => (
        <MainNav.Item item={item} key={item.id} />
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
  const sidebarOpen = useLayoutStore.use.sidebarOpen();

  return (
    <Link
      className={cn(
        buttonVariants({
          variant: 'ghost',
          className: isActive
            ? 'text-foreground font-semibold'
            : 'text-foreground/60 hover:text-foreground',
        }),
        'justify-start space-x-2 w-full',
        {
          'px-3 py-2': !sidebarOpen,
        },
      )}
      href={item.disabled ? '#' : href}
    >
      <item.icon />
      {sidebarOpen ? (
        <>{item.title ? <span>{item.title}</span> : null}</>
      ) : null}
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
