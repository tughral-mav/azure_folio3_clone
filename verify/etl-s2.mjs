import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const dec=(s)=>{try{if(s.includes('/_next/image'))s=decodeURIComponent(new URL(s,'http://x').searchParams.get('url')||'');}catch{}return s;};
const b=await chromium.launch();
async function m(url,isLive){const p=await b.newPage({viewport:{width:1440,height:1200},userAgent:isLive?UA:undefined});
await p.goto(url,{waitUntil:'load',timeout:90000});await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});await p.waitForTimeout(2200);
const r=await p.evaluate(()=>{const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();const h=[...document.querySelectorAll('.elementor-heading-title,h2')].find(e=>/building automated etl/i.test(txt(e)));const sec=h.closest('.elementor-top-section')||h.closest('section');const S=sec.getBoundingClientRect();const rel=el=>{const r=el.getBoundingClientRect();return {x:Math.round(r.left-S.left),y:Math.round(r.top-S.top),w:Math.round(r.width),h:Math.round(r.height)};};
  return {imgs:[...sec.querySelectorAll('img')].map(i=>({src:(i.currentSrc||i.src||i.getAttribute('data-src')||'').slice(-40),...rel(i)})).filter(o=>o.w>20)};});
await p.close();return r;}
for(const [label,url,live] of [['LIVE','https://azure.folio3.com/data-integration-as-a-service/',true],['CLONE','http://localhost:3000/data-integration-as-a-service/',false]]){
  const r=await m(url,live);console.log('### '+label+' ###');
  r.imgs.forEach(o=>console.log('  '+dec(o.src).split('/').pop().padEnd(28)+' x='+o.x+' y='+o.y+' w='+o.w+' h='+o.h));
}
await b.close();
