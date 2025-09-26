import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Visual Regression Tests', () => {
  const imagesDir = path.join(__dirname, '..', 'images');

  test.beforeAll(() => {
    // Verify images directory exists with reference screenshots
    if (!fs.existsSync(imagesDir)) {
      console.log('Images directory not found, will be created during test runs');
    } else {
      const images = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));
      console.log(`Found ${images.length} reference images in images folder:`, images);
    }
  });

  test('Homepage visual comparison', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await expect(page.locator('h1')).toContainText('Doodle Mashup — Support');
    await expect(page.locator('.card').first()).toBeVisible();
    
    // Take a screenshot and compare with reference
    // This will use the Playwright built-in snapshot system
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('Privacy Policy page visual comparison', async ({ page }) => {
    await page.goto('/privacy.html');
    
    // Wait for the page to be fully loaded
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    await expect(page.locator('h2').first()).toBeVisible();
    
    // Take a screenshot and compare with reference
    await expect(page).toHaveScreenshot('privacy-policy.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('Terms of Service page visual comparison', async ({ page }) => {
    await page.goto('/terms.html');
    
    // Wait for the page to be fully loaded
    await expect(page.locator('h1')).toContainText('Terms of Service');
    await expect(page.locator('h2').first()).toBeVisible();
    
    // Take a screenshot and compare with reference
    await expect(page).toHaveScreenshot('terms-of-service.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('Verify reference images exist in images folder', async () => {
    // This test validates that we have copied the reference images to the images folder
    const expectedImages = [
      'homepage-chromium-linux.png',
      'privacy-policy-chromium-linux.png',
      'terms-of-service-chromium-linux.png'
    ];

    for (const imageName of expectedImages) {
      const imagePath = path.join(imagesDir, imageName);
      
      // Check if file exists
      expect(fs.existsSync(imagePath), `Reference image should exist: ${imagePath}`).toBe(true);
      
      // Check if file is not empty
      const stats = fs.statSync(imagePath);
      expect(stats.size, `Reference image should not be empty: ${imagePath}`).toBeGreaterThan(1000);
    }
  });
});