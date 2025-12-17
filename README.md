# Land of Machala — Text-Based RPG

**A modern web-based RPG experience built with Next.js 16**

**Status:** 🚧 Active Development  
**Framework:** Next.js 16 (App Router)  
**Language:** TypeScript  
**Last Updated:** 2025-12-13

---

## 🎯 What This Does

Land of Machala is an immersive text-based RPG where players create characters, embark on quests, explore a rich fantasy world, and progress through engaging storylines. Built with modern web technologies, it delivers a seamless, accessible RPG experience directly in your browser.

- **Character Creation & Progression:** Level up, allocate skill points, customize builds
- **Quest-Driven Gameplay:** Complete quests, earn rewards, unlock new storylines
- **Rich Game World:** Explore maps, interact with NPCs, discover hidden secrets

---

## 📊 Key Metrics

| Metric           | Value | Target           |
| ---------------- | ----- | ---------------- |
| Lighthouse Score | —     | >90              |
| Test Coverage    | —     | >75%             |
| Bundle Size      | —     | <250kb (gzipped) |
| Build Time       | —     | <30s             |

---

## 🚀 Quick Start

### 1. Setup Environment

```bash
cd land-of-machala-v2
npm install
```

### 2. Configure Database (Docker)

```bash
# Start PostgreSQL container
docker run --name machala-db \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=myuserpassword \
  -e POSTGRES_DB=mydatabase \
  -p 3306:5432 \
  -d postgres:16

# Copy environment template
cp .env.example .env.local

# Edit .env.local if needed (default values work)
```

### 3. Initialize Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:update

# Seed development data
npm run prisma:seed
```

### 4. Run Development Server

```bash
npm run dev

# Open http://localhost:3000
```

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
app/                    # Next.js App Router (routes & pages)
├── (auth)/             # Authentication pages (login, register)
├── (game)/             # Protected game pages (character, quests, map)
├── api/                # API routes (NextAuth, health check)
├── layout.tsx          # Root layout
└── page.tsx            # Home (redirects to /login)

components/
├── ui/                 # Reusable UI components (Button, Card, Dialog)
└── features/           # Feature-specific components
    ├── Auth/           # Login, Register forms
    ├── Character/      # Character panel, stats
    ├── Quest/          # Quest log, quest items
    └── Map/            # Game map, navigation

lib/                    # Utilities & helpers
├── db.ts               # Prisma client singleton
├── auth.ts             # NextAuth.js v5 configuration
├── utils.ts            # Common helpers
└── hooks/              # Shared React hooks

entity/                 # Data access layer (Prisma queries)
├── user.ts             # User CRUD operations
├── character.ts        # Character queries
└── quest.ts            # Quest queries

types/                  # TypeScript definitions
├── game.ts             # Game domain types
├── user.ts             # User & auth types
└── api.ts              # API response types

__tests__/              # Test files
├── unit/               # Function & utility tests
├── components/         # Component rendering tests
├── integration/        # Server Actions, API tests
└── e2e/                # Playwright end-to-end tests

prisma/
├── schema.prisma       # Database schema
└── seed.ts             # Development seed data

public/                 # Static assets
```

---

## 🔄 Common Workflows

### Add New Feature

1. Create folder in `components/features/[Feature]/`
2. Add components: `FeaturePanel.tsx`, `useFeature.ts`
3. Create Server Action in `app/actions.ts`
4. Add types in `types/`
5. Write tests in `__tests__/`
6. Test: `npm run test && npm run type-check`

### Add Database Query

1. Create function in `entity/[model].ts`
2. Use Prisma Client with type-safe queries
3. Add type definition in `types/`
4. Write unit test in `__tests__/integration/`
5. Test: `npm run test`

### Add Server Action

1. Create in `app/actions.ts` or feature folder
2. Use `createServerAction` from zsa (type-safe)
3. Add Zod schema for input validation
4. Test in component + write integration test
5. Check error handling

---

## 💡 Architecture Decisions

### Why Next.js 16?

Server Components reduce bundle size by 30-50%, built-in routing simplifies structure, SEO-friendly for game wiki/guides, seamless Vercel deployment.

### Why Prisma?

Type-safe queries prevent runtime errors, auto-generated types from schema, excellent migration workflow, Prisma Studio for data inspection.

### Why Features-based Components?

Easier navigation as project grows, clear dependencies, tests colocated with code, self-contained features.

---

## 📖 Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Design patterns & technology choices
- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) — Workflow, testing strategy, deployment
- [local/INSIGHTS.md](local/INSIGHTS.md) — Tech stack summary & key learnings
- [local/TODOS.md](local/TODOS.md) — Active tasks & priorities
- [CHANGELOG.md](CHANGELOG.md) — Change history with timestamps
- [.github/copilot-instructions.md](.github/copilot-instructions.md) — AI collaboration guide

---

## ✅ Before Contributing

- [ ] Read [local/INSIGHTS.md](local/INSIGHTS.md) (architecture overview)
- [ ] Run tests: `npm run test`
- [ ] Check types: `npm run type-check`
- [ ] Lint code: `npm run lint`
- [ ] Build: `npm run build`

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E with UI (debugging)
npm run test:e2e:ui
```

---

## 🔧 Configuration

All settings in [local/INSIGHTS.md](local/INSIGHTS.md) and `.env.local` file.

Key configurations:

- **Database:** PostgreSQL via Prisma
- **Authentication:** NextAuth.js v5 (Credentials provider)
- **Environment:** Development (local), Staging, Production
- **Deployment:** Vercel (automatic on git push)

---

## 📈 Performance Optimization

Check current performance:

```bash
npm run build
npm run build:analyze  # Bundle size analysis
```

Key optimizations:

- Server Components by default (reduce JS bundle)
- Image optimization with `next/image`
- Code splitting automatic (Next.js routes)
- CSS modules for scoped styles
- TanStack Query for data caching

---

## 🐛 Common Issues

### Issue: Build Fails with TypeScript Error

**Check:** Run `npm run type-check` to see full errors  
**Fix:** Regenerate Prisma types: `npm run prisma:generate`

### Issue: Database Connection Error

**Check:** Verify Docker container is running: `docker ps`  
**Fix:** Restart container: `docker restart machala-db`

### Issue: Tests Failing in CI but Pass Locally

**Check:** Clean install: `rm -rf node_modules && npm ci`  
**Fix:** Run tests with same env: `NODE_ENV=test npm run test`

---

## 🤝 Contributing

Before committing:

1. Write tests first (test-driven development)
2. Run type-check: `npm run type-check`
3. Run linting: `npm run lint`
4. Format code: `npm run format`
5. Update `CHANGELOG.md` (with timestamp)
6. Update `local/TODOS.md` (remove completed tasks)

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed standards.

---

## 📞 Questions?

See:

- Architecture questions → [local/INSIGHTS.md](local/INSIGHTS.md)
- How to work on this project → [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
- Design patterns → [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Specific feature → Search repo for component name

---

**Created:** 2025-12-13  
**Framework:** Next.js 16.0.3  
**Status:** Active Development  
**Last Review:** 2025-12-13
