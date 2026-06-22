/**
 * ORDERED complete re-capture (Path A). Captures each top-level section as an ORDERED
 * item stream (items[]: heading / paragraph / listItem / image / cta in DOM order) plus
 * the legacy flat fields, with FULL lazy-loading so no image is missed. The ordered model
 * lets the renderer rebuild blocks faithfully regardless of capture granularity.
 *
 * Usage: node verify/recapture-full.mjs <route>   (e.g. /power-bi-services/)
 */
import { chromium } from 'playwright';
import { writeFileSync, copyFileSync, existsSync } from 'node:fs';

const route = process.argv[2];
if (!route) { console.error('need a route'); process.exit(1); }
const slug = (route.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
const KIT = 'd:/AzureClone/clone-kit/content';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';

const b = await chromium.launch();
const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 1100 } });
await p.goto('https://azure.folio3.com' + route, { waitUntil: 'load', timeout: 90000 });
for (let pass = 0; pass < 2; pass++) {
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 400); y += 400; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 60); }); });
  await p.waitForTimeout(800);
}
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(500);

const data = await p.evaluate(() => {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const up = (u) => { if (!u) return null; try { u = new URL(u, location.href).href; } catch {} const m = u.match(/https?:\/\/[^"'\s]+\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i); return m ? m[0].replace(/^https?:\/\/[^/]+/, 'https://azure.folio3.com') : null; };
  const imgSrc = (im) => { let s = up(im.currentSrc) || up(im.getAttribute('data-lazy-src')) || up(im.getAttribute('src')); if (!s) { const ss = im.getAttribute('srcset') || im.getAttribute('data-lazy-srcset') || ''; s = up((ss.split(',')[0] || '').trim().split(' ')[0]); } return s; };

  const tops = [...document.querySelectorAll('.elementor-section.elementor-top-section, .e-con.e-parent, body > main section')];
  const outer = tops.filter((s) => !tops.some((o) => o !== s && o.contains(s)));
  const seenImg = new Set();

  const sections = outer.map((sec) => {
    // ordered walk: every relevant content element in DOM order
    const nodes = [...sec.querySelectorAll('h1,h2,h3,h4,h5,p,li,img,a')];
    const items = [];
    for (const el of nodes) {
      const tag = el.tagName.toLowerCase();
      if (tag === 'img') { const s = imgSrc(el); if (s && !seenImg.has(s)) { seenImg.add(s); items.push({ t: 'img', src: s, w: el.naturalWidth || +el.getAttribute('width') || 0, h: el.naturalHeight || +el.getAttribute('height') || 0, alt: el.getAttribute('alt') || '' }); } continue; }
      if (tag === 'a') { const cls = (el.className || '').toString(); if (!/elementor-button|\bbtn\b|button/i.test(cls)) continue; const text = clean(el.textContent); if (text && text.length < 60) items.push({ t: 'cta', text, href: el.getAttribute('href') }); continue; }
      // text element — skip if it wraps another captured text element (keep leaves)
      if (el.querySelector('h1,h2,h3,h4,h5,p,li')) continue;
      const text = clean(el.textContent);
      if (!text || text.length < 2) continue;
      if (/^h[1-5]$/.test(tag)) items.push({ t: 'h', tag, text });
      else if (tag === 'li') { if (text.length < 240) items.push({ t: 'li', text }); }
      else items.push({ t: 'p', text });
    }
    // legacy flat fields (back-compat: meta derivation, chrome filters)
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

await b.close();
const file = `${KIT}/${slug}.json`;
if (existsSync(file) && !existsSync(file + '.bak')) copyFileSync(file, file + '.bak');
writeFileSync(file, JSON.stringify(data, null, 2));
const imgCount = data.sections.reduce((n, s) => n + s.images.length, 0);
const itemCount = data.sections.reduce((n, s) => n + s.items.length, 0);
console.log(`recaptured ${slug}: ${data.sections.length} sections, ${itemCount} items, ${imgCount} images, h1=${data.meta.h1Count}`);
