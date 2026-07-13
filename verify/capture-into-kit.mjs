/**
 * Repo-local ORDERED capture + structural analysis (Path A), writing straight into
 * the app's content-kit so the catch-all route can render it. Mirrors recapture-full.mjs
 * but (a) targets ./azure-clone-next/content-kit/content and (b) also emits a rich
 * analysis file (heading outline, links, images+dims, widgets, animation settings) so
 * we can classify the template and plan a faithful build.
 *
 * Usage: node verify/capture-into-kit.mjs /petrochemical-producer-edms-compliance-agent/
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const route = process.argv[2];
if (!route) { console.error('need a route'); process.exit(1); }
const slug = (route.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
const KIT = path.resolve('azure-clone-next/content-kit/content');
const ANALYSIS = path.resolve('verify/_analysis');
mkdirSync(ANALYSIS, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';

const b = await chromium.launch();
const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 1100 } });
await p.goto('https://azure.folio3.com' + route, { waitUntil: 'load', timeout: 90000 });
// full lazy-load: scroll to the bottom twice so every lazy image/section mounts
for (let pass = 0; pass < 2; pass++) {
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 400); y += 400; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 60); }); });
  await p.waitForTimeout(800);
}
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(500);

// ---- ordered capture (identical logic to recapture-full.mjs) ----
const data = await p.evaluate(() => {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const up = (u) => { if (!u) return null; try { u = new URL(u, location.href).href; } catch {} const m = u.match(/https?:\/\/[^"'\s]+\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i); return m ? m[0].replace(/^https?:\/\/[^/]+/, 'https://azure.folio3.com') : null; };
  const imgSrc = (im) => { let s = up(im.currentSrc) || up(im.getAttribute('data-lazy-src')) || up(im.getAttribute('src')); if (!s) { const ss = im.getAttribute('srcset') || im.getAttribute('data-lazy-srcset') || ''; s = up((ss.split(',')[0] || '').trim().split(' ')[0]); } return s; };

  const tops = [...document.querySelectorAll('.elementor-section.elementor-top-section, .e-con.e-parent, body > main section')];
  const outer = tops.filter((s) => !tops.some((o) => o !== s && o.contains(s)));
  const seenImg = new Set();

  const sections = outer.map((sec) => {
    const nodes = [...sec.querySelectorAll('h1,h2,h3,h4,h5,p,li,img,a')];
    const items = [];
    for (const el of nodes) {
      const tag = el.tagName.toLowerCase();
      if (tag === 'img') { const s = imgSrc(el); if (s && !seenImg.has(s)) { seenImg.add(s); items.push({ t: 'img', src: s, w: el.naturalWidth || +el.getAttribute('width') || 0, h: el.naturalHeight || +el.getAttribute('height') || 0, alt: el.getAttribute('alt') || '' }); } continue; }
      if (tag === 'a') { const cls = (el.className || '').toString(); if (!/elementor-button|\bbtn\b|button/i.test(cls)) continue; const text = clean(el.textContent); if (text && text.length < 60) items.push({ t: 'cta', text, href: el.getAttribute('href') }); continue; }
      if (el.querySelector('h1,h2,h3,h4,h5,p,li')) continue;
      const text = clean(el.textContent);
      if (!text || text.length < 2) continue;
      if (/^h[1-5]$/.test(tag)) items.push({ t: 'h', tag, text });
      else if (tag === 'li') { if (text.length < 240) items.push({ t: 'li', text }); }
      else items.push({ t: 'p', text });
    }
    return {
      items,
      headings: items.filter((i) => i.t === 'h').map((i) => ({ tag: i.tag, text: i.text })),
      paragraphs: [...new Set(items.filter((i) => i.t === 'p').map((i) => i.text))],
      listItems: [...new Set(items.filter((i) => i.t === 'li').map((i) => i.text))],
      ctas: items.filter((i) => i.t === 'cta').map((i) => ({ text: i.text, href: i.href })),
      images: items.filter((i) => i.t === 'img').map((i) => ({ src: i.src, alt: i.alt, w: i.w, h: i.h })),
    };
  }).filter((s) => s.items.length);

  const bgImages = [...new Set([...document.querySelectorAll('.elementor-section, .e-con')].flatMap((el) => { const bg = getComputedStyle(el).backgroundImage; return bg && bg !== 'none' ? (bg.match(/url\(["']?([^"')]+)["']?\)/g) || []).map((u) => up(u.replace(/^url\(["']?|["']?\)$/g, ''))) : []; }).filter(Boolean))];
  return {
    url: location.href,
    meta: { title: document.title, description: document.querySelector('meta[name=description]')?.content || null, canonical: document.querySelector('link[rel=canonical]')?.href || null, ogImage: document.querySelector('meta[property="og:image"]')?.content || null, h1Count: document.querySelectorAll('h1').length },
    sections,
    images: [...new Set(sections.flatMap((s) => s.images.map((i) => i.src)))].map((src) => ({ src, alt: '' })),
    bgImages,
  };
});

// ---- rich analysis (for classification + planning) ----
const analysis = await p.evaluate(() => {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const bodyClass = document.body.className;
  const isPost = /\b(single|single-post|blog|postid-)\b/.test(bodyClass);
  const isElementor = /elementor/.test(bodyClass);
  // full heading outline in document order
  const outline = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({ tag: h.tagName.toLowerCase(), text: clean(h.textContent) })).filter((h) => h.text);
  // all internal links (folio3) with anchor text
  const links = [...document.querySelectorAll('a[href]')]
    .map((a) => ({ href: a.getAttribute('href'), text: clean(a.textContent).slice(0, 50) }))
    .filter((l) => l.href && !l.href.startsWith('#') && !/^(mailto|tel|javascript):/i.test(l.href))
    .filter((l) => /azure\.folio3\.com|^\//.test(l.href))
    .map((l) => ({ ...l, href: l.href.replace(/^https?:\/\/azure\.folio3\.com/, '') }));
  const uniqLinks = [...new Map(links.map((l) => [l.href + '|' + l.text, l])).values()];
  // widgets present
  const widgets = {
    counters: document.querySelectorAll('.elementor-counter, .elementor-counter-number').length,
    tabs: document.querySelectorAll('.elementor-tabs, .e-n-tabs, .elementor-tab-title').length,
    accordions: document.querySelectorAll('.elementor-accordion, .e-n-accordion, .elementor-toggle').length,
    flipBoxes: document.querySelectorAll('.elementor-flip-box').length,
    videos: document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"], .elementor-video, [class*=video]').length,
    forms: document.querySelectorAll('form').length,
    carousels: document.querySelectorAll('.swiper, .elementor-swiper, [class*=carousel], [class*=slider]').length,
  };
  // elements carrying an entrance animation (elementor _animation data-setting)
  const animated = [...document.querySelectorAll('[data-settings]')].map((el) => {
    try { const s = JSON.parse(el.getAttribute('data-settings')); const a = s._animation || s.animation; return a ? { anim: a, tag: el.tagName.toLowerCase(), cls: (el.className || '').toString().slice(0, 60) } : null; } catch { return null; }
  }).filter(Boolean).slice(0, 40);
  // hover: sample buttons + cards computed transition (best-effort documentation of hover intent)
  const hoverSample = [...document.querySelectorAll('.elementor-button, .elementor-flip-box, .elementor-widget-image, a.btn')].slice(0, 8).map((el) => {
    const cs = getComputedStyle(el);
    return { cls: (el.className || '').toString().slice(0, 50), transition: cs.transition, transform: cs.transform };
  });
  // all wp-content asset URLs referenced anywhere (img src/srcset/data-lazy + css bg)
  const assetSet = new Set();
  const push = (u) => { if (!u) return; const m = String(u).match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif|mp4|webm)/i); if (m) assetSet.add(m[0]); };
  document.querySelectorAll('img').forEach((im) => { push(im.currentSrc); push(im.getAttribute('src')); push(im.getAttribute('data-lazy-src')); (im.getAttribute('srcset') || im.getAttribute('data-lazy-srcset') || '').split(',').forEach((s) => push(s.trim().split(' ')[0])); });
  document.querySelectorAll('source').forEach((s) => (s.getAttribute('srcset') || '').split(',').forEach((x) => push(x.trim().split(' ')[0])));
  document.querySelectorAll('*').forEach((el) => { const bg = getComputedStyle(el).backgroundImage; if (bg && bg !== 'none') (bg.match(/url\(["']?([^"')]+)["']?\)/g) || []).forEach((u) => push(u)); });
  document.querySelectorAll('video,source[type^="video"]').forEach((v) => { push(v.getAttribute('src')); });

  return {
    bodyClass, isPost, isElementor,
    counts: { headings: outline.length, links: uniqLinks.length, assets: assetSet.size },
    outline, links: uniqLinks, widgets, animated, hoverSample,
    assets: [...assetSet].sort(),
  };
});

await b.close();

mkdirSync(KIT, { recursive: true });
writeFileSync(path.join(KIT, `${slug}.json`), JSON.stringify(data, null, 2));
writeFileSync(path.join(ANALYSIS, `${slug}.analysis.json`), JSON.stringify(analysis, null, 2));

const imgCount = data.sections.reduce((n, s) => n + s.images.length, 0);
const itemCount = data.sections.reduce((n, s) => n + s.items.length, 0);
console.log(`CAPTURED ${slug}`);
console.log(`  sections=${data.sections.length} items=${itemCount} images=${imgCount} h1=${data.meta.h1Count}`);
console.log(`  title: ${data.meta.title}`);
console.log(`  bodyClass: ${analysis.bodyClass.slice(0, 120)}`);
console.log(`  isPost=${analysis.isPost} isElementor=${analysis.isElementor}`);
console.log(`  widgets: ${JSON.stringify(analysis.widgets)}`);
console.log(`  headings=${analysis.counts.headings} links=${analysis.counts.links} assets=${analysis.counts.assets}`);
