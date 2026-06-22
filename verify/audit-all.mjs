/**
 * Deterministic site-wide audit: for every route, load LIVE and CLONE and extract
 *  - missing base images (per-section + whole-page fallback, decoding /_next/image)
 *  - link-target mismatches (by text within region)   [desktop pass only]
 *  - H1 count + <title> + live-page-exists
 * Writes verify/audit-<viewport>.json (array of per-route results).
 *
 * Usage: node verify/audit-all.mjs <desktop|mobile> [startIndex] [count]
 */
import { chromium } from 'playwright';
import { writeFileSync, readFileSync, existsSync, appendFileSync } from 'node:fs';
import { ALL_ROUTES } from './routes.mjs';

const VP = process.argv[2] === 'mobile' ? { name: 'mobile', width: 375, height: 812 } : { name: 'desktop', width: 1440, height: 1000 };
const START = parseInt(process.argv[3] || '0', 10);
const COUNT = parseInt(process.argv[4] || String(ALL_ROUTES.length), 10);
const ROUTES = ALL_ROUTES.slice(START, START + COUNT);
const doLinks = VP.name === 'desktop';
const PROGRESS = `verify/audit-${VP.name}.progress`;
try { writeFileSync(PROGRESS, ''); } catch {}

const LIVE = 'https://azure.folio3.com';
const CLONE = 'http://localhost:3000';
const PUB = 'd:/AzureClone/azure-clone-next/public';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const CONCURRENCY = 5;

const baseOf = (p) => (p || '').replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
const normHref = (href) => {
  if (!href) return '';
  let h = href.trim();
  if (/^(mailto:|tel:|javascript:)/i.test(h)) return h.replace(/\s+/g, '');
  h = h.replace(/^https?:\/\/azure\.folio3\.com/i, '').replace(/^https?:\/\/localhost:3000/i, '');
  if (h.startsWith('#')) return h;
  if (/^https?:\/\//i.test(h)) return h.replace(/\/$/, '');
  if (!h.startsWith('/')) h = '/' + h;
  if (h.length > 1) h = h.replace(/\/(?=$|[?#])/, '');
  return h;
};
const keyText = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// runs in page context: returns {ok, h1, title, sections:[{heading,images:[]}], allImages:[], links:[{region,text,href}]}
async function extract(page) {
  return page.evaluate(() => {
    const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
    const up = (u) => {
      if (!u) return null;
      try { if (/_next\/image/.test(u)) { const q = new URL(u, location.href).searchParams.get('url'); if (q) u = decodeURIComponent(q); } } catch {}
      const m = u.match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i);
      return m ? m[0] : null;
    };
    const norm = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 38);
    const imgsIn = (root) => {
      const set = new Set();
      root.querySelectorAll('img').forEach((im) => {
        [im.currentSrc, im.getAttribute('data-lazy-src'), im.getAttribute('src'), im.getAttribute('data-src')].forEach((u) => { const x = up(u); if (x) set.add(x); });
        const ss = im.getAttribute('srcset') || im.getAttribute('data-lazy-srcset') || '';
        ss.split(',').forEach((part) => { const x = up(part.trim().split(' ')[0]); if (x) set.add(x); });
      });
      root.querySelectorAll('source').forEach((so) => { (so.getAttribute('srcset') || so.getAttribute('data-srcset') || '').split(',').forEach((part) => { const x = up(part.trim().split(' ')[0]); if (x) set.add(x); }); });
      root.querySelectorAll('*').forEach((el) => { const bg = getComputedStyle(el).backgroundImage; if (bg && bg !== 'none') (bg.match(/url\(["']?([^"')]+)["']?\)/g) || []).forEach((u) => { const x = up(u); if (x) set.add(x); }); });
      return [...set];
    };
    const tops = [...document.querySelectorAll('section, .elementor-section.elementor-top-section, .e-con')].filter((s) => { const r = s.getBoundingClientRect(); return r.height > 60 && r.width > 280; });
    const outer = tops.filter((s) => !tops.some((o) => o !== s && o.contains(s)));
    const sections = outer.map((s) => { const h = s.querySelector('h1,h2,h3'); return { heading: norm(h?.textContent || ''), images: imgsIn(s) }; }).filter((s) => s.heading || s.images.length);
    const region = (el) => (el.closest('header') ? 'header' : el.closest('footer') ? 'footer' : 'body');
    const links = [...document.querySelectorAll('a[href]')].map((a) => ({ region: region(a), text: clean(a.textContent) || clean(a.getAttribute('aria-label')) || '', href: a.getAttribute('href') })).filter((l) => l.href);
    return { h1: document.querySelectorAll('h1').length, title: clean(document.title), sections, allImages: imgsIn(document.body), links };
  });
}

async function loadPage(ctx, url) {
  const page = await ctx.newPage();
  let status = 0;
  try {
    const resp = await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    status = resp ? resp.status() : 0;
    await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 40); }); });
    await page.waitForTimeout(900);
    await page.evaluate(() => scrollTo(0, 0));
  } catch (e) { /* keep status */ }
  return { page, status };
}

