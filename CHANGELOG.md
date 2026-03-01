# Changelog

All notable changes to this project will be documented in this file.

## [2026-03-01] - Origins & Auth UI Refinement

### Added
- **Localization**: Added support for Italian (`it`), German (`de`), Polish (`pl`), and Slovak (`sk`) locales.
- **E2E Testing**: Added `auth-flow.spec.ts` to verify full registration and login flows.
- **Visual Testing**: Added `visual-check.spec.ts` for regression testing of core UI components.

### Changed
- **Origins Layout**: Updated `FeatureGrid` to support 2-column layouts on mobile for `dense` and `selection` variants.
- **CharacterStatsCard**: Refactored bonus display into a clean, left-aligned single-column format within the `ScrollArea`.
- **UX Refinement**: Added dynamic, "human-like" placeholders to email and name inputs across all supported languages.
- **UI Unification**: Synchronized `PageHeader` spacing in Origins with `BrandedHero` spacing in Auth (standardized to `gap="md"`).
- **Form Integrity**: Re-implemented strict validation-based `disabled` states for Auth submit buttons.
- **Build & Typing**: Fixed Storybook mock data dependencies and resolved additional `any` type usages in core layout components.
- **Layout System**: Adjusted the `creation` height variant in `box.tsx` to 480px (stable default) after testing compact overrides.


### Changed
- **ScrollArea**: Added `viewportRef` prop to expose the inner scrolling element. This allows external components to target the content viewport directly for animations.
- **FadeInPanel**: Reduced DOM depth to strictly 2 divs by removing the `Box` wrapper and using `ScrollArea` as the base. Content fade is now achieved by targeting the `viewportRef` imperatively, ensuring card decoration and scroll arrows remain stable.
- **Typing**: Standardized `uiLabels` and `CharacterStats` typing across **Origins**, **Login**, and **Register** features using shared interfaces. Removed `any` from `resolvers.ts` by introducing `TranslationFn` type.

## [2026-02-27] - UI Refinements & Component Cleanup

### Changed
- **Login Actions**: Forced vertical stacking of "Try as guest" and "Establish your legacy" buttons on all breakpoints via `ActionGroup`.
- **Divider**: Increased visibility of the `solid` variant by bumping gradient opacity to 80%.
- **FadeInPanel**: Optimized DOM structure by moving `AnimatePresence` and animation keys to `MotionScrollArea`, removing a redundant inner `motion.div`.

### Removed
- **FeatureLayout**: Deleted the unused structural prefab and removed its references across the authentication flow.

## [2026-02-27] - Origins Mobile Layout & React Import Standardization

### Changed
- **FeatureGrid**: Added `'selection'` variant — always 2 columns regardless of breakpoint. Used in `SelectionBox` to keep race/class grids 2-column on mobile.
- **AuthShell**: Added `gap="lg"` to the inner content container, providing consistent spacing between `PageHeader`, main grid, and the mobile "Begin Adventure" button.
- **React Imports**: Standardized `import * as React` → named imports across remaining core/interactive files: `button.tsx`, `box.tsx`, `progress.tsx`, `list.tsx`, `tooltip.tsx`, `accordion.tsx`, `choice.tsx`, `typography/card.tsx`.

## [2026-02-27] - Layout Cleanup & DOM Optimization


### Changed
- **FadeInPanel**: Refactored from 4 DOM elements (`Card.Root → ScrollArea → Stack → motion.div`) to 2 (`MotionScrollArea` with `cardVariants()` className). Visual output identical, half the DOM depth.
- **SelectionBox**: Replaced `SelectionButton` wrapper (pure passthrough) with direct `FeatureChoice` usage. Also replaced ad-hoc `Stack display="grid"` with `FeatureGrid` prefab.
- **SelectionDetails**: Replaced ad-hoc `Stack display="grid"` with `FeatureGrid variant="dense"`.
- **React Imports**: Standardized named imports (`forwardRef`, `HTMLAttributes`, `ReactNode`, `ElementType`) across `stack.tsx`, `card.tsx`, `scroll-area.tsx`, `motion-stack.tsx`, `feature-choice.tsx`, `feature-section.tsx` — removing all `import * as React` and default `import React` patterns.

### Removed
- **SelectionButton**: Deleted `selection-button.tsx` and `selection-button.test.tsx` (empty wrapper replaced by `FeatureChoice`).

## [2026-02-27] - UI Refactoring & Structural Prefabs


### Added
- **Structural Prefabs**: Introduced `FeatureLayout`, `FeatureSection`, `InfoPanel`, and `ActionGroup` to enforce layout rigidity and reduce boilerplate.
- **FadeInPanel**: New animation prefab to encapsulate `MotionScrollArea` transition logic.
- **CharacterBox Tests**: Added comprehensive test suite for the `CharacterBox` feature.

### Changed
- **Renaming**: Renamed `PageLayout` to `FeatureLayout` for improved semantic clarity.
- **Refactor**: Replaced raw `VStack`/`HStack` with structural prefabs in `Login`, `Register`, `Origins` flow, and `CharacterBox`.
- **Flexibility**: Updated `InfoPanel` and `FeatureSection` to extend `StackProps`, allowing controlled layout overrides.

### Fixed
- **Type Safety**: Resolved various TypeScript and JSX errors induced by prefab migration.
- **Test Stability**: Fixed false-positive timeouts in JSDOM by refining interaction events.

## [2026-02-27] - Core Standards & Origins Testing

### Added
- **E2E Testing**: Established Playwright configuration with automated dev server lifecycle.
- **Origins Flow**: Expanded Playwright coverage to validate mandatory fields before continuation and added E2E tests for the "Randomize" character function.

