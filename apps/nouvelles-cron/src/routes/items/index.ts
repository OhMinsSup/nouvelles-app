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
      const data = await site.run({
        browserWSEndpoint:
          envVars.NODE_ENV === 'production'
            ? `${envVars.BLESS_URL}?token=${envVars.BLESS_TOKEN}`
            : undefined,
      });
      result.push(...data);
      console.log('Completed items job');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, { job: 'items', type: 'error', today });
      }
    } finally {
      await site.close();
      logger.info('Completed items job', {
        job: 'items',
        type: 'debug',
        today,
      });
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
        logger.error(error, { job: 'items', type: 'error', today });
      }
      reply.status(500).send({
        ok: false,
        items: [],
        message: 'Failed items job',
      });
    } finally {
      logger.info('Completed generateItems', {
        job: 'items',
        type: 'debug',
        today,
      });
    }
  });

  done();
};

export default items;
