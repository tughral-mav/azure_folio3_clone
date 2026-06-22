import { chromium } from 'playwright';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: UA });
await p.goto('https://azure.folio3.com/ai-scenario-library/finance/', { waitUntil: 'load', timeout: 75000 });
await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
await p.waitForTimeout(2500);
// Find the "Achieve" heading and "Real Results" heading absolute Y
const info = await p.evaluate(() => {
  const find = (t) => { const el = [...document.querySelectorAll('h1,h2,h3,.elementor-heading-title')].find(h => h.textContent.replace(/\s+/g,' ').trim().toLowerCase().includes(t)); return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null; };
  return { achieve: find('achieve'), real: find('real results'), eliminate: find('eliminate vulnerability'), book: find('book your') };
});
console.log(JSON.stringify(info));
// capture from achieve to real results
if (info.achieve != null) {
  const start = info.achieve - 60;
  const end = (info.real != null ? info.real + 120 : start + 1200);
  await p.evaluate((y)=>scrollTo(0,y), start);
  await p.waitForTimeout(500);
  const h = Math.min(end - start, 1500);
  await p.screenshot({ path: 'verify/_fl_mid.png', clip: { x:0, y:0, width:1440, height: h } });
  console.log('mid h', h);
}
await b.close();
console.log('done');
