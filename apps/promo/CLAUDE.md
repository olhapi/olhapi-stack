# Internationalization Guidelines

This project uses Astro's built-in i18n capabilities with English (en) and German (de) support.

## Architecture Rules

### 1. Translation Utilities

- Use `useTranslations(translations, lang)` from `/src/utils/i18n.ts`
- Returns a `$t` function that supports template variables: `$t('key', { name: 'value' })`
- Templates use `{variable}` syntax: `"Hello {name}!"` becomes `"Hello John!"`

### 2. Component Structure

- **Each component contains its own translations** - no external translation files
- Define translations object within each component:
    ```astro
    const translations = {
      en: { key: 'English text' },
      de: { key: 'German text' }
    };
    const $t = useTranslations(translations, lang);
    ```

### 3. Page Architecture

- Pages are **thin routing wrappers** that import Layout + Section components
- All content lives in reusable section components (`/src/components/sections/`)
- Pages pass `lang` prop from `Astro.currentLocale` to all components
- Same page structure for all languages - zero duplication

### 4. File Structure

```
src/pages/
├── index.astro           # English homepage
├── about.astro          # English about
├── de/
│   ├── index.astro      # German homepage (same imports)
│   └── about.astro      # German about (same imports)
```

### 5. Adding New Languages

1. Add locale to `astro.config.mjs` i18n.locales array
2. Add translations to component translation objects
3. Create new locale folder in `/src/pages/`
4. Copy page files (they use same components)

### 6. Adding New Pages

1. Create section component in `/src/components/sections/`
2. Add translations object to component
3. Create page in `/src/pages/` importing Layout + sections
4. Copy page to each locale folder

### 7. Styling

- Use Tailwind v4 classes for all styling
- Icons from `@lucide/astro` package

## Blog Localization

### Content Structure

```
src/content/blog/
├── en/
│   ├── first-post.md
│   └── second-post.md
└── de/
    ├── willkommen-bei-astro.md
    └── moderne-webentwicklung.md
```

### Adding Blog Posts

1. **English posts**: Create `.md` or `.mdx` files in `/src/content/blog/en/`
2. **German posts**: Create `.md` or `.mdx` files in `/src/content/blog/de/`
3. **New languages**: Add folder (e.g., `/fr/`) and create posts

### Blog Architecture

- `/src/components/sections/BlogListSection.astro` - Filters posts by language
- `/src/pages/blog/index.astro` - English blog listing
- `/src/pages/de/blog/index.astro` - German blog listing
- Blog post pages automatically generated for each locale

## Key Files

- `/src/utils/i18n.ts` - Translation utilities
- `/src/layouts/Layout.astro` - Shared layout with language detection
- `/src/components/LanguageSwitcher.astro` - Language switching UI
- `/src/components/sections/BlogListSection.astro` - Localized blog listing
- `/astro.config.mjs` - i18n configuration
