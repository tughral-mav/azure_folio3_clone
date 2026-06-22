/**
 * Extract clean, ordered article HTML for every blog post (Phase 4 / blog Lever 2).
 * The bulk capture flattened headings/paragraphs into separate lists, losing the
 * document order. This grabs the post-content container, strips Elementor classes
 * /scripts/styles down to SEMANTIC html (h2-h4, p, ul/ol/li, a, img, blockquote,
 * table, code), and stores it as `bodyHtml` on each blog JSON for prose rendering.
 *
 * Resumable (skips posts that already have bodyHtml). Run:
 *   PLAYWRIGHT_BROWSERS_PATH=d:/AzureClone/.ms-playwright node blog-body-capture.mjs
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORIGIN = 'https://azure.folio3.com';
const CONTENT = path.join(__dirname, 'clone-kit', 'content');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

const reg = JSON.parse(readFileSync(path.join(__dirname, 'audit-output', 'registry.json')));
const posts = (reg.post ?? []).map((u) => u.loc);

function extractBody() {
  // find the post-content container (Elementor) or the densest <p> block
  let root = document.querySelector('.elementor-widget-theme-post-content .elementor-widget-container')
    || document.querySelector('[data-elementor-type="single-post"]');
  if (!root) {
    let best = null, bestN = 0;
    document.querySelectorAll('div,article,main').forEach((el) => {
      const n = el.querySelectorAll('p').length;
      if (n > bestN && n < 200) { bestN = n; best = el; }
    });
    root = best;
  }
  if (!root) return { bodyHtml: '', related: [] };

  const clone = root.cloneNode(true);
  // drop non-content
  clone.querySelectorAll('script,style,svg,iframe,form,button,noscript,.elementor-widget-theme-post-navigation,.elementor-share-buttons,nav').forEach((e) => e.remove());
  // strip attributes down to href/src/alt
  clone.querySelectorAll('*').forEach((e) => {
    [...e.attributes].forEach((a) => { if (!['href', 'src', 'alt'].includes(a.name)) e.removeAttribute(a.name); });
  });
  // unwrap empty divs/spans noise is fine; collect related posts separately
  const related = [...document.querySelectorAll('.elementor-post__title a, .related a, [class*=related] a')]
    .map((a) => ({ title: a.textContent.trim(), href: a.getAttribute('href') }))
    .filter((r) => r.title).slice(0, 3);

  return { bodyHtml: clone.innerHTML.replace(/\s+/g, ' ').replace(/<div>\s*<\/div>/g, '').slice(0, 60000), related };
}

const slugOf = (url) => url.replace(ORIGIN, '').replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '_').slice(0, 120);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ userAgent: UA, viewport: { width: 1440, height: 900 } });
  let ok = 0, skip = 0, fail = 0;
  for (let i = 0; i < posts.length; i++) {
    const url = posts[i];
    const file = path.join(CONTENT, `${slugOf(url)}.json`);
    if (!existsSync(file)) { fail++; continue; }
    const data = JSON.parse(readFileSync(file, 'utf8'));
    if (data.bodyHtml) { skip++; continue; }
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 1200); y += 1200; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 40); }); scrollTo(0, 0); });
      await page.waitForTimeout(400);
      const { bodyHtml, related } = await page.evaluate(extractBody);
      data.bodyHtml = bodyHtml;
      data.related = related;
      writeFileSync(file, JSON.stringify(data, null, 2));
      ok++;
      if ((ok + skip) % 20 === 0) console.log(`[${i + 1}/${posts.length}] ${slugOf(url)} bodyHtml=${bodyHtml.length}b related=${related.length}`);
    } catch (e) { fail++; console.log(`FAIL ${slugOf(url)} ${String(e).slice(0, 50)}`); }
  }
  console.log(`\n=== DONE === ${ok} extracted · ${skip} cached · ${fail} failed`);
  await browser.close();
})();
