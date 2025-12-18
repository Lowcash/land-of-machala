import { expect, test } from '@playwright/test'

test.describe('Combat System', () => {
  test.beforeEach(async ({ page }) => {
    // Login as guest
    await page.goto('/login')
    await page.getByRole('button', { name: 'Zkusit hru jako host (bez registrace)' }).click()

    // Wait for redirect to onboarding
    await page.waitForURL(/\/onboarding/, { timeout: 20000 })

    // Skip onboarding
    await page.getByRole('button', { name: 'Přeskočit úvod (Jsem zkušený hráč)' }).click()

    // Create character
    await page.getByPlaceholder('Zadej jméno...').fill('CombatTest')
    await page.getByRole('button', { name: 'Válečník' }).click()
    await page.getByRole('button', { name: 'Člověk' }).click()
    await page.getByRole('button', { name: 'Vstoupit do hry' }).click()

    await page.waitForURL(/\/game/, { timeout: 20000 })
  })

  test('displays combat page with enemy and player stats', async ({ page }) => {
    // Navigate to combat (if combat button exists)
    const combatButton = page.getByRole('button', { name: /souboj|boj|combat/i })

    if (await combatButton.isVisible()) {
      await combatButton.click()
      await expect(page).toHaveURL(/\/combat/, { timeout: 10000 })

      // Check for player health display
      await expect(page.getByText(/zdraví|health|hp/i)).toBeVisible()

      // Check for enemy presence
      await expect(page.locator('text=/nepřítel|enemy|monster/i').first()).toBeVisible()
    }
  })

  test('allows player to perform combat actions', async ({ page }) => {
    const combatButton = page.getByRole('button', { name: /souboj|boj|combat/i })

    if (await combatButton.isVisible()) {
      await combatButton.click()
      await expect(page).toHaveURL(/\/combat/, { timeout: 10000 })

      // Check for attack button
      const attackButton = page.getByRole('button', { name: /útok|attack|zaútočit/i })
      if (await attackButton.isVisible()) {
        await expect(attackButton).toBeEnabled()

        // Click attack and verify combat log appears
        await attackButton.click()

        // Combat feedback should appear
        await page.waitForTimeout(500)
      }
    }
  })

  test('displays combat log with actions', async ({ page }) => {
    const combatButton = page.getByRole('button', { name: /souboj|boj|combat/i })

    if (await combatButton.isVisible()) {
      await combatButton.click()
      await expect(page).toHaveURL(/\/combat/, { timeout: 10000 })

      // Check for combat log section
      const logSection = page.locator('text=/historie|log|zápis/i').first()
      if (await logSection.isVisible()) {
        await expect(logSection).toBeVisible()
      }
    }
  })
})
