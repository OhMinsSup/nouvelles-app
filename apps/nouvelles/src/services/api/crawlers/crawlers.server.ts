'server-only';
import { db } from '@nouvelles/database';

export class CrawlersService {
  async lastestCrawlers() {
    const crawlers = await db.crawlerDateCollected.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });

    const [lastCrawlers] = crawlers;

    if (!lastCrawlers) {
      return null;
    }

    return lastCrawlers;
  }
}

export const crawlersService = new CrawlersService();
