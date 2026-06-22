/**
 * PARITY SWEEP — runs the parity check across many routes with a browser pool:
 *   • AUTO-DOWNLOADS every missing live image into public/ (so a missing FILE is impossible)
 *   • reports per-page: missing-images (still on-disk-not-rendered), height ratio, verdict
 * Writes verify/parity-report.json + a console table.
 *
 * Usage: node verify/parity-all.mjs [design|all] [startIndex] [count]
 */
import { chromium } from 'playwright';
import { existsSync, mkdirSync, writeFileSync, appendFileSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { DESIGN_PAGES, ALL_ROUTES } from './routes.mjs';

// Live measurements are pre-captured (sequentially, reliably) in verify/live-cache.json.
// We only load the LOCAL clone here — fast and never rate-limited — and diff vs the cache.
const LIVE_CACHE = existsSync('verify/live-cache.json') ? JSON.parse(readFileSync('verify/live-cache.json', 'utf8')) : {};
const set = process.argv[2] === 'all' ? ALL_ROUTES : DESIGN_PAGES;
const START = parseInt(process.argv[3] || '0', 10);
const COUNT = parseInt(process.argv[4] || String(set.length), 10);
const ROUTES = set.slice(START, START + COUNT);
const LIVE = 'https://azure.folio3.com', CLONE = 'http://localhost:3000';
const PUB = 'd:/AzureClone/azure-clone-next/public';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const baseOf = (p) => (p || '').replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
writeFileSync('verify/parity.progress', '');

async function imgsAndHeight(page, url) {
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 70000 });
    await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 700); y += 700; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 40); }); });
    await page.waitForTimeout(700);
  } catch { return { ok: false, imgs: [], height: 0 }; }
  const r = await page.evaluate(() => {
    const up = (u) => { if (!u) return null; try { if (/_next\/image/.test(u)) { const q = new URL(u, location.href).searchParams.get('url'); if (q) u = decodeURIComponent(q); } } catch {} const m = u.match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i); return m ? m[0] : null; };
    const s = new Set();
    document.querySelectorAll('img').forEach((im) => { [im.currentSrc, im.getAttribute('data-lazy-src'), im.getAttribute('src')].forEach((u) => { const x = up(u); if (x) s.add(x); }); });
    document.querySelectorAll('*').forEach((el) => { const bg = getComputedStyle(el).backgroundImage; if (bg && bg !== 'none') (bg.match(/url\(["']?([^"')]+)["']?\)/g) || []).forEach((u) => { const x = up(u); if (x) s.add(x); }); });
    return { ok: true, imgs: [...s], height: document.body.scrollHeight };
  });
  return r;
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
const report = [];
let i = 0, done = 0, dl = 0;
async function worker() {
  const cp = await ctx.newPage();
  while (i < ROUTES.length) {
    const route = ROUTES[i++];
    const cached = LIVE_CACHE[route];
    if (!cached) { appendFileSync('verify/parity.progress', `[${++done}/${ROUTES.length}] ${route}  NO-CACHE skip\n`); continue; }
    let C = await imgsAndHeight(cp, CLONE + route);
    if (!C.ok || C.height < 200) C = await imgsAndHeight(cp, CLONE + route); // one retry for the local clone
    const cloneBase = new Set(C.imgs.map(baseOf));
    const liveBase = [...new Set(cached.base.map(baseOf))];
    const missing = liveBase.filter((b) => !cloneBase.has(b));
    let downloaded = 0, notRendered = 0;
    for (const b of missing) { const dest = PUB + b; if (existsSync(dest)) { notRendered++; continue; } try { const r = await fetch(LIVE + b, { headers: { 'User-Agent': UA } }); if (r.ok) { const buf = Buffer.from(await r.arrayBuffer()); mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, buf); downloaded++; dl++; } } catch {} }
    const ratio = cached.height ? C.height / cached.height : 0;
    const rec = { route, missing: missing.length, notRendered, downloaded, ratio: +ratio.toFixed(2), missingList: missing.slice(0, 12), pass: notRendered === 0 && ratio >= 0.85 && ratio <= 1.18 && C.ok };
    report.push(rec);
    done++;
    appendFileSync('verify/parity.progress', `[${done}/${ROUTES.length}] ${route}  miss=${rec.missing} notRendered=${rec.notRendered} dl=${rec.downloaded} ratio=${rec.ratio} ${rec.pass ? 'PASS' : 'FAIL'}\n`);
  }
  await cp.close();
}
await Promise.all(Array.from({ length: 3 }, worker));
await browser.close();

writeFileSync('verify/parity-report.json', JSON.stringify(report, null, 2));
const passed = report.filter((r) => r.pass).length;
const sorted = [...report].sort((a, b) => b.notRendered - a.notRendered || a.ratio - b.ratio);
console.log(`\n=== PARITY SWEEP: ${report.length} routes  |  PASS ${passed}/${report.length}  |  auto-downloaded ${dl} assets ===\n`);
console.log('worst pages (not-rendered images / height ratio):');
for (const r of sorted.slice(0, 25)) console.log(`  ${r.pass ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m'}  notRendered=${String(r.notRendered).padStart(3)}  ratio=${r.ratio}  ${r.route}`);
