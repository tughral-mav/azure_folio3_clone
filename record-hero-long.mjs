/**
 * Long hero-slider recording (45s) + robust functionality probe.
 * Tracks the Swiper wrapper transform + active slide to measure autoplay
 * interval and capture each slide's image as it lazy-loads on activation.
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('verify/hero', { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ userAgent: UA, viewport: { width: 1440, height: 820 }, recordVideo: { dir: 'verify/hero/', size: { width: 1440, height: 820 } } });
  const p = await ctx.newPage();
  await p.goto('https://azure.folio3.com/', { waitUntil: 'load', timeout: 70000 });
  await p.waitForTimeout(1500);

  const slideImg = {}; // h1 -> img
  const timeline = [];
  const t0 = Date.now();

  for (let i = 0; i < 90; i++) { // 90 * 500ms = 45s
    const snap = await p.evaluate(() => {
      const wrap = document.querySelector('.e-n-carousel .swiper-wrapper, .swiper-wrapper');
      const tf = wrap ? getComputedStyle(wrap).transform : '';
      const active = document.querySelector('.swiper-slide-active') || [...document.querySelectorAll('.swiper-slide')].find((s) => s.getBoundingClientRect().left >= -50 && s.getBoundingClientRect().left < 400);
      const h1 = (active?.querySelector('h1')?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30);
      const img = [...(active?.querySelectorAll('img') || [])].map((i) => (i.currentSrc || i.src || '').replace(location.origin, '')).find((x) => x && !x.startsWith('data:')) || '';
      return { tf: tf.slice(0, 40), h1, img };
    });
    if (snap.h1 && snap.img) slideImg[snap.h1] = snap.img;
    const last = timeline[timeline.length - 1];
    if (!last || last.h1 !== snap.h1) timeline.push({ t: +((Date.now() - t0) / 1000).toFixed(1), h1: snap.h1, tf: snap.tf });
    await p.waitForTimeout(500);
  }

  const times = timeline.map((x) => x.t);
  const intervals = times.slice(1).map((t, i) => +(t - times[i]).toFixed(1));
  const result = { timeline, autoplayIntervalsSec: intervals, slideImages: slideImg };
  writeFileSync('verify/hero/_hero_long.json', JSON.stringify(result, null, 2));

  console.log('TIMELINE (sec:slide):');
  timeline.forEach((x) => console.log(`  ${x.t}s  ${x.h1}`));
  console.log('AUTOPLAY intervals(s):', intervals.join(', '));
  console.log('SLIDE IMAGES:');
  Object.entries(slideImg).forEach(([h, img]) => console.log(`  "${h}" -> ${img}`));

  await p.close();
  await ctx.close();
  await b.close();
  console.log('\nLong video → verify/hero/ (newest .webm)');
})();
