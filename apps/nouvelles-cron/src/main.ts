import app from './app';

async function bootstrap() {
  app.listen({ port: 8002, host: '::' });

  process.send?.('ready');
  process.on('SIGINT', () => {
    process.exit(0);
  });
}

bootstrap();
