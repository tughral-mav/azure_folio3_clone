/**
 * Diagnostic: dump the exact structure of the counters, tabs, and FAQ widgets, plus the
 * per-section Elementor animation settings (name/duration/delay) and button hover colors,
 * so the sidecar JSON + motion can be reproduced faithfully.
 * Usage: node verify/inspect-widgets.mjs /petrochemical-producer-edms-compliance-agent/
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
for (let pass = 0; pass < 2; pass++) { await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 400); y += 400; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 60); }); }); await p.waitForTimeout(700); }
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(400);

const dump = await p.evaluate(() => {
  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const sectionHeadingOf = (el) => {
    let s = el.closest('.elementor-top-section, .e-con.e-parent'); if (!s) return '';
    const h = s.querySelector('h1,h2,h3'); return h ? clean(h.textContent) : '';
  };
  // ---- COUNTERS ----
  const counters = [...document.querySelectorAll('.elementor-counter')].map((c) => {
    const num = c.querySelector('.elementor-counter-number');
    const titleEl = c.querySelector('.elementor-counter-title');
    return {
      from: num?.getAttribute('data-from-value') ?? null,
      to: num?.getAttribute('data-to-value') ?? null,
      duration: num?.getAttribute('data-duration') ?? null,
      prefix: clean(c.querySelector('.elementor-counter-number-prefix')?.textContent),
      suffix: clean(c.querySelector('.elementor-counter-number-suffix')?.textContent),
      numText: clean(num?.textContent),
      title: clean(titleEl?.textContent),
      section: sectionHeadingOf(c),
    };
  });
  // ---- TABS (classic .elementor-tabs and nested .e-n-tabs) ----
  const tabsWidgets = [];
  document.querySelectorAll('.elementor-tabs').forEach((w) => {
    const titles = [...w.querySelectorAll('.elementor-tab-title')].map((t) => clean(t.textContent));
    const panels = [...w.querySelectorAll('.elementor-tab-content')].map((pan) => ({
      heading: clean(pan.querySelector('h1,h2,h3,h4')?.textContent),
      items: [...pan.querySelectorAll('h3,h4,h5')].map((h) => ({ title: clean(h.textContent) })),
      paras: [...pan.querySelectorAll('p')].map((x) => clean(x.textContent)).filter(Boolean),
      imgs: [...pan.querySelectorAll('img')].map((im) => im.currentSrc || im.src),
      html: pan.innerHTML.slice(0, 400),
    }));
    tabsWidgets.push({ type: 'classic', titles, panels, section: sectionHeadingOf(w) });
  });
  document.querySelectorAll('.e-n-tabs').forEach((w) => {
    const titles = [...w.querySelectorAll('.e-n-tab-title, [role=tab]')].map((t) => clean(t.textContent));
    const panels = [...w.querySelectorAll('.e-n-tabs-content > .e-con, [role=tabpanel]')].map((pan) => ({
      heading: clean(pan.querySelector('h1,h2,h3,h4')?.textContent),
      items: [...pan.querySelectorAll('h3,h4,h5')].map((h) => ({ title: clean(h.textContent) })),
      paras: [...pan.querySelectorAll('p')].map((x) => clean(x.textContent)).filter(Boolean),
      imgs: [...pan.querySelectorAll('img')].map((im) => im.currentSrc || im.src),
    }));
    tabsWidgets.push({ type: 'nested', titles, panels, section: sectionHeadingOf(w) });
  });
  // ---- FAQ (accordion / toggle, classic + nested) ----
  const faqs = [];
  document.querySelectorAll('.elementor-accordion').forEach((w) => {
    const items = [...w.querySelectorAll('.elementor-accordion-item')].map((it) => ({
      q: clean(it.querySelector('.elementor-tab-title')?.textContent),
      a: clean(it.querySelector('.elementor-tab-content')?.textContent),
    }));
    faqs.push({ type: 'classic', section: sectionHeadingOf(w), items });
  });
  document.querySelectorAll('.e-n-accordion').forEach((w) => {
    const items = [...w.querySelectorAll('details, .e-n-accordion-item')].map((it) => ({
      q: clean(it.querySelector('summary, .e-n-accordion-item-title')?.textContent),
      a: clean(it.querySelector('.e-con, .e-n-accordion-item-content')?.textContent),
    }));
    faqs.push({ type: 'nested', section: sectionHeadingOf(w), items });
  });
  // ---- ANIMATIONS per top section ----
  const anims = [...document.querySelectorAll('.elementor-top-section, .e-con.e-parent')].map((s) => {
    const h = s.querySelector('h1,h2,h3'); const secName = h ? clean(h.textContent) : '(no heading)';
    const animated = [...s.querySelectorAll('[data-settings]')].map((el) => {
      try { const st = JSON.parse(el.getAttribute('data-settings')); const a = st._animation || st.animation; if (!a || a === 'none') return null; return { anim: a, delay: st._animation_delay ?? st.animation_delay ?? null, cls: (el.className || '').toString().split(' ').filter((c) => /^elementor-element-[a-z0-9]+$/.test(c))[0] || '' }; } catch { return null; }
    }).filter(Boolean);
    return { section: secName, animated };
  }).filter((s) => s.animated.length);
  // ---- BUTTON hover (read elementor kit button hover color from computed + a synthetic hover) ----
  const btn = document.querySelector('.elementor-button');
  let btnHover = null;
  if (btn) {
    const cs = getComputedStyle(btn);
    btnHover = { normalBg: cs.backgroundColor, color: cs.color, transition: cs.transitionDuration + ' ' + cs.transitionProperty, borderRadius: cs.borderRadius };
  }
  // Elementor global animation duration classes present
  const animDur = [...document.querySelectorAll('[class*="animated-"]')].map((e) => [...e.classList].find((c) => c.startsWith('animated-'))).filter(Boolean);
  return { counters, tabsWidgets, faqs, anims, btnHover, animDurations: [...new Set(animDur)] };
});

await b.close();
writeFileSync(path.join(OUT, `${slug}.widgets.json`), JSON.stringify(dump, null, 2));
console.log(`COUNTERS=${dump.counters.length} TABS=${dump.tabsWidgets.length} FAQ=${dump.faqs.length} ANIM_SECTIONS=${dump.anims.length}`);
console.log('counter values:', dump.counters.map((c) => `${c.prefix}${c.from}->${c.to}${c.suffix}|${c.title.slice(0,30)}`).join(' ; '));
if (dump.tabsWidgets[0]) console.log('tab titles:', JSON.stringify(dump.tabsWidgets.map((t) => t.titles)));
console.log('faq items:', dump.faqs.map((f) => f.items.length));
console.log('btnHover:', JSON.stringify(dump.btnHover));
console.log('animDurations:', JSON.stringify(dump.animDurations));
