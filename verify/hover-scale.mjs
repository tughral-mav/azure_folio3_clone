import { chromium } from 'playwright';
const b = await chromium.launch();
for (const route of ['/azure-data-analytics/','/azure-cloud-service/','/microsoft-power-platform-services/']) {
  const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
  await p.goto('https://azure.folio3.com'+route, { waitUntil:'load', timeout:90000 });
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
  await p.waitForTimeout(600);
  const rules = await p.evaluate(()=>{
    const out=new Set();
    for(const sh of document.styleSheets){ let rs; try{rs=sh.cssRules;}catch{continue;}
      for(const r of rs||[]){ if(r.selectorText && /:hover/.test(r.selectorText)){ const ct=(r.style?.cssText||''); if(/scale|translate|rotate|border-color|border-width|border:|box-shadow/i.test(ct)){ const base=r.selectorText.replace(/:hover.*/,'').trim(); try{ if(base&&document.querySelector(base)) out.add(r.selectorText.slice(0,55)+' => '+ct.slice(0,70)); }catch{} } } } }
    return [...out].slice(0,12);
  });
  console.log('\n=== '+route+' (scale/border/shadow :hover rules present) ===');
  rules.forEach(x=>console.log('  '+x));
  await p.close();
}
await b.close();
