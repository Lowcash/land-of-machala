import { expect, test } from '@playwright/test'

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('input[type="text"]', 'test@example.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]')
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
