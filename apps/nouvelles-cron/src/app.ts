import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import autoload from '@fastify/autoload';
import Fastify from 'fastify';
import formbody from '@fastify/formbody';
import fastifyCron from 'fastify-cron';
import cookie from '@fastify/cookie';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import routes from '~/routes';

const app = Fastify({
  logger: true,
});

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(customParseFormat);

app.register(cookie, { secret: 'test' });
app.register(formbody);

app.register(fastifyCron);

const __filename = fileURLToPath(import.meta.url);
const splited = dirname(__filename).split('/src');
const cwd = splited.slice(0, -1).join('/src');

app.register(autoload, {
  dir: join(cwd, './src/common/plugins/global'),
  encapsulate: false,
  forceESM: true,
});

app.register(routes);

export default app;