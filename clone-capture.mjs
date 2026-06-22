/**
 * azure.folio3.com — Full Clone-Kit Capture (all 243 routes)
 * ----------------------------------------------------------
 * For EVERY URL in audit-output/registry.json this produces:
 *   clone-kit/screenshots/desktop/<slug>.png   (full page, 1440w)
 *   clone-kit/screenshots/mobile/<slug>.png    (full page, 390w)
 *   clone-kit/content/<slug>.json              (headings, sections, copy, images, links, meta)
 *   clone-kit/tokens.json                      (aggregated colors / fonts / sizes / radii)
 *   clone-kit/assets-manifest.json             (every referenced asset URL)
 *
 * Resumable: re-running skips pages whose content JSON already exists.
 * Run: PLAYWRIGHT_BROWSERS_PATH=d:/AzureClone/.ms-playwright node clone-capture.mjs
 */

import { chromium } from 'playwright';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORIGIN = 'https://azure.folio3.com';
const KIT = path.join(__dirname, 'clone-kit');
const DIRS = ['screenshots/desktop', 'screenshots/mobile', 'content'];
DIRS.forEach((d) => mkdirSync(path.join(KIT, d), { recursive: true }));

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const CONCURRENCY = 4;
const NAV_TIMEOUT = 50_000;

/* ---- build URL list from the registry the auditor already produced ---- */
const registry = JSON.parse(readFileSync(path.join(__dirname, 'audit-output/registry.json')));
const URLS = [...new Set(Object.values(registry).flat().map((u) => u.loc))];

const slugOf = (url) => {
  const p = url.replace(ORIGIN, '').replace(/^\/|\/$/g, '');
  return (p || 'home').replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
};

/* ---- in-page extraction: content model + design tokens + assets ---- */
function extract() {
  const meta = (n, attr = 'name') =>
    document.querySelector(`meta[${attr}="${n}"]`)?.content || null;

  // content model
  const sections = [...document.querySelectorAll('section, .elementor-section')].slice(0, 60).map((s) => ({
    headings: [...s.querySelectorAll('h1,h2,h3,h4')].map((h) => ({ tag: h.tagName.toLowerCase(), text: h.textContent.trim().slice(0, 300) })).filter((h) => h.text),
    paragraphs: [...s.querySelectorAll('p')].map((p) => p.textContent.trim()).filter(Boolean).slice(0, 12),
    listItems: [...s.querySelectorAll('li')].map((l) => l.textContent.trim()).filter(Boolean).slice(0, 20),
    ctas: [...s.querySelectorAll('a.elementor-button, a.wp-block-button__link, .elementor-button-link, a[class*=btn]')].map((a) => ({ text: a.textContent.trim(), href: a.getAttribute('href') })).filter((c) => c.text).slice(0, 8),
    images: [...s.querySelectorAll('img')].map((i) => ({ src: i.currentSrc || i.src, alt: i.alt || null, w: i.naturalWidth, h: i.naturalHeight })).slice(0, 12),
  }));

  const images = [...document.querySelectorAll('img')].map((i) => ({
    src: i.currentSrc || i.getAttribute('src'), srcset: i.getAttribute('srcset') || null,
    alt: i.alt || null, w: i.getAttribute('width'), h: i.getAttribute('height'),
    loading: i.getAttribute('loading'),
  })).filter((i) => i.src);

  const nav = [...document.querySelectorAll('header a, nav a')].map((a) => ({ text: a.textContent.trim().slice(0, 60), href: a.getAttribute('href'), hasChildren: !!a.closest('.menu-item-has-children') })).filter((n) => n.text);

  // ---- design tokens: tally computed styles across visible elements ----
  const tally = { color: {}, bg: {}, font: {}, size: {}, weight: {}, radius: {}, shadow: {} };
  const bump = (o, k) => { if (k && k !== 'none' && k !== 'rgba(0, 0, 0, 0)' && k !== 'normal') o[k] = (o[k] || 0) + 1; };
  const els = document.querySelectorAll('body *');
  let n = 0;
  for (const el of els) {
    if (n++ > 4000) break;
    const c = getComputedStyle(el);
    bump(tally.color, c.color);
    bump(tally.bg, c.backgroundColor);
    bump(tally.font, c.fontFamily);
    bump(tally.size, c.fontSize);
    bump(tally.weight, c.fontWeight);
    bump(tally.radius, c.borderRadius);
    bump(tally.shadow, c.boxShadow.slice(0, 60));
  }
  // collect css background-image urls
  const bgImages = new Set();
  for (const el of [...els].slice(0, 3000)) {
    const bg = getComputedStyle(el).backgroundImage;
    const m = bg && bg.match(/url\(["']?([^"')]+)/);
    if (m) bgImages.add(m[1]);
  }

  return {
    url: location.href,
    meta: {
      title: document.title,
      description: meta('description'),
      canonical: document.querySelector('link[rel=canonical]')?.href || null,
      ogTitle: meta('og:title', 'property'),
      ogImage: meta('og:image', 'property'),
      h1Count: document.querySelectorAll('h1').length,
      bodyClass: document.body.className,
    },
    sections,
    images,
    bgImages: [...bgImages],
    nav: nav.slice(0, 60),
    tokens: tally,
  };
}

/* ---- token aggregation across all pages ---- */
const GLOBAL = { color: {}, bg: {}, font: {}, size: {}, weight: {}, radius: {}, shadow: {} };
const ASSETS = new Set();
const merge = (g, t) => { for (const k in t) for (const v in t[k]) g[k][v] = (g[k][v] || 0) + t[k][v]; };
const topN = (o, n = 15) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n).map(([v, c]) => ({ value: v, count: c }));

/* ---- per-page worker ---- */
async function capture(context, url, i, total) {
  const slug = slugOf(url);
  const contentPath = path.join(KIT, 'content', `${slug}.json`);
  if (existsSync(contentPath)) {
    const cached = JSON.parse(readFileSync(contentPath));
    merge(GLOBAL, cached.tokens || {});
    (cached.images || []).forEach((im) => im.src && ASSETS.add(im.src));
    (cached.bgImages || []).forEach((b) => ASSETS.add(b));
    return `[${i}/${total}] skip (cached) ${slug}`;
  }

  const page = await context.newPage();
  page.setDefaultTimeout(NAV_TIMEOUT);
  try {
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
    // nudge lazy content + sliders into the DOM
    await page.evaluate(async () => {
      await new Promise((r) => { let y = 0; const t = setInterval(() => { window.scrollBy(0, 1200); y += 1200; if (y > document.body.scrollHeight + 2000) { clearInterval(t); r(); } }, 60); });
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);

    // desktop screenshot
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: path.join(KIT, 'screenshots/desktop', `${slug}.png`), fullPage: true, timeout: 60_000 }).catch(() => {});

    // content + tokens (desktop DOM)
    const data = await page.evaluate(extract);
    data.capturedFrom = url;

    // mobile screenshot
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(KIT, 'screenshots/mobile', `${slug}.png`), fullPage: true, timeout: 60_000 }).catch(() => {});

    writeFileSync(contentPath, JSON.stringify(data, null, 2));
    merge(GLOBAL, data.tokens);
    data.images.forEach((im) => im.src && ASSETS.add(im.src));
    data.bgImages.forEach((b) => ASSETS.add(b));
    await page.close();
    return `[${i}/${total}] ok   ${slug}  (h1=${data.meta.h1Count}, imgs=${data.images.length})`;
  } catch (e) {
    await page.close().catch(() => {});
    writeFileSync(contentPath, JSON.stringify({ url, error: String(e).slice(0, 200) }, null, 2));
    return `[${i}/${total}] FAIL ${slug}: ${String(e).slice(0, 80)}`;
  }
}

