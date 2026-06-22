import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1200},userAgent:UA});
await p.goto('https://azure.folio3.com/data-integration-as-a-service/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const info=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/building automated etl/i.test(txt(e)));
  const sec=h?.closest('.elementor-top-section'); if(!sec)return{};
  const R=sec.getBoundingClientRect();
  // positions of each step + the triangle bg, relative to section
  const steps=[...sec.querySelectorAll('.elementor-widget')].filter(w=>/step\s*0\d/i.test(txt(w))).map(w=>{const r=w.getBoundingClientRect();return {label:txt(w.querySelector('h3,h4,.elementor-heading-title')).slice(0,8),x:Math.round(r.left-R.left),y:Math.round(r.top-R.top),w:Math.round(r.width)};});
  // the triangle: a bg-image element
  let tri=null;sec.querySelectorAll('*').forEach(e=>{const bg=getComputedStyle(e).backgroundImage;if(bg&&bg.includes('wp-content')&&!tri){const r=e.getBoundingClientRect();tri={file:(bg.match(/uploads\/[^"')]+/)||[''])[0].split('/').pop(),x:Math.round(r.left-R.left),y:Math.round(r.top-R.top),w:Math.round(r.width),h:Math.round(r.height)};}});
  const imgs=[...sec.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(f=>!/svg%/.test(f));
  return {sectionW:Math.round(R.width), sectionH:Math.round(R.height), heading:txt(h), steps, triangle:tri, imgs};
});
console.log(JSON.stringify(info,null,1));
// screenshot the live section
const y=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/building automated etl/i.test(e.textContent));return h.closest('.elementor-top-section').getBoundingClientRect().top+scrollY;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-30)),y);await p.waitForTimeout(600);
await p.screenshot({path:'verify/etl-live.png',clip:{x:0,y:0,width:1440,height:680}});
await b.close();
