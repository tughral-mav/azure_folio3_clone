/**
 * PARITY GATE — automated clone-vs-live check for one route. Run this on every page
 * before calling it "done". Catches the failure modes I keep missing:
 *   1. MISSING IMAGES  — every live /wp-content/uploads image must render in the clone.
 *                        Any file not on disk is AUTO-DOWNLOADED from the live.
 *   2. LEAKED/EXTRA    — text in the clone BODY that the live only shows in its footer/nav
 *                        (the office-address leak), or body text not on the live at all.
 *   3. LINK MISMATCH   — every clone CTA/link must point where the live's equivalent points.
 *   4. HEIGHT RATIO    — clone page height vs live (proxy for whole missing sections).
 *
 * Usage: node verify/parity.mjs <route> [--no-download]
 * Exit 0 = PASS, 1 = FAIL. Prints a specific, actionable report.
 */
import { chromium } from 'playwright';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const route = process.argv[2] || '/';
const noDownload = process.argv.includes('--no-download');
const LIVE = 'https://azure.folio3.com';
const CLONE = 'http://localhost:3000';
const PUB = 'd:/AzureClone/azure-clone-next/public';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';

const baseOf = (p) => (p || '').replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
const normLine = (t) => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const normHref = (h) => {
  if (!h) return '';
  h = h.trim();
  if (/^tel:/i.test(h)) return 'tel:' + h.replace(/\D/g, ''); // digits-only: ignore display formatting
  if (/^mailto:/i.test(h)) return h.replace(/\s+/g, '');
  h = h.replace(/^https?:\/\/azure\.folio3\.com/i, '').replace(/^https?:\/\/localhost:3000/i, '');
  if (h.startsWith('#')) return h;
  if (/^https?:\/\//i.test(h)) return h.replace(/\/$/, '');
  if (!h.startsWith('/')) h = '/' + h;
  return h.length > 1 ? h.replace(/\/(?=$|[?#])/, '') : h;
};

async function scrape(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 70000 });
  await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 40); }); });
  await page.waitForTimeout(900);
  await page.evaluate(() => scrollTo(0, 0));
  return page.evaluate(() => {
    // Collapse un-initialized slick sliders: in headless they don't init, so all slides
    // stack vertically and inflate scrollHeight. The real page shows a one-row carousel —
    // collapse to a single slide's height so the measured height matches what displays.
    document.querySelectorAll('.slick-slider:not(.slick-initialized)').forEach((s) => {
      const kids = [...s.children].filter((c) => c.getBoundingClientRect().height > 40);
      if (kids.length > 1) { s.style.maxHeight = Math.max(...kids.map((c) => c.getBoundingClientRect().height)) + 'px'; s.style.overflow = 'hidden'; }
    });
    const up = (u) => { if (!u) return null; try { if (/_next\/image/.test(u)) { const q = new URL(u, location.href).searchParams.get('url'); if (q) u = decodeURIComponent(q); } } catch {} const m = u.match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i); return m ? m[0] : null; };
    const imgsIn = (root) => { const s = new Set(); root.querySelectorAll('img').forEach((im) => { [im.currentSrc, im.getAttribute('data-lazy-src'), im.getAttribute('src')].forEach((u) => { const x = up(u); if (x) s.add(x); }); }); root.querySelectorAll('*').forEach((el) => { const bg = getComputedStyle(el).backgroundImage; if (bg && bg !== 'none') (bg.match(/url\(["']?([^"')]+)["']?\)/g) || []).forEach((u) => { const x = up(u); if (x) s.add(x); }); }); return [...s]; };
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const lines = (root, excl) => { if (!root) return []; const out = []; root.querySelectorAll('p,li,h1,h2,h3,h4,h5,span,a,div').forEach((el) => { if (excl && excl.some((e) => e && e.contains(el))) return; if (el.children.length > 2) return; const t = (el.textContent || '').replace(/\s+/g, ' ').trim(); if (t.length >= 12 && t.length < 200) out.push(t); }); return [...new Set(out)]; };
    return {
      height: document.body.scrollHeight,
      allImgs: imgsIn(document.body),
      bodyText: lines(document.body, [header, footer]),
      footerText: footer ? lines(footer, []) : [],
      navText: header ? lines(header, []) : [],
      links: [...document.querySelectorAll('a[href]')].map((a) => ({ region: a.closest('header') ? 'header' : a.closest('footer') ? 'footer' : 'body', text: (a.textContent || '').replace(/\s+/g, ' ').trim(), href: a.getAttribute('href') })).filter((l) => l.href && l.text),
    };
  });
}

