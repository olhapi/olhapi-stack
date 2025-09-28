import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

export function Welcome() {
    const { user } = useAuth();
    const { _ } = useLingui();

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">
                    <Trans>Welcome to Your App!</Trans>
                </h1>
                <p className="text-lg text-muted-foreground">
                    <Trans>Hello {user?.email || _(t`there`)}, we're excited to have you on board.</Trans>
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <Trans>Let's get you started</Trans>
                    </CardTitle>
                    <CardDescription>
                        <Trans>Your account has been successfully created</Trans>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Button asChild className="flex-1">
                            <Link to="/dashboard">
                                <Trans>Go to Dashboard</Trans>
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                            <Link to="/account">
                                <Trans>Account Settings</Trans>
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
