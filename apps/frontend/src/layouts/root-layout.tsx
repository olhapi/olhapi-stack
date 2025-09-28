import { Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/auth-context';
import { GrowthBookContextProvider } from '@/contexts/growthbook-context';
import { ErrorBoundary } from '@/components/error-boundary';
import { I18nProvider } from '@lingui/react';
import { i18n, loadTranslation, getSavedLocale, initializeI18n } from '@/i18n';
import { AutumnProvider } from 'autumn-js/react';
import { useEffect } from 'react';

// Initialize i18n synchronously to prevent I18nProvider warning
initializeI18n();

export function RootLayout() {
    useEffect(() => {
        const locale = getSavedLocale();
        loadTranslation(locale).catch((error) => {
            console.warn('Failed to load translations:', error);
            // App will continue to work without translations
        });
    }, []);

    return (
        <I18nProvider i18n={i18n}>
            <ErrorBoundary>
                <AuthProvider>
                    <AutumnProvider includeCredentials={true} betterAuthUrl={import.meta.env.VITE_AUTH_URL}>
                        <GrowthBookContextProvider>
                            <div className="min-h-screen bg-background">
                                <Outlet />
                                <Toaster />
                            </div>
                        </GrowthBookContextProvider>
                    </AutumnProvider>
                </AuthProvider>
            </ErrorBoundary>
        </I18nProvider>
    );
}