### Changed
- **Code Standards**: Migrated entire codebase to use the native global `React.ReactNode` type declaration to reduce import clutter, dropping legacy named imports.
- **Design System**: Unified height constraints by collapsing the redundant `selection` token into the `creation` token (`h-[480px]`) inside `box.tsx`.
- **E2E Testing**: Moved `origins-flow.spec.ts` from local component directory to the root `e2e/` folder to prevent Vitest suite pollution.

### Fixed
- **Mobile Styling**: Fixed mobile `SelectionDetails` rendering issues where accordion height was too cramped to display content by increasing allocation space.

## [2026-02-23] - Storybook Standardization & Documentation Audit

### Added
- **Progress**: Added internal children support to `Progress` component for centered labels/values.
- **Storybook**: Added `WithText` story for `Progress`.
- **Storybook**: Improved Tooltip "Directions" with a cross-shaped 3x3 layout.

### Changed
- **VitalsBar**: Refactored to render values inside the `Progress` bar, preventing layout collisions with long labels.
- **Storybook**: Refactored `ScrollArea`, `Field`, `Hero`, and `Shared` stories to use core layout components (`VStack`, `Card`) and adhere to the "Rule of Zero".
- **Storybook**: Standardized default Icon size to `md` and removed redundant overrides.
- **Accordion**: Added `pr-6` to triggger wrapper to prevent text overlap with the chevron.
- **Progress**: Refactored stories to use `VStack` decorators and fixed height visibility.
- **Avatar**: Fixed collapsing in Hero story by mapping standard sizes to avatar tokens.
- **Avatar**: Solidified rectangular portrait layout (3/4 aspect ratio) and fixed oversized scaling in stories.
- **Progress**: Switched to width-based animation for better stability and fixed visibility issues in Storybook decorators.
- **Icons**: Removed default props from specialized icons (`UserIcon`, `SparklesIcon`, `SwordsIcon`) to avoid unintended branding in text contexts.
- **Typography**: Fixed decorative `SparklesIcon` in Hero subtitle to be small and gold by default.
- **Storybook**: Replaced raw `<Input type="checkbox" />` with the official `<Checkbox />` component in forms.

### Fixed
- **Visuals**: Resolved text overflow and cramped layout issues in `Progress` and `VitalsBar`.
- **Linting**: Fixed TypeScript errors in `VitalsBar` and `Typography` stories.
- **Storybook**: Restored broken "With Icon" story in `Typography` using standard `HStack` layout.
- **Cleanup**: Removed unused `FormationStatus` component and its stories.
- **Standards**: Replaced styled `span` in `Progress` stories with the semantic `Value` prefab to adhere to the "Rule of Zero".

### Phase 4 - Storybook Final Polish & Icon Consistency
- **Icons**: Standardized default `Icon` size to `md` and removed individual overrides in specialized icon components for better consistency.
- **Tooltip**: Refactored "Directions" story to use a 3x3 compass-like grid layout, dramatically improving visualization.
- **Alert**: Centered the "Comparison" story in `alert.stories.tsx` using `VStack` for professional presentation.
- **Standards**: Refactored `icons.stories.tsx` to follow the "Rule of Zero" by replacing raw `div` elements with project-standard `Stack` components.


## [2026-02-22] - Auth Architecture & UI Consistency (Revised)

### Added
- **Core UI**: Added `top-2` (0.5rem) variant to `Stack` component to support tighter mobile layouts.

### Changed
- **Origins Flow**: Refined desktop column balance (switched to `height="full"` with `minHeight="creation"`) to ensure all columns stretch equally.
- **Unified Padding**: Standardized padding across `Login`, `Register`, `Origins`, `Stats`, `Benefits`, `Changelog`, and `LoreQuote`.
- **GameAccordion**: Reduced header gap to `gap-4` and added `mr-2` to `selectedLabel` for better mobile fit and separation from chevron.

### Fixed
- **AlertStack**: Repositioned to `top="2"` on mobile to ensure stacked alerts stay within view on small devices.
- **SelectionDetails**: Cleaned up redundant internal padding to fix double-padding issues in Origins.
- **Storybook Context**: Refactored Storybook decorators to use the new `RootShell` and `AuthShell` context.
- **Padding Regressions**: Resolved issues where desktop viewports incorrectly inherited mobile-only padding in narrative components.

## [2026-02-20] - MotionStack & Translation Security

### Added
- **Core Animations**: Introduced `MotionStack`, `MotionHStack`, and `MotionVStack` to support layout animations without `className` or inline styles.

### Changed
- **Refactor**: Replaced `motion.div` with `MotionStack` in `SelectionBox` and `SelectionItem` (Auth Origins feature).
- **Security**: Restricted `safeMessages` in the root layout to essential error keys only, preventing dictionary leaks to the client.

### Fixed
- **Performance**: Reduced client bundle size by stripping unnecessary `Auth` and `Game` translation namespaces from the root provider.

- Phase 8: Avatar layout 3:4, Progress visibility, Icon prefab cleanup, Sparkles icon refinement.
- Phase 9: Storybook 'padded' layout standardization, responsive Progress decorators, Avatar 'rectangle' polish, and CharacterBox compatibility.

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

### Phase 9: Storybook Layout & Avatar Refinement
- **Storybook**: Reverted global layout to `centered`; implemented `StoryContainer` decorator for layout stability.
- **Avatar**: Restored "framed portrait" look with rectangular tokens and solid borders.
- **Stack**: Fixed critical bug where `className` was overwriting variant classes.
- **Verification**: UI audit confirmed stable integration in `CharacterBox` and individual stories.

### Changed
- **Storybook**: Updated `Login.stories.tsx` to use the centralized `LoginView` component for the "FullPage" example, ensuring consistency with the live application.
