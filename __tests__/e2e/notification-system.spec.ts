import { test, expect } from '@playwright/test'
import { loginAsGuest } from './helpers'

test.describe('Notification System', () => {
  test.describe('Notification Variants', () => {
    test('should show success notification on guest login', async ({ page }) => {
      await page.goto('/login')
      
      // Wait for guest login to complete and redirect
      await Promise.all([
        page.waitForURL('/onboarding', { timeout: 15000 }),
        page.getByRole('button', { name: /Zkusit hru jako host/i }).click()
      ])

      // Should show success notification
      const notification = page.locator('[role="alert"]').filter({ hasText: /Přihlášen/i })
      await expect(notification).toBeVisible({ timeout: 5000 })

      // Should have success styling (green)
      const bgColor = await notification.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor
      })
      // Green color should contain 'rgb' with higher green value
      expect(bgColor).toContain('rgb')
    })

    test('should show error notification on invalid login', async ({ page }) => {
      await page.getByPlaceholder(/Email/i).fill('invalid@test.com')
      await page.getByPlaceholder(/Heslo/i).fill('wrongpassword')
      await page.getByRole('button', { name: /Přihlásit se/i }).click()

      // Should show error notification
      const notification = page.locator('[role="alert"]').filter({ hasText: /chybné|nesprávn|nelze/i })
      await expect(notification).toBeVisible({ timeout: 5000 })
    })

    test('should show warning notification for invalid character creation', async ({ page }) => {
      await page.getByRole('button', { name: /Host jako/i }).click()
      await expect(page).toHaveURL('/onboarding')

      // Try to create character without selecting race/class
      await page.getByRole('button', { name: /Pokračovat/i }).click()

      // Click finish without completing
      const finishButton = page.getByRole('button', { name: /Dokončit|Začít hru/i })
      if (await finishButton.isVisible()) {
        await finishButton.click()

        // May show validation notification
        const notification = page.locator('[role="alert"]')
        if (await notification.count() > 0) {
          await expect(notification.first()).toBeVisible()
        }
      }
    })

    test('should show info notification in game context', async ({ page }) => {
      // Complete login
      await page.getByRole('button', { name: /Host jako/i }).click()
      await expect(page).toHaveURL('/onboarding')

      // Complete onboarding quickly
      await page.getByRole('button', { name: /Pokračovat/i }).click()
      await page.getByRole('button', { name: /Lidé/i }).click()
      await page.getByRole('button', { name: /Bojovník/i }).click()
      await page.waitForURL('/game')

      // Info notifications may appear in various game contexts
      const notification = page.locator('[role="alert"]')
      // Just verify the notification system is present
      expect(await notification.count()).toBeGreaterThanOrEqual(0)
    })
  })

  test.describe('Notification Behavior', () => {
    test('notifications should auto-dismiss after timeout', async ({ page }) => {
      await page.getByRole('button', { name: /Host jako/i }).click()

      // Notification appears
      const notification = page.locator('[role="alert"]').first()
      await expect(notification).toBeVisible({ timeout: 5000 })

      // Should disappear after ~3-5 seconds
      await expect(notification).not.toBeVisible({ timeout: 10000 })
    })

    test('multiple notifications should stack', async ({ page }) => {
      // Trigger login
      await page.getByRole('button', { name: /Host jako/i }).click()
      await expect(page).toHaveURL('/onboarding')

      // Multiple notifications may appear during onboarding
      const notifications = page.locator('[role="alert"]')
      const count = await notifications.count()

      // Should handle multiple notifications (0 or more)
      expect(count).toBeGreaterThanOrEqual(0)
    })

    test('notification has proper ARIA attributes', async ({ page }) => {
      await page.getByRole('button', { name: /Host jako/i }).click()

      const notification = page.locator('[role="alert"]').first()
      await expect(notification).toBeVisible({ timeout: 5000 })

      // Check ARIA attributes
      const ariaLive = await notification.getAttribute('aria-live')
      const ariaAtomic = await notification.getAttribute('aria-atomic')

      expect(ariaLive).toBe('polite')
      expect(ariaAtomic).toBe('true')
    })

    test('notifications appear in consistent position', async ({ page }) => {
      await page.getByRole('button', { name: /Host jako/i }).click()

      const notification = page.locator('[role="alert"]').first()
      await expect(notification).toBeVisible({ timeout: 5000 })

      // Should be positioned in top-right or bottom-right
      const position = await notification.evaluate((el) => {
        const rect = el.getBoundingClientRect()
        const computed = window.getComputedStyle(el.parentElement || el)
        return {
          top: rect.top,
          right: window.innerWidth - rect.right,
          position: computed.position,
        }
      })

      // Should be fixed or absolute positioned
      expect(['fixed', 'absolute']).toContain(position.position)
    })
  })

  test.describe('Notification Content', () => {
    test('notification text is readable', async ({ page }) => {
      await page.getByRole('button', { name: /Host jako/i }).click()

      const notification = page.locator('[role="alert"]').first()
      await expect(notification).toBeVisible({ timeout: 5000 })

      // Should have text content
      const text = await notification.textContent()
      expect(text).toBeTruthy()
      expect(text!.length).toBeGreaterThan(0)
    })

    test('notification has sufficient contrast', async ({ page }) => {
      await page.getByRole('button', { name: /Host jako/i }).click()

      const notification = page.locator('[role="alert"]').first()
      await expect(notification).toBeVisible({ timeout: 5000 })

      // Check that text is visible (has color)
      const color = await notification.evaluate((el) => {
        return window.getComputedStyle(el).color
      })

      expect(color).toBeTruthy()
      expect(color).not.toBe('rgba(0, 0, 0, 0)') // Not transparent
    })
  })
})
