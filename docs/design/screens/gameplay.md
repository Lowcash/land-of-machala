# Gameplay Screen Packet

This packet owns the main gameplay view that a player sees after entering the realm. All in-game states that share the same three-zone layout (player panel, narrative area, action strip) live here.

## Scope

- **Feature name:** Gameplay
- **States covered:** Exploration, Combat encounter
- **Why together:** All states share shell structure: top player panels, centre narrative scroll, bottom action strip. Content inside each zone changes per state; shell and layout stay stable.

## References

- Canonical flow: [../flows/root-screen-flow.md](../flows/root-screen-flow.md) — gameplay continues after character setup
- Design system: [../system.md](../system.md)
- Storybook anchors: `src/components/features/game/` (not yet created)
- Runtime anchors: `src/components/features/game/` (not yet created)
- v1 reference: `land-of-machala-v1/src/components/features/game/character-box.tsx`
- v2 reference: `land-of-machala-v2/components/features/Game/Dashboard/CharacterBox.tsx`

## Layout Zones

Three vertical zones. Player panel is **not** full-width — it is a compact card, not a spanning header. Multiple panels fit side-by-side in combat (player + enemy).

```text
╔═══════════════════════════════════════════════════════════════╗
║  ┌───────────────────────┐  ┌───────────────────────┐        ║
║  │  [PLAYER PANEL]       │  │  [ENEMY PANEL]        │        ║
║  │  portrait name vitals │  │  portrait name vitals │        ║
║  │  stats strip          │  │  stats strip          │        ║
║  └───────────────────────┘  └───────────────────────┘        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  [NARRATIVE / CONTENT AREA]                                   ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐  ║
║  │  ACTION A   │  │  ACTION B   │  │  secondary actions   │  ║
║  └─────────────┘  └─────────────┘  └──────────────────────┘  ║
╚═══════════════════════════════════════════════════════════════╝
```

- **Player panel**: compact card, not full-width. Portrait thumbnail, name, HP/mana vitals bars, compact stat strip (STR / INT / AGI / STA). Mirrors v1 `CharacterBox` with `compact` prop pattern on narrow viewports.
- **Enemy panel**: same structure as player panel; only visible in combat state. Sits beside player panel, not below it.
- **Narrative area**: scrollable centre zone. Location prose (Exploration) or combat log entries (Combat). `font-reading`, `text-on-surface`, `max-w ~65ch` centred.
- **Action strip**: bottom, two-column layout. Left column: 1–2 primary actions (`Button` default). Right column: 1–3 secondary/ghost actions (`Button variant="ghost"`). Never wraps off-screen; labels never truncate.

## CharacterBox Panel Design

Based on v1 `CharacterBox` component pattern:

```text
┌────────────────────────────────────┐
│ [portrait]  Name Lv.5              │
│             ████████░ HP  80/100   │
│             ████░░░░░ MP  40/60    │
│             ░░░░▓▓░░░ XP 1.2k/3k  │
├────────────────────────────────────┤
│  STR 10   INT 12   AGI 13  STA 11  │
└────────────────────────────────────┘
```

- Card uses `tone="surface"`, `border`, `radius="panel"` from design system primitives
- Portrait: small thumbnail with level badge overlay (v1 `Portrait size="avatar-sm"` at narrow, `size="avatar"` at md+)
- Vitals bars: HP / mana / XP; XP hidden for enemies
- Stats strip: horizontal row below divider, 4 stats, icon + value, `font-interface text-xs`
- `compact` prop collapses portrait + single-line vitals for very narrow (< 360px)

## State 1 — Exploration

### UX

- Goal: let player read current location flavour text and choose next move.
- Primary action: move to connected location or enter point of interest.
- Secondary actions: rest (if available), character sheet, inventory.
- Layout: one player panel top-left; narrative area centre with location name + lore paragraph + event bullet list; action strip bottom two-column.
- Copy tone: literary, atmospheric.

### ASCII

