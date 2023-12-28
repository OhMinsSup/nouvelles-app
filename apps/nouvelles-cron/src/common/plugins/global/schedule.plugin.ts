import type { FastifyPluginCallback } from 'fastify';
import { container } from 'tsyringe';
import { ItemsJob } from '~/jobs/items.jobs';

interface JobInfo {
  name: string;
  cronTime: string;
  jobService: ItemsJob;
}

const schedulePlugin: FastifyPluginCallback = (fastfiy, _opts, done) => {
  const job = container.resolve(ItemsJob);

  const jobInfo: JobInfo = {
    name: 'item job in every AM 08:00',
    cronTime:
      process.env.NODE_ENV === 'production' ? '0 0 8 * * *' : '0 0 * * * *',
    jobService: job,
  };

  const { name, cronTime, jobService } = jobInfo;

  const cron = fastfiy.cron.createJob({
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
