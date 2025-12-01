# 🛠️ Development Guide

> **Target Audience:** Contributors, new developers  
> **Prerequisite Reading:** README.md, INSIGHTS.md

---

## 🎯 Development Philosophy

### Core Principles
1. **Type Safety First** - TypeScript strict mode, Zod validation, no `any` types
2. **Server-First** - Use Server Components and Server Actions by default
3. **Progressive Enhancement** - Core game works without JavaScript where possible
4. **Test Everything** - 80% coverage target, test-first for bug fixes
5. **Document Decisions** - Update INSIGHTS.md for architecture changes

### Code Standards

#### TypeScript
```typescript
// ✅ Good: Explicit types, branded IDs
type PlayerId = string & { readonly __brand: 'PlayerId' }
function getPlayer(id: PlayerId): Promise<Player>

// ❌ Bad: Any types, implicit returns
function getPlayer(id: any) { return db.user.find(id) }

// ✅ Good: Type guards with predicates
export function hasCharacter(player: User): player is PlayerEntity {
  return player.name !== null && player.defeated === false
}

// ❌ Bad: Type assertions without validation
export function hasCharacter(player: User): boolean {
  return (player as PlayerEntity).name !== null
}
```

#### React Components
```typescript
// ✅ Good: Server Component by default
export default async function GamePage() {
  const player = await PlayerAction.show()
  return <Character data={player} />
}

// ✅ Good: Client Component when needed (explicit 'use client')
'use client'
export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}

// ❌ Bad: Unnecessary client component
'use client'
export default async function GamePage() { // async + 'use client' = error
  const player = await PlayerAction.show() // Can't fetch in client component
  return <Character data={player} />
}
```

#### Server Actions
```typescript
// ✅ Good: Proper action structure
'use server'

export const movePlayer = authActionClient
  .metadata({ actionName: 'player_move' })
  .schema(playerMoveSchema)
  .action(async ({ ctx, parsedInput }) => {
    // Validation already done by schema
    // ctx.user guaranteed by authActionClient
    const result = await db.user.update({
      where: { id: ctx.user.id },
      data: { pos_x: parsedInput.x, pos_y: parsedInput.y }
    })
    
    return { success: true, player: result }
  })

// ❌ Bad: Missing validation, no type safety
'use server'
export async function movePlayer(x: any, y: any) {
  const session = await getServerSession()
  await db.user.update({ 
    where: { id: session.user.id }, 
    data: { pos_x: x, pos_y: y } 
  })
}
```

#### Error Handling
```typescript
// ✅ Good: Typed error causes, proper handling
if (!inventory) {
  throw new Error(ERROR_CAUSE.NOT_AVAILABLE)
}

// Client-side with error boundary
<ErrorBoundary fallback={<ErrorMessage />}>
  <GameContent />
</ErrorBoundary>

// ❌ Bad: Generic errors, no recovery
if (!inventory) throw new Error('oops')
```

#### Constants vs Magic Numbers
```typescript
// ✅ Good: Named constants with context
export const BASE_HP_MAX = 100
export const BASE_MOVEMENT_COST = 1
export const ENEMY_SPAWN_CHANCE = 0.15 // 15% per move

// ❌ Bad: Magic numbers
if (player.hp > 100) { ... }
if (Math.random() < 0.15) { ... }
```

---

## 📂 Project Patterns

### Adding a New Entity

**Example: Adding "Pet" system**

#### 1. Create Prisma Schema
```prisma
// prisma/schema/pet.prisma
model Pet {
  id         String   @id @default(cuid())
  name       String
  type       PetType
  level      Int      @default(1)
  owner_id   String
  owner      User     @relation(fields: [owner_id], references: [id])
  created_at DateTime @default(now())
}

enum PetType {
  DOG
  CAT
  DRAGON
}
```

#### 2. Create Entity File
```typescript
// entity/pet.ts
import type { Pet, PetType } from '@prisma/client'

export type PetEntity = Pet & {
  text?: {
    name: string
    type: string
  }
}

export function isAdult(pet: Pet): boolean {
  return pet.level >= 10
}

export async function get(petId: string): Promise<Pet | null> {
  return db.pet.findUnique({ where: { id: petId } })
}
```

