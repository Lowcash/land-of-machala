---
applyTo: 'src/i18n/**/*.{ts,tsx},src/app/**/*.{ts,tsx},src/components/features/**/*.{ts,tsx},src/components/ui/forms/**/*.{ts,tsx},src/lib/**/*.{ts,tsx}'
---

# I18n, Forms, And Mutation Boundaries

This instruction file is mostly general, but this repository currently prefers server-first translations.
For content-heavy or sensitive applications, protecting unrevealed text matters as much as rendering it correctly.

## Why `next-intl`

- Next.js provides routing primitives and locale-aware infrastructure, but it does not provide a complete App Router message-layer solution for dictionaries, formatting, and ergonomic locale-aware navigation.
- `next-intl` fills that gap with server-friendly message loading, formatting helpers, and routing wrappers that fit this repository better than hand-rolled message plumbing.

## Translation Ownership

- Resolve narrative, lore, and page-content translations on the server whenever possible.
- Client components should receive only the specific strings they need for local interactivity.
- Do not expose full gameplay or story namespaces to the client bundle.
- Keep `src/i18n/request.ts` focused on request locale and message loading, and `src/i18n/routing.ts` focused on routing ownership.

## Locale-Aware UI Flows

- In translated flows, use `@/i18n/routing` wrappers instead of raw Next navigation helpers.
- Keep locale-aware redirects, links, and path generation centralized through that wrapper layer.
- When client components need navigation, pass only the routing helper they need or import the localized wrapper directly.

## Forms

- Use `react-hook-form` plus Zod where interactive forms need immediate validation and typed payloads.
- Keep UI-facing field labels and validation copy separate from the submission boundary.
- Canonical validation must still happen at the server action or route-handler boundary.
- Prefer progressive enhancement where practical: if a form can submit through a server boundary without depending on heavy client orchestration, do not force JavaScript-only behavior.

## Server Actions From An I18n Perspective

- Prefer returning typed machine-readable results from actions rather than preformatted UI prose from deep server helpers.
- Translate user-facing messages at the route or feature boundary unless the message is truly infrastructure-owned.
- Sensitive or story-bearing content should remain server-side and only be revealed when the user is entitled to see it.
