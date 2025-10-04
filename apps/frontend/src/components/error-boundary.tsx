'use client';

import * as React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
export { useErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { toast } from 'sonner';
import { type PropsWithChildren, useEffect, useCallback } from 'react';

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: Readonly<ErrorFallbackProps>) {
    useEffect(() => {
        console.error('ErrorBoundary caught an error:', error);
        toast.error('Something went wrong. Please try again.');
    }, [error]);

    const handleGoHome = useCallback(() => {
        globalThis.location.href = '/';
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 text-destructive">
                        <AlertCircle className="h-full w-full" />
                    </div>
                    <CardTitle>
                        <Trans>Something went wrong</Trans>
                    </CardTitle>
                    <CardDescription>
                        <Trans>We encountered an error while processing your request</Trans>
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-6">
                        <Trans>Please try again or contact support if the problem persists.</Trans>
                    </p>
                    <div className="flex gap-4">
                        <Button onClick={handleGoHome} variant="outline" className="flex-1">
                            <Home className="mr-2 h-4 w-4" />
                            <Trans>Go Home</Trans>
                        </Button>
                        <Button onClick={resetErrorBoundary} className="flex-1">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            <Trans>Try Again</Trans>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

interface ErrorBoundaryProps extends PropsWithChildren {
    fallback?: React.ComponentType<ErrorFallbackProps>;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export function ErrorBoundary({
    children,
    fallback: FallbackComponent = ErrorFallback,
    onError,
}: Readonly<ErrorBoundaryProps>) {
    const handleError = React.useCallback(
        (error: Error, errorInfo: React.ErrorInfo) => {
            console.error('ErrorBoundary caught an error:', error, errorInfo);

            if (onError) {
                onError(error, errorInfo);
            }
        },
        [onError],
    );

    return (
        <ReactErrorBoundary FallbackComponent={FallbackComponent} onError={handleError}>
            {children}
        </ReactErrorBoundary>
    );
}
