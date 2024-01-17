'server-only';
import { db } from '@nouvelles/database';
import { selectByCrawler } from '~/services/api/crawling/crawling.selector';

export class CrawlingService {
  all() {
    return db.crawlerDateCollected.findMany({
      select: selectByCrawler,
    });
  }

  byId(id: number) {
    return db.crawlerDateCollected.findUnique({
      where: { id },
      select: selectByCrawler,
    });
  }
}

export const crawlingService = new CrawlingService();
