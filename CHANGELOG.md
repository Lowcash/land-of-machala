# Changelog
 
All notable changes to this project will be documented in this file.
 
## [2026-02-16] - Origins Refinements & Architecture Cleanup

### Added
- Created `CharacterIdentity` component to modularize the character creation identity column.
- Created `SelectionDetails` component to encapsulate race/class description and stat logic.
- Implemented `canFinish` validation in `useOrigins` hook to ensure a name is provided before entering the world.
- Introduced `rounded` variant to `Card` component for more flexible UI designs.

### Changed
- Consolidated `OriginsWizard` logic directly into `OriginsViewUI` in `origins/view.tsx`.
- Unified the `Icon` system in `src/components/ui/icons` to support semantic stat colors.
- Refactored `StatRow` and `SelectionItem` to use clean, prop-driven icon styling (removed `className` hacks).
- Simplified `SelectionBox` component by removing duplicate desktop/mobile logic.
- Consolidated `PageHeader` into `src/components/ui/prefabs/typography/hero.tsx` and centered `HeroSubtitle` text.
- Relocated "Enter the world" button to the bottom of the creation screen for better accessibility.

### Fixed
- Resolved layout issues where the character creation grid did not display correctly in 3 columns on desktop.
- Restored `rounded-lg` as the default card rounding for a more premium medieval look.
- Corrected various layout and responsive bugs in the `Origins` screen.
 
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