const browser = await chromium.launch();
const lp = await browser.newPage({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
const cp = await browser.newPage({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
const live = await scrape(lp, LIVE + route);
const clone = await scrape(cp, CLONE + route);
await browser.close();

// ---- 1. MISSING IMAGES (+ auto-download) ----
const cloneBase = new Set(clone.allImgs.map(baseOf));
const liveBase = [...new Set(live.allImgs.map(baseOf))];
const missing = liveBase.filter((b) => !cloneBase.has(b));
let downloaded = 0, onDiskNotRendered = 0;
for (const b of missing) {
  const dest = PUB + b;
  if (existsSync(dest)) { onDiskNotRendered++; continue; }
  if (noDownload) continue;
  try { const r = await fetch(LIVE + b, { headers: { 'User-Agent': UA } }); if (r.ok) { const buf = Buffer.from(await r.arrayBuffer()); mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, buf); downloaded++; } } catch {}
}

// ---- 2. LEAKED / EXTRA body content ----
// token set across ALL live text — used for fuzzy "is this clone line really new?" (kills
// false positives from text-concatenation differences between Elementor and our components).
const liveTokens = new Set([...live.bodyText, ...live.footerText, ...live.navText].flatMap((l) => normLine(l).split(' ')).filter((w) => w.length > 3));
const tokenOverlap = (t) => { const toks = normLine(t).split(' ').filter((w) => w.length > 3); if (!toks.length) return 1; return toks.filter((w) => liveTokens.has(w)).length / toks.length; };
const liveFooterNav = new Set([...live.footerText, ...live.navText].map(normLine));
const liveBodySet = new Set(live.bodyText.map(normLine));
// LEAK = footer/office content rendered in the body (the office-address / footer leak), address-shaped only
const leaked = clone.bodyText.filter((t) => {
  const n = normLine(t);
  return liveFooterNav.has(n) && !liveBodySet.has(n) && /\b(office|tel|support|suite|road|street|floor|block|avenue|building|koll|bovet)\b/i.test(t);
});
// EXTRA = body content genuinely not on the live (fuzzy: <55% of words appear anywhere on live)
const extra = clone.bodyText.filter((t) => { const n = normLine(t); return n.length > 20 && tokenOverlap(t) < 0.55 && !/^\d+ ?\+?$/.test(n); });

// ---- 3. LINK MISMATCH (by text within region) ----
const liveByKey = new Map();
for (const l of live.links) { const k = l.region + '|' + normLine(l.text); if (!liveByKey.has(k)) liveByKey.set(k, new Set()); liveByKey.get(k).add(normHref(l.href)); }
const linkMismatch = [];
const seen = new Set();
for (const c of clone.links) { const k = c.region + '|' + normLine(c.text); const key = k + '|' + normHref(c.href); if (seen.has(key)) continue; seen.add(key); const set = liveByKey.get(k); if (!set) continue; if (![...set].some((h) => h === normHref(c.href))) linkMismatch.push({ text: c.text.slice(0, 40), clone: normHref(c.href), live: [...set].join(' | ') }); }

// ---- 4. HEIGHT RATIO ----
const heightRatio = clone.height / live.height;

// ---- REPORT ----
const fail = (missing.length - downloaded > 0) || leaked.length > 0 || extra.length > 3 || linkMismatch.length > 0 || heightRatio < 0.85;
const tag = (b) => (b ? '\x1b[31mFAIL\x1b[0m' : '\x1b[32mPASS\x1b[0m');
console.log(`\n=== PARITY: ${route} ===`);
console.log(`${tag(missing.length - downloaded > 0)}  images: ${missing.length} missing on live→clone  (auto-downloaded ${downloaded}, on-disk-not-rendered ${onDiskNotRendered})`);
if (missing.length) console.log('      ' + missing.slice(0, 16).map((m) => m.split('/').pop()).join(', ') + (missing.length > 16 ? ' …' : ''));
console.log(`${tag(leaked.length > 0)}  leaked footer/nav content in body: ${leaked.length}`);
if (leaked.length) leaked.slice(0, 6).forEach((t) => console.log('      LEAK: ' + t.slice(0, 80)));
console.log(`${tag(extra.length > 3)}  extra body text not on live: ${extra.length}`);
if (extra.length) extra.slice(0, 6).forEach((t) => console.log('      EXTRA: ' + t.slice(0, 80)));
console.log(`${tag(linkMismatch.length > 0)}  link-target mismatches: ${linkMismatch.length}`);
linkMismatch.slice(0, 8).forEach((l) => console.log(`      "${l.text}"  clone=${l.clone}  live=${l.live}`));
console.log(`${tag(heightRatio < 0.85)}  height ratio clone/live: ${heightRatio.toFixed(2)}  (clone ${clone.height} / live ${live.height})`);
console.log(`\n${fail ? '\x1b[31m✗ PARITY FAIL\x1b[0m' : '\x1b[32m✓ PARITY PASS\x1b[0m'} — ${route}\n`);
process.exit(fail ? 1 : 0);