/* ---- simple concurrency pool ---- */
async function pool(items, n, fn) {
  const q = items.map((it, i) => [it, i]);
  let active = 0, idx = 0;
  return new Promise((resolve) => {
    const next = () => {
      if (idx >= q.length && active === 0) return resolve();
      while (active < n && idx < q.length) {
        const [it, i] = q[idx++];
        active++;
        fn(it, i).then((msg) => { console.log(msg); active--; next(); });
      }
    };
    next();
  });
}

/* ---- main ---- */
(async () => {
  console.log(`› Capturing ${URLS.length} pages (concurrency ${CONCURRENCY})…`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

  await pool(URLS, CONCURRENCY, (url, i) => capture(context, url, i + 1, URLS.length));

  // ---- write aggregated design tokens ----
  const tokens = {
    colors: topN(GLOBAL.color),
    backgrounds: topN(GLOBAL.bg),
    fontFamilies: topN(GLOBAL.font, 8),
    fontSizes: topN(GLOBAL.size, 20),
    fontWeights: topN(GLOBAL.weight, 8),
    borderRadii: topN(GLOBAL.radius, 12),
    boxShadows: topN(GLOBAL.shadow, 10),
  };
  writeFileSync(path.join(KIT, 'tokens.json'), JSON.stringify(tokens, null, 2));
  writeFileSync(path.join(KIT, 'assets-manifest.json'), JSON.stringify({ count: ASSETS.size, assets: [...ASSETS] }, null, 2));

  console.log(`\n=== DONE ===`);
  console.log(`content JSON: ${URLS.length} files`);
  console.log(`unique assets referenced: ${ASSETS.size}`);
  console.log(`top colors:`, tokens.colors.slice(0, 5).map((c) => c.value).join('  '));
  console.log(`fonts:`, tokens.fontFamilies.slice(0, 3).map((f) => f.value).join(' | '));

  await browser.close();
})();
