// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap({
      // Enhanced sitemap configuration
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          de: 'de',
        },
      },
      // Custom filtering and priority
      filter: (page) => {
        // Exclude any admin or private pages
        return !page.includes('/admin/') && !page.includes('/private/');
      },
      customPages: [
        // Add any dynamic pages that might not be auto-discovered
        'https://example.com/solutions/healthcare',
        'https://example.com/solutions/finance',
        'https://example.com/solutions/technology',
        'https://example.com/de/solutions/healthcare',
        'https://example.com/de/solutions/finance',
        'https://example.com/de/solutions/technology',
      ],
    })
  ],
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});