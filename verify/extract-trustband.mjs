import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';
const LIVE='https://azure.folio3.com', UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT='d:/AzureClone/clone-kit/trust-band.json';
const slugOf=(r)=>(r.replace(/^\/|\/$/g,'')||'home').replace(/[^a-z0-9]+/gi,'_');
const map=existsSync(OUT)?JSON.parse(readFileSync(OUT,'utf8')):{};
const b=await chromium.launch();const ctx=await b.newContext({userAgent:UA,viewport:{width:1440,height:1000}});
let n=0;
for(const route of DESIGN_PAGES){
  const p=await ctx.newPage();
  try{
    const code=(await p.goto(LIVE+route,{waitUntil:'load',timeout:80000}))?.status();if(code>=400){await p.close();continue;}
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,350);y+=350;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},30);});});
    await p.evaluate(()=>scrollTo(0,Math.min(900,document.body.scrollHeight/3)));
    await p.waitForTimeout(2500);
    const res=await p.evaluate(()=>{
      const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const sec=[...document.querySelectorAll('.elementor-top-section')].find(s=>/trusted by/i.test(txt(s.querySelector('h2,h3,h4,.elementor-heading-title'))));
      if(!sec)return null;
      const heading=txt([...sec.querySelectorAll('h2,h3,h4,.elementor-heading-title')].find(h=>/trusted by/i.test(txt(h))));
      const logos=[...sec.querySelectorAll('img')].map(i=>(i.currentSrc||i.getAttribute('data-src')||i.src||'').replace(/^https?:\/\/[^/]+/,'').split('?')[0]).filter(s=>s.startsWith('/wp-content')&&!/svg%|\.svg$/.test(s));
      return {heading, logos:[...new Set(logos)]};
    });
    if(res&&res.logos.length>=2){map[slugOf(route)]=res;writeFileSync(OUT,JSON.stringify(map,null,0));n++;}
  }catch{}
  await p.close();
}
await b.close();console.log('trust-band for '+n+' pages → '+OUT);
