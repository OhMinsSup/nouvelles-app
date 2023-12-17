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
    // name: 'item job in every AM 08:00',
    // cronTime: '0 8 * * *', // every AM 08:00
    // jobService: job,
    name: 'item job in every 10 seconds',
    cronTime: '*/10 * * * * *', // every 10 seconds
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
