import { chromium } from 'playwright';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: UA });
await p.goto('https://azure.folio3.com/ai-scenario-library/finance/', { waitUntil: 'load', timeout: 75000 });
await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
await p.waitForTimeout(2500);
const want = ['Achieve','Real Results','Eliminate','Trusted by'];
const boxes = await p.evaluate((want) => {
  const out = [];
  for (const w of want) {
    const el = [...document.querySelectorAll('h1,h2,h3,.elementor-heading-title')].find(h => h.textContent.replace(/\s+/g,' ').trim().toLowerCase().includes(w.toLowerCase()));
    if (!el) { out.push({w, missing:true}); continue; }
    // climb to the inner-section / container
    let cur = el;
    while (cur.parentElement && cur.parentElement.getBoundingClientRect().height < 1100 && cur.parentElement.tagName!=='BODY') cur = cur.parentElement;
    const r = cur.getBoundingClientRect();
    out.push({ w, top: Math.round(r.top + window.scrollY), height: Math.round(r.height) });
  }
  return out;
}, want);
let i=0;
for (const bx of boxes) {
  if (bx.missing){ console.log('live MISSING heading match:', bx.w); i++; continue; }
  await p.evaluate((y)=>scrollTo(0,y), bx.top - 10);
  await p.waitForTimeout(400);
  try { await p.screenshot({ path: `verify/_fl_${i}.png`, clip: { x:0, y: 0, width: 1440, height: Math.min(bx.height+20, 1300) } }); } catch(e){ console.log('err',e.message); }
  console.log('live', i, bx.w, 'h='+bx.height);
  i++;
}
await b.close();
console.log('done');