```text
╔═══════════════════════════════════════════════════════════════╗
║  ┌─────────────────────────────────────┐                      ║
║  │ [img] Ardyn Vale  Lv.5              │                      ║
║  │       ████████░░ HP  80/100         │                      ║
║  │       ████░░░░░░ MP  40/60          │                      ║
║  │       ░░▓▓░░░░░░ XP  1.2k/3k       │                      ║
║  ├─────────────────────────────────────┤                      ║
║  │  STR 10   INT 12   AGI 13   STA 11  │                      ║
║  └─────────────────────────────────────┘                      ║
╠═══════════════════════════════════════════════════════════════╣
║  SILVER GATE DISTRICT                                         ║
║                                                               ║
║  The morning fog has lifted. Reconstruction crews line        ║
║  the cobblestones near the old gate...                        ║
║                                                               ║
║  • A cloaked figure watches from the alley.                   ║
║  • Merchants have stalls along the east wall.                 ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║  ┌──────────────────┐  ┌──────────────────────────────────┐  ║
║  │  MOVE EAST       │  │  CHARACTER    INVENTORY   REST   │  ║
║  │  SPEAK TO FIGURE │  │                                  │  ║
║  └──────────────────┘  └──────────────────────────────────┘  ║
╚═══════════════════════════════════════════════════════════════╝
```

## State 2 — Combat

### UX

- Goal: resolve fight through sequential action selection.
- Primary actions: attack, spell, item.
- Secondary actions: flee (when available).
- Layout: player panel left + enemy panel right side-by-side; narrative area shows combat log; action strip bottom two-column with combat verbs left, utility right.
- Copy tone: terse, kinetic.

### ASCII

```text
╔═══════════════════════════════════════════════════════════════╗
║  ┌────────────────────┐   ┌────────────────────┐             ║
║  │ Ardyn Vale  Lv.5   │   │ Enraged Skeleton 8 │             ║
║  │ ████░░░░ HP 62/100 │   │ ██████████ HP 120  │             ║
║  │ ████░░░░ MP  40/60 │   │                    │             ║
║  ├────────────────────┤   ├────────────────────┤             ║
║  │ STR 10  INT 12 ... │   │ STR 18  STA 14 ... │             ║
║  └────────────────────┘   └────────────────────┘             ║
╠═══════════════════════════════════════════════════════════════╣
║  COMBAT                                                       ║
║                                                               ║
║  You draw your blade. The skeleton charges.                   ║
║  ─────────────────────────────────────────────────────────    ║
║  Round 1 — You strike for 14 damage.                          ║
║  Round 1 — Skeleton retaliates for 8 damage.                  ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║  ┌──────────────────┐  ┌──────────────────────────────────┐  ║
║  │  STRIKE          │  │  USE ITEM              FLEE      │  ║
║  │  SWIFT SHOT      │  │                                  │  ║
║  └──────────────────┘  └──────────────────────────────────┘  ║
╚═══════════════════════════════════════════════════════════════╝
```

## Flow

- Character setup confirm → exploration state.
- Exploration: move action → new location; encounter trigger → combat state.
- Combat: victory → back to exploration; defeat → TBD.

## Data Ownership

- Location data, narrative text, event list: server-rendered. Client receives hydrated markup only.
- Player vitals (HP, MP, XP): session-scoped client state, seeded from server on route entry, mutated via server actions after each event.
- Combat state (round, enemy vitals, action list): client state driven by server action responses.
- Action list: derived server-side, rendered client-side. Client does not compute availability.

## SSR and Performance Notes

- Gameplay shell is server component. Narrative content server-rendered per location.
- Player panel and action strip are client components (session-state-bound); no data fetching inside.
- Mutations use server actions returning updated state directly; no page-level revalidation.
- Images use `next/image` with `sizes` + lazy loading; player portrait may use `priority` if above fold.
- Combat log: cap visible window or virtualize if list grows long.

## Approval Notes

- Planning-phase; no Storybook approval state exists yet.
- Before implementation: create `src/components/features/game/` folder, build `PlayerPanel` component mirroring v1 `CharacterBox`, add story as approval surface.
- Keep panel, narrative, and action strip as three separate components. Do not merge.
- Shell = server wrapper; interactive children = client leaves with `use client`.

## Component Boundary Plan

```
src/components/features/game/
  player-panel.tsx      ← client, CharacterBox-style, compact/full responsive
  enemy-panel.tsx       ← client, same as player-panel but enemy variant
  narrative-log.tsx     ← server (exploration), client scroll (combat log)
  action-strip.tsx      ← client, two-column, contextual per state
  gameplay-shell.tsx    ← server wrapper composing all three zones
```
