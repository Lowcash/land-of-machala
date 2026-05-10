# Project AGENTS

Use this file as primary Codex guidance for this repository. Keep root rules portable enough to copy into another project as baseline. Put only subtree-specific rules into nested `AGENTS.md`.

## Source Priority

- Trust current repository state first: `package.json`, source files, tests, Storybook files, and active docs.
- When sources disagree, prefer:
  1. executable code and `package.json`
  2. active tests and Storybook stories
  3. current docs
  4. older planning prose
- Distinguish implemented code from target-state docs. If a document describes future backend, routing, or tooling that does not exist in tree, treat it as direction, not implementation truth.

## Workflow

- Inspect tree before making architectural assumptions.
- Keep changes scoped. Do not mix unrelated cleanup into task.
- Preserve user work in dirty tree. Never revert or overwrite unrelated edits.
- When moving or renaming public UI surfaces, update code, docs, stories, and tests in same change.
- Match existing formatting. Prefer formatting touched files, not whole repo.
- Trust actual tool surface from `package.json`. Do not assume repo has validation or runtime layers that are not installed.
- Use compact conventional commits by default, for example `feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`, or `chore: ...`.
- Prefer one atomic commit per coherent change.

## Nested AGENTS

- Add nested `AGENTS.md` only when a subtree has rules that are meaningfully different from root.
- Use nested files for local delta only. Do not duplicate root guidance verbatim.
- If you copy guidance to another project, start with this root file only. Bring nested files over only when that new project has equivalent local constraints.
- Good reasons for nested files:
  - current runtime constraints unique to `src/`
  - generated or integration-heavy areas with different workflows

## Architecture And Ownership

- Keep route files thin and server-first.
- Keep route pages focused on composition, metadata, redirects, and server-derived data.
- Add `'use client'` only where interactivity, browser APIs, or local client state require it.
- Keep client components as leaf nodes when possible.
- Special route files such as `layout.tsx`, `template.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, and route handlers belong under `src/app/**` only.
- Keep ownership boundaries explicit:
  - `src/app/`: routes, metadata, document shell, server-first composition
  - `src/components/features/`: feature flow orchestration
  - `src/components/ui/core/`: primitives and low-level variants
  - `src/components/ui/forms/`: reusable form controls and field composition
  - `src/components/ui/prefabs/`: semantic composed UI blocks
  - `src/lib/`: typed helpers, validation, shaping, domain seams
- Move repeated behavior downward into stable reusable layer instead of copying upward into features.

## Imports And Code Style

- Use `@/` imports across directories and layers inside `src/`.
- Use relative imports for same-folder or tightly local siblings.
- Keep imports aligned with ownership boundaries. Do not deep-import internals from unrelated features.
- Prefer explicit types over `any`.
- Fail fast on missing prerequisites or invalid inputs.
- Use named constants for reusable literals and thresholds instead of scattering magic numbers.
- Distinguish code-level constants from user- or environment-controlled configuration.
- Keep functions and components focused. Extract when responsibilities split.
- Remove dead code, stale comments, and temporary diagnostics.
- Comments should explain intent or tradeoff, not restate syntax.

## UI, Layout, And Styling

- Prefer semantic design tokens over repeated arbitrary values.
- If width, gap, padding, radius, color, or shadow value repeats or has semantic meaning, define it in token layer instead of scattering raw values.
- Do not create token for every one-off layout formula. Local structural values may stay local when they are not reusable.
- Keep global token entrypoint readable. If styling grows materially, split style modules while keeping one obvious import path from root layout.
- `ui/core` owns primitive styling decisions. `ui/prefabs` owns semantic repeated presentation. Features should mostly compose, not restyle from scratch.
- Keep layout responsibility clear. Do not blur reusable building blocks with feature-specific shells.
- Avoid broad escape hatches on primitives unless there is a clear extension need.
- When spacing, layout, or typography changes affect user-facing composition, add or update nearest useful visual regression or story coverage available in repo.

## Data, State, And Backend

- Prefer server-owned data by default.
- Choose state by ownership order:
  1. server data first
  2. nearest useful local client state
  3. URL or route state for shareable navigation state
  4. providers only for genuinely shared cross-subtree client state
- Do not default to external client state or client cache libraries.
- Use server actions for UI-coupled mutations and route handlers for public HTTP endpoints, uploads, streaming, webhooks, or third-party callbacks.
- Do not scaffold backend layers or persistence tooling only because docs mention future direction. Add them only when task introduces real server ownership.
- Validate mutation inputs at boundaries.
- Never trust client input or entitlement checks for authoritative state.

## I18n And Content

- Keep locale ownership centralized.
- Keep request locale and message loading focused in repo-local i18n helpers.
- Prefer server-first translation loading and pass only needed strings into client components.
- Avoid exposing large message trees to client components without reason.
- If repo has locale-aware navigation wrappers, use them consistently instead of scattering raw navigation helpers through translated flows.

## Testing And Validation

- Default checks for meaningful code changes: run repo-local lint, typecheck, and test commands from `package.json`.
- Reusable UI work should keep Storybook healthy when Storybook is part of repo.
- Keep tests close to code they validate.
- Favor behavior-oriented tests over broad snapshots, but use visual or story-driven coverage when layout regression risk is main concern.
- Keep test setups deterministic and mock external side effects when real integration is not needed.
- When fixing bug, add or update nearest useful automated check when practical.
- Trust `package.json` script surface over README if they disagree.

## Documentation

- Update existing docs before creating new top-level architecture files.
- Keep architecture docs, design packets, Storybook anchors, and runtime file paths in sync.
- Clearly separate “current implementation” from “target direction” in docs.
- Keep archived or generated reference artifacts as background material, not active source of truth.
