import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function find(url,label){
  const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
  await p.goto(url,{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
  await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{
    const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
    const imgs=[...document.querySelectorAll('img')].filter(i=>/about_us-mock/.test(i.currentSrc||i.src||''));
    return imgs.map(i=>{const sec=i.closest('section,.elementor-top-section');return {visible:i.offsetParent!==null&&i.naturalWidth>50, secHead:txt(sec?.querySelector('h1,h2,h3'))?.slice(0,40)};});
  });
  console.log(label+' about_us-mock:',JSON.stringify(r));
  await p.close();
}
await find('http://localhost:3000/ai-scenario-library/','CLONE');
await find('https://azure.folio3.com/ai-scenario-library/','LIVE');
await b.close();
