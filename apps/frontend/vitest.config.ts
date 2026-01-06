import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
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
        coverage: {
            exclude: [
                'node_modules',
                'dist',
                '.storybook',
                '**/*.d.ts',
                '**/*.stories.{js,jsx,ts,tsx}',
                '**/*.test.{js,jsx,ts,tsx}',
                '**/*.spec.{js,jsx,ts,tsx}',
            ], include: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], provider: 'v8', reporter: ['text', 'json', 'html'],
        }, globals: true, projects: [
            {
                test: {
                    environment: 'node', exclude: ['src/**/*.stories.tsx'], include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], name: 'unit',
                },
            },
            {
                test: {
                    browser: {
                        enabled: true, headless: true, instances: [{ browser: 'chromium' }], provider: playwright(),
                    }, name: 'storybook', setupFiles: [path.join(dirname, '.storybook/vitest.setup.ts')],
                },
            },
        ],
    },
});
