# Pull Request

**Link to issue:** Closes #[issue number]

---

## 📝 Description

[What does this PR accomplish? Why was it needed?]

**Example:** "Implements login authentication. Addresses #15."

---

## 🔄 Changes

- [ ] [What file changed and why]
- [ ] [Another change]
- [ ] [Another change]

**Example:**
- Added `app/(auth)/login/page.tsx` with login form
- Added `src/app/actions/auth.ts` Server Action for authentication
- Added `tests/components/LoginForm.test.tsx` with form tests
- Updated `CHANGELOG.md` with feature addition

---

## ✅ Quality Checklist

### Tests
- [ ] All tests pass: `npm test`
- [ ] New tests added for this feature
- [ ] Coverage: >70% for touched files
- [ ] No test skips in production code

### Code Quality
- [ ] Type check passes: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] Code formatted: `npm run format`
- [ ] No commented-out code
- [ ] No `any` types

### Documentation
- [ ] CHANGELOG.md updated (timestamp, type, scope, impact)
- [ ] local/TODOS.md updated (completed task removed)
- [ ] Components have JSDoc comments
- [ ] Complex logic has explanatory comments

### Functionality
- [ ] Dev server works: `npm run dev`
- [ ] Feature works in browser (manual test)
- [ ] Mobile responsive (if UI change)
- [ ] No console errors/warnings

### Review
- [ ] Changes are focused (single responsibility)
- [ ] No unrelated refactoring mixed in
- [ ] Commit messages are clear
- [ ] No breaking changes (or documented migration)

---

## 📊 Test Results

**Command:** `npm test -- --coverage`

```
[Paste test output]

Example:
PASS  tests/components/LoginForm.test.tsx
  LoginForm
    ✓ renders login form (45ms)
    ✓ validates email format (12ms)
    ✓ calls onSubmit with credentials (28ms)
    ✓ disables submit during loading (15ms)

PASS  tests/unit/validators.test.ts
  ✓ validateEmail accepts valid emails (5ms)
  ✓ validatePassword checks minimum length (3ms)

Test Suites: 2 passed, 2 total
Tests: 6 passed, 6 total
Coverage: 75% (23/30 lines)
```

---

## 🎯 Type

- [ ] Feature (new functionality)
- [ ] Bug fix (fixes existing issue)
- [ ] Refactoring (improves code, same behavior)
- [ ] Performance (faster/more efficient)
- [ ] Documentation (docs only)
- [ ] Styling (UI/CSS changes)

---

## 🚫 Breaking Changes

- [ ] No breaking changes
- [ ] Breaking changes (describe migration path below)

**If breaking:**
```
What changed:
- [Old API/behavior]
- [New API/behavior]

Migration path:
1. [Step 1]
2. [Step 2]

Timeline: [When will old API be removed?]
```

---

## 📋 Before Merging

- [ ] All checks pass (tests, type, lint)
- [ ] Code review approved
- [ ] No merge conflicts
- [ ] Local testing done
