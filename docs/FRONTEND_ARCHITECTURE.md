# Land of Machala Frontend Architecture

This document covers the frontend runtime, UI structure, styling ownership, localization surface, and validation posture.
It pairs with `docs/ARCHITECTURE.md` for the overview and `docs/BACKEND_ARCHITECTURE.md` for persistence and server-side growth.

## 1. Goals & Current Frontend Posture

- keep the public route surface intentionally small
- keep route files server-first and push interactivity into focused client leaves
- keep the UI system layered so shared patterns stay reusable without forcing premature abstraction
- let visual exploration converge before expanding component-level styling primitives

Current posture: the repository is in a reset phase. The root route is the canonical public surface and the first server-owned experience split already happens there.

## 2. Runtime & Route Surface

The repository is a Next.js 16 App Router application under `src/app/`.

### App Router

- `src/app/layout.tsx` owns the document shell.
- `src/app/[locale]/layout.tsx` currently owns locale-scoped layout composition, fonts, providers, and the global CSS import.
- `src/app/[locale]/page.tsx` is the canonical public surface during the current reset.

Default posture: keep route files server-first and push interactivity into focused client leaves.

### Public URL Policy

- The target public surface is a single canonical root URL on the primary domain.
- Active locale scope is Czech and English only for now, with locale resolved through cookie, session, or request state rather than through visible locale prefixes.
- Login, registration, and onboarding should behave as entry states of the root surface, not as separate canonical path routes.
- The root route now performs the first server-owned experience split: anonymous entry, onboarding, and authenticated continuation are resolved from a server-readable session snapshot instead of from public route paths.

## 3. UI Ownership Model

The repository uses a layered component system under `src/components/`.

| Layer        | Location                    | Responsibility                                                           |
| :----------- | :-------------------------- | :----------------------------------------------------------------------- |
| **Core UI**  | `src/components/ui/core`    | Atomic primitives, layout helpers, and variant-driven building blocks    |
| **Forms UI** | `src/components/ui/forms`   | Reusable field composition and validation-facing controls                |
| **Prefabs**  | `src/components/ui/prefabs` | Semantic and repeatable presentation patterns, including motion wrappers |
| **Features** | `src/components/features`   | Product flows such as auth, origins, and game-facing modules             |

The intended direction is simple:

- features compose prefabs and core primitives
- prefabs stabilize repeated layout and visual patterns
- core primitives stay product-agnostic and small

## 4. Styling & Design Direction

Styling is driven by Tailwind CSS 4 with a CSS-first setup in `src/app/globals.css`.

- `@import 'tailwindcss'` is the entrypoint.
- `@theme` owns tokens such as fonts, colors, and reusable animation variables.
- shared global base styles are defined in `@layer base`
- repeated visual behavior should move into variants, prefabs, or tokens instead of being recopied across features

`src/app/globals.css` is the current single styling entrypoint. There is no need to split it into `src/styles/` until the style system grows enough to justify multiple coordinated CSS modules.

### Design Iteration Posture

- UX and visual exploration can stay more flexible during the current reset.
- Once one branch becomes the accepted direction, new prompts and implementations should reduce variance rather than increase it.
- Typography, inner-container structure, footer behavior, and major visual primitives should converge early once the product direction feels right.

## 5. Internationalization & Navigation

Internationalization is handled through `next-intl`.

- `src/i18n/routing.ts` owns supported locales and locale-aware navigation wrappers.
- `src/i18n/request.ts` resolves request locale and message loading.
- client components in localized flows should use navigation helpers from `@/i18n/routing`

Current active locale scope is intentionally narrow: Czech and English only.

Keep translation ownership server-first when possible and avoid shipping large message payloads into client-only code unless it is clearly needed.

## 6. Testing & Validation Surface

The repository already has the shape of a strong multi-layer validation setup:

- **Vitest** for unit and component tests under `src/**/*.test.*`
- **Storybook** for isolated UI development and story-driven validation
- **Playwright** for end-to-end flows under `e2e/`

The next step is operational consistency: align scripts, docs, and expected pre-merge checks so the validation surface is easy to run and reason about.

## 7. Current Strengths

- App Router plus hidden-locale-ready `next-intl` structure is already in place.
- The UI layer has real separation between core primitives, prefabs, and features.
- The repository already uses modern tooling: React 19, Next.js 16, Storybook, Vitest, Playwright, Tailwind v4, and `next-intl`.

## 8. Current Frontend Gaps

- The current root session snapshot is a pre-alpha cookie-backed prototype, not the final database-backed auth session model.
- Locale still shapes the internal app structure more than the desired public experience.
- The design system is richer than the immediate MVP needs, so the project should stop expanding public UI surface area until the root experience settles.

## 9. Practical Development Workflow

1. Keep the public route surface minimal and treat new routes as exceptions, not defaults.
2. Build only the reusable UI needed to support the current root flow cleanly.
3. Validate with linting, typecheck, Vitest, and the relevant Playwright flow.
4. Update frontend architecture or instruction docs when a real runtime boundary changes.

The project should remain product-first and lean while the MVP reset is in progress. Reuse is valuable only after the smaller surface is stable.
