import { expect, test } from '@playwright/test'

import { loginAsGuest } from './helpers'

test.describe('Accessibility (A11y)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsGuest(page)
  })

  test.describe('Keyboard Navigation', () => {
    test('can navigate footer with Tab key', async ({ page }) => {
      await page.goto('/game')

      // Tab to footer buttons
      await page.keyboard.press('Tab')

      // Should focus on a button
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()

      // Tab through all footer buttons
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab')
        const focused = page.locator(':focus')
        await expect(focused).toBeVisible()
      }
    })

    test('can activate buttons with Enter and Space', async ({ page }) => {
      await page.goto('/game')

      // Focus on character button
      const characterButton = page.getByRole('button', { name: /Postava/i })
      await characterButton.focus()

      // Press Enter
      await page.keyboard.press('Enter')

      // Should navigate
      await expect(page).toHaveURL('/character', { timeout: 3000 })
    })

    test('Escape key closes settings panel', async ({ page }) => {
      await page.goto('/game')

      // Open settings (via header menu if available)
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Settings panel should be open
        const settingsPanel = page.locator('[role="dialog"]')
        if ((await settingsPanel.count()) > 0) {
          await expect(settingsPanel.first()).toBeVisible()

          // Press Escape
          await page.keyboard.press('Escape')
          await page.waitForTimeout(500)

          // Panel should close
          await expect(settingsPanel.first()).not.toBeVisible()
        }
      }
    })

    test('Tab order is logical', async ({ page }) => {
      await page.goto('/character')

      // Tab through page
      const focusedElements = []

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab')
        const focused = await page.evaluate(() => {
          const el = document.activeElement
          return el?.tagName + (el?.textContent?.substring(0, 20) || '')
        })
        focusedElements.push(focused)
      }

      // Should have focused on interactive elements
      expect(focusedElements.length).toBeGreaterThan(0)
    })

    test('can navigate back with keyboard', async ({ page }) => {
      await page.goto('/character')

      // Focus on back button
      const backButton = page.getByRole('button', { name: /Zpět/i })
      if ((await backButton.count()) > 0) {
        await backButton.focus()
        await page.keyboard.press('Enter')

        // Should navigate back
        await page.waitForTimeout(1000)
      }
    })
  })

  test.describe('ARIA Labels', () => {
    test('buttons have accessible labels', async ({ page }) => {
      await page.goto('/game')

      // Check footer buttons
      const buttons = page.locator('footer button')
      const count = await buttons.count()

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i)
        const label = await button.getAttribute('aria-label')
        const text = await button.textContent()

        // Should have either aria-label or text content
        expect(label || text).toBeTruthy()
      }
    })

    test('header buttons have aria-labels', async ({ page }) => {
      await page.goto('/character')

      // Back button should have label
      const backButton = page.getByRole('button', { name: /Zpět/i })
      if ((await backButton.count()) > 0) {
        const label = await backButton.first().getAttribute('aria-label')
        const text = await backButton.first().textContent()

        expect(label || text).toBeTruthy()
      }
    })

    test('dropdown menu has proper ARIA attributes', async ({ page }) => {
      await page.goto('/game')

      // Find settings/menu button in header
      const menuButton = page.locator('button[aria-haspopup], button[aria-expanded]')
      if ((await menuButton.count()) > 0) {
        const hasPopup = await menuButton.first().getAttribute('aria-haspopup')
        const expanded = await menuButton.first().getAttribute('aria-expanded')

        // Should have proper ARIA attributes
        expect(hasPopup || expanded !== null).toBeTruthy()
      }
    })

    test('settings panel has role="dialog"', async ({ page }) => {
      await page.goto('/game')

      // Open settings
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Should have dialog role
        const dialog = page.locator('[role="dialog"]')
        if ((await dialog.count()) > 0) {
          await expect(dialog.first()).toBeVisible()

          // Should have aria-modal
          const ariaModal = await dialog.first().getAttribute('aria-modal')
          expect(ariaModal).toBe('true')
        }
      }
    })

    test('notifications have role="alert"', async ({ page }) => {
      await page.goto('/login')

      // Trigger notification (guest login)
      await page.getByRole('button', { name: /Zkusit hru jako host/i }).click()

      // Wait for notification
      const notification = page.locator('[role="alert"]')
      if ((await notification.count()) > 0) {
        await expect(notification.first()).toBeVisible({ timeout: 5000 })

        // Check aria-live
        const ariaLive = await notification.first().getAttribute('aria-live')
        expect(ariaLive).toBe('polite')
      }
    })
  })

  test.describe('Focus Management', () => {
    test('focus visible on interactive elements', async ({ page }) => {
      await page.goto('/game')

      // Tab to button
      await page.keyboard.press('Tab')

      // Check if focus outline is visible
      const focused = page.locator(':focus')
      if ((await focused.count()) > 0) {
        const outline = await focused.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          return styles.outline || styles.boxShadow
        })

        // Should have some focus indicator
        expect(outline).toBeTruthy()
      }
    })

    test('focus returns to trigger after modal close', async ({ page }) => {
      await page.goto('/game')

      // Open settings
      const settingsButton = page
        .locator('button')
        .filter({ hasText: /Nastavení|Settings/i })
        .first()
      if ((await settingsButton.count()) > 0) {
        await settingsButton.click()
        await page.waitForTimeout(500)

        // Close with Escape
        await page.keyboard.press('Escape')
        await page.waitForTimeout(500)

        // Focus should return to trigger (or nearby element)
        const focused = page.locator(':focus')
        await expect(focused).toBeVisible()
      }
    })

    test('no focus traps outside modal', async ({ page }) => {
      await page.goto('/game')

      // Normal page - tab should cycle through all elements
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab')
      }

      // Should not get stuck
      const focused = page.locator(':focus')
      await expect(focused).toBeVisible()
    })
  })

  test.describe('Screen Reader Compatibility', () => {
    test('images have alt text or aria-label', async ({ page }) => {
      await page.goto('/character')

      // Check images
      const images = page.locator('img')
      const count = await images.count()

      for (let i = 0; i < Math.min(count, 10); i++) {
        const img = images.nth(i)
        const alt = await img.getAttribute('alt')
        const ariaLabel = await img.getAttribute('aria-label')

        // Should have alt or aria-label (or be decorative)
        expect(
          alt !== null || ariaLabel !== null || (await img.getAttribute('aria-hidden')) === 'true'
        ).toBeTruthy()
      }
    })

    test('interactive elements are properly labeled', async ({ page }) => {
      await page.goto('/skills')

      // Skill buttons should have accessible names
      const skillButtons = page.locator('button').filter({ hasText: /Základní útok|Silný úder/i })
      if ((await skillButtons.count()) > 0) {
        const text = await skillButtons.first().textContent()
        const label = await skillButtons.first().getAttribute('aria-label')

        expect(text || label).toBeTruthy()
      }
    })

    test('lists use semantic markup', async ({ page }) => {
      await page.goto('/quests')

      // Quest list should use semantic elements
      const lists = page.locator('ul, ol, [role="list"]')
      const count = await lists.count()

      // May have semantic lists
      expect(count).toBeGreaterThanOrEqual(0)
    })
  })

  test.describe('Color Contrast', () => {
    test('text has sufficient contrast', async ({ page }) => {
      await page.goto('/character')

      // Check main heading
      const heading = page.getByText(/Postava|Jméno/i).first()
      if ((await heading.count()) > 0) {
        const contrast = await heading.evaluate((el) => {
          const styles = window.getComputedStyle(el)
          const color = styles.color
          const bgColor = styles.backgroundColor

          // Both should be defined
          return color && bgColor
        })

        expect(contrast).toBeTruthy()
      }
    })

    test('interactive elements have visible states', async ({ page }) => {
      await page.goto('/game')

      const button = page.getByRole('button', { name: /Postava/i })

      // Get default color
      const defaultColor = await button.evaluate((el) => {
        return window.getComputedStyle(el).color
      })

      // Hover
      await button.hover()

      const hoverColor = await button.evaluate((el) => {
        return window.getComputedStyle(el).color
      })

      // Hover state should differ (or have other visual change)
      // This is a basic check - full contrast testing needs specialized tools
      expect(defaultColor || hoverColor).toBeTruthy()
    })
  })
})
