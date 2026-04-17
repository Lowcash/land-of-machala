---
applyTo: 'src/app/**/*.{ts,tsx},src/i18n/**/*.{ts,tsx},src/providers/**/*.{ts,tsx},src/lib/**/*.{ts,tsx}'
---

# Next.js App Router

This project uses Next.js App Router under `src/app/` with locale-aware routing.
Default to server-first composition and keep client boundaries as small as practical.

## Route & Layout Boundaries

- `src/app/layout.tsx` owns the document shell.
- `src/app/[locale]/layout.tsx` owns locale-specific providers, fonts, and global composition for localized routes.
- Special route files such as `layout.tsx`, `template.tsx`, `loading.tsx`, `error.tsx`, and route handlers belong under `src/app/**` only.
- Use `template.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` when a route genuinely benefits from them; do not scaffold all special files by default.
- Route pages should stay focused on composition, redirects, metadata, and server-derived data.
- Prefer route groups for major flow segmentation when it improves clarity.

## Server vs Client

- Default to server components for pages, layouts, and content assembly.
- Add `'use client'` only where interactivity, browser APIs, or client-only state are required.
- Keep client components as leaf nodes when possible.
- Avoid turning broad route shells or large content trees into client components just to support one interactive child.
- Do not import server-only code, secrets, or privileged integrations into client components.

## Locale-Aware Navigation

- Use wrappers from `src/i18n/routing.ts` for locale-aware `Link`, `redirect`, `useRouter`, and related helpers.
- Avoid raw `next/navigation` in localized user flows unless the code is intentionally locale-agnostic.
- Keep supported locales and default locale owned by `src/i18n/routing.ts`.

## Metadata & Request Data

- Keep static metadata close to the route or layout that owns it.
- Use server utilities to resolve request-aware values when metadata depends on locale or route context.
- Keep request config and message loading logic focused; avoid leaking large translation payloads into client bundles.

## Route Handlers And Mutations

- Use route handlers for public HTTP endpoints, uploads, streaming, or third-party callbacks.
- Keep server actions or route handlers close to the app boundary, then delegate privileged work to server-only helpers.
- See `data-and-state.instructions.md` for mutation, cache, and state guidance.

## Performance Defaults

- Prefer server rendering and streaming-friendly composition over moving broad trees to the client.
- Streaming-friendly composition means async server components and focused `Suspense` boundaries around slow subtrees instead of one large blocking page fetch.
- SSR or RSC is not automatically faster for every path, but it is usually the right default here for first render, content privacy, and server-owned narrative data.
- Keep route shells static or cacheable whenever possible; avoid making entire routes dynamic unless the request actually requires it.
- Rely on Next.js prefetch behavior where it helps normal route transitions, but do not over-engineer prefetch or hydration strategy before real navigation patterns exist.
- Keep providers lean and only as global as they need to be.