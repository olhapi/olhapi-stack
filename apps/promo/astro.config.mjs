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
        }),
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
