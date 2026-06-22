/**
 * Build side-by-side (LIVE | CLONE) composites of every home section, aligned
 * by heading, so each section's visual design can be compared directly.
 */
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import { writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('verify/sbs', { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const norm = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 40);

async function grab(b, url) {
  const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 900 } });
  await p.goto(url, { waitUntil: 'load', timeout: 70000 });
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 90); }); scrollTo(0, 0); });
  await p.waitForTimeout(1200);
  const shot = PNG.sync.read(await p.screenshot({ fullPage: true }));
  const rects = await p.evaluate(() => {
    const top = [...document.querySelectorAll('section, .elementor-section.elementor-top-section')].filter((s) => { const r = s.getBoundingClientRect(); return r.height > 70 && r.width > 600; });
    const outer = top.filter((s) => !top.some((o) => o !== s && o.contains(s)));
    return outer.map((s) => { const h = s.querySelector('h1,h2,h3'); const r = s.getBoundingClientRect(); return { heading: (h?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40), y: Math.round(r.top + scrollY), h: Math.round(r.height) }; }).filter((s) => s.heading);
  });
  await p.close();
  return { shot, rects };
}

// scale a cropped section to target width, return PNG
function sectionImg(shot, y, h, tw) {
  h = Math.min(h, shot.height - y, 1400);
  if (h <= 0) return null;
  const crop = new PNG({ width: shot.width, height: h });
  PNG.bitblt(shot, crop, 0, y, shot.width, h, 0, 0);
  const th = Math.round(h * (tw / shot.width));
  const out = new PNG({ width: tw, height: th });
  for (let ty = 0; ty < th; ty++) for (let tx = 0; tx < tw; tx++) {
    const sx = Math.floor(tx * shot.width / tw), sy = Math.floor(ty * h / th);
    const si = (crop.width * sy + sx) << 2, di = (tw * ty + tx) << 2;
    out.data[di] = crop.data[si]; out.data[di + 1] = crop.data[si + 1]; out.data[di + 2] = crop.data[si + 2]; out.data[di + 3] = 255;
  }
  return out;
}

(async () => {
  const b = await chromium.launch();
  const live = await grab(b, 'https://azure.folio3.com/');
  const clone = await grab(b, 'http://localhost:3000/');
  await b.close();

  const cloneByHead = new Map(clone.rects.map((r) => [norm(r.heading), r]));
  const tw = 700, gap = 16;
  let idx = 0;
  for (const ls of live.rects) {
    const cs = cloneByHead.get(norm(ls.heading));
    const li = sectionImg(live.shot, ls.y, ls.h, tw);
    const ci = cs ? sectionImg(clone.shot, cs.y, cs.h, tw) : null;
    if (!li) continue;
    const H = Math.max(li.height, ci ? ci.height : 0);
    const comp = new PNG({ width: tw * 2 + gap, height: H });
    for (let i = 0; i < comp.data.length; i += 4) { comp.data[i] = 240; comp.data[i + 1] = 240; comp.data[i + 2] = 240; comp.data[i + 3] = 255; }
    PNG.bitblt(li, comp, 0, 0, li.width, li.height, 0, 0);
    if (ci) PNG.bitblt(ci, comp, 0, 0, ci.width, ci.height, tw + gap, 0);
    const slug = norm(ls.heading).replace(/ /g, '_').slice(0, 24) || 'sec';
    writeFileSync(`verify/sbs/${String(idx).padStart(2, '0')}_${slug}.png`, PNG.sync.write(comp));
    console.log(`${String(idx).padStart(2, '0')} [${ls.heading.slice(0, 38).padEnd(38)}] live h=${ls.h}  clone ${cs ? 'h=' + cs.h : 'MISSING'}`);
    idx++;
  }
  console.log('\nside-by-side (LEFT=live, RIGHT=clone) → verify/sbs/');
})();
