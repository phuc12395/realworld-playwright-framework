import { test, expect } from '@playwright/test';

// Basic smoke test to verify that the application is reachable
// and core UI elements are rendered properly
test('landing page loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /conduit/i })).toBeVisible();
  await expect(page.getByText('A place to share your knowledge.')).toBeVisible();
});