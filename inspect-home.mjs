/**
 * Thorough live-home inspector — structure, exact images, colors, AND hover
 * animations (parsed from the stylesheets). For the home page only.
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 900 } });
  await p.goto('https://azure.folio3.com/', { waitUntil: 'load', timeout: 70000 });
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 700); y += 700; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 90); }); scrollTo(0, 0); });
  await p.waitForTimeout(1200);

  const data = await p.evaluate(() => {
    const rel = (s) => (s || '').replace(location.origin, '').split('?')[0];
    const rgb = (el) => getComputedStyle(el).backgroundColor;

    // 1) FULL ordered top-level sections (inclusive)
    const sections = [...document.querySelectorAll('section, .elementor-section.elementor-top-section')]
      .filter((s) => s.getBoundingClientRect().height > 60)
      .map((s) => {
        const h = s.querySelector('h1,h2');
        const imgs = [...s.querySelectorAll('img')].map((i) => ({ src: rel(i.currentSrc || i.src), alt: i.alt || '' })).filter((i) => i.src && !i.src.startsWith('data:'));
        const r = s.getBoundingClientRect();
        return { heading: (h?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50), y: Math.round(r.top + scrollY), h: Math.round(r.height), bg: rgb(s), nImg: imgs.length, imgs: imgs.slice(0, 10) };
      });

    // 2) HOVER rules from all stylesheets (transitions/transforms on :hover)
    const hover = [];
    for (const sheet of document.styleSheets) {
      let rules; try { rules = sheet.cssRules; } catch { continue; }
      if (!rules) continue;
      for (const rule of rules) {
        const sel = rule.selectorText;
        if (sel && sel.includes(':hover')) {
          const t = rule.style?.cssText || '';
          if (/transform|transition|scale|translate|box-shadow|opacity|background|color/.test(t)) {
            hover.push({ sel: sel.slice(0, 80), css: t.slice(0, 160) });
          }
        }
      }
    }

    return { sections, hoverCount: hover.length, hover: hover.slice(0, 40) };
  });

  writeFileSync('verify/_home_inspect.json', JSON.stringify(data, null, 2));
  console.log('=== SECTIONS (live home) ===');
  data.sections.forEach((s, i) => console.log(String(i).padStart(2) + ' [' + (s.heading || '(no h)') + '] h=' + s.h + ' bg=' + s.bg + ' imgs=' + s.nImg));
  console.log('\n=== HOVER rules found: ' + data.hoverCount + ' (sample) ===');
  data.hover.slice(0, 18).forEach((h) => console.log('  ' + h.sel + '  {' + h.css + '}'));
  await b.close();
})();
