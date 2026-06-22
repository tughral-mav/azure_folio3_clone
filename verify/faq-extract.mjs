/** Extract live FAQ question toggles (in order) per design page → clone-kit/faq.json {slug:[questions]}. */
import { chromium } from 'playwright';
import { writeFileSync, appendFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const slug = (r) => (r.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
const b = await chromium.launch();
const ctx = await b.newContext({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
const out = {};
let i = 0, done = 0;
async function worker() {
  while (i < DESIGN_PAGES.length) {
    const route = DESIGN_PAGES[i++];
    const p = await ctx.newPage();
    try {
      await p.goto('https://azure.folio3.com' + route, { waitUntil: 'load', timeout: 60000 });
      await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 800); y += 800; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 40); }); });
      await p.waitForTimeout(500);
      const qs = await p.evaluate(() => {
        const sels = ['.elementor-accordion-title', '.elementor-tab-title', '.e-n-accordion-item-title', 'summary', '.accordion-title', '[class*="accordion"] [class*="title"]'];
        for (const s of sels) {
          const els = [...document.querySelectorAll(s)].map((e) => e.textContent.replace(/\s+/g, ' ').trim()).filter((t) => t && t.length < 140 && /\?$/.test(t));
          if (els.length >= 2) return [...new Set(els)];
        }
        return [];
      });
      if (qs.length) out[slug(route)] = qs;
    } catch {}
    finally { await p.close(); done++; appendFileSync('verify/faq.progress', `${done}/${DESIGN_PAGES.length} ${route} (${out[slug(route)]?.length || 0} qs)\n`); }
  }
}
writeFileSync('verify/faq.progress', '');
await Promise.all(Array.from({ length: 5 }, worker));
await b.close();
writeFileSync('d:/AzureClone/clone-kit/faq.json', JSON.stringify(out, null, 2));
console.log('FAQ pages with questions:', Object.keys(out).length);
