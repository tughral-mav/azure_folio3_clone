import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
page.on('pageerror', e => errs.push('PAGEERROR '+e.message));

// 1. Nav dropdown hover
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
const navItems = await page.locator('nav[aria-label="Primary"] > div').count();
console.log('Primary nav items:', navItems);
// hover first nav item with children
let dropdownShown = false;
for (let i=0;i<navItems;i++){
  const item = page.locator('nav[aria-label="Primary"] > div').nth(i);
  await item.hover();
  await page.waitForTimeout(150);
  const panel = item.locator('div.absolute');
  if (await panel.count() && await panel.first().isVisible()) { dropdownShown = true; 
    const links = await panel.first().locator('a').count();
    console.log(`Nav item ${i}: dropdown opened with ${links} links`); break; }
}
console.log('Dropdown opens on hover:', dropdownShown);

// 2. CTA scroll to #pgForm
const cta = page.locator('a[href="#ppgForm"], a[href="#pgForm"]').first();
const beforeY = await page.evaluate(() => window.scrollY);
await cta.click();
await page.waitForTimeout(600);
const afterY = await page.evaluate(() => window.scrollY);
const pgFormExists = await page.locator('#pgForm').count();
console.log(`CTA #pgForm click: scrollY ${beforeY} -> ${afterY}, #pgForm in DOM: ${pgFormExists>0}`);

// 3. Mobile menu
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await mobile.newPage();
await mp.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
const toggle = mp.locator('button[aria-label="Toggle menu"]');
console.log('Mobile toggle exists:', await toggle.count());
await toggle.click();
await mp.waitForTimeout(300);
const mobMenuLinks = await mp.locator('.lg\:hidden a, .lg\:hidden button').count();
const mobMenuVisible = await mp.locator('div.border-t').first().isVisible().catch(()=>false);
console.log('Mobile menu opened (visible border-t panel):', mobMenuVisible, '| interactive els:', mobMenuLinks);
await mobile.close();

console.log('Console errors during interaction:', errs.length ? errs : 'NONE');
await browser.close();
