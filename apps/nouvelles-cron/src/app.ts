import Fastify from 'fastify';
import formbody from '@fastify/formbody';
import fastifyCron from 'fastify-cron';
import cookie from '@fastify/cookie';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import routes from '~/routes';
import corsPlugin from '~/common/plugins/global/cors.plugin';
import keyPlugin from '~/common/plugins/global/key-api.plugin';
import schedulePlugin from '~/common/plugins/global/schedule.plugin';

const app = Fastify({
  logger: true,
});

dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

app.register(cookie);
app.register(formbody);
app.register(fastifyCron);
app.register(corsPlugin);
app.register(keyPlugin);
app.register(schedulePlugin);

app.register(routes);

export default app;
