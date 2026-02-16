# Changelog
 
All notable changes to this project will be documented in this file.
 
- [2026-02-17] - Origins Layout Refinement & UI Consistency
- 
- ### Changed
- - Standardized `height="creation"` to 480px across all components for perfect column alignment.
- - Unified `Card` borders: Primary cards now use `border-2`, and Secondary cards use `border-1` with consistent opacity.
- - Refined `AccordionTrigger` aesthetic (fantasy font, hover transitions, active scale anim) to match `Button` components.
- - Fixed `SelectionBox` scrolling regression by optimizing flex container constraints (`min-h-0`).
- - Optimized `CharacterIdentity` layout to ensure column parity in the Origins wizard.
- 
- ## [2026-02-17] - Unified Component APIs & SSR-Friendly Responsiveness
- 
- ## [2026-02-16] - Origins Refinements & Architecture Cleanup
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
