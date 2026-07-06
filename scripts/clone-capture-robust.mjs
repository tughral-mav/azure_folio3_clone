/**
 * Robust full re-capture of all 243 pages — screenshots + content JSON.
 * Fixes the two root problems from the original bulk capture:
 *   1) lazy sliders / scroll-animations left golden screenshots partially blank
 *   2) lazy images were stored as data: placeholders (not real src URLs)
 *
 * Strategy per page: networkidle → slow stepwise scroll → slider init →
 * second settle pass → screenshot + extract content with RESOLVED image srcs.
 *
 * Safe: backs up clone-kit/content + screenshots/desktop once before writing.
 * Resumable: skips pages whose JSON already has capturedRobust:true.
 *
 * Run: PLAYWRIGHT_BROWSERS_PATH=d:/AzureClone/.ms-playwright node clone-capture-robust.mjs
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORIGIN = 'https://azure.folio3.com';
const KIT = path.join(__dirname, 'clone-kit');
const CONTENT = path.join(KIT, 'content');
const SHOTS = path.join(KIT, 'screenshots', 'desktop');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const CONCURRENCY = 4;
const NAV_TIMEOUT = 70_000;

// ---- one-time backups ----
for (const [src, bak] of [[CONTENT, CONTENT + '.bak'], [SHOTS, SHOTS + '.bak']]) {
  if (!existsSync(bak)) { cpSync(src, bak, { recursive: true }); console.log('backed up →', path.basename(bak)); }
}

const registry = JSON.parse(readFileSync(path.join(__dirname, 'audit-output', 'registry.json')));
const URLS = [...new Set(Object.values(registry).flat().map((u) => u.loc))];
const slugOf = (url) => {
  const p = url.replace(ORIGIN, '').replace(/^\/|\/$/g, '');
  return (p || 'home').replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
};

const ASSETS = new Set();

function extract() {
  const meta = (n, attr = 'name') => document.querySelector(`meta[${attr}="${n}"]`)?.content || null;
  const real = (i) => i.currentSrc || i.getAttribute('src') || ''; // resolved lazy src
  const sections = [...document.querySelectorAll('section, .elementor-section')].slice(0, 70).map((s) => ({
    headings: [...s.querySelectorAll('h1,h2,h3,h4')].map((h) => ({ tag: h.tagName.toLowerCase(), text: h.textContent.trim().slice(0, 300) })).filter((h) => h.text),
    paragraphs: [...s.querySelectorAll('p')].map((p) => p.textContent.trim()).filter(Boolean).slice(0, 12),
    listItems: [...s.querySelectorAll('li')].map((l) => l.textContent.trim()).filter(Boolean).slice(0, 20),
    ctas: [...s.querySelectorAll('a.elementor-button, a.wp-block-button__link, a[class*=btn]')].map((a) => ({ text: a.textContent.trim(), href: a.getAttribute('href') })).filter((c) => c.text).slice(0, 8),
    images: [...s.querySelectorAll('img')].map((i) => ({ src: real(i), alt: i.alt || null, w: i.naturalWidth, h: i.naturalHeight })).filter((i) => i.src && !i.src.startsWith('data:')).slice(0, 12),
  }));
  const images = [...document.querySelectorAll('img')].map((i) => ({ src: real(i), srcset: i.getAttribute('srcset') || null, alt: i.alt || null, w: i.getAttribute('width'), h: i.getAttribute('height'), loading: i.getAttribute('loading') })).filter((i) => i.src && !i.src.startsWith('data:'));
  const bgImages = new Set();
  for (const el of [...document.querySelectorAll('body *')].slice(0, 4000)) {
    const bg = getComputedStyle(el).backgroundImage;
    const m = bg && bg.match(/url\(["']?([^"')]+)/);
    if (m && !m[1].startsWith('data:')) bgImages.add(m[1]);
  }
  return {
    url: location.href,
    capturedRobust: true,
    meta: { title: document.title, description: meta('description'), canonical: document.querySelector('link[rel=canonical]')?.href || null, ogImage: meta('og:image', 'property'), h1Count: document.querySelectorAll('h1').length },
    sections, images, bgImages: [...bgImages],
  };
}

async function robustRender(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await sleep(110); }
    window.scrollTo(0, document.body.scrollHeight); await sleep(700);
  });
  await page.evaluate(() => document.querySelectorAll('.swiper').forEach((s) => s.swiper?.slideTo?.(0, 0))).catch(() => {});
  await page.waitForTimeout(1200);
  await page.evaluate(async () => { const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await sleep(70); } window.scrollTo(0, 0); await sleep(500); });
}

async function capture(context, url, i, total) {
  const slug = slugOf(url);
  const cpath = path.join(CONTENT, `${slug}.json`);
  if (existsSync(cpath)) {
    try { if (JSON.parse(readFileSync(cpath, 'utf8')).capturedRobust) {
      // still collect assets so the manifest is complete
      const d = JSON.parse(readFileSync(cpath, 'utf8'));
      (d.images || []).forEach((im) => ASSETS.add(im.src)); (d.bgImages || []).forEach((b) => ASSETS.add(b));
      return `[${i}/${total}] skip ${slug}`;
    } } catch {}
  }
  const page = await context.newPage();
  page.setDefaultTimeout(NAV_TIMEOUT);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
    await robustRender(page);
    await page.screenshot({ path: path.join(SHOTS, `${slug}.png`), fullPage: true, timeout: 60_000 }).catch(() => {});
    const data = await page.evaluate(extract);
    writeFileSync(cpath, JSON.stringify(data, null, 2));
    data.images.forEach((im) => ASSETS.add(im.src)); data.bgImages.forEach((b) => ASSETS.add(b));
    await page.close();
    return `[${i}/${total}] ok   ${slug} (imgs=${data.images.length})`;
  } catch (e) {
    await page.close().catch(() => {});
    return `[${i}/${total}] FAIL ${slug}: ${String(e).slice(0, 70)}`;
  }
}

async function pool(items, n, fn) {
  let idx = 0, active = 0;
  return new Promise((resolve) => {
    const next = () => {
      if (idx >= items.length && active === 0) return resolve();
      while (active < n && idx < items.length) {
        const i = idx++; active++;
        fn(items[i], i + 1, items.length).then((m) => { console.log(m); active--; next(); });
      }
    };
    next();
  });
}

(async () => {
  console.log(`› Robust re-capture of ${URLS.length} pages (concurrency ${CONCURRENCY})`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 } });
  await pool(URLS, CONCURRENCY, (url, i, total) => capture(context, url, i, total));
  writeFileSync(path.join(KIT, 'assets-manifest-v2.json'), JSON.stringify({ count: ASSETS.size, assets: [...ASSETS].filter((a) => /^https?:|^\/\//.test(a)) }, null, 2));
  console.log(`\n=== DONE === content+screenshots refreshed · ${ASSETS.size} unique assets → assets-manifest-v2.json`);
  await browser.close();
})();
