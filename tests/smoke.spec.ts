import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  // Basic check to see if app loads
  // Adjust title expectation based on actual app title
  await expect(page).toHaveTitle(/Machala|Land of/);
});

test('redirects to login if not authenticated', async ({ page }) => {
  await page.goto('/game');
  // Should redirect to login or onboarding
  await expect(page.url()).toContain('/login');
});
