# Design Documentation Map

This subtree owns visual-system docs, root-flow docs, and canonical screen packets.
Use it to scale design references without turning `docs/` root into a flat list of unrelated screen files.

## Ownership

- [system.md](./system.md) owns palette, typography, spacing, components, motion, and shared shell rules.
- [flows/root-screen-flow.md](./flows/root-screen-flow.md) owns canonical root-state sequencing.
- [screens/auth.md](./screens/auth.md) owns sign-in and sign-up packet.
- [screens/origins.md](./screens/origins.md) owns prologue and character-setup packet.
- [screens/TEMPLATE.md](./screens/TEMPLATE.md) is template for future canonical screen families.

Top-level compatibility entry points remain in [../DESIGN.md](../DESIGN.md), [../SCREEN_FLOW.md](../SCREEN_FLOW.md), [../SCREENS_AUTH.md](../SCREENS_AUTH.md), and [../SCREENS_CREATE.md](../SCREENS_CREATE.md) so older links do not break during migration.

## Artifact Chain

1. Start with [system.md](./system.md) plus relevant screen packet.
2. Mirror canonical states in Storybook full-screen review stories.
3. Keep runtime surface under `src/` aligned with packet and Storybook baseline.
4. Treat archived `local/` artifacts as optional background material, not active approval surface.

## Packet Rules

- One packet should own one canonical screen family, not one isolated mock.
- Keep entry, exit, layout, copy tone, Storybook targets, and runtime anchors together.
- Keep one desktop-leaning ASCII plus one short responsive-notes section by default.
- Add separate mobile ASCII only when mobile hierarchy or flow materially diverges from same responsive implementation.
- Prefer updating existing packet when state stays inside same root family.
- Add new packet only when state is near-term and canonical enough to implement.
- Keep distant gameplay ideas out of this subtree until product flow is accepted.

## Archived Artifact Rules

- Keep generated Stitch HTML and other one-off exports under `local/` only as archive material.
- Do not use archived `index*` HTML files as active approval inputs for current auth or origins work.
- Keep repository-level constraints in docs; keep iterative prompt tactics in `local/STITCH_PROMPTS.md` when that workflow restarts.

## Approval Rules

- Storybook is live approval surface for reusable UI and canonical screen baselines.
- Packet docs should name implemented Storybook and runtime anchors once those files exist.
- Storybook stories are current approval surface for auth and origins baselines.
