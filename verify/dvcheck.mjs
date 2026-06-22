import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('http://localhost:3000/azure-data-analytics/data-visualization-as-a-service/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(2000);
const secs=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  return [...document.querySelectorAll('section')].map(s=>{
    const h=s.querySelector('h2,h3');const imgs=[...s.querySelectorAll('img')].filter(i=>i.offsetParent!==null&&i.naturalWidth>20).length;
    return {h:h?txt(h).slice(0,38):'(none)',imgs};
  }).filter(s=>s.h!=='(none)'||s.imgs);
});
secs.forEach(s=>console.log(`  imgs=${s.imgs}  ${s.h}`));
await b.close();
