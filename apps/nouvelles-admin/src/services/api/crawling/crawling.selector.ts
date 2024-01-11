'server-only';
import { Prisma } from '@nouvelles/database';

export const selectByCrawler =
  Prisma.validator<Prisma.CrawlerDateCollectedSelect>()({
    id: true,
    collectingDate: true,
    createdAt: true,
    updatedAt: true,
  });
