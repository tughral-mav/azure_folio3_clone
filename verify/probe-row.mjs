import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-managed-services/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(700);
const r=await p.evaluate(()=>{
  const el=[...document.querySelectorAll('*')].find(e=>e.children.length===0 && /Virtual Machine Management/i.test(e.textContent));
  if(!el) return 'not found';
  let row=el; for(let k=0;k<3&&row.parentElement;k++) row=row.parentElement;
  const svg=row.querySelector('svg'), img=row.querySelector('img'), icon=row.querySelector('.elementor-icon, i, [class*="icon"]');
  return { rowCls:row.className.slice(0,50), hasSvg:!!svg, hasImg:!!img, iconCls:(icon?.className||'').toString().slice(0,40), html:row.outerHTML.slice(0,260).replace(/\s+/g,' ') };
});
console.log(JSON.stringify(r,null,1));await b.close();
