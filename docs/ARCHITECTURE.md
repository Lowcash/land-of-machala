# 🏗️ Project Architecture

**Status:** ✅ Active Development  
**Purpose:** Document architectural decisions and design patterns  
**Last Updated:** 2025-12-13

---

## 📋 Project Overview

### What problem does this project solve?

**Land of Machala** is a text-based RPG game where players create characters, complete quests, explore maps, and progress through a rich narrative experience. The project solves the need for an engaging, accessible RPG that runs in the browser without complex graphics or downloads.

### Who are the primary users?

- **Players:** RPG enthusiasts who enjoy story-driven games
- **Internal team:** Developers maintaining and expanding game content
- **Game masters:** Content creators adding quests and storylines

### What are the key constraints?

- **Browser support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Performance:** Lighthouse score >90, response time <200ms
- **Accessibility:** WCAG 2.1 AA compliance
- **Type safety:** 100% TypeScript coverage (no `any` types)

---

## 🔄 Web Application Pattern

### Rendering Strategy

**Next.js 16 App Router with Server Components**

- **Default:** Server Components (data fetching, initial rendering)
- **When needed:** Client Components (game UI interactions, state management)
- **SEO:** SSR for public pages (game wiki, character builds)
- **Performance:** Streaming for faster perceived load times

**Why not SPA (Vite)?**

- Next.js provides better SEO for game wiki/guides
- Server Components reduce JavaScript bundle size
- Built-in API routes simplify backend logic
- Vercel deployment is seamless

### State Management

- **Server state:** TanStack Query (caching, refetching)
- **Client state:** React hooks (useState, useReducer)
- **URL state:** Next.js routing (searchParams)
- **Form state:** React Hook Form + Zod validation

### Data Fetching

- **Server Components:** Direct Prisma queries (type-safe)
- **Client Components:** TanStack Query hooks
- **Mutations:** Server Actions (zsa for type safety)
- **Realtime:** Not needed initially (text-based game)

---

## 🏗️ Design Principles

### Separation of Concerns

- **UI Layer:** React components (display only, minimal logic)
- **API Layer:** Server Actions (business logic, validation)
- **Data Layer:** Prisma entities (database access)
- **Types:** Shared TypeScript types (game.ts, user.ts)

### Server vs Client

- **Default:** Server Components (data fetching, security, SEO)
- **When needed:** Client Components (`'use client'` directive)
  - Forms with immediate validation
  - Game UI with frequent updates (character stats)
  - Animations and transitions
- **Never:** Data fetching in Client Components (security risk)

### Type Safety

- **Full TypeScript:** Strict mode enabled
- **No `any` types:** Use `unknown` with type guards
- **Zod schemas:** Runtime validation for user input
- **Prisma types:** Auto-generated from schema

### Testing

- **Unit tests:** Utilities, game logic (>80% coverage)
- **Component tests:** UI rendering, interactions (>70% coverage)
- **Integration tests:** Server Actions, API routes (>80% coverage)
- **E2E tests:** Critical user flows (login, game start, character creation)

### Performance

- **Code splitting:** Automatic by Next.js routes
- **Image optimization:** `next/image` for all assets
- **Database queries:** Indexed columns, select only needed fields
- **Caching:** TanStack Query (5 minutes default), Prisma connection pooling

---

## 📁 Folder Structure Pattern

```
app/                          # Next.js App Router (routes)
├── (auth)/                   # Route group (auth pages)
│   ├── login/page.tsx
│   └── register/page.tsx
├── (game)/                   # Route group (protected game pages)
│   ├── layout.tsx            # Auth-protected wrapper
│   ├── character/page.tsx
│   ├── quests/page.tsx
│   ├── map/page.tsx
│   └── game/page.tsx         # Main game UI
├── api/                      # API routes
│   ├── auth/[...nextauth]/route.ts
│   └── health/route.ts
├── actions.ts                # Server Actions
├── layout.tsx                # Root layout
└── page.tsx                  # Home (redirect to /login)

components/
├── ui/                       # Reusable UI components (Radix + Tailwind)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Dialog.tsx
│   ├── Form.tsx
│   └── ...
└── features/                 # Feature-specific components
    ├── Auth/
    │   ├── LoginForm.tsx
    │   └── RegisterForm.tsx
    ├── Character/
    │   ├── CharacterPanel.tsx
    │   ├── CharacterStats.tsx
    │   └── useCharacterStats.ts
    ├── Quest/
    │   ├── QuestLog.tsx
    │   └── QuestItem.tsx
    └── Map/
        ├── GameMap.tsx
        └── useMapNavigation.ts

lib/                          # Utilities & helpers
├── db.ts                     # Prisma client singleton
├── auth.ts                   # NextAuth.js v5 configuration
├── utils.ts                  # Common helpers (cn, formatters)
└── hooks/                    # Shared React hooks
    ├── useAuth.ts
    ├── useGame.ts
    └── useCharacter.ts

types/                        # TypeScript definitions
├── game.ts                   # Game domain types
├── user.ts                   # User & auth types
└── api.ts                    # API response types

entity/                       # Data access layer (Prisma queries)
├── user.ts                   # User CRUD operations
├── character.ts              # Character queries
└── quest.ts                  # Quest queries

__tests__/
├── unit/                     # Function/utility tests
├── components/               # Component rendering tests
├── integration/              # Server Actions, API tests
└── e2e/                      # Playwright end-to-end tests

prisma/
├── schema.prisma             # Database schema
└── seed.ts                   # Development seed data

public/                       # Static assets
└── (images, fonts, icons)
```

