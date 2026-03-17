# Gulf Estates Frontend — Copilot Instructions

## Build & Dev Commands

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server (next start)
node server.js    # Custom HTTP server used for Namecheap hosting (production only)
```

> No lint or test scripts are configured. ESLint is disabled during builds (`eslint.ignoreDuringBuilds: true`).

## Architecture Overview

**Next.js 15 App Router** with all user-facing routes under `src/app/[locale]/`. Every URL is locale-prefixed (e.g. `/en/properties`, `/fr/off-plan`). The root `/` redirects to `/en` via `next.config.mjs`.

**i18n Setup (two-layer)**:
- Server/layout layer uses `next-i18next` (config in `next-i18next.config.cjs`)
- Client components use `react-i18next` initialised in `src/lib/i18n.ts`
- `ClientI18nProvider` (wraps the locale layout) syncs the active language and sets the `NEXT_LOCALE` cookie
- Translation files live in `public/locales/{en,fr,es}/{namespace}.json`
- Namespaces: `common`, `home`, `search`, `featuredProperties`, `off-plan`, `properties`, `buy-rent`, `blogs`, `team`, `contact`, `about`, `interest`, `property`, `careers`

**Page rendering pattern**: Most pages are `"use client"` and fetch data via `useEffect`. Complex detail pages split into a thin server `page.tsx` that renders a `*PageClient.tsx` client component (e.g. `off-plan/[id]/PageClient.tsx`).

**Backend API**: All data comes from the REST API at `NEXT_PUBLIC_API_URL`. Page banner content is loaded with `fetchPageContentByType(pageType, locale)` from `src/utils/pageContent.ts`.

**Middleware** (`src/middleware.ts`): Enforces locale prefix on all routes. Invalid or missing locales redirect to `/en`. Sets `x-current-path` and `x-current-url` response headers (used by the layout for metadata).

## Key Conventions

### Locale Handling
- Always validate locales with `validateLocale()` from `src/utils/routeSecurity.ts` before using `params.locale` in client components
- Valid locales are `en`, `fr`, `es` — defined in `VALID_LOCALES` (multiple places; treat `src/utils/routeSecurity.ts` as the source of truth)
- API responses can have multilingual object fields `{ en: "...", fr: "...", es: "..." }` — use `getLocalizedValue(value, locale)` from `src/utils/localization.ts` to extract the correct string
- Use `getSlug(slug, locale)` for localised slug fields from API data

### Navigation / URL Building
- Never construct query strings or route URLs manually; use `buildSafeQueryString(filters)` and `buildSafeUrl(path, queryString)` from `src/utils/routeSecurity.ts`
- Only keys listed in `ALLOWED_QUERY_KEYS` are permitted as query params

### HTML from the API
- Use `cleanHtmlForDisplay(html)` for property descriptions and general content (strips dangerous tags, Quill artifacts, inline styles)
- Use `sanitizeBlogContent(html)` for blog post bodies (allows a richer tag set)
- Both functions are in `src/utils/htmlCleaner.ts` and use `isomorphic-dompurify` for SSR safety

### Metadata
- Static per-page SEO metadata is defined in `siteMetadata` in `src/lib/metadata.ts` using path keys **without** locale prefix (e.g. `"/properties"`)
- `getMetadata(pathname)` strips the locale prefix before lookup — pass the raw `x-current-path` header value
- When adding a new route, add an entry to `siteMetadata`

### Styling
- **Tailwind CSS v4** — uses `@import "tailwindcss"` in `globals.css` (no `tailwind.config.js`)
- Brand tokens are CSS variables and are available as Tailwind utilities:
  - `text-primary` / `bg-primary` → `#01366f` (navy blue)
  - `text-gold` / `bg-gold` → `#deb66a` (gold)
- Fonts: `font-primary` (Poppins, body), `font-hero` (Baskervville), `font-secondary` (Playfair Display)
- Dark mode variables are set but intentionally keep the white background (`--background: #ffffff`)

### Loading States
- Pair every data-fetching section with a `*Skeleton` component (see `HeroSectionSkeleton`, `FeaturedOffPlansSectionSkeleton`, etc.)
- Render the skeleton while `loading` state is `true`, swap to the real component on data arrival

### Prices
- Always format prices through `formatPrice(price)` from `src/utils/priceFormatter.ts`
- Output is always full number with commas + ` AED` (e.g. `"1,500,000 AED"`); never abbreviates to "M"

### Images
- Static site assets live in `public/images/`
- Property/off-plan images come from Cloudinary (`res.cloudinary.com`) — already whitelisted in `next.config.mjs`
- Use `next/image` for all images; `unoptimized` is `true` in development

### JSON-LD Schemas
- Schema markup is generated per-locale in `src/lib/jsonLdSchemas.ts`
- Inject via a `<script type="application/ld+json">` tag in the relevant page component

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend REST API base URL |
| `NEXT_PUBLIC_BASE_URL` | Canonical site URL (used in metadata & schemas) |
| `NEXT_PUBLIC_GOOGLE_TAGMANAGER_ID` | GTM container ID |
