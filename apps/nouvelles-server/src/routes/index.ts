import { format } from 'date-fns'
import { FastifyPluginCallback } from 'fastify'

const api: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/ping', (request, reply) => {
    const now = new Date()
    const serverTime = format(now, 'yyyy-MM-dd HH:mm:ss')
    reply.send({ serverTime })
  })
  done()
}

const routes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(api, {
    prefix: '/api',
  })

  done()
}

export default routes