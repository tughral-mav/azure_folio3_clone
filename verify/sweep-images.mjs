import { chromium } from 'playwright';
import { DESIGN_PAGES } from './routes.mjs';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
const base=(u)=>{ if(!u) return ''; try{ if(u.includes('/_next/image')) u=decodeURIComponent(new URL(u,'http://x').searchParams.get('url')||''); }catch{} u=u.split('?')[0].split('/').pop()||''; return u.replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i,'').toLowerCase(); };
async function imgs(page,url){
  await page.goto(url,{waitUntil:'load',timeout:75000});
  await page.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},22);});});
  await page.waitForTimeout(1800);
  return await page.evaluate(()=>[...document.querySelectorAll('img')].filter(i=>i.offsetParent!==null && (i.currentSrc||i.src)).map(i=>i.currentSrc||i.src));
}
const ctxL=await b.newContext({userAgent:UA,viewport:{width:1440,height:1000}});
const ctxC=await b.newContext({viewport:{width:1440,height:1000}});
const pL=await ctxL.newPage(), pC=await ctxC.newPage();
const rows=[];
for(const route of DESIGN_PAGES){
  try{
    const code=(await pL.goto('https://azure.folio3.com'+route,{waitUntil:'load',timeout:60000}))?.status();
    if(code>=400) continue;
    const liveRaw=await imgs(pL,'https://azure.folio3.com'+route);
    const cloneRaw=await imgs(pC,'http://localhost:3000'+route);
    const isJunk=(s)=>!s||/^data:|svg%|placeholder|spacer|^logo|loader/i.test(s);
    const live=new Set(liveRaw.map(base).filter(s=>!isJunk(s)));
    const clone=new Set(cloneRaw.map(base).filter(s=>!isJunk(s)));
    const missing=[...live].filter(x=>!clone.has(x));
    rows.push({route, live:live.size, clone:clone.size, missing});
  }catch(e){rows.push({route,err:e.message.slice(0,25)});}
}
await b.close();
rows.sort((a,b)=>(b.missing?.length||0)-(a.missing?.length||0));
for(const r of rows){ if(r.err){console.log(`ERR ${r.route}`);continue;}
  const flag=r.missing.length>=3?'⚠':' ';
  console.log(`${flag} ${r.route} | live=${r.live} clone=${r.clone} | missing ${r.missing.length}${r.missing.length?': '+r.missing.slice(0,8).join(', '):''}`);
}