#### 3. Create Zod Schema
```typescript
// zod-schema/pet.ts
import { z } from 'zod'
import { PetType } from '@prisma/client'

export const petCreateSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.nativeEnum(PetType),
})

export type PetCreateSchema = z.infer<typeof petCreateSchema>
```

#### 4. Create Server Actions
```typescript
// app/actions/pet.ts
'use server'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import { playerActionClient } from '@/lib/safe-action'
import { petCreateSchema } from '@/zod-schema/pet'
import { get } from '@/entity/pet'

export const show = playerActionClient
  .metadata({ actionName: 'pet_show' })
  .action(async ({ ctx }) => {
    const pets = await db.pet.findMany({
      where: { owner_id: ctx.player.id }
    })
    
    return {
      pets,
      text: {
        header: i18n.t('pet.header'),
        create: i18n.t('pet.create'),
      }
    }
  })

export const create = playerActionClient
  .metadata({ actionName: 'pet_create' })
  .schema(petCreateSchema)
  .action(async ({ ctx, parsedInput }) => {
    const pet = await db.pet.create({
      data: {
        name: parsedInput.name,
        type: parsedInput.type,
        owner_id: ctx.player.id,
      }
    })
    
    return pet
  })
```

#### 5. Create React Query Hooks
```typescript
// hooks/api/pet.ts
import { createQueryHook, createMutationHook } from './_api-hooks'
import * as PetAction from '@/app/actions/pet'
import { QUERY_KEY } from '@/config'

export const usePetShowQuery = createQueryHook(
  [QUERY_KEY.PET],
  PetAction.show
)

export const usePetCreateMutation = createMutationHook(
  PetAction.create,
  [QUERY_KEY.PET] // Invalidate on success
)
```

#### 6. Create Component
```typescript
// components/app/Pet.tsx
'use client'

import { usePetShowQuery, usePetCreateMutation } from '@/hooks/api/pet'
import { Button } from '@/components/ui/button'

export default function PetList() {
  const { data } = usePetShowQuery()
  const createPet = usePetCreateMutation()
  
  return (
    <div>
      <h2>{data?.text.header}</h2>
      {data?.pets.map(pet => (
        <div key={pet.id}>{pet.name} - {pet.type}</div>
      ))}
      <Button onClick={() => createPet.mutate({ 
        name: 'Fluffy', 
        type: 'CAT' 
      })}>
        {data?.text.create}
      </Button>
    </div>
  )
}
```

#### 7. Add Tests
```typescript
// __tests__/entity/pet.test.ts
import { describe, it, expect } from 'vitest'
import { isAdult } from '@/entity/pet'

describe('Pet Entity', () => {
  it('should identify adult pet', () => {
    const pet = { level: 10 } as Pet
    expect(isAdult(pet)).toBe(true)
  })
  
  it('should identify young pet', () => {
    const pet = { level: 5 } as Pet
    expect(isAdult(pet)).toBe(false)
  })
})
```

---

## 🧪 Testing Standards

### Test Structure
```
__tests__/
  ├── unit/
  │   ├── entity/          # Pure functions, type guards
  │   ├── lib/             # Utilities, helpers
  │   └── zod-schema/      # Validation schemas
  ├── integration/
  │   ├── actions/         # Server Actions with DB mocks
  │   └── components/      # React components with providers
  └── e2e/
      └── critical-paths/  # Full user journeys
```

### Unit Test Example
```typescript
// __tests__/unit/lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { clamp, random } from '@/lib/utils'

describe('utils', () => {
  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(150, 0, 100)).toBe(100)
      expect(clamp(-10, 0, 100)).toBe(0)
      expect(clamp(50, 0, 100)).toBe(50)
    })
  })
  
  describe('random', () => {
    it('should generate number in range', () => {
      const result = random(10, 5)
      expect(result).toBeGreaterThanOrEqual(5)
      expect(result).toBeLessThan(10)
    })
  })
})
```

