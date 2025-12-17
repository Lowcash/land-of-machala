# Active Tasks & Priorities

**Current work items — Updated daily**

---

## 🔴 HIGH PRIORITY

- [ ] **Manual E2E testing in browser**
  - **Goal:** Test complete user flow: register → login → onboarding → play game
  - **Owner:** Agent
  - **Priority:** HIGH (NEXT TASK)
  - **Scope:** Registration, Login, Onboarding, Character Page, Footer Navigation, Skills, Quests
  - **How to test:** Follow `MANUAL_TEST_CHECKLIST.md`
  - **Success criteria:** All 13 test sections pass without errors

- [ ] **Verify UI/UX Unification**
  - **Goal:** Ensure all pages use `PageTemplate` correctly and look consistent.
  - **Owner:** Agent
  - **Priority:** High
  - **Scope:** Character, Skills, Quests, Inventory, Map
  - **Checklist:**
    - [ ] Check `PageTemplate` layout on all pages
    - [ ] Verify `ScrollIndicator` appears and works
    - [ ] Verify Inventory "Split View" behavior
    - [ ] Verify mobile responsiveness for new layouts

- [ ] **Write comprehensive tests**
  - **Goal:** Unit tests for entities, component tests for features, E2E tests
  - **Owner:** Agent
  - **Priority:** High
  - **Files:** **tests**/components/, **tests**/e2E/
  - **Coverage Target:** >80%
  - **Scope:** Character, Skills, Quest, Map, Inventory features, Auth flows

---

## 🟡 MEDIUM PRIORITY

- [ ] **Mobile responsiveness validation**
  - **Goal:** Test all features on mobile viewports (Character, Skills, Quest, Map, Inventory)
  - **Owner:** Agent
  - **Priority:** Medium
  - **Status:** All features have mobile layouts, need testing

---

## 🟢 LOW PRIORITY

- [ ] **Add sound effects**
  - **Goal:** Add audio feedback for actions (attacks, level up, quest complete, item equip)
  - **Owner:** Agent
  - **Priority:** Low
  - **Scope:** Combat, Character, Quest, Inventory

- [ ] **Add animations**
  - **Goal:** Smooth transitions for panels, routes, and interactions
  - **Owner:** Agent
  - **Priority:** Low

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

**Last updated:** 2025-12-16 07:15
