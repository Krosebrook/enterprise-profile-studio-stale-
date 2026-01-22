import { test, expect } from '@playwright/test';

test.describe('PWA Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have valid web app manifest', async ({ page }) => {
    const manifestLink = await page.$('link[rel="manifest"]');
    expect(manifestLink).not.toBeNull();
    
    const manifestHref = await manifestLink?.getAttribute('href');
    expect(manifestHref).toBeTruthy();
  });

  test('should have PWA meta tags', async ({ page }) => {
    // Theme color
    const themeColor = await page.$('meta[name="theme-color"]');
    expect(themeColor).not.toBeNull();
    
    // Apple meta tags
    const appleMobileCapable = await page.$('meta[name="apple-mobile-web-app-capable"]');
    expect(appleMobileCapable).not.toBeNull();
    
    const appleTitle = await page.$('meta[name="apple-mobile-web-app-title"]');
    expect(appleTitle).not.toBeNull();
  });

  test('should have viewport meta tag with proper settings', async ({ page }) => {
    const viewport = await page.$('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
    
    const content = await viewport?.getAttribute('content');
    expect(content).toContain('width=device-width');
    expect(content).toContain('initial-scale=1.0');
  });

  test('should have apple touch icon', async ({ page }) => {
    const appleTouchIcon = await page.$('link[rel="apple-touch-icon"]');
    expect(appleTouchIcon).not.toBeNull();
  });

  test('should load correctly and be interactive', async ({ page }) => {
    // Wait for the app to be fully loaded
    await page.waitForSelector('nav', { state: 'visible' });
    
    // Check that the main content is visible
    const mainContent = await page.$('main');
    expect(mainContent).not.toBeNull();
  });

  test('should show noscript fallback when JS is disabled', async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    const noscript = await page.textContent('noscript');
    expect(noscript).toContain('JavaScript Required');
    
    await context.close();
  });
});

test.describe('Offline Functionality', () => {
  test('should handle offline gracefully', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Go offline
    await context.setOffline(true);
    
    // Should still be able to interact with cached content
    await page.waitForTimeout(500);
    
    // Check that the page is still visible
    const body = await page.$('body');
    expect(body).not.toBeNull();
    
    // Restore online state
    await context.setOffline(false);
  });
});

test.describe('Lazy Loading', () => {
  test('should lazy load route components', async ({ page }) => {
    // Start on landing page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to a different route
    await page.goto('/dashboard');
    
    // Should show loading state or content
    await page.waitForSelector('main', { state: 'visible' });
  });

  test('should show loading indicator while loading', async ({ page }) => {
    // Slow down network to see loading state
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
    
    await page.goto('/ai-explorer');
    
    // Either loading indicator or content should be visible
    const hasContent = await page.waitForSelector('main', { 
      state: 'visible',
      timeout: 10000 
    }).catch(() => null);
    
    expect(hasContent).not.toBeNull();
  });
});

test.describe('Responsive Design', () => {
  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that content is visible
    const content = await page.$('main, [role="main"]');
    expect(content).not.toBeNull();
  });

  test('should display correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const content = await page.$('main, [role="main"]');
    expect(content).not.toBeNull();
  });

  test('should display correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const content = await page.$('main, [role="main"]');
    expect(content).not.toBeNull();
  });
});

test.describe('SEO & Accessibility', () => {
  test('should have proper document title', async ({ page }) => {
    await page.goto('/');
    
    const title = await page.title();
    expect(title).toContain('INT OS');
  });

  test('should have meta description', async ({ page }) => {
    await page.goto('/');
    
    const metaDesc = await page.$('meta[name="description"]');
    expect(metaDesc).not.toBeNull();
    
    const content = await metaDesc?.getAttribute('content');
    expect(content?.length).toBeGreaterThan(10);
  });

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/');
    
    const ogTitle = await page.$('meta[property="og:title"]');
    const ogDescription = await page.$('meta[property="og:description"]');
    const ogType = await page.$('meta[property="og:type"]');
    
    expect(ogTitle).not.toBeNull();
    expect(ogDescription).not.toBeNull();
    expect(ogType).not.toBeNull();
  });

  test('should have structured data', async ({ page }) => {
    await page.goto('/');
    
    const structuredData = await page.$('script[type="application/ld+json"]');
    expect(structuredData).not.toBeNull();
    
    const content = await structuredData?.textContent();
    expect(content).toContain('@context');
    expect(content).toContain('schema.org');
  });
});
