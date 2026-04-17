# Stitch Brief

This brief is for preparing the next visual redesign of Land of Machala.
It should help define the product shape before broad backend implementation begins.

## 1. Product Direction

Land of Machala is a premium online fantasy text RPG.
The experience should feel medieval, atmospheric, narrative-rich, and readable on both desktop and mobile.

The visual language should feel:

- painterly rather than sterile
- premium rather than generic game UI
- cinematic but still practical for long reading sessions
- symmetrical and stable across views

## 2. Canonical Surface To Design For

Design for a **minimal canonical surface**.

### Current Preferred Direction

- `/{locale}` is the canonical route
- anonymous users see landing, product framing, and auth entry there
- authenticated users see onboarding, character creation, or resumed gameplay state there

The design work should therefore focus on distinct **screen states**, not on inventing many separate routes.

### Optional Later Routes

These may exist later, but should not drive the initial redesign:

- `/{locale}/account`
- `/{locale}/codex`

## 3. Preferred User Flow

### Anonymous Entry

The root route should act as:

- public landing page
- first emotional impression
- CTA surface to start playing
- place where login/register entry can appear without forcing a separate dedicated route at first

### Authenticated Shell State

The same canonical route should also be able to act as:

- gameplay shell for authenticated users
- onboarding or character-creation gate for first-time players
- resumed game state for returning players

This means the redesign should support both:

- first-time player onboarding
- returning player gameplay continuity

## 4. Landing Page Content Blocks

The landing page should not feel empty.
It should likely include:

- strong product title and subtitle
- short fantasy welcome copy such as "Vítej, poutníku..."
- one or two clear CTAs
- login/register entry surface
- short world framing or lore teaser
- concise changelog or "latest happenings" block
- world or player stats block if it helps credibility
- optional trust or polish details such as accessibility, supported languages, or release notes

The landing page should remain focused. It should not become a huge brochure site.

## 5. Onboarding / Origins Experience

Keep the current strengths:

- short tutorial with approximately three questions
- skip option
- character identity setup
- race and class choice
- visible stat impact

### Improve Toward

- stronger narrative continuity between tutorial and character creation
- clearer reward or consequence framing for choices
- more premium visual hierarchy
- less form-like feeling, more "entering the world" feeling

## 6. Recommended MVP Stat Model

Keep the first stat model understandable.

### Core Attributes

- Strength
- Agility
- Intelligence
- Stamina

### Core Resources

- HP always
- Mana for magic-oriented archetypes
- Energy, Focus, or Resolve for martial or non-mana archetypes
- XP and Level visible in the shell when useful

### Later Layer

These can exist later once the shell is stable:

- resistances
- perks
- spell power or archetype-specific modifiers
- secondary combat traits

Do not overload the MVP with too many simultaneous stat surfaces.

## 7. Gameplay Shell Layout

The gameplay shell should preserve the same mental model on desktop and mobile.
Players on one device should not feel like they are using a different game.

### Top Status Zone

Preferred direction:

- player box top-left on desktop
- enemy box top-right on desktop when relevant
- on mobile, these stack while preserving the same information priority

Each box may include:

- portrait or emblem
- name
- level
- HP bar
- mana or energy if relevant
- key stat highlights

### Main Narrative Zone

The central area should be a narrative and event surface.
It may function as:

- dialogue log
- narration stream
- combat log
- contextual event text

This is one of the most important surfaces in the whole product.
It should be readable, atmospheric, and stable.

### Action Zone

The lower action area should keep consistent logic.

Preferred model:

- left side: primary actions, navigation-back style actions, or core progression actions
- right side: contextual detail, transaction detail, enemy detail, merchant detail, or item/shop side information
- on mobile: these should stack without changing the mental model too much

### Combat

Combat should not reward only spamming one attack.
The UI should support:

- offense
- defense
- tactical choice
- contextual feedback

That does not require a highly complex action grid at the MVP stage, but the layout should allow it.

## 8. Background And Atmosphere

The page background can shift by context.
That is a strong part of the fantasy immersion.

Examples:

- city
- forge
- shop
- tavern
- forest
- desert
- combat encounter

Use context changes carefully so readability stays strong.
The interface content must stay readable above the background.

## 9. Mobile Strategy

Mobile should be first-class, not downgraded.

### Important Constraint

Avoid a design that depends on a desktop-only minimap or wide control matrix.
If a minimap exists later, it should be optional and not the core navigation requirement.

### Goal

Desktop and mobile should share:

- the same primary information hierarchy
- the same action logic
- the same narrative surface
- the same identity of the game

## 10. Design Output Needed From Stitch

Ask for at least these three redesigned views:

1. Landing page with auth entry and strong world framing.
2. Onboarding/origins flow with tutorial plus character creation.
3. Authenticated gameplay shell state in a city or combat state.

If possible, also ask for:

- one mobile variant of the gameplay shell
- one combat-state variant
- one merchant or interaction-state variant

## 11. Best Input To Give Stitch

Do **not** give only a screenshot.
Do **not** give only vague prose.
Use both.

### Recommended Input Package

- current screenshot or screenshots of the existing UI
- the older onboarding screenshot as a structure reference
- a small curated set of city/forest background references from the current and older project
- this brief
- notes about mobile/desktop parity
- notes about one canonical route with distinct anonymous and authenticated screen states
- notes about medieval fantasy tone, readable text surfaces, and narrative-first gameplay

## 12. Success Criteria

The redesign should feel:

- more premium
- more atmospheric
- more structurally coherent
- more readable for long sessions
- more convincing as a real product and portfolio piece
- implementable in the existing Next.js design-system direction
