import type { FastifyPluginCallback } from 'fastify';
import { container } from 'tsyringe';
import { logger } from '~/common/logging/logger';
import { envVars } from '~/env';
import { ItemsJob } from '~/jobs/items.jobs';

interface JobInfo {
  name: string;
  cronTime: string;
  jobService: ItemsJob;
}

const schedulePlugin: FastifyPluginCallback = (fastify, _opts, done) => {
  const job = container.resolve(ItemsJob);

  // 크론 표현식 매일 오전 8시에 실행
  const time = envVars.NODE_ENV === 'production' ? '0 8 * * *' : '*/5 * * * *';

  const jobInfo: JobInfo = {
    name: 'item job in every AM 08:00',
    cronTime: time,
    jobService: job,
  };

  const { name, cronTime, jobService } = jobInfo;

  const cron = fastify.cron.createJob({
    name,
    cronTime,
    startWhenReady: true,
    onTick: async () => {
      logger.log('[schedulePlugin] onTick ->', {
        isProgressing: jobService.isProgressing,
        timestamp: new Date().toISOString(),
      });

      if (jobService.isProgressing) return;

      jobService.start();

      await jobService.runner();

      jobService.stop();
    },
  });

  cron.start();

  done();
};

export default schedulePlugin;
