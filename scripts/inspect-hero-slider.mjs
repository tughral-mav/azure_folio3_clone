/**
 * Deep inspection + long recording of the HOME HERO SLIDER.
 * Records ~28s of video (captures autoplay cycling + transitions) and extracts:
 *   - slider engine (Swiper/Slick) + config (autoplay delay, effect, loop, speed)
 *   - every slide's content (h1, highlighted phrase, subtext, CTA, image)
 *   - observed autoplay interval (by polling the active slide over time)
 *   - navigation (pagination dots / arrows), swipe/drag
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

  // --- static config + per-slide content ---
  const config = await p.evaluate(() => {
    const out = { engine: 'unknown', slides: [], pagination: false, arrows: false, swiper: null };
    // Swiper?
    const sw = document.querySelector('.swiper, [class*=swiper-container]');
    if (sw) {
      out.engine = 'swiper';
      out.pagination = !!document.querySelector('.swiper-pagination');
      out.arrows = !!document.querySelector('.swiper-button-next, .swiper-button-prev');
      const inst = sw.swiper;
      if (inst) out.swiper = { effect: inst.params?.effect, speed: inst.params?.speed, loop: inst.params?.loop, autoplay: inst.params?.autoplay, allowTouchMove: inst.params?.allowTouchMove };
    }
    // Slick?
    if (document.querySelector('.slick-slider')) out.engine = out.engine === 'unknown' ? 'slick' : out.engine + '+slick';
    // per-slide content — the hero slides each have an h1
    const slideEls = [...document.querySelectorAll('.swiper-slide, .slick-slide, [class*=hero] [class*=slide]')].filter((s) => s.querySelector('h1'));
    const seen = new Set();
    for (const s of slideEls) {
      const h1 = s.querySelector('h1');
      const txt = (h1?.textContent || '').replace(/\s+/g, ' ').trim();
      if (!txt || seen.has(txt)) continue;
      seen.add(txt);
      const hl = s.querySelector('h1 span, h1 b, h1 strong')?.textContent?.trim() || '';
      const sub = s.querySelector('p')?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 200) || '';
      const cta = s.querySelector('a.elementor-button, a[class*=btn], a.button');
      const img = [...s.querySelectorAll('img')].map((i) => (i.currentSrc || i.src || '').replace(location.origin, '')).find((x) => x && !x.startsWith('data:')) || '';
      out.slides.push({ h1: txt, highlight: hl, subtext: sub, cta: cta?.textContent?.trim() || '', ctaHref: cta?.getAttribute('href') || '', img });
    }
    return out;
  });

  // --- observe autoplay: poll active slide's h1 over 24s ---
  const timeline = [];
  const t0 = Date.now();
  for (let i = 0; i < 60; i++) {
    const active = await p.evaluate(() => {
      const a = document.querySelector('.swiper-slide-active, .slick-current, .swiper-slide[class*=active]');
      return (a?.querySelector('h1')?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
    });
    const last = timeline[timeline.length - 1];
    if (!last || last.h1 !== active) timeline.push({ t: Math.round((Date.now() - t0) / 1000 * 10) / 10, h1: active });
    await p.waitForTimeout(400);
  }

  // compute autoplay interval from change timestamps
  const changes = timeline.map((x) => x.t);
  const intervals = changes.slice(1).map((t, i) => Math.round((t - changes[i]) * 10) / 10);

  const result = { config, slideCount: config.slides.length, observedTimeline: timeline, autoplayIntervalsSec: intervals };
  writeFileSync('verify/hero/_hero_slider.json', JSON.stringify(result, null, 2));

  console.log('ENGINE:', config.engine, '| pagination:', config.pagination, '| arrows:', config.arrows);
  console.log('SWIPER cfg:', JSON.stringify(config.swiper));
  console.log('SLIDES:', config.slides.length);
  config.slides.forEach((s, i) => console.log(`  [${i}] "${s.h1.slice(0, 50)}"  hl="${s.highlight}"  cta="${s.cta}"  img=${s.img.split('/').pop()}`));
  console.log('AUTOPLAY timeline (sec→slide):', timeline.map((x) => `${x.t}:${x.h1.slice(0, 18)}`).join('  '));
  console.log('intervals(s):', intervals.join(', '));

  await p.close();
  await ctx.close();
  await b.close();
  console.log('\nVideo → verify/hero/*.webm');
})();
