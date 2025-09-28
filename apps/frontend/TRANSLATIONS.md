# Translation Guide

This guide explains how to work with translations in the frontend app using Lingui.

## Overview

The app uses [@lingui/react](https://lingui.dev) for internationalization (i18n) with support for:

- English (en) - Source language
- Spanish (es)
- French (fr)

## Quick Start

### Extract new translations

```bash
pnpm lingui:extract
```

### Compile translations after changes

```bash
pnpm lingui:compile
```

### Watch mode (auto-extract on file changes)

```bash
pnpm lingui:watch
```

## Adding Translatable Text

### 1. In JSX Components

Use the `<Trans>` component for static text:

```tsx
import { Trans } from '@lingui/react/macro';

function Component() {
    return (
        <div>
            <h1>
                <Trans>Welcome to our app</Trans>
            </h1>
            <p>
                <Trans>This text will be translated</Trans>
            </p>
        </div>
    );
}
```

### 2. Dynamic Text & Placeholders

Use the `t` macro with the `useLingui` hook:

```tsx
import { t } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

function Component() {
    const { _ } = useLingui();

    const errorMessage = _(t`Something went wrong`);
    const placeholder = _(t`Enter your email`);

    return (
        <div>
            <input placeholder={placeholder} />
            {error && <p>{errorMessage}</p>}
        </div>
    );
}
```

### 3. Text with Variables

Include variables in translations:

```tsx
import { Trans } from '@lingui/react/macro';

function Welcome({ name }) {
    return <Trans>Hello {name}, welcome back!</Trans>;
}
```

### 4. Pluralization

Handle plural forms:

```tsx
import { Plural } from '@lingui/react/macro';

function ItemCount({ count }) {
    return <Plural value={count} one="# item" other="# items" />;
}
```

## Translation Workflow

### Step 1: Mark Text for Translation

Add `<Trans>`, `t`, or other Lingui macros to your components.

### Step 2: Extract Strings

Run extraction to update translation catalogs:

```bash
pnpm lingui:extract
```

This will:

- Scan all source files for translatable strings
- Update `.po` files in `src/locales/{locale}/`
- Show statistics of total and missing translations

### Step 3: Translate Messages

Edit the `.po` files in each locale folder:

**Example: `src/locales/es/messages.po`**

```po
#: src/features/auth/auth-form.tsx:67
msgid "Login to your account"
msgstr "Inicia sesión en tu cuenta"

#: src/features/auth/auth-form.tsx:76
msgid "Email"
msgstr "Correo electrónico"
```

### Step 4: Compile Translations

After translating, compile the catalogs:

```bash
pnpm lingui:compile
```

This creates optimized `.mjs` files for runtime use.

### Step 5: Test Translations

The app automatically detects the browser's language. To test different languages:

1. Change your browser's language settings, or
2. Modify the `detectBrowserLocale()` function in `src/i18n.ts` to force a specific language

## File Structure

```
src/
├── i18n.ts                 # i18n configuration and helpers
├── locales/
│   ├── en/
│   │   ├── messages.po     # English source strings
│   │   └── messages.mjs    # Compiled catalog
│   ├── es/
│   │   ├── messages.po     # Spanish translations
│   │   └── messages.mjs    # Compiled catalog
│   └── fr/
│       ├── messages.po     # French translations
│       └── messages.mjs    # Compiled catalog
```

## Configuration

The Lingui configuration is in `lingui.config.ts`:

```typescript
{
  locales: ['en', 'es', 'fr'],  // Supported languages
  sourceLocale: 'en',            // Source language
  format: 'po',                  // Translation file format
  catalogs: [{
    path: '<rootDir>/src/locales/{locale}/messages',
    include: ['src'],
  }]
}
```

## Adding a New Language

1. Add the locale code to `lingui.config.ts`:

```typescript
locales: ['en', 'es', 'fr', 'de'], // Added German
```

2. Update `src/i18n.ts`:

```typescript
export const locales = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch', // Added German
};
```

3. Run extraction to create the new locale folder:

```bash
pnpm lingui:extract
```

4. Translate the new `.po` file and compile:

```bash
pnpm lingui:compile
```

## Best Practices

### DO:

- ✅ Always use Lingui macros for user-facing text
- ✅ Extract translations regularly during development
- ✅ Keep translations concise and clear
- ✅ Use meaningful IDs for complex translations
- ✅ Test all languages before deploying

### DON'T:

- ❌ Hardcode text in components without translation macros
- ❌ Use dynamic string concatenation for translations
- ❌ Forget to compile after updating translations
- ❌ Mix HTML in translation strings (use components instead)

## Common Patterns

### Form Labels and Placeholders

```tsx
<Label htmlFor="email">
  <Trans>Email Address</Trans>
</Label>
<Input
  placeholder={_(t`Enter your email`)}
/>
```

### Error Messages

```tsx
toast.error(_(t`Failed to save changes`));
```

### Conditional Text

```tsx
<Button>{isLoading ? <Trans>Loading...</Trans> : <Trans>Submit</Trans>}</Button>
```

### Navigation Items

```tsx
const navItems = [
    { label: _(t`Dashboard`), path: '/dashboard' },
    { label: _(t`Settings`), path: '/settings' },
    { label: _(t`Profile`), path: '/profile' },
];
```

## Troubleshooting

### Translations not showing up

1. Ensure you've run `pnpm lingui:compile` after making changes
2. Check that the locale files exist in `src/locales/`
3. Verify the browser language matches a supported locale

### Extraction not finding strings

1. Make sure you're using the correct import: `@lingui/macro`
2. Check that the file is included in the `lingui.config.ts` paths
3. Ensure the syntax is correct (e.g., `<Trans>` not `<trans>`)

### Build errors

1. Run `pnpm lingui:compile` before building
2. Check for syntax errors in `.po` files
3. Ensure all dependencies are installed

## Resources

- [Lingui Documentation](https://lingui.dev)
- [React Tutorial](https://lingui.dev/tutorials/react)
- [Message Extraction Guide](https://lingui.dev/guides/message-extraction)
- [Pluralization Rules](https://lingui.dev/guides/plurals)
