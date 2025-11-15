# 📋 Land of Machala - Active Tasks

> **Last Updated:** 2025-11-16 03:22  
> **Current Sprint:** Performance Optimization + Code Quality

---

## 🔥 HIGH PRIORITY

### Code Organization

- [ ] **Split Large Action Files** - Single responsibility
  - `app/actions/wearable.ts` (225 lines) - Candidate for splitting wear/unwear logic
  - `app/actions/bank.ts` (225 lines) - Candidate for splitting deposit/withdraw logic
  - `app/actions/armory.ts` (198 lines) - Review for extraction opportunities
  - `app/actions/player.ts` (103 lines) - OK for now
- [ ] **Consolidate Entity Logic** - Reduce manager/entity overlap
  - Move pure data logic to entities
  - Keep transactional logic in managers
  - Document decision matrix in INSIGHTS.md

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
