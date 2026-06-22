import { chromium } from 'playwright';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const route = '/ai-scenario-library/finance/';
const b = await chromium.launch();
async function grab(url, isLive, tag, headings) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: isLive ? UA : undefined });
  await p.goto(url, { waitUntil: 'load', timeout: 75000 });
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
  await p.waitForTimeout(2500);
  let i=0;
  for (const ht of headings) {
    const ok = await p.evaluate((ht) => {
      const el = [...document.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].find(h => h.textContent.replace(/\s+/g,' ').trim().toLowerCase().includes(ht));
      if (!el) return false;
      const sec = el.closest('section') || el.parentElement.parentElement || el;
      sec.scrollIntoView({block:'start'});
      window.scrollBy(0, -90);
      return true;
    }, ht);
    if (!ok){ console.log(tag, ht, 'NOT FOUND'); i++; continue; }
    await p.waitForTimeout(500);
    await p.screenshot({ path: `verify/_g_${tag}_${i}.png`, clip:{x:0,y:0,width:1440,height:760} });
    console.log(tag, i, ht, 'ok');
    i++;
  }
  await p.close();
}
const heads = ['achieve these', 'eliminate vulnerability', 'real results'];
await grab('https://azure.folio3.com'+route, true, 'L', heads);
await grab('http://localhost:3000'+route, false, 'C', heads);
await b.close();
console.log('done');
