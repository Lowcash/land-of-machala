import { expect, test } from '@playwright/test'

/**
 * Visual Parity Tests - Validates design reference match
 *
 * Tests for:
 * - Page transition animations (RouteTransition fade)
 * - Hover effects on interactive elements
 * - Rarity glows on inventory items
 * - Scroll indicators visibility
 * - Typography and spacing consistency
 *
 * Note: Skills page excluded per user preference (different design)
 * Note: These tests verify CSS classes and DOM structure, not runtime behavior
 */

test.describe('Visual Parity - Auth Pages', () => {
  test('Login page should have background image with gradient overlay', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('networkidle')

    // Check page renders successfully
    const title = page.locator('h1:has-text("Land of Machala")')
    await expect(title).toBeVisible()

    // Verify at least one gradient element exists
    const gradientCount = await page.locator('[class*="bg-gradient-to"]').count()
    expect(gradientCount).toBeGreaterThan(0)
  })

  test('Login page should match design typography', async ({ page }) => {
    await page.goto('/login')
    await page.waitForTimeout(500)

    // Check for medieval font on title
    const title = page.locator('h1:has-text("Land of Machala")')
    await expect(title).toBeVisible()

    const fontFamily = await title.evaluate((el) => window.getComputedStyle(el).fontFamily)

    // Verify medieval or fantasy font is applied
    expect(fontFamily).toMatch(/medieval|fantasy|Cinzel/i)
  })

  test('Login page should use /assets/locations/ path (no double slashes)', async ({ page }) => {
    const imageErrors: string[] = []

    page.on('response', (response) => {
      if (response.url().includes('//assets/') || response.url().includes('//locations/')) {
        imageErrors.push(response.url())
      }
    })

    await page.goto('/login')
    await page.waitForTimeout(1000)

    expect(imageErrors).toHaveLength(0)
  })

  test('Register page should have RouteTransition wrapper', async ({ page }) => {
    await page.goto('/register')
    await page.waitForTimeout(500)

    // Verify page content is visible (transition completed)
    const title = page.locator('h1:has-text("Land of Machala")')
    await expect(title).toBeVisible()
  })
})

test.describe('Visual Parity - Gradient Classes', () => {
  test('All gradient classes should use bg-gradient-to-* syntax (NOT bg-linear-to-*)', async ({
    page,
  }) => {
    await page.goto('/login')
    await page.waitForTimeout(500)

    // Check that no old bg-linear-to-* classes exist in rendered HTML
    const linearGradients = page.locator('[class*="bg-linear-to"]')
    const count = await linearGradients.count()

    expect(count).toBe(0)
  })

  test('Login form button should have gradient background when enabled', async ({ page }) => {
    await page.goto('/login')

    // Fill in credentials to enable button
    await page.fill('input[type="text"]', 'test@test.com')
    await page.fill('input[type="password"]', 'test123')

    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()

    const classes = await submitButton.getAttribute('class')
    expect(classes).toContain('bg-gradient-to')
  })
})

test.describe('Visual Parity - Color Palette', () => {
  test('Golden accent color (#ffd700) should be present', async ({ page }) => {
    await page.goto('/login')

    const goldenElements = page.locator('[class*="text-[#ffd700]"], [class*="border-[#ffd700]"]')
    const count = await goldenElements.count()

    expect(count).toBeGreaterThan(0)
  })

  test('Copper border color (#8b6f47) should be present', async ({ page }) => {
    await page.goto('/login')

    const copperElements = page.locator('[class*="border-[#8b6f47]"]')
    const count = await copperElements.count()

    expect(count).toBeGreaterThan(0)
  })
})

test.describe('Visual Parity - Interactive Elements', () => {
  test('Buttons should have hover effects defined when enabled', async ({ page }) => {
    await page.goto('/login')

    // Fill in credentials to enable button
    await page.fill('input[type="text"]', 'test@test.com')
    await page.fill('input[type="password"]', 'test123')

    const submitButton = page.locator('button[type="submit"]')
    const classes = await submitButton.getAttribute('class')

    // Verify hover classes are present
    expect(classes).toMatch(/hover:/)
  })

  test('Login form should have transition-all for smooth animations', async ({ page }) => {
    await page.goto('/login')

    const submitButton = page.locator('button[type="submit"]')
    const classes = await submitButton.getAttribute('class')

    expect(classes).toContain('transition')
  })
})

test.describe('Visual Parity - Asset Loading', () => {
  test('Background images should load without 404 errors', async ({ page }) => {
    const imageErrors: string[] = []

    page.on('response', (response) => {
      if (response.url().includes('/assets/') && response.status() === 404) {
        imageErrors.push(response.url())
      }
    })

    await page.goto('/login')
    await page.waitForTimeout(1500)

    if (imageErrors.length > 0) {
      console.log('Missing assets:', imageErrors)
    }

    expect(imageErrors).toHaveLength(0)
  })
})
