import { chromium } from 'playwright';
const route = '/ai-scenario-library/finance/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b = await chromium.launch();
async function bands(url, isLive, tag) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: isLive ? UA : undefined });
  await p.goto(url, { waitUntil: 'load', timeout: 75000 });
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
  await p.waitForTimeout(2500);
  // capture each top-level section separately
  const boxes = await p.evaluate(() => {
    const tops = [...document.querySelectorAll('.elementor-top-section')];
    return tops.map((s,i) => { const r = s.getBoundingClientRect(); const sy = window.scrollY; return { i, top: Math.round(r.top+sy), height: Math.round(r.height), head: (s.querySelector('h1,h2,h3,.elementor-heading-title')?.textContent||'').replace(/\s+/g,' ').trim().slice(0,40) }; });
  });
  for (const bx of boxes) {
    if (bx.height < 20) continue;
    await p.evaluate((y)=>scrollTo(0,y), bx.top);
    await p.waitForTimeout(300);
    try { await p.screenshot({ path: `verify/_fb_${tag}_${bx.i}.png`, clip: { x:0, y: 0, width: 1440, height: Math.min(bx.height, 1600) }, fullPage:false }); } catch(e){}
    console.log(tag, bx.i, JSON.stringify(bx.head), 'h='+bx.height);
  }
  await p.close();
}
await bands('https://azure.folio3.com' + route, true, 'L');
await bands('http://localhost:3000' + route, false, 'C');
await b.close();
console.log('done');
