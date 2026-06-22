import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto('http://localhost:3000/ai-scenario-library/finance/', { waitUntil: 'load', timeout: 75000 });
await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
await p.waitForTimeout(2500);
// find the "TRUSTED BY" heading offset and capture 1600px below it
const y = await p.evaluate(() => {
  const el = [...document.querySelectorAll('*')].find(h => h.children.length===0 && h.textContent.replace(/\s+/g,' ').trim().toLowerCase()==='trusted by organizations around the globe');
  return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null;
});
console.log('trustY', y);
await p.evaluate((yy)=>scrollTo(0, yy-40), y);
await p.waitForTimeout(500);
await p.screenshot({ path:'verify/_c_trust1.png', clip:{x:0,y:0,width:1440,height:900} });
await p.evaluate((yy)=>scrollTo(0, yy+860), y);
await p.waitForTimeout(500);
await p.screenshot({ path:'verify/_c_trust2.png', clip:{x:0,y:0,width:1440,height:900} });
await b.close();
console.log('done');
