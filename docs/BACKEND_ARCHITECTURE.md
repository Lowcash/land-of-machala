# Land of Machala Backend & Persistence Architecture

This document proposes the first serious backend and persistence shape for Land of Machala.
It is intentionally pragmatic: strong enough for production growth, but still simple enough to build inside the Next.js application before splitting anything into separate services.

Use `docs/ARCHITECTURE.md` for the top-level overview and `docs/FRONTEND_ARCHITECTURE.md` for the frontend runtime and UI surface.

## 1. Goals

- keep the game server-first and story-safe
- keep the client interactive but not authoritative
- keep the first backend topology simple
- choose persistence that supports iterative game design
- make future extraction possible without overengineering now

## 2. Recommended Route Surface

The application does **not** need a route for every in-game screen.
For this project, a small route surface is a strength.

### Recommended Canonical Surface

- `/`: canonical public and authenticated surface on the primary domain

### Root-First SSR Model

For the current preferred direction:

- anonymous users see the landing page, product framing, and auth entry at `/`
- authenticated users see the gameplay shell at the same canonical route
- onboarding and character creation remain authenticated shell states rather than separate permanent public routes
- internal screens such as character, inventory, journal, and map remain shell states rather than top-level routes

Locale should be resolved through cookie, session, or request-level preference rather than through a visible locale prefix in the public URL.

This keeps the product surface extremely small while still allowing SSR to render the correct experience from session state.

### Deferred or Optional Routes

- `/account`: profile, settings, password or session management if these become meaningfully distinct
- `/codex`: public or semi-public lore, changelog, and discoverable game universe content if this becomes part of acquisition or retention
- separate `login`, `register`, or `origins` routes only if future UX or technical constraints clearly justify splitting them back out

### Why One Canonical Surface Can Work Here

- gameplay progression can remain server-owned without exposing every internal screen as a URL
- SEO stays concentrated on the landing state because crawlers and unauthenticated visitors see the public entry experience
- SSR can still render the correct authenticated shell, onboarding gate, or resumed state at the same canonical route based on the user session and saved progression

## 3. What "Canonical URL" Means

A canonical URL is the one stable, preferred URL for a given surface.

For this project, that means:

- one canonical route for public entry and authenticated continuation
- minimal accidental duplicates for the same experience
- shell state carries most in-game variation instead of route sprawl

Example: if the app renders landing for anonymous users and the game shell for authenticated users at `/`, then alternate routes like `/world`, `/chapter-1`, `/resume`, or permanent `/inventory` should not be introduced unless there is a real product reason that outweighs the added complexity.

## 4. Backend Topology

### Phase 1 Default

Keep the backend inside the Next.js application.

- App Router handles SSR, RSC composition, and route-level boundaries
- server actions handle UI-coupled mutations
- route handlers handle public HTTP endpoints, uploads, webhooks, and integrations
- domain logic lives in server-owned modules under `src/lib/`

### Suggested Server Module Structure

- `src/lib/server/db/` - database client, transaction helpers, persistence adapters
- `src/lib/server/auth/` - password hashing, session management, auth guards
- `src/lib/server/game/` - game state transitions, progression rules, save or resume logic
- `src/lib/server/security/` - rate limiting, CSRF strategy where needed, abuse controls
- `src/lib/server/mail/` - email delivery or notification integrations

The UI and App Router layers should call typed server-owned functions, not embed database logic directly.

## 5. Persistence Strategy

### Primary Database

Start with **Postgres** as the main persistent store.

Why:

- strong default for relational data
- mature ecosystem
- excellent support for transactions and constraints
- JSONB gives flexibility for evolving game state without forcing immediate over-normalization

### ORM / Query Layer

**Prisma** is a reasonable default choice here.

Why it fits:

- intuitive for application development
- productive for early-stage schema iteration
- type generation is helpful for a project like this

Do not over-commit the architecture to Prisma-specific assumptions in route files or UI code. The ORM should be behind server-side boundaries.

### Redis

Do **not** start with Redis by default.

Add Redis only when there is a clear need such as:

- rate limiting
- short-lived caches
- queues or jobs
- session acceleration at higher scale

## 6. Data Ownership

### Reference Data

Keep authored reference content version-controlled at first.

Examples:

- races
- classes
- story step definitions
- codex or lore source content that is authored and reviewed alongside the codebase

The current `src/lib/game/data/*` structure is compatible with this approach.

### Mutable Player Data

