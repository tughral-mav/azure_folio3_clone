import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';
const LIVE='https://azure.folio3.com', UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT='d:/AzureClone/clone-kit/tab-intro.json';
const slugOf=(r)=>(r.replace(/^\/|\/$/g,'')||'home').replace(/[^a-z0-9]+/gi,'_');
const map=existsSync(OUT)?JSON.parse(readFileSync(OUT,'utf8')):{};
const b=await chromium.launch();const ctx=await b.newContext({userAgent:UA,viewport:{width:1440,height:1000}});
let n=0;
for(const route of DESIGN_PAGES){
  const p=await ctx.newPage();
  try{
    const c=(await p.goto(LIVE+route,{waitUntil:'load',timeout:80000}))?.status(); if(c>=400){await p.close();continue;}
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},30);});});
    await p.waitForTimeout(500);
    const res=await p.evaluate(()=>{
      const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const tabsW=document.querySelector('.elementor-widget-n-tabs,[class*="e-n-tabs"]');
      if(!tabsW)return null;
      const sec=tabsW.closest('.elementor-top-section')||tabsW.closest('section');
      if(!sec)return null;
      // heading widgets that appear BEFORE the tabs widget, in document order
      const heads=[...sec.querySelectorAll('.elementor-heading-title')].filter(h=>{
        const pos=h.compareDocumentPosition(tabsW); return !!(pos&Node.DOCUMENT_POSITION_FOLLOWING); // h before tabsW
      }).map(h=>txt(h)).filter(t=>t&&t.length<80);
      return [...new Set(heads)];
    });
    if(res&&res.length){map[slugOf(route)]=res;writeFileSync(OUT,JSON.stringify(map,null,0));n++;}
  }catch{}
  await p.close();
}
await b.close();console.log('tab-intro headings for '+n+' pages → '+OUT);
