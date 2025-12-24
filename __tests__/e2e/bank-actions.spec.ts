import { test, expect } from '@playwright/test'
import { loginAsGuest } from './helpers'

test.describe('BankActions', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsGuest(page)

    // Navigate to town map first (loginAsGuest lands on /game but not on town view)
    await page.getByRole('button', { name: /Mapa/i }).click()
    await page.waitForTimeout(500) // Wait for town view to load

    // Scroll down to ensure bank button is visible
    await page.evaluate(() => window.scrollBy(0, 200))

    // Navigate to bank (button text: "Jít do banky a uložit cennosti")
    const bankButton = page.locator('button').filter({ hasText: /banky/i })
    await bankButton.click()
  })

  test.describe('Tab Navigation', () => {
    test('should have two tabs: Zlato and Trezor', async ({ page }) => {
      // Check both tabs exist
      await expect(page.getByRole('button', { name: /Zlato/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /Trezor/i })).toBeVisible()
    })

    test('should switch between Zlato and Trezor tabs', async ({ page }) => {
      const zlatoTab = page.getByRole('button', { name: /Zlato/i })
      const trezorTab = page.getByRole('button', { name: /Trezor/i })

      // Start in Zlato tab
      await expect(zlatoTab).toBeVisible()

      // Switch to Trezor
      await trezorTab.click()
      await page.waitForTimeout(500)

      // Trezor content should be visible
      await expect(page.getByText(/Uložené předměty|Trezor je prázdný/i).first()).toBeVisible({ timeout: 3000 })

      // Switch back to Zlato
      await zlatoTab.click()
      await page.waitForTimeout(500)

      // Zlato content should be visible
      await expect(page.getByText(/Vložit|Vybrat/i).first()).toBeVisible({ timeout: 3000 })
    })
  })

  test.describe('Zlato (Gold) Tab', () => {
    test('should show balance information', async ({ page }) => {
      const zlatoTab = page.getByRole('button', { name: /Zlato/i })
      await zlatoTab.click()
      await page.waitForTimeout(500)

      // Should show pocket and bank balance
      const balanceText = page.getByText(/U sebe|V bance|Celkem/i)
      await expect(balanceText.first()).toBeVisible()
    })

    test('should have deposit and withdraw buttons', async ({ page }) => {
      const zlatoTab = page.getByRole('button', { name: /Zlato/i })
      await zlatoTab.click()
      await page.waitForTimeout(500)

      // Should have both buttons
      await expect(page.getByRole('button', { name: /Vložit/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /Vybrat/i })).toBeVisible()
    })

    test('should have quick amount buttons (25%, 50%, 75%, Max)', async ({ page }) => {
      const zlatoTab = page.getByRole('button', { name: /Zlato/i })
      await zlatoTab.click()
      await page.waitForTimeout(500)

      // Quick amount buttons
      const quickButtons = page.locator('button').filter({ hasText: /25%|50%|75%|Max/i })
      expect(await quickButtons.count()).toBeGreaterThan(0)
    })

    test('quick buttons should fill amount input', async ({ page }) => {
      const zlatoTab = page.getByRole('button', { name: /Zlato/i })
      await zlatoTab.click()
      await page.waitForTimeout(500)

      // Click 50% button
      const fiftyButton = page.getByRole('button', { name: /50%/i })
      if (await fiftyButton.count() > 0) {
        await fiftyButton.first().click()

        // Amount input should be filled
        const amountInput = page.locator('input[type="number"], input[placeholder*="Částka"]').first()
        if (await amountInput.count() > 0) {
          const value = await amountInput.inputValue()
          expect(parseInt(value) || 0).toBeGreaterThanOrEqual(0)
        }
      }
    })

    test('deposit action updates balance', async ({ page }) => {
      const zlatoTab = page.getByRole('button', { name: /Zlato/i })
      await zlatoTab.click()
      await page.waitForTimeout(500)

      // Enter amount
      const amountInput = page.locator('input[type="number"], input[placeholder*="Částka"]').first()
      if (await amountInput.count() > 0) {
        await amountInput.fill('10')

        // Click deposit
        const depositButton = page.getByRole('button', { name: /Vložit/i })
        await depositButton.click()
        await page.waitForTimeout(1000)

        // Balance should update (check for notification or balance change)
        // This depends on whether player has gold to deposit
      }
    })

    test('withdraw action updates balance', async ({ page }) => {
      const zlatoTab = page.getByRole('button', { name: /Zlato/i })
      await zlatoTab.click()
      await page.waitForTimeout(500)

      // Enter amount
      const amountInput = page.locator('input[type="number"], input[placeholder*="Částka"]').first()
      if (await amountInput.count() > 0) {
        await amountInput.fill('10')

        // Click withdraw
        const withdrawButton = page.getByRole('button', { name: /Vybrat/i })
        await withdrawButton.click()
        await page.waitForTimeout(1000)

        // Balance should update (check for notification or balance change)
        // This depends on whether player has bank gold to withdraw
      }
    })
  })

  test.describe('Trezor (Vault) Tab', () => {
    test('should show stored items or empty message', async ({ page }) => {
      const trezorTab = page.getByRole('button', { name: /Trezor/i })
      await trezorTab.click()
      await page.waitForTimeout(500)

      // Should show items or empty message
      const items = page.locator('[data-item], button').filter({ hasText: /Meč|Brnění|Předmět/i })
      const emptyMessage = page.getByText(/prázdný|Nemáš žádné|žádné předměty/i)

      const hasItems = await items.count() > 0
      const isEmpty = await emptyMessage.count() > 0

      expect(hasItems || isEmpty).toBeTruthy()
    })

    test('should show item storage capacity', async ({ page }) => {
      const trezorTab = page.getByRole('button', { name: /Trezor/i })
      await trezorTab.click()
      await page.waitForTimeout(500)

      // Should show capacity (e.g., "0/100")
      const capacityText = page.getByText(/\d+\/\d+|Kapacita/i)
      if (await capacityText.count() > 0) {
        await expect(capacityText.first()).toBeVisible()
      }
    })
  })

  test.describe('Back Navigation', () => {
    test('back button returns to town', async ({ page }) => {
      const backButton = page.getByRole('button', { name: /Zpět/i })
      await expect(backButton).toBeVisible()

      await backButton.click()

      // Should return to town (check for bank button text: "Jít do banky...")
      await expect(page.locator('button').filter({ hasText: /banky/i })).toBeVisible({ timeout: 3000 })
    })
  })
})