async function auditRoute(ctx, route) {
  const res = { route, viewport: VP.name, liveStatus: 0, cloneStatus: 0, missingImages: [], linkMismatches: [], linkMissing: [], h1: null, title: null };
  let lp, cp;
  try {
    const L = await loadPage(ctx, LIVE + route); lp = L.page; res.liveStatus = L.status;
    const C = await loadPage(ctx, CLONE + route); cp = C.page; res.cloneStatus = C.status;
    if (L.status >= 400 || C.status >= 400) { return res; }
    const live = await extract(lp);
    const clone = await extract(cp);
    res.h1 = clone.h1; res.title = clone.title;

    // ---- images: per-section base diff with whole-page fallback ----
    const cloneAllBase = new Set(clone.allImages.map(baseOf));
    const liveBase = new Set(live.allImages.map(baseOf));
    res.missingImages = [...liveBase].filter((b) => !cloneAllBase.has(b)).map((b) => ({ path: b, onDisk: existsSync(PUB + b) }));

    // ---- links (desktop only): mismatches by text within region ----
    if (doLinks) {
      const liveByKey = new Map();
      for (const l of live.links) { const k = l.region + '|' + keyText(l.text); if (!liveByKey.has(k)) liveByKey.set(k, new Set()); liveByKey.get(k).add(normHref(l.href)); }
      const seen = new Set();
      for (const c of clone.links) {
        if (!c.text) continue;
        const k = c.region + '|' + keyText(c.text);
        if (seen.has(k + normHref(c.href))) continue; seen.add(k + normHref(c.href));
        const liveSet = liveByKey.get(k);
        if (!liveSet) continue; // no live equivalent by text — skip (representation noise)
        if (!liveSet.has(normHref(c.href))) res.linkMismatches.push({ region: c.region, text: c.text.slice(0, 40), clone: normHref(c.href), live: [...liveSet].join(' | ') });
      }
    }
  } catch (e) { res.error = String(e).slice(0, 120); }
  finally { try { await lp?.close(); } catch {} try { await cp?.close(); } catch {} }
  return res;
}

// pooled run
const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: VP.width, height: VP.height } });
const results = [];
let idx = 0, done = 0;
async function worker() {
  while (idx < ROUTES.length) {
    const r = ROUTES[idx++];
    const out = await auditRoute(ctx, r);
    results.push(out);
    done++;
    const flags = [out.liveStatus >= 400 ? 'LIVE' + out.liveStatus : '', out.cloneStatus >= 400 ? 'CLONE' + out.cloneStatus : '', out.missingImages.length ? out.missingImages.length + 'img' : '', out.linkMismatches.length ? out.linkMismatches.length + 'lnk' : '', out.h1 !== 1 && out.cloneStatus < 400 ? 'H1=' + out.h1 : ''].filter(Boolean).join(' ');
    const line = `[${done}/${ROUTES.length}] ${r}  ${flags || 'ok'}`;
    console.log(line);
    try { appendFileSync(PROGRESS, line + '\n'); } catch {}
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await browser.close();

const outFile = `verify/audit-${VP.name}${START ? '-' + START : ''}.json`;
writeFileSync(outFile, JSON.stringify(results, null, 2));
const tot = results.reduce((m, r) => ({ img: m.img + r.missingImages.length, lnk: m.lnk + r.linkMismatches.length, live404: m.live404 + (r.liveStatus >= 400 ? 1 : 0), clone404: m.clone404 + (r.cloneStatus >= 400 ? 1 : 0), h1: m.h1 + (r.h1 !== 1 && r.cloneStatus < 400 ? 1 : 0) }), { img: 0, lnk: 0, live404: 0, clone404: 0, h1: 0 });
console.log(`\n=== ${VP.name}: ${results.length} routes → ${outFile} ===`);
console.log(`missing-images: ${tot.img}, link-mismatches: ${tot.lnk}, live-404: ${tot.live404}, clone-404: ${tot.clone404}, bad-H1: ${tot.h1}`);
