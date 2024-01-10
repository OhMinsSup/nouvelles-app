import type { FastifyPluginCallback } from 'fastify';
import { container } from 'tsyringe';
import { DEFAULT_TIME_ZONE } from '~/common/constants/constants';
import { logger } from '~/common/logging/logger';
import { envVars } from '~/env';
import type { ItemsJob } from '~/jobs/items.jobs';
import { CommonService } from '~/services/common.service';

interface JobInfo {
  name: string;
  cronTime: string;
  jobService: ItemsJob;
}

const schedulePlugin: FastifyPluginCallback = (fastify, _opts, done) => {
  // const job = container.resolve(ItemsJob);

  // const commonService = container.resolve(CommonService);

  // const jobInfo: JobInfo = {
  //   name: 'item job in every AM 08:00',
  //   cronTime:
  //     // 매일 오전 8시에 실행
  //     envVars.NODE_ENV === 'production' ? '0 8 * * *' : '*/5 * * * *',
  //   jobService: job,
  // };

  // const { name, cronTime, jobService } = jobInfo;

  // const cron = fastify.cron.createJob({
  //   name,
  //   cronTime,
  //   timeZone: DEFAULT_TIME_ZONE,
  //   startWhenReady: true,
  //   onTick: async () => {
  //     logger.log('[schedulePlugin] onTick ->', {
  //       isProgressing: jobService.isProgressing,
  //       serverTime: commonService.getServerTime(),
  //       tzTime: commonService.getTimezoneServerTime(),
  //     });

  //     if (jobService.isProgressing) return;

  //     jobService.start();

  //     await jobService.runner();

  //     jobService.stop();
  //   },
  // });

  // cron.start();

  done();
};

export default schedulePlugin;
