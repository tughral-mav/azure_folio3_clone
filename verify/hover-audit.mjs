/** HOVER AUDIT — inventories the LIVE page's interactive/hover effects so we can verify the
 *  clone reproduces them. Catches the class of bug where Elementor flip-boxes + hover
 *  animations render as static elements in the clone.
 *  Usage: node verify/hover-audit.mjs /azure-for-retail/   (or no arg = all key pages) */
import { chromium } from 'playwright';

const KEY = ['/', '/azure-for-retail/', '/azure-cloud-service/', '/azure-managed-services/', '/azure-data-analytics/', '/microsoft-fabric-services/', '/microsoft-power-platform-services/', '/ai-scenario-library/'];
const routes = process.argv[2] ? [process.argv[2]] : KEY;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124';

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 1000 } });

function nearestHeading(role) {
  // serialized into page.evaluate below
}

for (const route of routes) {
  const page = await ctx.newPage();
  try {
    await page.goto('https://azure.folio3.com' + route, { waitUntil: 'load', timeout: 90000 });
    await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 700) { clearInterval(t); r(); } }, 40); }); });
    await page.waitForTimeout(700);
    const rep = await page.evaluate(() => {
      const sectionOf = (el) => { let s = el.closest('.elementor-section, .e-con'); let g = ''; while (s && !g) { const h = s.querySelector('h1,h2,h3'); if (h) g = h.textContent.replace(/\s+/g, ' ').trim().slice(0, 45); s = s.parentElement?.closest('.elementor-section, .e-con'); } return g; };
      // 1) flip boxes
      const flips = {};
      document.querySelectorAll('.elementor-flip-box').forEach((f) => { const s = sectionOf(f) || '(?)'; flips[s] = (flips[s] || 0) + 1; });
      // 2) elementor hover-animation classes
      const anim = {};
      document.querySelectorAll('[class*="elementor-animation-"]').forEach((e) => { const c = [...e.classList].find((x) => x.startsWith('elementor-animation-')); const s = sectionOf(e) || '(?)'; const k = s + ' :: ' + c; anim[k] = (anim[k] || 0) + 1; });
      // 3) significant :hover rules (transform/scale/background/box-shadow) from stylesheets
      const hoverFx = new Set();
      for (const sheet of document.styleSheets) { let rules; try { rules = sheet.cssRules; } catch { continue; } for (const r of rules || []) { if (r.selectorText && /:hover/.test(r.selectorText) && /transform|scale|box-shadow|background/i.test(r.style?.cssText || '')) { const base = r.selectorText.replace(/:hover/g, '').replace(/::?(before|after|focus|visible)/g, '').trim(); try { if (base && document.querySelector(base)) hoverFx.add(r.selectorText.slice(0, 70) + ' {' + (r.style.cssText || '').slice(0, 60) + '}'); } catch {} } } }
      return { flips, anim, hoverFx: [...hoverFx].slice(0, 15) };
    });
    console.log(`\n===== ${route} =====`);
    console.log('FLIP BOXES (hover-flip cards):', Object.keys(rep.flips).length ? '' : 'none');
    Object.entries(rep.flips).forEach(([s, n]) => console.log(`   ${n}x  in "${s}"`));
    console.log('HOVER ANIMATIONS (elementor-animation-*):', Object.keys(rep.anim).length ? '' : 'none');
    Object.entries(rep.anim).forEach(([k, n]) => console.log(`   ${n}x  ${k}`));
    console.log('NOTABLE :hover CSS:', rep.hoverFx.length ? '' : 'none');
    rep.hoverFx.forEach((x) => console.log('   ' + x));
  } catch (e) { console.log(`\n===== ${route} ===== ERROR ${String(e).slice(0, 60)}`); }
  await page.close();
}
await browser.close();
