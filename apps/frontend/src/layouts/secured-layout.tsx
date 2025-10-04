import { Link, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/use-auth';
import { ErrorBoundary } from '@/components/error-boundary';
import { useEffect } from 'react';
import { Trans } from '@lingui/react/macro';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Route display names mapping
const routeNames: Record<string, string> = {
    '/dashboard': 'Dashboard', '/pricing': 'Pricing', '/profile': 'Profile', '/settings': 'Settings', '/welcome': 'Welcome',
};

// Function to generate breadcrumb items from pathname
const generateBreadcrumbs = (pathname: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // If we're on the dashboard, just show Dashboard
    if (pathname === '/dashboard') {
        breadcrumbs.push({
            isLast: true, label: 'Dashboard', path: '/dashboard',
        });
        return breadcrumbs;
    }

    // Always start with Home for other pages
    breadcrumbs.push({
        isLast: false, label: 'Home', path: '/dashboard',
    });

    // Build path progressively for each segment
    let currentPath = '';
    for (const [index, segment] of segments.entries()) {
        currentPath += `/${segment}`;
        const isLast = index === segments.length - 1;

        breadcrumbs.push({
            isLast, label: routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1), path: currentPath,
        });
    }

    return breadcrumbs;
};

export function SecuredLayout() {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate({ to: '/login' });
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                    <p className="mt-4 text-muted-foreground">
                        <Trans>Loading...</Trans>
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const breadcrumbs = generateBreadcrumbs(location.pathname);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <div key={`${breadcrumb.path}-${index}`} className="flex items-center">
                                        <BreadcrumbItem className="hidden md:block">
                                            {breadcrumb.isLast ? (
                                                <BreadcrumbPage>
                                                    <Trans>{breadcrumb.label}</Trans>
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink asChild>
                                                    <Link to={breadcrumb.path}>
                                                        <Trans>{breadcrumb.label}</Trans>
                                                    </Link>
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        {!breadcrumb.isLast && <BreadcrumbSeparator className="hidden md:block" />}
                                    </div>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
