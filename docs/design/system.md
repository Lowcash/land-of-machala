---
name: 'Land of Machala'
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d3c5b0'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9b8f7c'
  outline-variant: '#4f4536'
  surface-tint: '#f5be4f'
  primary: '#ffcd6b'
  on-primary: '#412d00'
  primary-container: '#e5b042'
  on-primary-container: '#604400'
  inverse-primary: '#7b5800'
  secondary: '#d5c3b5'
  on-secondary: '#392e25'
  secondary-container: '#51443a'
  on-secondary-container: '#c3b2a5'
  tertiary: '#ffc7bd'
  on-tertiary: '#640c04'
  tertiary-container: '#ff9f8e'
  on-tertiary-container: '#872619'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#f5be4f'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5d4200'
  secondary-fixed: '#f2dfd1'
  secondary-fixed-dim: '#d5c3b5'
  on-secondary-fixed: '#231a11'
  on-secondary-fixed-variant: '#51443a'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a7'
  on-tertiary-fixed: '#400200'
  on-tertiary-fixed-variant: '#842417'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  body-md:
    fontFamily: Newsreader
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  card-padding-v: 32px
  card-padding-h: 24px
  gutter: 16px
---

# Design System Document: Sovereign Noir

## Executive Summary

This design system embodies a sophisticated, editorial aesthetic that blends heritage luxury with modern digital utility. Designed for high-end commerce, literary platforms, and a dark fantasy game interface, the system uses a high-contrast dark mode to elevate golden accents and deep, rich earth tones. It should feel premium and atmospheric, but still approachable and usable for in-game flows like authentication, prologue, and character setup.

## Context of Use

This design system powers the interface for Land of Machala. While visual language borrows from luxury editorial design, all UI elements should feel approachable, whimsical, and suitable for game interfaces rather than corporate dashboards.

## Visual Language

### Color Palette

- **Primary (Gold):** #E5B042 — Used for high-priority calls to action and brand-defining accents.
- **Secondary (Deep Ebony):** #2B2118 — A warm, dark base for cards and elevated surfaces.
- **Tertiary (Oxblood):** #8C2A1C — Reserved for highlights, badges, and decorative depth.
- **Neutral (Midnight):** #121212 — Foundational background color, ensuring maximum depth and focus.

### Typography

The typographic system is built on a literary-first approach:

- **Headlines (Noto Serif):** Authoritative, timeless, used for page and card titles such as "Shape your hero" and "Enter the realm".
- **Body (Newsreader):** For longer lore, descriptions, and helper text.
- **Labels (Work Sans):** For functional UI elements such as form labels, chips, metadata, and small captions.

## Form And Structure

### Roundedness

- Use subtle corner rounding, roughly 6-8 px.
- Keep formal posture without looking sharp or sterile.

### Spacing

- Balance density: not ultra-spacious editorial, not cramped dashboard.
- Keep readable vertical rhythm from heading to body to action.

### Spacing Rules

- Heading to body copy: medium vertical spacing.
- Body copy to questions or interactive elements: small to medium spacing.
- Between tutorial choice cards: consistent medium spacing with equal widths.
- Between stacked buttons: small spacing so actions still read as one group.
- Primary card padding: comfortable vertical padding with slightly reduced horizontal padding.

## Components

### Buttons

