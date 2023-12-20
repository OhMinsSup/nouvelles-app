import { NouvellesAgent } from '@nouvelles/api';
import { env } from 'env.mjs';
import { parseUrl } from '~/utils/parseUrl';

let service: string;
if (env.NEXT_PUBLIC_VERCEL_URL) {
  service = parseUrl(env.NEXT_PUBLIC_VERCEL_URL).origin;
} else {
  service = env.NEXT_PUBLIC_SITE_URL;
}

export const agent = new NouvellesAgent({
  service,
  prefix: '/api',
});
