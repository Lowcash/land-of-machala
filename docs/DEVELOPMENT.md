# 🔨 Development Methodology

**Status:** ✅ Active  
**Purpose:** Document HOW to work on this project  
**Last Updated:** 2025-12-13

---

## 🎯 Development Workflow

### Project Type Detection

This is a **Next.js 16 App Router** project with:

- `/app` folder (routing)
- `package.json` with Next.js, React, Prisma
- Server Components default
- TypeScript strict mode

### Feature Development Workflow

1. **Check existing code** → Avoid duplication, follow established patterns
2. **Create feature branch** → `git checkout -b feat/feature-name`
3. **Write tests first** (TDD recommended):
   - Unit test for logic
   - Component test for UI
   - E2E test for critical paths
4. **Implement feature** → Follow SOLID principles, no magic numbers
5. **Test locally** → `npm run dev`, manual testing in browser
6. **Run checks** → `npm run lint && npm run type-check && npm run test`
7. **Update documentation**:
   - `CHANGELOG.md` (with timestamp)
   - `local/TODOS.md` (remove completed task)
   - `local/INSIGHTS.md` (if architecture changed)
8. **Commit** → Conventional commits format
9. **Push & create PR** → Merge to `dev` after code review

---

## 🔄 Git Workflow (dev → staging → main)

### Branch Strategy

```
main (production)
  ↑
  └─ staging (pre-production, QA testing)
      ↑
      └─ dev (development, integration)
          ↑
          └─ feat/* (feature branches)
```

### Workflow Details

```bash
# 1. Start new feature
git checkout dev
git pull origin dev
git checkout -b feat/character-skills

# 2. Develop & commit
# ... work on feature ...
git add .
git commit -m "feat(character): add skill tree UI"

# 3. Push & create PR to dev
git push origin feat/character-skills
# Open PR on GitHub → merge to dev after review

# 4. When ready for staging
git checkout staging
git pull origin staging
git merge --no-ff dev
git push origin staging
# Auto-deploy to staging.machala.com (Vercel)

# 5. After QA approval → production
git checkout main
git pull origin main
git merge --no-ff staging
git tag v1.2.0
git push origin main --tags
# Auto-deploy to machala.com (Vercel)
```

### Environment Variables by Branch

| Branch    | Environment    | Database      | URL                 |
| --------- | -------------- | ------------- | ------------------- |
| `dev`     | Development    | Local Docker  | localhost:3000      |
| `staging` | Pre-production | Staging DB    | staging.machala.com |
| `main`    | Production     | Production DB | machala.com         |

---

## 🧪 Testing Strategy

### What to Test?

**HIGH PRIORITY (must test >80% coverage):**

- Game logic (level up, experience calculation, quest completion)
- Authentication (login, register, session management)
- Database queries (character CRUD, quest updates)
- Server Actions (validation, error handling)

**MEDIUM PRIORITY (should test >70%):**

- UI components (rendering, props, interactions)
- Utility functions (formatters, validators)
- Custom hooks (useAuth, useCharacter)

**LOW PRIORITY (optional):**

- Styling (CSS classes, responsive breakpoints)
- Third-party integrations (Radix UI components)

### Testing Layers

#### 1. Unit Tests (Vitest)

**Purpose:** Test individual functions in isolation

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test -- character.test.ts

# Watch mode (during development)
npm run test:watch
```

**Example:**

```typescript
// lib/utils.ts
export function calculateExperience(level: number): number {
  return level * 100
}

// __tests__/unit/utils.test.ts
import { calculateExperience } from '@/lib/utils'

describe('calculateExperience', () => {
  it('returns correct XP for level 1', () => {
    expect(calculateExperience(1)).toBe(100)
  })

  it('returns correct XP for level 10', () => {
    expect(calculateExperience(10)).toBe(1000)
  })
})
```

#### 2. Component Tests (Testing Library)

**Purpose:** Test UI rendering and user interactions

```bash
# Run component tests (part of npm run test)
npm run test -- components/

# Interactive UI
npm run test:ui
```

**Example:**

```typescript
// __tests__/components/Character.test.tsx
import { render, screen } from '@testing-library/react';
import { CharacterPanel } from '@/components/features/Character/CharacterPanel';

describe('CharacterPanel', () => {
  it('renders character name', () => {
    render(<CharacterPanel name="Hero" level={5} />);
    expect(screen.getByText('Hero')).toBeInTheDocument();
  });

  it('displays level correctly', () => {
    render(<CharacterPanel name="Hero" level={5} />);
    expect(screen.getByText('Level 5')).toBeInTheDocument();
  });
});
```

#### 3. Integration Tests (Server Actions)

**Purpose:** Test Server Actions with database

```typescript
// __tests__/integration/auth.test.ts
import { registerUser } from '@/app/actions'

describe('registerUser Server Action', () => {
  it('creates user with hashed password', async () => {
    const result = await registerUser({
      email: 'test@example.com',
      password: 'SecurePass123',
    })

    expect(result.success).toBe(true)
    expect(result.data.password).not.toBe('SecurePass123') // hashed
  })

  it('rejects duplicate email', async () => {
    await registerUser({ email: 'test@example.com', password: 'pass' })
    const result = await registerUser({ email: 'test@example.com', password: 'pass' })

    expect(result.success).toBe(false)
    expect(result.error).toContain('Email already exists')
  })
})
```

#### 4. E2E Tests (Playwright)

**Purpose:** Test critical user journeys

```bash
# Run E2E tests
npm run test:e2e

# Run with UI (debugging)
npm run test:e2e:ui

