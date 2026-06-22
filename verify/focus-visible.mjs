import { chromium } from 'playwright-core';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/contact-us/', { waitUntil: 'networkidle' });
const out = {};

// Check computed focus outline on key interactive elements
async function focusInfo(selector, label) {
  const el = await page.$(selector);
  if (!el) return { label, found: false };
  await el.focus();
  await page.waitForTimeout(80);
  const info = await el.evaluate(e => {
    const s = getComputedStyle(e);
    return {
      outlineStyle: s.outlineStyle,
      outlineWidth: s.outlineWidth,
      outlineColor: s.outlineColor,
      boxShadow: s.boxShadow,
      borderColor: s.borderColor,
    };
  });
  // does any focus indicator exist? outline visible OR a box-shadow ring
  const hasOutline = info.outlineStyle !== 'none' && parseFloat(info.outlineWidth) > 0;
  const hasShadowRing = info.boxShadow && info.boxShadow !== 'none';
  return { label, found: true, ...info, hasVisibleFocusIndicator: hasOutline || hasShadowRing };
}

out.textInput = await focusInfo('form input[type="text"]', 'text input (full name)');
out.emailInput = await focusInfo('form input[type="email"]', 'email input');
out.submitBtn = await focusInfo('form button[type="submit"]', 'submit button');

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
out.navTrigger = await focusInfo('nav[aria-label="Primary"] button[aria-haspopup="true"]', 'nav dropdown trigger');
out.getInTouch = await focusInfo('a[href="/contact-us/"]', 'Get in Touch CTA link');

console.log(JSON.stringify(out, null, 2));
await browser.close();
