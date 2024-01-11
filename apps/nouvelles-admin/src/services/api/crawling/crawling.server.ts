'server-only';
import { db } from '@nouvelles/database';
import { selectByCrawler } from '~/services/api/crawling/crawling.selector';

export class CrawlingService {
  all() {
    return db.crawlerDateCollected.findMany({
      select: selectByCrawler,
    });
  }
}

export const crawlingService = new CrawlingService();
