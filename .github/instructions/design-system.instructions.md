---
applyTo: 'src/components/ui/**/*.{ts,tsx},src/components/features/**/*.{ts,tsx},src/app/globals.css'
---

# Design System & Styling

This repository uses a layered design system with `ui/core`, `ui/prefabs`, feature modules, and Tailwind v4 tokens in CSS.

## Layering

- `ui/core` owns atomic building blocks, layout primitives, and tightly scoped variants.
- `ui/forms` owns reusable field composition and validation-facing form UI.
- `ui/prefabs` owns semantic, repeatable presentation patterns that combine multiple primitives and carry meaningful styling.
- `ui/prefabs/layout` is an appropriate home for reusable visual layout shells; it does not compete with Next.js route `layout.tsx` files.
- `features` own concrete product flows and should compose prefabs and core primitives instead of rebuilding them.

## What "Semantic Blocks" Means

- `ui/core` owns primitive design decisions such as tokens, layout props, low-level variants, and raw building-block behavior.
- `ui/prefabs` own reusable semantic blocks such as auth shells, hero sections, stat panels, animated containers, or other higher-level compositions.
- A prefab is not meant to be a style-free wrapper. It may use stable `className` or variant composition internally, as long as that styling is reusable and semantically owned there.
- The goal is not “all styling only in core”. The goal is “styling lives at the lowest stable reusable layer”.

## Styling Rules

- Keep shared design tokens in the global CSS entrypoint using Tailwind v4 CSS-first patterns.
- Right now that entrypoint is `src/app/globals.css`. If the style system becomes large, split style modules under `src/styles/` and keep one import from the root layout instead of letting one file grow indefinitely.
- Prefer variants, prefabs, and semantic wrappers over copying large raw class strings into multiple features.
- Avoid introducing broad `className` escape hatches on core primitives unless there is a clear extension need.
- Styling outside `ui/core` is not a design failure. `prefabs` should own higher-level styling so that `core` does not become bloated with product semantics.
- If a feature needs repeated visual structure, promote that pattern into a prefab instead of hand-tuning each instance.

## Agent Heuristic For CSS Growth

- Keep a single global entrypoint as long as it remains readable and the style system is still mostly one cohesive layer.
- Split into `src/styles/` modules when tokens, base rules, motion rules, editor-facing utilities, or larger thematic sections start making `globals.css` hard to scan or risky to edit.
- Even after splitting, keep one root import from the layout so the loading path stays obvious.

## Typography & Motion

- Prefer shared typography components or semantic wrappers over repeating raw heading and text styling decisions.
- Reusable motion behavior belongs in `ui/prefabs/animations/` rather than being reimplemented across features.
- Prefer CSS or Tailwind transitions for simple hover, reveal, and state-change motion.
- Use Framer Motion for layout choreography, presence transitions, shared animated primitives, or cases where CSS becomes awkward or fragile.
- Keep motion intentional, respect reduced-motion preferences, and avoid turning every interaction into a Framer-only solution by default.

## Reusable UI Assets

- Reusable typography, animation, and structural building blocks should exist when they reduce repeated decisions across features.
- Storybook should cover public, reusable UI surfaces: core primitives, forms, prefabs, meaningful variants, and important edge states.

## Workflow

- Treat Storybook as part of the design-system development loop.
- New reusable primitives should be understandable through variants and stories, not only through one feature usage.