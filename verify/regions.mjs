/**
 * Component-level visual check for the global chrome (header + footer).
 * The full-page metric is dominated by body content and insensitive to the
 * ~80px header / bottom-anchored footer. This isolates those bands and diffs
 * them at equal dimensions so Phase 2 (header/footer match) is measurable.
 *
 * Usage: node verify/regions.mjs
 */
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { SHOTS, DIFF_OUT, slugOf, pct, THRESHOLDS } from './lib.mjs';

const HEADER_H = 80;   // header band height (matches the 80px header bar exactly)
const FOOTER_H = 620;  // footer band height (bottom-anchored)
const ROUTES = ['/', '/about-us/', '/blog/', '/contact-us/'];

function bandTop(png, h) {
  const out = new PNG({ width: png.width, height: h });
  PNG.bitblt(png, out, 0, 0, png.width, h, 0, 0);
  return out;
}
function bandBottom(png, h) {
  const hh = Math.min(h, png.height);
  const out = new PNG({ width: png.width, height: hh });
  PNG.bitblt(png, out, 0, png.height - hh, png.width, hh, 0, 0);
  return out;
}
function cropTL(png, w, h) {
  if (png.width === w && png.height === h) return png;
  const out = new PNG({ width: w, height: h });
  PNG.bitblt(png, out, 0, 0, w, h, 0, 0);
  return out;
}
function diff(a, b, label, slug) {
  // re-crop BOTH bands to identical dimensions (pixelmatch requires equal sizes)
  const w = Math.min(a.width, b.width);
  const h = Math.min(a.height, b.height);
  const ca = cropTL(a, w, h);
  const cb = cropTL(b, w, h);
  const d = new PNG({ width: w, height: h });
  // 0.2 tolerates cross-stack font anti-aliasing while still flagging real
  // layout / color / content shifts (a moved word = fully mismatched pixels).
  const mm = pixelmatch(ca.data, cb.data, d.data, w, h, { threshold: 0.2, includeAA: false });
  writeFileSync(path.join(DIFF_OUT, `${slug}.${label}.png`), PNG.sync.write(d));
  return ((w * h - mm) / (w * h)) * 100;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log('\nComponent-level chrome diff (header band / footer band)\n');
  let hSum = 0, fSum = 0, n = 0;

  for (const route of ROUTES) {
    const golden = PNG.sync.read(readFileSync(path.join(SHOTS, `${slugOf(route)}.png`)));
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 1200); y += 1200; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 40); }); scrollTo(0, 0); });
    await page.waitForTimeout(600);
    const clone = PNG.sync.read(await page.screenshot({ fullPage: true }));

    const hMatch = diff(bandTop(golden, HEADER_H), bandTop(clone, HEADER_H), 'header', slugOf(route));
    const fMatch = diff(bandBottom(golden, FOOTER_H), bandBottom(clone, FOOTER_H), 'footer', slugOf(route));
    hSum += hMatch; fSum += fMatch; n++;
    const c = (v) => (v >= 95 ? '\x1b[32m' : v >= 85 ? '\x1b[33m' : '\x1b[31m');
    console.log(`${route.padEnd(16)} header ${c(hMatch)}${pct(hMatch).padStart(6)}\x1b[0m   footer ${c(fMatch)}${pct(fMatch).padStart(6)}\x1b[0m`);
  }
  const hAvg = hSum / n, fAvg = fSum / n;
  const G = '\x1b[32m', R = '\x1b[31m', X = '\x1b[0m';
  const hOk = hAvg >= THRESHOLDS.header, fOk = fAvg >= THRESHOLDS.footer;
  console.log(`\naverage         header ${pct(hAvg)} (≥${THRESHOLDS.header} ${hOk ? G + 'PASS' : R + 'FAIL'}${X})   footer ${pct(fAvg)} (≥${THRESHOLDS.footer} ${fOk ? G + 'PASS' : R + 'FAIL'}${X})`);
  console.log('diffs → verify/diffs/<slug>.header.png / .footer.png\n');
  await browser.close();
  process.exit(hOk && fOk ? 0 : 1);
})();
