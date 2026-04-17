---
applyTo: 'src/app/**/*.{ts,tsx},src/components/**/*.{ts,tsx},src/lib/**/*.{ts,tsx},src/providers/**/*.{ts,tsx},src/hooks/**/*.{ts,tsx}'
---

# Architecture & Ownership

This repository is a fullstack-leaning Next.js App Router application.
Keep routing, data boundaries, UI layering, and client state ownership explicit instead of letting responsibilities blur together.

## Two Kinds Of Layouts

- Next.js route layouts are special files named `layout.tsx` under `src/app/**`.
- Reusable visual layout components may live under `src/components/ui/prefabs/layout/`.
- Do not confuse route ownership with UI composition. `ui/prefabs/layout/*` is a design-system layer, not a replacement for App Router `layout.tsx` files.

## Runtime Ownership

| Layer | Location | Responsibility |
| :--- | :--- | :--- |
| **App Runtime** | `src/app/` | routes, route layouts, templates, loading or error boundaries, metadata, and server-first assembly |
| **Feature Layer** | `src/components/features/` | concrete game or product flows, orchestration of reusable UI, feature-local interactivity |
| **Core UI** | `src/components/ui/core/` | atomic primitives, layout utilities, tightly scoped variants |
| **Forms UI** | `src/components/ui/forms/` | reusable field composition and validation-facing controls |
| **Prefabs** | `src/components/ui/prefabs/` | semantic, styled, reusable blocks composed from core and forms |
| **Providers** | `src/providers/` | narrow cross-subtree client state, global notifications, theme-like wrappers, or other truly shared client concerns |
| **Library** | `src/lib/` | typed helpers, domain logic, data shaping, server-only integrations, and future backend boundaries |

## Styling Ownership

- Styling is allowed in `ui/core` and `ui/prefabs`; `prefabs` are expected to own meaningful visual decisions.
- `ui/core` should not become the only layer allowed to style things. That would push too much semantic UI upward or too many escape hatches downward.
- `features` should mostly compose prefabs and primitives, with only narrow one-off glue styling when extraction would be artificial.
- Avoid absolute `zero className` dogma. Prefer disciplined ownership: most raw styling belongs in core or prefabs, not repeatedly in features.

## Shared UI Surface

- The primary reusable UI surface is `ui/core`, `ui/forms`, and `ui/prefabs`.
- `ui/shared` or similar folders are acceptable only for narrow transitional helpers or cross-layer adapters. Do not let them become a catch-all fourth public design-system layer.
- If a repeated pattern is not generic enough for `core` but clearly reusable across features, it probably belongs in `prefabs`.

## State Placement

- Server or request-derived data belongs on the server by default.
- Local transient interaction state belongs in the smallest useful client leaf.
- Shareable navigation state belongs in the URL or route structure when possible.
- `providers` are for genuinely shared client UI state, not the default answer to every piece of state.
- Introduce external client state libraries only after there is a real need that local state, URL state, server state, or focused providers do not cover cleanly.

## Refactoring Direction

- When a pattern repeats, move it one layer down toward a stable abstraction instead of copying it again.
- Prefer deleting obsolete paths over keeping parallel old and new structures alive.
- Keep route files thin and move reusable behavior to the correct layer before complexity spreads.