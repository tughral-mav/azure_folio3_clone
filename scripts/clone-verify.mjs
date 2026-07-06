/** Capture the CLONE's Our Process + Our Industries (default & hover). */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('verify/clone', { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 60000 });
// trigger all reveal animations
await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 90); }); });
await p.waitForTimeout(1500);

async function section(re) {
  return p.evaluateHandle((rx) => {
    const h = [...document.querySelectorAll('h1,h2,h3')].find((e) => new RegExp(rx, 'i').test(e.textContent || ''));
    return h ? h.closest('section') : null;
  }, re.source);
}
async function clip(h) { return p.evaluate((el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.max(0, r.x), y: Math.max(0, r.y + scrollY - scrollY), width: r.width, height: Math.min(940, r.height) }; }, h); }

for (const [name, rx] of [['process', /our process/], ['industries', /our industries/]]) {
  const sec = await section(rx);
  await p.evaluate((el) => el && el.scrollIntoView({ block: 'center' }), sec);
  await p.waitForTimeout(1400);
  const box = await p.evaluate((el) => { const r = el.getBoundingClientRect(); return { x: Math.max(0, r.x), y: Math.max(0, r.y), width: r.width, height: Math.min(940, r.height) }; }, sec);
  await p.screenshot({ path: `verify/clone/${name}_default.png`, clip: box });
  // hover the 1st card center
  const card = await p.evaluate((el) => {
    const c = el.querySelector('[class*="h-[400px]"], [class*="rounded-xl"]') || el.querySelector('img')?.parentElement;
    const r = (c || el).getBoundingClientRect();
    return { x: r.x + Math.min(120, r.width / 2), y: r.y + r.height / 2 };
  }, sec);
  await p.mouse.move(card.x, card.y);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `verify/clone/${name}_hover.png`, clip: box });
}
await b.close();
console.log('done -> verify/clone/');
