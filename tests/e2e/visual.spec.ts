import { expect, test } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('input[type="text"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')

    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeEnabled()
    await submitButton.click()

    await page.waitForURL('/game')
  })

  test('Game Dashboard (Town) should match snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('game-dashboard.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01, // Allow 1% difference for minor rendering variations
    })
  })

  test('Character Page should match snapshot', async ({ page }) => {
    await page.click('text=Postava')
    await page.waitForURL('/character')
    // Wait for animations to finish
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('character-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('Skills Page should match snapshot', async ({ page }) => {
    await page.click('text=Dovednosti')
    await page.waitForURL('/skills')
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('skills-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('Quests Page should match snapshot', async ({ page }) => {
    await page.click('text=Questy')
    await page.waitForURL('/quests')
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('quests-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('Inventory Page should match snapshot', async ({ page }) => {
    await page.click('text=Inventář')
    await page.waitForURL('/inventory')
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('inventory-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('Map Page should match snapshot', async ({ page }) => {
    await page.click('text=Mapa')
    await page.waitForURL('/map')
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('map-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })
})

test.describe('Visual Regression - Auth & Onboarding', () => {
  test('Login Page should match snapshot', async ({ page }) => {
    await page.goto('/login')
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('login-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('Onboarding Page should match snapshot', async ({ page }) => {
    // Login as guest to reach onboarding
    await page.goto('/login')
    await page.getByRole('button', { name: 'Zkusit hru jako host (bez registrace)' }).click()
    await expect(page).toHaveURL(/\/onboarding/, { timeout: 15000 })

    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot('onboarding-page.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })

  test('Character Creation should match snapshot', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'Zkusit hru jako host (bez registrace)' }).click()
    await expect(page).toHaveURL(/\/onboarding/, { timeout: 15000 })

    // Skip to character creation
    await page.getByRole('button', { name: 'Přeskočit úvod (Jsem zkušený hráč)' }).click()
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot('character-creation.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })
})

test.describe('Visual Regression - Combat', () => {
  test.beforeEach(async ({ page }) => {
    // Login as guest and create character
    await page.goto('/login')
    await page.getByRole('button', { name: 'Zkusit hru jako host (bez registrace)' }).click()
    await expect(page).toHaveURL(/\/onboarding/, { timeout: 15000 })
    await page.getByRole('button', { name: 'Přeskočit úvod (Jsem zkušený hráč)' }).click()

    await page.getByPlaceholder('Zadej jméno...').fill('VisualTest')
    await page.getByRole('button', { name: 'Válečník' }).click()
    await page.getByRole('button', { name: 'Člověk' }).click()
    await page.getByRole('button', { name: 'Vstoupit do hry' }).click()

    await expect(page).toHaveURL(/\/game/, { timeout: 15000 })
  })

  test('Combat Page should match snapshot', async ({ page }) => {
    // Navigate to combat if available
    const combatButton = page.getByRole('button', { name: /souboj|boj|combat/i })

    if (await combatButton.isVisible()) {
      await combatButton.click()
      await expect(page).toHaveURL(/\/combat/, { timeout: 10000 })
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('combat-page.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      })
    }
  })
})
