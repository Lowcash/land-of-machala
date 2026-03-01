import { expect, test } from '@playwright/test'

test.describe('Visual Regression', () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test('Origins Page should match snapshot', async ({ page }) => {
    await page.goto('http://localhost:3000/en/origins')

    // Skip tutorial if present
    const skipButton = page.getByRole('button', { name: /skip/i })
    if (await skipButton.isVisible()) {
      await skipButton.click()
    }

    // Wait for animations to settle
    await page.waitForTimeout(1000)

    // In a real environment, we would use toHaveScreenshot()
    // For this demo, we can just check if an element exists and then "move it"
    await expect(page.getByText(/Create Your Hero/i)).toBeVisible()

    // We'll use this to demonstrate failure in the next step
    const statsCard = page.locator('section').filter({ hasText: /Stats/i })
    await expect(statsCard).toBeVisible()
  })
})
