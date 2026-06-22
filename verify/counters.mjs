import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function grab(route){
  const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
  await p.goto('https://azure.folio3.com'+route,{waitUntil:'load',timeout:90000});
  // slow scroll fully so all counters trigger
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},40);});});
  await p.waitForTimeout(3000); // let counters finish animating
  const counters=await p.evaluate(()=>{
    const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
    return [...document.querySelectorAll('.elementor-counter, [class*="counter"]')].map(c=>{
      const num=txt(c.querySelector('.elementor-counter-number'));
      const title=txt(c.querySelector('.elementor-counter-title'));
      const pre=c.querySelector('.elementor-counter-number-prefix')?.textContent?.trim()||'';
      const suf=c.querySelector('.elementor-counter-number-suffix')?.textContent?.trim()||'';
      return num?{num,pre,suf,title}:null;
    }).filter(Boolean);
  });
  await p.close(); return counters;
}
for(const r of ['/azure-for-construction/','/azure-for-manufacturing/','/azure-data-analytics/','/microsoft-fabric-services/']){
  const c=await grab(r);
  console.log('### '+r+' ('+c.length+' counters) ###');
  c.forEach(x=>console.log(`  ${x.pre}${x.num}${x.suf}  "${x.title}"`));
}
await b.close();
