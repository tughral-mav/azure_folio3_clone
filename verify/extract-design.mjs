/**
 * Analyst step: extract the live page's exact design tokens per section — colours, type,
 * spacing, eyebrow labels, inline SVG icons (with the card they belong to), button + hover,
 * and Elementor animation specs. Output → verify/_analysis/<slug>.design.json
 * Usage: node verify/extract-design.mjs /petrochemical-producer-edms-compliance-agent/
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const route = process.argv[2];
const slug = (route.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
const OUT = path.resolve('verify/_analysis');
mkdirSync(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';

const b = await chromium.launch();
const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 1100 } });
await p.goto('https://azure.folio3.com' + route, { waitUntil: 'load', timeout: 90000 });
for (let i = 0; i < 2; i++) { await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 500); y += 500; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 50); }); }); await p.waitForTimeout(600); }
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);

// hover the first button to read its hover background
let btnHoverBg = null;
try { const btn = await p.$('.elementor-button'); if (btn) { await btn.hover(); await p.waitForTimeout(200); btnHoverBg = await btn.evaluate((e) => getComputedStyle(e).backgroundColor); } } catch {}
await p.evaluate(() => scrollTo(0, 0));

const design = await p.evaluate(() => {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const cs = (el, props) => { const c = getComputedStyle(el); const o = {}; for (const k of props) o[k] = c[k]; return o; };
  const TYPE = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'textAlign', 'textTransform'];
  const BOX = ['backgroundColor', 'backgroundImage', 'paddingTop', 'paddingBottom', 'borderRadius', 'boxShadow', 'borderColor', 'borderWidth'];

  // brand tokens from :root / body
  const bodyC = getComputedStyle(document.body);
  const tokens = { bodyFont: bodyC.fontFamily, bodyColor: bodyC.color, bodyBg: bodyC.backgroundColor };

  const tops = [...document.querySelectorAll('.elementor-top-section, .e-con.e-parent')];
  const outer = tops.filter((s) => !tops.some((o) => o !== s && o.contains(s)));
  const sections = outer.map((sec, idx) => {
    const firstH = sec.querySelector('h1,h2,h3');
    const heading = firstH ? clean(firstH.textContent) : `(section ${idx})`;
    // eyebrow: a short, uppercase, coloured label near the top (span/div/p with letter-spacing)
    const eyebrow = [...sec.querySelectorAll('span,p,div')].map((e) => {
      const t = clean(e.textContent); const c = getComputedStyle(e);
      if (t && t.length < 40 && e.children.length === 0 && (c.textTransform === 'uppercase' || /[A-Z]{3,}/.test(t)) && parseFloat(c.letterSpacing) > 0.3) return { text: t, color: c.color, size: c.fontSize, ls: c.letterSpacing };
      return null;
    }).find(Boolean) || null;
    const headings = [...sec.querySelectorAll('h1,h2,h3,h4,h5')].slice(0, 8).map((h) => ({ tag: h.tagName.toLowerCase(), text: clean(h.textContent).slice(0, 50), ...cs(h, TYPE) }));
    const firstP = sec.querySelector('p');
    const para = firstP ? cs(firstP, ['fontSize', 'lineHeight', 'color']) : null;
    const btn = sec.querySelector('.elementor-button, a.elementor-button');
    const button = btn ? { text: clean(btn.textContent), ...cs(btn, ['backgroundColor', 'color', 'paddingTop', 'paddingLeft', 'borderRadius', 'fontSize', 'fontWeight', 'textTransform', 'letterSpacing']) } : null;
    // repeated card container: a child with border-radius + (shadow or bg different from section)
    const cardEl = [...sec.querySelectorAll('div,article')].find((d) => { const c = getComputedStyle(d); return parseFloat(c.borderRadius) >= 6 && (c.boxShadow !== 'none' || c.backgroundColor !== 'rgba(0, 0, 0, 0)') && d.querySelector('h3,h4'); });
    const card = cardEl ? cs(cardEl, BOX) : null;
    // inline SVG icons in this section, each mapped to its nearest heading
    const icons = [...sec.querySelectorAll('svg')].slice(0, 20).map((svg) => {
      let host = svg.closest('[class*="icon"],figure,.elementor-widget,div');
      // nearest following/containing heading text
      let title = '';
      let scope = svg.closest('.elementor-widget, .e-con, li, article, div');
      for (let up = 0; up < 4 && scope && !title; up++) { const h = scope.querySelector('h3,h4,h5'); if (h) title = clean(h.textContent); scope = scope.parentElement; }
      const box = svg.getBoundingClientRect();
      return { title: title.slice(0, 50), w: Math.round(box.width), h: Math.round(box.height), svg: svg.outerHTML.slice(0, 2000) };
    }).filter((i) => i.svg.length > 40);
    // animation on this section's animated elements
    const anim = [...sec.querySelectorAll('[data-settings]')].map((e) => { try { const s = JSON.parse(e.getAttribute('data-settings')); const a = s._animation || s.animation; if (!a || a === 'none') return null; const c = getComputedStyle(e); return { anim: a, delay: s._animation_delay ?? null, duration: c.animationDuration, timing: c.animationTimingFunction }; } catch { return null; } }).filter(Boolean);
    return { idx, heading: heading.slice(0, 60), box: cs(sec, ['backgroundColor', 'backgroundImage', 'paddingTop', 'paddingBottom']), eyebrow, headings, para, button, card, iconCount: icons.length, icons, anim };
  });
  return { tokens, sections };
});

await b.close();
design.btnHoverBg = btnHoverBg;
writeFileSync(path.join(OUT, `${slug}.design.json`), JSON.stringify(design, null, 2));
const totalIcons = design.sections.reduce((n, s) => n + s.iconCount, 0);
console.log(`sections=${design.sections.length} inlineSVGicons=${totalIcons} btnHoverBg=${btnHoverBg}`);
design.sections.forEach((s) => console.log(`  [${s.idx}] "${s.heading}" bg=${s.box.backgroundColor} icons=${s.iconCount} anim=${s.anim.map((a) => a.anim + '/' + a.duration).join(',')}`));
