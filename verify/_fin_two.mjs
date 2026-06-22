import { chromium } from 'playwright';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const route='/ai-scenario-library/finance/';
const b = await chromium.launch();
async function grab(url,isLive,tag){
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: isLive?UA:undefined });
  await p.goto(url, { waitUntil: 'load', timeout: 75000 });
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
  await p.waitForTimeout(3000);
  for (const [key, phrase] of [['elim','eliminate vulnerability'],['real','real results']]) {
    // re-find immediately before screenshot
    const found = await p.evaluate((phrase) => {
      // pick the LAST matching heading (avoid hero subtext)
      const els=[...document.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].filter(h=>h.textContent.replace(/\s+/g,' ').trim().toLowerCase().includes(phrase));
      const el = els[els.length-1];
      if(!el) return false;
      el.scrollIntoView({block:'start'});
      window.scrollBy(0,-110);
      return true;
    }, phrase);
    if(!found){ console.log(tag,key,'NF'); continue; }
    await p.waitForTimeout(600);
    await p.screenshot({ path:`verify/_two_${tag}_${key}.png`, clip:{x:0,y:0,width:1440,height:820} });
    console.log(tag,key,'ok');
  }
  await p.close();
}
await grab('https://azure.folio3.com'+route,true,'L');
await grab('http://localhost:3000'+route,false,'C');
await b.close();
console.log('done');
