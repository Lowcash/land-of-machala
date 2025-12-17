import { expect, test } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/login/)
  })

  test('shows login form', async ({ page }) => {
    await page.goto('/login')

    await expect(page.getByRole('heading', { name: 'Land of Machala' })).toBeVisible()
    await expect(page.getByPlaceholder('Zadej email...')).toBeVisible()
    await expect(page.getByPlaceholder('Zadej heslo...')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Přihlásit se' })).toBeVisible()
  })

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.getByPlaceholder('Zadej email...').fill('invalid@example.com')
    await page.getByPlaceholder('Zadej heslo...').fill('wrongpassword')
    await page.getByRole('button', { name: 'Přihlásit se' }).click()

    await expect(page.getByText('Neplatný email nebo heslo')).toBeVisible()
  })
})

test.describe('Protected Routes', () => {
  test('game page requires authentication', async ({ page }) => {
    await page.goto('/game')
    await expect(page).toHaveURL(/\/login/)
  })
})
