import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { FileQuestion, Home } from 'lucide-react';
import { Trans } from '@lingui/react/macro';

export function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 text-muted-foreground">
                        <FileQuestion className="h-full w-full" />
                    </div>
                    <CardTitle>
                        <Trans>404 - Page Not Found</Trans>
                    </CardTitle>
                    <CardDescription>
                        <Trans>The page you're looking for doesn't exist</Trans>
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-6">
                        <Trans>The page may have been moved, deleted, or you may have entered an incorrect URL.</Trans>
                    </p>
                    <Button asChild className="w-full">
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            <Trans>Go Home</Trans>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
