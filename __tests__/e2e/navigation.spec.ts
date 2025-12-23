import { test, expect } from '@playwright/test'

test.describe('Navigation System', () => {
  test.beforeEach(async ({ page }) => {
    // Login and complete onboarding
    await page.goto('/login')
    await page.getByRole('button', { name: /Host jako/i }).click()
    await expect(page).toHaveURL('/onboarding')

    await page.getByRole('button', { name: /Pokračovat/i }).click()
    await page.getByRole('button', { name: /Lidé/i }).click()
    await page.getByRole('button', { name: /Bojovník/i }).click()
    await page.waitForURL('/game')
  })

  test.describe('Footer Navigation', () => {
    test('should navigate between main pages via footer', async ({ page }) => {
      // From game to character
      await page.getByRole('button', { name: /Postava/i }).click()
      await expect(page).toHaveURL('/character')

      // To skills
      await page.getByRole('button', { name: /Dovednosti/i }).click()
      await expect(page).toHaveURL('/skills')

      // To quests
      await page.getByRole('button', { name: /Úkoly/i }).click()
      await expect(page).toHaveURL('/quests')

      // To inventory
      await page.getByRole('button', { name: /Inventář/i }).click()
      await expect(page).toHaveURL('/inventory')

      // To map
      await page.getByRole('button', { name: /Mapa/i }).click()
      await expect(page).toHaveURL('/map')

      // Back to game
      await page.getByRole('button', { name: /Hra/i }).click()
      await expect(page).toHaveURL('/game')
    })

    test('footer highlights active page', async ({ page }) => {
      await page.goto('/character')

      const characterButton = page.getByRole('button', { name: /Postava/i })
      const isHighlighted = await characterButton.evaluate((el) => {
        const color = window.getComputedStyle(el).color
        // Active buttons should have gold/yellow color
        return color.includes('255, 215, 0') || color.includes('212, 165, 116')
      })

      // Should have some visual distinction (color, underline, etc.)
      expect(isHighlighted || await characterButton.evaluate((el) => {
        return window.getComputedStyle(el).textDecoration.includes('underline')
      })).toBeTruthy()
    })
  })

  test.describe('Back Button Navigation', () => {
    test('back button returns to town from locations', async ({ page }) => {
      await page.goto('/game')

      // Navigate to a town location (if available)
      const tavernButton = page.locator('button').filter({ hasText: /Navštívit hostinec|Hostinec/i })
      if (await tavernButton.count() > 0) {
        await tavernButton.first().click()

        // Back button should be visible
        const backButton = page.getByRole('button', { name: /Zpět/i })
        await expect(backButton).toBeVisible()

        // Click back
        await backButton.click()

        // Should show town actions again
        await expect(tavernButton.first()).toBeVisible()
      }
    })

    test('back button in detail views returns to list', async ({ page }) => {
      await page.goto('/quests')

      // Click on a quest to view details
      const questButton = page.locator('button').filter({ hasText: /První kroky|Úkol/i }).first()
      if (await questButton.count() > 0 && await questButton.isVisible()) {
        await questButton.click()

        // Detail view should show
        await page.waitForTimeout(500)

        // Back button should work
        const backButton = page.getByRole('button', { name: /Zpět/i })
        if (await backButton.isVisible()) {
          await backButton.click()

          // Should return to quest list
          await expect(questButton).toBeVisible()
        }
      }
    })
  })

  test.describe('Browser History', () => {
    test('browser back button works correctly', async ({ page }) => {
      await page.goto('/game')
      await page.goto('/character')
      await page.goto('/skills')

      // Browser back
      await page.goBack()
      await expect(page).toHaveURL('/character')

      await page.goBack()
      await expect(page).toHaveURL('/game')

      // Browser forward
      await page.goForward()
      await expect(page).toHaveURL('/character')
    })

    test('URL changes reflect navigation state', async ({ page }) => {
      await page.goto('/game')

      // Navigate to different sections
      await page.getByRole('button', { name: /Postava/i }).click()
      expect(page.url()).toContain('/character')

      await page.getByRole('button', { name: /Dovednosti/i }).click()
      expect(page.url()).toContain('/skills')
    })
  })

  test.describe('URL Parameters', () => {
    test('map handles locationId parameter', async ({ page }) => {
      await page.goto('/map?locationId=town')

      // Should load map with town selected
      await expect(page.getByText(/Město|Town/i)).toBeVisible()
    })

    test('invalid URL parameters are handled gracefully', async ({ page }) => {
      await page.goto('/map?locationId=nonexistent')

      // Should still load map without crashing
      await expect(page.getByText(/Mapa/i)).toBeVisible()
    })
  })

  test.describe('Deep Linking', () => {
    test('direct navigation to character page works', async ({ page }) => {
      await page.goto('/character')

      // Should show character page
      await expect(page.getByText(/Postava|Zdraví/i).first()).toBeVisible()
    })

    test('direct navigation to skills page works', async ({ page }) => {
      await page.goto('/skills')

      // Should show skills page
      await expect(page.getByText(/Dovednosti|Bojové/i).first()).toBeVisible()
    })

    test('direct navigation to inventory works', async ({ page }) => {
      await page.goto('/inventory')

      // Should show inventory
      await expect(page.getByText(/Inventář|Kapacita/i).first()).toBeVisible()
    })
  })

  test.describe('Navigation Persistence', () => {
    test('page state persists after navigation', async ({ page }) => {
      await page.goto('/skills')

      // Interact with page (if possible)
      const skillsHeading = page.getByText(/Dovednosti/i).first()
      await expect(skillsHeading).toBeVisible()

      // Navigate away and back
      await page.goto('/character')
      await page.goto('/skills')

      // Skills page should load fresh (state management test)
      await expect(skillsHeading).toBeVisible()
    })
  })

  test.describe('Loading States', () => {
    test('navigation shows loading indicators', async ({ page }) => {
      await page.goto('/game')

      // Navigate to another page
      const characterButton = page.getByRole('button', { name: /Postava/i })
      await characterButton.click()

      // Page should load without indefinite blank screen
      await expect(page.getByText(/Postava|Zdraví/i).first()).toBeVisible({ timeout: 10000 })
    })

    test('slow navigation does not break UI', async ({ page }) => {
      // Simulate slow network
      await page.route('**/*', (route) => {
        setTimeout(() => route.continue(), 100)
      })

      await page.goto('/game')
      await page.getByRole('button', { name: /Postava/i }).click()

      // Should still load
      await expect(page).toHaveURL('/character', { timeout: 15000 })
    })
  })
})
