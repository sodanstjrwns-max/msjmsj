const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const base = process.env.TEST_URL || 'http://localhost:3000';

test('content, metadata, links and light initial load', async ({ page }) => {
  const errors = [];
  const thirdParty = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (!request.url().startsWith(base)) thirdParty.push(request.url()); });
  const response = await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  expect(response.status()).toBe(200);
  expect(response.headers()['x-robots-tag']).toContain('noindex');
  await expect(page).toHaveTitle('치과의사 문석준 — 충분히 듣습니다');
  await expect(page.locator('h1')).toHaveText('충분히 듣습니다.');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  expect(await page.locator('.portrait img').evaluate(img => img.complete && img.naturalWidth === 600)).toBe(true);
  expect(await page.locator('body').innerText()).not.toMatch(/통합치의학과 전문의|임플란트 전문의|박사|베스트셀러|임시 카피|작업자료 확인/);
  for (const href of await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute('href')))) {
    expect(await page.locator(href).count(), href).toBe(1);
  }
  for (const attrs of await page.locator('a[target="_blank"]').evaluateAll(links => links.map(a => ({ href: a.href, rel: a.rel, text: a.textContent })))) {
    expect(attrs.href).toMatch(/^https:\/\//);
    expect(attrs.rel).toContain('noopener');
    expect(attrs.text).toContain('새 탭');
  }
  expect(errors).toEqual([]);
  expect(thirdParty).toEqual([]);
});

for (const width of [320, 360, 390, 540, 768, 1024, 1440, 1920]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const button of await page.locator('.question-tab').all()) {
      await button.click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    const clipped = await page.locator('h1,h2,h3,.question-tab').evaluateAll(elements => elements.filter(e => e.getClientRects().length && e.scrollWidth > e.clientWidth + 2).map(e => e.textContent));
    expect(clipped).toEqual([]);
  });
}

test('keyboard tab navigation, filters, and real external destinations', async ({ page }) => {
  await page.goto(base);
  await page.locator('#question-listen').focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#question-understand')).toBeFocused();
  await expect(page.locator('#thought-understand')).toBeVisible();
  await expect(page.locator('#thought-listen')).toBeHidden();
  await page.keyboard.press('End');
  await expect(page.locator('#thought-decide')).toBeVisible();
  await page.keyboard.press('Home');
  await expect(page.locator('#thought-listen')).toBeVisible();
  await page.locator('[data-filter="book"]').click();
  await expect(page.locator('.record-card:visible')).toHaveCount(2);
  await expect(page.locator('#filter-status')).toContainText('2개');
  await page.locator('[data-filter="video"]').click();
  await expect(page.locator('.record-card:visible')).toHaveCount(1);
  await page.locator('[data-filter="article"]').click();
  await expect(page.locator('.record-card:visible')).toHaveCount(1);
  await page.locator('[data-filter="all"]').click();
  await expect(page.locator('.record-card:visible')).toHaveCount(4);
  await expect(page.locator('.visit-primary')).toHaveAttribute('href', 'https://bdbddc.com/reservation?doctor=moon');
  await page.locator('.colleagues summary').click();
  await expect(page.locator('.colleague-book')).toBeVisible();
});

test('mobile menu, escape, anchor movement and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior)).toBe('auto');
  await page.locator('#menu-toggle').click();
  await expect(page.locator('#main-nav')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#main-nav')).toBeHidden();
  await expect(page.locator('#menu-toggle')).toBeFocused();
  await page.locator('#menu-toggle').click();
  await page.locator('#main-nav a[href="#about"]').click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator('#main-nav')).toBeHidden();
  expect(await page.locator('#about').evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(70);
});

test('video requests third party only after click and retains fallback', async ({ page }) => {
  await page.route('https://www.youtube-nocookie.com/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Embed test</title>' }));
  await page.goto(base);
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.locator('#play-intro').click();
  await expect(page.locator('iframe')).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/JV7JDndC3ug?autoplay=1&rel=0');
  await expect(page.locator('.video-card .text-link')).toHaveAttribute('href', 'https://www.youtube.com/watch?v=JV7JDndC3ug');
});

for (const width of [390, 1440]) {
  test(`WCAG automated audit ${width}px`, async ({ page }) => {
    // Audit the stable, reduced-motion presentation rather than a transition frame.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.map(v => ({ id: v.id, description: v.description, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  });
}

test('content remains available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(base);
  await expect(page.locator('.thought-panel:visible')).toHaveCount(3);
  await expect(page.locator('.record-card:visible')).toHaveCount(4);
  await expect(page.locator('.visit-primary')).toBeVisible();
  await context.close();
});
