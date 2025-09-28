import { Trans } from '@lingui/react/macro';
import { UserSettingsForm } from '@/features/settings/user-settings-form';

export function Account() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    <Trans>Account</Trans>
                </h1>
                <p className="text-muted-foreground">
                    <Trans>Manage your profile and account preferences</Trans>
                </p>
            </div>

            <UserSettingsForm />
        </div>
    );
}
