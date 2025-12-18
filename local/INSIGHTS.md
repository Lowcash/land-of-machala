# 📊 Project Insights

**Quick reference for tech decisions and patterns**  
**Keep brief:** ~200 lines max  
**Last Updated:** 2025-12-13

---

## 🎯 Project Overview

**Land of Machala** is a text-based RPG game built with Next.js 16, focusing on immersive storytelling, character progression, and quest-driven gameplay. The project prioritizes type safety, testing, and modern web standards.

---

## 🛠️ Tech Stack Decisions

### Frontend Framework

- **Choice:** Next.js 16 (App Router)
- **Why:** Server Components reduce bundle size, built-in routing, SEO-friendly, seamless Vercel deployment
- **Trade-off:** Slower dev builds than Vite (mitigated with `--turbopack`)

### React Version

- **Choice:** React 19
- **Why:** Latest stable, Server Components support, improved performance
- **Trade-off:** Newer API, fewer community examples (but official docs are excellent)

### Styling

- **Choice:** Tailwind CSS 4.1 + Radix UI
- **Why:** Utility-first styling, accessible primitives (WCAG 2.1), full design control
- **Trade-off:** Verbose JSX class names, no pre-built themes (custom design needed)
- **Note:** Tailwind v4 uses `@theme` in CSS instead of `tailwind.config.ts` for variables. We removed conflicting `colors` config to support this.

### Animation

- **Choice:** Framer Motion 12.9
- **Why:** Declarative animations, great DX, React 19 compatible
- **Trade-off:** Adds ~60kb to bundle (lazy-load heavy animations)

### Backend/Server

- **Choice:** Next.js Server Actions + API Routes
- **Why:** Type-safe with zsa, no separate backend needed, CSRF protection built-in
- **Trade-off:** Coupled to Next.js (but easy to extract later if needed)

### Database

- **Choice:** Prisma + PostgreSQL
- **Why:** Type-safe queries, auto-generated types, excellent migration workflow, Prisma Studio
- **Trade-off:** Slightly slower than raw SQL (negligible for our scale)

### Authentication

- **Choice:** NextAuth.js v5 + Credentials provider
- **Why:** Type-safe, modern, supports email/password + OAuth (future), built-in CSRF protection
- **Trade-off:** Not using Supabase Auth (overkill for text game, no realtime needed)

### State Management

- **Choice:** TanStack Query + React hooks
- **Why:** Server state caching, automatic refetching, minimal client state needed
- **Trade-off:** Learning curve for Query patterns (but worth it)

### Form Handling

- **Choice:** React Hook Form + Zod
- **Why:** Type-safe validation, minimal re-renders, server + client validation
- **Trade-off:** More boilerplate than simple `useState` (but safer)

### Testing

- **Choice:** Vitest + Testing Library + Playwright
- **Why:** Fast unit tests (Vitest), user-centric component tests (Testing Library), cross-browser E2E (Playwright)
- **Trade-off:** E2E tests are slower (run only on CI for critical paths)

### Deployment

- **Choice:** Vercel
- **Why:** Zero-config Next.js deployment, automatic HTTPS, CDN, edge functions, free tier
- **Trade-off:** Vendor lock-in (but can migrate to Docker if needed)

---

## 📐 Architecture Highlights

### Key Components

1. **Server Components (default)** — Data fetching, initial rendering, SEO
2. **Client Components (`'use client'`)** — Interactivity (forms, game UI, animations)
3. **Server Actions (zsa)** — Type-safe mutations (login, character creation, quest completion)
4. **Prisma Entities** — Database access layer (user.ts, character.ts, quest.ts)
5. **Features-based Components** — `/components/features/Character/`, `/components/features/Quest/`

### Data Flow

```
User Action (browser)
  → Client Component (form submission)
    → Server Action (validation + business logic)
      → Prisma Entity (database query)
        → PostgreSQL (data storage)
          ← Response
        ← Entity result
      ← Server Action result
    ← Re-render with new data
  ← UI updated
```

### Critical Paths

- **Authentication:** Login → NextAuth.js → Session cookie → Protected routes
- **Character Creation:** Form → Server Action → Prisma create → Redirect to game
- **Quest Completion:** Button click → Server Action → Update quest status → TanStack Query refetch → UI update

---

## 🎨 Project Patterns

### Component Organization

**Features-based structure:**

```
components/features/
├── Character/         # Character-related components
│   ├── CharacterPanel.tsx
│   ├── CharacterStats.tsx
│   ├── useCharacterStats.ts
│   └── Character.test.tsx
├── Quest/             # Quest-related components
│   ├── QuestLog.tsx
│   ├── QuestItem.tsx
│   └── QuestLog.test.tsx
└── Map/               # Map-related components
    ├── GameMap.tsx
    └── GameMap.test.tsx
```

**Why:** Easier navigation, clear dependencies, tests colocated with code.

### Naming Conventions

