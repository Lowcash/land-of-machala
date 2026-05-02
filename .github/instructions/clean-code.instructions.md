---
applyTo: '**/*.{ts,tsx,js,jsx,mjs,json}'
---

# Clean Code & Maintenance Discipline

- Prefer explicit, named types over `any`, implicit shape assumptions, or loosely typed payloads.
- Fail fast when configuration or prerequisites are missing; do not hide missing dependencies behind silent fallback flags.
- Use named constants for reusable literals and threshold values rather than scattering magic numbers.
- Distinguish constants from configuration: immutable code-level facts belong in constants; user- or environment-controlled values belong in config.
- Prefer stable, documented platform features by default. Reach for experimental APIs only with a clear benefit, rollback path, and repository-level agreement.
- Keep functions and components focused; when responsibilities start to split, extract helpers or smaller units.
- Avoid deep props drilling and oversized parameter lists; prefer composition, context, or parameter objects when that improves clarity.
- Remove unused code, dead branches, commented-out legacy code, and stale TODO-style history markers.
- Comments should explain intent, constraints, or tradeoffs, not restate obvious syntax.
- When changing a boundary or public pattern, update docs and tests close to the affected surface.
