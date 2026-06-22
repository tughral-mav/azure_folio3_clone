import { chromium } from 'playwright';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const route='/ai-scenario-library/finance/';
const b = await chromium.launch();
async function grab(url,isLive,tag){
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 }, userAgent: isLive?UA:undefined });
  await p.goto(url, { waitUntil: 'load', timeout: 75000 });
  await p.evaluate(async () => { await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 600); y += 600; if (y > document.body.scrollHeight + 800) { clearInterval(t); r(); } }, 30); }); });
  await p.waitForTimeout(2500);
  const y = await p.evaluate(()=>{ const el=[...document.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].find(h=>{const t=h.textContent.replace(/\s+/g,' ').trim().toLowerCase(); return t==='achieve these with copilot';}); return el?Math.round(el.getBoundingClientRect().top+window.scrollY):null; });
  console.log(tag,'achieveY',y);
  if(y!=null){ await p.evaluate(yy=>scrollTo(0,yy-100), y); await p.waitForTimeout(500); await p.screenshot({path:`verify/_ach_${tag}.png`, clip:{x:0,y:0,width:1440,height:700}}); }
  await p.close();
}
await grab('https://azure.folio3.com'+route,true,'L');
await grab('http://localhost:3000'+route,false,'C');
await b.close();
console.log('done');
