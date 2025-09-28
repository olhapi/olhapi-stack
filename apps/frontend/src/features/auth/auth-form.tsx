import { Button } from '@/components/ui/button';
import { handleMagicLinkAuth } from './auth-utils';
import { Input } from '@/components/ui/input';
import { useRef, useActionState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { t } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

type AuthState = {
    emailSent: boolean;
    error?: string;
};

async function sendMagicLinkAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = formData.get('email');
    if (!email) {
        return { ...prevState, error: 'Email is required' };
    }

    try {
        const result = await handleMagicLinkAuth({ email: String(email) });
        if (result.error) {
            return {
                ...prevState,
                error: `Can't send magic link: ${result.error.statusText}`,
            };
        } else {
            return { emailSent: true };
        }
    } catch {
        return { ...prevState, error: 'Something went wrong' };
    }
}

export function AuthForm() {
    const { _ } = useLingui();
    const [state, submitAction, isPending] = useActionState(sendMagicLinkAction, {
        emailSent: false,
    });
    const formRef = useRef<HTMLFormElement>(null);

    function handleSubmitButton() {
        formRef.current?.requestSubmit();
    }

    // Show error toast when state.error changes
    if (state.error) {
        toast.error(_(t`${state.error}`));
    }

    if (state.emailSent) {
        return (
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>
                        <Trans>Check your email for login link</Trans>
                    </CardTitle>
                    <CardDescription>
                        <Trans>Email with link to login link has been sent to your email</Trans>
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>
                    <Trans>Sign in to your account</Trans>
                </CardTitle>
                <CardDescription>
                    <Trans>
                        Enter your email below. We'll send you a magic link to sign in or create your account.
                    </Trans>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} action={submitAction}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">
                                <Trans>Email</Trans>
                            </Label>
                            <Input id="email" type="email" name="email" placeholder={_(t`mail@example.com`)} required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                {isPending ? (
                    <Button className="w-full" disabled>
                        <Loader2Icon className="animate-spin" />
                        <Trans>Please wait</Trans>
                    </Button>
                ) : (
                    <Button type="submit" className="w-full" onClick={handleSubmitButton}>
                        <Trans>Send login link</Trans>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
