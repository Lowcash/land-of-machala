# Land of Machala Backend Architecture

This document captures the current backend default for the project.
It is intentionally short: enough to guide implementation, without pretending the final server shape is already complete.

Use `docs/ARCHITECTURE.md` for the overview and `docs/FRONTEND_ARCHITECTURE.md` for the UI and route surface.

## Goals

- keep gameplay state server-owned
- keep story-sensitive data off the client by default
- keep the first backend topology simple
- choose persistence that supports iterative game design
- make future extraction possible without building separate services too early

Current posture: the route surface stays small, auth and progression ownership move server-side, and the current cookie-backed root session remains a temporary bridge rather than the final auth model.

## Route Surface

- `/` is the canonical public and authenticated surface
- anonymous users see landing and entry states there
- authenticated users continue from the same canonical route
- onboarding, character creation, inventory, journal, and other internal screens should remain shell states unless a strong product reason requires dedicated routes

The project does not need a route for every in-game screen.

## Backend Topology

Phase 1 default: keep the backend inside the Next.js application.

- App Router handles SSR and route boundaries
- server actions handle UI-coupled mutations
- route handlers handle public HTTP endpoints, uploads, downloads, webhooks, and external callbacks
- domain logic lives in `src/lib/server/`

Suggested server modules:

- `src/lib/server/db/`
- `src/lib/server/auth/`
- `src/lib/server/game/`
- `src/lib/server/security/`
- `src/lib/server/mail/`

UI code should call typed server-owned modules, not embed persistence logic directly.

## Persistence Default

- Postgres is the primary database
- Prisma is the default ORM layer
- Redis is not a day-one dependency

Redis should appear only when there is a real need such as rate limiting, queues, or short-lived caches.

## Data Ownership

Keep authored reference content in version-controlled source files for now:

- races
- classes
- story definitions
- lore and codex source content

Persist mutable player data in Postgres:

- users
- sessions
- player profiles
- characters
- active runs
- progression and unlocks
- saved gameplay state

## Initial Data Model

Start with a small explicit model:

- `users`
- `auth_sessions`
- `player_profiles`
- `characters`
- `game_runs`
- `game_state_snapshots`

Snapshot persistence is the right early default because the gameplay model will move faster than the final relational shape.

## Auth And Sessions

Use server-managed sessions with secure HttpOnly cookies.

Default shape:

- create an opaque random session token on login
- store only its hash in the database
- send the raw token in a secure HttpOnly cookie
- resolve the session server-side on each authenticated request
- support longer TTL only when remember-me behavior exists

Use Argon2id or bcrypt for passwords.
Do not invent custom auth crypto.

## Client Storage Rules

Use server persistence for:

- progression
- unlocks
- inventory
- active run state
- entitlement-sensitive state

Use cookies for:

- session token transport
- locale preference when needed
- lightweight server-readable UX hints

Use `localStorage` only for non-sensitive client convenience state such as:

- draft forms
- dismissible UI hints
- purely visual preferences

Do not store authoritative gameplay state in `localStorage` or `sessionStorage`.

## Server Actions Vs Route Handlers

Use server actions for:

- login
- registration
- logout
- onboarding completion
- save or resume actions directly triggered from UI
- account updates

Use route handlers for:

- uploads
- downloads
- webhooks
- public endpoints
- third-party callbacks

## Observability And Hardening

Production baseline:

- validate env at startup
- configure secure session cookies correctly
- define database backups and migrations
- add rate limiting on auth and mutation-heavy boundaries
- add real error tracking
- verify metadata, robots, sitemap, and OG assets

Sentry is a reasonable default for production error tracking.

## Recommended Implementation Order

1. Finalize the accepted root experience.
2. Add backend foundation: env schema, Postgres, Prisma, server session model, and password hashing.
3. Convert login and registration to real server-backed flows.
4. Persist onboarding, character creation, and initial run state.
5. Add save or resume behavior backed by `game_runs` and `game_state_snapshots`.
6. Add production hardening: rate limiting, error tracking, analytics, and launch checks.

## Current Gaps

- the root session is still a prototype, not the final database-backed session layer
- user persistence and session rotation are not wired end to end yet
- gameplay persistence and resume flow still need real database ownership

This document should stay short. If a future backend decision is not actionable yet, it probably does not belong here.
