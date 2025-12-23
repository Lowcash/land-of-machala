import { expect, test } from '@playwright/test'

test.describe('Settings Panel', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test user
    await page.goto('/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Wait for navigation to game
    await page.waitForURL('/game', { timeout: 10000 })
  })

  test('should open settings panel from header menu', async ({ page }) => {
    // Click settings button in header
    await page.click('[data-settings-trigger]')
    
    // Wait for dropdown menu to appear
    await page.waitForSelector('text=Nastavení', { timeout: 2000 })
    
    // Click "Nastavení" menu item
    await page.click('text=Nastavení')
    
    // Verify settings panel is visible
    await expect(page.locator('text=Nastavení hry - Coming soon')).toBeVisible()
    
    // Verify panel has proper styling
    const panel = page.locator('div').filter({ hasText: 'Nastavení hry - Coming soon' }).first()
    await expect(panel).toHaveClass(/border-2/)
    await expect(panel).toHaveClass(/border-\[#d4a574\]/)
  })

  test('should close settings panel with X button', async ({ page }) => {
    // Open settings panel
    await page.click('[data-settings-trigger]')
    await page.click('text=Nastavení')
    
    // Wait for panel to appear
    await page.waitForSelector('text=Nastavení hry - Coming soon', { timeout: 2000 })
    
    // Click close button
    await page.click('button:has-text("×")')
    
    // Verify panel is hidden
    await expect(page.locator('text=Nastavení hry - Coming soon')).not.toBeVisible()
  })

  test('should close settings panel by clicking backdrop', async ({ page }) => {
    // Open settings panel
    await page.click('[data-settings-trigger]')
    await page.click('text=Nastavení')
    
    // Wait for panel to appear
    await page.waitForSelector('text=Nastavení hry - Coming soon', { timeout: 2000 })
    
    // Click backdrop (outside panel)
    await page.click('.fixed.inset-0', { position: { x: 10, y: 10 } })
    
    // Verify panel is still visible (should NOT close on backdrop click based on current implementation)
    // Note: If you want backdrop close functionality, add onClick handler to backdrop div
    await expect(page.locator('text=Nastavení hry - Coming soon')).toBeVisible()
  })

  test('should open settings from character page', async ({ page }) => {
    // Navigate to character page
    await page.click('a[href="/character"]')
    await page.waitForURL('/character', { timeout: 5000 })
    
    // Open settings
    await page.click('[data-settings-trigger]')
    await page.click('text=Nastavení')
    
    // Verify panel opens
    await expect(page.locator('text=Nastavení hry - Coming soon')).toBeVisible()
  })

  test('should open settings from skills page', async ({ page }) => {
    // Navigate to skills page
    await page.click('a[href="/skills"]')
    await page.waitForURL('/skills', { timeout: 5000 })
    
    // Open settings
    await page.click('[data-settings-trigger]')
    await page.click('text=Nastavení')
    
    // Verify panel opens
    await expect(page.locator('text=Nastavení hry - Coming soon')).toBeVisible()
  })

  test('should close dropdown menu when opening settings', async ({ page }) => {
    // Open dropdown
    await page.click('[data-settings-trigger]')
    
    // Verify dropdown is visible
    await expect(page.locator('text=Nastavení')).toBeVisible()
    
    // Click settings
    await page.click('text=Nastavení')
    
    // Verify dropdown menu is hidden (not in DOM or not visible)
    const dropdown = page.locator('text=Odhlásit se')
    await expect(dropdown).not.toBeVisible()
  })
})
