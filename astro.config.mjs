// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Deployed to GitHub Pages as a project page, so assets live under /Solorio.
  // If you later attach a custom domain, drop `base` and set site to that origin.
  site: 'https://mrspookies.github.io',
  base: '/Solorio',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});