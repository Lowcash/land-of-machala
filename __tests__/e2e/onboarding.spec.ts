import { expect, test } from '@playwright/test'

test.describe('Onboarding Flow', () => {
  test('completes character creation', async ({ page }) => {
    // 1. Login as guest
    await page.goto('/login')
    
    // Click guest button and wait for navigation
    await Promise.all([
      page.waitForURL(/\/onboarding/, { timeout: 30000 }),
      page.getByRole('button', { name: 'Zkusit hru jako host (bez registrace)' }).click()
    ])

    // 3. Skip intro
    await page.getByRole('button', { name: 'Přeskočit úvod (Jsem zkušený hráč)' }).click()

    // 4. Fill character details
    await page.getByPlaceholder('Zadej jméno...').fill('Test Hero')

    // Select Race (Trpaslík)
    await page.getByRole('button', { name: 'Trpaslík' }).click()

    // Select Class (Paladin)
    await page.getByRole('button', { name: 'Paladin' }).click()

    // 5. Create character
    await page.getByRole('button', { name: 'Vstoupit do hry' }).click()

    // 6. Expect redirect to game
    await expect(page).toHaveURL(/\/game/)

    // 7. Verify character name is displayed
    await expect(page.getByRole('heading', { name: 'Test Hero' })).toBeVisible()
  })
})
