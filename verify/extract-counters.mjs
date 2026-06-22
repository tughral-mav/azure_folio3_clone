import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';
const LIVE='https://azure.folio3.com', UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT='d:/AzureClone/clone-kit/counters.json';
const slugOf=(r)=>(r.replace(/^\/|\/$/g,'')||'home').replace(/[^a-z0-9]+/gi,'_');
const map=existsSync(OUT)?JSON.parse(readFileSync(OUT,'utf8')):{};
const b=await chromium.launch();const ctx=await b.newContext({userAgent:UA,viewport:{width:1440,height:1000}});
let n=0;
for(const route of DESIGN_PAGES){
  const p=await ctx.newPage();
  try{
    const code=(await p.goto(LIVE+route,{waitUntil:'load',timeout:80000}))?.status();if(code>=400){await p.close();continue;}
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},30);});});
    await p.waitForTimeout(500);
    const cs=await p.evaluate(()=>{
      const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const seen=new Set();const out=[];
      for(const nEl of document.querySelectorAll('.elementor-counter-number')){
        const c=nEl.closest('.elementor-counter');
        const to=nEl.getAttribute('data-to-value')||'';if(!to)continue;
        const pre=txt(c?.querySelector('.elementor-counter-number-prefix'));
        const suf=txt(c?.querySelector('.elementor-counter-number-suffix'));
        const title=txt(c?.querySelector('.elementor-counter-title'));
        const sec=nEl.closest('.elementor-top-section');
        const secH=txt(sec?.querySelector('h2,h3,.elementor-heading-title'));
        const key=to+'|'+title;if(seen.has(key))continue;seen.add(key);
        out.push({to,pre,suf,title,section:secH.slice(0,40)});
      }
      return out;
    });
    if(cs.length){map[slugOf(route)]=cs;writeFileSync(OUT,JSON.stringify(map,null,0));n++;}
  }catch{}
  await p.close();
}
await b.close();console.log('counters for '+n+' pages → '+OUT);