# Run specific test
npx playwright test auth.spec.ts
```

**Example:**

```typescript
// __tests__/e2e/game.spec.ts
import { test, expect } from '@playwright/test'

test('user can login and start game', async ({ page }) => {
  // Navigate to login
  await page.goto('/login')

  // Fill credentials
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')

  // Verify redirected to game
  await expect(page).toHaveURL('/game')
  await expect(page.locator('h1')).toContainText('Land of Machala')
})

test('character creation flow', async ({ page }) => {
  await page.goto('/login')
  // ... login steps ...

  await page.goto('/character/create')
  await page.fill('input[name="name"]', 'Hero')
  await page.selectOption('select[name="class"]', 'warrior')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('/game')
  await expect(page.locator('[data-testid="character-name"]')).toContainText('Hero')
})
```

### Coverage Targets

| Layer          | Target | Command                 |
| -------------- | ------ | ----------------------- |
| **Overall**    | >75%   | `npm run test:coverage` |
| **Core logic** | >80%   | Check lib/, entity/     |
| **Components** | >70%   | Check components/       |
| **Utils**      | >80%   | Check lib/utils.ts      |

---

## 🐳 Local Development Setup

### 1. Clone & Install

```bash
cd /Users/lowcash/repos/land-of-machala-v2
npm install
```

### 2. Database Setup (Docker)

```bash
# Start PostgreSQL container
docker run --name machala-db \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=myuserpassword \
  -e POSTGRES_DB=mydatabase \
  -p 3306:5432 \
  -d postgres:16

# Verify running
docker ps
```

### 3. Environment Variables

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your settings
# DATABASE_URL is already configured for local Docker
```

### 4. Prisma Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database (creates tables)
npm run prisma:update

# Seed development data
npm run prisma:seed

# Open Prisma Studio (database GUI)
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev

# Open http://localhost:3000
```

### 6. Verify Setup

```bash
# Type check
npm run type-check

# Linting
npm run lint

# Tests
npm run test

# Build (production check)
npm run build
```

---

## 📝 After Each Task

### 1. Get Timestamp

```bash
python3 -c "from datetime import datetime; print(datetime.now().strftime('%Y-%m-%d %H:%M'))"
```

### 2. Update CHANGELOG.md

```markdown
## 2025-12-13 15:30 — Add character skill tree

**Type:** Added
**Scope:** components/features/Character/SkillTree
**Impact:** Players can now allocate skill points

### Added

- SkillTree component with interactive nodes
- useSkills hook for state management
- allocateSkillPoint Server Action

### Tests

- SkillTree renders correctly
- Skill point allocation validates prerequisites
- E2E test for full skill allocation flow
```

### 3. Update local/TODOS.md

- Remove completed task
- Add any new tasks discovered
- Keep ONLY active tasks

### 4. Commit with Conventional Commits

```bash
git add .
git commit -m "feat(character): add skill tree UI

- Interactive skill node selection
- Prerequisite validation
- Skill point allocation
- Tests: unit, component, e2e"
```

---

## 🔍 Code Quality Checks

### Before Committing

```bash
# 1. Type check
npm run type-check

# 2. Lint & fix
npm run lint

# 3. Format code (Prettier)
npm run format

# 4. Run tests
npm run test

# 5. Check coverage
npm run test:coverage

# 6. Build check
npm run build
```

### Pre-commit Hook (Husky)

Automatically runs on `git commit`:

- Lint-staged (ESLint + Prettier on staged files)
- Type check
- Unit tests

If any check fails → commit is blocked.

---

## 🚨 Common Issues & Solutions

### Issue: TypeScript Error "Cannot find module"

**Solution:**

```bash
# Regenerate Prisma types
npm run prisma:generate

# Full type check
npm run type-check
```

### Issue: Tests Failing in CI but Pass Locally

**Solution:**

```bash
# Clean install (matches CI)
rm -rf node_modules package-lock.json
npm ci

# Run tests with same env
NODE_ENV=test npm run test
```

### Issue: Database Connection Error

**Solution:**

```bash
# Check Docker container is running
docker ps

# Restart container
docker restart machala-db

# Verify DATABASE_URL in .env.local
cat .env.local | grep DATABASE_URL
```

### Issue: Build Fails with "Out of Memory"

**Solution:**

```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## 🚀 Deployment (Vercel)

### Automatic Deployment

- **Push to `dev`** → No deploy (development only)
- **Push to `staging`** → Deploy to `staging.machala.com`
- **Push to `main`** → Deploy to `machala.com`

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables (Vercel Dashboard)

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add for each environment:

| Variable          | Development    | Staging             | Production    |
| ----------------- | -------------- | ------------------- | ------------- |
| `DATABASE_URL`    | Local Docker   | Staging DB          | Production DB |
| `NEXTAUTH_SECRET` | Local secret   | Staging secret      | Prod secret   |
| `NEXTAUTH_URL`    | localhost:3000 | staging.machala.com | machala.com   |

---

## 🎯 Success Checklist

After completing a task:

- [ ] Feature works as intended (manual testing)
- [ ] Tests written and passing (`npm run test`)
- [ ] Code formatted (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] CHANGELOG.md updated (with timestamp)
- [ ] local/TODOS.md updated (task removed)
- [ ] No `console.log` or debugging code left
- [ ] No commented code left
- [ ] Follows project conventions (check existing code)

---

## 📚 References

- **ARCHITECTURE.md** — Design decisions & patterns
- **copilot-instructions.md** — Code standards & AI workflow
- **local/INSIGHTS.md** — Tech stack & conventions
- **README.md** — Quick start & project overview

---

**Created:** 2025-12-13  
**Maintainer:** Land of Machala Team
