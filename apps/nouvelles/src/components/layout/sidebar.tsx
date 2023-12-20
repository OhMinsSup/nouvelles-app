'use client';
import React from 'react';
import Link from 'next/link';
import { Icons } from '~/components/icons';
import MainNav from '~/components/layout/navigation-area';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/utils/utils';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';

export function SidebarTablet() {
  return (
    <div className="flex flex-col h-full border-r w-16 p-2">
      <div className="flex items-center mb-5 justify-center">
        <Link
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'ghost',
            }),
            'h-7 w-7',
          )}
          href={PAGE_ENDPOINTS.NEWS.ROOT}
        >
          <Icons.logo />
        </Link>
      </div>
      <div className="flex flex-col space-y-5">
        <MainNav />
      </div>
      <div className="mt-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MainNav.GithubLink type="tablet" />
            </TooltipTrigger>
            <TooltipContent>github</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export function SidebarDesktop() {
  return (
    <div className="absolute top-[10px] left-desktop-sidebar h-full">
      <div className="flex items-center space-x-2 mb-5 py-2 px-3">
        <Link
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'ghost',
            }),
            'h-8 w-8',
          )}
          href={PAGE_ENDPOINTS.NEWS.ROOT}
        >
          <Icons.logo />
        </Link>
      </div>
      <div className="flex flex-col space-y-5">
        <MainNav type="desktop" />
      </div>
      <div className="absolute bottom-[30px] w-full">
        <MainNav.GithubLink type="desktop" />
      </div>
    </div>
  );
}
