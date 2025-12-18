# Issue Template

**Use this format for ALL tasks (quick fixes, features, bugs, refactoring)**

---

## 📋 Basic Info

**Type:** [QUICK | COMPLEX | BUG | REFACTOR]

**Title:** [What needs to be done?]

---

## 🎯 Goal

[One sentence: what problem this solves or what feature to add]

**Example:** "Add authentication page to allow users to log in"

---

## 📝 Details

### Why

[Context: why is this needed? what breaks without it?]

**Example:** "Users need way to log in. Currently can access dashboard without auth."

### What

[Specific work to do. Be concrete.]

**Example:**

- Create `app/(auth)/login/page.tsx` with form
- Add email/password fields with validation
- Create Server Action `src/app/actions/auth.ts` for authentication
- Add tests: form rendering, validation, submission
- Update `app/layout.tsx` with login link

### Success Criteria

[How do you know when this is done?]

**Example:**

- Login page renders without errors
- Form validates email format
- Submission calls Server Action
- Tests pass: `npm test -- login`
- No TypeScript errors
- Type coverage: 100%

---

## 🚀 FOR QUICK TASKS (< 1 hour)

```
Checklist:
- [ ] Understand the goal
- [ ] Implement the feature
- [ ] Write tests
- [ ] Run: npm test
- [ ] Type check: npm run type-check
- [ ] Update CHANGELOG.md
- [ ] Update local/TODOS.md (remove this task)
```

---

## 📈 FOR COMPLEX TASKS (2+ hours)

### Phase 1: Diagnostic (~ X minutes)

- [ ] Understand problem domain
- [ ] Read related code (pages, components, API)
- [ ] Identify what needs to change
- [ ] Sketch component structure

### Phase 2: Implementation (~ X minutes)

- [ ] Create/modify components
- [ ] Add Server Actions or API routes
- [ ] Write tests (test-first recommended)
- [ ] Run tests frequently: `npm test`
- [ ] Follow code standards (see copilot-instructions.md)

### Phase 3: Validation (~ X minutes)

- [ ] All tests pass: `npm test`
- [ ] Type check passes: `npm run type-check`
- [ ] Code quality OK: `npm run lint`
- [ ] No regressions (existing tests still pass)
- [ ] Dev server works: `npm run dev`
- [ ] Update CHANGELOG.md + local/TODOS.md

---

## 🐛 FOR BUG REPORTS

**Steps to Reproduce:**

1. [First step]
2. [Second step]
3. [What happens]

**Expected Behavior:**
[What should happen instead]

**Actual Behavior:**
[What actually happens]

**Error Output:**

```
[Paste full error from console or network tab]
```

**Screenshots:**
[If visual issue, describe or attach screenshot]

**Environment:**

- Node version: [output of `node --version`]
- OS: [macOS/Linux/Windows]
- Browser: [Chrome, Firefox, Safari]

---

## ♻️ FOR REFACTORING

**Current Problem:**
[Why does code need refactoring? Performance? Readability? Duplication?]

**Proposed Solution:**
[How to improve it]

**Files to Touch:**
[Which components/utilities will change]

**Risk Assessment:**
[What could break? How to prevent it?]

---

## 📋 REQUIRED BEFORE CLOSING

- [ ] Tests pass: `npm test`
- [ ] Type check passes: `npm run type-check`
- [ ] Linting passes: `npm run lint -- --fix`
- [ ] Code formatted: `npm run format`
- [ ] CHANGELOG.md updated (with timestamp, type, scope, impact)
- [ ] local/TODOS.md updated (completed task removed, new tasks added if any)
- [ ] Code committed: `git commit -m "type(scope): description"`
- [ ] Dev server runs: `npm run dev` (no console errors)

---

**See also:**

- ARCHITECTURE.md (design patterns)
- DEVELOPMENT.md (workflow)
- copilot-instructions.md (code standards)
