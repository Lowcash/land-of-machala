---
applyTo: 'package.json,playwright.config.ts,vitest.config.ts,e2e/**/*.ts,src/**/*.test.{ts,tsx},.storybook/**/*.{ts,tsx}'
---

# Testing & Validation

This repository uses multiple validation layers. Keep each layer focused and intentional.

## Test Surface

- Use Vitest for unit and component-level behavior.
- Use Storybook and Storybook-driven tests for reusable UI and design-system coverage.
- Use Playwright for critical end-to-end user journeys under `e2e/`.
- Use targeted visual checks only when reusable UI changes need regression confidence. Default to Storybook plus focused Playwright coverage before adding another hosted review layer.

## Placement & Scope

- Keep unit and component tests close to the code they validate.
- Keep end-to-end tests focused on real user flows such as auth, onboarding, and route transitions.
- Prefer deterministic tests and mock external side effects when a test does not need real integration behavior.
- Add focused contract or integration tests around future server actions, route handlers, and backend-facing helpers when those boundaries become important.

## Baseline Expectations

- Before merging meaningful changes, run linting, type checking, Vitest, and the relevant Playwright flow for the touched area.
- Keep Storybook buildable when working on reusable UI layers.
- Keep Storybook-driven tests healthy when stories represent reusable public UI states.
- When fixing a bug, add or update the nearest useful automated check whenever practical.

## Quality Discipline

- Do not leave debug logging or temporary diagnostics in production code.
- Avoid broad snapshot-heavy testing when behavior-oriented assertions are clearer.
- If a test setup becomes hard to reason about, simplify the production boundary before adding more mocks.
- For a large fullstack project, the default mix should be: unit and component tests via Vitest, story-driven UI validation, and Playwright for critical flows. Add more layers only when a new risk actually appears.
