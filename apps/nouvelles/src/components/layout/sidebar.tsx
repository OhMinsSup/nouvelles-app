'use client';
import React, { useCallback } from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Icons } from '~/components/icons';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import MainNav from '~/components/layout/main-nav';
import { Button, buttonVariants } from '~/components/ui/button';
import SidebarCategoriesGroup from '~/components/layout/sidebar-categories-group';
import { cn } from '~/utils/utils';
import { useLayoutStore } from '~/store/useLayoutStore';

interface SidebarProps {
  categories?: React.ReactNode;
}

export default function Sidebar({ categories }: SidebarProps) {
  const sidebarOpen = useLayoutStore.use.sidebarOpen();

  const setSidebarOpen = useLayoutStore.use.setSidebarOpen();

  const onClick = useCallback(() => {
    setSidebarOpen(!sidebarOpen);
  }, [setSidebarOpen, sidebarOpen]);

  return (
    <div
      className={cn('flex flex-col h-full bg-white border-r', {
        'w-64 p-5': sidebarOpen,
        'w-16 p-2': !sidebarOpen,
      })}
    >
      <div className="flex items-center space-x-2 mb-5">
        <Button onClick={onClick} size="sm" type="button" variant="ghost">
          <Icons.alignJustify className="h-5 w-5" />
        </Button>
        <span
          className={cn('font-bold text-lg', {
            hidden: !sidebarOpen,
          })}
        >
          Nouvelles
        </span>
      </div>
      <ScrollArea>
        <div
          className={cn({
            'px-3 py-2': sidebarOpen,
          })}
        >
          {sidebarOpen ? (
            <h2 className="mb-5 pr-4 text-lg font-semibold tracking-tight">
              뉴스 브리핑
            </h2>
          ) : null}
          <div className="flex flex-col space-y-5">
            <MainNav />
          </div>
        </div>
        <div className="px-2 py-2">
          <Separator className="w-full border-b" />
        </div>
        {sidebarOpen ? (
          <>
            {categories ? (
              <SidebarCategoriesGroup>{categories}</SidebarCategoriesGroup>
            ) : null}
          </>
        ) : null}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <div className="mt-auto">
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
            className={cn('text-sm font-medium', {
              hidden: !sidebarOpen,
            })}
          >
            Star on GitHub
          </span>
        </a>
      </div>
    </div>
  );
}
