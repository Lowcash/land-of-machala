# Auth Screen Packet

This packet owns both sign-in and sign-up states because they share shell, backdrop, footer, and auth-state switching behavior.

## UX

### Sign in

- Goal: allow players to sign in, try game as guest, or go to registration.
- Primary action: `ENTER THE REALM` with email and secret phrase.
- Secondary actions: `Forgotten scrolls?`, `Continue as guest`, `Create account`.
- Layout: shared responsive auth shell. Wider viewports show lore on left and auth card on right. Narrower viewports place hero intro first, then auth card, then supporting chronicles and stat tiles. Chronicle items and stat tiles should stay visually consistent across both states.
- Sign-in and sign-up use same card placement and baseline card height on wider viewports so shell does not jump when state toggles.
- Footer: version line plus `FAQ`, `MERCHANT LAWS`, and `PRIVACY CODEX`.
- Copy tone: fantasy-flavored but clear.

### Sign up

- Goal: allow players to create new account with minimum friction.
- Primary action: `CREATE ACCOUNT` with hero name, email, secret phrase, and legal acceptance.
- Secondary actions: `Back to sign in`, `Continue as guest`.
- Layout: same responsive shell as sign in, but with registration-specific card content. Narrower viewports follow same top-to-bottom rhythm as sign in: hero intro, auth card, chronicles, stats.
- Footer: same version line and links as sign in.
- Copy tone: fantasy-flavored but clear; users must understand they are creating new account, not signing in.

## References

- Canonical flow: [../flows/root-screen-flow.md](../flows/root-screen-flow.md)
- Design system: [../system.md](../system.md)
- Storybook: [../../src/components/features/auth/root-entry-shell.stories.tsx](../../src/components/features/auth/root-entry-shell.stories.tsx)
- Runtime: [../../src/components/features/auth/root-entry-shell.tsx](../../src/components/features/auth/root-entry-shell.tsx)

## ASCII

Desktop-leaning reference. Shared responsive shell rules below describe narrow viewport behavior.

```text
╔═══════════════════════════════════════════════════════════════════════════╗
║ LAND OF MACHALA                                                           ║
║                                                                           ║
║   Enter world where every step writes your       ┌──────────────────────┐ ║
║   legend.                                        │  Enter the realm     │ ║
║                                                  │  Reconnect with your │ ║
║   Recent Chronicles                              │  legacy              │ ║
║   ╭───────────────────────────────────────────╮  │                      │ ║
║   │ "The Shadow over Machala has receded..."  │  │ EMAIL                │ ║
║   │ 2 HOURS AGO                               │  │ [ traveller@...    ] │ ║
║   ╰───────────────────────────────────────────╯  │ SECRET PHRASE        │ ║
║   ╭───────────────────────────────────────────╮  │ [ ••••••••         ] │ ║
║   │ "Reconstruction of Silver Gate begins..." │  │ ☒ Remember spirit    │ ║
║   │ YESTERDAY                                 │  │ [ ENTER REALM      ] │ ║
║   ╰───────────────────────────────────────────╯  │                      │ ║
║                                                  │  or explore as       │ ║
║   ┌────────────------──┐ ┌────────------──────┐  │  Create account      │ ║
║   │ 12,401             │ │ 84                 │  │  Continue as guest   │ ║
║   │ Active Souls       │ │ Realms Found       │  └──────────────────────┘ ║
║   └────────────------──┘ └──────────────------┘                           ║
║   ┌─────────────------─┐ ┌──────────────------┐                           ║
║   │ 3.2K               │ │ 512                │                           ║
║   │ Daily Quests       │ │ Merchants          │                           ║
║   └─────────────------─┘ └──────────────------┘                           ║
║                                                                           ║
║                           ─────────────────────                           ║
║                    Verze 0.1.0 • © 2026 Land of Machala                   ║
║                     FAQ • MERCHANT LAWS • PRIVACY CODEX                   ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

```text
╔═══════════════════════════════════════════════════════════════════════════╗
║ LAND OF MACHALA                                                           ║
║                                                                           ║
║   Enter world where every step writes your       ┌──────────────────────┐ ║
║   legend.                                        │ Create your account  │ ║
║                                                  │ Begin your chronicle │ ║
║   Recent Chronicles                              │                      │ ║
║   ╭───────────────────────────────────────────╮  │ HERO NAME            │ ║
║   │ "The Shadow over Machala has receded..."  │  │ [ Ardyn Vale       ] │ ║
║   │ 2 HOURS AGO                               │  │ EMAIL                │ ║
║   ╰───────────────────────────────────────────╯  │ [ traveller@...    ] │ ║
║   ╭───────────────────────────────────────────╮  │ SECRET PHRASE        │ ║
║   │ "Reconstruction of Silver Gate begins..." │  │ [ ••••••••         ] │ ║
║   │ YESTERDAY                                 │  │ ☒ Merchant Laws...   │ ║
║   ╰───────────────────────────────────────────╯  │ [ CREATE ACCOUNT   ] │ ║
║                                                  │ Back to sign in      │ ║
║   ┌─────────────------─┐ ┌────────────------──┐  │ Guest entry          │ ║
║   │ 12,401             │ │ 84                 │  └──────────────────────┘ ║
║   │ Active Souls.      │ │ Realms Found       │                           ║
║   └─────────────------─┘ └──────────────------┘                           ║
║   ┌─────────────------─┐ ┌──────────────------┐                           ║
║   │ 3.2K               │ │ 512                │                           ║
║   │ Daily Quests       │ │ Merchants          │                           ║
║   └─────────────------─┘ └──────────────------┘                           ║
║                                                                           ║
║                           ─────────────────────                           ║
║                    Verze 0.1.0 • © 2026 Land of Machala                   ║
║                     FAQ • MERCHANT LAWS • PRIVACY CODEX                   ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

## Flow

- From Sign in:
  - `ENTER THE REALM` -> valid prototype submit -> inline continuation note on `/`.
  - `Forgotten scrolls?` -> password reset flow.
  - `Continue as guest` -> origins prologue state on `/`.
  - `Create account` -> switch to sign-up state on `/`.
- From Sign up:
  - `CREATE ACCOUNT` -> successful signup -> origins prologue state on `/`.
  - `Back to sign in` -> switch back to sign-in state on `/`.
  - `Continue as guest` -> origins prologue state on `/`.

## Responsive Notes

- Keep one responsive shell for both `SignIn` and `SignUp`; do not fork separate mobile-only implementation paths.
- On narrow viewports, order is intro headline, auth card, chronicles, then stats.
- On tablet widths, auth and context sections stay full-width in one column; desktop split starts later.
- Chronicles render as stacked accent items below card.
- Realm stats stay in simple two-column grid under chronicles.
- Header stays clean without horizontal rule.
- Sign-in and sign-up cards keep same outer placement; form content changes inside stable shell.
- Password label row stacks cleanly on narrow widths instead of forcing awkward wrap.
- Footer stays centered with wide divider above copy instead of full-width line.
- Avoid repeating hero intro sentence inside sign-in card body; sign-in card uses shorter supporting copy.

## Approval Notes

- `SignIn` and `SignUp` approval states now live in [../../src/components/features/auth/root-entry-shell.stories.tsx](../../src/components/features/auth/root-entry-shell.stories.tsx).
- Keep both auth states in same packet because they share shell, footer, background, and state switching behavior.
- Future auth refinements should update packet, Storybook state, and runtime surface together.
