---
trigger: always_on
---

# Land of Machala: AI Coding Guidelines & Frontend Standards

## 1. Core Principles

- Aesthetic First: Every component must feel premium and medieval. Use gold sparingly.
- Soulful Architecture: The "Core" (`ui/core`) is the foundation. "Prefabs" (`ui/prefabs`) are the semantic layer. "Features" (`features/*`) are the concrete implementation of flows and screens.
- Fail Fast: Use explicit types everywhere. Do not use `any`. Validate props strictly.
- Consistency over Flexibility: Prefer components that do one thing perfectly over highly overridable components that can be pushed into broken states.

## 2. The Rule of Zero

- Feature components must have zero occurrences of `className` or `style` in their JSX return.
- Use layout components like `<VStack align="center" ... />` or `<Stack display="grid" ... />` instead of ad‑hoc Tailwind classes.
- Use standardized motion components (`<MotionStack />`, `<MotionVStack />`, `<MotionHStack />`) for animations and transitions.
- Use design tokens exclusively for spacing and colors. No magic numbers.
- No ad‑hoc animations. Always go through standardized core animation components or prefabs.

## 3. Typography Architecture

We use a two‑tier typography system (`core/typography.tsx` and `ui/prefabs/typography/shared.tsx`):

- Feature components MUST use semantic Tier 2 prefabs (such as `Label`, `Legend`, `Value`).
- Do not apply raw text styles randomly or invent new text styles inside Features. If a new semantic text type is needed, create a prefab for it.

## 4. Visual Hierarchy & State

- Cards: Use the `subtle` variant by default for containers. Reserve `primary` (gold) for interactive focus or active selections.
- Buttons: Use `choice` for secondary options and `primary` for the main “Golden Path” action.
- Icons: Pass semantic colors through `IconProps` (e.g. `color="primary"`, `color="hp"`). Use `StatusIcon` for stateful/animated indicators.

## 5. Translation Standards

- Server Translations First: Resolve translations on the server and pass translated strings into Client Components as props.
- Do not expose full lore or entire auth/translation namespaces through `NextIntlClientProvider` at the root level unless absolutely necessary.
- Reduce `useTranslations` usage in Client Components; prefer `getTranslations` in Server Components.

## 6. Server vs Client Boundaries

- Interactivity implies `'use client'`: if a component has state, hooks or event handlers, it must be a Client Component.
- Pure visualization leaf components should remain Server Components when possible.
- Do not add `'use client'` to parents just because they import a client child. Pass serializable props instead.
- Multi‑step wizard flows (login, origins, etc.) typically use a Client Component entry for transition and state management.

## 7. AI Formatting & Code Style

- Prettier formatting: use single quotes, no semicolons and trailing commas as defined in `prettier.config.js`.
- AI‑generated code must adhere to the existing project format to minimize Prettier rewrite conflicts and noisy diffs.

## 8. React Import Standards

- Do not import React just to use JSX in React 18+/Next.js.
- Prefer named hook imports (`useState`, `useMemo`).
- For typing children and standard React nodes, prefer the global `React.ReactNode` namespace over named imports to reduce import clutter and clarify the type's origin.

```ts
  import { useState, useMemo } from 'react'

  interface Props {
    children: React.ReactNode
  }
```

- Avoid import * as React from 'react' unless you really need the namespace (for example React.forwardRef and you do not import it individually).

- Do not mix import * as React with named imports in the same file; keep a single style per file.