---

## 🔌 Key Integration Points

### Database

- **ORM:** Prisma (type-safe queries, migrations)
- **Connection:** Pooled via Prisma Client
- **Queries:** In `entity/` layer (separation from UI)
- **Migrations:** `npx prisma db push` (dev), `prisma migrate deploy` (prod)

### Authentication

- **Method:** NextAuth.js v5 + Credentials provider
- **Session:** JWT tokens (httpOnly cookies)
- **Protection:** `middleware.ts` guards protected routes
- **Password:** bcrypt hashing (10 rounds)

### Forms

- **Validation:** Zod schemas (shared between client & server)
- **Submission:** Server Actions (CSRF protected)
- **Error handling:** React Hook Form + server-side validation
- **Example:** Login form validates email format, Server Action checks password

### API Consumption

- **Internal:** Server Components fetch directly via Prisma
- **External:** Server Actions or Route Handlers
- **Caching:** TanStack Query with staleTime/cacheTime

---

## 💡 Technology Decisions

### Framework: Next.js 16 (App Router)

**Why:**

- Server Components reduce client JavaScript
- Built-in API routes (no separate backend)
- SEO-friendly (game wiki, character guides)
- Vercel deployment is seamless

**Trade-off:**

- Slower dev builds than Vite (using --turbopack helps)
- Learning curve for Server/Client component split

### UI Library: Tailwind CSS + Radix UI

**Why:**

- Tailwind: Utility-first, no CSS file bloat
- Radix: Accessible primitives (WCAG 2.1)
- Full styling control (game needs custom design)

**Trade-off:**

- More verbose JSX (className strings)
- No pre-built themes (we build from scratch)

### Authentication: NextAuth.js v5

**Why:**

- Type-safe, modern auth solution
- Supports Credentials (email/password) + OAuth (future)
- Built-in CSRF protection
- Works seamlessly with Prisma

**Trade-off:**

- Not using Supabase Auth (overkill for text game, no realtime needed)

### Database: Prisma + PostgreSQL

**Why:**

- Type-safe schema and queries
- Auto-generated TypeScript types
- Great migration workflow
- Prisma Studio for data inspection

**Trade-off:**

- Slightly slower than raw SQL (negligible for our scale)

### Testing: Vitest + Testing Library + Playwright

**Why:**

- Vitest: Fast, Vite-native (instant feedback)
- Testing Library: User-centric component tests
- Playwright: Cross-browser E2E testing

**Trade-off:**

- E2E tests are slower (run only on CI for critical paths)

### Deployment: Vercel

**Why:**

- Zero-config Next.js deployment
- Automatic HTTPS, CDN, edge functions
- Free tier for hobby projects

**Trade-off:**

- Vendor lock-in (but easy to migrate to Docker if needed)

---

## 🎯 Quality Metrics

| Metric               | Target          | How to Check            |
| -------------------- | --------------- | ----------------------- |
| **Type Coverage**    | 100% (no `any`) | `npm run type-check`    |
| **Test Coverage**    | >75% overall    | `npm run test:coverage` |
| **Lighthouse Score** | >90             | Chrome DevTools         |
| **Response Time**    | <200ms (p95)    | Vercel Analytics        |
| **Bundle Size**      | <250kb gzipped  | `npm run build:analyze` |

---

## 🚨 Common Pitfalls to Avoid

- ❌ **Data fetching in Client Components** → Security risk, slow performance
- ❌ **Coupling UI to business logic** → Hard to test, difficult to change
- ❌ **Missing type annotations** → Defeats TypeScript benefits
- ❌ **No error boundaries** → App crashes on errors
- ❌ **Storing secrets in client code** → Exposed in browser bundles
- ❌ **Skipping form validation** → Security vulnerabilities
- ❌ **Long parameter lists (>4)** → Use parameter objects instead
- ❌ **Magic numbers** → Use named constants

---

## 📚 References

- **DEVELOPMENT.md** — How to work on this project
- **copilot-instructions.md** — Code standards & AI collaboration
- **local/INSIGHTS.md** — Tech stack notes & patterns
- **Existing code** — Best reference for "how we do things here"

---

**Created:** 2025-12-13  
**Last Updated:** 2025-12-13  
**Maintainer:** Land of Machala Team
