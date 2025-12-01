# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-12-01

### Added

- **Testing Infrastructure**: Set up comprehensive testing framework
  - Vitest for unit testing with jsdom environment
  - Testing Library for component integration tests
  - Playwright for E2E testing (structure ready)
  
- **Unit Tests** (173 tests added):
  - Player actions: movement logic, status checks, direction calculations
  - Game combat: damage calculations, level-up logic, enemy spawn mechanics
  - Bank actions: deposit/withdraw money and items
  - Inventory actions: buy/sell/equip items, potion usage
  - Quest actions: progress tracking, completion rules, rewards
  - Hospital actions: healing, resurrection, potion purchases
  - Stats calculations: strength, agility, intelligence, damage formulas
  - Utility functions: cn, random, clamp

- **Integration Tests**:
  - Game World page logic tests
  - Inventory page logic tests
  - Quest page logic tests

- **E2E Test Structure**:
  - Basic game flow test structure with Playwright

### Changed

- Updated README.md with testing documentation and project overview
- Added test scripts to package.json

### Why

Test coverage sprint to increase maintainability and catch regressions early.
Coverage increase from baseline to support ongoing development.

### Impact

- Developers can now run `npm run test` to validate changes
- CI/CD can enforce test passing before merges
- Game logic is documented through tests
