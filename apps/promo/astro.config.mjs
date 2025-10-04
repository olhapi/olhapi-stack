// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    i18n: {
        defaultLocale: 'en', locales: ['en', 'de'], routing: {
            prefixDefaultLocale: false,
        },
    }, integrations: [
        mdx(),
        sitemap({
            // Enhanced sitemap configuration
            i18n: {
                defaultLocale: 'en',
                locales: {
                    de: 'de', en: 'en',
                },
            },
        }),
    ], site: 'https://example.com', vite: {
        plugins: [tailwindcss()],
    },
});