Persist mutable player-specific state in Postgres.

Examples:

- account identity
- sessions
- character identity
- progression
- unlocks
- current location or phase
- revealed lore or codex entries

## 7. Recommended Initial Data Model

Start small and explicit.

### Core Tables

- `users`
  - id
  - email
  - password_hash
  - email_verified_at
  - created_at
  - updated_at

- `auth_sessions`
  - id
  - user_id
  - session_token_hash
  - expires_at
  - remember_me
  - ip_hash or ip metadata if desired
  - user_agent summary if desired
  - created_at
  - last_seen_at

- `player_profiles`
  - id
  - user_id
  - display_name
  - locale
  - onboarding_completed
  - created_at
  - updated_at

- `characters`
  - id
  - user_id
  - name
  - race_id
  - class_id
  - stat_snapshot_json
  - created_at
  - updated_at

- `game_runs`
  - id
  - user_id
  - character_id
  - phase
  - location_key
  - status
  - updated_at

- `game_state_snapshots`
  - id
  - game_run_id
  - schema_version
  - state_json
  - created_at

### Why A Snapshot Table

At the start, the gameplay model will evolve quickly.
Using a versioned snapshot table lets you:

- persist real progression early
- ship and test real save or resume behavior
- evolve the schema over time
- normalize only the parts that prove stable and operationally important

### Later Normalization Candidates

When the game model stabilizes, split frequently queried or business-critical state into dedicated tables such as:

- `world_unlocks`
- `quest_states`
- `inventory_items`
- `journal_entries`

## 8. Auth & Session Model

### Default Recommendation

Use **server-managed sessions with secure HttpOnly cookies**.

### Why This Beats JWT As A Default Here

- simpler revocation
- simpler rotation
- smaller client responsibility
- better fit for server-owned progression and entitlement checks
- avoids pushing auth truth into the client

### Implementation Shape

- on login, create an opaque random session token
- store only its hash in the database
- send the raw token in a secure, HttpOnly, same-site cookie
- look up the session server-side on each authenticated request
- support a longer TTL when `remember me` is selected

### Passwords

Use Argon2id or bcrypt with modern settings.
Do not invent custom auth crypto.

## 9. Client Storage Rules

### Use Server Persistence For

- progression
- unlocks
- inventory
- active run state
- entitlement-sensitive state
- current gameplay phase if it affects SSR or resumption

### Use Cookies For

- secure session token transport in HttpOnly cookies
- locale preference if needed
- lightweight non-sensitive UX hints when cookies are the right transport

### Use localStorage For

- draft form recovery
- non-sensitive preferences such as reduced motion overrides, dismissible onboarding hints, or UI density
- cached client-only convenience data that is safe to lose or tamper with

### Use sessionStorage For

- same-tab temporary state only
- short-lived wizard continuity that does not matter after tab close

Do not store authoritative game progression in localStorage or sessionStorage.

## 10. Server Actions vs Route Handlers

### Use Server Actions For

- registration
- login
- logout
- character creation finalization
- save or resume actions triggered directly from app UI
- account settings updates

### Use Route Handlers For

- webhooks
- uploads
- file generation or downloads
- public API endpoints
- health or readiness endpoints if needed
- third-party callbacks

Day one, the project may need very few or even no public API endpoints beyond future integrations. That is fine.

### About `api`

Yes, route handlers are the Next.js `route.ts` mechanism, often placed under `src/app/api/**/route.ts` for public API-style endpoints.
They can also live elsewhere under `src/app/**` when route structure justifies it.

## 11. Caching & Revalidation

### Default

Cache public and reference content aggressively only when it is safe and useful.
Be conservative with player-specific state.

### Good Early Candidates

- landing page content
- public marketing metadata
- static lore excerpts intended for discovery
- code-owned reference data translated on the server

### Be Careful With

- current game state
- session-bound personalized content
- anything that could leak unrevealed story or player progression

Use tag or path revalidation after mutations where it simplifies freshness without adding client cache complexity.

## 12. Progressive Enhancement

Yes, this project can benefit from progressive enhancement.

That means:

- forms should have a viable server boundary
- the app should prefer server-rendered content when possible
- JavaScript should enhance interaction quality, not be the only path for basic correctness

`react-hook-form` does not automatically kill progressive enhancement, but it usually signals a more client-managed form flow.
Use it where the UX payoff is real. Do not use it by reflex for every form.

