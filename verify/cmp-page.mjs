/**
 * Per-page live-vs-clone fidelity diff. Dumps, for each top-level section of BOTH the live and the
 * clone: heading text, visible image base-filenames, widget hints (tabs/flip/counter/accordion/
 * carousel), card count, and stat numbers. Then auto-flags concrete differences.
 * Usage: PLAYWRIGHT_BROWSERS_PATH=… node verify/cmp-page.mjs <route>
 */
import { chromium } from 'playwright';
const route = process.argv[2];
if (!route) { console.log('need a route'); process.exit(1); }
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const base = (u) => { if (!u) return ''; try { if (u.includes('/_next/image')) u = decodeURIComponent(new URL(u, 'http://x').searchParams.get('url') || ''); } catch {} u = u.split('?')[0].split('/').pop() || ''; return u.replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, '').toLowerCase(); };
const b = await chromium.launch();
async function dump(url, isLive) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: isLive ? UA : undefined });
  await p.goto(url, { waitUntil: 'load', timeout: 75000 });
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 22); }); });
  await p.waitForTimeout(2200);
  const secs = await p.evaluate(() => {
    const txt = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();
    const root = document.querySelector('main') || document.body;
    const tops = [...document.querySelectorAll('.elementor-top-section')];
    const list = tops.length ? tops : [...root.querySelectorAll(':scope > section, :scope > div > section, section')];
    return list.map((s) => {
      const heads = [...s.querySelectorAll('h1,h2,h3,.elementor-heading-title')].map((h) => txt(h)).filter((t) => t && t.length < 60);
      const imgs = [...s.querySelectorAll('img')].filter((i) => { const bw = i.getBoundingClientRect().width; return i.offsetParent !== null && bw > 16 && (i.naturalWidth > 30 || /\.svg/i.test(i.currentSrc || i.src || '') || bw > 16); }).map((i) => i.currentSrc || i.src);
      const bgs = []; s.querySelectorAll('*').forEach((e) => { const bg = getComputedStyle(e).backgroundImage; if (bg && bg.includes('wp-content')) bgs.push(bg); });
      const w = {};
      if (s.querySelector('.elementor-widget-n-tabs,[class*="e-n-tabs"],[role="tab"]')) w.tabs = 1;
      if (s.querySelector('.elementor-flip-box,[style*="rotateY"],[style*="translateY(100%)"]')) w.flip = 1;
      if (s.querySelector('.elementor-counter,.elementor-counter-number,[data-counter]')) w.counter = 1;
      if (s.querySelector('.elementor-accordion,.elementor-toggle,details')) w.accordion = 1;
      if (s.querySelector('.elementor-widget-slides,.swiper,.elementor-image-carousel')) w.carousel = 1;
      const cards = s.querySelectorAll('[class*="icon-box"],[class*="flip-box"],.elementor-column [class*="box"]').length;
      const counters = [...s.querySelectorAll('.elementor-counter-number')].map((n) => (n.getAttribute('data-to-value') || txt(n)));
      return { h: heads[0] || '(no heading)', heads: [...new Set(heads)].slice(0, 8), imgs, bgs: bgs.length, widgets: Object.keys(w), counters };
    }).filter((s) => s.heads.length || s.imgs.length);
  });
  await p.close();
  return secs.map((s) => ({ ...s, imgBases: [...new Set(s.imgs.map((u) => { try { return new URL(u).pathname.split('/').pop().split('?')[0].replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, '').toLowerCase(); } catch { return ''; } }).filter(Boolean))] }));
}
const live = await dump('https://azure.folio3.com' + route, true);
const clone = await dump('http://localhost:3000' + route, false);
await b.close();
console.log(`### ${route} — LIVE ${live.length} sections vs CLONE ${clone.length} sections ###\n`);
const norm = (h) => (h || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
console.log('--- LIVE ---');
live.forEach((s, i) => console.log(`L${i} | ${s.h}\n    heads: ${s.heads.join(' | ')}\n    imgs(${s.imgBases.length}): ${s.imgBases.join(', ')}${s.bgs ? ' | bgImgs:' + s.bgs : ''}${s.widgets.length ? ' | widgets:' + s.widgets.join(',') : ''}${s.counters.length ? ' | counters:' + s.counters.join(',') : ''}`));
console.log('\n--- CLONE ---');
clone.forEach((s, i) => console.log(`C${i} | ${s.h}\n    heads: ${s.heads.join(' | ')}\n    imgs(${s.imgBases.length}): ${s.imgBases.join(', ')}${s.bgs ? ' | bgImgs:' + s.bgs : ''}${s.widgets.length ? ' | widgets:' + s.widgets.join(',') : ''}${s.counters.length ? ' | counters:' + s.counters.join(',') : ''}`));
// auto-flags
console.log('\n--- AUTO-FLAGS ---');
const flags = [];
const liveHeads = new Set(live.flatMap((s) => s.heads.map(norm)));
const cloneHeads = new Set(clone.flatMap((s) => s.heads.map(norm)));
for (const s of live) for (const h of s.heads) if (norm(h).length > 6 && ![...cloneHeads].some((c) => c.includes(norm(h)) || norm(h).includes(c))) flags.push(`MISSING SECTION/HEADING in clone: "${h}"`);
const liveImgs = new Set(live.flatMap((s) => s.imgBases));
const cloneImgs = new Set(clone.flatMap((s) => s.imgBases));
for (const im of liveImgs) if (im && !cloneImgs.has(im) && !/svg|logo|icon-|arrow|chevron/.test(im)) flags.push(`IMG on live not visibly on clone: ${im}`);
// widget mismatches per matched heading
for (const ls of live) { const cs = clone.find((c) => c.heads.some((ch) => norm(ch) === norm(ls.h) || (norm(ch).length > 6 && (norm(ch).includes(norm(ls.h)) || norm(ls.h).includes(norm(ch)))))); if (cs) { for (const w of ls.widgets) if (!cs.widgets.includes(w)) flags.push(`WIDGET "${w}" present on live but not clone in section "${ls.h}"`); } }
if (!flags.length) console.log('  (no auto-flags — eyeball the LIVE vs CLONE dumps above for order/layout/wrong-image issues)');
else [...new Set(flags)].forEach((f) => console.log('  ⚠ ' + f));
