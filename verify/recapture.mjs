/**
 * Robust single-page re-capture for the golden master.
 * The original bulk capture left lazy sliders / scroll-animated sections blank.
 * This drives a much more thorough render before screenshotting:
 *   - slow stepwise scroll (triggers IntersectionObserver animations + lazy imgs)
 *   - waits for Swiper/Slick sliders to initialize
 *   - multiple settle passes, then scroll home and shoot
 *
 * Usage: node verify/recapture.mjs <path> [outFile]
 *   node verify/recapture.mjs / clone-kit/screenshots/desktop/home.png
 */
import { chromium } from 'playwright';
import { writeFileSync, copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const route = process.argv[2] || '/';
const LIVE = 'https://azure.folio3.com';
const out = process.argv[3] || `clone-kit/screenshots/desktop/${(route.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_')}.png`;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ userAgent: UA, viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  console.log(`› Re-capturing ${LIVE}${route}`);
  await page.goto(`${LIVE}${route}`, { waitUntil: 'networkidle', timeout: 90000 });

  // Slow stepwise scroll to trigger lazy content + scroll animations.
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = 400;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(120);
    }
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(800);
  });

  // Give Swiper/Slick a moment, nudge each slider to its first slide.
  await page.evaluate(() => {
    document.querySelectorAll('.swiper').forEach((s) => (s.swiper && s.swiper.slideTo ? s.swiper.slideTo(0, 0) : null));
  }).catch(() => {});
  await page.waitForTimeout(1500);

  // Second settle pass top→bottom, then home.
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await sleep(80); }
    window.scrollTo(0, 0);
    await sleep(600);
  });

  if (existsSync(out)) { copyFileSync(out, out.replace(/\.png$/, '.orig.png')); console.log(`  backed up → ${path.basename(out)}.orig.png`); }
  const buf = await page.screenshot({ fullPage: true });
  writeFileSync(out, buf);
  console.log(`  saved → ${out} (${buf.length} bytes)`);
  await browser.close();
})();
