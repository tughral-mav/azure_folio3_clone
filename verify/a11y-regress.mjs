import { chromium } from 'playwright';
const b = await chromium.launch();
const errors = {};
for (const route of ['/', '/contact-us/', '/data-integration-as-a-service/', '/blog/agentic-ai-in-healthcare/']) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 120)));
  p.on('pageerror', (e) => errs.push('PAGEERROR ' + String(e).slice(0, 120)));
  await p.goto('http://localhost:3000' + route, { waitUntil: 'networkidle', timeout: 60000 });
  errors[route] = errs;
  await p.close();
}
// nav interaction: keyboard focus opens dropdown; hover opens dropdown
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
const navBtn = p.locator('nav[aria-label="Primary"] button[aria-haspopup="true"]').first();
await navBtn.focus();
await p.waitForTimeout(300);
const expandedOnFocus = await navBtn.getAttribute('aria-expanded');
const menuLinksOnFocus = await p.locator('nav[aria-label="Primary"] .absolute a').count();
// hover
await p.mouse.move(0,0); await p.waitForTimeout(200);
await navBtn.hover(); await p.waitForTimeout(300);
const menuLinksOnHover = await p.locator('nav[aria-label="Primary"] .absolute a').count();
// contact form: inputs have accessible names (label association)
await p.goto('http://localhost:3000/contact-us/', { waitUntil: 'networkidle', timeout: 60000 });
const firstInputName = await p.locator('#main input, form input').first().evaluate((el) => {
  const id = el.id; const lbl = id && document.querySelector(`label[for="${id}"]`); return lbl ? lbl.textContent.trim() : '(no label)';
});
await b.close();
console.log('CONSOLE ERRORS:', JSON.stringify(errors));
console.log('nav aria-expanded on FOCUS:', expandedOnFocus, '| submenu links on focus:', menuLinksOnFocus, '| on hover:', menuLinksOnHover);
console.log('first contact input accessible name:', firstInputName);
