import { ItemsJob } from '../../../jobs/items.jobs';
import { FastifyPluginCallback } from 'fastify';
import { container } from 'tsyringe';

type JobInfo = {
  name: string;
  cronTime: string;
  jobService: ItemsJob;
};

const schedulePlugin: FastifyPluginCallback = async (fastfiy, opts, done) => {
  const job = container.resolve(ItemsJob);

  const jobInfo: JobInfo = {
    // name: 'item job in every AM 08:00',
    // cronTime: '0 8 * * *', // every AM 08:00
    // jobService: job,
    name: 'item job in every 10 seconds',
    cronTime: '*/10 * * * * *', // every 10 seconds
    jobService: job,
  };

  const createJob = (info: JobInfo) => {
    const { name, cronTime, jobService } = info;
    return fastfiy.cron.createJob({
      name,
      cronTime,
      onTick: async () => {
        if (jobService.isProgressing) return;

        jobService.start();

        await info.jobService.runner();

        jobService.stop();
      },
    });
  };

  const cron = createJob(jobInfo);
  cron.start();

  done();
};

export default schedulePlugin;
