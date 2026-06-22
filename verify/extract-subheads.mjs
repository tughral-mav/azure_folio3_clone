import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';
const LIVE='https://azure.folio3.com', UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT='d:/AzureClone/clone-kit/subheads.json';
const slugOf=(r)=>(r.replace(/^\/|\/$/g,'')||'home').replace(/[^a-z0-9]+/gi,'_');
const map=existsSync(OUT)?JSON.parse(readFileSync(OUT,'utf8')):{};
const b=await chromium.launch();const ctx=await b.newContext({userAgent:UA,viewport:{width:1440,height:1000}});
let n=0;
for(const route of DESIGN_PAGES){
  const p=await ctx.newPage();
  try{
    const code=(await p.goto(LIVE+route,{waitUntil:'load',timeout:80000}))?.status();if(code>=400){await p.close();continue;}
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
    await p.waitForTimeout(400);
    const pairs=await p.evaluate(()=>{
      const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const out=[];
      for(const sec of document.querySelectorAll('.elementor-top-section')){
        if(sec.querySelector('.elementor-widget-n-tabs')) continue; // n-tabs handled by tab-intro
        const heads=[...sec.querySelectorAll('.elementor-heading-title')];
        if(heads.length<2) continue;
        // the captured "h2" = the first heading whose closest h-tag is H1-H6; the sub = a heading-title
        // whose own element is a SPAN/DIV (not H1-H6) and isn't the h2.
        const h2el=heads.find(h=>/^H[1-6]$/.test((h.tagName)) || /^H[1-6]$/.test(h.parentElement?.tagName||''));
        const subEl=heads.find(h=>!/^H[1-6]$/.test(h.tagName) && !/^H[1-6]$/.test(h.parentElement?.tagName||'') && txt(h).length>8 && txt(h).length<70 && h!==h2el);
        if(h2el && subEl && txt(h2el)!==txt(subEl)){
          out.push({h2:txt(h2el).slice(0,60), sub:txt(subEl).slice(0,70)});
        }
      }
      return out;
    });
    if(pairs.length){map[slugOf(route)]=pairs;writeFileSync(OUT,JSON.stringify(map,null,0));n++;}
  }catch{}
  await p.close();
}
await b.close();console.log('subheads for '+n+' pages → '+OUT);
