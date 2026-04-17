# Github Guidance Strategy

This document explains how to reuse the `.github` instruction model across future projects.

## 1. Default Strategy

Maintain one reusable **fullstack Next.js base stack** and let each repository override only what is project-specific.

That means:

- keep a stable shared mental model for architecture, App Router, data or state, testing, and clean code
- override route surface, content privacy, motion policy, styling scale, and product-specific constraints at the repository level

## 2. Reusable Fullstack Base

The following files are good candidates for a common fullstack baseline:

- `copilot-instructions.md`
- `architecture.instructions.md`
- `next-app-router.instructions.md`
- `data-and-state.instructions.md`
- `clean-code.instructions.md`
- `imports.instructions.md`
- `testing.instructions.md`

These should stay mostly generic.

## 3. Project-Level Overrides

The following areas usually need per-project overrides:

- route surface and URL policy
- i18n policy
- styling scale and motion policy
- whether narrative or sensitive content must remain server-first
- auth, persistence, and integration specifics

For Land of Machala, the main override files are:

- `copilot-instructions.md` repository notes
- `design-system.instructions.md`
- `i18n-and-actions.instructions.md`
- selected notes in `data-and-state.instructions.md`

## 4. Land Of Machala As A Seed

Land of Machala is a strong **seed** for future Next.js fullstack work, but it should not become the literal source of truth for every other project.

What to reuse:

- server-first state ownership
- route handlers vs server actions split
- session and persistence defaults
- fullstack validation and testing posture
- layered UI structure

What to override:

- story protection rules
- canonical gameplay route strategy
- motion language
- domain naming and marketing posture

## 5. Lean Marketing-Site Variant

One-pager or brochure-style sites should keep a lighter `.github` stack.

They usually do **not** need:

- `data-and-state.instructions.md`
- large backend and persistence guidance
- full server-session strategy

They usually **do** need:

- architecture
- Next App Router rules if they are Next.js projects
- clean code
- imports
- testing appropriate to the site
- repo-specific styling or animation notes

## 6. Current Recommendation For Existing One-Pager Repos

The existing one-pager repositories are broadly fine as lean variants.

Minimal improvement:

- make it explicit in their repository notes that they intentionally use a lean marketing-site stack and should not automatically inherit fullstack guidance from larger projects

That keeps them simple while preserving a shared mental model.

## 7. Override Precedence

Use this precedence model:

1. repository-specific notes in `copilot-instructions.md`
2. repository-specific instruction files
3. shared base instruction files

This lets a project-specific note override a generic fullstack rule without forcing you to fork the whole stack.