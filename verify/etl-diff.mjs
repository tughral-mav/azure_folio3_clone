import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const dec=(s)=>{try{if(s.includes('/_next/image'))s=decodeURIComponent(new URL(s,'http://x').searchParams.get('url')||'');}catch{}return s;};
const b=await chromium.launch();
async function m(url,isLive){const p=await b.newPage({viewport:{width:1440,height:1200},userAgent:isLive?UA:undefined});
await p.goto(url,{waitUntil:'load',timeout:90000});await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});await p.waitForTimeout(1800);
const r=await p.evaluate(()=>{const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();const h=[...document.querySelectorAll('.elementor-heading-title,h2')].find(e=>/building automated etl/i.test(txt(e)));const sec=h.closest('.elementor-top-section')||h.closest('section');const S=sec.getBoundingClientRect();const rel=el=>{if(!el)return null;const r=el.getBoundingClientRect();return {x:Math.round(r.left-S.left),y:Math.round(r.top-S.top),w:Math.round(r.width),h:Math.round(r.height)};};
  const imgs=[...sec.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src||'',r:rel(i)}));
  return {secW:Math.round(S.width),secH:Math.round(S.height),imgs};});
await p.close();
const find=(re)=>{const it=r.imgs.find(o=>re.test(dec(o.src)));return it?it.r:null;};
return {secH:r.secH,icon1:find(/icon-1\.webp/),icon2:find(/icon-2\.webp/),icon3:find(/icon-3\.webp/),triangle:find(/ias-concept-img(?:-\d+x\d+)?\.webp/)};}
const L=await m('https://azure.folio3.com/data-integration-as-a-service/',true);
const C=await m('http://localhost:3000/data-integration-as-a-service/',false);
await b.close();
console.log('elem     | LIVE x,y,w           | CLONE x,y,w          | Δx  Δy  Δw');
for(const k of ['triangle','icon1','icon2','icon3']){const a=L[k],c=C[k];if(!a||!c){console.log(k.padEnd(8)+' | '+(a?'L✓':'L✗')+' '+(c?'C✓':'C✗'));continue;}const f=o=>`${o.x},${o.y},${o.w}`.padEnd(20);console.log(k.padEnd(8)+' | '+f(a)+' | '+f(c)+' | '+String(c.x-a.x).padStart(3)+' '+String(c.y-a.y).padStart(3)+' '+String(c.w-a.w).padStart(3));}
console.log('secH: live',L.secH,'clone',C.secH,'Δ',C.secH-L.secH);
