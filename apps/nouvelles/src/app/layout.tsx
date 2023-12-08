import '~/assets/css/globals.css';
import { env } from '../../env.mjs';
import { PreloadResources } from '~/libs/react/preload';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { Providers } from './providers';
import { cn } from '~/utils/utils';
import { SITE_CONFIG } from '~/constants/constants';
import type { Metadata } from 'next';

const url = new URL(env.NEXT_PUBLIC_SITE_URL);

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

export default function Layout(props: RoutesProps) {
  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <PreloadResources />
      <head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no"
        />
        <meta
          name="referrer"
          content="origin-when-cross-origin"
          id="meta_referrer"
        />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#FFFFFF" />
      </head>

      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <Providers
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
      </body>
    </html>
  );
}