import '~/assets/css/globals.css';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { cache } from 'react';
import { getHeaderInDomainInfo } from '@nouvelles/libs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayjs from 'dayjs';
import { env } from 'env.mjs';
import { SITE_CONFIG } from '~/constants/constants';
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

export function generateMetadata(): Metadata {
  return {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    icons: {
      icon: SITE_CONFIG.favicon,
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
              API_HOST: env.API_PREFIX,
            })};
            window.__DOMAIN_INFO__ = ${JSON.stringify(info)}`,
          }}
        />

        <Providers isCORS={isCORS}>{props.children}</Providers>
      </body>
    </html>
  );
}
