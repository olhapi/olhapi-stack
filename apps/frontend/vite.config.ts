import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { lingui } from '@lingui/vite-plugin';
import { visualizer } from 'rollup-plugin-visualizer';

import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        viteReact({
            babel: {
                plugins: ['babel-plugin-react-compiler', '@lingui/babel-plugin-lingui-macro'],
            },
        }),
        tailwindcss(),
        lingui(),
        // Add bundle analyzer for analyze mode
        mode === 'analyze' &&
            visualizer({
                filename: 'dist/bundle-analysis.html',
                open: true,
                gzipSize: true,
                brotliSize: true,
            }),
    ].filter(Boolean),
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    server: {
        allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0'],
    },
    assetsInclude: ['**/*.wasm', '**/*.woff2'], // Include WASM and font files as assets
}));
