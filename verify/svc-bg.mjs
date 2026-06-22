import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/services/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const out=[];
  document.querySelectorAll('.elementor-top-section').forEach(s=>{
    const h=txt(s.querySelector('h2,h1,.elementor-heading-title'));
    // elements with bg-image inside this section + their nearest heading/text
    const bgEls=[];
    s.querySelectorAll('*').forEach(e=>{const bg=getComputedStyle(e).backgroundImage;if(bg&&bg.includes('wp-content')){const f=(bg.match(/uploads\/[^"')]+/)||[''])[0].split('/').pop().split('?')[0];const card=e.closest('[class*="column"],[class*="box"],.elementor-widget');const ct=txt(card?.querySelector('h3,h4,.elementor-heading-title')||card)?.slice(0,30);bgEls.push(f+(ct?' ['+ct+']':''));}});
    if(h&&bgEls.length)out.push({h:h.slice(0,40), bgs:[...new Set(bgEls)]});
  });
  return out;
});
r.forEach(s=>console.log('§ '+s.h+'\n   '+s.bgs.join('\n   ')));
await b.close();
