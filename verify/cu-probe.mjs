import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/contact-us/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  return [...document.querySelectorAll('.elementor-top-section')].map(s=>{
    const h=txt(s.querySelector('h1,h2,h3,.elementor-heading-title'));
    const imgs=[...s.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(x=>!x.includes('svg%'));
    const bg=[...s.querySelectorAll('*')].map(e=>getComputedStyle(e).backgroundImage).filter(b=>b&&b!=='none'&&b.includes('wp-content')).map(b=>(b.match(/uploads\/[^"')]+/)||[''])[0].split('/').pop());
    return {h:h.slice(0,40), imgs:[...new Set(imgs)], bg:[...new Set(bg)]};
  }).filter(s=>s.h||s.imgs.length||s.bg.length);
});
r.forEach(s=>console.log('§ '+s.h+'\n   imgs: '+s.imgs.join(', ')+(s.bg.length?'\n   bg: '+s.bg.join(', '):'')));
await b.close();
