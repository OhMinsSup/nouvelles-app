import { NeusralSite } from '@nouvelles/model';
import { container } from 'tsyringe';
import { formatDate } from '@nouvelles/date';
import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { ItemsService } from '~/services/items.service';
import { CommonService } from '~/services/common.service';
import { envVars } from '~/env';
import { logger } from '~/common/logging/logger';

const items: FastifyPluginCallback = (fastify, opts, done) => {
  const itemsService = container.resolve(ItemsService);
  const commonService = container.resolve(CommonService);

  fastify.post('/collect/neusral', async (request: FastifyRequest, reply) => {
    const date = commonService.getStartOfDate(new Date(), 'day');
    const loggingOpts = {
      type: 'info' as const,
      jobTime: formatDate(date),
    };

    logger.log('[API - /collect/neusral] Starting items job', loggingOpts);

    const has = await itemsService.hasCrawlerCollectedToday(date);
    if (has) {
      logger.log(
        '[API - /collect/neusral] Already has today item',
        loggingOpts,
      );
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
      logger.log('[API - /collect/neusral] Starting crawler', loggingOpts);
      const data = await site.run({
        browserWSEndpoint:
          envVars.NODE_ENV === 'production'
            ? `${envVars.BLESS_URL}?token=${envVars.BLESS_TOKEN}`
            : undefined,
      });
      result.push(...data);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, loggingOpts);
      }
    } finally {
      await site.close();
      logger.log('[API - /collect/neusral] Completed items job', loggingOpts);
    }

    try {
      const data = await itemsService.generateItems(result, date);
      reply.status(200).send({
        ok: true,
        items: data,
        message: 'Completed items job',
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error, loggingOpts);
      }
      reply.status(500).send({
        ok: false,
        items: [],
        message: 'Failed items job',
      });
    } finally {
      logger.log('[API - /collect/neusral] Completed items job', loggingOpts);
    }
  });

  done();
};

export default items;
