/**
 * BMAD QA gate: screenshot the SAME vertical region of a section on the clone and the live
 * page so they can be compared. Usage:
 *   node verify/qa-section.mjs <route> <label> <y> <height>
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const [route, label, yArg, hArg] = process.argv.slice(2);
const y = parseInt(yArg || '0', 10);
const height = parseInt(hArg || '900', 10);
const OUT = path.resolve('verify/_analysis/shots');
mkdirSync(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';

async function shot(page, url, file) {
  await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  // full lazy-load so layout is final, then back to top
  for (let i = 0; i < 2; i++) { await page.evaluate(async () => { await new Promise((r) => { let v = 0; const t = setInterval(() => { scrollBy(0, 600); v += 600; if (v > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 40); }); }); await page.waitForTimeout(500); }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: file, clip: { x: 0, y, width: 1440, height } });
}

const b = await chromium.launch();
const ctx = await b.newContext({ userAgent: UA, viewport: { width: 1440, height: Math.max(900, y + height) } });
const p1 = await ctx.newPage();
await shot(p1, 'http://localhost:3000' + route, path.join(OUT, `qa-clone-${label}.png`));
const p2 = await ctx.newPage();
await shot(p2, 'https://azure.folio3.com' + route, path.join(OUT, `qa-live-${label}.png`));
await b.close();
console.log(`QA shots saved: qa-clone-${label}.png / qa-live-${label}.png  (y=${y} h=${height})`);
