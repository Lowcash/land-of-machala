# 📋 Land of Machala - Active Tasks

> **Last Updated:** 2025-11-16 21:20  
> **Current Sprint:** Production Readiness + Best Practices

---

## 🔥 HIGH PRIORITY

### ✅ COMPLETED

- [x] **Code Organization - Large Files Refactored**
  - `app/actions/bank.ts`: 226 → 217 lines (extracted money/item transaction helpers)
  - `app/actions/wearable.ts`: 226 → 218 lines (extracted updatePlayerStats helper)
  - `app/actions/armory.ts`: 198 lines - clean, no refactoring needed
  - Removed dead code from `components/app/Place.tsx`
- [x] **Entity Logic Consolidation**
  - Verified clean separation: entity/ (1102 lines, data fetch) vs lib/manager/ (430 lines, business logic)
  - No overlap found, architecture is solid
  - Pattern: entities = "what", managers = "how"
- [x] **Component File Structure Refactoring** (2025-11-16 14:20)
  - Split `components/app/Safe.tsx` (255 lines) → `components/app/safe/` (5 files: types.ts + 4 components + index.ts)
  - Split `components/app/Market.tsx` (159 lines) → `components/app/market/` (4 files: types.ts + 2 components + index.ts)
  - Moved quest actions from `app/actions/hospital.ts` → `app/actions/quest.ts` for better cohesion
  - Moved `app/(game)/world/_components/Back.tsx` → `components/app/Back.tsx` for reusability
  - Documented `_layout.tsx` naming convention (layout components for conditional rendering, not Next.js layouts)
- [x] **Best Practices Audit & Fixes - Phase 1: Critical Infrastructure** (2025-11-16 14:31)
  - **CRITICAL**: Fixed assets location `app/assets/` → `public/images/` (Next.js convention)
  - **CRITICAL**: Eliminated `any` types in entity layer (armor.ts, weapon.ts) with proper Prisma types
  - **CRITICAL**: Reorganized docs: `locals/` → `docs/` directory
  - Added barrel exports for cleaner imports (entity/, lib/manager/, zod-schema/)
  - Split `config/index.ts` → extracted game constants to `config/game-constants.ts`
  - Frontend analysis: 82% compliance, target 93%
- [x] **Named Exports Conversion - Phase 2: Frontend Refactoring** (2025-11-16 14:50)
  - Converted all 17 components in `components/app/` from default to named exports
  - Fixed dynamic imports in Next.js (`import().then(m => ({ default: m.Component }))`)
  - Updated Props interfaces (Character, Place, Potions) to match actual usage
  - Updated 65+ import statements across entire codebase
  - Frontend compliance: 82% → 88% (+6% improvement)
  - **VALIDATED**: ✅ type-check passing, ✅ lint clean
  - Split config: extracted game constants from `config/index.ts` → `config/game-constants.ts`
  - Comprehensive audit documented in `.analysis/PROJECT_AUDIT.md`
- [x] **Frontend Refactoring - Phase 4: SRP/DRY Principles** (2025-11-16 21:20)
  - Converted 6 inventory components to named exports (Weapons, Armors, Potions, Wear, Unwear, Drink)
  - Created barrel exports: `components/app/index.ts` (21 exports), `inventory/_components/index.ts` (6 exports)
  - Refactored Action.tsx applying SRP + DRY:
    * Created ActionButton.tsx: Reusable button component (eliminates 11+ duplications)
    * Created MoveActions.tsx: Movement controls (4 directional buttons)
    * Created CombatActions.tsx: Combat attack buttons (4 attacks)
    * Created MenuActions.tsx: Navigation menu + group actions (split into 2 exports)
    * Refactored Action.tsx: 145 → 31 lines (orchestrator pattern)
  - Benefits: 118 lines eliminated, better testability, maintainability, reusability
  - **VALIDATED**: ✅ type-check passing, ✅ build successful (7.8s)

---

## ⚡ MEDIUM PRIORITY

### Error Handling & UX

- [ ] **Improve Toast Messages** - User feedback
  - Consistent success/error patterns
  - Action-specific messages (not generic)
  - Undo/retry options for failures

---

## 🔄 LOW PRIORITY (Refactoring)

### Security Enhancements

- [ ] **Add Rate Limiting** - Prevent abuse
  - Install `@upstash/ratelimit` or similar
  - Limit Server Actions (e.g., 10 moves/minute)
  - Return 429 with retry-after header
- [ ] **Password Policy** - Enforce strong passwords
  - Minimum 8 characters
  - Require uppercase + lowercase + number
  - Zod validation in sign-up schema
- [ ] **Implement Sentry** - Error tracking
  - Uncomment Sentry code in `lib/safe-action.ts`
  - Add `@sentry/nextjs`
  - Configure error reporting

### Developer Experience

- [ ] **Create Docker Compose Setup Script** - One-command setup
  - Already exists in `deploy/docker-compose.yml` ✅
  - Add setup script: `npm run docker:up`
  - Document in README
- [ ] **Add Storybook** - Component development
  - Install `@storybook/nextjs`
  - Create stories for UI components
  - Visual regression testing

---

## 🎯 Future Features (Backlog)

### Multiplayer Support

- [ ] WebSocket integration for real-time combat
- [ ] PvP battle system
- [ ] Trade between players
- [ ] Chat system

### Game Enhancements

- [ ] More quests (current: 2 quest types)
- [ ] Crafting system
- [ ] Guild/clan mechanics
- [ ] Leaderboards

### Technical Improvements

- [ ] Migrate to `zsa` (Zod Server Actions)
- [ ] Migrate to `next-intl` for i18n
- [ ] Add Redis for session caching
- [ ] Implement event sourcing for game history

---

## 📝 Notes

- **HIGH PRIORITY tasks COMPLETE** ✅ - All code organization and entity consolidation tasks finished (2025-11-16)
- **Code refactoring COMPLETE** ✅ - bank.ts (-4%), wearable.ts (-3.5%), dead code removed
- **Entity-Manager pattern validated** ✅ - Clean separation confirmed, no overlap
- **Code splitting COMPLETE** ✅ - Dynamic imports for Combat, Loot, Place, Explore, Inventory sections
- **Prisma optimization COMPLETE** ✅ - All queries use include/select properly, all foreign keys indexed
- **React.memo optimization COMPLETE** ✅ - 5 components memoized (CharacterPlayer, CharacterEnemy, Combat, Decision, Info)
- **TypeScript strict mode COMPLETE** ✅ - noUncheckedIndexedAccess enabled, all errors fixed
- **Magic strings COMPLETE** ✅ - Routes using ROUTE constants, QuestIdent using Prisma enum
- **Prisma types COMPLETE** ✅ - Branded types, satisfies operator, enhanced type guards, UUID validation
- **Testing infrastructure complete** ✅ - 14 passing tests, Vitest + Testing Library + Playwright setup
- **ESLint clean** ✅ - All errors fixed with proper justifications
- **Follow PR template** - All changes need CHANGELOG update
- **Small PRs preferred** - Max 400 lines changed
- **Document architecture decisions** - Update INSIGHTS.md for major changes
