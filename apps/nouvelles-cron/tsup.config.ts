import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  entry: ['src/main.ts'],
  format: 'esm',
  clean: true,
  dts: true,
  platform: 'node',
});
