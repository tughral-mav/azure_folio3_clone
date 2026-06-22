import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';
const LIVE='https://azure.folio3.com', UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT='d:/AzureClone/clone-kit/tabs-content.json';
const slugOf=(r)=>(r.replace(/^\/|\/$/g,'')||'home').replace(/[^a-z0-9]+/gi,'_');
const map=existsSync(OUT)?JSON.parse(readFileSync(OUT,'utf8')):{};
const b=await chromium.launch();const ctx=await b.newContext({userAgent:UA,viewport:{width:1440,height:1000}});
let n=0;
for(const route of DESIGN_PAGES){
  const p=await ctx.newPage();
  try{
    const code=(await p.goto(LIVE+route,{waitUntil:'load',timeout:80000}))?.status();if(code>=400){await p.close();continue;}
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
    await p.waitForTimeout(700);
    const secs=await p.evaluate(()=>{
      const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const out=[];
      for(const w of document.querySelectorAll('.elementor-widget-n-tabs, .e-n-tabs')){
        const sec=w.closest('.elementor-top-section'); if(!sec)continue;
        const secHead=txt(sec.querySelector('h2'))||txt(sec.querySelector('.elementor-heading-title'));
        const labels=[...w.querySelectorAll('.e-n-tab-title, [role=tab]')].map(t=>txt(t)).filter(Boolean);
        const panels=[...w.querySelectorAll('.e-n-tabs-content > *, [role=tabpanel]')];
        const tabs=panels.map((pan,i)=>{
          const heading=txt(pan.querySelector('h2,h3,.elementor-heading-title'));
          const items=[...pan.querySelectorAll('.elementor-icon-box-wrapper,.elementor-icon-box-content')].map(ib=>({title:txt(ib.querySelector('.elementor-icon-box-title')),body:txt(ib.querySelector('.elementor-icon-box-description')),icon:(ib.parentElement?.querySelector('img')||ib.querySelector('img'))?.getAttribute('src')?.replace(/^https?:\/\/[^/]+/,'')||''})).filter(x=>x.title);
          const bodyP=txt(pan.querySelector('.elementor-widget-text-editor,p'));
          const img=(pan.querySelector('img')?.getAttribute('src')||'').replace(/^https?:\/\/[^/]+/,'');
          const cta=pan.querySelector('a.elementor-button,a[href]');
          return {label:labels[i]||heading||('Tab '+(i+1)), heading, body:bodyP.slice(0,300), items:items.slice(0,8), img:/\.(webp|png|jpe?g)$/i.test(img)?img:'', cta:cta?{text:txt(cta).slice(0,40),href:(cta.getAttribute('href')||'').replace(/^https?:\/\/[^/]+/,'')}:null};
        }).filter(t=>t.items.length||t.body||t.heading);
        if(tabs.length>=2) out.push({section:secHead.slice(0,55), tabs});
      }
      return out;
    });
    if(secs.length){map[slugOf(route)]=secs;writeFileSync(OUT,JSON.stringify(map,null,0));n++;}
  }catch{}
  await p.close();
}
await b.close();console.log('tabs-content for '+n+' pages → '+OUT);
