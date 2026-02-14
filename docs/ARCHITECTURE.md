# Land of Machala Technical Architecture

This document provides a high-level overview of the project's architecture, design system, and development patterns.

## 1. Design System Philosophy: The Prefab Pattern
Instead of raw HTML or ad-hoc Tailwind classes, Land of Machala uses a hierarchical component system:

- **Core Components (`src/components/ui/core`)**: Atomic primitives (Button, Badge, Card, Stack) that form the building blocks.
- **Form Components (`src/components/ui/forms`)**: Standardized inputs, checkboxes, and labels with consistent validation styles.
- **Prefabs (`src/components/ui/prefabs`)**: Reusable UI patterns that combine multiple core components (e.g., `BrandedHero`, `StatusIcon`).
- **Features (`src/components/features`)**: Complex, state-managed modules that implement specific game mechanics (e.g., `Auth`, `Onboarding`).

## 2. Styling & Theming
The project uses **Tailwind CSS 4+** with a focus on CSS variables for maximum flexibility.

- **Variables**: Uses the `(--color-...)` syntax for all design tokens (Gold, Ivory, Secondary, etc.).
- **Typography**: Strictly uses typography prefabs (`Text`, `Heading`, `MutedText`) to ensure visual consistency.
- **Interactive Feedback**: All interactive elements (Buttons, Links, Accordion Triggers) must include clear hover states and `cursor-pointer`.
- **No `className` Prop**: Core UI components and Storybook examples should avoid the `className` prop to enforce the use of defined variants and prefabs.

## 3. Tech Stack
- **Framework**: Next.js 15+ (App Router).
- **Styling**: Tailwind CSS 4+.
- **Icons**: Lucide React.
- **Animations**: Framer Motion.
- **I18n**: next-intl.
- **Testing**: Vitest + Storybook.

## 4. Development Workflow
1. **Design in Storybook**: Build and test components in isolation.
2. **Implement Feature**: Compose prefabs and core components into features.
3. **Verify Compliance**: Run linting and tests to ensure adherence to standards.

## 5. Folder Structure Details
- **`src/app`**: Next.js App Router. Unified layout and routing.
- **`src/components/features`**: High-level feature modules (e.g., `Auth`, `Onboarding`). Contains logic, views, and specific components.
- **`src/components/ui`**:
  - **`core`**: Atomic design primitives (Button, Badge, Card, Stack).
  - **`forms`**: Standardized form elements and input groups.
  - **`prefabs`**: Reusable UI patterns (e.g., `BrandedHero`, `StatusIcon`).
- **`src/hooks`**: Custom React hooks for logic and state.
- **`src/i18n`**: Internationalization configuration and translations.

## 6. Developer Onboarding
- **Environment Setup**: Run `npm install` and `npm run dev`.
- **Storybook First**: Always develop and test new UI components in Storybook (`npm run storybook`) before integrating into features.
- **Pattern Compliance**: Follow the "no className" policy for core UI components. Use typography prefabs instead of raw text tags.
- **Linting**: Run `npm run lint` frequently to ensure style compliance.
