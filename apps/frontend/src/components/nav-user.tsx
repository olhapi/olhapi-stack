import { Link } from '@tanstack/react-router';
import { BadgeCheck, ChevronsUpDown, LogOut, Settings, Sparkles, Globe } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { useCustomer } from 'autumn-js/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { locales, loadTranslation, saveLocale } from '@/i18n';
import { useState, useEffect } from 'react';
import { useLingui } from '@lingui/react';

const languageFlags: Record<string, string> = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷',
};

export function NavUser({
    user,
    onLogout,
}: {
    user: {
        name?: string;
        email: string;
        image?: string | null;
    };
    onLogout: () => void;
}) {
    useLingui(); // Ensures component re-renders when language changes
    const { isMobile } = useSidebar();
    const [currentLocale, setCurrentLocale] = useState<string>('');
    const { customer: customerData } = useCustomer();

    useEffect(() => {
        const savedLocale = localStorage.getItem('language') || 'en';
        setCurrentLocale(savedLocale);
    }, []);

    const handleLanguageChange = async (locale: string) => {
        try {
            setCurrentLocale(locale);
            saveLocale(locale);
            await loadTranslation(locale);
        } catch (error) {
            console.error('Failed to change language:', error);
        }
    };

    const getUserInitials = (email: string, name?: string) => {
        if (name) {
            return name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase();
        }
        return email.charAt(0).toUpperCase();
    };

    // Check if user has an active paid subscription
    const hasActivePaidSubscription = () => {
        if (!customerData?.products) return false;

        const activeProducts = customerData.products.filter((product: any) => product.status === 'active');

        // If no active products or only free products, user is on free plan
        return activeProducts.some((product: any) => product.id !== 'free');
    };

    const showUpgradeOption = hasActivePaidSubscription() === false;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.image || ''} alt={user.name || user.email} />
                                <AvatarFallback className="rounded-lg">
                                    {getUserInitials(user.email, user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name || user.email}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.image || ''} alt={user.name || user.email} />
                                    <AvatarFallback className="rounded-lg">
                                        {getUserInitials(user.email, user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name || user.email}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {showUpgradeOption && (
                            <>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link to="/pricing">
                                            <Sparkles />
                                            <Trans>Upgrade to Pro</Trans>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                            </>
                        )}
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link to="/account">
                                    <BadgeCheck />
                                    <Trans>Account</Trans>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/billing">
                                    <Settings />
                                    <Trans>Billing</Trans>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Globe />
                                <Trans>Language</Trans>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                {Object.entries(locales).map(([code, name]) => (
                                    <DropdownMenuItem
                                        key={code}
                                        onClick={() => handleLanguageChange(code)}
                                        className={currentLocale === code ? 'bg-accent text-accent-foreground' : ''}
                                    >
                                        <span className="text-lg leading-none mr-2">{languageFlags[code]}</span>
                                        <span>{name}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onLogout}>
                            <LogOut />
                            <Trans>Log out</Trans>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
