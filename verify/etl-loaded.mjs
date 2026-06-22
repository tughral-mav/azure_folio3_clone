import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const dec=(s)=>{try{if(s.includes('/_next/image'))s=decodeURIComponent(new URL(s,'http://x').searchParams.get('url')||'');}catch{}return s;};
const b=await chromium.launch();
async function m(url,isLive){const p=await b.newPage({viewport:{width:1440,height:1200},userAgent:isLive?UA:undefined});
await p.goto(url,{waitUntil:'networkidle',timeout:90000});
// scroll the ETL section into view + wait for ALL its imgs to actually load
await p.evaluate(()=>{const h=[...document.querySelectorAll('.elementor-heading-title,h2')].find(e=>/building automated etl/i.test(e.textContent));h?.scrollIntoView({block:'center'});});
await p.waitForTimeout(1200);
await p.evaluate(async()=>{const h=[...document.querySelectorAll('.elementor-heading-title,h2')].find(e=>/building automated etl/i.test(e.textContent));const sec=h.closest('.elementor-top-section')||h.closest('section');
  await Promise.all([...sec.querySelectorAll('img')].map(i=>i.complete&&i.naturalWidth>0?1:new Promise(r=>{i.addEventListener('load',r);i.addEventListener('error',r);setTimeout(r,4000);})));});
await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();const h=[...document.querySelectorAll('.elementor-heading-title,h2')].find(e=>/building automated etl/i.test(txt(e)));const sec=h.closest('.elementor-top-section')||h.closest('section');const S=sec.getBoundingClientRect();const rel=el=>{const r=el.getBoundingClientRect();return {x:Math.round(r.left-S.left),y:Math.round(r.top-S.top),w:Math.round(r.width),h:Math.round(r.height),nat:el.naturalWidth};};
  return {imgs:[...sec.querySelectorAll('img')].map(i=>({src:(i.currentSrc||i.src||''),...rel(i)})).filter(o=>o.w>20)};});
await p.close();return r;}
for(const [label,url,live] of [['LIVE','https://azure.folio3.com/data-integration-as-a-service/',true],['CLONE','http://localhost:3000/data-integration-as-a-service/',false]]){
  const r=await m(url,live);console.log('### '+label+' ###');
  r.imgs.forEach(o=>console.log('  '+dec(o.src).split('/').pop().split('&')[0].padEnd(28)+' x='+o.x+' y='+o.y+' w='+o.w+' h='+o.h+' nat='+o.nat));
}
await b.close();
