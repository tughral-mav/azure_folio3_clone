/**
 * Deep section-by-section profiler for live vs clone home.
 * Captures per top-level section: heading, height, bg color, layout type
 * (slider/tabs/cards/form/flip-box), image count+samples, entrance animation,
 * and hover-capable elements. Writes both profiles for a full diff.
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

function profile() {
  const rel = (s) => (s || '').replace(location.origin, '').split('?')[0];
  const norm = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const top = [...document.querySelectorAll('section, .elementor-section.elementor-top-section, main > section')]
    .filter((s) => { const r = s.getBoundingClientRect(); return r.height > 70 && r.width > 600; });
  // de-nest: keep only outermost
  const outer = top.filter((s) => !top.some((o) => o !== s && o.contains(s)));
  return outer.map((s, i) => {
    const h = s.querySelector('h1, h2');
    const imgs = [...s.querySelectorAll('img')].map((im) => rel(im.currentSrc || im.src)).filter((x) => x && !x.startsWith('data:'));
    const cs = getComputedStyle(s);
    const cards = s.querySelectorAll('.elementor-icon-box-wrapper, .elementor-image-box-wrapper, [class*=card]').length;
    return {
      i,
      heading: norm(h?.textContent).slice(0, 50),
      subheads: [...new Set([...s.querySelectorAll('h3,h4')].map((x) => norm(x.textContent).slice(0, 30)))].slice(0, 8),
      height: Math.round(s.getBoundingClientRect().height),
      bg: cs.backgroundColor,
      bgImg: (cs.backgroundImage.match(/url\(["']?([^"')]+)/) || [])[1]?.replace(location.origin, '') || '',
      type: {
        slider: !!s.querySelector('.swiper, .slick-slider, .e-n-carousel, [class*=carousel]'),
        tabs: !!s.querySelector('[role=tab], .elementor-tab-title, [class*=tab]'),
        flipBox: !!s.querySelector('.elementor-flip-box, [class*=flip]'),
        form: !!s.querySelector('form, input, textarea'),
        accordion: !!s.querySelector('.elementor-accordion, details, [class*=accordion]'),
        counter: !!s.querySelector('.elementor-counter, [class*=counter]'),
        cards,
      },
      nImg: imgs.length,
      imgs: imgs.slice(0, 6),
    };
  });
}

(async () => {
  const b = await chromium.launch();
  for (const [name, url] of [['live', 'https://azure.folio3.com/'], ['clone', 'http://localhost:3000/']]) {
    const p = await b.newPage({ userAgent: UA, viewport: { width: 1440, height: 900 } });
    await p.goto(url, { waitUntil: 'load', timeout: 70000 });
    await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 700); y += 700; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 90); }); scrollTo(0, 0); });
    await p.waitForTimeout(1000);
    const data = await p.evaluate(profile);
    writeFileSync(`verify/_profile_${name}.json`, JSON.stringify(data, null, 2));
    console.log(`\n=== ${name.toUpperCase()} (${data.length} sections) ===`);
    data.forEach((s) => {
      const t = Object.entries(s.type).filter(([k, v]) => v && v !== 0).map(([k, v]) => k === 'cards' ? `cards:${v}` : k).join(',');
      console.log(`${String(s.i).padStart(2)} [${(s.heading || '(no heading)').padEnd(42)}] h=${String(s.height).padStart(4)} bg=${s.bg.replace('rgb','').replace(/[() ]/g,'')} ${t}`);
    });
    await p.close();
  }
  await b.close();
})();
