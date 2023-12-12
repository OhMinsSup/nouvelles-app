import app from './app';

async function main() {
  await app.listen({ port: 8002, host: '::' });

  process.send?.('ready');
  process.on('SIGINT', function () {
    process.exit(0);
  });
}

main();
