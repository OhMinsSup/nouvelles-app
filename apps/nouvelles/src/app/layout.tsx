import '~/assets/css/globals.css';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { cache } from 'react';
import { env } from 'env.mjs';
import { SITE_CONFIG } from '~/constants/constants';
import { Providers } from '~/app/providers';
import { PreloadResources } from '~/libs/react/preload';
import { cn, validateOrigin } from '~/utils/utils';
import { getHeaderInDomainInfo } from '~/libs/domain/domain.server';
import { TRPCReactProvider } from '~/libs/trpc/react';

const url = new URL(env.SITE_URL);

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI',
  ],
  icons: {
    icon: SITE_CONFIG.favicon,
  },
  metadataBase: url,
  manifest: SITE_CONFIG.manifest,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: url.href,
    siteName: SITE_CONFIG.title,
    locale: 'ko_KR',
    type: 'article',
  },
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

interface RoutesProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

// Lazy load headers
const getHeaders = cache(() => Promise.resolve(headers()));

export default async function Layout(props: RoutesProps) {
  const headersList = await getHeaders();
  const info = getHeaderInDomainInfo(headersList);
  const isCROS = validateOrigin(info.domainUrl);
  return (
    <html dir="ltr" lang="ko" suppressHydrationWarning>
      <PreloadResources />
      <head>
        <meta
          content="width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no"
          name="viewport"
        />
        <meta
          content="origin-when-cross-origin"
          id="meta_referrer"
          name="referrer"
        />
        <meta content="light" name="color-scheme" />
        <meta content="#FFFFFF" name="theme-color" />
      </head>
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.__ENV__ = ${JSON.stringify({
              SITE_URL: env.SITE_URL,
              NODE_ENV: env.NODE_ENV,
            })};
            window.__DOMAIN_INFO__ = ${JSON.stringify(info)}`,
          }}
        />
        <TRPCReactProvider headersPromise={getHeaders()}>
          <Providers
            isCORS={isCROS}
            theme={{
              attribute: 'class',
              defaultTheme: 'system',
              enableSystem: true,
              disableTransitionOnChange: true,
            }}
          >
            {props.children}
            {props.modal}
          </Providers>
          <ReactQueryDevtools initialIsOpen={false} />
        </TRPCReactProvider>
        {isCROS && env.NODE_ENV === 'production' ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
