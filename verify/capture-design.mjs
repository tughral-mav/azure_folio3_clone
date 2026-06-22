/**
 * Pre-capture full-page LIVE and CLONE screenshots for the design pages at a
 * viewport, so visual-audit agents can compare by reading images (no Playwright
 * per agent). Output: verify/shots/<slug>__<vp>__{live,clone}.png
 *
 * Usage: node verify/capture-design.mjs <desktop|mobile> [startIndex] [count]
 */
import { chromium } from 'playwright';
import { mkdirSync, appendFileSync, writeFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';

const VP = process.argv[2] === 'mobile' ? { name: 'mobile', width: 375, height: 812 } : { name: 'desktop', width: 1440, height: 900 };
const START = parseInt(process.argv[3] || '0', 10);
const COUNT = parseInt(process.argv[4] || String(DESIGN_PAGES.length), 10);
const ROUTES = DESIGN_PAGES.slice(START, START + COUNT);
const LIVE = 'https://azure.folio3.com';
const CLONE = 'http://localhost:3000';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const CONCURRENCY = 4;
const PROG = `verify/capture-${VP.name}.progress`;
mkdirSync('verify/shots', { recursive: true });
try { writeFileSync(PROG, ''); } catch {}
const slug = (r) => (r.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');

async function shoot(ctx, base, route, out) {
  const page = await ctx.newPage();
  try {
    await page.goto(base + route, { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 45); }); });
    await page.waitForTimeout(900);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: out, fullPage: true });
  } catch (e) { /* skip */ }
  finally { await page.close(); }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: VP.width, height: VP.height } });
let idx = 0, done = 0;
async function worker() {
  while (idx < ROUTES.length) {
    const r = ROUTES[idx++];
    const s = slug(r);
    await shoot(ctx, LIVE, r, `verify/shots/${s}__${VP.name}__live.png`);
    await shoot(ctx, CLONE, r, `verify/shots/${s}__${VP.name}__clone.png`);
    done++;
    try { appendFileSync(PROG, `[${done}/${ROUTES.length}] ${r}\n`); } catch {}
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await browser.close();
console.log(`captured ${done} design pages (${VP.name}) -> verify/shots/`);
