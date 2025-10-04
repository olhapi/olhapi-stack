import { useAuth } from '@/hooks/use-auth';
import { useFeatureIsOn, useFeatureValue } from '@growthbook/growthbook-react';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

export function Dashboard() {
    const { user } = useAuth();
    const { _ } = useLingui();
    const showBetaFeatures = useFeatureIsOn('show-beta-features');
    const welcomeMessage = useFeatureValue('dashboard-welcome-message', _(t`Welcome to your dashboard!`));
    const buttonStyle = useFeatureValue('button-style', 'default');

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    <Trans>Dashboard</Trans>
                </h1>
                <p className="text-muted-foreground mt-2">{welcomeMessage}</p>
                <p className="text-sm text-muted-foreground mt-1">
                    <Trans>Logged in as: {user?.email || _(t`User`)}</Trans>
                </p>
            </div>

            <div className="rounded-lg border p-8">
                <p className="text-muted-foreground text-center">
                    <Trans>Your dashboard content goes here.</Trans>
                </p>

                {showBetaFeatures && (
                    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            🚀 <Trans>Beta Features</Trans>
                        </h3>
                        <p className="text-blue-800 dark:text-blue-200">
                            <Trans>
                                You have access to beta features! New experimental functionality will appear here.
                            </Trans>
                        </p>
                        <button
                            type="button"
                            className={`mt-3 px-4 py-2 rounded-md ${
                                buttonStyle === 'primary'
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            <Trans>Explore Beta Features</Trans>
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    <Trans>Feature Flags Status:</Trans>
                </h4>
                <ul className="text-sm space-y-1">
                    <li>
                        <Trans>Beta Features: {showBetaFeatures ? _(t`✅ Enabled`) : _(t`❌ Disabled`)}</Trans>
                    </li>
                    <li>
                        <Trans>Welcome Message: "{welcomeMessage}"</Trans>
                    </li>
                    <li>
                        <Trans>Button Style: {buttonStyle}</Trans>
                    </li>
                </ul>
            </div>
        </div>
    );
}
