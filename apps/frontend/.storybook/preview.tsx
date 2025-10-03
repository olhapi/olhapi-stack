import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { I18nProvider } from '@lingui/react';
import { AuthProvider } from '../src/contexts/auth-context';
import { i18n } from '@lingui/core';
import '../src/index.css';

// Initialize i18n for Storybook
i18n.activate('en');

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        (Story, context) => {
            return (
                <I18nProvider i18n={i18n}>
                    <AuthProvider>
                        <div className={context.parameters.layout === 'fullscreen' ? '' : 'max-w-4xl mx-auto p-4'}>
                            <Story />
                        </div>
                    </AuthProvider>
                </I18nProvider>
            );
        },
    ],
};

export default preview;
