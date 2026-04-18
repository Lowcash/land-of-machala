# Land of Machala Architecture Overview

This file is the top-level map for the repository architecture.
It exists so `ARCHITECTURE.md` is not implicitly "frontend only" while `BACKEND_ARCHITECTURE.md` sits beside it.

## 1. Current Product Direction

Land of Machala is in a pre-alpha reset phase.
The active architectural priority is one clean canonical root surface, a small public route footprint, and explicit server-owned continuation logic.

Current cross-cutting decisions:

- The public experience should center on one canonical root route.
- Active locale scope is Czech and English only.
- Locale should be resolved through request or cookie state instead of visible public locale prefixes.
- Auth entry, onboarding, and authenticated continuation should behave as root states, not as separate permanent public routes.
- Design exploration can stay looser for now, but once one branch stabilizes, typography and layout rules should tighten to avoid multiple competing visual systems.

## 2. Document Map

- `docs/FRONTEND_ARCHITECTURE.md` explains App Router structure, UI layering, styling, i18n, testing, and frontend workflow boundaries.
- `docs/BACKEND_ARCHITECTURE.md` explains persistence, auth and session direction, server module ownership, and the current Postgres plus Prisma plan.
- `.github/` instruction files define day-to-day coding rules for architecture, routing, testing, design system boundaries, and i18n or mutation behavior.
- `local/STITCH_PROMPTS.md` is the active design-iteration workflow note for Stitch. It is a working design aid, not public architecture documentation.

## 3. Shared Constraints

These constraints apply across both the frontend and backend docs:

- Keep the route surface intentionally small.
- Keep server ownership explicit for auth, progression, and narrative-sensitive state.
- Prefer pragmatic, compact structures until a boundary becomes hard to reason about.
- Do not split `src/app/globals.css` or `prisma/schema.prisma` purely in anticipation of future scale.
- Add new architecture documents only when they reduce ambiguity more than they increase maintenance overhead.

## 4. Update Policy

- Update this overview when the product direction, document map, or cross-cutting constraints materially change.
- Update the frontend document when runtime structure, UI layering, styling ownership, i18n behavior, or validation expectations change.
- Update the backend document when persistence, auth, session, server module, or integration boundaries change.

This keeps the repository readable at two levels: one overview file for orientation, then focused frontend and backend documents for implementation detail.
