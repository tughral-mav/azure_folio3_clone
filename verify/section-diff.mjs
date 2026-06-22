/**
 * Per-section fidelity — the cascade-immune measurement (Lever-1/2 harness).
 * Full-page diff is dominated by vertical cascade, so it can't see structural
 * gains. This aligns clone sections to LIVE sections BY HEADING TEXT, then diffs
 * each matched section in isolation → a true per-section score + a worklist of
 * which sections on which page are still <90%.
 *
 * Usage: node verify/section-diff.mjs /azure-for-healthcare/
 */
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { DIFF_OUT, slugOf, pct, THRESHOLDS } from './lib.mjs';

const route = process.argv[2] || '/azure-for-healthcare/';
const LIVE = 'https://azure.folio3.com';
const CLONE = 'http://localhost:3000';
const norm = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 50);

async function grab(page, base, selector) {
  await page.goto(`${base}${route}`, { waitUntil: 'load', timeout: 70000 });
  await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 900); y += 900; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 50); }); scrollTo(0, 0); });
  await page.waitForTimeout(800);
  const shot = PNG.sync.read(await page.screenshot({ fullPage: true }));
  const rects = await page.evaluate((sel) => {
    return [...document.querySelectorAll(sel)]
      .map((el) => {
        const h = el.querySelector('h2,h3');
        const r = el.getBoundingClientRect();
        return { heading: h?.textContent?.trim() || '', y: Math.round(r.top + scrollY), h: Math.round(r.height) };
      })
      .filter((s) => s.heading && s.h > 80);
  }, selector);
  return { shot, rects };
}

function cropBand(png, y, h) {
  const hh = Math.min(h, png.height - y);
  if (hh <= 0) return null;
  const out = new PNG({ width: png.width, height: hh });
  PNG.bitblt(png, out, 0, y, png.width, hh, 0, 0);
  return out;
}
function diff(a, b) {
  const w = Math.min(a.width, b.width), h = Math.min(a.height, b.height);
  const ca = a.width === w && a.height === h ? a : (() => { const o = new PNG({ width: w, height: h }); PNG.bitblt(a, o, 0, 0, w, h, 0, 0); return o; })();
  const cb = b.width === w && b.height === h ? b : (() => { const o = new PNG({ width: w, height: h }); PNG.bitblt(b, o, 0, 0, w, h, 0, 0); return o; })();
  const d = new PNG({ width: w, height: h });
  const mm = pixelmatch(ca.data, cb.data, d.data, w, h, { threshold: 0.2, includeAA: false });
  return { score: ((w * h - mm) / (w * h)) * 100, d, w, h };
}

(async () => {
  const browser = await chromium.launch();
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log(`\nPer-section diff: ${route}  (LIVE vs clone, aligned by heading)\n`);

  const live = await grab(p, LIVE, '.elementor-top-section, section');
  const clone = await grab(p, CLONE, 'section');

  // match live sections to clone sections by normalized heading
  const cloneByHead = new Map(clone.rects.map((s) => [norm(s.heading), s]));
  const rows = [];
  for (const ls of live.rects) {
    const cs = cloneByHead.get(norm(ls.heading));
    if (!cs) { rows.push({ heading: ls.heading.slice(0, 40), score: null }); continue; }
    const a = cropBand(live.shot, ls.y, ls.h), b = cropBand(clone.shot, cs.y, cs.h);
    if (!a || !b) { rows.push({ heading: ls.heading.slice(0, 40), score: null }); continue; }
    const { score } = diff(a, b);
    rows.push({ heading: ls.heading.slice(0, 40), score, liveH: ls.h, cloneH: cs.h });
  }

  const matched = rows.filter((r) => r.score != null);
  const G = '\x1b[32m', Y = '\x1b[33m', R = '\x1b[31m', X = '\x1b[0m';
  for (const r of rows) {
    if (r.score == null) { console.log(`  ${R}—   missing${X}  ${r.heading}`); continue; }
    const c = r.score >= THRESHOLDS.visual ? G : r.score >= 80 ? Y : R;
    console.log(`  ${c}${pct(r.score).padStart(6)}${X}  ${r.heading}  ${r.liveH !== r.cloneH ? `(h ${r.liveH}vs${r.cloneH})` : ''}`);
  }
  const avg = matched.reduce((a, r) => a + r.score, 0) / (matched.length || 1);
  console.log(`\n  matched ${matched.length}/${live.rects.length} sections · avg ${pct(avg)} · below90: ${matched.filter((r) => r.score < 90).length}`);
  writeFileSync(path.join(DIFF_OUT, `${slugOf(route)}.sections.json`), JSON.stringify(rows, null, 2));
  await browser.close();
})();
