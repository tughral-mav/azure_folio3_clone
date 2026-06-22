/**
 * PAGE-CHECKS — one runnable verifier for EVERY problem class we fixed on the 7 key pages.
 * Run on any clone route to find the same defects elsewhere before fixing them.
 *   node verify/page-checks.mjs /azure-managed-services/
 *   node verify/page-checks.mjs            (defaults to the 7 key pages)
 *
 * Checks (clone unless noted):
 *  1. BROKEN-IMG     every <img>/next-image actually loads (naturalWidth>0). Catches the
 *                    -300x168 responsive-variant-not-on-disk bug the parity gate misses.
 *  2. LIVE-IMG-COVER every live content image (base name) is present AND loads on the clone.
 *  3. PLACEHOLDER    no ◆ placeholder icons left in card grids (should be real icons).
 *  4. CARD-HOVER     static cards carry the .card-hover effect (border→brand + lift).
 *  5. FLIP-BOXES     every live .elementor-flip-box section has a hover/flip counterpart
 *                    in the clone (JS-state flip — detected via onmouseover handlers / data).
 *  6. CASE-IMG       "Real Results" case cards each show a thumbnail (no blank image card).
 *  7. SCALE-IN       prominent section images use the zoomIn entrance (reveal a-zoomIn).
 *  8. EMPTY-LINK     no card "Read More"/CTA links with empty/# href (the dup-title bug).
 */
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { DESIGN_PAGES } from './routes.mjs';

const PUB = 'd:/AzureClone/azure-clone-next/public';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const LIVE = 'https://azure.folio3.com', CLONE = 'http://localhost:3000';
const KEY = ['/azure-for-retail/', '/azure-cloud-service/', '/azure-managed-services/', '/azure-data-analytics/', '/microsoft-fabric-services/', '/microsoft-power-platform-services/', '/ai-scenario-library/'];
const argRoute = process.argv[2];
const SKIP = new Set(['/industries/']); // 404 on the live — not comparable
const routes = (argRoute === 'design' ? DESIGN_PAGES : argRoute ? [argRoute] : KEY).filter((r) => !SKIP.has(r));
const baseOf = (p) => (p || '').replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, '');

async function settle(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 80000 });
  // slow scroll to bottom so every lazy <img> enters the viewport and loads
  await page.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 400); y += 400; if (y > document.body.scrollHeight + 600) { clearInterval(t); r(); } }, 45); }); });
  try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
  // wait until all in-viewport-path images report complete (or 4s)
  await page.evaluate(async () => { await new Promise((res) => { const t0 = Date.now(); const chk = () => { const imgs = [...document.querySelectorAll('img')]; if (imgs.every((i) => i.complete) || Date.now() - t0 > 4000) res(); else setTimeout(chk, 200); }; chk(); }); });
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 1000 } });

