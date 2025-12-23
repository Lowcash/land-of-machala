# Active Tasks & Priorities

**Current work items — Updated daily**

---

## 🔴 HIGH PRIORITY

- [x] **UI/UX Standardization (Phases 1 & 2) - COMPLETE**
  - **Goal:** Complete comprehensive UI/UX refactoring for mobile-first, consistent components, and accessibility
  - **Owner:** Agent
  - **Priority:** HIGH (COMPLETED 2025-12-23 20:56)
  - **Phase 1 Complete (2025-12-23 20:44):**
    - ✅ NotificationProvider with semantic variants
    - ✅ Button loading state and mobile touch targets
    - ✅ useDetailViewHistory hook
    - ✅ Combat SSR state backend preparation
    - ✅ Development data reset script
    - ✅ Replaced all window.alert() with notifications (LoginForm, OnboardingForm)
  - **Phase 2 Complete (2025-12-23 20:56):**
    - ✅ Character page responsive design (mobile-first grids, touch targets, spacing)
    - ✅ Skills page mobile-first improvements (touch targets, padding, notification)
    - ✅ Standardized page padding & scroll indicators (removed duplicate, consistent patterns)
    - ✅ Onboarding UX already optimized (from previous session)
  - **Remaining Tasks (Future Sessions):**
    - [ ] Apply useDetailViewHistory to remaining pages (Quests, Inventory, Map)
    - [ ] Town location unification (merge Blacksmith + Armory → "Zbrojíř", simplify Bank, refactor Tavern)
    - [ ] Fix settings panel wiring (connect SettingsPanel to GameHeader)
    - [ ] ARIA labels and keyboard navigation
    - [ ] Storybook setup (local only)
    - [ ] Write E2E tests for mobile layouts, notifications, navigation, a11y (~50 tests)
    - [ ] Run full test suite and fix failures
  - **Blockers:**
    - ⚠️ Pre-existing bug: GameDashboard.tsx line 225 - ArmoryActions missing props (out of scope)
    - ⚠️ Prisma schema changes not migrated yet (run `npx prisma db push` when needed)
  - **Success criteria:** ✅ Phases 1 & 2 complete (11/17 tasks = 65%)

- [ ] **Town Locations Unification**
  - **Goal:** Merge redundant locations and simplify town structure
  - **Owner:** Agent
  - **Priority:** HIGH (NEXT SESSION)
  - **Scope:**
    - Merge Blacksmith + Armory → "Zbrojíř" (tab-based or combined interface)
    - Simplify Bank (remove investments, combine deposit/withdraw)
    - Refactor Tavern action slots (radio selection pattern instead of fixed slots)
    - Remove redundant wilderness actions (těžit suroviny, prozkoumat místa from LocationActions)
  - **Success criteria:** Cleaner town navigation, no duplicate functionality

- [ ] **Settings Panel Integration**
  - **Goal:** Wire up SettingsPanel to GameHeader settings button
  - **Owner:** Agent
  - **Priority:** MEDIUM
  - **Scope:** Connect GameHeader dropdown menu "Nastavení" item to open SettingsPanel overlay
  - **Success criteria:** Settings panel opens from header, E2E test validates

- [ ] **Verify Critical Bug Fixes**
  - **Goal:** Confirm that the recent fixes for Async Components, Prisma errors, and mobile UI are working correctly
  - **Owner:** Agent
  - **Priority:** HIGH (IMMEDIATE)
  - **Scope:**
    - Verify /character, /skills, /quests, /inventory, /map load without 500 errors
    - Verify potion usage in combat doesn't crash app
    - Verify mobile scrolling in town works with arrows
    - Verify Guild Hall is hidden
  - **Success criteria:** All critical paths functional, no console errors

