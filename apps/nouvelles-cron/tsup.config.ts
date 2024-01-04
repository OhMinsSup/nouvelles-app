import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: false,
  entry: ['src/**/*.ts'],
  format: 'esm',
  clean: true,
  sourcemap: true,
  target: 'es2022',
});
