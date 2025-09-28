# Promo Site

Astro-powered marketing website with internationalization support and modern animations.

## 🛠️ Tech Stack

- **Framework**: Astro with TypeScript
- **Styling**: Tailwind CSS v4
- **Internationalization**: Built-in Astro i18n (English/German)
- **Content**: Markdown with frontmatter + Content Collections
- **Animations**: GSAP for smooth animations
- **Carousel**: Embla Carousel with autoplay
- **Icons**: Lucide Astro icons
- **SEO**: Sitemap, RSS, OpenGraph support

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm package manager

### Installation

1. Install dependencies:

    ```bash
    pnpm install
    ```

2. Set up environment variables:

    ```bash
    cp .env.example .env
    ```

3. Configure environment variables (see Environment Variables section)

4. Start development server:
    ```bash
    pnpm dev
    ```

The site will be available at [http://localhost:4321](http://localhost:4321)

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Astro Commands
pnpm astro ...        # Run Astro CLI commands
pnpm astro add        # Add integrations
pnpm astro check      # Check for issues
```

## 🌍 Internationalization

The site supports multiple languages with built-in Astro i18n:

### Supported Languages

- **English** (en) - Default language
- **German** (de) - Secondary language

### Architecture

#### Translation System

Each component contains its own translations using the `useTranslations` utility:

```astro
---
import { useTranslations } from '@/utils/i18n';

const translations = {
  en: {
    title: 'Welcome to our site',
    description: 'This is our amazing product'
  },
  de: {
    title: 'Willkommen auf unserer Seite',
    description: 'Das ist unser großartiges Produkt'
  }
};

const $t = useTranslations(translations, Astro.currentLocale);
---

<h1>{$t('title')}</h1>
<p>{$t('description')}</p>
```

#### Page Structure

```
src/pages/
├── index.astro           # English homepage
├── about.astro          # English about page
├── blog/
│   └── index.astro      # English blog listing
├── de/
│   ├── index.astro      # German homepage
│   ├── about.astro      # German about page
│   └── blog/
│       └── index.astro  # German blog listing
```

#### Content Collections

Blog posts are organized by language:

```
src/content/blog/
├── en/
│   ├── first-post.md
│   └── product-launch.md
└── de/
    ├── willkommen.md
    └── produkt-ankuendigung.md
```

### Adding New Languages

1. Add locale to `astro.config.mjs`:
   ```js
   i18n: {
     defaultLocale: 'en',
     locales: ['en', 'de', 'fr'], // Add 'fr'
   }
   ```

2. Add translations to component objects
3. Create new locale folder in `src/pages/`
4. Copy page files to new locale folder
5. Add content in `src/content/blog/fr/`

### Adding New Pages

1. Create section components in `src/components/sections/`
2. Add translation objects to components
3. Create page in `src/pages/` importing Layout + sections
4. Copy page to each locale folder (`de/`, etc.)

## 🎨 Styling & Design

### Tailwind CSS v4

The site uses the latest Tailwind CSS v4 with:

- Modern CSS features
- Custom design tokens
- Responsive design
- Dark mode support (optional)

### Animations

GSAP is used for smooth, performant animations:

- Scroll-triggered animations
- Page transitions
- Interactive elements
- Loading animations

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/       # Page sections with translations
│   ├── ui/            # Reusable UI components
│   └── Layout.astro   # Base layout
├── content/
│   └── blog/          # Blog posts by language
│       ├── en/
│       └── de/
├── pages/             # Route pages
│   ├── blog/
│   └── de/           # German routes
├── styles/            # Global styles
├── utils/
│   └── i18n.ts       # Translation utilities
└── env.d.ts
```

## 📝 Content Management

### Blog Posts

Create new blog posts in the appropriate language folder:

```markdown
---
title: 'Post Title'
description: 'Post description'
pubDate: 2024-01-15
author: 'Author Name'
tags: ['astro', 'blog']
---

# Content here...
```

### Page Content

All content lives in reusable section components with built-in translations. Pages are thin wrappers that import and compose sections.

## ⚙️ Environment Variables

```env
# Application URLs
PUBLIC_APP_URL=https://app.example.com

# Site Configuration
PUBLIC_SITE_URL=https://example.com
```

### Environment Setup

1. **Development**: Copy `.env.example` to `.env`
2. **Production**: Configure environment variables in your deployment platform

## 🔧 Configuration

### Astro Config

Key configuration in `astro.config.mjs`:

```js
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  // ... other config
});
```

### Tailwind Config

Tailwind CSS v4 configuration in `tailwind.config.ts`.

## 🚀 Deployment

### Production Build

```bash
# Build the site
pnpm build

# Preview the build
pnpm preview
```

### Static Site

The site is built as a static site by default, suitable for:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Server-Side Rendering (SSR)

To enable SSR, add an adapter to `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
});
```

## 📊 SEO & Performance

### Built-in Features

- **Sitemap**: Automatically generated
- **RSS Feed**: Available at `/rss.xml`
- **OpenGraph**: Meta tags for social sharing
- **Performance**: Optimized for 100/100 Lighthouse scores

### Meta Tags

Pages include comprehensive meta tags:

- Title and description
- OpenGraph for social media
- Twitter Card support
- Canonical URLs

## 🧪 Development Guidelines

### Component Architecture

- Components are self-contained with translations
- Prefer composition over inheritance
- Use TypeScript for all components
- Follow Astro best practices

### Styling Guidelines

- Use Tailwind CSS utility classes
- Create custom components for repeated patterns
- Maintain consistent spacing and typography
- Ensure responsive design

### Performance

- Optimize images with Astro's image optimization
- Use static generation when possible
- Minimize JavaScript bundle size
- Leverage Astro's partial hydration

## 🤝 Contributing

1. Follow existing code patterns
2. Add translations for all user-facing text
3. Test across different screen sizes
4. Ensure accessibility compliance
5. Run build checks before committing

## 🔗 Related Documentation

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP Documentation](https://greensock.com/docs)
- [Lucide Icons](https://lucide.dev)