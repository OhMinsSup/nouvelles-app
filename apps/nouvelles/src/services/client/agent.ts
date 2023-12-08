import { NouvellesAgent } from '@nouvelles/api';
import { env } from 'env.mjs';

export const agent = new NouvellesAgent({ service: env.NEXT_PUBLIC_SITE_URL });
