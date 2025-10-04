import { startTransition, useCallback, useMemo, useOptimistic, useState } from 'react';
import { funnel } from 'remeda';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

interface UsernameCheckResponse {
    available: boolean;
    message: string;
}

interface UsernameCheckResult {
    isChecking: boolean;
    isAvailable: boolean | null;
    message: string | null;
    optimisticAvailable: boolean | null;
    checkUsername: (username: string, currentUsername?: string) => void;
    resetState: () => void;
}

export function useUsernameCheck(): UsernameCheckResult {
    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const { _ } = useLingui();

    // Optimistic availability for immediate UI feedback
    const [optimisticAvailable, setOptimisticAvailable] = useOptimistic(
        isAvailable,
        (_current, newValue: boolean | null) => newValue,
    );

    const resetState = useCallback(() => {
        setIsAvailable(null);
        setMessage(null);
        setIsChecking(false);
    }, []);

    const checkUsernameApi = useCallback(async (username: string) => {
        if (!username || username.length < 3) {
            resetState();
            return;
        }

        try {
            setIsChecking(true);
            const response = await fetch(
                `${import.meta.env.VITE_AUTH_URL}/api/user/username/check?username=${encodeURIComponent(username)}`,
                {
                    credentials: 'include',
                },
            );

            if (!response.ok) {
                throw new Error('Failed to check username availability');
            }

            const data: UsernameCheckResponse = await response.json();

            setIsAvailable(data.available);
            setMessage(data.available ? _(msg`Username is available`) : _(msg`Username is already taken`));
        } catch (error) {
            console.error('Username check error:', error);
            setIsAvailable(null);
            setMessage(_(msg`Error checking username availability`));
        } finally {
            setIsChecking(false);
        }
    }, [_, resetState]);

    const debouncedCheckApi = useMemo(
        () =>
            funnel(checkUsernameApi, {
                minQuietPeriodMs: 500,
                reducer: (_prev: unknown, username: string) => username,
            }),
        [checkUsernameApi],
    );

    const checkUsername = useCallback(
        (username: string, currentUsername?: string) => {
            // Reset state immediately
            resetState();

            // If username is the same as current username, mark as available
            if (currentUsername && username === currentUsername) {
                setIsAvailable(true);
                setMessage(_(msg`This is your current username`));
                setIsChecking(false);
                return;
            }

            // Validate username format
            if (!username) {
                setIsChecking(false);
                return;
            }

            const validationErrors = [
                {
                    condition: username.length < 3,
                    message: _(msg`Username must be at least 3 characters`),
                },
                {
                    condition: username.length > 30,
                    message: _(msg`Username must be less than 30 characters`),
                },
                {
                    condition: !/^[a-zA-Z0-9_-]+$/.test(username),
                    message: _(msg`Username can only contain letters, numbers, underscores, and hyphens`),
                },
            ];

            const error = validationErrors.find((v) => v.condition);
            if (error) {
                setIsAvailable(false);
                setMessage(error.message);
                setIsChecking(false);
                return;
            }

            // Show optimistic "checking" state for immediate feedback
            startTransition(() => {
                setOptimisticAvailable(null);
            });

            // If validation passes, perform debounced API check
            setIsChecking(true);
            debouncedCheckApi.call(username);
        },
        [debouncedCheckApi, _, setOptimisticAvailable, resetState],
    );

    return {
        checkUsername, isAvailable, isChecking, message, optimisticAvailable, resetState,
    };
}
