---
applyTo: 'src/app/**/*.{ts,tsx},src/lib/**/*.{ts,tsx},src/providers/**/*.{ts,tsx},src/components/features/**/*.{ts,tsx}'
---

# Data, Mutations, And State

This repository should follow a server-first fullstack model by default.
Choose state and data tools by ownership and lifecycle, not by trend.

## State Decision Order

1. **Server data**: fetch or derive it on the server first.
2. **Local interaction state**: keep it in the nearest useful client component with `useState` or `useReducer`.
3. **Shareable navigation state**: keep it in the URL, route params, or search params.
4. **Cross-subtree client UI state**: use focused `providers` only when multiple distant branches actually need the same live state.

Project-specific note: this application may intentionally keep gameplay progression on a small set of canonical routes. Do not force every screen, tab, or step into the URL if server-rendered state or persisted game session is the more coherent model.

## Providers vs External State Libraries

- Do not default to Zustand, signals, or similar client state libraries.
- `providers` plus local state are the default for shared client UI state in this repository.
- Introduce an external state library only when there is a measurable need such as high-frequency client-only updates, complex editor-like interactions, canvas or drag systems, or provider-based rerender pressure that has become a real problem.
- Do not name-drop one library in instructions as if it were the preferred answer. The rule is about ownership and necessity, not brand preference.

## Server Actions & Route Handlers

- Use **server actions** for UI-coupled mutations initiated from the app itself.
- Use **route handlers** for public HTTP endpoints, webhooks, uploads, streaming, or third-party callbacks.
- Choose between them by integration shape, not by imagined raw performance differences. The better boundary usually matters more than micro-benchmarks.
- Validate every mutation input at the boundary, preferably with Zod.
- Keep database access, auth checks, mail, rate limiting, and other privileged work in server-only modules under `src/lib/` or another clearly server-owned location.
- Return typed, serializable results from server actions and route handlers.

## Progressive Enhancement

- Favor server-driven form flows and mutation boundaries that can still work with minimal JavaScript when the UX allows it.
- Add richer client orchestration only when it materially improves responsiveness, continuity, or interaction quality.

## Fetching, Cache, And Revalidation

- Prefer App Router server fetch patterns and explicit cache decisions before adding client cache libraries.
- Keep cache and revalidation intent visible: use fetch caching, tags, or explicit invalidation thoughtfully rather than implicitly.
- After mutations, use the smallest appropriate revalidation strategy such as `revalidatePath` or `revalidateTag`.
- Avoid duplicating the same server data in multiple client caches unless there is a clear interaction benefit.
- Cache aggressively only where the data is actually reusable or expensive enough to justify the complexity. Not every request in a game or app needs another cache layer.

## TanStack Query And Hydration Boundaries

- Do not add TanStack Query by default.
- Add it only when the client truly owns server state behavior: background refetching, optimistic mutations across multiple client surfaces, polling, websocket-backed synchronization, offline workflows, or long-lived dashboards.
- If TanStack Query is introduced, centralize query keys and use hydration boundaries intentionally, not as a blanket wrapper around the whole app.

## Security Defaults

- Never trust client input or client entitlement checks.
- Keep secrets and privileged logic server-only.
- Add auth, authorization, and rate limiting at server boundaries, not just in UI flows.
- For story-heavy content, default to keeping narrative data on the server and only send the minimum revealed payload to the client.

## Auth & Session Defaults

- Prefer server-managed sessions in secure, HttpOnly cookies over JWT as the default auth model.
- Reach for JWT only when there is a real stateless or cross-service token requirement.
- Treat the server as the source of truth for progression, inventory, unlocks, and other game-critical state.
- Use localStorage, sessionStorage, or non-HttpOnly cookies only for drafts, non-sensitive preferences, or resumable client UX hints.

## Persistence Defaults

- Start with one primary relational database when possible; Postgres is a strong default for most application and game-state workloads.
- Add Redis only when there is a concrete need such as rate limiting, short-lived caches, queues, or session acceleration.
- Do not introduce multiple databases or storage engines without a clear operational reason.
- Keep ORM or query-layer choice replaceable through typed server-side boundaries. Prisma is fine when it fits, but it should not be assumed as the only acceptable answer.

## Backend Topology

- Keep backend logic inside the Next.js application until scale, team topology, background workloads, or integration boundaries make separation clearly worthwhile.
- Write domain logic so it is not tightly coupled to route files or UI components, which keeps future extraction possible.
