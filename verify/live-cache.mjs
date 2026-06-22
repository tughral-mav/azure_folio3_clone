/** Capture the LIVE site's height + base images for every design route ONCE, sequentially
 *  (reliable, no rate-limiting), into verify/live-cache.json. Sweeps then compare the local
 *  clone against this cache instead of hammering the live 60x concurrently. */
import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync, appendFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';

const LIVE = 'https://azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const baseOf = (p) => (p || '').replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
const CACHE = 'verify/live-cache.json';
const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {};

async function grab(page, url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 90000 });
      await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 700) { clearInterval(t); r(); } }, 50); }); });
      await page.waitForTimeout(800);
      const r = await page.evaluate(() => {
        const up = (u) => { if (!u) return null; const m = (u || '').match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i); return m ? m[0] : null; };
        const s = new Set();
        document.querySelectorAll('img').forEach((im) => { [im.currentSrc, im.getAttribute('data-lazy-src'), im.src].forEach((u) => { const x = up(u); if (x) s.add(x); }); });
        document.querySelectorAll('*').forEach((el) => { const bg = getComputedStyle(el).backgroundImage; if (bg && bg !== 'none') (bg.match(/url\(["']?([^"')]+)["']?\)/g) || []).forEach((u) => { const x = up(u); if (x) s.add(x); }); });
        return { height: document.body.scrollHeight, imgs: [...s] };
      });
      if (r.height > 200) return r;
    } catch { await page.waitForTimeout(1500); }
  }
  return null;
}

const browser = await chromium.launch();
const page = await browser.newPage({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
let done = 0;
for (const route of DESIGN_PAGES) {
  if (cache[route]) { done++; continue; } // resume: skip already-cached
  const r = await grab(page, LIVE + route);
  if (r) { cache[route] = { height: r.height, base: [...new Set(r.imgs.map(baseOf))] }; writeFileSync(CACHE, JSON.stringify(cache)); }
  appendFileSync('verify/live-cache.progress', `[${++done}/${DESIGN_PAGES.length}] ${route} ${r ? r.height + 'px ' + cache[route].base.length + 'img' : 'FAIL'}\n`);
}
await browser.close();
console.log(`cached ${Object.keys(cache).length}/${DESIGN_PAGES.length} live pages`);
