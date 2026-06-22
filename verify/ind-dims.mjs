import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(900);
const r=await p.evaluate(()=>{
  const cards=[...document.querySelectorAll('.industries-box')];
  const dims=cards.map(c=>{const r=c.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.x),y:Math.round(r.y)};});
  // columns = distinct x positions
  const cols=[...new Set(dims.map(d=>d.x))].length;
  return {count:cards.length,cols,dims:dims.slice(0,6)};
});
console.log(JSON.stringify(r,null,1));await b.close();
