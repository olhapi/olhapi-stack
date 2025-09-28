import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { lingui } from '@lingui/vite-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        viteReact({
            babel: {
                plugins: ['babel-plugin-react-compiler', '@lingui/babel-plugin-lingui-macro'],
            },
        }),
        tailwindcss(),
        lingui(),
        storybookTest({
            configDir: path.join(dirname, '.storybook'),
            storybookScript: 'pnpm storybook:run --ci',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(dirname, 'src'),
        },
    },
    test: {
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            exclude: [
                'node_modules',
                'dist',
                '.storybook',
                '**/*.d.ts',
                '**/*.stories.{js,jsx,ts,tsx}',
                '**/*.test.{js,jsx,ts,tsx}',
                '**/*.spec.{js,jsx,ts,tsx}',
            ],
        },
        projects: [
            {
                test: {
                    name: 'unit',
                    environment: 'node',
                    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
                    exclude: ['src/**/*.stories.tsx'],
                },
            },
            {
                test: {
                    name: 'storybook',
                    browser: {
                        enabled: true,
                        provider: 'playwright',
                        headless: true,
                        instances: [{ browser: 'chromium' }],
                    },
                    setupFiles: [path.join(dirname, '.storybook/vitest.setup.ts')],
                },
            },
        ],
    },
});
