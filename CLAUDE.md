# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Next.js that serves blog posts written in Markdown with support for multiple locales (English and Portuguese). The site features dark/light themes, RSS feed generation, and SEO capabilities.

## Development Commands

### Setup

```bash
npm install
npm run dev  # Start development server at http://localhost:3000
```

### Testing

```bash
npm test              # Run tests in watch mode
npm run ci            # Run prettier, linter, and tests (for CI)
```

Note: Tests use test fixtures in `test/content/posts/` directory, not the actual content.

### Building & Linting

```bash
npm run build         # Build production bundle
npm run lint          # Run ESLint
npm run prettify      # Format code with Prettier
```

### Running a Single Test

```bash
npx jest test/lib/content.test.js           # Run specific test file
npx jest -t "test name pattern"             # Run tests matching pattern
```

## Architecture

### Content System

The content system is the core of this site, handling Markdown posts with frontmatter metadata.

**Key file:** `lib/content.js`

- `getContentMetadata(type, locale)` - Returns sorted array of post metadata for a specific locale
- `getGroupedContentMetadata(type, locale)` - Returns posts grouped by year-month
- `getAllContentSlugs(type, forLocales)` - Returns slugs for static path generation
- `getContentData(type, slug, options)` - Processes markdown to HTML using remark/rehype pipeline

**Content processing pipeline:**

1. Read markdown files from `content/posts/`
2. Parse frontmatter with `gray-matter`
3. Calculate reading time
4. Convert markdown → rehype AST using `remark` → `remarkGfm` → `remarkRehype`
5. Process HTML with `rehypeRaw`, `rehypePrism` (syntax highlighting), and URL transformations
6. Generate final HTML string

**Frontmatter fields:**

- `title`, `description`, `datePublished`, `author`, `tags`, `image`
- `lang` (defaults to 'en' if not specified)
- `alternate` (array of objects with `slug` and `lang` for translations)

### Internationalization (i18n)

The site uses Next.js i18n routing with custom string management.

**Locales:** `en` (default), `pt-BR`
**Configuration:** `next.config.js` defines locales and legacy redirects
**Strings:** `content/i18n.js` exports `i18nKeys` object and `i18n()` hook

The `i18n()` function uses Next.js router context to determine active locale. Some strings are React components/functions (e.g., `bioShortText`).

### Static Generation

Pages are pre-generated at build time using Next.js SSG.

- **Homepage** (`pages/index.js`): Generates RSS feed and sitemap during build for 'en' locale only
- **Post pages** (`pages/posts/[slug].js`): Uses `getStaticPaths` with all locales to pre-generate every post variant
- **About page** (`pages/about.js`): Standard static page with locale support

### Environment Variables

Required in `.env`:

- `CONTENT_FOLDER` - Path to content directory (default: `content`)
- `NEXT_PUBLIC_SITE_DOMAIN` - Site domain for absolute URLs in RSS/sitemap

Test environment uses `.env.test` to override with test fixtures.

### Styling

- Global styles in `styles/globals.css`
- CSS Modules for component-specific styles (e.g., `styles/Post.module.css`)
- Theme system in `components/Theme.js` and `components/ThemeToggle.js` using CSS custom properties
- Syntax highlighting styles defined in global CSS using Prism themes

## Testing Notes

- Tests are in `test/` directory mirroring source structure
- Test data lives in `test/content/posts/`
- Jest configured with `jsdom` environment for React component testing
- Uses `@testing-library/react` for component tests
- CSS modules mocked with `identity-obj-proxy`
- ESModules in node_modules are transformed (required for remark/rehype packages)

## Deployment

The site deploys automatically to Vercel when code is pushed to the `main` branch. No manual deployment steps needed.

## Node Version

Use Node.js 20.18.2 (specified in `.tool-versions`).
