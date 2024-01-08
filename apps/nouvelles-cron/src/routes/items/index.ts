import { NeusralSite } from '@nouvelles/model';
import { container } from 'tsyringe';
import { startOfDate } from '@nouvelles/date';
import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { ItemsService } from '~/services/items.service';
import { envVars } from '~/env';
import { logger } from '~/common/logging/logger';

const items: FastifyPluginCallback = (fastify, opts, done) => {
  const itemsService = container.resolve(ItemsService);

  fastify.post('/collect/neusral', async (request: FastifyRequest, reply) => {
    const today = startOfDate(new Date(), 'day');

    const loggingOpts = {
      job: 'items',
      type: 'debug',
      today,
    } as const;

    logger.info('Starting items job', loggingOpts);

    const has = await itemsService.hasCrawlerCollectedToday(today);
    if (has) {
      reply.status(200).send({
        ok: true,
        items: [],
        message: 'Already has today item',
      });
      return;
    }

    const site = new NeusralSite();

    const result: Awaited<ReturnType<typeof site.run>> = [];

    try {
      logger.info('Starting crawler', loggingOpts);
      const data = await site.run({
        browserWSEndpoint:
          envVars.NODE_ENV === 'production'
            ? `${envVars.BLESS_URL}?token=${envVars.BLESS_TOKEN}`
            : undefined,
      });
      result.push(...data);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, { ...loggingOpts, type: 'error' });
      }
    } finally {
      await site.close();
      logger.info('Completed items job', loggingOpts);
    }

    try {
      const data = await itemsService.generateItems(result, today);
      reply.status(200).send({
        ok: true,
        items: data,
        message: 'Completed items job',
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, { ...loggingOpts, type: 'error' });
      }
      reply.status(500).send({
        ok: false,
        items: [],
        message: 'Failed items job',
      });
    } finally {
      logger.info('Completed generateItems', loggingOpts);
    }
  });

  done();
};

export default items;
