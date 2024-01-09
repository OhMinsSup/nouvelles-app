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
    const loggingOpts = {
      type: 'info' as const,
      jobTime: today.toISOString(),
    };

    const itemsService = container.resolve(ItemsService);

    logger.log('[ItemsJob] Starting items job', loggingOpts);

    const has = await itemsService.hasCrawlerCollectedToday(today);
    if (has) {
      logger.log('[ItemsJob] Already has today item', loggingOpts);
      return;
    }

    const site = new NeusralSite();

    const result: Awaited<ReturnType<typeof site.run>> = [];

    try {
      logger.log('[ItemsJob] Starting crawler', loggingOpts);
      const data = await site.run({
        browserWSEndpoint:
          envVars.NODE_ENV === 'production'
            ? `${envVars.BLESS_URL}?token=${envVars.BLESS_TOKEN}`
            : undefined,
      });
      result.push(...data);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, loggingOpts);
      }
    } finally {
      await site.close();
      logger.log('[ItemsJob] Completed items job', loggingOpts);
    }

    try {
      await itemsService.generateItems(result, today);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, loggingOpts);
      }
    } finally {
      logger.log('[ItemsJob] Completed items job', loggingOpts);
    }
  }
}
