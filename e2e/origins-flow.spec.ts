import { expect, test } from '@playwright/test'

test.describe('Origins Flow', () => {
  test.use({ baseURL: 'http://localhost:3000', viewport: { width: 1280, height: 720 } })

  test('should complete the origins flow from tutorial to creation', async ({ page }) => {
    // 1. Go to the start of the app
    await page.goto('/en/origins')
    await page.waitForLoadState('networkidle')

    // 2. Tutorial Phase: Skip to get to creation
    // Use a more permissive regex for either English or Czech skip button
    const skipButton = page
      .locator('button')
      .filter({ hasText: /(Skip|Přeskočit)/i })
      .first()
    await skipButton.waitFor({ state: 'attached', timeout: 10000 })
    await skipButton.click()

    // Wait for the creation phase title to appear (use regex for either English or Czech)
    await expect(page.getByRole('heading', { name: /(Origin|hrdinu)/i })).toBeVisible({
      timeout: 10000,
    })

    const raceButton = page.getByRole('button', { name: /(Elf|Elfové)/i }).first()
    await raceButton.click()

    // 3. SelectionDetails should update
    await expect(page.getByText(/(Elf|Elfové)/i).first()).toBeVisible()

    // 4. Select a class
    const classButton = page.getByRole('button', { name: /(Mage|Mág)/i }).first()
    await classButton.click()

    // 5. Enter a name
    const nameInput = page.getByPlaceholder(/(name|Jméno)/i)
    await nameInput.fill('Test Hero')

    // 6. Finish Button should be enabled and clickable
    const finishButton = page
      .locator('button')
      .filter({ hasText: /(World|světa)/i })
      .filter({ visible: true })
      .first()
    await expect(finishButton).toBeEnabled({ timeout: 10000 })
    await finishButton.click()

    // 7. Should redirect to home or dashboard
    await expect(page).toHaveURL('/')
  })

  test('should require all fields before enabling the finish button', async ({ page }) => {
    await page.goto('/en/origins')
    await page.waitForLoadState('networkidle')

    const skipButton = page
      .locator('button')
      .filter({ hasText: /(Skip|Přeskočit)/i })
      .first()
    await skipButton.waitFor({ state: 'attached', timeout: 10000 })
    await skipButton.click()

    await expect(page.getByRole('heading', { name: /(Origin|hrdinu)/i })).toBeVisible({
      timeout: 10000,
    })

    const finishButton = page
      .locator('button')
      .filter({ hasText: /(World|světa)/i })
      .filter({ visible: true })
      .first()

    // Initially disabled
    await expect(finishButton).toBeVisible()
    await expect(finishButton).toBeDisabled()

    await page
      .getByRole('button', { name: /(Elf|Elfové)/i })
      .first()
      .click()
    await expect(finishButton).toBeDisabled()

    await page
      .getByRole('button', { name: /(Mage|Mág)/i })
      .first()
      .click()
    await expect(finishButton).toBeDisabled()

    await page.getByPlaceholder(/(name|Jméno)/i).fill('Test Hero')
    await expect(finishButton).toBeEnabled()
  })

  test('should support quick randomization', async ({ page }) => {
    await page.goto('/en/origins')
    await page.waitForLoadState('networkidle')

    const skipButton = page
      .locator('button')
      .filter({ hasText: /(Skip|Přeskočit)/i })
      .first()
    await skipButton.waitFor({ state: 'attached', timeout: 10000 })
    await skipButton.click()

    await expect(page.getByRole('heading', { name: /(Origin|hrdinu)/i })).toBeVisible({
      timeout: 10000,
    })

    // Click the randomize button (matching both English and Czech labels/classes)
    const randomizeButton = page
      .locator('button')
      .filter({ hasText: /(Randomize|Náhodně)/i })
      .filter({ visible: true })
      .first()
    await randomizeButton.click()

    // Verify name is filled
    const nameInput = page.getByPlaceholder(/(name|Jméno)/i)
    await expect(nameInput).not.toBeEmpty()

    // Verify Finish is enabled
    const finishButton = page
      .locator('button')
      .filter({ hasText: /(World|světa)/i })
      .filter({ visible: true })
      .first()
    await expect(finishButton).toBeEnabled()
  })
})
