import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function grab(url, tag){
  const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
  await p.goto(url,{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},30);});});
  await p.waitForTimeout(1500); await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(400);
  await p.screenshot({path:`verify/construction-${tag}.png`, fullPage:true});
  // section structure: each top-level section's main heading + layout hints
  const secs=await p.evaluate(()=>{
    const root=document.querySelector('main')||document.body;
    const out=[];
    const isSec=(el)=>el.matches('section,.elementor-section,.e-con,.elementor-top-section');
    const walk=(el)=>{ for(const c of el.children){ if(isSec(c)){ const h=c.querySelector('h1,h2,h3,h4'); const imgs=c.querySelectorAll('img').length; const cards=c.querySelectorAll('[class*="flip-box"],[class*="icon-box"],[class*="card"],.elementor-column').length; out.push({h:(h?.textContent||'').replace(/\s+/g,' ').trim().slice(0,55), tag:h?.tagName||'', imgs, cards}); } else walk(c);} };
    walk(root);
    return out.filter(s=>s.h||s.imgs>0);
  });
  await p.close(); return secs;
}
const live=await grab('https://azure.folio3.com/azure-for-construction/','live');
const clone=await grab('http://localhost:3000/azure-for-construction/','clone');
console.log('=== LIVE sections ==='); live.forEach((s,i)=>console.log(`${i} [${s.tag}] ${s.h} | imgs:${s.imgs} cards:${s.cards}`));
console.log('\n=== CLONE sections ==='); clone.forEach((s,i)=>console.log(`${i} [${s.tag}] ${s.h} | imgs:${s.imgs} cards:${s.cards}`));
await b.close();
