import { defineConfig } from 'vite';

// Relative base works both on a custom domain and GitHub Pages project paths.
export default defineConfig({
  base: './',
  build: { outDir: 'dist', sourcemap: false },
});
