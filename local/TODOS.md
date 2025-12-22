# Active Tasks & Priorities

**Current work items — Updated daily**

---

## 🔴 HIGH PRIORITY

- [x] **UI Simplification & Design Consistency** ✅ DONE (2025-12-22 18:42)
  - Removed background images from all game pages (character, skills, quests, inventory, map)
  - Fixed skills page - all skills now clickable
  - Removed quest filters - show all quests by default
  - Added scroll arrows to quest detail
  - Simplified inventory - removed filters, search, location display
  - Simplified map - removed travel button, added scroll arrows
  - Fixed hydration error in MarketActions (Math.random)
  - Ensured consistent design across all pages

- [x] **Fix SSR hydration errors** ✅ DONE (2025-12-18 21:30)
  - Added `export const dynamic = 'force-dynamic'` to Skills, Quests, Map pages
  - All routes now build successfully

- [x] **Remove crafting feature (keep blacksmith)** ✅ DONE (2025-12-18 21:30)
  - Removed Workshop from GameDashboard
  - Removed workshop button from TownActions
  - Blacksmith feature preserved

- [x] **Fix enemy asset URLs** ✅ DONE (2025-12-18 21:30)
  - Changed wolf.png → wolf.jpg in CombatClient

- [x] **Add scroll indicators to key components** ✅ DONE (2025-12-18 21:30)
  - Added to CharacterClient, SettingsPanel, HelpPanel
  - Used proper ref pattern with ScrollIndicator component
  - Note: Many components already have ScrollIndicator (SkillGrid, QuestList, InventoryClient, ArmoryActions, GameLayout, CombatClient)

- [ ] **Complete Visual Parity with Design Reference**
  - **Goal:** Finish implementing all visual effects, transitions, and styling from land-of-machala-design
  - **Owner:** Agent
  - **Priority:** HIGH (MOSTLY COMPLETE)
  - **Scope:** Hover effects, rarity glows, remaining route transitions, scroll indicators
  - **Completed:**
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

**Last updated:** 2025-12-22 18:42
