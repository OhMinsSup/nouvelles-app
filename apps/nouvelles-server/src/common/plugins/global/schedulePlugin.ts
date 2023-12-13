import { FastifyPluginAsync } from 'fastify';
import { fastifySchedule } from '@fastify/schedule';

const schedulePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifySchedule);
};

export default schedulePlugin;
