import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'], // single file
  format: 'esm',
  clean: true,
});
