# Changelog

All notable changes to this project will be documented in this file.

## [2026-02-10]

### Added
- **Auth**: Created `/login` route in `app/login/page.tsx` that uses the new `LoginView`.
- **Auth**: Extracted `LoginView` server component in `src/components/features/auth/login.view.tsx` for shared use between the live route and Storybook.

### Changed
- **Storybook**: Updated `Login.stories.tsx` to use the centralized `LoginView` component for the "FullPage" example, ensuring consistency with the live application.
