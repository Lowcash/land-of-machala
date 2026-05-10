# Land of Machala Frontend Architecture

This document captures target frontend default and delivery order for project.
Use it to keep route, UI, styling, and Storybook decisions aligned while MVP surface stays intentionally small.

Use `docs/ARCHITECTURE.md` for repo-level ownership and `docs/BACKEND_ARCHITECTURE.md` for server and persistence posture.

## Goals

- keep public route surface intentionally small
- bootstrap stable Next.js foundation before deeper feature sprawl
- keep route files server-first and move interactivity into focused client leaves
- keep UI layer reusable without growing heavy shared system too early
- make Storybook part of approval flow, not late documentation cleanup
- keep localization and validation in place without letting them dictate public surface

## Runtime And Route Surface

Target runtime uses Next.js App Router under `src/app/`.

- `src/app/layout.tsx` owns document shell.
- Root route is canonical public surface.
- Login, registration, and origins onboarding should behave as root states, not as separate canonical routes unless real product reason appears.
- Locale should be resolved through cookie, session, or request state rather than visible locale-first URLs in public experience.

Current repo posture: documentation, runtime foundation, and design packets now live together here.
Current delivery target: keep auth and origins aligned across docs, Storybook, and runtime before expanding backend scope or adding deeper continuation states.

## UI Ownership

Target repository layout uses layered UI ownership under `src/components/`:

- `ui/core`: atomic primitives and layout helpers
- `ui/forms`: reusable field and validation-facing controls
- `ui/prefabs`: repeatable composed presentation patterns
- `features`: product flows such as auth, origins, and later gameplay-facing modules

Default rule:

- features compose prefabs and core primitives
- prefabs stabilize repeated visual structure
- core primitives stay small and product-agnostic

## Styling

- Tailwind CSS 4 should be configured through `src/app/globals.css`
- `@theme` should own tokens such as fonts, colors, and animation variables
- global base styles should live in `@layer base`
- repeated presentation patterns should move into variants, prefabs, or tokens instead of being recopied across features

Do not split styling entrypoint further until style system becomes hard to reason about as one file.

## Design Workflow

- `docs/design/system.md` owns visual-system rules and shared shell posture.
- `docs/design/flows/root-screen-flow.md` owns canonical root-state sequencing.
- `docs/design/screens/` owns screen-family packets such as auth and origins.
- `local/` owns generated static references such as Stitch HTML.
- Storybook should become live approval surface between docs and runtime implementation.

Screen work is not complete when only runtime exists. Packet docs, static reference linkage, Storybook baselines, and runtime output should agree.

## Internationalization

- `next-intl` is active i18n direction
- `src/i18n/routing.ts` should own supported locales and locale-aware navigation helpers
- `src/i18n/request.ts` should resolve request locale and message loading
- keep translation ownership server-first when possible

Current active locale scope is Czech and English only.

## Testing Surface

- Storybook for canonical screen review and reusable UI approval
- Vitest for unit and component tests
- add end-to-end tooling later only when repo actually introduces it

Every meaningful UI or runtime boundary change should leave behind clear validation path.

## Current Constraints

- runtime foundation is already bootstrapped, but deeper route growth and backend ownership are intentionally deferred
- root session model remains prototype until real server-backed session layer lands here
- public route surface should stay smaller than internal UI state surface
- design system is already rich enough; do not expand it unless root experience needs it

## Practical Rules

1. Treat root route as main product surface.
2. Keep route files server-first by default.
3. Add client boundaries only where browser APIs or local interaction genuinely require them.
4. Prefer composition over new global abstractions.
5. Land Storybook baseline for canonical root states before deeper backend or gameplay expansion.
6. Run lint, typecheck, and relevant Storybook or Vitest validation for every real boundary change once runtime exists here.
7. Update this document only when runtime shape, ownership model, or delivery workflow materially changes.
