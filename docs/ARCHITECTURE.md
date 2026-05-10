# Land of Machala Architecture Overview

This file is the top-level map for repository architecture and documentation ownership.
It exists so `ARCHITECTURE.md` stays about repo shape, source-of-truth boundaries, and delivery priorities rather than turning into frontend or backend catch-all prose.

## 1. Current Product Direction

Land of Machala is in a pre-alpha reset phase.
Current architectural priority is frontend-first stabilization around one canonical root surface, small public route footprint, strong documentation hygiene, and explicit server-owned continuation boundaries.

Current cross-cutting decisions:

- The public experience should center on one canonical root route.
- Active locale scope is Czech and English only.
- Locale should be resolved through request or cookie state instead of visible public locale prefixes.
- Auth entry and origins onboarding should behave as root states, not as separate permanent public routes.
- Deeper realm continuation can arrive later without expanding public route footprint.
- Frontend foundation, Storybook approval states, and scalable design packets come before deeper backend expansion.
- This repository is maintained source of truth for architecture, design packets, Storybook baselines, and runtime implementation.

## 2. Documentation Layers

- `docs/FRONTEND_ARCHITECTURE.md` explains target runtime structure, UI layering, styling, i18n, testing, and frontend delivery rules.
- `docs/BACKEND_ARCHITECTURE.md` explains target persistence, auth, session, server module ownership, and backend scope guardrails.
- `docs/design/README.md` explains design-doc map, packet rules, and artifact chain for screen-level work.
- `AGENTS.md` defines primary operational coding rules for architecture, routing, testing, design system boundaries, and i18n or mutation behavior. Nested `AGENTS.md` files add subtree-specific deltas where needed.

## 3. Ownership Boundaries

- `ARCHITECTURE.md` owns repo roles, document map, and cross-cutting constraints.
- `FRONTEND_ARCHITECTURE.md` owns runtime and UI guidance, not screen-by-screen packet content.
- `BACKEND_ARCHITECTURE.md` owns server and persistence direction, not visual flow specs.
- `docs/design/` owns visual system docs, root-flow docs, and canonical screen packets.
- `local/` owns generated static references and workflow artifacts such as Stitch output.
- Storybook is live approval surface for reusable UI and canonical root states in current repo.
- Runtime implementation under `src/` should follow docs and applicable `AGENTS.md` files, not replace them.

## 4. Shared Constraints

These constraints apply across frontend, backend, and design docs:

- Keep route surface intentionally small.
- Keep server ownership explicit for auth, progression, and narrative-sensitive state.
- Prefer pragmatic, compact structures until boundary becomes hard to reason about.
- Keep `AGENTS.md` plus small subtree deltas as active operational layer instead of flattening all implementation rules into prose docs.
- Grow screen documentation under `docs/design/` rather than adding more top-level `SCREENS_*` files.
- Do not split `src/app/globals.css` or introduce larger schema modularization purely in anticipation of future scale.
- Add new architecture documents only when they reduce ambiguity more than they increase maintenance overhead.

## 5. Update Policy

- Update this overview when product direction, repo roles, or document-map ownership materially changes.
- Update frontend architecture when runtime shape, UI layering, styling ownership, Storybook workflow, or validation expectations change.
- Update backend architecture when persistence, auth, session, server module, or integration boundaries change.
- Update `docs/design/` when screen packets, static references, or Storybook mapping change.

This keeps repository readable at three levels: overview here, implementation boundaries in frontend and backend docs, and screen-level design packets in `docs/design/`.
