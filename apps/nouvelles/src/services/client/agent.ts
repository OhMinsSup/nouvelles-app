import { NouvellesAgent } from '@nouvelles/api';
import { env } from 'env.mjs';

export const agent = new NouvellesAgent({
  service: env.SITE_URL,
  prefix: env.API_PREFIX,
});
