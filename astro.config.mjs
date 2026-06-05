import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aicostplanner.com',
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});
