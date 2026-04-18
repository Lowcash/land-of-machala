# Changelog

All notable active pre-alpha changes to Land of Machala are documented here.
Older exploratory history and abandoned route experiments are intentionally not carried forward in this reset-focused changelog.

## [2026-04-17] - Root-First Pre-Alpha Reset

### Changed

- **Canonical Surface**: Reframed the product around one canonical root route at `/` for anonymous entry, onboarding, and authenticated continuation.
- **Locale Scope**: Narrowed the active locale surface to Czech and English, with hidden locale resolution instead of visible public locale prefixes.
- **Route Cleanup**: Removed legacy auth route files so `/login`, `/register`, and `/origins` no longer remain as transitional public leftovers.
- **Design Workflow**: Split Stitch guidance into a base-shot prompt plus modification-first prompts that explicitly tell Stitch to modify the current accepted window.
- **Documentation**: Cleaned active product and backend docs so they describe the current root-first direction and the next backend step toward a Postgres and Prisma skeleton.

### Notes

- The current root session remains a temporary cookie-backed prototype until the first database-backed auth and session layer lands.
