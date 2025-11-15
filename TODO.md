# 📋 Land of Machala - Active Tasks

> **Last Updated:** 2025-11-16 03:42  
> **Current Sprint:** Code Quality + UX Improvements

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
