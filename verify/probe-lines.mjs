import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/data-integration-as-a-service/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(900);
const r=await p.evaluate(()=>{
  const out=[];document.querySelectorAll('*').forEach(el=>{const bg=getComputedStyle(el).backgroundImage;if(/Line-5-1|Line-8-1/i.test(bg)){const sec=el.closest('section,.elementor-section,.e-con');const h=sec?.querySelector('h1,h2,h3')?.textContent.replace(/\s+/g,' ').trim().slice(0,30);const r=el.getBoundingClientRect();out.push({img:(bg.match(/Line-[58]-1\.png/i)||[''])[0],section:h||'?',w:Math.round(r.width),h:Math.round(r.height),pos:getComputedStyle(el).backgroundPosition,size:getComputedStyle(el).backgroundSize});}});
  return out.slice(0,4);
});
console.log(JSON.stringify(r,null,1));await b.close();
