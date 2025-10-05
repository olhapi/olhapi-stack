export type Translations = Record<string, Record<string, string | Record<string, unknown>>>;

function getNestedValue(obj: unknown, path: string): string | null {
    return path.split('.').reduce((current: unknown, key: string) => {
        return current && typeof current === 'object' && current !== null && key in current
            ? (current as Record<string, unknown>)[key]
            : null;
    }, obj) as string | null;
}

export function useTranslations(translations: Translations, currentLang: string) {
    return function $t(key: string, values?: Record<string, string | number>): string | Record<string, unknown> {
        // Try to get translation from current language
        let translation = getNestedValue(translations[currentLang], key);

        // Fallback to English
        translation ??= getNestedValue(translations['en'], key);

        // Final fallback to the key itself
        translation ??= key;

        // If it's not a string, return as-is (could be an object)
        if (typeof translation !== 'string') {
            return translation;
        }

        if (!values) {
            return translation;
        }

        return translation.replaceAll(/\{(\w+)\}/g, (match, variable) => {
            return values[variable]?.toString() || match;
        });
    };
}
