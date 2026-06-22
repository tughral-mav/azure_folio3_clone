/**
 * Extract VERIFIED content-area links from the LIVE per page, keyed by the nearest heading
 * (the card/section title). Stored to clone-kit/content-links.json so the renderer can link
 * cards exactly where the live links them — no fuzzy matching.
 *   { "<pageSlug>": { "<normalized card title>": "/target/" } }
 * Usage: node verify/extract-links.mjs [route]   (no arg = all DESIGN_PAGES)
 */
import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';

const LIVE = 'https://azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT = 'd:/AzureClone/clone-kit/content-links.json';
const routes = process.argv[2] ? [process.argv[2]] : DESIGN_PAGES;
const slugOf = (r) => (r.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
const norm = (t) => (t || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();

const map = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
let done = 0;
for (const route of routes) {
  const page = await ctx.newPage();
  try {
    const code = (await page.goto(LIVE + route, { waitUntil: 'load', timeout: 80000 }))?.status();
    if (code && code >= 400) { await page.close(); continue; } // skip 404s
    await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 35); }); });
    await page.waitForTimeout(700);
    const links = await page.evaluate(() => {
      const inChrome = (el) => !!el.closest('header,footer,nav,[role="navigation"],[class*="mega-menu"]');
      const out = {};
      document.querySelectorAll('a[href]').forEach((a) => {
        if (inChrome(a)) return;
        let h = a.getAttribute('href') || '';
        if (!h || h.startsWith('#') || /^(tel:|mailto:|javascript)/i.test(h)) return;
        if (/^https?:\/\//i.test(h) && !/azure\.folio3\.com/i.test(h)) return;
        h = h.replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '');
        if (!h.startsWith('/') || h === '/') return;
        // the card/element title: nearest heading inside the link, else the link's own text
        const titleEl = a.querySelector('h2,h3,h4,h5,.elementor-heading-title') || a;
        let title = (titleEl.textContent || '').replace(/\s+/g, ' ').trim();
        if (!title || title.length < 3 || title.length > 80) {
          // link wraps an image only → use the closest card heading
          const card = a.closest('[class*="box"],[class*="card"],.elementor-column,.elementor-widget');
          title = (card?.querySelector('h2,h3,h4,h5')?.textContent || '').replace(/\s+/g, ' ').trim();
        }
        if (title && title.length >= 3 && title.length <= 80) out[title] = h;
      });
      return out;
    });
    const m = {};
    for (const [t, h] of Object.entries(links)) { const k = norm(t); if (k && k.length > 2) m[k] = h; }
    if (Object.keys(m).length) { map[slugOf(route)] = m; writeFileSync(OUT, JSON.stringify(map, null, 0)); }
    done++;
  } catch { /* skip */ }
  await page.close();
}
await browser.close();
console.log(`extracted content links for ${done} pages → ${OUT}`);
