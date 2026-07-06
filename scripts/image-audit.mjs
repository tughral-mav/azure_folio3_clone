/**
 * Per-section image audit: LIVE vs CLONE.
 * For every top-level home section, collect all upload-path images (img src,
 * srcset, <source>, and CSS background-image), match sections by heading, and
 * report which live images are missing from the clone — plus whether the file
 * exists locally in public/.
 */
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { writeFileSync } from 'node:fs';

const LIVE = 'https://azure.folio3.com/';
const CLONE = 'http://localhost:3000/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const PUB = 'd:/AzureClone/azure-clone-next/public';

const norm = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 38);
// strip the -WIDTHxHEIGHT responsive suffix → the "base" image identity
const baseOf = (p) => (p || '').replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');

async function audit(b, url) {
  const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
  await p.goto(url, { waitUntil: 'load', timeout: 90000 });
  // full scroll to trigger lazy-load, then settle
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 1000) { clearInterval(t); r(); } }, 70); }); });
  await p.waitForTimeout(1500);
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(400);

  const sections = await p.evaluate(() => {
    // resolve a URL to an /wp-content/uploads/... path, decoding Next.js /_next/image?url=
    const up = (u) => {
      if (!u) return null;
      try { if (/_next\/image/.test(u)) { const q = new URL(u, location.href).searchParams.get('url'); if (q) u = decodeURIComponent(q); } } catch {}
      const m = u.match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i);
      return m ? m[0] : null;
    };
    const tops = [...document.querySelectorAll('section, .elementor-section.elementor-top-section, .e-con')].filter((s) => { const r = s.getBoundingClientRect(); return r.height > 80 && r.width > 600; });
    const outer = tops.filter((s) => !tops.some((o) => o !== s && o.contains(s)));
    return outer.map((s, idx) => {
      const h = s.querySelector('h1,h2,h3');
      const imgs = new Set();
      s.querySelectorAll('img').forEach((im) => {
        [im.currentSrc, im.getAttribute('data-lazy-src'), im.getAttribute('src'), im.getAttribute('data-src')].forEach((u) => { const x = up(u); if (x) imgs.add(x); });
        const ss = im.getAttribute('srcset') || im.getAttribute('data-lazy-srcset') || '';
        ss.split(',').forEach((part) => { const x = up(part.trim().split(' ')[0]); if (x) imgs.add(x); });
      });
      s.querySelectorAll('source').forEach((so) => { const ss = so.getAttribute('srcset') || so.getAttribute('data-srcset') || ''; ss.split(',').forEach((part) => { const x = up(part.trim().split(' ')[0]); if (x) imgs.add(x); }); });
      // CSS background-images (including lazy data-bg)
      s.querySelectorAll('*').forEach((el) => {
        const bg = getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none') { const m = bg.match(/url\(["']?([^"')]+)["']?\)/g) || []; m.forEach((u) => { const x = up(u); if (x) imgs.add(x); }); }
        ['data-bg', 'data-lazy-bg', 'data-background'].forEach((a) => { const x = up(el.getAttribute(a)); if (x) imgs.add(x); });
      });
      return { idx, heading: (h?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60), images: [...imgs] };
    }).filter((s) => s.heading || s.images.length);
  });
  await p.close();
  return sections;
}

const b = await chromium.launch();
const live = await audit(b, LIVE);
const clone = await audit(b, CLONE);
await b.close();

const cloneByHeading = new Map(clone.map((s) => [norm(s.heading), s]));
const cloneAllBase = new Set(clone.flatMap((s) => s.images.map(baseOf)));

const report = [];
for (const ls of live) {
  const cs = cloneByHeading.get(norm(ls.heading));
  const cloneBase = new Set((cs ? cs.images : []).map(baseOf));
  // collapse live images to unique base identities, prefer a full-size path for download
  const liveBaseMap = new Map();
  for (const img of ls.images) { const bp = baseOf(img); if (!liveBaseMap.has(bp) || img === bp) liveBaseMap.set(bp, liveBaseMap.get(bp) === bp ? bp : img); }
  for (const img of ls.images) { const bp = baseOf(img); if (img === bp) liveBaseMap.set(bp, bp); }
  const missing = [...liveBaseMap.keys()].filter((bp) => !cloneBase.has(bp));
  report.push({
    heading: ls.heading,
    matchedClone: !!cs,
    liveBaseCount: liveBaseMap.size,
    cloneBaseCount: cloneBase.size,
    missing: missing.map((bp) => ({ base: bp, download: liveBaseMap.get(bp), fileExistsLocally: existsSync(PUB + bp), inCloneElsewhere: cloneAllBase.has(bp) })),
  });
}

writeFileSync('d:/AzureClone/verify/image-audit.json', JSON.stringify({ live, clone, report }, null, 2));

console.log('=== MISSING IMAGE AUDIT (base images on LIVE not rendered in CLONE) ===\n');
for (const r of report) {
  if (!r.missing.length) continue;
  console.log(`■ ${r.heading}  [matched:${r.matchedClone} live ${r.liveBaseCount}/clone ${r.cloneBaseCount}]`);
  for (const m of r.missing) {
    const tag = m.inCloneElsewhere ? '(rendered elsewhere in clone)' : m.fileExistsLocally ? '(ON DISK, NOT WIRED)' : '*** NEEDS DOWNLOAD ***';
    console.log(`    - ${m.base}   ${tag}`);
  }
  console.log('');
}
const clean = report.filter((r) => !r.missing.length).map((r) => r.heading);
console.log('Sections fully matched (no missing base images):', clean.length ? clean.join(' | ') : '(none)');
