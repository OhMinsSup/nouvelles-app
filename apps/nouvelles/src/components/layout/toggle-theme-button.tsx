'use client';
import { SkipRenderOnClient } from '@nouvelles/react';
import { useTheme } from 'next-themes';
import React, { useCallback } from 'react';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';

export default function ToogleThemeButton() {
  const { theme } = useTheme();

  const { setTheme } = useTheme();

  const onClick = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <Button onClick={onClick} size="sm" type="button" variant="ghost">
      <SkipRenderOnClient shouldRenderOnClient={() => theme === 'dark'}>
        <Icons.sun className="hidden dark:block" />
      </SkipRenderOnClient>
      <SkipRenderOnClient shouldRenderOnClient={() => theme === 'light'}>
        <Icons.moon className="block dark:hidden" />
      </SkipRenderOnClient>
    </Button>
  );
}
