# Source Tree Delta

Use root `AGENTS.md` first. This file adds current runtime-specific rules for `src/`.

## Current Runtime Shape

- Public runtime currently centers on one canonical `/` route.
- `src/app/page.tsx` delegates to root auth and origins flow instead of expanding public route surface.
- There is no `src/app/[locale]/` route segment in current tree.
- Hidden locale handling is current direction; do not introduce visible locale-prefixed routes without updating docs and product direction together.

## I18n

- Current i18n implementation lives in `src/i18n/` and `src/lib/i18n.ts`.
- Keep `src/i18n/request.ts` focused on request config and `src/i18n/routing.ts` focused on locale ownership.
- Do not assume locale-aware navigation wrappers exist unless they are actually present in tree.

## Current Data Posture

- Auth and origins flows are currently demo-driven from `src/lib/auth/` plus `messages/`.
- Do not introduce `src/lib/server/*`, Prisma, or real auth persistence unless task is explicitly backend-facing.

## Current Validation Surface

- Current repo validation layers inside runtime work are Vitest and Storybook.
- There is no Playwright or `e2e/` layer in current tree.
- For UI regression confidence, prefer stories, story-driven review, and focused Vitest coverage until an e2e layer is actually introduced.
