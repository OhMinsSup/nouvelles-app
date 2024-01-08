import { NeusralSite } from '@nouvelles/model';
import { injectable, singleton, container } from 'tsyringe';
import { startOfDate } from '@nouvelles/date';
import { ItemsService } from '~/services/items.service';
import { type Job, JobProgress } from '~/jobs/job';
import { envVars } from '~/env';
import { logger } from '~/common/logging/logger';

@injectable()
@singleton()
export class ItemsJob extends JobProgress implements Job {
  public async runner() {
    const today = startOfDate(new Date(), 'day');
    const itemsService = container.resolve(ItemsService);

    const opts = {
      job: 'items',
      type: 'debug',
      today,
    } as const;

    logger.info('Starting items job', opts);

    const has = await itemsService.hasCrawlerCollectedToday(today);
    if (has) {
      logger.info('Already has today item', opts);
      return;
    }

    const site = new NeusralSite();

    const result: Awaited<ReturnType<typeof site.run>> = [];

    try {
      logger.info('Starting crawler', opts);
      const data = await site.run({
        browserWSEndpoint:
          envVars.NODE_ENV === 'production'
            ? `${envVars.BLESS_URL}?token=${envVars.BLESS_TOKEN}`
            : undefined,
      });
      result.push(...data);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, { ...opts, type: 'error' });
      }
    } finally {
      await site.close();
      logger.info('Completed items job', opts);
    }

    try {
      await itemsService.generateItems(result, today);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, { ...opts, type: 'error' });
      }
    } finally {
      logger.info('Completed generateItems', opts);
    }
  }
}
