import autoload from '@fastify/autoload';
import Fastify from 'fastify';
import formbody from '@fastify/formbody';
import cookie from '@fastify/cookie';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { SimpleIntervalJob, AsyncTask } from 'toad-scheduler';
import routes from './routes';

const task = new AsyncTask(
  'simple task',
  () => {
    return new Promise((resolve) => {
      console.log('Hello, world!');
      resolve(true);
    });
  },
  (err) => {
    /* handle errors here */
  },
);
const job = new SimpleIntervalJob({ seconds: 20 }, task);

const app = Fastify({
  logger: true,
  trustProxy: true,
});

app.register(cookie, { secret: 'test' });
app.register(formbody);

const __filename = fileURLToPath(import.meta.url);
const splited = dirname(__filename).split('/src');
const cwd = splited.slice(0, -1).join('/src');

app.register(autoload, {
  dir: join(cwd, './src/common/plugins/global'),
  encapsulate: false,
  forceESM: true,
});

app.register(routes);

// `fastify.scheduler` becomes available after initialization.
// Therefore, you need to call `ready` method.
app.ready().then(() => {
  app.scheduler.addSimpleIntervalJob(job);
});

export default app;
