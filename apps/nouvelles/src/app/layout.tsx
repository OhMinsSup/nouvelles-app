import '~/assets/css/globals.css';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { AxiomWebVitals } from 'next-axiom';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { cache } from 'react';
import { getHeaderInDomainInfo } from '@nouvelles/libs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayjs from 'dayjs';
import { env } from 'env.mjs';
import { PAGE_ENDPOINTS, SITE_CONFIG } from '~/constants/constants';
import { Providers } from '~/app/providers';
import { PreloadResources } from '~/services/react/preload';
import { cn, validateOrigin } from '~/utils/utils';
import 'dayjs/locale/ko'; //한국어

dayjs.locale('ko');
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await getHeaders();
  const info = getHeaderInDomainInfo(headersList);
  const metadataBase = new URL(info.domainUrl);
  return {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords,
    icons: {
      icon: SITE_CONFIG.favicon,
    },
    metadataBase,
    manifest: SITE_CONFIG.manifest,
    alternates: {
      canonical: PAGE_ENDPOINTS.NEWS.ROOT,
    },
    openGraph: {
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      url: metadataBase.href,
      siteName: SITE_CONFIG.title,
      locale: 'ko_KR',
      type: 'website',
    },
  };
}

interface RoutesProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

// Lazy load headers
const getHeaders = cache(() => Promise.resolve(headers()));

export default async function Layout(props: RoutesProps) {
  const headersList = await getHeaders();
  const info = getHeaderInDomainInfo(headersList);
  const isCORS = validateOrigin(info.domainUrl);
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
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
        />
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
              API_PREFIX: env.API_PREFIX,
            })};
            window.__DOMAIN_INFO__ = ${JSON.stringify(info)}`,
          }}
        />
        <Providers isCORS={isCORS}>{props.children}</Providers>
        {isCORS && env.NODE_ENV === 'production' ? (
          <>
            <AxiomWebVitals />
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