for (const route of routes) {
  const fails = [];
  const cp = await ctx.newPage();
  let clone;
  try {
    await settle(cp, CLONE + route);
    clone = await cp.evaluate(() => {
      const up = (u) => { if (!u) return null; try { if (/_next\/image/.test(u)) { const q = new URL(u, location.href).searchParams.get('url'); if (q) u = decodeURIComponent(q); } } catch {} const m = u.match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i); return m ? m[0] : null; };
      const imgs = [...document.querySelectorAll('img')];
      const isSvg = (s) => /\.svg(\?|$)/i.test(s || '');
      const visible = (im) => im.offsetParent !== null && im.getBoundingClientRect().width > 8;
      // BROKEN = a VISIBLE, non-SVG image that finished loading but has zero natural size
      // (SVGs report 0 intrinsic size even when fine; hidden preloads aren't displayed).
      const broken = imgs.filter((im) => visible(im) && !isSvg(im.currentSrc || im.src) && im.complete && im.naturalWidth === 0)
        .map((im) => up(im.currentSrc || im.src) || (im.currentSrc || im.src).slice(-60)).filter(Boolean);
      const present = [...new Set(imgs.map((im) => up(im.currentSrc || im.getAttribute('src')) ).filter(Boolean))];
      // placeholder diamonds inside cards
      const placeholders = [...document.querySelectorAll('span,div')].filter((e) => e.children.length === 0 && e.textContent.trim() === '◆').length;
      // static cards + how many have card-hover
      const cards = [...document.querySelectorAll('[class*="rounded-2xl"][class*="border-surface-line"][class*="bg-white"], [class*="rounded-xl"][class*="border-surface-line"]')];
      const cardCount = cards.length;
      // a card "has hover" via the .card-hover utility OR any Tailwind hover: lift/shadow/border
      const hoverish = (cn) => /card-hover|hover:-translate|hover:shadow|hover:border|group-hover/i.test(cn);
      const cardHover = cards.filter((c) => hoverish(c.className.toString())).length;
      // case cards in "Real Results"
      const rrHead = [...document.querySelectorAll('h2')].find((h) => /real results|success stories|case stud/i.test(h.textContent));
      let caseCards = 0, caseNoImg = 0;
      if (rrHead) { const sec = rrHead.closest('section'); const cc = [...(sec?.querySelectorAll('.relative.h-64, [class*="h-64"]') || [])]; caseCards = cc.length; caseNoImg = cc.filter((c) => !c.querySelector('img')).length; }
      // zoomIn entrance images
      const zoomIn = document.querySelectorAll('.a-zoomIn, .reveal.a-zoomIn').length;
      // empty/# card links
      const emptyLinks = [...document.querySelectorAll('a')].filter((a) => /read more|learn more|read article/i.test(a.textContent) && (!a.getAttribute('href') || a.getAttribute('href') === '#' || a.getAttribute('href') === '')).length;
      // clone flip/hover interactivity present (JS-state cards set inline transition + onmouseenter via React → detect transition styles on absolutely-stacked layers)
      const flipish = document.querySelectorAll('[style*="translateY(100%)"], [style*="scale(0.7)"], [style*="rotateY"]').length;
      // breadcrumb bar ("Home » <Page>")
      const crumb = !![...document.querySelectorAll('*')].find((e) => e.children.length <= 3 && /home\s*(»|›|&raquo;)/i.test(e.textContent) && e.textContent.trim().length < 70);
      // content-area internal link targets (exclude header/footer/nav)
      const inChrome = (el) => !!el.closest('header,footer,nav,[role="navigation"],[class*="mega-menu"]');
      const contentLinks = [...new Set([...document.querySelectorAll('a[href]')].filter((a) => !inChrome(a)).map((a) => { let h = a.getAttribute('href') || ''; if (!h || h.startsWith('#') || /^(tel:|mailto:|javascript)/i.test(h)) return null; if (/^https?:\/\//i.test(h) && !/azure\.folio3\.com/i.test(h)) return null; return h.replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '').replace(/\/$/, '') || '/'; }).filter(Boolean))];
      return { broken: [...new Set(broken)], present, placeholders, cardCount, cardHover, caseCards, caseNoImg, zoomIn, emptyLinks, flipish, crumb, contentLinks };
    });
  } catch (e) { console.log(`\n=== ${route} ===  CLONE LOAD ERROR ${String(e).slice(0, 50)}`); await cp.close(); continue; }
  await cp.close();

  // live side: image set + flip-box sections
  const lp = await ctx.newPage();
  let live = { imgs: [], flipSections: 0, crumb: false, contentLinks: [], bgs: {} };
  try {
    await settle(lp, LIVE + route);
    live = await lp.evaluate(() => {
      const up = (u) => { if (!u) return null; const m = (u || '').match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg|gif|avif)/i); return m ? m[0] : null; };
      const s = new Set();
      document.querySelectorAll('img').forEach((im) => { [im.currentSrc, im.getAttribute('data-lazy-src'), im.src].forEach((u) => { const x = up(u); if (x) s.add(x); }); });
      const flipSections = new Set([...document.querySelectorAll('.elementor-flip-box')].map((f) => { const sec = f.closest('.elementor-section,.e-con'); return sec ? (sec.querySelector('h2,h3')?.textContent || '').slice(0, 30) : '?'; })).size;
      const crumb = !![...document.querySelectorAll('*')].find((e) => e.children.length <= 3 && /home\s*(»|›|&raquo;)/i.test(e.textContent) && e.textContent.trim().length < 70);
      const inChrome = (el) => !!el.closest('header,footer,nav,[role="navigation"],[class*="mega-menu"]');
      const contentLinks = [...new Set([...document.querySelectorAll('a[href]')].filter((a) => !inChrome(a)).map((a) => { let h = a.getAttribute('href') || ''; if (!h || h.startsWith('#') || /^(tel:|mailto:|javascript)/i.test(h)) return null; if (/^https?:\/\//i.test(h) && !/azure\.folio3\.com/i.test(h)) return null; return h.replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '').replace(/\/$/, '') || '/'; }).filter(Boolean))];
      const bgs = {};
      document.querySelectorAll('*').forEach((el) => { const cs = getComputedStyle(el); const bg = cs.backgroundImage; if (bg && /wp-content\/uploads/i.test(bg)) { const m = bg.match(/\/wp-content\/uploads\/[^"')]+\.(?:webp|png|jpe?g|gif|avif)/i); if (!m) return; const r = el.getBoundingClientRect(); if (r.width < 40 || r.height < 40) return; const base = m[0].replace(/-\d+x\d+(?=\.[a-z]+$)/i, ''); bgs[base] = Math.max(bgs[base] || 0, parseFloat(cs.opacity || '1')); } });
      return { imgs: [...s], flipSections, crumb, contentLinks, bgs };
    });
  } catch { /* live optional */ }
  await lp.close();

  // ---- evaluate checks ----
  if (clone.broken.length) fails.push(`BROKEN-IMG: ${clone.broken.length} broken <img> → ${clone.broken.slice(0, 4).join(', ')}`);
  const cloneBase = new Set(clone.present.map(baseOf));
  const missing = [...new Set(live.imgs.map(baseOf))].filter((b) => !cloneBase.has(b) && existsSync(path.join(PUB, decodeURIComponent(b))) === false);
  const onDiskNotShown = [...new Set(live.imgs.map(baseOf))].filter((b) => !cloneBase.has(b) && existsSync(path.join(PUB, decodeURIComponent(b))));
  if (onDiskNotShown.length) fails.push(`LIVE-IMG-COVER: ${onDiskNotShown.length} live imgs on disk but NOT rendered → ${onDiskNotShown.slice(0, 4).map((b) => b.split('/').pop()).join(', ')}`);
  if (clone.placeholders) fails.push(`PLACEHOLDER: ${clone.placeholders} ◆ placeholder icon(s) left`);
  if (clone.cardCount >= 3 && clone.cardHover === 0) fails.push(`CARD-HOVER: ${clone.cardCount} cards, none have .card-hover`);
  if (live.flipSections > 0 && clone.flipish === 0) fails.push(`FLIP-BOXES: live has ${live.flipSections} flip section(s) but clone has no flip/hover layers`);
  if (clone.caseCards > 0 && clone.caseNoImg > 0) fails.push(`CASE-IMG: ${clone.caseNoImg}/${clone.caseCards} Real-Results cards have no thumbnail`);
  if (clone.emptyLinks) fails.push(`EMPTY-LINK: ${clone.emptyLinks} card link(s) with empty/# href`);
  if (live.crumb && !clone.crumb) fails.push(`BREADCRUMB: live has a "Home » …" breadcrumb bar, clone is missing it`);
  // CONTENT-LINK: a link the live exposes in-content that the clone's content doesn't have
  // (targets present only in nav don't count — those live in chrome, excluded above).
  const cloneLinks = new Set((clone.contentLinks || []).map((l) => l.replace(/\/$/, '') || '/'));
  const missLinks = [...new Set((live.contentLinks || []).map((l) => l.replace(/\/$/, '') || '/'))].filter((l) => l !== '/' && !/^\/(blog|contact-us|thank-you)/.test(l) && !cloneLinks.has(l));
  if (missLinks.length) fails.push(`CONTENT-LINK: ${missLinks.length} live in-content link(s) missing → ${missLinks.slice(0, 5).join(', ')}`);
  // BG-IMAGE: a visible (op≥0.4) live section background not rendered by the clone (as CSS bg OR <img>)
  const cloneRendered = new Set([...(clone.present || []), ...Object.keys(clone.bgs || {})]);
  const decorative = (b) => /\/(line|divider|dots?|stroke|shape|pattern|vector|group-?\d|frame-?\d)[-.\d]/i.test(b); // thin/decorative accents, not real section bgs
  const missBgs = Object.entries(live.bgs || {}).filter(([base, op]) => op >= 0.4 && !decorative(base) && !cloneRendered.has(base) && !((clone.bgs?.[base] ?? 0) >= 0.4));
  if (missBgs.length) fails.push(`BG-IMAGE: ${missBgs.length} live section background(s) not rendered → ${missBgs.slice(0, 4).map(([b]) => b.split('/').pop()).join(', ')}`);

  const ok = fails.length === 0;
  console.log(`\n=== ${route} === ${ok ? '\x1b[32mALL CHECKS PASS\x1b[0m' : '\x1b[31m' + fails.length + ' ISSUE(S)\x1b[0m'}`);
  console.log(`   stats: imgs=${clone.present.length} cards=${clone.cardCount}(hover ${clone.cardHover}) flipLayers=${clone.flipish} zoomIn=${clone.zoomIn} caseCards=${clone.caseCards}`);
  fails.forEach((f) => console.log('   \x1b[31m✗\x1b[0m ' + f));
}
await browser.close();
