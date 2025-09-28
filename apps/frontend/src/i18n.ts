import { i18n } from '@lingui/core';

export const locales = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
};

export const defaultLocale = 'en';

export async function loadTranslation(locale: string) {
    const { messages } = await import(`./locales/${locale}/messages.mjs`);
    i18n.load(locale, messages);
    i18n.activate(locale);
}

export function detectBrowserLocale(): string {
    const browserLocale = navigator.language.slice(0, 2);
    return Object.keys(locales).includes(browserLocale) ? browserLocale : defaultLocale;
}

export function getSavedLocale(): string {
    if (typeof window === 'undefined') return defaultLocale;
    return localStorage.getItem('language') || detectBrowserLocale();
}

export function initializeI18n(): void {
    const locale = getSavedLocale();
    i18n.activate(locale);
}

export function saveLocale(locale: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('language', locale);
}

export { i18n };
