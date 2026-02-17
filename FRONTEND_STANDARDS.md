# Frontend Standards - The Path of Machala

This document outlines the architectural "soul" and coding standards for the Land of Machala frontend.

## The Rule of Zero

We follow the **Rule of Zero** for ad-hoc styling. 
- **Zero `className` overrides** in feature components unless absolutely necessary for layout.
- **Zero magic numbers** in spacing or colors. Use tokens exclusively.
- **Zero ad-hoc animations**. Use standardized core animation components or prefabs.

## Typography Architecture

We use a two-tier typography system to ensure consistency and prevent "font-drift".

### 1. Core Variants (`core/typography.tsx`)
Low-level building blocks that define the technical properties (size, weight, font-family).
- `lead`: High-impact introductory text.
- `fantasy-value`: Tracking-wide fantasy numbers.
- `decoration`: Uppercase tracking-wide labels.
- `detail`: Italicized small body text.
- `tiny`: Extreme information density.

### 2. Semantic Prefabs (`prefabs/typography/shared.tsx`)
High-level components that convey **intent** and **meaning**.
- `Label`: Standard field labels.
- `Legend`: Supporting context or footnotes.
- `Value`: Formatted data display.

## Visual Hierarchy & State

- **Cards**: Use the `subtle` variant by default for containers. Reserve `primary` (Gold) for interactive focus or active selections.
- **Buttons**: Use `choice` for secondary options and `primary` for the "Golden Path" (the main action the user should take).
- **Icons**: Use `IconProps` to pass semantic colors (`primary`, `success`, `hp`, etc.) instead of manual tailwind color classes.

## Animation & Stability

- **Transitions**: All interactive components (Accordion, Tab, Button) must have stable layouts. Use `min-h-0` on flex containers to prevent layout "jumps".
- **Fill Mode**: CSS animations must use `forwards` to maintain their final state, especially when components use `forceMount`.
- **Masking**: Use "Smart Fade" masks for truncation instead of abrupt `overflow-hidden` to maintain a premium feel.
