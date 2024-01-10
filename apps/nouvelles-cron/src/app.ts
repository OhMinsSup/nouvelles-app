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
import { envVars } from './env';
import { DEFAULT_TIME_ZONE } from './common/constants/constants';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault(DEFAULT_TIME_ZONE);

const app = Fastify({
  logger: true,
});

app.register(fastifyCron);

app.register(cookie);
app.register(formbody);

const __source = envVars.NODE_ENV === 'production' ? 'dist' : 'src';

const __filename = fileURLToPath(import.meta.url);
const splited = dirname(__filename).split(`/${__source}`);
const cwd = splited.slice(0, -1).join(`/${__source}`);

app.register(autoload, {
  dir: join(cwd, `./${__source}/common/plugins/global`),
  encapsulate: false,
  forceESM: true,
});

app.register(autoload, {
  dir: join(cwd, `./${__source}/routes`),
  encapsulate: false,
  forceESM: true,
});

export default app;
