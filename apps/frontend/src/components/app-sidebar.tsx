import * as React from 'react';
import { useLocation } from '@tanstack/react-router';
import { Home, DollarSign, User, CreditCard, Building2 } from 'lucide-react';
import { Trans } from '@lingui/react/macro';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navItems = [
        {
            title: <Trans>Dashboard</Trans>,
            url: '/dashboard',
            icon: Home,
            isActive: location.pathname === '/dashboard',
        },
        {
            title: <Trans>Account</Trans>,
            url: '/account',
            icon: User,
            isActive: location.pathname === '/account',
        },
        {
            title: <Trans>Billing</Trans>,
            url: '/billing',
            icon: CreditCard,
            isActive: location.pathname === '/billing',
        },
        {
            title: <Trans>Pricing</Trans>,
            url: '/pricing',
            icon: DollarSign,
            isActive: location.pathname === '/pricing',
        },
    ];

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-1">
                    <Building2 className="h-6 w-6" />
                    <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">
                        <Trans>Your App</Trans>
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>
            <SidebarFooter>{user && <NavUser user={user} onLogout={handleLogout} />}</SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