- **Components:** PascalCase (`CharacterPanel.tsx`)
- **Hooks:** camelCase with `use` prefix (`useCharacterStats.ts`)
- **Server Actions:** camelCase (`registerUser`, `completeQuest`)
- **Types:** PascalCase (`Character`, `Quest`, `User`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_LEVEL`, `XP_PER_LEVEL`)

### Established Conventions

1. **No magic numbers** — Use named constants

   ```typescript
   // ❌ Bad
   const xp = level * 100

   // ✅ Good
   const XP_PER_LEVEL = 100
   const xp = level * XP_PER_LEVEL
   ```

2. **Server Components by default** — Only `'use client'` when needed

   ```typescript
   // ✅ Good (Server Component)
   export default async function CharacterPage() {
     const character = await getCharacter();
     return <CharacterPanel character={character} />;
   }

   // ✅ Good (Client Component when needed)
   'use client';
   export function CharacterForm() {
     const [name, setName] = useState('');
     // ...
   }
   ```

3. **Type-safe Server Actions with zsa**

   ```typescript
   // lib/actions/character.ts
   import { createServerAction } from 'zsa'
   import { z } from 'zod'

   export const createCharacter = createServerAction()
     .input(
       z.object({
         name: z.string().min(3).max(20),
         class: z.enum(['warrior', 'mage', 'rogue']),
       })
     )
     .handler(async ({ input }) => {
       const character = await prisma.character.create({
         data: input,
       })
       return character
     })
   ```

4. **Test-first for critical features**
   - Write failing test → Implement → Verify test passes

5. **Conventional commits**
   - `feat(character): add skill tree`
   - `fix(auth): handle session expiry`
   - `refactor: consolidate quest logic`

---

## 💡 Key Learnings

### 1. Single Source of Truth for Authentication

**Bug Fixed:** Character creation stored user ID from NextAuth session, but character retrieval used manual cookies. These are different sources, so user IDs never matched.

**Solution:** Consolidate all session management to NextAuth exclusively.

**Migration Pattern:**

```typescript
// ❌ OLD - Manual cookies + NextAuth mismatch
const userId = await getCurrentUserId() // Reads from cookie

// ✅ NEW - NextAuth only
const session = await auth()
if (!session?.user?.id) throw new Error('Not authenticated')
const userId = session.user.id
```

**Applied to:** 44 server actions across 7 files (auth, character, combat, quest, inventory, skill, achievement).

**Key Insight:** When multiple authentication systems exist, always use one as the source of truth. Hybrid approaches create subtle sync bugs that are hard to debug.

### 2. Server Components Are The Default

**Why it matters:** Reduces JavaScript bundle size by 30-50%. Fetch data on server, render HTML, send to client.

**When to use Client Components:**

- Forms with immediate validation
- Animations and transitions
- Browser APIs (localStorage, window)

### 2. Type Safety Prevents 80% of Bugs

**Why it matters:** Prisma types + Zod validation + TypeScript strict mode catch errors at compile time, not runtime.

**Example:**

```typescript
// TypeScript catches this:
const character: Character = await getCharacter()
const level: number = character.lvel // Error: Property 'lvel' does not exist
```

### 3. E2E Tests Catch Integration Bugs

**Why it matters:** Unit tests verify functions work, but E2E tests verify entire flows work (login → game → quest).

**Critical paths to E2E test:**

- Login/Register flow
- Character creation
- Quest completion
- Game state persistence

### 4. TanStack Query Simplifies State

**Why it matters:** No need for Redux or complex state management. Query handles caching, refetching, loading states.

**Example:**

```typescript
// Automatically caches, refetches on window focus, handles loading/error
const { data: character, isLoading } = useQuery({
  queryKey: ['character'],
  queryFn: () => getCharacter(),
})
```

### 5. Features-based Structure Scales Better

**Why it matters:** As project grows, features are self-contained. Easy to find related code, tests, and types.

**Compare:**

```
❌ Hard to navigate:
components/
├── CharacterPanel.tsx
├── CharacterStats.tsx
├── QuestLog.tsx
├── QuestItem.tsx
├── ...

✅ Easy to navigate:
components/features/
├── Character/
│   ├── CharacterPanel.tsx
│   ├── CharacterStats.tsx
│   └── Character.test.tsx
├── Quest/
│   ├── QuestLog.tsx
│   ├── QuestItem.tsx
│   └── Quest.test.tsx
```

### 6. Lifting State Up for Game Dashboard

**Why it matters:** The `GameDashboard` acts as the central hub for location actions (Bank, Market, etc.). Instead of each component fetching its own data, the dashboard manages the state (`gold`, `inventory`, `bankItems`) and passes it down. This ensures consistency and reduces API calls.

### 7. Local State for Combat Logic

**Why it matters:** Combat is a high-frequency, interactive loop. Using global state (Context) or server state (DB) for every turn would be too slow or complex. We use local React state in `CombatClient` for the immediate battle loop, and only sync to the server/global context upon battle completion.

### 8. Unified Page Layout with `PageTemplate`

**Why it matters:** Consistent UI/UX across all game pages is critical for immersion. The `PageTemplate` component acts as a single source of truth for page structure (Header, Background, Content Container, Footer spacing).

**Pattern:**

```tsx
<PageTemplate background="bg-image.jpg">
  <ClientComponent />
</PageTemplate>
```

**Benefits:**

- Enforces consistent max-width and padding.
- Handles global footer spacing automatically.
- Centralizes background image handling.

### 9. Split View Pattern for Complex UIs

**Why it matters:** Complex features like Inventory, Skills, and Quests require browsing a list while viewing details. A "Split View" pattern (List on Left, Details on Right) works best for desktop, while mobile uses a Fullscreen Overlay for details.

**Implementation:**

- **Desktop:** Grid/List (Left) + Sticky Sidebar (Right)
- **Mobile:** Grid/List (Full Width) + Modal/Overlay (Details)

**Applied to:**

- Inventory (Grid + Item Details)
- Skills (Tree + Skill Details)
- Quests (List + Quest Details)

---

## 📚 Related Files

- **ARCHITECTURE.md** — Design patterns & technology decisions
- **DEVELOPMENT.md** — Workflow, testing, deployment
- **TODOS.md** — Active tasks
- **CHANGELOG.md** — Change history with timestamps
- **copilot-instructions.md** — Code standards & AI collaboration

---

**Last updated:** 2025-12-13
