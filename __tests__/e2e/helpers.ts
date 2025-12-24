import type { Page } from '@playwright/test'

/**
 * Complete guest login flow - handles both new users (→onboarding) and returning users (→game)
 * Creates a new guest account, logs in, and completes onboarding if needed
 */
export async function loginAsGuest(page: Page) {
  await page.goto('/login')

  // Click guest button
  await page.getByRole('button', { name: /Zkusit hru jako host/i }).click()

  // Wait for redirect - could be either /onboarding or /game
  await page.waitForURL(/\/(onboarding|game)/, { timeout: 30000 })

  // If redirected to onboarding, complete character creation
  if (page.url().includes('/onboarding')) {
    // Skip intro (important - avoids tutorial!)
    await page.getByRole('button', { name: 'Přeskočit úvod (Jsem zkušený hráč)' }).click()

    // Fill character name
    await page.getByPlaceholder('Zadej jméno...').fill('Test Hero')

    // Select Race (Trpaslík - good balanced choice for tests)
    await page.getByRole('button', { name: 'Trpaslík' }).click()

    // Select Class (Paladin - balanced class for tests)
    await page.getByRole('button', { name: 'Paladin' }).click()

    // Create character and enter game
    await page.getByRole('button', { name: 'Vstoupit do hry' }).click()
    await page.waitForURL('/game', { timeout: 15000 })
  }

  // Now on /game - ready for testing
}

/**
 * Login as guest and ensure we're on a specific page
 */
export async function loginAsGuestAndGoTo(page: Page, path: string) {
  await loginAsGuest(page)
  await page.goto(path)
  await page.waitForLoadState('networkidle')
}
