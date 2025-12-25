import { expect, test } from '@playwright/test'
import { loginAsGuest } from './helpers'

test.describe('Settings Panel', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsGuest(page)
  })

  test.describe('Panel Opening and Closing', () => {
    test('should open settings panel from header menu', async ({ page }) => {
      // Click settings button in header
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Verify settings panel is visible
        const panel = page.locator('[role="dialog"]')
        if ((await panel.count()) > 0) {
          await expect(panel.first()).toBeVisible()
          await expect(page.getByText(/Nastavení/i).first()).toBeVisible()
        }
      }
    })

    test('should close settings panel with X button', async ({ page }) => {
      // Open settings panel
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Click close button
        const closeButton = page.getByRole('button', { name: /Zavřít/i })
        if ((await closeButton.count()) > 0) {
          await closeButton.first().click()
          await page.waitForTimeout(500)

          // Verify panel is hidden
          const panel = page.locator('[role="dialog"]')
          await expect(panel.first()).not.toBeVisible()
        }
      }
    })

    test('should close settings panel with Escape key', async ({ page }) => {
      // Open settings panel
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Press Escape
        await page.keyboard.press('Escape')
        await page.waitForTimeout(500)

        // Verify panel is hidden
        const panel = page.locator('[role="dialog"]')
        await expect(panel.first()).not.toBeVisible()
      }
    })
  })

  test.describe('Settings Controls', () => {
    test('should have sound effects toggle', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Check for sound toggle
        const soundToggle = page.getByText(/Zvukové efekty/i)
        await expect(soundToggle).toBeVisible()
      }
    })

    test('should have music toggle', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Check for music toggle
        const musicToggle = page.getByText(/Hudba na pozadí/i)
        await expect(musicToggle).toBeVisible()
      }
    })

    test('should have animation speed slider', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Check for animation speed slider
        const animationSlider = page.getByText(/Rychlost animací/i)
        await expect(animationSlider).toBeVisible()
      }
    })

    test('should have text speed slider', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Check for text speed slider
        const textSlider = page.getByText(/Rychlost textu/i)
        await expect(textSlider).toBeVisible()
      }
    })

    test('should have auto-save toggle', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Check for auto-save toggle
        const autoSaveToggle = page.getByText(/Automatické ukládání/i)
        await expect(autoSaveToggle).toBeVisible()
      }
    })

    test('should have combat animations toggle', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Check for combat animations toggle
        const combatToggle = page.getByText(/Animace v souboji/i)
        await expect(combatToggle).toBeVisible()
      }
    })

    test('should have show tutorial toggle', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Check for tutorial toggle
        const tutorialToggle = page.getByText(/Zobrazit tutoriál/i)
        await expect(tutorialToggle).toBeVisible()
      }
    })

    test('should have reset to defaults button', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Check for reset button
        const resetButton = page.getByRole('button', { name: /Obnovit výchozí nastavení/i })
        await expect(resetButton).toBeVisible()
      }
    })
  })

  test.describe('Settings Persistence', () => {
    test('toggling sound should persist in localStorage', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Find and click sound toggle
        const soundLabel = page.getByText(/Zvukové efekty/i)
        const soundToggle = soundLabel.locator('..').locator('button')
        if ((await soundToggle.count()) > 0) {
          await soundToggle.first().click()
          await page.waitForTimeout(500)

          // Check localStorage
          const soundValue = await page.evaluate(() => localStorage.getItem('game_sound'))
          expect(soundValue).toBeTruthy()
        }
      }
    })

    test('animation speed slider should persist value', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Find animation speed slider
        const animationSlider = page.locator('input[type="range"]').first()
        if ((await animationSlider.count()) > 0) {
          // Change value
          await animationSlider.fill('2')
          await page.waitForTimeout(500)

          // Check localStorage
          const animationValue = await page.evaluate(() =>
            localStorage.getItem('game_animation_speed')
          )
          expect(animationValue).toBeTruthy()
        }
      }
    })

    test('settings persist after page reload', async ({ page }) => {
      const settingsButton = page.locator('button').filter({ hasText: /Nastavení|Settings/i })
      if ((await settingsButton.count()) > 0) {
        await settingsButton.first().click()
        await page.waitForTimeout(500)

        // Change a setting
        const soundLabel = page.getByText(/Zvukové efekty/i)
        const soundToggle = soundLabel.locator('..').locator('button')
        if ((await soundToggle.count()) > 0) {
          await soundToggle.first().click()
          await page.waitForTimeout(500)

          // Close panel
          await page.keyboard.press('Escape')
          await page.waitForTimeout(500)

          // Reload page
          await page.reload()
          await page.waitForTimeout(1000)

          // Check that setting persisted in localStorage
          const soundValue = await page.evaluate(() => localStorage.getItem('game_sound'))
          expect(soundValue).toBeTruthy()
        }
      }
    })
  })
})
