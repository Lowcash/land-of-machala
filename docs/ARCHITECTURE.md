# Land of Machala Technical Architecture

This repository is a Next.js 16 App Router application under `src/app/` with locale-aware routing, a layered UI system, and a growing validation surface built around Vitest, Storybook, and Playwright.

It is currently both a product codebase and a candidate seed for future Next.js fullstack work. That means the architecture should stay practical and explicit: reusable where patterns are proven, but not prematurely abstracted into a shared platform.

## 1. Runtime Structure

### App Router

- **`src/app/layout.tsx`** owns the document shell.
- **`src/app/[locale]/layout.tsx`** owns locale-scoped layout composition, fonts, providers, and the global CSS import.
- **`src/app/[locale]/page.tsx`** currently redirects localized root traffic into the auth flow.
- **`src/app/[locale]/(auth)/...`** holds current authentication and onboarding-oriented route groups.

Default posture: keep route files server-first and push interactivity into focused client leaves.

## 2. Layered UI Model

The repository uses a layered component system under `src/components/`.

| Layer | Location | Responsibility |
| :--- | :--- | :--- |
| **Core UI** | `src/components/ui/core` | Atomic primitives, layout helpers, and variant-driven building blocks |
| **Forms UI** | `src/components/ui/forms` | Reusable field composition and validation-facing controls |
| **Prefabs** | `src/components/ui/prefabs` | Semantic and repeatable presentation patterns, including motion wrappers |
| **Features** | `src/components/features` | Product flows such as auth, origins, and game-facing modules |

The intended direction is simple:

- features compose prefabs and core primitives
- prefabs stabilize repeated layout and visual patterns
- core primitives stay product-agnostic and small

## 3. Styling & Design Tokens

Styling is driven by Tailwind CSS 4 with a CSS-first setup in `src/app/globals.css`.

- `@import 'tailwindcss'` is the entrypoint.
- `@theme` owns tokens such as fonts, colors, and reusable animation variables.
- shared global base styles are defined in `@layer base`
- repeated visual behavior should move into variants, prefabs, or tokens instead of being recopied across features

`src/app/globals.css` is the current single styling entrypoint. There is no need to split it into `src/styles/` until the style system grows enough to justify multiple coordinated CSS modules.

## 4. Internationalization & Navigation

Internationalization is handled through `next-intl`.

- **`src/i18n/routing.ts`** owns supported locales and locale-aware navigation wrappers.
- **`src/i18n/request.ts`** resolves request locale and message loading.
- client components in localized flows should use navigation helpers from `@/i18n/routing`

Keep translation ownership server-first when possible and avoid shipping large message payloads into client-only code unless it is clearly needed.

## 5. Testing Surface

The repository already has the shape of a strong multi-layer validation setup:

- **Vitest** for unit and component tests under `src/**/*.test.*`
- **Storybook** for isolated UI development and story-driven validation
- **Playwright** for end-to-end flows under `e2e/`

The next step is operational consistency: align scripts, docs, and expected pre-merge checks so the validation surface is easy to run and reason about.

## 6. Current Strengths

- App Router plus locale structure is already in place.
- The UI layer has real separation between core primitives, prefabs, and features.
- The repository already uses modern tooling: React 19, Next.js 16, Storybook, Vitest, Playwright, Tailwind v4, and `next-intl`.

## 7. Current Gaps

- The previous guidance lived in `.agents/`; the repository is now moving to a clearer `.github/` instruction stack.
- `package.json` previously lacked the same quality script surface used in the more mature web projects.
- Fullstack mutation boundaries are not yet formalized; future server actions, auth, mail, or persistence integrations should be added with explicit server-only ownership.

## 8. Practical Development Workflow

1. Build reusable UI in `ui/core`, `ui/forms`, or `ui/prefabs` first when the pattern has reuse value.
2. Compose those pieces into a feature module.
3. Validate with linting, typecheck, Vitest, and the relevant Playwright flow.
4. Update architecture or instruction docs when a real boundary changes.

This repository should remain product-first, but disciplined enough that its strongest patterns can later be extracted into a shared Next.js foundation if more similar projects appear.
