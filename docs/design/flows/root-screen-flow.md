# Root Screen Flow

This file owns canonical root-state sequencing for current Land of Machala frontend slice.
Use it to keep design packets, Storybook, and runtime aligned.

## Route Rule

- `/` is canonical product surface for current slice.
- Login, registration, prologue, and character setup are root states, not separate public routes.

## Canonical States

### 1. Sign in

- Entry: default anonymous state on `/`.
- Goal: let returning player enter realm immediately.
- Primary action: enter realm.
- Secondary actions: register, guest entry, forgotten scrolls.
- Exit:
  - enter realm -> inline continuation note while deeper realm state is deferred
  - register -> sign up state on `/`
  - guest entry -> prologue state on `/`
- Packet: [../screens/auth.md](../screens/auth.md)
- Storybook: [../../src/components/features/auth/root-entry-shell.stories.tsx](../../src/components/features/auth/root-entry-shell.stories.tsx)
- Runtime: [../../src/components/features/auth/root-entry-shell.tsx](../../src/components/features/auth/root-entry-shell.tsx)

### 2. Sign up

- Entry: sign-in secondary action.
- Goal: create account, then continue into origins.
- Primary action: create account.
- Secondary actions: back to sign in, guest entry.
- Exit:
  - create account -> prologue state on `/`
  - back to sign in -> sign-in state on `/`
  - guest entry -> prologue state on `/`
- Packet: [../screens/auth.md](../screens/auth.md)
- Storybook: [../../src/components/features/auth/root-entry-shell.stories.tsx](../../src/components/features/auth/root-entry-shell.stories.tsx)
- Runtime: [../../src/components/features/auth/root-entry-shell.tsx](../../src/components/features/auth/root-entry-shell.tsx)

### 3. Prologue

- Entry: guest or newly registered onboarding session.
- Goal: shape starting hero through short narrative questions.
- Primary action: answer current question and continue.
- Secondary actions: skip prologue, back when flow becomes multi-step.
- Exit:
  - answer -> next prologue step or character setup
  - skip -> character setup
- Packet: [../screens/origins.md](../screens/origins.md)
- Storybook: [../../src/components/features/auth/origins/origins.stories.tsx](../../src/components/features/auth/origins/origins.stories.tsx)
- Runtime: [../../src/components/features/auth/origins/view.tsx](../../src/components/features/auth/origins/view.tsx) and [../../src/components/features/auth/origins/step-tutorial.tsx](../../src/components/features/auth/origins/step-tutorial.tsx)

### 4. Character setup

- Entry: prologue completion or prologue skip.
- Goal: confirm race, class, and name before entering realm.
- Primary action: confirm hero.
- Secondary actions: randomize, back to prologue if product keeps branch visible.
- Exit:
  - confirm hero -> gameplay exploration state on `/game` (or root continuation state while route is deferred)
- Packet: [../screens/origins.md](../screens/origins.md)
- Storybook: [../../src/components/features/auth/origins/origins.stories.tsx](../../src/components/features/auth/origins/origins.stories.tsx)
- Runtime: [../../src/components/features/auth/origins/view.tsx](../../src/components/features/auth/origins/view.tsx) and [../../src/components/features/auth/origins/step-creation.tsx](../../src/components/features/auth/origins/step-creation.tsx)

### 5. Gameplay

- Entry: character setup confirmation.
- Goal: let the player explore, encounter, and act in the game world.
- Primary actions: contextual per state — move, act, combat action.
- Secondary actions: inventory, character sheet, flee (combat).
- Exit: none yet; death/session-end screen deferred.
- Packet: [../screens/gameplay.md](../screens/gameplay.md)
- Storybook: `src/components/features/game/` (not yet created)
- Runtime: `src/components/features/game/` (not yet created)

## Artifact Chain

- Visual rules live in [../system.md](../system.md).
- Flow ownership lives here.
- Screen-specific UX and ASCII live in [../screens/auth.md](../screens/auth.md), [../screens/origins.md](../screens/origins.md), and [../screens/gameplay.md](../screens/gameplay.md).
- Shared backdrop asset lives at `public/assets/locations/city.jpg`.
- Live approval states live in Storybook under `src/components/features/auth/` (auth and origins) and `src/components/features/game/` (gameplay, once created).

## Rule For New Screens

- Add new screen packet only when state is near-term and canonical enough to implement.
- Prefer extending existing root-state packet over spawning disconnected docs or mockups.
- If new family needs multiple states, group them under one packet instead of one file per screen unless packet becomes hard to reason about.
