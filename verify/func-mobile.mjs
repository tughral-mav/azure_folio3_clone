import { chromium } from 'playwright';
const browser = await chromium.launch();
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await mobile.newPage();
const errs = [];
mp.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
mp.on('pageerror', e => errs.push('PAGEERROR '+e.message));
await mp.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
const toggle = mp.locator('button[aria-label="Toggle menu"]');
const beforeLinks = await mp.locator('header a:visible').count();
await toggle.click();
await mp.waitForTimeout(300);
const afterLinks = await mp.locator('header a:visible').count();
console.log(`Mobile menu: visible header links ${beforeLinks} -> ${afterLinks} after toggle`);
// expand a submenu (button with chevron)
const subBtns = mp.locator('header button').filter({ hasText: /SERVICES|INDUSTRIES|RESOURCES|ABOUT|SOLUTIONS/i });
const cnt = await subBtns.count();
console.log('Mobile collapsible section buttons:', cnt);
if (cnt) { await subBtns.first().click(); await mp.waitForTimeout(200);
  const expanded = await mp.locator('header a:visible').count();
  console.log('After expanding first section, visible links:', expanded); }
console.log('Console errors:', errs.length ? errs : 'NONE');
await browser.close();
