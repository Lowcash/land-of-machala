# Copilot Instructions

Use this repository's `.github` customization stack as the primary active guidance layer.

## Tech Stack

Current versions in use (update line items as the project upgrades):

- **Framework**: Next.js 16+ (App Router under `src/app`)
- **UI Framework**: React 19+
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4+ (single CSS entrypoint, currently `src/app/globals.css`)
- **I18n**: `next-intl`
- **Motion**: CSS-first for simple transitions, Framer Motion for complex presence/layout choreography
- **Testing**: Vitest, Storybook, Playwright E2E

## Foundational Guidance

- `.github/instructions/architecture.instructions.md` - component layering, ownership boundaries, and state placement
- `.github/instructions/next-app-router.instructions.md` - App Router, locale routing, server/client boundaries, and future server actions
- `.github/instructions/data-and-state.instructions.md` - server data, server actions, route handlers, caching, and client state choices
- `.github/instructions/clean-code.instructions.md` - fail-fast coding rules, duplication cleanup, and maintenance discipline
- `.github/instructions/imports.instructions.md` - alias ownership and import direction rules
- `.github/instructions/testing.instructions.md` - Vitest, Storybook, and Playwright expectations
- `.github/instructions/design-system.instructions.md` - `ui/core`, `ui/prefabs`, forms, tokens, and styling rules
- `.github/instructions/i18n-and-actions.instructions.md` - `next-intl`, locale-aware navigation, forms, and mutation boundaries
- `docs/ARCHITECTURE.md` - top-level architecture overview and document map
- `docs/FRONTEND_ARCHITECTURE.md` - frontend runtime, UI, styling, i18n, and testing overview
- `docs/BACKEND_ARCHITECTURE.md` - proposed backend, persistence, session, and route-surface architecture

Repository notes override more general guidance when they conflict.

## Repository Notes

- App Router files live under `src/app/`, not `app/` at the repo root.
- Locale-aware navigation should go through `src/i18n/routing.ts` wrappers instead of raw `next/navigation` in translated flows.
- Global styles currently live in `src/app/globals.css` and act as the Tailwind v4 entrypoint plus token registry. If the style system grows substantially, split style modules under `src/styles/` and keep a single import from the root layout.
- Keep Prisma in `prisma/schema.prisma` while the model is still compact. Revisit schema modularization only when the file stops being easy to reason about as one unit.
- Match Prettier output for touched source, JSON, and Markdown files before finishing a change. Prefer formatting only the files you touched rather than reformatting the whole repository.
- For Stitch work, use `local/STITCH_PROMPTS.md` as the operational workflow note. Keep only stable repository-level design constraints here; keep iterative prompt tactics, model choice, and pass templates in the local file.
- Prefer reusable foundations, but do not prematurely turn this repository into a shared UI monolith.
- Prefer current stable platform patterns by default; avoid experimental APIs unless there is a clear gain and an exit plan.
- The gameplay experience may intentionally live on a small set of canonical routes; do not force every in-game screen into its own URL without a real UX benefit.
- Narrative and lore text should stay server-first; only the minimum client strings needed for interactive leaves should cross the boundary.
- Storybook is part of the component workflow; reusable UI work should remain testable and inspectable in isolation.
