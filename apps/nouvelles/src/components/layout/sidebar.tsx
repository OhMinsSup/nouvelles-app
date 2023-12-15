'use client';
import React from 'react';
import Link from 'next/link';
import { Icons } from '~/components/icons';
import MainNav from '~/components/layout/main-nav';
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
          )}
          href={PAGE_ENDPOINTS.NEWS.ROOT}
        >
          <Icons.logo className="h-4 w-4" />
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
      <div className="flex items-center space-x-2 mb-5">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Nouvelles
        </h2>
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
