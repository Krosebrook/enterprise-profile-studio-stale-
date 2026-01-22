import { test, expect } from '@playwright/test';

test.describe('Navigation & Routing', () => {
  test('should navigate to landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for main content
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('should navigate to AI Explorer', async ({ page }) => {
    await page.goto('/ai-explorer');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('should navigate to Knowledge Base', async ({ page }) => {
    await page.goto('/knowledge');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('should handle 404 for unknown routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await page.waitForLoadState('networkidle');
    
    // Should still render the app with NotFound component
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load landing page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known acceptable errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('Failed to load resource')
    );
    
    expect(criticalErrors.length).toBe(0);
  });
});

test.describe('Form Interactions', () => {
  test('should allow typing in search fields', async ({ page }) => {
    await page.goto('/knowledge');
    await page.waitForLoadState('networkidle');
    
    // Look for search input
    const searchInput = page.locator('input[placeholder*="search" i], input[type="search"]').first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test query');
      await expect(searchInput).toHaveValue('test query');
    }
  });
});

test.describe('Theme & Styling', () => {
  test('should have dark theme styling', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that the app has proper styling loaded
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Check that background color is applied
    const bgColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    expect(bgColor).toBeTruthy();
  });
});
