'use client';
import React from 'react';
import { useMemoizedFn } from '../useMemoizedFn';
import { isBrowser } from '../browser/assertion';

export const MEDIA_QUERY = {
  xxlarge: '(min-width: 1920px)',
  xlarge: '(min-width: 1440px)',
  large: '(min-width: 1280px)',
  medium: '(min-width: 1024px)',
  small: '(max-width: 768px)',
  xsmall: '(max-width: 640px)',
  xxsmall: '(max-width: 375px)',
};

export function useMediaQuery(query: string, serverFallback: boolean): boolean {
  const getServerSnapshot = useMemoizedFn(() => serverFallback);

  const [getSnapshot, subscribe] = React.useMemo(() => {
    if (!isBrowser) {
      return [
        getServerSnapshot,
        () => () => {
          /* noop */
        },
      ];
    }

    const mediaQueryList = window.matchMedia(query);

    return [
      () => mediaQueryList.matches,
      (notify: () => void) => {
        mediaQueryList.addEventListener('change', notify);
        return () => {
          mediaQueryList.removeEventListener('change', notify);
        };
      },
    ];
  }, [getServerSnapshot, query]);

  return React.useSyncExternalStore(
    subscribe,
    // Fallback to getServerSnapshot only required for React 17
    isBrowser ? getSnapshot : getServerSnapshot,
    getServerSnapshot,
  );
}
