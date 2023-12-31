import type { Config } from 'tailwindcss';
import sharedConfig from '@nouvelles/tailwind';

const config: Pick<Config, 'content' | 'presets' | 'darkMode'> = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class'],
  presets: [sharedConfig],
};

export default config;
