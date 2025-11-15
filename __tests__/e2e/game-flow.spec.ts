import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('should display sign in form', async ({ page }) => {
    await page.goto('/')

    // Check for email and password inputs
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()

    // Check for sign in button
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('should show validation errors on empty submit', async ({ page }) => {
    await page.goto('/')

    // Try to submit empty form
    await page.getByRole('button', { name: /sign in/i }).click()

    // Should show validation errors (Zod schema validation)
    // Note: Exact error messages depend on your i18n setup
    await expect(page.locator('text=/required/i')).toBeVisible({ timeout: 3000 })
  })
})

test.describe('Character Creation', () => {
  test.skip('should create character after sign up', async () => {
    // TODO: Implement after setting up test database
    // 1. Sign up with test account
    // 2. Fill character creation form
    // 3. Verify redirected to game world
  })
})

test.describe('Game World', () => {
  test.skip('should allow character movement', async () => {
    // TODO: Implement after authentication setup
    // 1. Login with test account
    // 2. Click movement buttons
    // 3. Verify position updates
  })
})
