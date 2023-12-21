import 'reflect-metadata';

import app from './app';

async function bootstrap() {
  app.listen({ port: 8080, host: '::' });
}

bootstrap();
