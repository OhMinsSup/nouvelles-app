import { NeusralSite } from '@nouvelles/model';
import { injectable, singleton, container } from 'tsyringe';
import { formatDate } from '@nouvelles/date';
import { ItemsService } from '~/services/items.service';
import { type Job, JobProgress } from '~/jobs/job';
import { envVars } from '~/env';
import { logger } from '~/common/logging/logger';
import { CommonService } from '~/services/common.service';

@injectable()
@singleton()
export class ItemsJob extends JobProgress implements Job {
  public async runner() {
    const commonService = container.resolve(CommonService);
    const itemsService = container.resolve(ItemsService);

    const date = commonService.getStartOfDate(new Date(), 'day');
    const loggingOpts = {
      type: 'info' as const,
      jobTime: formatDate(date),
    };

    logger.log('[ItemsJob] Starting items job', loggingOpts);

    const has = await itemsService.hasCrawlerCollectedToday(date);
    if (has) {
      logger.log('[ItemsJob] Already has today item');
      return;
    }

    const site = new NeusralSite();

    const result: Awaited<ReturnType<typeof site.run>> = [];

    try {
      logger.log('[ItemsJob] Starting crawler');
      const data = await site.run({
        browserWSEndpoint:
          envVars.NODE_ENV === 'production'
            ? `${envVars.BLESS_URL}?token=${envVars.BLESS_TOKEN}&launch={"headless":"new"}`
            : undefined,
      });
      result.push(...data);

      await site.close();

      logger.log('[ItemsJob] Completed crawler');
    } catch (error) {
      await site.close();
      logger.log('[ItemsJob] Error crawler');
      if (error instanceof Error) {
        logger.error(error, loggingOpts);
      }
    }

    try {
      logger.log('[ItemsJob] Starting database insert');
      await itemsService.generateItems(result, date);
      logger.log('[ItemsJob] Completed database insert');
    } catch (error) {
      logger.log('[ItemsJob] Error database insert');
      if (error instanceof Error) {
        logger.error(error, loggingOpts);
      }
    }
  }
}
