import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  base: './',
  server: {
    open: true,
    port: 6642
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})