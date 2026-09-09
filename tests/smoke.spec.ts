import { test, expect } from '@playwright/test';

// Run against a served build: `npm run build && npx serve out` (or `npm run dev`).
test('home renders the wordmark', async ({ page }) => {
  await page.goto('/kk/');
  await expect(page.getByRole('heading', { name: 'ALAKÓL', level: 1 })).toBeVisible();
});

test('language switch reaches the Russian route', async ({ page }) => {
  await page.goto('/ru/');
  await expect(page).toHaveURL(/\/ru\//);
});

test('skip-cinematic anchor exists', async ({ page }) => {
  await page.goto('/kk/');
  await expect(page.locator('#practical')).toHaveCount(1);
});
