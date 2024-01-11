'use client';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from '~/services/providers/app';
import { Toaster } from '~/components/ui/toaster';

interface ProvidersProps {
  children: React.ReactNode;

  isCORS?: boolean;
}

export function Providers({ children }: ProvidersProps) {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem
        >
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
}
