---
name: 'Land of Machala'
colors:
  background: '#131313'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d3c5b0'
  outline: '#9b8f7c'
  outline-variant: '#4f4536'
  primary: '#e8c07a'
  primary-container: '#d4a85c'
  on-primary: '#412d00'
  secondary-container: '#51443a'
  error: '#ffb4ab'
typography:
  font-display: Noto Serif (--font-display)
  font-reading: Newsreader (--font-reading)
  font-interface: Work Sans (--font-interface)
  font-wordmark: wordmark face (--font-wordmark)
radius:
  compact: 0.5rem (--radius-compact)
  control: 0.875rem (--radius-control)
  panel: 1rem (--radius-panel)
spacing:
  gap-stack-sm: clamp(0.5rem → 0.625rem)
  gap-stack-md: clamp(0.75rem → 1rem)
  gap-stack-lg: clamp(1rem → 1.25rem)
  inset-panel: clamp(1.25rem → 2rem)
  inset-control-x: clamp(1rem → 1.25rem)
  inset-control-y: clamp(0.75rem → 1rem)
shadows:
  surface: 0 24px 80px rgba(0,0,0,0.45)
  ring-primary: 0 0 0 1px rgba(232,192,122,0.22)
---

# Design System Document: Sovereign Noir

## Executive Summary

This design system embodies a sophisticated, editorial aesthetic that blends heritage luxury with modern digital utility. Designed for high-end commerce, literary platforms, and a dark fantasy game interface, the system uses a high-contrast dark mode to elevate golden accents and deep, rich earth tones. It should feel premium and atmospheric, but still approachable and usable for in-game flows like authentication, prologue, and character setup.

## Context of Use

This design system powers the interface for Land of Machala. While visual language borrows from luxury editorial design, all UI elements should feel approachable, whimsical, and suitable for game interfaces rather than corporate dashboards.

## Visual Language

### Color Palette

- **Background:** `#131313` (`--color-background`) — foundational dark base.
- **Surface containers:** `#0e0e0e` → `#1c1b1b` → `#201f1f` → `#2a2a2a` (lowest to high) — layered elevation surfaces.
- **On-surface:** `#e5e2e1` — default text on dark.
- **On-surface-variant:** `#d3c5b0` — muted, warm parchment tone for secondary text.
- **Outline:** `#9b8f7c` — borders, dividers.
- **Outline-variant:** `#4f4536` — subtle borders and separator lines.
- **Primary:** `#e8c07a` (`--color-primary`) — main gold accent; calls to action, active states.
- **Primary-container:** `#d4a85c` — pressed or deeper-toned gold.
- **On-primary:** `#412d00` — text on primary-colored backgrounds.
- **Secondary-container:** `#51443a` — warm dark tone for chips, secondary surfaces.
- **Error:** `#ffb4ab` — inline error text and destructive states.

### Typography

The typographic system is built on a literary-first approach:

- **Headlines (Noto Serif):** Authoritative, timeless, used for page and card titles such as "Shape your hero" and "Enter the realm".
- **Body (Newsreader):** For longer lore, descriptions, and helper text.
- **Labels (Work Sans):** For functional UI elements such as form labels, chips, metadata, and small captions.

## Form And Structure

### Roundedness

- `--radius-compact: 0.5rem` — tight controls (small chips, badges, checkboxes).
- `--radius-control: 0.875rem` — form inputs and buttons.
- `--radius-panel: 1rem` — cards, dialogs, sheet surfaces.

### Spacing

- Balance density: not ultra-spacious editorial, not cramped dashboard.
- Keep readable vertical rhythm from heading to body to action.

### Spacing Rules

- `--gap-stack-sm`: clamp(0.5 → 0.625rem) — tight stack between sibling items.
- `--gap-stack-md`: clamp(0.75 → 1rem) — default stack gap.
- `--gap-stack-lg`: clamp(1 → 1.25rem) — loose, sectional gap.
- `--inset-panel`: clamp(1.25 → 2rem) — card / panel inner padding.
- `--inset-control-x`: clamp(1 → 1.25rem) — horizontal input padding.
- `--inset-control-y`: clamp(0.75 → 1rem) — vertical input padding.

All spacing values are clamp-based and responsive; do not substitute raw px values.

## Components

### Buttons

- **Primary button**
  - Background: `--color-primary` (`#e8c07a`).
  - Text: `--color-on-primary` (`#412d00`).
  - Shape: `--radius-control` (0.875rem).
  - Usage: main action per screen such as "ENTER THE REALM", "Confirm hero", "Continue".
- **Secondary button**
  - Background: `--color-secondary-container` (`#51443a`).
  - Text: `--color-on-surface`.
  - Usage: important but non-primary actions.
- **Ghost / text button**
  - No solid background; label in `--color-primary` with underline on hover.
  - Usage: links such as "Back to tutorial", "Forgotten scrolls?", "Guest entry".
- Buttons use `--radius-control`, `--inset-control-x`, `--inset-control-y` for consistent padding.

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

- Background: `--color-surface-container` (`#201f1f`) or adjacent elevation level.
- Corner radius: `--radius-panel` (1rem).
- Shadow: `--shadow-surface` (`0 24px 80px rgba(0,0,0,0.45)`).
- Padding: `--inset-panel` (responsive clamp).
- Cards are the primary container for auth, prologue, and character setup flows.

## Layouts

### Spacing Discipline

- Prefer shared spacing scale values: 2, 3, 4, 6, and 8.
- Use component props when available (`Stack` gap, `Card` gap and padding) instead of ad-hoc utility values.
- Treat `pt-*` as exception utility; prefer parent gap, padding, or layout primitive before adding top-only offsets.
- Keep one-off spacing values for explicit layout breakpoints only (for example split-grid shell balancing).

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
- [screens/gameplay.md](./screens/gameplay.md) owns gameplay shell layout (player panel, narrative log, action rail).

## Token Reference

All live tokens are defined in `src/app/globals.css` under the `@theme` block. That file is the source of truth. Do not derive styling from this doc — use it as a reading guide only.

- CSS shadows: `--shadow-surface`, `--shadow-ring-primary` (`0 0 0 1px rgba(232,192,122,0.22)`).
- Shared backdrop asset: `public/assets/locations/city.jpg`.
- Storybook approval surface: `src/components/features/auth/` and `src/components/ui/core/tokens.stories.tsx`.

## Screen Packet Rule

- For canonical root states, keep one packet: flow note, screen spec, optional static HTML reference, Storybook baseline, runtime component.
- Do not create large speculative screen packs for distant gameplay surfaces until product flow is approved.
