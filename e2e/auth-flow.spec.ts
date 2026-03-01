import { expect, test } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should navigate between login and register', async ({ page }) => {
    // Start at login
    await page.goto('/en/login')
    await expect(page.getByRole('heading', { name: /land of machala/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /enter the world/i })).toBeVisible()

    // Navigate to register
    await page.getByRole('button', { name: /join the realm/i }).click()
    await page.waitForURL('**/register')
    await expect(page).toHaveURL(/.*\/register/)
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible()

    // Navigate back to login
    await page.getByRole('link', { name: /login here/i }).click()
    await page.waitForURL('**/login')
    await expect(page).toHaveURL(/.*\/login/)
  })

  test('should show validation errors on login', async ({ page }) => {
    await page.goto('/en/login')

    // Submit empty form
    await page.getByRole('button', { name: /enter the world/i }).click()

    // Check for validation messages (using text from en.json)
    await expect(page.getByText(/enter a valid email/i)).toBeVisible()
    await expect(page.getByText(/password is required/i)).toBeVisible()
  })

  test('should show validation errors on register', async ({ page }) => {
    await page.goto('/en/register')

    // Submit empty form
    await page.getByRole('button', { name: /create account/i }).click()

    // Check for validation messages
    await expect(page.getByText(/enter a valid email/i)).toBeVisible()
    await expect(page.getByText(/password must be at least 6 characters/i)).toBeVisible()
    await expect(page.getByText(/password is required/i)).toBeVisible()
  })

  test('should allow "Guest" access to origins', async ({ page }) => {
    await page.goto('/en/login')

    // Click Guest button
    await page.getByRole('button', { name: /try as guest/i }).click()

    // Wait for navigation
    await page.waitForURL('**/origins')
    await expect(page).toHaveURL(/.*\/origins/)
  })
})
