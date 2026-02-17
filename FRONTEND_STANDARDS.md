# Land of Machala: Frontend Standards & Design Soul

This document outlines the architectural principles, coding standards, and "design soul" of the Land of Machala frontend.

## 1. Principles
- **Aesthetic First**: Every component must feel premium and medieval. Use gold sparingly.
- **Soulful Architecture**: The "Core" (`ui/core`) is the foundation. "Prefabs" (`ui/prefabs`) are the semantic layer. "Features" (`features/*`) are the implementation.
- **No Inline Styles**: Ad-hoc `className` usage is prohibited in feature components. Use Props or Prefabs.
- **Fail Fast**: Explicit types, no `any`, and strict prop validation.
- **Consistency over Flexibility**: It is better to have a component that does one thing perfectly than one that can be overridden into "broken" states.

## 2. The Rule of Zero

A healthy Feature component should have **zero** occurrences of the word `className` in its return statement.
1. Need to center a button? Use `<VStack align="center" ... />`.
2. Need to overlap an icon? Create a `StackedIcon` prefab or add a `composite` variant to the component.
3. Need a specific width? Use the `size` prop or a layout container.
- **Zero magic numbers** in spacing or colors. Use tokens exclusively.
- **Zero ad-hoc animations**. Use standardized core animation components or prefabs.

## 3. Typography Architecture

We use a two-tier typography system to ensure consistency and prevent "font-drift".

### Tier 1: Core Variants (`core/typography.tsx`)
The `Text` component owns the physical scaling and font-family combinations.
- `lead`: High-impact introductory text.
- `fantasy-value`: Tracking-wide fantasy numbers.
- `decoration`: Uppercase tracking-wide labels.
- `detail`: Italicized small body text.
- `tiny`: Extreme information density.

### Tier 2: Semantic Prefabs (`ui/prefabs/typography/shared.tsx`)
Prefabs are semantic "shells" that combine Tier 1 variants with the correct **Color** and **Font**. Feature components MUST use these prefabs.
- `Label`: Standard field labels (Decoration variant + Gold/Primary).
- `Legend`: Supporting context or footnotes (Detail variant + Secondary).
- `Value`: Formatted data display (Fantasy-value variant + Ivory/Primary).

## 4. Visual Hierarchy & State

- **Cards**: Use the `subtle` variant by default for containers. Reserve `primary` (Gold) for interactive focus or active selections.
- **Buttons**: Use `choice` for secondary options and `primary` for the "Golden Path" (the main action the user should take).
- **Icons**: Use `IconProps` to pass semantic colors (`primary`, `hp`, etc.) instead of manual tailwind color classes. Use the `StatusIcon` prefab for animated indicators.

## 5. Animation & Stability

- **Transitions**: All interactive components (Accordion, Tab, Button) must have stable layouts. Use `min-h-0` on flex containers to prevent layout "jumps".
- **Fill Mode**: CSS animations must use `forwards` to maintain their final state, especially when components use `forceMount`.
- **Masking**: Use "Smart Fade" masks for truncation instead of abrupt `overflow-hidden` to maintain a premium feel.
