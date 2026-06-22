import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function grab(route){
  const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
  await p.goto('https://azure.folio3.com'+route,{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},30);});});
  await p.waitForTimeout(800);
  return await p.evaluate(()=>{
    const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
    const seen=new Set();
    return [...document.querySelectorAll('.elementor-counter-number')].map(n=>{
      const c=n.closest('.elementor-counter');
      const to=n.getAttribute('data-to-value')||'';
      const pre=txt(c?.querySelector('.elementor-counter-number-prefix'));
      const suf=txt(c?.querySelector('.elementor-counter-number-suffix'));
      const title=txt(c?.querySelector('.elementor-counter-title'));
      // which section heading is this under?
      const sec=n.closest('.elementor-top-section');
      const secH=txt(sec?.querySelector('h2,h3,.elementor-heading-title'));
      const key=to+'|'+title+'|'+secH;
      if(seen.has(key))return null;seen.add(key);
      return {to,pre,suf,title,sec:secH.slice(0,30)};
    }).filter(Boolean);
  }).finally(()=>p.close());
}
for(const r of ['/azure-for-construction/','/azure-data-analytics/']){
  const c=await grab(r);
  console.log('### '+r+' ###');
  c.forEach(x=>console.log(`  ${x.pre}${x.to}${x.suf}  "${x.title}"  [section: ${x.sec}]`));
}
await b.close();
