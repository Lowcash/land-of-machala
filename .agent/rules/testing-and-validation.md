---
trigger: always_on
---

Aim for strong test coverage: core modules and feature layers above 80%, utilities and UI components above 70% where practical.

Structure tests at multiple levels: unit tests, integration tests, and end‑to‑end tests for critical user journeys.

When fixing bugs, follow a test‑first approach: write a failing test, implement the fix, and confirm that the new test and all existing tests pass.

Mock external dependencies such as file I/O, APIs, databases, and heavy ML models to keep tests deterministic and fast.

Before each commit, ensure that:

All tests pass.

Linting, type checks, and builds (where applicable) succeed.

No console or debug logging remains in production code.

