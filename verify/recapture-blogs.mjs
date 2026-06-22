/** Re-capture every blog post's bodyHtml with LAZY-LOAD IMAGES RESOLVED (the original
 *  capture only stored data:svg placeholders) + the Related Blogs thumbnails. Pooled. */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, readdirSync, existsSync, copyFileSync, appendFileSync } from 'node:fs';
import path from 'node:path';

const KIT = 'd:/AzureClone/clone-kit/content';
const LIVE = 'https://azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PROG = 'verify/recapture-blogs.progress';
writeFileSync(PROG, '');

const ONLY = process.argv[2]; // optional substring filter to re-capture specific blogs
const files = readdirSync(KIT)
  .filter((f) => f.startsWith('blog_') && f.endsWith('.json'))
  .filter((f) => !/^blog_(category|tag|author)_/.test(f))
  .filter((f) => !ONLY || f.includes(ONLY));

function localize(html) {
  return html
    .replace(/\s(?:data-lazy-src|data-lazy-srcset|data-src|srcset|sizes|loading|decoding)="[^"]*"/gi, '')
    .replace(/src="https:\/\/azure\.folio3\.com/g, 'src="')
    .replace(/href="https:\/\/azure\.folio3\.com/g, 'href="')
    .replace(/https:\/\/azure\.folio3\.com/g, '');
}

async function capture(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  for (let i = 0; i < 2; i++) { await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 700) { clearInterval(t); r(); } }, 40); }); }); await page.waitForTimeout(600); }
  return page.evaluate(() => {
    const cont = document.querySelector('.elementor-widget-theme-post-content') || document.querySelector('.entry-content') || document.querySelector('article');
    if (!cont) return null;
    const clone = cont.cloneNode(true);
    // resolve every img to its loaded URL
    const orig = [...cont.querySelectorAll('img')];
    [...clone.querySelectorAll('img')].forEach((im, i) => {
      const o = orig[i];
      let real = (o && (o.currentSrc || o.getAttribute('data-lazy-src') || o.src)) || im.getAttribute('src') || '';
      if (!real || real.startsWith('data:')) real = (o && o.getAttribute('data-lazy-src')) || '';
      if (real && !real.startsWith('data:')) im.setAttribute('src', real);
    });
    // strip elementor script/style noise
    clone.querySelectorAll('script,style,noscript,.elementor-widget-container > .elementor-background-overlay').forEach((e) => e.remove());
    // related blogs
    const relHead = [...document.querySelectorAll('h2,h3')].find((h) => /related blogs|related (posts|articles)/i.test(h.textContent || ''));
    const related = [];
    if (relHead) {
      let sec = relHead.closest('section,.elementor-section,.e-con') || relHead.parentElement;
      const seen = new Set();
      sec && sec.querySelectorAll('a[href*="/blog/"]').forEach((a) => {
        const href = a.getAttribute('href'); if (!href || seen.has(href)) return; seen.add(href);
        const t = (a.querySelector('h2,h3,h4,.elementor-post__title') || a).textContent.replace(/\s+/g, ' ').trim();
        const img = a.querySelector('img');
        const isrc = img ? (img.currentSrc || img.getAttribute('data-lazy-src') || img.src || '') : '';
        if (t && t.length > 5) related.push({ title: t.slice(0, 140), href, image: isrc.startsWith('data:') ? '' : isrc });
      });
    }
    return { html: clone.innerHTML, related: related.slice(0, 6) };
  });
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 1100 } });
let i = 0, done = 0, ok = 0;
async function worker() {
  const page = await ctx.newPage();
  while (i < files.length) {
    const f = files[i++];
    const fp = path.join(KIT, f);
    try {
      const data = JSON.parse(readFileSync(fp, 'utf8'));
      const url = data.url || (LIVE + '/blog/' + f.replace(/^blog_/, '').replace(/\.json$/, '').replace(/_/g, '-') + '/');
      const r = await capture(page, url);
      if (r && r.html && r.html.length > 400) {
        if (!existsSync(fp + '.prebak')) copyFileSync(fp, fp + '.prebak');
        data.bodyHtml = localize(r.html);
        data.related = r.related.map((x) => ({ title: x.title, href: localize(x.href), image: localize(x.image) }));
        writeFileSync(fp, JSON.stringify(data, null, 2));
        ok++;
        appendFileSync(PROG, `[${++done}/${files.length}] ${f} body=${data.bodyHtml.length} rel=${data.related.length}\n`);
      } else {
        appendFileSync(PROG, `[${++done}/${files.length}] ${f} SKIP (no content)\n`);
      }
    } catch (e) { appendFileSync(PROG, `[${++done}/${files.length}] ${f} ERR ${String(e).slice(0, 60)}\n`); }
  }
  await page.close();
}
await Promise.all(Array.from({ length: 4 }, worker));
await browser.close();
console.log(`re-captured ${ok}/${files.length} blog bodies`);
