'use client';
import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { AppProvider } from '~/services/providers/app';
import { Toaster } from '~/components/ui/toaster';

interface ProvidersProps {
  children: React.ReactNode;
  theme?: ThemeProviderProps;
  isCORS?: boolean;
}

export function Providers({ children, theme }: ProvidersProps) {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider {...theme}>
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}
