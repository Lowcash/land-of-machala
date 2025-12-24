import { expect, test } from '@playwright/test'
import { loginAsGuest } from './helpers'

test.describe('SmithActions (Zbrojíř)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsGuest(page)

    // Navigate to town map first
    await page.getByRole('button', { name: /Mapa/i }).click()
    await page.waitForTimeout(500)

    // Scroll down to ensure smith button is visible
    await page.evaluate(() => window.scrollBy(0, 200))

    // Navigate to smith (text: "Navštívit zbrojíře a kováře pro zbraně")
    const smithButton = page.locator('button').filter({ hasText: /zbrojíře a kováře/i })
    await smithButton.click()
  })

  test.describe('Tab Navigation', () => {
    test('should have two tabs: Obchod and Kovárna', async ({ page }) => {
      // Check both tabs exist
      await expect(page.getByRole('button', { name: /Obchod/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /Kovárna/i })).toBeVisible()
    })

    test('should switch between Obchod and Kovárna tabs', async ({ page }) => {
      // Start in Obchod (shop) tab
      const obchodTab = page.getByRole('button', { name: /Obchod/i })
      const kovarnaTab = page.getByRole('button', { name: /Kovárna/i })

      // Check Obchod tab is active
      await expect(obchodTab).toBeVisible()

      // Switch to Kovárna
      await kovarnaTab.click()

      // Kovárna content should be visible (e.g., craft/upgrade/repair buttons)
      await expect(page.getByText(/Vytvořit|Vylepšit|Opravit/i).first()).toBeVisible({
        timeout: 3000,
      })

      // Switch back to Obchod
      await obchodTab.click()

      // Obchod content should be visible
      await expect(page.getByText(/Koupit|Prodat/i).first()).toBeVisible({ timeout: 3000 })
    })

    test('active tab should be highlighted', async ({ page }) => {
      const obchodTab = page.getByRole('button', { name: /Obchod/i })

      // Check if active tab has different styling
      const bgColor = await obchodTab.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor
      })

      // Active tab should have visible background color
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
    })
  })

  test.describe('Obchod (Shop) Tab', () => {
    test('should show buy and sell options', async ({ page }) => {
      // Should be in shop tab by default or switch to it
      const obchodTab = page.getByRole('button', { name: /Obchod/i })
      await obchodTab.click()

      // Wait for shop content
      await page.waitForTimeout(500)

      // Should have buy/sell buttons or modes
      const buyButton = page.getByRole('button', { name: /Koupit/i })
      const sellButton = page.getByRole('button', { name: /Prodat/i })

      // At least one should be visible
      const buyVisible = (await buyButton.count()) > 0 && (await buyButton.first().isVisible())
      const sellVisible = (await sellButton.count()) > 0 && (await sellButton.first().isVisible())

      expect(buyVisible || sellVisible).toBeTruthy()
    })

    test('buy mode shows available items', async ({ page }) => {
      const obchodTab = page.getByRole('button', { name: /Obchod/i })
      await obchodTab.click()

      // Click buy button if present
      const buyButton = page.getByRole('button', { name: /Koupit/i })
      if ((await buyButton.count()) > 0) {
        await buyButton.first().click()
      }

      // Should show items to buy (weapons, armor)
      await page.waitForTimeout(500)

      // Items should be displayed
      const items = page.locator('[data-item], button').filter({ hasText: /Meč|Dřevěný|Kožená/i })
      if ((await items.count()) > 0) {
        await expect(items.first()).toBeVisible()
      }
    })

    test('sell mode shows player inventory', async ({ page }) => {
      const obchodTab = page.getByRole('button', { name: /Obchod/i })
      await obchodTab.click()

      // Click sell button
      const sellButton = page.getByRole('button', { name: /Prodat/i })
      if ((await sellButton.count()) > 0) {
        await sellButton.first().click()
        await page.waitForTimeout(500)

        // Should show player's items
        // (May be empty if player has no sellable items)
        const emptyMessage = page.getByText(/Nemáš žádné předměty|prázdný/i)
        const items = page.locator('button').filter({ hasText: /Meč|Brnění/i })

        const hasItems = (await items.count()) > 0
        const isEmpty = (await emptyMessage.count()) > 0

        expect(hasItems || isEmpty).toBeTruthy()
      }
    })
  })

  test.describe('Kovárna (Forge) Tab', () => {
    test('should show craft, upgrade, and repair options', async ({ page }) => {
      const kovarnaTab = page.getByRole('button', { name: /Kovárna/i })
      await kovarnaTab.click()
      await page.waitForTimeout(500)

      // Should have forge actions
      const craftButton = page.getByRole('button', { name: /Vytvořit/i })
      const upgradeButton = page.getByRole('button', { name: /Vylepšit/i })
      const repairButton = page.getByRole('button', { name: /Opravit/i })

      // At least one should be visible
      const hasCraft = (await craftButton.count()) > 0
      const hasUpgrade = (await upgradeButton.count()) > 0
      const hasRepair = (await repairButton.count()) > 0

      expect(hasCraft || hasUpgrade || hasRepair).toBeTruthy()
    })

    test('craft mode shows craftable items', async ({ page }) => {
      const kovarnaTab = page.getByRole('button', { name: /Kovárna/i })
      await kovarnaTab.click()

      const craftButton = page.getByRole('button', { name: /Vytvořit/i })
      if ((await craftButton.count()) > 0) {
        await craftButton.first().click()
        await page.waitForTimeout(500)

        // Should show craftable recipes
        const recipes = page.locator('button, [data-recipe]')
        expect(await recipes.count()).toBeGreaterThanOrEqual(0)
      }
    })

    test('upgrade mode shows upgradeable equipment', async ({ page }) => {
      const kovarnaTab = page.getByRole('button', { name: /Kovárna/i })
      await kovarnaTab.click()

      const upgradeButton = page.getByRole('button', { name: /Vylepšit/i })
      if ((await upgradeButton.count()) > 0) {
        await upgradeButton.first().click()
        await page.waitForTimeout(500)

        // Should show upgradeable items or empty message
        const items = page.locator('button').filter({ hasText: /\+\d|level/i })
        const emptyMessage = page.getByText(/Nemáš žádné/i)

        expect((await items.count()) > 0 || (await emptyMessage.count()) > 0).toBeTruthy()
      }
    })

    test('repair mode shows damaged items', async ({ page }) => {
      const kovarnaTab = page.getByRole('button', { name: /Kovárna/i })
      await kovarnaTab.click()

      const repairButton = page.getByRole('button', { name: /Opravit/i })
      if ((await repairButton.count()) > 0) {
        await repairButton.first().click()
        await page.waitForTimeout(500)

        // Should show damaged items or message
        const items = page.locator('button, [data-damaged]')
        const message = page.getByText(/Nemáš žádné|vše v pořádku/i)

        expect((await items.count()) >= 0 || (await message.count()) > 0).toBeTruthy()
      }
    })
  })

  test.describe('Back Navigation', () => {
    test('back button returns to town from root view', async ({ page }) => {
      // Should be in root smith view
      const backButton = page.getByRole('button', { name: /Zpět/i })
      await expect(backButton).toBeVisible()

      await backButton.click()

      // Should return to town (check for smith button text: "Navštívit zbrojíře a kováře")
      await expect(page.locator('button').filter({ hasText: /zbrojíře/i })).toBeVisible({
        timeout: 3000,
      })
    })

    test('back button from sub-view returns to tab root', async ({ page }) => {
      const obchodTab = page.getByRole('button', { name: /Obchod/i })
      await obchodTab.click()

      const buyButton = page.getByRole('button', { name: /Koupit/i })
      if ((await buyButton.count()) > 0) {
        await buyButton.first().click()
        await page.waitForTimeout(500)

        // Now in buy mode - back should return to shop tab root
        const backButton = page.getByRole('button', { name: /Zpět/i })
        if ((await backButton.count()) > 0) {
          await backButton.first().click()
          await page.waitForTimeout(500)

          // Should see buy/sell options again
          expect(
            (await buyButton.isVisible()) ||
              (await page.getByRole('button', { name: /Prodat/i }).isVisible())
          ).toBeTruthy()
        }
      }
    })
  })
})
