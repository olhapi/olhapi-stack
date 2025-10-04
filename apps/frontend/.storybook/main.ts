import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';

const config: StorybookConfig = {
    addons: ['@storybook/addon-links', '@storybook/addon-vitest', '@chromatic-com/storybook'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    staticDirs: ['../public'],
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    async viteFinal(config) {
        // Add path alias support
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, '../src'),
        };

        return config;
    },
};
export default config;
