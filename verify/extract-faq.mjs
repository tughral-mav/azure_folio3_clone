import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';
const LIVE='https://azure.folio3.com', UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT='d:/AzureClone/clone-kit/faq-full.json';
const slugOf=(r)=>(r.replace(/^\/|\/$/g,'')||'home').replace(/[^a-z0-9]+/gi,'_');
const map=existsSync(OUT)?JSON.parse(readFileSync(OUT,'utf8')):{};
const b=await chromium.launch();const ctx=await b.newContext({userAgent:UA,viewport:{width:1440,height:1000}});
let n=0;
for(const route of DESIGN_PAGES){
  const p=await ctx.newPage();
  try{
    const code=(await p.goto(LIVE+route,{waitUntil:'load',timeout:80000}))?.status();if(code>=400){await p.close();continue;}
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},22);});});
    await p.waitForTimeout(500);
    const res=await p.evaluate(()=>{
      const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      let items=[];
      // elementor accordion / toggle
      document.querySelectorAll('.elementor-accordion-item,.elementor-toggle-item').forEach(it=>{
        const q=txt(it.querySelector('.elementor-accordion-title,.elementor-toggle-title'));
        const a=txt(it.querySelector('.elementor-tab-content'));
        if(q&&a&&q.length<160)items.push({q,a});
      });
      // nested-accordion (e-n-accordion / details)
      if(!items.length)document.querySelectorAll('.e-n-accordion-item,details').forEach(it=>{
        const q=txt(it.querySelector('summary,.e-n-accordion-item-title'));
        const a=txt(it).replace(q,'').trim();
        if(q&&a&&q.length<160)items.push({q,a:a.slice(0,600)});
      });
      // find the section heading
      const acc=document.querySelector('.elementor-accordion,.elementor-toggle,.e-n-accordion');
      const sec=acc?.closest('.elementor-top-section');
      const heading=txt(sec?.querySelector('h2,.elementor-heading-title'));
      const seen=new Set();items=items.filter(x=>{if(seen.has(x.q))return false;seen.add(x.q);return true;});
      return {heading:heading.slice(0,60), items};
    });
    if(res.items.length>=2){map[slugOf(route)]=res;writeFileSync(OUT,JSON.stringify(map,null,0));n++;}
  }catch{}
  await p.close();
}
await b.close();console.log('faq-full for '+n+' pages → '+OUT);
