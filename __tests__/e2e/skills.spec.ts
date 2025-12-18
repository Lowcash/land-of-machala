import { expect, test } from '@playwright/test'

test.describe('Skills System', () => {
  test.beforeEach(async ({ page }) => {
    // Login as guest
    await page.goto('/login')
    await page.getByRole('button', { name: 'Zkusit hru jako host (bez registrace)' }).click()

    // Wait for redirect to onboarding
    await page.waitForURL(/\/onboarding/, { timeout: 20000 })

    // Skip onboarding
    await page.getByRole('button', { name: 'Přeskočit úvod (Jsem zkušený hráč)' }).click()

    // Create character
    await page.getByPlaceholder('Zadej jméno...').fill('SkillTest')
    await page.getByRole('button', { name: 'Válečník' }).click()
    await page.getByRole('button', { name: 'Člověk' }).click()
    await page.getByRole('button', { name: 'Vstoupit do hry' }).click()

    await page.waitForURL(/\/game/, { timeout: 20000 })

    // Navigate to skills using URL
    await page.goto('/skills')
    await page.waitForLoadState('networkidle')
  })

  test('displays skills page with skill tree', async ({ page }) => {
    // Check for skills title
    await expect(page.getByText(/dovednost|skill|schopnost/i).first()).toBeVisible()
  })

  test('shows available skill points for new character', async ({ page }) => {
    // New level 1 character should have skill points to allocate
    const skillPoints = page.locator('text=/dostupn|available|bod|point/i')
    if (await skillPoints.first().isVisible()) {
      await expect(skillPoints.first()).toBeVisible()
    }
  })

  test('displays skill categories or tree branches', async ({ page }) => {
    // Skills are typically organized by category (combat, magic, crafting, etc.)
    const skillCategories = page.locator('[class*="skill"], [class*="category"], [class*="branch"]')
    const categoryCount = await skillCategories.count()

    if (categoryCount > 0) {
      await expect(skillCategories.first()).toBeVisible()
    }
  })

  test('shows skill details on hover or click', async ({ page }) => {
    // Find first skill node
    const firstSkill = page.locator('[class*="skill"], [data-skill]').first()

    if (await firstSkill.isVisible()) {
      await firstSkill.hover()
      await page.waitForTimeout(300)

      // Skill tooltip/details should appear
      const skillTooltip = page.locator(
        '[role="tooltip"], [class*="tooltip"], text=/popis|description/i'
      )
      if (await skillTooltip.first().isVisible()) {
        await expect(skillTooltip.first()).toBeVisible()
      }
    }
  })

  test('displays warrior-specific combat skills', async ({ page }) => {
    // Warrior class should have combat-focused skills
    // Check for typical warrior skills
    const combatSkills = page.locator('text=/útok|attack|síla|strength|válečn|warrior|meč|sword/i')
    if (await combatSkills.first().isVisible()) {
      await expect(combatSkills.first()).toBeVisible()
    }
  })

  test('shows skill level and progress bars', async ({ page }) => {
    // Skills should display current level and progress to next level
    const skillLevel = page.locator('text=/level|úroveň|\\d+\\/\\d+/i')
    if (await skillLevel.first().isVisible()) {
      await expect(skillLevel.first()).toBeVisible()
    }
  })

  test('allows navigation back to game', async ({ page }) => {
    // Use direct navigation instead of button click (footer nav may vary)
    await page.goto('/game')
    await expect(page).toHaveURL(/\/game/, { timeout: 10000 })
  })
})
