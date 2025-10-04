import { AuthForm } from '@/features/auth/auth-form';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export function Login() {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate({ to: '/dashboard' });
        }
    }, [isAuthenticated, isLoading, navigate]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                </div>
            </div>
        );
    }

    // Don't render the form if user is authenticated (redirect will happen)
    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
            <AuthForm />
        </div>
    );
}
