# E2E Test Suite Documentation

## 🎯 Overview

Comprehensive end-to-end testing infrastructure for Land of Machala using Playwright. Tests cover all major game systems with visual regression testing and cross-browser support.

## 📊 Test Coverage (68 Total Tests)

### Authentication & Onboarding (6 tests)

- **auth.spec.ts** - Login forms, invalid credentials, protected routes
- **onboarding.spec.ts** - Character creation flow, class/race selection

### Core Game Systems (46 tests)

- **character.spec.ts** (9 tests) - Character stats, equipment, race/class display, navigation
- **combat.spec.ts** (6 tests) - Combat mechanics, enemy stats, actions, combat log
- **inventory.spec.ts** (6 tests) - Item management, tooltips, capacity, starting gear
- **quests.spec.ts** (6 tests) - Quest log, objectives, progress tracking
- **skills.spec.ts** (7 tests) - Skill tree, points allocation, warrior skills
- **map.spec.ts** (6 tests) - Location display, travel system, requirements
- **minigames.spec.ts** (12 tests) - Fishing, lockpicking, mining mechanics

### Visual Regression (10 tests)

- **visual.spec.ts** - Snapshots of all pages (login, onboarding, game, character, skills, quests, inventory, map, combat)

## 🚀 Running Tests

### Quick Commands

```bash
# Run all tests (headless)
npm run test:e2e

# Run with visible browser (headed mode - recommended for development)
npm run test:e2e:headed

# Interactive UI mode (best for debugging)
npm run test:e2e:ui

# Step-through debugging
npm run test:e2e:debug

# Watch mode (re-run on changes)
npm run test:e2e:watch

# Run specific test file
npm run test:character  # Character tests in headed mode
npx playwright test __tests__/e2e/combat.spec.ts --headed
```

### Cross-Browser Testing

```bash
# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📸 Visual Regression Testing

### Generate/Update Baselines

```bash
# Update all snapshots
npm run test:e2e -- --update-snapshots

# Update specific test snapshots
npx playwright test visual.spec.ts --update-snapshots
```

### Visual Regression Configuration

- **Tolerance:** 1% pixel difference (maxDiffPixelRatio: 0.01)
- **Animations:** Disabled for consistent screenshots
- **Full Page:** Captures entire page, not just viewport
- **Browsers:** Chrome, Firefox, Safari

## 🧪 Test Structure

All tests follow this pattern:

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Login as guest
    // 2. Complete onboarding
    // 3. Navigate to feature
  })

  test('should test specific behavior', async ({ page }) => {
    // Arrange, Act, Assert
  })
})
```

## 📁 Test Files

```
__tests__/e2e/
├── auth.spec.ts          # Authentication flows
├── character.spec.ts     # Character system
├── combat.spec.ts        # Combat mechanics
├── inventory.spec.ts     # Inventory management
├── map.spec.ts           # Map & travel
├── minigames.spec.ts     # Fishing, lockpicking, mining
├── onboarding.spec.ts    # Character creation
├── quests.spec.ts        # Quest system
├── skills.spec.ts        # Skill tree
├── visual.spec.ts        # Visual regression
└── visual.spec.ts-snapshots/  # Visual baselines
```

## 🎨 Visual Regression Snapshots

Current snapshot coverage:

- ✅ Login page
- ✅ Onboarding (intro)
- ✅ Character creation
- ✅ Game dashboard (town)
- ✅ Character page
- ✅ Skills page
- ✅ Quests page
- ✅ Inventory page
- ✅ Map page
- ✅ Combat page

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

```typescript
{
  testDir: './__tests__/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    },
  },
}
```

## 🐛 Debugging Tests

### View Test Reports

```bash
# After test run, view HTML report
npx playwright show-report
```

### Debug Specific Test

```bash
# Launch with debugger
npx playwright test --debug

# Debug specific line
npx playwright test character.spec.ts:15 --debug
```

### Visual Studio Code

Install the [Playwright Test for VSCode](vscode:extension/ms-playwright.playwright) extension for:

- Run tests from sidebar
- Set breakpoints
- View test results inline

## 📈 CI/CD Integration

Tests run automatically on GitHub Actions:

- ✅ On every PR
- ✅ On merge to main
- ✅ Chrome browser only (CI)
- ✅ 2 retries on failure
- ✅ Upload screenshots on failure

## 🎯 Best Practices

1. **Use headed mode during development** - See what's happening

   ```bash
   npm run test:e2e:headed
   ```

2. **Wait for elements properly** - Use `expect().toBeVisible()` instead of `waitForTimeout`

   ```typescript
   // Good
   await expect(page.getByText('Health')).toBeVisible()

   // Avoid (unless necessary for animations)
   await page.waitForTimeout(500)
   ```

3. **Use role selectors** - More accessible and robust

   ```typescript
   await page.getByRole('button', { name: 'Login' }).click()
   ```

4. **Test user flows, not implementation** - Focus on what users do

   ```typescript
   // Good: Test user action
   test('user can create character', ...)

   // Avoid: Test internal state
   test('character state is updated in redux', ...)
   ```

5. **Keep tests independent** - Each test should work in isolation
   - Use `beforeEach` for setup
   - Don't rely on test execution order

## 🔄 Updating Tests

When adding new features:

1. **Add E2E test** in appropriate spec file
2. **Add visual snapshot** in visual.spec.ts
3. **Update this README** with new coverage
4. **Run full suite** to ensure no regression
   ```bash
   npm run test:e2e:headed
   ```

## 📊 Test Metrics

- **Total Tests:** 68
- **Coverage:** All major game systems
- **Visual Snapshots:** 10
- **Browsers:** Chrome, Firefox, Safari
- **CI Retries:** 2
- **Execution Time:** ~2-3 minutes (parallel)

## 🚨 Troubleshooting

### Tests fail with "Timeout"

```bash
# Increase timeout in test
test('slow operation', async ({ page }) => {
  test.setTimeout(60000) // 60 seconds
  // ...
})
```

### Visual regression fails unexpectedly

```bash
# Update baselines if design changed
npm run test:e2e -- --update-snapshots

# Or use higher tolerance temporarily
maxDiffPixelRatio: 0.02  // 2% instead of 1%
```

### Dev server won't start

```bash
# Make sure port 3000 is free
lsof -ti:3000 | xargs kill -9

# Or configure different port
baseURL: 'http://localhost:3001'
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/selectors)
- [Visual Comparisons](https://playwright.dev/docs/test-snapshots)

---

**Last Updated:** 2025-12-17  
**Test Suite Version:** 1.0.0  
**Playwright Version:** 1.56.1
