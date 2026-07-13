/**
 * Screenshot the clone (localhost) and the live page full-length, and dump a structural
 * diff: rendered section headings, internal links (+ on-clone HTTP status), and any broken
 * images on the clone. Output → verify/_analysis/shots/.
 * Usage: node verify/shot-compare.mjs /petrochemical-producer-edms-compliance-agent/
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const route = process.argv[2];
const slug = (route.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
const CLONE = 'http://localhost:3000' + route;
const LIVE = 'https://azure.folio3.com' + route;
const OUT = path.resolve('verify/_analysis/shots');
mkdirSync(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';

async function loadFull(p, url) {
  await p.goto(url, { waitUntil: 'load', timeout: 90000 });
  for (let i = 0; i < 2; i++) { await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 50); }); }); await p.waitForTimeout(700); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
}

const b = await chromium.launch();
const ctx = await b.newContext({ userAgent: UA, viewport: { width: 1440, height: 1000 } });

// ---- CLONE ----
const cp = await ctx.newPage();
await loadFull(cp, CLONE);
await cp.screenshot({ path: path.join(OUT, `clone-${slug}.png`), fullPage: true });
const cloneData = await cp.evaluate(() => {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const headings = [...document.querySelectorAll('main h1, main h2, main h3')].map((h) => `${h.tagName}:${clean(h.textContent)}`.slice(0, 80));
  const broken = [...document.querySelectorAll('img')].filter((im) => !im.src.startsWith('data:') && im.complete && im.naturalWidth === 0).map((im) => im.getAttribute('src'));
  const links = [...new Set([...document.querySelectorAll('main a[href]')].map((a) => a.getAttribute('href')).filter((h) => h && h.startsWith('/') && !h.startsWith('//')))];
  return { headings, broken, links };
});

// verify internal links resolve on the clone
const linkStatus = {};
for (const href of cloneData.links) {
  try { const r = await ctx.request.get('http://localhost:3000' + href, { maxRedirects: 0 }); linkStatus[href] = r.status(); }
  catch (e) { linkStatus[href] = 'ERR'; }
}

// ---- LIVE ----
const lp = await ctx.newPage();
await loadFull(lp, LIVE);
await lp.screenshot({ path: path.join(OUT, `live-${slug}.png`), fullPage: true });
const liveHeadings = await lp.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map((h) => `${h.tagName}:${(h.textContent || '').replace(/\s+/g, ' ').trim()}`.slice(0, 80)).filter((t) => t.length > 4));

await b.close();
writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ cloneHeadings: cloneData.headings, liveHeadings, brokenImages: cloneData.broken, linkStatus }, null, 2));
console.log('CLONE headings:', cloneData.headings.length, '| LIVE headings:', liveHeadings.length);
console.log('BROKEN images on clone:', cloneData.broken.length, JSON.stringify(cloneData.broken));
const bad = Object.entries(linkStatus).filter(([, s]) => !(s >= 200 && s < 400));
console.log('LINKS checked:', Object.keys(linkStatus).length, '| non-2xx/3xx:', bad.length, JSON.stringify(bad));
console.log('screenshots → verify/_analysis/shots/{clone-full,live-full}.png');