- **Primary button**
  - Background: Primary Gold (#E5B042).
  - Text: light or dark neutral, high contrast.
  - Shape: same radius family as cards.
  - Usage: main action per screen such as "ENTER THE REALM", "Confirm hero", or "Continue".
- **Secondary button**
  - Background: Secondary Deep Ebony (#2B2118).
  - Text: Primary Gold.
  - Usage: important but not primary actions.
- **Text or ghost button**
  - No solid background, only text in Primary Gold with optional subtle underline on hover.
  - Usage: links such as "Back to tutorial", "Forgotten scrolls?", and "Guest entry".
- Buttons should use consistent padding and typography across screens.

### Form Elements

- **Inputs**
  - Full width within their column.
  - Slightly lighter background than card or subtle border.
  - Radius matches button radius.
  - Focus state uses gold border or glow.
- **Labels**
  - Work Sans, small size, clear hierarchy above field.
- **Helper text**
  - Smaller size, muted color, placed under field.
- **Checkboxes**
  - Simple square with same radius system and Primary Gold checkmark.

### Cards

- Background: Secondary Deep Ebony (#2B2118) or nearby dark surface.
- Corner radius: consistent with buttons.
- Shadow: minimal, enough to separate from background.
- Padding: medium vertical, slightly reduced horizontal padding for compact look.
- Cards are primary container for auth, prologue, and character setup flows.

## Layouts

### Auth Screen (Login / Register / Guest)

- **Background**
  - Uses main Land of Machala city illustration and should stay consistent across auth variants.
- **Shared layout**
  - Two columns on wider viewports:
    - Left: lore and world-building.
    - Right: single auth card.
  - Collapses naturally to one column on smaller viewports.
  - On smaller viewports, auth card should appear first and supporting chronicles or stat blocks should stack below it.
  - Login and register should share same responsive shell and differ mainly by card content.
- **Auth card**
  - No full-width header bar.
  - Card heading examples: "Enter the realm", "Create your account".
  - Fields: 2-4 max.
  - Actions: primary submit plus text links for password reset, guest entry, and auth-state switching.
- **Footer**
  - Centered text: `Verze 0.1.0 • © 2026 Land of Machala`.
  - Use a short centered divider above footer copy rather than a full-width rule.
  - Under it, subtle links: `FAQ • MERCHANT LAWS • PRIVACY CODEX`.

### Prologue Screen

- **Background**
  - Same city illustration and atmosphere as auth screen.
- **Layout**
  - Single centered card on top of background.
  - Optional small chip label such as `Prologue`.
  - Heading that explains current action.
  - Short intro text.
  - Short centered divider below intro block.
  - Question with three equal choice cards.
  - Bottom of card: centered primary button `Continue`, text link `Skip the prologue` below it.

### Character Setup Screen

- **Background**
  - Same city illustration as auth and prologue.
- **Layout**
  - Single centered card on top of background.
  - Top of card:
    - Optional label chip `Character setup`.
    - Heading: `Shape your hero`.
    - Short subtext: `Review race, class and name.`
  - Main content on desktop:
    - Three equal columns for Race, Class, and Name.
  - Under three columns:
    - Small button with dice icon labeled `Roll a random hero`.
  - Bottom of card:
    - Left: `Back to prologue` text link.
    - Right: `Confirm hero` primary button.

## Interaction And Motion

- Hover states
  - Primary buttons: slightly lighter gold background.
  - Text buttons: no solid background; use underline or subtle color shift on hover and focus.
- Focus states
  - Inputs: gold border glow or outline.
  - Buttons: visible focus outline or subtle glow.
- Transitions
  - Keep initial render clean and stable for now; avoid slide-in or translate-based entry motion.
  - State changes may use subtle opacity or color changes later, but motion is not approval target for current slice.
- Error states
  - Show inline error text under invalid field in warm red tone.
  - Do not shake card.
- Loading
  - Disable primary buttons while submitting and show subtle loading indicator such as `Entering...` or `Creating...`.

## Background And Illustration Rules

- Main city background should remain consistent across auth, prologue, and character setup screens.
- When creating new states, change cards and UI on top of illustration, not illustration itself.
- New UI states should follow same palette, typography, and component rules unless product explicitly chooses otherwise.

## Interaction Principles

- **High Contrast:** Interactive elements must stand out clearly against dark background, mostly through gold accents.
- **Refinement:** Borders and shadows stay subtle; hierarchy comes primarily from typography, spacing, and color.
- **Clarity:** Buttons and links should clearly state next step even in lore-rich context.
- **Consistency:** Cards, labels, buttons, and fields should behave same way across auth and origins surfaces.

## Reference Workflow

- [README.md](./README.md) owns design-doc map and packet rules.
- [flows/root-screen-flow.md](./flows/root-screen-flow.md) owns canonical root-state sequencing.
- [screens/auth.md](./screens/auth.md) and [screens/origins.md](./screens/origins.md) own per-screen UX notes and ASCII layout intent.
- Shared backdrop asset lives at `public/assets/locations/city.jpg`.
- Storybook is approval surface for live baselines. Current root-state story anchors live under `src/components/features/auth/`.

## Screen Packet Rule

- For canonical root states, keep one packet: flow note, screen spec, optional static HTML reference, Storybook baseline, runtime component.
- Do not create large speculative screen packs for distant gameplay surfaces until product flow is approved.
