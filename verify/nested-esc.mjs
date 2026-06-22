import { chromium } from 'playwright-core';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
const svc = await p.$('nav[aria-label="Primary"] button[aria-haspopup="true"]');
await svc.focus(); await p.waitForTimeout(120);
const fp = await p.$('nav[aria-label="Primary"] a[aria-haspopup="true"]:has-text("Azure Data Analytics")');
await fp.focus(); await p.waitForTimeout(150);
console.log('flyout open, parent aria-expanded:', await fp.getAttribute('aria-expanded'));
await p.keyboard.press('Escape'); await p.waitForTimeout(150);
console.log('after Esc -> services button aria-expanded:', await svc.getAttribute('aria-expanded'));
console.log('after Esc -> flyout parent still visible:', await fp.isVisible());
console.log('after Esc -> flyout parent aria-expanded:', await fp.getAttribute('aria-expanded'));
// Now check: does the child submenu still show visually after Esc?
const child = await p.$('nav[aria-label="Primary"] a:has-text("Microsoft Fabric Services")');
console.log('after Esc -> child "Microsoft Fabric Services" still visible:', child ? await child.isVisible() : 'not found');
await b.close();
