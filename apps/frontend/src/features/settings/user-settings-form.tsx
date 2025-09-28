import { useActionState, useOptimistic, startTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AvatarUpload } from '@/components/ui/avatar-upload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trans } from '@lingui/react/macro';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useAuth } from '@/hooks/use-auth';
import { useUsernameCheck } from '@/hooks/use-username-check';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type UpdateUserState = {
    success?: boolean;
    error?: string;
};

async function updateUserAction(
    _prevState: UpdateUserState,
    formData: FormData,
    updateUserFn: (data: any) => Promise<void>,
    translate: (msg: any) => string,
): Promise<UpdateUserState> {
    const name = formData.get('name') as string;
    const username = formData.get('username') as string;

    try {
        await updateUserFn({ name, username });
        toast.success(translate(msg`Profile updated successfully`));
        return { success: true };
    } catch (error) {
        console.error('Failed to update user:', error);
        const errorMessage = error instanceof Error ? error.message : 'Update failed';
        toast.error(errorMessage);
        return { error: errorMessage };
    }
}

export function UserSettingsForm() {
    const { user, updateUser } = useAuth();
    const { _ } = useLingui();
    const [_state, submitAction, isPending] = useActionState(
        (prevState: UpdateUserState, formData: FormData) => updateUserAction(prevState, formData, updateUser, _),
        {},
    );

    const { isChecking, isAvailable, message, optimisticAvailable, checkUsername, resetState } = useUsernameCheck();

    // Optimistic updates for immediate UI feedback
    const [optimisticUser, addOptimisticUser] = useOptimistic(
        user,
        (
            currentUser,
            newUserData: Partial<{
                name?: string;
                username?: string;
                image?: string;
            }>,
        ) =>
            currentUser
                ? {
                      ...currentUser,
                      ...newUserData,
                  }
                : null,
    );

    const handleFormSubmit = (formData: FormData) => {
        // Prevent submission if username is not available
        const username = formData.get('username') as string;
        if (username && username.length >= 3 && isAvailable === false) {
            return;
        }

        // Add optimistic update for immediate UI feedback
        startTransition(() => {
            addOptimisticUser({
                name: formData.get('name') as string,
                username: username,
            });
        });

        return submitAction(formData);
    };

    const handleAvatarUploadSuccess = async (url: string) => {
        // Add optimistic update for avatar
        startTransition(() => {
            addOptimisticUser({ image: url });
        });

        // Auto-save avatar to user data immediately
        try {
            await updateUser({ image: url });
        } catch (error) {
            console.error('Failed to auto-save avatar:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Trans>Profile Settings</Trans>
                </CardTitle>
                <CardDescription>
                    <Trans>Update your profile information and avatar</Trans>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleFormSubmit} className="space-y-6">
                    <div className="flex justify-center">
                        <AvatarUpload
                            currentImage={optimisticUser?.image || ''}
                            onUploadSuccess={handleAvatarUploadSuccess}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            <Trans>Display Name</Trans>
                        </label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={optimisticUser?.name || ''}
                            placeholder={_(msg`Enter your display name`)}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="username"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            <Trans>Username</Trans>
                        </label>
                        <div className="relative mt-1">
                            <Input
                                id="username"
                                name="username"
                                defaultValue={(optimisticUser as any)?.username || ''}
                                placeholder={_(msg`Enter your username`)}
                                onChange={(e) => {
                                    const newUsername = e.target.value;
                                    const currentUsername = (user as any)?.username || '';
                                    startTransition(() => {
                                        checkUsername(newUsername, currentUsername);
                                    });
                                }}
                                className={
                                    (optimisticAvailable ?? isAvailable) === true
                                        ? 'pr-10 border-green-500 focus:border-green-500'
                                        : (optimisticAvailable ?? isAvailable) === false
                                          ? 'pr-10 border-red-500 focus:border-red-500'
                                          : 'pr-10'
                                }
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {isChecking ? (
                                    <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                                ) : (optimisticAvailable ?? isAvailable) === true ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (optimisticAvailable ?? isAvailable) === false ? (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                ) : null}
                            </div>
                        </div>
                        {message && (
                            <p
                                className={`text-sm mt-1 ${
                                    (optimisticAvailable ?? isAvailable) === true
                                        ? 'text-green-600'
                                        : (optimisticAvailable ?? isAvailable) === false
                                          ? 'text-red-600'
                                          : 'text-gray-600'
                                }`}
                            >
                                {message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                const form = document.querySelector('form') as HTMLFormElement;
                                form?.reset();
                                resetState();
                            }}
                            disabled={isPending}
                        >
                            <Trans>Reset</Trans>
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || isChecking || (optimisticAvailable ?? isAvailable) === false}
                        >
                            {isPending ? <Trans>Saving...</Trans> : <Trans>Save Changes</Trans>}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
