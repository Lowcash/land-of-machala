## 📝 Description

<!-- Briefly describe what this PR does and why -->

## 🎯 Type of Change

<!-- Mark with 'x' all that apply -->

- [ ] 🐛 Bug fix (non-breaking change fixing an issue)
- [ ] ✨ New feature (non-breaking change adding functionality)
- [ ] 💥 Breaking change (fix or feature causing existing functionality to change)
- [ ] 📚 Documentation update
- [ ] 🔧 Refactoring (no functional changes)
- [ ] 🧪 Test coverage improvement

## ✅ Code Review Checklist

### Functionality

- [ ] Code fulfills requirements from issue/TODO
- [ ] Tests exist and pass (unit + integration where applicable)
- [ ] Breaking changes documented in CHANGELOG.md
- [ ] No unintended side effects

### Code Quality

- [ ] `npm run lint` passed (ESLint)
- [ ] `npx prettier --check .` passed (or formatted with `--write`)
- [ ] `npx tsc --noEmit` passed (type-check)
- [ ] No magic numbers (constants used)
- [ ] Max 4 parameters per function (parameter objects used if needed)
- [ ] No TODO/FIXME comments (moved to TODO.md)
- [ ] Functions <50 lines, components/classes <200 lines
- [ ] No wildcard imports (`import * as X`)
- [ ] No `any` types (use proper TypeScript types)

### Documentation

- [ ] CHANGELOG.md updated (timestamp + what/why/impact)
- [ ] TODO.md updated (completed tasks removed)
- [ ] INSIGHTS.md updated (only for major architectural changes)
- [ ] TSDoc comments for public functions/components
- [ ] Zod schemas for all Server Action inputs

### Anti-Patterns (Must NOT contain)

- [ ] No fallback constants (\*\_AVAILABLE flags)
- [ ] No code duplication (DRY principle)
- [ ] No long parameter lists (>4)
- [ ] No large classes (>200 lines)
- [ ] No deprecated code markers

## 🧪 Test Evidence

<!-- Show test results - paste output from npm test or describe manual testing -->

```bash
# Paste test output here:
# npm test
# npm run test:e2e
# Or describe manual testing steps
```

## 📊 Coverage Impact

<!-- If applicable, show coverage before/after -->

- Before: X%
- After: Y%

## 🔗 Related Issues

<!-- Link related issues, TODOs, or discussions -->

Closes #

## 📸 Screenshots (if applicable)

<!-- Add screenshots for UI changes or visual improvements -->

## 🚀 Deployment Notes

<!-- Any special deployment steps or migration notes -->
