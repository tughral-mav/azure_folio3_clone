/**
 * Animation + exact-image audit of the live site.
 * Two outputs per page:
 *   1) animations.json — every animated element: its text/anchor, the Elementor
 *      entrance animation (_animation: fadeInUp/zoomIn/…), delay, and any CSS
 *      keyframe animation (name/duration/timing). This is what lets us CLONE
 *      the motion exactly instead of guessing.
 *   2) a recorded .webm video of the page scrolling (human reference).
 * Also dumps the EXACT images per section (fixes wrong Industries images).
 *
 * Run: PLAYWRIGHT_BROWSERS_PATH=d:/AzureClone/.ms-playwright node anim-audit.mjs
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = 'verify/anim/';
mkdirSync(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const PAGES = { home: '/', healthcare: '/azure-for-healthcare/' };

function audit() {
  // entrance animations (Elementor stores them in data-settings JSON)
  const entrance = [];
  document.querySelectorAll('[data-settings]').forEach((el) => {
    try {
      const s = JSON.parse(el.getAttribute('data-settings'));
      const anim = s._animation || s.animation;
      if (anim && anim !== 'none') {
        const label = el.querySelector('h1,h2,h3')?.textContent?.trim().slice(0, 40)
          || el.className.split(' ').slice(0, 2).join('.');
        entrance.push({ animation: anim, delay: s._animation_delay ?? s.animation_delay ?? 0, label });
      }
    } catch {}
  });
  // CSS keyframe animations actually running
  const css = [];
  document.querySelectorAll('*').forEach((el) => {
    const c = getComputedStyle(el);
    if (c.animationName && c.animationName !== 'none') {
      css.push({ name: c.animationName, duration: c.animationDuration, timing: c.animationTimingFunction, iteration: c.animationIterationCount, label: el.tagName.toLowerCase() + '.' + el.className.split(' ')[0] });
    }
  });
  // counters (animate 0 → value)
  const counters = [...document.querySelectorAll('.elementor-counter-number, [data-to-value], [class*=counter]')]
    .map((el) => ({ to: el.getAttribute('data-to-value') || el.textContent.trim().slice(0, 12), duration: el.getAttribute('data-duration') || null }))
    .filter((c) => c.to).slice(0, 12);
  // exact images per section (with the section heading as context)
  const sections = [...document.querySelectorAll('.elementor-top-section, section')].map((sec) => {
    const heading = sec.querySelector('h1,h2,h3')?.textContent?.trim().slice(0, 40) || '';
    const imgs = [...sec.querySelectorAll('img')].map((i) => ({ src: (i.currentSrc || i.src || '').replace(location.origin, ''), alt: i.alt || null })).filter((i) => i.src && !i.src.startsWith('data:'));
    // CSS background images too
    const bgs = [];
    sec.querySelectorAll('*').forEach((e) => { const m = (getComputedStyle(e).backgroundImage || '').match(/url\(["']?([^"')]+)/); if (m && !m[1].startsWith('data:')) bgs.push(m[1].replace(location.origin, '')); });
    return { heading, imgs: imgs.slice(0, 8), bgs: [...new Set(bgs)].slice(0, 4) };
  }).filter((s) => s.heading && (s.imgs.length || s.bgs.length));
  return { entranceCount: entrance.length, entrance: entrance.slice(0, 25), css: css.slice(0, 15), counters, sections };
}

(async () => {
  for (const [name, path] of Object.entries(PAGES)) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 }, recordVideo: { dir: OUT, size: { width: 1440, height: 810 } } });
    const page = await ctx.newPage();
    await page.goto(`https://azure.folio3.com${path}`, { waitUntil: 'load', timeout: 70000 });
    // slow scroll to trigger + record entrance animations
    await page.evaluate(async () => { const s = (ms) => new Promise((r) => setTimeout(r, ms)); for (let y = 0; y < document.body.scrollHeight; y += 350) { window.scrollTo(0, y); await s(180); } });
    await page.waitForTimeout(500);
    const data = await page.evaluate(audit);
    writeFileSync(`${OUT}${name}.json`, JSON.stringify(data, null, 2));
    console.log(`${name}: entrance=${data.entranceCount} css=${data.css.length} counters=${data.counters.length} sections=${data.sections.length}`);
    await page.close();
    await ctx.close(); // finalizes video
    await browser.close();
  }
  console.log(`\nVideos + json → ${OUT}`);
})();
