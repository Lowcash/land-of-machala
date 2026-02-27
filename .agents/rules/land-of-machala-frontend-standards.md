---
trigger: always_on
---

# Land of Machala: AI Coding Guidelines & Frontend Standards

This document outlines the architectural principles, coding standards, and "design soul" of the Land of Machala frontend.

## 1. Core Principles

- Aesthetic First: Every component must feel premium and medieval. Use gold sparingly.
- Soulful Architecture: The "Core" (`ui/core`) is the foundation. "Prefabs" (`ui/prefabs`) are the semantic layer. "Features" (`features/*`) are the concrete implementation of flows and screens.
- Fail Fast: Use explicit types everywhere. Do not use `any`. Validate props strictly.
- Consistency over Flexibility: Prefer components that do one thing perfectly over highly overridable components that can be pushed into broken states.

## 2. The Rule of Zero

A healthy Feature component should have **zero** occurrences of the word `className` or `style` in its JSX return statement.

1. Need to center a button? Use `<VStack align="center" ... />`.
2. Need to overlap an icon? Create a `StackedIcon` prefab or add a `composite` variant to the component.
3. Need a specific width? Use the `size` prop or a layout container.

- **Zero magic numbers** in spacing or colors. Use design tokens exclusively.
- **Zero ad-hoc animations**. Always go through standardized core animation components (`<MotionStack />`, `<MotionVStack />`, `<MotionHStack />`) or prefabs.

## 3. Structural Prefabs (Layout Architecture)

Use Structural Prefabs for high-level page and feature architecture instead of manually assembling raw `VStack`/`HStack` components.
- Raw layout components (`Stack`, `VStack`, `HStack`) from `ui/core` should be reserved for localized, micro-layouts within a feature where a standard prefab doesn't fit.
- For common page sections, containers, or panels, use or create standard prefabs (e.g., `PageLayout`, `FeatureSection`, `InfoPanel`, `ActionGroup`) that bake in standard padding (`p`), spacing (`gap`), and alignment.

## 4. Typography Architecture

We use a two-tier typography system to ensure consistency and prevent "font-drift".

### Tier 1: Core Variants (`core/typography.tsx`)
The `Text` component owns the physical scaling and font-family combinations.
- `lead`: High-impact introductory text.
- `fantasy-value`: Tracking-wide fantasy numbers.
- `decoration`: Uppercase tracking-wide labels.
- `detail`: Italicized small body text.
- `tiny`: Extreme information density.

### Tier 2: Semantic Prefabs (`ui/prefabs/typography/shared.tsx`)
Feature components MUST use semantic Tier 2 prefabs. Do not apply raw text styles randomly or invent new text styles inside Features.
- `Label`: Standard field labels (Decoration variant + Gold/Primary).
- `Legend`: Supporting context or footnotes (Detail variant + Secondary).
- `Value`: Formatted data display (Fantasy-value variant + Ivory/Primary).

## 5. Visual Hierarchy & State

- Cards: Use the `subtle` variant by default for containers. Reserve `primary` (Gold) for interactive focus or active selections.
- Buttons: Use `choice` for secondary options and `primary` for the "Golden Path" (the main action the user should take).
- Icons: Pass semantic colors through `IconProps` (e.g., `color="primary"`, `color="hp"`). Use the `StatusIcon` prefab for animated indicators.

## 6. Translation Standards

To prevent leaking sensitive data (lore, full locale objects) to the client bundle, we enforce a **Server Translations First** pattern.

- Server Translations First: Resolve translations on the server via `getTranslations('Namespace')` or `getMessages()` and pass translated strings into Client Components as props.
- Do not expose full lore or entire auth/translation namespaces through `NextIntlClientProvider` at the root level unless absolutely necessary.
- Reduce `useTranslations` usage in Client Components; prefer `getTranslations` in Server Components.

```tsx
// Preferred: Server Component fetching translations and passing strings
const t = await getTranslations('Auth.Origins.creation')
return <ClientWizard title={t('title')} subtitle={t('subtitle')} />
```

## 7. Server vs Client Boundaries

- Interactivity implies `'use client'`: if a component has state, hooks, or event handlers, it must be a Client Component.
- Pure visualization leaf components (Icons, simple Text wrappers) should remain Server Components when possible.
- Do not add `'use client'` to parents just because they import a client child. The parent can still be a Server Component that passes serializable data (strings, numbers, simple objects) to its client children.
- Multi-step wizard flows (login, origins, etc.) typically use a Client Component entry (`view.tsx`) for transition and state management.

## 8. AI Formatting & Code Style

- Prettier formatting: use single quotes, no semicolons, and trailing commas as defined in `prettier.config.js`.
- AI-generated code must adhere to the existing project format to minimize Prettier rewrite conflicts and noisy diffs.

## 9. React Import Standards

- Do not import React just to use JSX in React 18+/Next.js.
- Prefer named hook imports (`useState`, `useMemo`).
- For typing children and standard React nodes, prefer the global `React.ReactNode` namespace over named imports to reduce import clutter and clarify the type's origin.

```ts
  import { useState, useMemo } from 'react'

  interface Props {
    children: React.ReactNode
  }
```

- Avoid `import * as React from 'react'` unless you really need the namespace (for example `React.forwardRef` and you do not import it individually).
- Do not mix `import * as React` with named imports in the same file; keep a single style per file.