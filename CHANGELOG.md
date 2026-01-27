## 2026-01-23 03:20 - Code Quality & Type Safety Refactor

**Type:** Refactor, Type Safety  
**Scope:** Actions, Components, Lib  
**Impact:** Resolved 30+ lint errors, improved type safety by removing `any` casts, and fixed corrupted files.

### Added

- **Type Interfaces:** Defined `DeathLocation`, `Point`, `Notification` interfaces for better data structure handling in server actions.
- **Icon Types:** Used `LucideIcon` type consistently for shop items and achievements.

### Fixed

- **Cleanup:**
  - Removed `as any` from `app/(game)/game/page.tsx`, `GameFooter.tsx`, `MarketShop.tsx` and others.
  - Replaced generic `any` with `unknown` or specific interfaces in `lib/actions/` (travel, combat-state, loot-recovery, activity-log).
  - Fixed corrupted `lib/game/data.ts` and `MarketShop.tsx` where tool calls previously introduced placeholder text.
  - Resolved Next.js Typed Routes errors in `GameHeader.tsx` and `GameFooter.tsx` by defining explicit `AppRoute` types and ensuring all linked routes exist.
- **UI Components:**
  - Fixed empty interface error in `components/ui/input.tsx` by converting it to a type.
  - Added missing icon imports in `MarketShop.tsx`.
  - Removed unused variable `err` in `TavernActions.tsx`.
- **Typing:**
  - Exported `CharacterData` from `GameDashboard.tsx` for use in parent components.
  - Properly typed `metadata` in `activity-log.ts` using `Prisma.InputJsonValue`.
  - Fixed `useActivityLog` hook return types to avoid `any[]`.

### Changelog

## [2025-05-22] - Major Refactor & Project Cleanup

### Added

- Created `lib/actions/procedures.ts` with standardized `authenticatedProcedure` and `characterProcedure` using ZSA.
- Added session-based character identification within server actions.

### Changed

- **Server Actions Refactor**: Migrated all server actions (Combat, Movement, Bank, Tavern, Quest, Skill) to use ZSA procedures.
- **Dependency Simplification**: Removed redundant `characterId` arguments from all server action signatures and component prop interfaces.
- **Component Cleanup**: Streamlined `QuestClient`, `SkillsClient`, `CombatClient`, and location-based components.
- **Standardized Hooks**: Updated `useGameMove` to match the new context-aware action pattern.
- **Icon Optimization**: Cleaned up `lib/icons.ts` and simplified icon name handling.

### Fixed

- Resolved multiple TypeScript build errors related to mismatched action signatures.
- Fixed ESLint errors and standardized procedure middleware types.
- Corrected prop drilling issues in `ActionsArea` and `PlayerStats`.

### Changed

- **Type Imports:** Standardized on `import type` for Lucide icons and Prisma types where applicable.

---

## 2026-01-23 01:10 - UI Standardization & Layout Refactor

**Type:** Refactor  
**Scope:** UI Components, Layouts, Game Features  
**Impact:** Unified component naming, standard UI usage, and cleaner project structure.

### Refactored

- **Layout Standardization:**
  - Renamed `PageTemplate` → `PageLayout`
  - Renamed `SplitView` → `SplitLayout`
  - Renamed `RouteTransition` → `TransitionLayout`
  - Inlined `GameLayout` logic directly into `app/(game)/layout.tsx` (removed strict dependency)

- **Game Features:**
  - Renamed `GameActionsPanel` → `GameActions` and moved to `features/Game/components`
  - Moved `GameHeader` and `GameFooter` to `features/Game/components`
  - Refactored `TavernActions` to use new `Slider` component and `Button` links instead of raw HTML
  - Refactored `CharacterBox` to use standard `Progress` component with custom gradients

- **UI Components:**
  - Created `components/ui/slider.tsx` (Radix UI wrapper)
  - Updated `components/ui/progress.tsx` to accept `indicatorClassName` for custom styling
  - Deleted unused/legacy components: `GameCard`, `GameButton`, `MobileOverlay`, `InfoLogPanel`

- **Data Centralization:**
  - Moved 6 hardcoded achievements from `CharacterClient` → `lib/game/data.ts` (-45 lines)
  - Moved 12 random names from `Onboarding` → `lib/game/onboarding-data.ts` (-11 lines)

### Verified

- Global `Sonner` toaster is correctly placed in `app/layout.tsx`
- All game routes (`/combat`, `/map`, `/tavern`) use standardized layouts and imports

---

## 2026-01-22 12:10 - Fix Serializable Props for Skills Feature

**Type:** Fixed  
**Scope:** Skills  
**Impact:** Resolved Next.js client component serialization warnings for event handlers in Skills feature.

### Fixed

- **Refactoring Cleanup:**
  - Removed deprecated and unused legacy components in `components/features/Game`.
  - Removed deprecated `MapLegend` and `MapCanvas` as map has been refactored.
  - Removed outdated `StatDisplay` and `ContentCard` from `components/layout`.
  - Removed unused scripts and legacy test scripts.
  - Cleaned up various feature folders (`Skills`, `Quest`, `Inventory`) to remove legacy code.
  - Updated `components/features/Game/index.ts` to export new structure.

- **Skills Feature:**
  - Renamed `onSelectCategory` to `onSelectCategoryAction` in `SkillGrid` and `SkillCategoryFilter`.
  - Renamed `onSelectSkill` to `onSelectSkillAction` in `SkillGrid`.
  - Updated `SkillsClient` to use the renamed action props.
  - Follows Next.js naming convention to indicate Server Action compatibility (even if passed as client-side handlers) to satisfy the serializable props linter.
