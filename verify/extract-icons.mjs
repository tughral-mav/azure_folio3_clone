/**
 * Extract the FULL inline-SVG icons the live page uses inside the About-Client / Problem /
 * Needs / Solution sections (the ones the content capture missed), each mapped to its card
 * title in DOM order. Output → verify/_analysis/<slug>.icons.json
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const route = process.argv[2];
const slug = (route.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
const OUT = path.resolve('verify/_analysis');
mkdirSync(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';

const b = await chromium.launch();
const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 1100 } });
await p.goto('https://azure.folio3.com' + route, { waitUntil: 'load', timeout: 90000 });
for (let i = 0; i < 2; i++) { await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 50); }); }); await p.waitForTimeout(500); }

const data = await p.evaluate(() => {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const tops = [...document.querySelectorAll('.elementor-top-section, .e-con.e-parent')];
  const outer = tops.filter((s) => !tops.some((o) => o !== s && o.contains(s)));
  const byHeading = {};
  outer.forEach((sec) => {
    const h = sec.querySelector('h1,h2,h3'); const name = h ? clean(h.textContent) : '(none)';
    const svgs = [...sec.querySelectorAll('svg')].map((svg) => {
      // nearest card title: climb to a container that holds a heading
      let title = ''; let node = svg;
      for (let up = 0; up < 6 && node && !title; up++) { node = node.parentElement; if (!node) break; const hh = node.querySelector('h3,h4,h5'); if (hh) title = clean(hh.textContent); }
      const r = svg.getBoundingClientRect();
      return { title: title.slice(0, 60), w: Math.round(r.width), h: Math.round(r.height), svg: svg.outerHTML };
    }).filter((i) => i.svg.length > 60 && i.w > 8);
    if (svgs.length) byHeading[name.slice(0, 50)] = svgs;
  });
  return byHeading;
});

await b.close();
writeFileSync(path.join(OUT, `${slug}.icons.json`), JSON.stringify(data, null, 2));
Object.entries(data).forEach(([sec, arr]) => console.log(`"${sec}": ${arr.length} icons -> ${arr.map((i) => i.title.slice(0, 20)).join(' | ')}`));
