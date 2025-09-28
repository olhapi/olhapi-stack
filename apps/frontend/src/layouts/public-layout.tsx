import { Outlet, Link } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';
import { ErrorBoundary } from '@/components/error-boundary';
import { LanguageSwitcher } from '@/components/language-switcher';

export function PublicLayout() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">
                        <Trans>Your App</Trans>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                            <Trans>Sign In</Trans>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </main>

            <footer className="border-t mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
                    <Trans>© {currentYear} Your App. All rights reserved.</Trans>
                </div>
            </footer>
        </div>
    );
}
