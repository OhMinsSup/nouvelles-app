'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// eslint-disable-next-line camelcase
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import SuperJSON from 'superjson';
import type { AppRouter } from '~/libs/trpc/router/root';
import { env } from 'env.mjs';

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  headersPromise: Promise<Headers>;
}) {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(() => new QueryClient());

  // eslint-disable-next-line react/hook-use-state
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: SuperJSON,
      links: [
        loggerLink({
          enabled: (op) =>
            env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            const headers = new Map(await props.headersPromise);
            headers.set('x-trpc-source', 'nextjs-react');
            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return env.SITE_URL;
}
