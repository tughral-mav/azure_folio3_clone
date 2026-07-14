/**
 * Per-page icon extraction for case studies (Option A). Pulls the live page's inline SVG icons,
 * maps each to its card heading, strips broken clip-paths, writes to
 * azure-clone-next/public/icons/<pageSlug>/<iconSlug(title)>.svg, and merges the paths into
 * content-kit/card-icons.json so the shared OrderedRenderer's cardIcon(title) picks them up.
 *
 * Usage: node verify/extract-page-icons.mjs /azure-automated-data-reporting-for-slb/
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const route = process.argv[2];
if (!route) { console.error('need a route'); process.exit(1); }
const pageSlug = route.replace(/^\/|\/$/g, '');           // e.g. case-studies/popcorn-...
const APP = path.resolve('azure-clone-next');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
// iconSlug — MUST match src/lib/content.ts
const iconSlug = (t) => (t || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);

const b = await chromium.launch();
const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 1100 } });
await p.goto('https://azure.folio3.com' + route, { waitUntil: 'load', timeout: 90000 });
for (let i = 0; i < 2; i++) { await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 50); }); }); await p.waitForTimeout(500); }

const pairs = await p.evaluate(() => {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const out = [];
  const seen = new Set();
  for (const svg of document.querySelectorAll('svg')) {
    const r = svg.getBoundingClientRect();
    if (r.width < 10 || r.width > 160) continue;           // skip page chrome / oversized decor
    // nearest card heading (h3/h4/h5) climbing up
    let title = '', node = svg;
    for (let up = 0; up < 6 && node && !title; up++) { node = node.parentElement; if (!node) break; const h = node.querySelector('h3,h4,h5'); if (h) title = clean(h.textContent); }
    if (!title || title.length < 3 || title.startsWith('<')) continue;
    const key = title.toLowerCase();
    if (seen.has(key)) continue; seen.add(key);
    out.push({ title, svg: svg.outerHTML });
  }
  return out;
});
await b.close();

const dir = path.join(APP, 'public/icons', pageSlug);
mkdirSync(dir, { recursive: true });
const manifestPath = path.join(APP, 'content-kit/card-icons.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
manifest[pageSlug] = manifest[pageSlug] || {};
let n = 0;
for (const { title, svg } of pairs) {
  const slug = iconSlug(title);
  if (!slug) continue;
  const clean = svg.replace(/\s*clip-path="url\([^)]*\)"/g, '').replace(/<clipPath\b[\s\S]*?<\/clipPath>/g, '');
  writeFileSync(path.join(dir, `${slug}.svg`), clean);
  manifest[pageSlug][slug] = `/icons/${pageSlug}/${slug}.svg`;
  n++;
}
writeFileSync(manifestPath, JSON.stringify(manifest));
console.log(`${pageSlug}: wrote ${n} icons -> public/icons/${pageSlug}/ and merged card-icons.json`);
console.log('titles:', pairs.map((x) => x.title.slice(0, 26)).join(' | '));
