'use client';
import { AxiomWebVitals } from 'next-axiom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { AppProvider } from '~/libs/providers/app';

interface ProvidersProps {
  children: React.ReactNode;
  theme?: ThemeProviderProps;
  isCORS?: boolean;
}

export function Providers({ children, theme, isCORS }: ProvidersProps) {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  console.log('isCORS', isCORS);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider {...theme}>
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      {!isCORS && <AxiomWebVitals />}
    </QueryClientProvider>
  );
}
