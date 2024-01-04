import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Fastify from 'fastify';
import autoload from '@fastify/autoload';
import formbody from '@fastify/formbody';
import fastifyCron from 'fastify-cron';
import cookie from '@fastify/cookie';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import routes from '~/routes';

const app = Fastify({
  logger: true,
});

app.register(fastifyCron);

dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

app.register(cookie);
app.register(formbody);

const __source = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

const __filename = fileURLToPath(import.meta.url);
const splited = dirname(__filename).split(`/${__source}`);
const cwd = splited.slice(0, -1).join(`/${__source}`);

app.register(autoload, {
  dir: join(cwd, `./${__source}/common/plugins/global`),
  encapsulate: false,
  forceESM: true,
});

app.register(routes);

export default app;
