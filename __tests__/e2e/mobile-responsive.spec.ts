import { expect, test } from '@playwright/test'

import { loginAsGuest } from './helpers'

test.describe('Mobile Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsGuest(page)
  })

  test.describe('Mobile Viewports', () => {
    test('should render correctly on iPhone SE (375x667)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/character')

      // Check header is visible and not overflowing
      const header = page.locator('header')
      await expect(header).toBeVisible()

      // Check content is not horizontally scrollable
      const body = await page.locator('body').boundingBox()
      expect(body?.width).toBeLessThanOrEqual(375)
    })

    test('should render correctly on iPhone 12 Pro (390x844)', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await loginAsGuest(page)

      await page.getByRole('button', { name: /Dovednosti/i }).click()
      await page.waitForURL('**/skills', { timeout: 5000 })

      const header = page.locator('header')
      await expect(header).toBeVisible()

      // Skill cards should stack vertically
      const skillCards = page.locator('[role="button"]').filter({ hasText: 'Základní útok' })
      await expect(skillCards.first()).toBeVisible()
    })

    test('should render correctly on iPad (768x1024)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.goto('/inventory')

      // Inventory grid should be visible
      const inventory = page.getByText(/Inventář/i).first()
      await expect(inventory).toBeVisible()
    })
  })

  test.describe('Touch Targets', () => {
    test('all buttons meet 44x44px minimum touch target', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/game')

      // Check footer buttons
      const footerButtons = page.locator('footer button')
      const count = await footerButtons.count()

      for (let i = 0; i < count; i++) {
        const button = footerButtons.nth(i)
        const box = await button.boundingBox()

        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44)
          expect(box.width).toBeGreaterThanOrEqual(44)
        }
      }
    })

    test('action buttons in town are tap-friendly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/game')

      // Town action buttons
      const buttons = page.locator('button').filter({ hasText: /Navštívit|Odpočinout/i })
      const count = await buttons.count()

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i)
        const box = await button.boundingBox()

        if (box) {
          // Should be at least 44px tall
          expect(box.height).toBeGreaterThanOrEqual(44)
        }
      }
    })
  })

  test.describe('Responsive Grids', () => {
    test('character equipment grid adapts to mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/character')

      // Equipment section should be visible
      const equipment = page.getByText(/Výbava/i)
      await expect(equipment).toBeVisible()

      // Grid should not cause horizontal scroll
      const container = page.locator('main')
      const box = await container.boundingBox()
      expect(box?.width).toBeLessThanOrEqual(375)
    })

    test('skills grid stacks properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/skills')

      // Skills should be visible
      const skills = page.getByText(/Základní útok|Silný úder/i).first()
      await expect(skills).toBeVisible()

      // Should not overflow
      const main = page.locator('main')
      const box = await main.boundingBox()
      expect(box?.width).toBeLessThanOrEqual(375)
    })

    test('inventory grid adapts to screen size', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.getByRole('button', { name: /Inventář/i }).click()
      await page.waitForURL('**/inventory', { timeout: 5000 })

      // Inventory should be visible
      const inventory = page.getByText(/Inventář/i).first()
      await expect(inventory).toBeVisible()

      // Grid should fit in viewport
      const main = page.locator('main')
      const box = await main.boundingBox()
      expect(box?.width).toBeLessThanOrEqual(375)
    })
  })

  test.describe('Mobile Spacing & Padding', () => {
    test('content has adequate padding on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/character')

      const main = page.locator('main')
      const styles = await main.evaluate((el) => {
        const computed = window.getComputedStyle(el)
        return {
          paddingLeft: computed.paddingLeft,
          paddingRight: computed.paddingRight,
        }
      })

      // Should have some horizontal padding
      expect(parseInt(styles.paddingLeft)).toBeGreaterThan(0)
      expect(parseInt(styles.paddingRight)).toBeGreaterThan(0)
    })

    test('text is readable on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/character')

      // Check font sizes are readable (at least 14px)
      const statText = page.getByText(/Zdraví|Mana|Energie/i).first()
      const fontSize = await statText.evaluate((el) => {
        return window.getComputedStyle(el).fontSize
      })

      expect(parseInt(fontSize)).toBeGreaterThanOrEqual(14)
    })
  })

  test.describe('Scrolling Behavior', () => {
    test('pages scroll vertically on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/skills')

      // Should be scrollable
      const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)
      const viewportHeight = await page.evaluate(() => window.innerHeight)

      // Skills page should have content that extends beyond viewport
      expect(scrollHeight).toBeGreaterThan(viewportHeight)
    })

    test('no horizontal scrolling on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const pages = ['/character', '/skills', '/inventory', '/quests', '/map']

      for (const path of pages) {
        await page.goto(path)
        await page.waitForLoadState('networkidle')

        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
        const viewportWidth = await page.evaluate(() => window.innerWidth)

        // Should not have horizontal scroll
        expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1) // +1 for rounding
      }
    })
  })
})
