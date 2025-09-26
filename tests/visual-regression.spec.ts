
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing', () => {
 test('Design references page should match snapshots', async ({ page }) => {
     await page.goto('/doodle-mashup-support/design-references.html');
     await expect(page).toHaveScreenshot('design-references.png', { fullPage: true });
   });
});
