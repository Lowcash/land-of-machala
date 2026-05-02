---
applyTo: 'src/**/*.{ts,tsx},playwright.config.ts,vitest.config.ts,.storybook/**/*.{ts,tsx}'
---

# Imports & Path Ownership

- Use the `@/` alias for imports that cross directories or layers within `src/`.
- Use relative imports for same-directory siblings or tight local pairs only.
- Avoid long `../../..` traversals across features, app segments, or library boundaries.
- Import locale-aware navigation primitives from `@/i18n/routing` rather than mixing raw Next navigation helpers into localized UI code.
- Keep imports aligned with ownership boundaries: features import prefabs/core/lib, not internals from unrelated features.
- If a module becomes a common dependency across features, move it to the correct shared layer instead of deep-importing private files.
