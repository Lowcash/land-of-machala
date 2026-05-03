# Origins Screen Packet

This packet owns origins flow after auth. Feature name stays `Origins`; player-facing step labels are `Prologue` and `Setup`.

## Scope

- `Prologue` covers short narrative questions that shape starting hero.
- `Setup` covers race, class, and hero name confirmation.
- Both states share backdrop, footer, and overall shell posture with auth surfaces.

## References

- Canonical flow: [../flows/root-screen-flow.md](../flows/root-screen-flow.md)
- Design system: [../system.md](../system.md)
- Storybook: [../../src/components/features/auth/origins/origins.stories.tsx](../../src/components/features/auth/origins/origins.stories.tsx)
- Runtime: [../../src/components/features/auth/origins/view.tsx](../../src/components/features/auth/origins/view.tsx), [../../src/components/features/auth/origins/step-tutorial.tsx](../../src/components/features/auth/origins/step-tutorial.tsx), and [../../src/components/features/auth/origins/step-creation.tsx](../../src/components/features/auth/origins/step-creation.tsx)

## Prologue

### UX

- Goal: ask 1-3 short questions to shape player's starting hero.
- Primary action: continue to next question or character setup.
- Secondary actions: skip prologue, back to previous step when flow becomes multi-step.
- Layout: single centered compact card over same Machala city background; choices stay in one vertical list with tight vertical rhythm.
- Top of card: small `Prologue` overline label, heading block, and short centered divider.
- Bottom of card: centered `Continue` button with `Skip the prologue` link below it.
- Footer: same version line and links as auth.
- Copy tone: short, clear questions; lore lives inside option descriptions.

### ASCII

```text
╔═══════════════════════════════════════════════════════════════════════════╗
║ LAND OF MACHALA                                                           ║
║                                                                           ║
║                   ┌──────────────────────────────────────┐                ║
║                   │              PROLOGUE                │                ║
║                   │          Shape your journey          │                ║
║                   │ Choose one answer for your opening   │                ║
║                   │                 ─────                │                ║
║                   │ Where do you come from?              │                ║
║                   │                                      │                ║
║                   │ A) Forests and wild paths            │                ║
║                   │    Born beneath ancient trees        │                ║
║                   │                                      │                ║
║                   │ B) Bustling city streets             │                ║
║                   │    Raised among merchants            │                ║
║                   │                                      │                ║
║                   │ C) Mountain strongholds              │                ║
║                   │    Forged in stone and fire          │                ║
║                   │                                      │                ║
║                   │              CONTINUE                │                ║
║                   │         Skip the prologue            │                ║
║                   └──────────────────────────────────────┘                ║
║                                                                           ║
║                    Verze 0.1.0 • © 2026 Land of Machala                   ║
║                     FAQ • MERCHANT LAWS • PRIVACY CODEX                   ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

Desktop-leaning reference. Responsive notes below capture same layout on narrow viewports.

## Character Setup

### UX

- Goal: confirm race, class, and name before entering realm.
- Primary action: `Confirm hero`.
- Secondary actions: `Roll a random hero`, `Back to prologue` when branch stays visible.
- Layout: same centered-card shell over Machala background with tighter spacing between title, selectors, and footer actions.
- Top of card: optional `Setup` overline label, heading `Shape your hero`, short review copy.
- Main content on desktop: one row with three equal columns for race, class, and name.
- Under main content: small dice or randomize action.
- Footer actions: back link on left, primary confirmation on right.

### ASCII

```text
╔═══════════════════════════════════════════════════════════════════════════╗
║ LAND OF MACHALA                                                           ║
║                                                                           ║
║               ┌────────────────────────────────────────────┐              ║
║               │                SETUP                       │              ║
║               │             Shape your hero                │              ║
║               │ Review race, class and name.              │              ║
║               │                 ─────                      │              ║
║               │  RACE      │ CLASS      │ HERO NAME        │              ║
║               │  Human     │ Ranger     │ Ardyn Vale       │              ║
║               │  Lore text │ Lore text  │ Input            │              ║
║               │                                            │              ║
║               │             Roll random hero               │              ║
║               │                                            │              ║
║               │ Back to prologue     CONFIRM HERO          │              ║
║               └────────────────────────────────────────────┘              ║
║                                                                           ║
║                    Verze 0.1.0 • © 2026 Land of Machala                   ║
║                     FAQ • MERCHANT LAWS • PRIVACY CODEX                   ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

## Flow

- Guest entry or successful signup -> `Prologue` on `/`.
- Answer current question -> next prologue step or `Character setup`.
- Skip prologue -> `Character setup`.
- Confirm hero -> entry state with completion note on `/`.
- Back action -> previous prologue step when multi-step flow exists.

## Responsive Notes

- Keep one responsive implementation for both `Prologue` and `Character setup`.
- Narrower viewports should preserve same order of content, not invent different state structure.
- `Prologue` keeps overline label, centered divider, centered primary action, and skip link below.
- Prologue choices stay in one vertical list; they do not switch to side-by-side tiles.
- Footer remains centered without decorative divider line.
- Keep prose short in prologue intro so card stays compact and does not feel over-wide.
- Keep top and bottom spacing balanced: no oversized dead zones above prompt or below actions.

## Approval Notes

- Storybook origins states are current approval surface for prologue and character setup.
- If future origins visuals split between prologue and character setup, keep them in this packet unless packet becomes too large to reason about.
- Do not reintroduce `Create` as separate packet name; use `Origins` for feature family and `Character setup` for actual step label.
