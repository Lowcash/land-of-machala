import { test, expect } from '@playwright/test'

test.describe('Origins Flow', () => {
  test.use({ baseURL: 'http://localhost:3000' })

  test('should complete the origins flow from tutorial to creation', async ({ page }) => {
    // 1. Go to the start of the app
    await page.goto('/')

    // Wait for the page to load (checking for a recognizable element)
    // We assume the tutorial phase is shown first
    const skipButton = page.getByRole('button', { name: /skip/i })
    if (await skipButton.isVisible()) {
      await skipButton.click()
    }

    // 2. Creation Phase: Select a race
    // We use a more specific selector if possible to avoid ".first()" issues
    const raceButton = page.getByRole('button', { name: /^elf$/i })
    await raceButton.click()

    // 3. SelectionDetails should update (check for Elf name in details)
    // SelectionDetails usually has the name in a heading or prominent text
    await expect(page.getByText(/elf/i)).toBeVisible()

    // 4. Select a class
    const classButton = page.getByRole('button', { name: /^mage$/i })
    await classButton.click()

    // 5. Enter a name
    const nameInput = page.getByPlaceholder(/hero name/i)
    await nameInput.fill('Test Hero')

    // 6. Finish Button should be enabled and clickable
    // "Enter World" or "Begin Adventure" based on uiLabels
    const finishButton = page.getByRole('button', { name: /(enter world|begin adventure)/i })
    await expect(finishButton).toBeEnabled()
    await finishButton.click()

    // 7. Should redirect to home or dashboard
    await expect(page).toHaveURL('/')
  })
})
