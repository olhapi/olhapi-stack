export type Translations = Record<string, Record<string, any>>;

function getNestedValue(obj: any, path: string): string | null {
    return path.split('.').reduce((current, key) => {
        return current && typeof current === 'object' ? current[key] : null;
    }, obj);
}

export function useTranslations(translations: Translations, currentLang: string) {
    return function $t(key: string, values?: Record<string, string | number>): any {
        // Try to get translation from current language
        let translation = getNestedValue(translations[currentLang], key);

        // Fallback to English
        if (translation === null || translation === undefined) {
            translation = getNestedValue(translations['en'], key);
        }

        // Final fallback to the key itself
        if (translation === null || translation === undefined) {
            translation = key;
        }

        // If it's not a string, return as-is (could be an object)
        if (typeof translation !== 'string') {
            return translation;
        }

        if (!values) {
            return translation;
        }

        return translation.replace(/\{(\w+)\}/g, (match, variable) => {
            return values[variable]?.toString() || match;
        });
    };
}
