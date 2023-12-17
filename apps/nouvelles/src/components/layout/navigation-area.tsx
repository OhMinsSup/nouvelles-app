'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '~/components/icons';
import { cn } from '~/utils/utils';
import type { NavItem } from '~/constants/nav';
import { NAV_CONFIG } from '~/constants/nav';
import { buttonVariants } from '~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

interface NavigationAreaProps {
  type?: 'desktop' | 'tablet' | 'mobile' | 'all';
}

export default function NavigationArea({ type = 'all' }: NavigationAreaProps) {
  return (
    <>
      {NAV_CONFIG.mainNav.map((item) => (
        <NavigationArea.Item item={item} key={`type-${item.id}`} type={type} />
      ))}
    </>
  );
}

interface ItemProps extends NavigationAreaProps {
  item: NavItem;
}

NavigationArea.Item = function Item({ item, type }: ItemProps) {
  switch (item.type) {
    case 'link': {
      return <NavigationArea.Link item={item} type={type} />;
    }
    default: {
      return null;
    }
  }
};

NavigationArea.Link = function Item({ item, type }: ItemProps) {
  const pathname = usePathname();
  const href = item.href as unknown as string;
  const isActive =
    href === '/' ? pathname === '/' : pathname.startsWith(href) && href !== '/';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: isActive
                  ? 'text-foreground font-bold'
                  : 'text-muted-foreground hover:text-foreground',
              }),
              'justify-start space-x-2 w-full px-3 py-2',
            )}
            href={item.disabled ? '#' : href}
          >
            <item.icon />
            {type === 'desktop' ? (
              <>{item.title ? <span>{item.title}</span> : null}</>
            ) : null}
          </Link>
        </TooltipTrigger>
        <TooltipContent
          className={cn({
            'sr-only': type === 'desktop',
          })}
        >
          {item.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type GithubLinkProps = NavigationAreaProps;

NavigationArea.GithubLink = function Item({ type }: GithubLinkProps) {
  return (
    <a
      className={cn(
        buttonVariants({
          variant: 'ghost',
          className: 'rounded-md space-x-2 w-full justify-start',
        }),
      )}
      href="https://github.com/OhMinsSup/nouvelles-app"
      rel="noopener"
      target="_blank"
    >
      <Icons.github />
      <span
        className={cn({
          'sr-only': type === 'tablet',
        })}
      >
        GitHub
      </span>
    </a>
  );
};
