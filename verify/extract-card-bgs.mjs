import { chromium } from 'playwright';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { DESIGN_PAGES } from './routes.mjs';
const LIVE='https://azure.folio3.com', UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const OUT='d:/AzureClone/clone-kit/card-bgs.json';
const slugOf=(r)=>(r.replace(/^\/|\/$/g,'')||'home').replace(/[^a-z0-9]+/gi,'_');
const norm=(t)=>(t||'').toLowerCase().replace(/&amp;|&/g,'and').replace(/[^a-z0-9]+/g,' ').trim();
const map=existsSync(OUT)?JSON.parse(readFileSync(OUT,'utf8')):{};
const b=await chromium.launch();const ctx=await b.newContext({userAgent:UA,viewport:{width:1440,height:1000}});
let n=0;
for(const route of DESIGN_PAGES){
  const p=await ctx.newPage();
  try{
    const code=(await p.goto(LIVE+route,{waitUntil:'load',timeout:80000}))?.status();if(code>=400){await p.close();continue;}
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
    await p.waitForTimeout(500);
    const pairs=await p.evaluate(()=>{
      const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const out={};
      document.querySelectorAll('*').forEach(e=>{
        const bg=getComputedStyle(e).backgroundImage;
        if(!bg||!bg.includes('wp-content'))return;
        const f=(bg.match(/https?:[^"')]+/)||[''])[0].replace(/^https?:\/\/[^/]+/,'').split('?')[0];
        if(!/\.(webp|png|jpe?g)$/i.test(f))return;
        // the card title = nearest heading inside the same card/column
        const card=e.closest('[class*="elementor-column"],[class*="box"],.elementor-widget-heading');
        const title=txt(card?.querySelector('h2,h3,h4,.elementor-heading-title'));
        if(title&&title.length>2&&title.length<50 && /header|banner|hero/i.test(f)===false) out[title]=f;
      });
      return out;
    });
    const m={};for(const[t,f]of Object.entries(pairs)){const k=norm(t);if(k.length>2)m[k]=f;}
    if(Object.keys(m).length){map[slugOf(route)]=m;writeFileSync(OUT,JSON.stringify(map,null,0));n++;}
  }catch{}
  await p.close();
}
await b.close();console.log('card-bgs for '+n+' pages → '+OUT);
