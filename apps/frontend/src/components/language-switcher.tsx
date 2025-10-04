import { Globe } from 'lucide-react';
import { cn } from '@/utils/style-utils';
import { loadTranslation, locales, saveLocale } from '@/i18n';
import { useCallback, useEffect, useState } from 'react';
import { useLingui } from '@lingui/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const languageFlags: Record<string, string> = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷',
};

export function LanguageSwitcher() {
    useLingui(); // Ensures component re-renders when language changes
    const [currentLocale, setCurrentLocale] = useState<string>('');

    useEffect(() => {
        const savedLocale = localStorage.getItem('language') || 'en';
        setCurrentLocale(savedLocale);
    }, []);

    const handleLanguageChange = useCallback(async (locale: string) => {
        try {
            setCurrentLocale(locale);
            saveLocale(locale);
            await loadTranslation(locale);
            // No need to reload - Lingui will update reactively
        } catch (error) {
            console.error('Failed to change language:', error);
        }
    }, []);

    if (!currentLocale) return null;

    return (
        <Select value={currentLocale} onValueChange={handleLanguageChange}>
            <SelectTrigger
                className={cn(
                    'h-8 w-auto gap-2 border-input bg-background px-3 text-sm shadow-xs',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus:ring-ring/50 focus:ring-[3px]',
                )}
                aria-label="Select language"
            >
                <Globe className="h-4 w-4" />
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {Object.entries(locales).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                        <div className="flex items-center gap-2">
                            <span className="text-lg leading-none">{languageFlags[code]}</span>
                            <span>{name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
