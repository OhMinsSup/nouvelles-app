import type { FastifyPluginCallback } from 'fastify';
import { container } from 'tsyringe';
import { envVars } from '~/env';
import { ItemsJob } from '~/jobs/items.jobs';

interface JobInfo {
  name: string;
  cronTime: string;
  jobService: ItemsJob;
}

const schedulePlugin: FastifyPluginCallback = (fastify, _opts, done) => {
  const job = container.resolve(ItemsJob);

  const jobInfo: JobInfo = {
    name: 'item job in every AM 08:00',
    cronTime:
      // 매일 오전 8시에 실행
      envVars.NODE_ENV === 'production' ? '0 0 8 * * *' : '*/5 * * * *',
    jobService: job,
  };

  const { name, cronTime, jobService } = jobInfo;

  const cron = fastify.cron.createJob({
    name,
    cronTime,
    onTick: async () => {
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
