import { Trans } from '@lingui/react/macro';
import { BillingSettings } from '@/features/settings/billing-settings';

export function Billing() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    <Trans>Billing</Trans>
                </h1>
                <p className="text-muted-foreground">
                    <Trans>Manage your subscription and billing information</Trans>
                </p>
            </div>

            <BillingSettings />
        </div>
    );
}
