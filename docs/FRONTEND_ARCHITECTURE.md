# Land of Machala Frontend Architecture

This document captures the current frontend default for the project.
Use it to keep route, UI, and styling decisions aligned while the MVP surface stays intentionally small.

Use `docs/ARCHITECTURE.md` for the overview and `docs/BACKEND_ARCHITECTURE.md` for persistence and server ownership.

## Goals

- keep the public route surface intentionally small
- keep route files server-first and move interactivity into focused client leaves
- keep the UI layer reusable without growing a heavy design system too early
- keep localization and validation in place without letting them dictate the public surface

## Runtime And Route Surface

- The app uses Next.js App Router under `src/app/`.
- `src/app/layout.tsx` owns the document shell.
- The root route is the canonical public surface.
- Login, registration, onboarding, and authenticated continuation should behave as root states, not as separate canonical routes, unless a real product reason appears.
- Locale should be resolved through cookie, session, or request state rather than through visible locale-first URLs in the public experience.

Current posture: the root route already performs the first server-owned experience split between anonymous entry and authenticated continuation.

## UI Ownership

The repository uses layered UI ownership under `src/components/`:

- `ui/core`: atomic primitives and layout helpers
- `ui/forms`: reusable field and validation-facing controls
- `ui/prefabs`: repeatable composed presentation patterns
- `features`: product flows such as auth, origins, and gameplay-facing modules

Default rule:

- features compose prefabs and core primitives
- prefabs stabilize repeated visual structure
- core primitives stay small and product-agnostic

## Styling

- Tailwind CSS 4 is configured through `src/app/globals.css`
- `@theme` owns tokens such as fonts, colors, and animation variables
- global base styles live in `@layer base`
- repeated presentation patterns should move into variants, prefabs, or tokens instead of being recopied across features

Do not split the styling entrypoint further until the style system actually becomes hard to reason about as one file.

## Internationalization

- `next-intl` is the active i18n layer
- `src/i18n/routing.ts` owns supported locales and locale-aware navigation helpers
- `src/i18n/request.ts` resolves request locale and message loading
- keep translation ownership server-first when possible

Current active locale scope is Czech and English only.

## Testing Surface

- Vitest for unit and component tests
- Storybook for isolated UI review
- Playwright for end-to-end flows

Every meaningful UI or runtime boundary change should leave behind a clear validation path.

## Current Constraints

- the current root session snapshot is still a prototype, not the final database-backed session model
- the public route surface should stay smaller than the internal UI state surface
- the design system is already rich enough; do not expand it unless the root experience needs it

## Practical Rules

1. Treat the root route as the main product surface.
2. Keep route files server-first by default.
3. Add client boundaries only where browser APIs or local interaction genuinely require them.
4. Prefer composition over new global abstractions.
5. Run lint, typecheck, and the relevant Playwright or Vitest coverage for every real boundary change.
6. Update this document only when the runtime shape or ownership model actually changes.
