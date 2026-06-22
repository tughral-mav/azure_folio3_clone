/**
 * Exhaustive link audit: extract EVERY <a href> (and button-with-link) from the
 * home page — header nav + dropdowns, hero, every body section, footer — with
 * text, href, region and nearest section heading. Runs for both LIVE and CLONE.
 *
 * Usage: node link-audit.mjs live   |   node link-audit.mjs clone
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const which = process.argv[2] || 'live';
const URL = which === 'live' ? 'https://azure.folio3.com/' : 'http://localhost:3000/';
const HOST = 'azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';

const norm = (href) => {
  if (!href) return '';
  let h = href.trim();
  if (h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('javascript:')) return h;
  // strip the live/clone origin to a path
  h = h.replace(/^https?:\/\/azure\.folio3\.com/i, '').replace(/^https?:\/\/localhost:3000/i, '');
  if (h.startsWith('#')) return h; // in-page anchor
  // external absolute URL — keep host
  if (/^https?:\/\//i.test(h)) return h.replace(/\/$/, '');
  if (!h.startsWith('/')) h = '/' + h;
  // normalise trailing slash (treat /x and /x/ the same) but keep root '/'
  if (h.length > 1) h = h.replace(/\/(?=$|[?#])/, '');
  return h;
};

const b = await chromium.launch();
const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
await p.goto(URL, { waitUntil: 'load', timeout: 90000 });
await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 450); y += 450; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 55); }); });
await p.waitForTimeout(1500);
await p.evaluate(() => scrollTo(0, 0));

// Expose hover/click-revealed nav dropdowns by hovering each top-level nav item
const topNav = await p.$$('header a, nav a, [class*="menu-item"] > a');
for (const el of topNav.slice(0, 12)) { try { await el.hover({ timeout: 400 }); await p.waitForTimeout(150); } catch {} }

// CLONE: click each Discover tab so hidden tab-panel links render
if (which === 'clone') {
  const tabs = await p.$$('[role="tab"]');
  for (const t of tabs) { try { await t.click({ timeout: 500 }); await p.waitForTimeout(120); } catch {} }
}

const links = await p.evaluate(() => {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const headings = [...document.querySelectorAll('h1,h2,h3')].map((h) => ({ y: h.getBoundingClientRect().top + scrollY, text: clean(h.textContent).slice(0, 50) }));
  const sectionFor = (el) => {
    const y = el.getBoundingClientRect().top + scrollY;
    let best = '';
    for (const h of headings) { if (h.y <= y + 5) best = h.text; else break; }
    return best;
  };
  const region = (el) => {
    if (el.closest('header')) return 'header';
    if (el.closest('footer')) return 'footer';
    return 'body';
  };
  const out = [];
  const seen = new Set();
  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const text = clean(a.textContent) || clean(a.getAttribute('aria-label')) || (a.querySelector('img') ? '[img] ' + (a.querySelector('img').getAttribute('alt') || '') : '');
    const reg = region(a);
    const key = reg + '|' + text + '|' + href;
    if (seen.has(key)) return; seen.add(key);
    out.push({ region: reg, section: reg === 'body' ? sectionFor(a) : '', text: text.slice(0, 60), href });
  });
  return out;
});

const normalized = links.map((l) => ({ ...l, norm: norm(l.href) }));
writeFileSync(`verify/links-${which}.json`, JSON.stringify(normalized, null, 2));
console.log(`${which}: ${normalized.length} links`);
const byReg = normalized.reduce((m, l) => ((m[l.region] = (m[l.region] || 0) + 1), m), {});
console.log('by region:', JSON.stringify(byReg));
await b.close();
