/** Extract the LIVE's inline card-icon SVGs (custom Elementor icons the capture missed
 *  because they're not <img> files) → save each as a file in public/icons/<page>/<slug>.svg
 *  and build clone-kit/card-icons.json: { pageSlug: { titleSlug: "/icons/.../x.svg" } }.
 *  My card grids then render the real icon by title instead of a ◆ placeholder. */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';

const PUB = 'd:/AzureClone/azure-clone-next/public';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124';
const PAGES = [
  'azure-for-retail', 'azure-cloud-service', 'azure-managed-services', 'azure-data-analytics',
  'microsoft-fabric-services', 'microsoft-power-platform-services', 'ai-scenario-library',
];
const slugify = (t) => (t || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
const manifest = {};
for (const slug of PAGES) {
  const page = await ctx.newPage();
  try {
    await page.goto('https://azure.folio3.com/' + slug + '/', { waitUntil: 'load', timeout: 90000 });
    await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 700) { clearInterval(t); r(); } }, 35); }); });
    await page.waitForTimeout(700);
    const cards = await page.evaluate(() => {
      const out = [];
      const seen = new Set();
      const norm = (svg) => { const s = svg.cloneNode(true); s.removeAttribute('width'); s.removeAttribute('height'); if (!s.getAttribute('viewBox')) s.setAttribute('viewBox', '0 0 100 100'); return s.outerHTML; };
      const push = (title, svg) => {
        title = (title || '').replace(/\s+/g, ' ').trim();
        if (!title || title.length > 70 || seen.has(title) || !svg) return;
        const markup = norm(svg);
        if (markup.length > 60000) return;
        seen.add(title); out.push({ title, svg: markup });
      };
      // (a) icon-box widgets: svg + heading
      for (const w of document.querySelectorAll('.elementor-widget-icon-box, .elementor-icon-box-wrapper, .e-con-inner, .elementor-widget')) {
        if (w.querySelector('.elementor-widget-icon-box .elementor-widget-icon-box')) continue;
        const svg = w.querySelector(':scope .elementor-icon svg, :scope > * .elementor-icon svg, :scope svg');
        const titleEl = w.querySelector('.elementor-icon-box-title, h3, h4, h5');
        if (svg && titleEl) push(titleEl.textContent, svg);
      }
      // (b) icon-LIST items (FeatureGroups feature rows): svg + .elementor-icon-list-text
      for (const li of document.querySelectorAll('.elementor-icon-list-item')) {
        const svg = li.querySelector('svg');
        const t = li.querySelector('.elementor-icon-list-text');
        if (svg && t) push(t.textContent, svg);
      }
      // (c) flip-box fronts: svg + flip title (why-leverage style)
      for (const f of document.querySelectorAll('.elementor-flip-box')) {
        const svg = f.querySelector('.elementor-flip-box__front svg, .elementor-icon svg');
        const t = f.querySelector('.elementor-flip-box__front .elementor-flip-box__layer__title, .elementor-flip-box__layer__title');
        if (svg && t) push(t.textContent, svg);
      }
      return out;
    });
    const dir = `${PUB}/icons/${slug}`;
    if (cards.length && !existsSync(dir)) mkdirSync(dir, { recursive: true });
    manifest[slug] = {};
    for (const c of cards) {
      const fslug = slugify(c.title);
      writeFileSync(`${dir}/${fslug}.svg`, c.svg);
      manifest[slug][fslug] = `/icons/${slug}/${fslug}.svg`;
    }
    console.log(`${slug}: ${cards.length} icons`);
  } catch (e) { console.log(`${slug}: ERR ${String(e).slice(0, 50)}`); }
  await page.close();
}
writeFileSync('d:/AzureClone/clone-kit/card-icons.json', JSON.stringify(manifest, null, 2));
await browser.close();
console.log('manifest written');
