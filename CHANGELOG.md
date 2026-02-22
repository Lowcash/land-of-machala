# Changelog

All notable changes to this project will be documented in this file.

## [2026-02-22] - Auth Architecture & UI Consistency (Revised)

### Added
- **Origins Flow**: Refined desktop column balance (`minHeight: 'creation'`) and optimized mobile accordion height (shrunk to fit content).

### Changed
- **Unified Padding**: Standardized padding across `Login`, `Register`, `Origins`, `Stats`, `Benefits`, `Changelog`, and `LoreQuote`.
- **Storybook Context**: Refactored Storybook decorators to use the new `RootShell` and `AuthShell` context.

### Fixed
- **Padding Regressions**: Resolved issues where desktop viewports incorrectly inherited mobile-only padding in narrative components.
- **Spacing**: Increased accordion label-to-chevron spacing to `gap-14` for better readability.
- **Rule of Zero**: Completed moving `AlertStack` to Core UI and removing all remaining `className` overrides.

## [2026-02-20] - MotionStack & Translation Security

### Added
- **Core Animations**: Introduced `MotionStack`, `MotionHStack`, and `MotionVStack` to support layout animations without `className` or inline styles.

### Changed
- **Refactor**: Replaced `motion.div` with `MotionStack` in `SelectionBox` and `SelectionItem` (Auth Origins feature).
- **Security**: Restricted `safeMessages` in the root layout to essential error keys only, preventing dictionary leaks to the client.

### Fixed
- **Performance**: Reduced client bundle size by stripping unnecessary `Auth` and `Game` translation namespaces from the root provider.

## [2026-02-18] - Enterprise i18n & Security Strategy
 
### Added
- **Core i18n**: Introduced `getScopedTranslations` server-side helper to maintain `t/g` pattern without client-side overhead.
- **Shared Models**: Created `TranslatedRaceInfo`, `TranslatedClassInfo`, and `TranslatedStoryStep` types for safe data propagation.
- **Security**: Implemented dynamic `generateMetadata` for all Auth pages to localize titles/descriptions on the server.
 
### Changed
- **Performance**: High-density features (Origins) are now 100% pre-translated on the server.
- **Architecture**: Stripped all `useTranslations` and `useScopedTranslations` hooks from presentational client components.
- **Cleanup**: Deleted unused `useScopedTranslations` client hook.
 
### Fixed
- **Security**: Prevented "Data Leaks" where raw translation JSON files were visible in the browser's Network tab.
- **Layout**: Restored 3-column desktop layout for Origins and 2-column layout for Login/Register.
 

### Added
- Created `FRONTEND_STANDARDS.md` to document the "Rule of Zero" and typography architecture.
- Established `StatusIcon` prefab in `icons/index.tsx` for consistent animated indicators.
- Added `fantasy-value`, `decoration`, and `tiny` variants to core `Typography`.

### Changed
- **Typography**: Refactored all typography prefabs (`Label`, `Legend`, `Description`) to use the core unified system.
- **Visual Hierarchy**: Standardized `Card` to default to `subtle` variant; reserved `primary` (Gold) for active selections/focus.
- **Animations**: Added `forwards` to global accordion and fade-in animations to ensure state persistence with `forceMount`.
- **Smart Fade**: Replaced aggressive truncation with space-aware linear-gradient masks (8px intensity).
- **Auth Views**: Synchronized spacing and margins across Login, Register, and Origins.

### Fixed
- **Accordion**: Resolved "open by default" bug in Login/Register views on mobile.
- **Selection**: Fixed TypeScript regression in `SelectionItem` regarding `IconColor`.
- **Origins**: Fixed double-button layout shift in the wizard footer.

## [2026-02-17] - Origins Layout Refinement & UI Consistency

### Changed
- Standardized `height="creation"` to 480px across all components for perfect column alignment.
- Unified `Card` borders: Primary cards now use `border-2`, and Secondary cards use `border-1` with consistent opacity.
- Refined `AccordionTrigger` aesthetic (fantasy font, hover transitions, active scale anim) to match `Button` components.
- Fixed `SelectionBox` scrolling regression by optimizing flex container constraints (`min-h-0`).
- Optimized `CharacterIdentity` layout to ensure column parity in the Origins wizard.

## [2026-02-16] - Origins Refinements & Architecture Cleanup
- Extracted business logic (icon mapping, stats) to `src/lib/game/origins/utils.ts`.

## [2026-02-14]

### Added
- **Auth**: Split `LoginView` and `RegisterView` into Server Components (for data/translations) and Pure UI Components (`LoginViewUI`, `RegisterViewUI`).
- **Storybook**: Implemented "Top-Down" story ordering strategy (FullPage -> CardOnly -> FormOnly).

### Fixed
- **Navigation**: Resolved circular reference error in `Accordion` Storybook docs by simplifying prop exports and standardizing `displayName`.
- **Storybook**: Fixed `async` component errors in authentication stories by using synchronous UI views with mock data.
- **Storybook**: Restored `fullscreen` layout for all page-level authentication stories.

## [2026-02-10]

### Added
- **Auth**: Created `/login` route in `app/login/page.tsx` that uses the new `LoginView`.
- **Auth**: Extracted `LoginView` server component in `src/components/features/auth/login.view.tsx` for shared use between the live route and Storybook.

### Changed
- **Storybook**: Updated `Login.stories.tsx` to use the centralized `LoginView` component for the "FullPage" example, ensuring consistency with the live application.