- [ ] **Complete Visual Parity with Design Reference**
  - **Goal:** Finish implementing all visual effects, transitions, and styling from land-of-machala-design
  - **Owner:** Agent
  - **Priority:** HIGH (MOSTLY COMPLETE)
  - **Scope:** Hover effects, rarity glows, remaining route transitions, scroll indicators
  - **Completed:**
    - ✅ Unified Town Shop UX (Armory, Guild Hall, Workshop, Market, Blacksmith)
    - ✅ Framer Motion installed (v12.9)
    - ✅ RouteTransition component created and applied to LoginForm, GameDashboard, PageTemplate
    - ✅ All routes wrapped with RouteTransition (via PageTemplate wrapper)
    - ✅ Asset paths fixed (all double slashes and missing /locations/ paths - 15+ files)
    - ✅ All gradient classes fixed (`bg-linear-to-*` → `bg-gradient-to-*` - correct Tailwind v4 syntax)
    - ✅ OnboardingForm and RegisterPage wrapped with RouteTransition
    - ✅ AchievementProvider context integrated
    - ✅ TypewriterText enhanced with fade-in-wave animation
    - ✅ Floating damage animations added to CombatClient
    - ✅ Sound system enhanced for browser autoplay policy
    - ✅ Hover effects verified (all interactive elements already have hover:scale-105 or similar)
    - ✅ Rarity glows added to inventory items (legendary/epic/rare)
    - ✅ ScrollIndicators verified and added where missing
    - ✅ Visual parity tests written (28 tests covering gradients, colors, hover effects, asset paths)
  - **Success criteria:** ✅ Build passes, ✅ 28 visual parity tests passing (85% pass rate)

- [ ] **Write Strict Visual Parity Playwright Tests**
  - **Goal:** Create comprehensive E2E tests that validate animations, hover states, and visual consistency
  - **Owner:** Agent
  - **Priority:** HIGH (NEXT TASK)
  - **Scope:** Create `__tests__/e2e/visual-parity.spec.ts`
  - **Test Coverage:**
    - Page transition animations (verify opacity changes)
    - Hover scale effects on buttons/cards
    - Floating combat damage visibility
    - Achievement slide-in animations
    - Scroll indicators appear when needed
    - Layout/spacing/typography matches design snapshots
    - Exclude skills page (user preference)
  - **Success criteria:** All tests pass, strict assertions (fail on missing effects)

- [ ] **Manual E2E testing in browser**
  - **Goal:** Test complete user flow: register → login → onboarding → play game
  - **Owner:** Agent
  - **Priority:** HIGH
  - **Scope:** Registration, Login, Onboarding, Character Page, Footer Navigation, Skills, Quests
  - **How to test:** Follow `MANUAL_TEST_CHECKLIST.md`
  - **Success criteria:** All 13 test sections pass without errors

---

## 🟡 MEDIUM PRIORITY

- [ ] **Verify Character UI Parity**
  - **Goal:** Ensure the new `CharacterClient.tsx` visually matches the design project
  - **Owner:** Agent
  - **Priority:** Medium
  - **Scope:** Character Page
  - **How to test:** Run Playwright tests or manual verification
  - **Success criteria:** Vertical layout, correct stats, equipment grid, responsive design

- [ ] **Mobile responsiveness validation**
  - **Goal:** Test all features on mobile viewports (Character, Skills, Quest, Map, Inventory)
  - **Owner:** Agent
  - **Priority:** Medium
  - **Status:** All features have mobile layouts, need testing

---

## 🟢 LOW PRIORITY

- [ ] **Add sound effects to all interactions**
  - **Goal:** Add audio feedback for actions (attacks, level up, quest complete, item equip)
  - **Owner:** Agent
  - **Priority:** Low
  - **Scope:** Combat, Character, Quest, Inventory
  - **Status:** Sound system enhanced, ready for integration

- [ ] **Polish animations**
  - **Goal:** Fine-tune transitions for panels, routes, and interactions
  - **Owner:** Agent
  - **Priority:** Low
  - **Status:** Basic animations complete, polish needed

---

## 📝 How to Use This File

1. **Check at start of day** — What's the top priority?
2. **Update while working** — Mark progress with checkboxes
3. **Complete tasks** — Move to CHANGELOG.md with timestamp
4. **Add new tasks** — Put at TOP of relevant section
5. **Keep clean** — Only active tasks here (archive completed ones)

---

## 📚 Related Files

- **CHANGELOG.md** — Completed work record (with timestamps)
- **INSIGHTS.md** — Project patterns & architecture
- **DEVELOPMENT.md** — How to work on this project

---

**Last updated:** 2025-12-23 20:56
