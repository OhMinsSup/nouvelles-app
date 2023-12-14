'use client';
import React from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Icons } from '../icons';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import MainNav from '~/components/layout/main-nav';
import { Button, buttonVariants } from '~/components/ui/button';
import SidebarCategoriesGroup from '~/components/layout/sidebar-categories-group';
import SidebarTagsGroup from '~/components/layout/sidebar-tags-group';
import { cn } from '~/utils/utils';

interface SidebarProps {
  categories?: React.ReactNode;
  tags?: React.ReactNode;
}

export default function Sidebar({ categories, tags }: SidebarProps) {
  return (
    <div className="flex flex-col w-64 h-full bg-white p-5 border-r">
      <div className="flex items-center space-x-2 mb-5">
        <Button size="sm" type="button" variant="ghost">
          <Icons.alignJustify className="h-5 w-5" />
        </Button>
        <span className="font-bold text-lg">Nouvelles</span>
      </div>
      <ScrollArea>
        <div className="px-3 py-2">
          <h2 className="mb-5 pr-4 text-lg font-semibold tracking-tight">
            뉴스 브리핑
          </h2>
          <div className="flex flex-col space-y-5">
            <MainNav />
          </div>
        </div>
        <div className="px-2 py-2">
          <Separator className="w-full border-b" />
        </div>
        {categories ? (
          <SidebarCategoriesGroup>{categories}</SidebarCategoriesGroup>
        ) : null}
        {tags ? <SidebarTagsGroup>{tags}</SidebarTagsGroup> : null}
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
          <Icons.github className="text-gray-400" />
          <span className="text-sm font-medium">Star on GitHub</span>
        </a>
      </div>
    </div>
  );
}
