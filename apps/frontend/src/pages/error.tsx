import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { AlertCircle, Home } from 'lucide-react';
import { Trans } from '@lingui/react/macro';

export function ErrorPage() {
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
                        <Button asChild variant="outline" className="flex-1">
                            <Link to="/">
                                <Home className="mr-2 h-4 w-4" />
                                <Trans>Go Home</Trans>
                            </Link>
                        </Button>
                        <Button onClick={() => globalThis.location.reload()} className="flex-1">
                            <Trans>Try Again</Trans>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
