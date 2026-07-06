/**
 * Per-page EXACT image manifest extractor (Part 2).
 * For every marketing page, reads the LIVE DOM and maps:
 *   - each card (its heading text) → its icon image  (fixes the "◆" placeholders)
 *   - each feature section heading → its image
 *   - hero foreground/background images
 * Output: clone-kit/image-manifest.json  { "<slug>": { cards:{title:icon}, features:{heading:img}, hero, bgs } }
 * Deterministic (DOM structure), concurrent, no agents needed.
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';

const ORIGIN = 'https://azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

// marketing slugs = catch-all pages (from the content dir, non-blog)
import { readdirSync } from 'node:fs';
const reg = JSON.parse(readFileSync('audit-output/registry.json'));
const ORIGIN_RE = /^https?:\/\/azure\.folio3\.com/;
// use the captured pages' real URLs (page group) as the marketing set
const urls = [...new Set((reg.page ?? []).map((u) => u.loc))]
  .filter((u) => !/\/(contact-us|thank-you|privacy|cookie|sitemap)/.test(u));

const rel = (s) => (s || '').replace(ORIGIN_RE, '').split('?')[0];

function extract() {
  const norm = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const out = { cards: {}, features: {}, hero: '', bgs: [] };
  // hero: first large img in the top section + bg
  const top = document.querySelector('.elementor-section, section');
  const addCard = (h, img) => {
    if (!h || !img) return;
    const src = img.currentSrc || img.getAttribute('src');
    const title = norm(h.textContent).slice(0, 60);
    if (title && src && !src.startsWith('data:')) out.cards[title] = src;
  };
  // Elementor icon-box / image-box widgets (icon + title in one wrapper)
  document.querySelectorAll('.elementor-icon-box-wrapper, .elementor-image-box-wrapper').forEach((el) => {
    addCard(el.querySelector('.elementor-icon-box-title, .elementor-image-box-title'), el.querySelector('img'));
  });
  // generic: a column/widget with exactly one heading + one image
  document.querySelectorAll('.elementor-widget, .elementor-column, li, [class*=card], [class*=box]').forEach((el) => {
    if (el.querySelectorAll('h3,h4,h5').length === 1 && el.querySelectorAll('img').length === 1) {
      addCard(el.querySelector('h3,h4,h5'), el.querySelector('img'));
    }
  });
  // proximity fallback: for each card heading, the nearest preceding/sibling img within its column
  document.querySelectorAll('h3,h4').forEach((h) => {
    const title = norm(h.textContent).slice(0, 60);
    if (out.cards[title]) return;
    const col = h.closest('.elementor-column, .elementor-widget-wrap, li, [class*=card]');
    const img = col?.querySelector('img');
    if (img) addCard(h, img);
  });
  // feature sections: heading + a large image in the same top-section
  document.querySelectorAll('.elementor-top-section, section').forEach((sec) => {
    const h = sec.querySelector('h2');
    if (!h) return;
    const big = [...sec.querySelectorAll('img')].find((i) => i.getBoundingClientRect().width > 250);
    if (big) { const s = big.currentSrc || big.src; if (s && !s.startsWith('data:')) out.features[norm(h.textContent).slice(0, 60)] = s; }
    // background images
    sec.querySelectorAll('*').forEach((e) => { const m = (getComputedStyle(e).backgroundImage || '').match(/url\(["']?([^"')]+)/); if (m && !m[1].startsWith('data:')) out.bgs.push(m[1]); });
  });
  return out;
}

const slugOf = (url) => url.replace(ORIGIN, '').replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '_').slice(0, 120) || 'home';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 } });
  const manifest = {};
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const url = urls[i++];
      const page = await ctx.newPage();
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 60000 });
        await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 1000); y += 1000; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 40); }); scrollTo(0, 0); });
        await page.waitForTimeout(400);
        const data = await page.evaluate(extract);
        // relativize + dedupe bgs
        const m = { cards: {}, features: {}, bgs: [...new Set(data.bgs.map(rel))].slice(0, 8) };
        for (const k in data.cards) m.cards[k] = rel(data.cards[k]);
        for (const k in data.features) m.features[k] = rel(data.features[k]);
        manifest[slugOf(url)] = m;
        console.log(`[${i}/${urls.length}] ${slugOf(url)} cards=${Object.keys(m.cards).length} features=${Object.keys(m.features).length}`);
      } catch (e) { console.log(`FAIL ${slugOf(url)} ${String(e).slice(0, 50)}`); }
      await page.close();
    }
  }
  await Promise.all(Array.from({ length: 5 }, worker));
  writeFileSync('clone-kit/image-manifest.json', JSON.stringify(manifest, null, 2));
  const allImgs = new Set();
  Object.values(manifest).forEach((m) => { Object.values(m.cards).forEach((v) => allImgs.add(v)); Object.values(m.features).forEach((v) => allImgs.add(v)); m.bgs.forEach((v) => allImgs.add(v)); });
  writeFileSync('clone-kit/image-manifest-assets.json', JSON.stringify([...allImgs], null, 2));
  console.log(`\n=== DONE === ${Object.keys(manifest).length} pages · ${allImgs.size} unique images → image-manifest.json`);
  await browser.close();
})();
