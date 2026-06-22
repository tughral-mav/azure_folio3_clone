import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto('http://localhost:3000/ai-scenario-library/finance/', { waitUntil: 'load', timeout: 75000 });
await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
await p.waitForTimeout(2500);
const boxes = await p.evaluate(() => {
  const secs = [...document.querySelectorAll('section, [class*="section"]')];
  // find sections by heading text
  const want = ['Comprehensive Finance Use Cases','70% Of The Fortune','Achieve these','Eliminate Vulnerability','Real Results','Awards','Trusted by'];
  const out = [];
  for (const w of want) {
    const el = [...document.querySelectorAll('h1,h2,h3')].find(h => h.textContent.replace(/\s+/g,' ').trim().toLowerCase().includes(w.toLowerCase()));
    if (el) {
      let sec = el.closest('section') || el.parentElement;
      // climb to a reasonably large ancestor
      let cur = el;
      while (cur.parentElement && cur.parentElement.getBoundingClientRect().height < 1400 && cur.parentElement.tagName!=='BODY') cur = cur.parentElement;
      const r = cur.getBoundingClientRect();
      out.push({ w, top: Math.round(r.top + window.scrollY), height: Math.round(r.height) });
    } else out.push({ w, missing: true });
  }
  return out;
});
let i=0;
for (const bx of boxes) {
  if (bx.missing) { console.log('MISSING on clone:', bx.w); i++; continue; }
  await p.evaluate((y)=>scrollTo(0,y), bx.top - 10);
  await p.waitForTimeout(300);
  try { await p.screenshot({ path: `verify/_fc_${i}.png`, clip: { x:0, y: 0, width: 1440, height: Math.min(bx.height+20, 1500) } }); } catch(e){ console.log('err',bx.w,e.message); }
  console.log(i, bx.w, 'h='+bx.height);
  i++;
}
await b.close();
console.log('done');
