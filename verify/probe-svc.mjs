import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(900);
const r=await p.evaluate(()=>{
  // Our Services cards → arrow links
  const sh=[...document.querySelectorAll('h2')].find(h=>/our services.*automation/i.test(h.textContent));
  const ssec=sh?.closest('.elementor-section,.e-con');
  const cards=ssec?[...ssec.querySelectorAll('a')].map(a=>({t:(a.textContent||'').replace(/\s+/g,' ').trim().slice(0,30),href:a.getAttribute('href')})).filter(a=>a.href&&!a.href.startsWith('#')):[];
  // ETL section background
  const eh=[...document.querySelectorAll('h2')].find(h=>/building automated etl/i.test(h.textContent));
  const esec=eh?.closest('.elementor-section,.e-con');
  let etlBg=null;esec?.querySelectorAll('*').forEach(el=>{const bg=getComputedStyle(el).backgroundImage;if(bg&&bg.includes('wp-content')){etlBg={img:(bg.match(/[^/]+\.(webp|png|jpg)/i)||[''])[0],opacity:getComputedStyle(el).opacity};}});
  return {serviceLinks:cards.slice(0,8),etlBg};
});
console.log(JSON.stringify(r,null,1));await b.close();
