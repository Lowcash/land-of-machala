import { test, expect } from '@playwright/test'

test.describe('Origins Flow', () => {
  test.use({ baseURL: 'http://localhost:3000' })

  test('should complete the origins flow from tutorial to creation', async ({ page }) => {
    // 1. Go to the start of the app
    await page.goto('/en/origins')

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

  test('should require all fields before enabling the finish button', async ({ page }) => {
    await page.goto('/en/origins')
    
    const skipButton = page.getByRole('button', { name: /skip/i })
    if (await skipButton.isVisible()) {
      await skipButton.click()
    }

    const finishButton = page.getByRole('button', { name: /(enter world|begin adventure)/i })
    
    // Initially disabled
    await expect(finishButton).toBeDisabled()

    // Select race, still disabled
    await page.getByRole('button', { name: /^elf$/i }).click()
    await expect(finishButton).toBeDisabled()

    // Select class, still disabled
    await page.getByRole('button', { name: /^mage$/i }).click()
    await expect(finishButton).toBeDisabled()

    // Fill name, now enabled
    await page.getByPlaceholder(/hero name/i).fill('Test Hero')
    await expect(finishButton).toBeEnabled()
  })

  test('should support quick randomization', async ({ page }) => {
    await page.goto('/en/origins')
    
    const skipButton = page.getByRole('button', { name: /skip/i })
    if (await skipButton.isVisible()) {
      await skipButton.click()
    }

    // Click the randomize button (icon button inside CharacterIdentity)
    // We can find it by its accessibility name or just assuming it's the only secondary/ghost button near the name input
    const randomizeButton = page.getByRole('button', { name: /randomize/i })
    await randomizeButton.click()

    // Verify name is filled
    const nameInput = page.getByPlaceholder(/hero name/i)
    await expect(nameInput).not.toBeEmpty()

    // Verify Finish is enabled (since it randomizes everything)
    const finishButton = page.getByRole('button', { name: /(enter world|begin adventure)/i })
    await expect(finishButton).toBeEnabled()
  })
})
