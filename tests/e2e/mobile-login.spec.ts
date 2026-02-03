import { expect, test } from '@playwright/test'

test.describe('Mobile Login View', () => {
  test.use({ viewport: { width: 375, height: 667 } }) // iPhone SE size

  test('hides stats column on mobile', async ({ page }) => {
    await page.goto('/login')

    // The stats column has text "Statistiky serveru"
    const statsHeader = page.getByText('Statistiky serveru')
    await expect(statsHeader).toBeHidden()
  })

  test('shows login form and buttons on mobile', async ({ page }) => {
    await page.goto('/login')

    // Login form elements
    await expect(page.getByPlaceholder('Zadej jméno...')).toBeVisible()

    // New buttons inside the form card
    await expect(
      page.getByRole('button', { name: 'Zkusit hru jako host (bez registrace)' })
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Vytvořit nový účet' })).toBeVisible()
  })
})

test.describe('Desktop Login View', () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test('shows stats column on desktop', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Statistiky serveru')).toBeVisible()
  })
})
