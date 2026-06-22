import { chromium } from 'playwright';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const route='/ai-scenario-library/finance/';
const b = await chromium.launch();
async function grab(url,isLive,tag){
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: isLive?UA:undefined });
  await p.goto(url, { waitUntil: 'load', timeout: 75000 });
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
  await p.waitForTimeout(3000);
  const H = await p.evaluate(()=>document.body.scrollHeight);
  console.log(tag,'H',H);
  // capture windows at fixed positions covering the lower 60% in 760px steps
  let idx=0;
  for(let y=Math.floor(H*0.30); y<H-200; y+=720){
    await p.evaluate(yy=>scrollTo(0,yy), y);
    await p.waitForTimeout(450);
    await p.screenshot({ path:`verify/_lw_${tag}_${idx}.png`, clip:{x:0,y:0,width:1440,height:760} });
    idx++;
  }
  await p.close();
}
await grab('https://azure.folio3.com'+route,true,'L');
await b.close();
console.log('done');
