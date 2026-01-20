---
trigger: always_on
---

Avoid magic numbers: use named constants for all literals greater than 1.

Write self‑documenting code with meaningful names, explicit types, and no unused code.

Follow SOLID principles: single responsibility, open/closed, Liskov substitution, interface segregation, and dependency inversion.

Eliminate duplication by reusing existing solutions and consolidating duplicates as soon as they are identified.

Distinguish between constants and configuration: immutable settings → constants, user‑tunable values → configuration.

Use comments to explain why and provide context for design decisions, not to restate obvious behavior.

Run linting and formatting after making changes, following the project’s configured tools.