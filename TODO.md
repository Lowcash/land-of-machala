# 📋 Land of Machala - Active Tasks

> **Last Updated:** 2025-11-16 01:50  
> **Current Sprint:** Code Quality + Refactoring

---

## 🔥 HIGH PRIORITY

### TypeScript & Type Safety

- [ ] **Enable Strict Mode** - Catch more errors
  - `"strict": true` in `tsconfig.json`
  - Fix all type errors (estimate: ~50-100 issues)
  - Add `noUncheckedIndexedAccess`
- [ ] **Replace Magic Strings** - Type-safe enums
  - `Route` type → `ROUTE` enum
  - Quest identifiers → `QUEST_IDENT` enum
  - Place types already enum ✅
- [ ] **Improve Prisma Types** - Better inference
  - Use `satisfies` operator for complex types
  - Create branded types for IDs
  - Type guards for entity validation

---

## ⚡ MEDIUM PRIORITY

### Code Organization

- [ ] **Replace Wildcard Imports** - Explicit dependencies
  - `import * as PlayerEntity` → `import { get, hasCharacter }`
  - Apply to all `entity/*` imports
  - Apply to all `lib/manager/*` imports
  - Estimate: ~30 files affected
- [ ] **Split Large Action Files** - Single responsibility
  - `app/actions/player.ts` (104 lines) - OK for now
  - Review others for splitting opportunities
- [ ] **Consolidate Entity Logic** - Reduce manager/entity overlap
  - Move pure data logic to entities
  - Keep transactional logic in managers
  - Document decision matrix in INSIGHTS.md

### Error Handling & UX

- [ ] **Improve Toast Messages** - User feedback
  - Consistent success/error patterns
  - Action-specific messages (not generic)
  - Undo/retry options for failures

### Performance Optimization

- [ ] **Add React.memo** - Prevent unnecessary re-renders
  - `CharacterPlayer` component
  - `CharacterEnemy` component
  - `Combat` action buttons
- [ ] **Code Splitting** - Reduce bundle size
  - Dynamic imports for game pages
  - Split heavy dependencies (framer-motion)
  - Analyze bundle with `@next/bundle-analyzer`
- [ ] **Optimize Prisma Queries** - Reduce database load
  - Audit N+1 query patterns
  - Add indexes for common queries
  - Use `select` to limit fetched fields

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

- **Testing infrastructure complete** ✅ - 14 passing tests, Vitest + Testing Library + Playwright setup
- **ESLint clean** ✅ - All errors fixed with proper justifications
- **Follow PR template** - All changes need CHANGELOG update
- **Small PRs preferred** - Max 400 lines changed
- **Document architecture decisions** - Update INSIGHTS.md for major changes
- **Next major task:** Refactor wildcard imports, then enable TypeScript strict mode