## 13. SEO, Open Graph, And Static Assets

### Route Strategy For SEO

- keep the landing page highly indexable
- use strong metadata there
- keep gameplay pages focused on player utility rather than trying to make every in-game state indexable

### Open Graph

Prepare at least:

- one strong default OG image for the product
- per-route metadata where public routes deserve it

### Static Asset Defaults

- **SVG** is excellent for favicon, icon marks, and crisp vector assets
- **PNG** is useful where raster transparency matters or browser compatibility is simpler
- **JPG** is useful for rich photographic or painterly OG images and backgrounds where file size matters more than transparency

For this project:

- favicon or app icon: SVG first, plus PNG fallbacks if needed
- OG image: likely PNG or JPG depending on final visual style

## 14. Observability, Abuse Protection, And Launch Hardening

### Error Tracking

Use a real error tracking solution in production.

**Sentry** is a strong default because it covers:

- server errors
- client errors
- performance traces if needed
- release-aware debugging

### Rate Limiting & Abuse Protection

Add rate limiting early on:

- login
- register
- password reset or verification flows if added
- save or mutation-heavy endpoints if abuse becomes realistic
- webhook endpoints where applicable

Vercel gives you CDN and baseline edge protection, but application-level abuse controls still matter.

### Recommended Launch Checklist

- production env schema validated at startup
- secure session cookies configured correctly
- database backups and migration workflow defined
- Search Console configured
- Vercel Analytics enabled if useful
- error tracking enabled
- key auth and mutation routes rate-limited
- OG image, metadata, favicon, robots, and sitemap checked
- accessibility pass on landing and core game shell
- Lighthouse run for landing route and critical public pages

## 15. Recommended Implementation Order

1. Finalize a stronger landing and gameplay redesign in Stitch or a similar design tool.
2. Implement backend foundation: env schema, Postgres, Prisma, server session model, password hashing, and auth boundaries.
3. Convert login and registration to real server-backed flows.
4. Add server-side validation and persistence for the Origins wizard.
5. Introduce a canonical root-first SSR surface that renders landing for anonymous users and authenticated game state for signed-in players.
6. Add save or resume behavior and game state snapshot persistence.
7. Add production hardening: rate limiting, error tracking, analytics, and launch checklist items.

## 16. First Server Modules And Actions

The first implementation slice should stay small and explicit.

### Suggested Server Module Shape

- `src/lib/server/db/client.ts` - database client lifecycle
- `src/lib/server/db/schema/` - ORM schema or typed database models
- `src/lib/server/auth/password.ts` - password hashing and verification
- `src/lib/server/auth/session.ts` - create, rotate, revoke, and resolve sessions
- `src/lib/server/auth/cookies.ts` - cookie serialization and deletion helpers
- `src/lib/server/game/origins.ts` - origins validation and initial character construction
- `src/lib/server/game/runs.ts` - create or resume active game runs
- `src/lib/server/security/rate-limit.ts` - rate limit checks for auth and mutation paths

### First Server Actions

- `src/app/[locale]/actions/root-session.ts`
  - current prototype action boundary for root entry, onboarding completion, and session reset
  - acceptable as a pre-alpha bridge while runtime ownership is moved server-side
  - should later be replaced or split into database-backed auth, session, and onboarding actions

- `src/app/[locale]/actions/auth.ts`
  - future production boundary for login and registration mutations
  - validates credentials or payload
  - creates user and database-backed session
  - returns typed success or field or action errors

- `src/app/[locale]/actions/origins.ts`
  - future production boundary for onboarding completion
  - validates race, class, name, and any server-owned onboarding constraints
  - persists character and initial run state
  - redirects or returns typed next-step info

- `src/app/[locale]/play/actions.ts`
  - `resumeGameAction()`
  - resolves current user and active run
  - returns server-derived gameplay shell state

### First Typed Result Shape

Use one predictable result model for actions.

- `success: true | false`
- optional `fieldErrors`
- optional `formError`
- optional `redirectTo` or domain payload

This keeps the UI predictable and allows future reuse across forms and auth flows.

## 17. Reuse Across Other Fullstack Projects

Most of this approach is reusable.

Reusable baseline:

- server-first data ownership
- route handlers vs server actions split
- secure session default
- Postgres-first persistence model
- Zod at boundaries
- minimal client authority

Project-specific overrides:

- route surface
- story protection rules
- progression model
- public SEO strategy
- whether gameplay stays on one canonical route or not
