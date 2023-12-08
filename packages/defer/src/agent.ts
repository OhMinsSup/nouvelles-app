import { NouvellesAgent } from '@nouvelles/api';

export const agent = new NouvellesAgent({
  service: process.env.NEXT_PUBLIC_SITE_URL as string,
});
