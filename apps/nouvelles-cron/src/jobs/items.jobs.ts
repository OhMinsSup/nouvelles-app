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
            ? `${envVars.BLESS_URL}?token=${envVars.BLESS_TOKEN}&launch={"headless":"new"}`
            : undefined,
      });
      result.push(...data);
      console.log(result);
      logger.log('[ItemsJob] Completed items job', loggingOpts);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, loggingOpts);
      }
    } finally {
      await site.close();
      site.cleanup();
      logger.log('[ItemsJob] closed crawler', loggingOpts);
    }

    try {
      await itemsService.generateItems(result, date);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, loggingOpts);
      }
    } finally {
      logger.log('[ItemsJob] Completed database insert', loggingOpts);
    }
  }
}
