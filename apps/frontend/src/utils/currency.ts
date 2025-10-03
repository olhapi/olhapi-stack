interface FormatCurrencyOptions {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

export function formatCurrency(amount: number, options: FormatCurrencyOptions = {}): string {
    const { currency = 'EUR', locale = 'en-US', minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(amount);
}

export function formatCurrencyCompact(amount: number, options: FormatCurrencyOptions = {}): string {
    const { currency = 'EUR', locale = 'en-US' } = options;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(amount);
}

export function parseCurrencyAmount(currencyString: string): number {
    // Remove currency symbols, spaces, and commas, then parse as float
    const cleanString = currencyString.replace(/[^0-9.-]/g, '');
    return Number.parseFloat(cleanString) || 0;
}
