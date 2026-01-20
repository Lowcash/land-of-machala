---
trigger: always_on
---

Do not introduce magic numbers; use named constants instead.

Do not use fallback flags (such as *_AVAILABLE) to hide missing dependencies; fail fast and surface problems explicitly.

Avoid god classes or components with too many responsibilities; favor smaller units with clear roles.

Avoid deep props drilling or excessive parameter lists (more than 4 parameters); prefer composition, context, or parameter objects.

Do not use any types in TypeScript or implicit conversions where explicit types are possible.

Do not leave deprecated code markers, commented‑out code, or historical comments; keep the codebase reflecting the current state.

Remove unused code before committing changes.