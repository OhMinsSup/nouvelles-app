import { NeusralSite } from '@nouvelles/model';
import { injectable, singleton, container } from 'tsyringe';
import dayjs from 'dayjs';
import { ItemsService } from '~/services/items.service';
import { type Job, JobProgress } from '~/jobs/job';
import { envVars } from '~/env';
import { logger } from '~/common/logging/logger';

@injectable()
@singleton()
export class ItemsJob extends JobProgress implements Job {
  public async runner() {
    const today = dayjs().startOf('day').toDate();
    const itemsService = container.resolve(ItemsService);
    logger.info('Starting items job', { job: 'items', type: 'debug', today });

    const has = await itemsService.hasCrawlerCollectedToday(today);
    if (has) {
      logger.info('Already has today item', {
        job: 'items',
        type: 'debug',
        today,
      });
      return;
    }

    const site = new NeusralSite();

    const result: Awaited<ReturnType<typeof site.run>> = [];

    try {
      const data = await site.run({
        browserWSEndpoint:
          envVars.NODE_ENV === 'production'
            ? `${envVars.BLESS_URL}?token=${envVars.BLESS_TOKEN}`
            : undefined,
      });
      result.push(...data);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, { job: 'items', type: 'error', today });
      }
    } finally {
      await site.close();
      logger.info('Completed items job', {
        job: 'items',
        type: 'debug',
        today,
      });
    }

    try {
      await itemsService.generateItems(result, today);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, { job: 'items', type: 'error', today });
      }
    } finally {
      logger.info('Completed generateItems', {
        job: 'items',
        type: 'debug',
        today,
      });
    }
  }
}
