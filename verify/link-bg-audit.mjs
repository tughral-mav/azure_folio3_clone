/**
 * LINK + BACKGROUND audit — compares the live vs clone CONTENT area (excludes header/footer/nav)
 * for two defect classes the image/parity gate misses:
 *   • CONTENT-LINK: a link target the live exposes in-content (card arrows, section buttons)
 *     that the clone's content area doesn't have. (Targets present only in nav don't count —
 *     that's why the parity link check passed while card arrows were missing.)
 *   • BG-IMAGE: a section background image the live renders VISIBLY (opacity≥0.4) that the
 *     clone doesn't render, or renders nearly invisibly (opacity<0.4 / missing).
 * Usage: node verify/link-bg-audit.mjs /azure-data-analytics/   (or no arg = 7 key pages)
 */
import { chromium } from 'playwright';

const LIVE = 'https://azure.folio3.com', CLONE = 'http://localhost:3000';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const KEY = ['/azure-for-retail/', '/azure-cloud-service/', '/azure-managed-services/', '/azure-data-analytics/', '/microsoft-fabric-services/', '/microsoft-power-platform-services/', '/ai-scenario-library/'];
const routes = process.argv[2] ? [process.argv[2]] : KEY;
const norm = (h) => (h || '').replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '').replace(/\/$/, '') || '/';

async function grab(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 80000 });
  await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 35); }); });
  await page.waitForTimeout(800);
  return page.evaluate(() => {
    const inChrome = (el) => !!el.closest('header,footer,nav,.elementor-location-header,.elementor-location-footer,[class*="mega-menu"],[role="navigation"]');
    // content links → internal targets
    const links = new Set();
    document.querySelectorAll('a[href]').forEach((a) => {
      if (inChrome(a)) return;
      let h = a.getAttribute('href') || '';
      if (!h || h.startsWith('#') || h.startsWith('tel:') || h.startsWith('mailto:') || h.startsWith('javascript')) return;
      if (/^https?:\/\//i.test(h) && !/azure\.folio3\.com/i.test(h)) return; // external
      links.add(h.replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '').replace(/\/$/, '') || '/');
    });
    // visible section background images
    const bgs = {};
    document.querySelectorAll('*').forEach((el) => {
      const s = getComputedStyle(el);
      const bg = s.backgroundImage;
      if (bg && /wp-content\/uploads/i.test(bg)) {
        const m = bg.match(/\/wp-content\/uploads\/[^"')]+\.(?:webp|png|jpe?g|gif|avif)/i);
        if (!m) return;
        const base = m[0].replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');
        const op = parseFloat(s.opacity || '1');
        const r = el.getBoundingClientRect();
        if (r.width < 40 || r.height < 40) return;
        bgs[base] = Math.max(bgs[base] || 0, op);
      }
    });
    // ALL rendered <img> base names (the clone renders "backgrounds" as <Image fill>, i.e.
    // an <img>, not CSS background — so a live CSS-bg can be present as a clone <img>).
    const imgBases = new Set();
    const decode = (u) => { try { if (/_next\/image/.test(u)) { const q = new URL(u, location.href).searchParams.get('url'); if (q) u = decodeURIComponent(q); } } catch {} return u; };
    document.querySelectorAll('img').forEach((im) => { const u = decode(im.currentSrc || im.src || ''); const m = u.match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|gif|avif)/i); if (m) imgBases.add(m[0].replace(/-\d+x\d+(?=\.[a-z]+$)/i, '')); });
    return { links: [...links], bgs, imgBases: [...imgBases] };
  });
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 1000 } });
for (const route of routes) {
  const lp = await ctx.newPage(), cp = await ctx.newPage();
  let live, clone;
  try { live = await grab(lp, LIVE + route); } catch { live = null; }
  try { clone = await grab(cp, CLONE + route); } catch { clone = null; }
  await lp.close(); await cp.close();
  console.log(`\n===== ${route} =====`);
  if (!live || !clone) { console.log('  LOAD ERROR'); continue; }
  const cloneLinks = new Set(clone.links.map(norm));
  const missingLinks = [...new Set(live.links.map(norm))].filter((l) => !cloneLinks.has(l) && l !== '/' && !/^\/(blog|contact|thank)/.test(l));
  const cloneBgBase = clone.bgs;
  const cloneImgs = new Set(clone.imgBases || []);
  // a live visible bg is "missing" only if the clone has it as NEITHER a visible CSS bg NOR an <img>
  const missingBgs = Object.entries(live.bgs).filter(([base, op]) => op >= 0.4 && !((cloneBgBase[base] ?? 0) >= 0.4) && !cloneImgs.has(base));
  if (!missingLinks.length && !missingBgs.length) console.log('  OK — no missing content links or backgrounds');
  if (missingLinks.length) { console.log(`  CONTENT-LINK missing (${missingLinks.length}):`); missingLinks.forEach((l) => console.log('     ' + l)); }
  if (missingBgs.length) { console.log(`  BG-IMAGE missing/faint (${missingBgs.length}):`); missingBgs.forEach(([b, op]) => console.log(`     ${b.split('/').pop()} (live op ${op}, clone op ${cloneBgBase[b] ?? 'none'})`)); }
}
await browser.close();
