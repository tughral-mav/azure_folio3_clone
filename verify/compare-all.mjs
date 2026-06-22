import { chromium } from 'playwright';
import { DESIGN_PAGES } from './routes.mjs';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function snap(page,url){
  await page.goto(url,{waitUntil:'load',timeout:80000});
  await page.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},22);});});
  await page.waitForTimeout(900);
  return await page.evaluate(()=>{
    const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
    const main=document.querySelector('main')||document.body;
    const h2s=[...main.querySelectorAll('h2')].map(h=>txt(h).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()).filter(t=>t.length>4 && !/office|rights reserved|privacy/.test(t));
    const imgs=[...main.querySelectorAll('img')].filter(i=>i.offsetParent!==null && i.naturalWidth>30).length;
    const counters=main.querySelectorAll('.elementor-counter-number, [data-counter], .text-3xl, .text-4xl').length;
    return {h2s:[...new Set(h2s)], imgs};
  });
}
const ctxL=await b.newContext({userAgent:UA,viewport:{width:1440,height:1000}});
const ctxC=await b.newContext({viewport:{width:1440,height:1000}});
const pL=await ctxL.newPage(), pC=await ctxC.newPage();
const rows=[];
for(const route of DESIGN_PAGES){
  try{
    const code=(await pL.goto('https://azure.folio3.com'+route,{waitUntil:'load',timeout:60000}))?.status();
    if(code>=400) continue;
    const live=await snap(pL,'https://azure.folio3.com'+route);
    const clone=await snap(pC,'http://localhost:3000'+route);
    const missing=live.h2s.filter(h=>!clone.h2s.some(c=>c.includes(h)||h.includes(c)));
    rows.push({route, liveH2:live.h2s.length, cloneH2:clone.h2s.length, missingH2:missing, liveImg:live.imgs, cloneImg:clone.imgs});
  }catch(e){rows.push({route,err:e.message.slice(0,30)});}
}
await b.close();
rows.sort((a,b)=>(b.missingH2?.length||0)-(a.missingH2?.length||0));
for(const r of rows){
  if(r.err){console.log(`ERR ${r.route} ${r.err}`);continue;}
  const flag=r.missingH2.length>0||r.cloneImg<r.liveImg-3?'⚠ ':'  ';
  console.log(`${flag}${r.route} | H2 live=${r.liveH2} clone=${r.cloneH2} | img live=${r.liveImg} clone=${r.cloneImg}${r.missingH2.length?'\n      missing H2: '+r.missingH2.slice(0,5).join(' / '):''}`);
}
