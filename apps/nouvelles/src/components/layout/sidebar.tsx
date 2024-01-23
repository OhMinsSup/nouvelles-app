'use client';
import React, { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { SkipRenderOnClient, ClientOnly } from '@nouvelles/react-components';
import MainNav from '~/components/layout/navigation-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';

export function SidebarTablet() {
  const { setTheme, theme } = useTheme();

  const onClick = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <div className="flex flex-col h-full border-r w-16 p-2">
      <div className="flex flex-col space-y-5">
        <MainNav />
      </div>
      <div className="mt-auto space-y-3">
        <Button
          className="w-full"
          onClick={onClick}
          size="icon"
          type="button"
          variant="ghost"
        >
          <ClientOnly>
            <SkipRenderOnClient
              shouldRenderOnClient={() => Boolean(theme) && theme === 'light'}
            >
              <Icons.moon />
            </SkipRenderOnClient>
            <SkipRenderOnClient
              shouldRenderOnClient={() => Boolean(theme) && theme === 'dark'}
            >
              <Icons.sun />
            </SkipRenderOnClient>
          </ClientOnly>
        </Button>
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
  const { setTheme, theme } = useTheme();

  const onClick = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <div className="h-full">
      <div className="flex flex-col space-y-5 mt-5">
        <MainNav type="desktop" />
      </div>
      <div className="absolute bottom-[30px] w-full space-y-4">
        <Button
          className="w-full justify-start px-3 py-2"
          onClick={onClick}
          size="icon"
          type="button"
          variant="ghost"
        >
          <ClientOnly>
            <SkipRenderOnClient
              shouldRenderOnClient={() => Boolean(theme) && theme === 'light'}
            >
              <Icons.moon />
            </SkipRenderOnClient>
            <SkipRenderOnClient
              shouldRenderOnClient={() => Boolean(theme) && theme === 'dark'}
            >
              <Icons.sun />
            </SkipRenderOnClient>
            <span className="ml-2">
              {theme === 'light' ? '다크 모드' : '라이트 모드'}
            </span>
          </ClientOnly>
        </Button>
        <MainNav.GithubLink type="desktop" />
      </div>
    </div>
  );
}
