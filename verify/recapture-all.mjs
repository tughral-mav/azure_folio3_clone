/** Re-capture ALL marketing pages with the ordered item model (Path A), pooled. */
import { chromium } from 'playwright';
import { writeFileSync, copyFileSync, existsSync, appendFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';

const BESPOKE = new Set(['/', '/blog/', '/contact-us/', '/thank-you/', '/industries/']);
const ROUTES = DESIGN_PAGES.filter((r) => !BESPOKE.has(r));
const KIT = 'd:/AzureClone/clone-kit/content';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const slugOf = (r) => (r.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
writeFileSync('verify/recapture.progress', '');

async function capture(page, route) {
  await page.goto('https://azure.folio3.com' + route, { waitUntil: 'load', timeout: 90000 });
  for (let pass = 0; pass < 2; pass++) { await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 400); y += 400; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 55); }); }); await page.waitForTimeout(700); }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(300);
  return page.evaluate(() => {
    const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
    const up = (u) => { if (!u) return null; try { u = new URL(u, location.href).href; } catch {} const m = u.match(/https?:\/\/[^"'\s]+\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i); return m ? m[0].replace(/^https?:\/\/[^/]+/, 'https://azure.folio3.com') : null; };
    const imgSrc = (im) => { let s = up(im.currentSrc) || up(im.getAttribute('data-lazy-src')) || up(im.getAttribute('src')); if (!s) { const ss = im.getAttribute('srcset') || im.getAttribute('data-lazy-srcset') || ''; s = up((ss.split(',')[0] || '').trim().split(' ')[0]); } return s; };
    const tops = [...document.querySelectorAll('.elementor-section.elementor-top-section, .e-con.e-parent, body > main section')];
    const outer = tops.filter((s) => !tops.some((o) => o !== s && o.contains(s)));
    const seen = new Set();
    const sections = outer.map((sec) => {
      const items = [];
      for (const el of sec.querySelectorAll('h1,h2,h3,h4,h5,p,li,img,a')) {
        const tag = el.tagName.toLowerCase();
        if (tag === 'img') { const s = imgSrc(el); if (s && !seen.has(s)) { seen.add(s); items.push({ t: 'img', src: s, w: el.naturalWidth || +el.getAttribute('width') || 0, h: el.naturalHeight || +el.getAttribute('height') || 0, alt: el.getAttribute('alt') || '' }); } continue; }
        if (tag === 'a') { if (!/elementor-button|\bbtn\b|button/i.test((el.className || '').toString())) continue; const text = clean(el.textContent); if (text && text.length < 60) items.push({ t: 'cta', text, href: el.getAttribute('href') }); continue; }
        if (el.querySelector('h1,h2,h3,h4,h5,p,li')) continue;
        const text = clean(el.textContent); if (!text || text.length < 2) continue;
        if (/^h[1-5]$/.test(tag)) items.push({ t: 'h', tag, text }); else if (tag === 'li') { if (text.length < 240) items.push({ t: 'li', text }); } else items.push({ t: 'p', text });
      }
      return { items, headings: items.filter((i) => i.t === 'h').map((i) => ({ tag: i.tag, text: i.text })), paragraphs: [...new Set(items.filter((i) => i.t === 'p').map((i) => i.text))], listItems: [...new Set(items.filter((i) => i.t === 'li').map((i) => i.text))], ctas: items.filter((i) => i.t === 'cta').map((i) => ({ text: i.text, href: i.href })), images: items.filter((i) => i.t === 'img').map((i) => ({ src: i.src, alt: i.alt, w: i.w, h: i.h })) };
    }).filter((s) => s.items.length);
    const bgImages = [...new Set([...document.querySelectorAll('.elementor-section, .e-con')].flatMap((el) => { const bg = getComputedStyle(el).backgroundImage; return bg && bg !== 'none' ? (bg.match(/url\(["']?([^"')]+)["']?\)/g) || []).map((u) => up(u.replace(/^url\(["']?|["']?\)$/g, ''))) : []; }).filter(Boolean))];
    return { url: location.href, meta: { title: document.title, description: document.querySelector('meta[name=description]')?.content || null, canonical: document.querySelector('link[rel=canonical]')?.href || null, ogImage: document.querySelector('meta[property="og:image"]')?.content || null, h1Count: document.querySelectorAll('h1').length }, sections, images: [...new Set(sections.flatMap((s) => s.images.map((i) => i.src)))].map((src) => ({ src, alt: '' })), bgImages };
  });
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 1100 } });
let i = 0, done = 0, ok = 0;
async function worker() {
  const page = await ctx.newPage();
  while (i < ROUTES.length) {
    const route = ROUTES[i++];
    try { const data = await capture(page, route); if (data.sections.length >= 2 && data.meta.h1Count >= 1) { const f = `${KIT}/${slugOf(route)}.json`; if (existsSync(f) && !existsSync(f + '.bak')) copyFileSync(f, f + '.bak'); writeFileSync(f, JSON.stringify(data, null, 2)); ok++; appendFileSync('verify/recapture.progress', `[${++done}] ${route} ${data.sections.length}sec ${data.images.length}img h1=${data.meta.h1Count}\n`); } else { appendFileSync('verify/recapture.progress', `[${++done}] ${route} SKIP (sec=${data.sections.length} h1=${data.meta.h1Count})\n`); } }
    catch (e) { appendFileSync('verify/recapture.progress', `[${++done}] ${route} ERR ${String(e).slice(0, 50)}\n`); }
  }
  await page.close();
}
await Promise.all(Array.from({ length: 4 }, worker));
await browser.close();
console.log(`re-captured ${ok}/${ROUTES.length} marketing pages`);