### Component Test Example
```typescript
// __tests__/integration/components/Form.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, userEvent } from '@/test-utils'
import Form from '@/components/Form'
import { z } from 'zod'

const schema = z.object({ name: z.string().min(1) })

describe('Form', () => {
  it('should validate on submit', async () => {
    const mockAction = vi.fn().mockResolvedValue({ success: true })
    const user = userEvent.setup()
    
    render(
      <Form schema={schema} action={mockAction}>
        <Form.Input name="name" label="Name" />
        <Form.Submit>Submit</Form.Submit>
      </Form>
    )
    
    await user.click(screen.getByText('Submit'))
    
    expect(screen.getByText(/required/i)).toBeInTheDocument()
    expect(mockAction).not.toHaveBeenCalled()
  })
})
```

### E2E Test Example
```typescript
// __tests__/e2e/character-creation.spec.ts
import { test, expect } from '@playwright/test'

test('user can create character and enter game', async ({ page }) => {
  // Sign up
  await page.goto('/')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('text=Sign Up')
  
  // Create character
  await expect(page).toHaveURL('/')
  await page.fill('[name="name"]', 'TestHero')
  await page.selectOption('[name="raceId"]', 'human')
  await page.selectOption('[name="classId"]', 'warrior')
  await page.click('text=Create Character')
  
  // Verify in game
  await expect(page.locator('text=TestHero')).toBeVisible()
  await expect(page.locator('text=HP: 100/100')).toBeVisible()
})
```

### Test Coverage Requirements
- **Core modules:** 80% (entity/, lib/, app/actions/)
- **Components:** 70% (components/)
- **UI primitives:** 50% (components/ui/)
- **E2E:** Critical paths only (sign up, combat, quests)

---

## 🔧 Common Tasks

### Running Development Server
```bash
# Start Next.js dev server
npm run dev

# Open http://localhost:3000
```

### Database Operations
```bash
# Apply schema changes to database
npm run prisma:update

# Reset database (⚠️ destructive)
npm run prisma:reset

# Generate Prisma Client (after schema changes)
npm run prisma:generate

# Open Prisma Studio (GUI for database)
npx prisma studio
```

### Code Quality
```bash
# Lint TypeScript files
npm run lint

# Type-check without building
npx tsc --noEmit

# Format all files
npx prettier --write .

# Run all checks before commit
npm run lint && npx tsc --noEmit && npm test
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- pet.test.ts

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm test -- --coverage
```

---

## 🚀 Deployment Checklist

### Pre-Deploy
- [ ] All tests passing (`npm test`)
- [ ] Type-check passing (`npx tsc --noEmit`)
- [ ] Lint passing (`npm run lint`)
- [ ] Build successful (`npm run build`)
- [ ] CHANGELOG.md updated
- [ ] Environment variables set in production

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Post-Deploy
- [ ] Verify site loads: https://land-of-machala.cz
- [ ] Test critical paths: sign up, character creation, movement
- [ ] Monitor error tracking (Sentry when implemented)
- [ ] Check database performance

---

## 🐛 Debugging Tips

### Server Actions Not Working
1. Check `'use server'` directive at top of file
2. Verify action client middleware (auth/player required?)
3. Check browser Network tab for 500 errors
4. Add `console.log` in action (logs show in server terminal)

### Hydration Errors
1. Check for `useState` in Server Components
2. Verify data matches between server/client render
3. Look for Date objects (serialize to ISO strings)
4. Check for Math.random() or other non-deterministic code

### Type Errors After Prisma Changes
1. Regenerate client: `npm run prisma:generate`
2. Restart TypeScript server in VS Code
3. Clear `.next` folder: `rm -rf .next`

### Database Connection Issues
1. Check `DATABASE_URL` in `.env`
2. Verify MySQL is running (Docker: `docker ps`)
3. Test connection: `npx prisma db pull`

---

## 📚 Resources

### Internal Documentation
- [INSIGHTS.md](../local/INSIGHTS.md) - Architecture decisions
- [TODO.md](../local/TODOS.md) - Active tasks
- [CHANGELOG.md](../CHANGELOG.md) - Version history
- [README.md](../README.md) - Setup guide

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [next-safe-action](https://next-safe-action.dev)

### Community
- Discord: (not set up yet)
- GitHub Discussions: (not enabled yet)

---

**Questions?** Open an issue or check INSIGHTS.md for architecture context.
