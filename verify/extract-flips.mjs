/**
 * Extract Elementor flip-box content from the LIVE per page: front title + icon and the
 * BACK title/description that the capture missed. Stored to clone-kit/flip-content.json so
 * the renderer can render real flip cards (front icon+title → back description) matching the live.
 *   { "<pageSlug>": [ { front, back, icon, btn, href } ] }   // section order preserved
 * Usage: node verify/extract-flips.mjs [route]   (no arg = all DESIGN_PAGES)
 */
import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';

const LIVE = 'https://azure.folio3.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT = 'd:/AzureClone/clone-kit/flip-content.json';
const routes = process.argv[2] ? [process.argv[2]] : DESIGN_PAGES;
const slugOf = (r) => (r.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');

const map = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
let done = 0, withFlips = 0;
for (const route of routes) {
  const page = await ctx.newPage();
  try {
    const code = (await page.goto(LIVE + route, { waitUntil: 'load', timeout: 80000 }))?.status();
    if (code && code >= 400) { await page.close(); continue; }
    await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 35); }); });
    await page.waitForTimeout(600);
    const flips = await page.evaluate(() => {
      const txt = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();
      return [...document.querySelectorAll('.elementor-flip-box')].map((f) => {
        const layers = [...f.querySelectorAll('.elementor-flip-box__layer')];
        const front = f.querySelector('.elementor-flip-box__front') || layers[0];
        const back = f.querySelector('.elementor-flip-box__back') || layers[1];
        const frontTitle = txt(front?.querySelector('.elementor-flip-box__layer__title')) || txt(front?.querySelector('h1,h2,h3,h4,h5'));
        const backTitle = txt(back?.querySelector('.elementor-flip-box__layer__title'));
        const backDesc = txt(back?.querySelector('.elementor-flip-box__layer__description')) || txt(back?.querySelector('p'));
        // front icon: <img> src or inline <svg> markup
        const iconImg = front?.querySelector('.elementor-flip-box__layer__icon img, .elementor-icon img');
        const iconSvg = front?.querySelector('.elementor-flip-box__layer__icon svg, .elementor-icon svg');
        let icon = '';
        if (iconImg) icon = iconImg.getAttribute('src') || iconImg.getAttribute('data-src') || '';
        else if (iconSvg) icon = iconSvg.outerHTML;
        const a = back?.querySelector('a[href]') || front?.querySelector('a[href]');
        let href = a?.getAttribute('href') || '';
        href = href.replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '');
        return { front: frontTitle, back: backDesc || backTitle, backTitle, icon, btn: txt(a), href: href.startsWith('/') ? href : '' };
      }).filter((x) => x.front);
    });
    if (flips.length) { map[slugOf(route)] = flips; writeFileSync(OUT, JSON.stringify(map, null, 0)); withFlips++; }
    done++;
  } catch { /* skip */ }
  await page.close();
}
await browser.close();
console.log(`scanned ${done} pages, ${withFlips} have flip boxes → ${OUT}`);
