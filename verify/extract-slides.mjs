import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';
const LIVE='https://azure.folio3.com', UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT='d:/AzureClone/clone-kit/process-steps.json';
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
    const secs=await p.evaluate(()=>{
      const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const out=[];
      for(const w of document.querySelectorAll('.elementor-widget-slides')){
        const sec=w.closest('.elementor-top-section');
        const secHead=txt(sec?.querySelector('h2'))||txt(sec?.querySelector('.elementor-heading-title'));
        const slides=[...w.querySelectorAll('.swiper-slide')].map(s=>{
          const hEl=s.querySelector('.elementor-slide-heading');
          const raw=txt(hEl); // the icon is embedded as escaped <img> HTML text inside the heading
          const m=raw.match(/<img[^>]*src=["']([^"']+)["']/i);
          const icon=(m?m[1]:(hEl?.querySelector('img')?.getAttribute('src')||'')).replace(/^https?:\/\/[^/]+/,'');
          const title=raw.replace(/<img[^>]*>/gi,'').replace(/\s+/g,' ').trim();
          const desc=txt(s.querySelector('.elementor-slide-description'));
          return {icon, title, desc};
        }).filter(x=>x.title);
        // dedupe slides (swiper clones)
        const seen=new Set();const uniq=slides.filter(s=>{const k=s.title;if(seen.has(k))return false;seen.add(k);return true;});
        if(uniq.length>=2) out.push({section:secHead.slice(0,50), steps:uniq});
      }
      return out;
    });
    if(secs.length){map[slugOf(route)]=secs;writeFileSync(OUT,JSON.stringify(map,null,0));n++;}
  }catch{}
  await p.close();
}
await b.close();console.log('process-steps for '+n+' pages → '+OUT);
