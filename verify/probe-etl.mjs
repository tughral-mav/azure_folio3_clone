import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(900);
const r=await p.evaluate(()=>{
  // find element with etl-elt-pipelines bg
  let bgEl=null;document.querySelectorAll('*').forEach(el=>{const bg=getComputedStyle(el).backgroundImage;if(bg&&/etl-elt-pipelines/i.test(bg)){const h=el.closest('section,.elementor-section,.e-con')?.querySelector('h2');bgEl={cls:el.className.toString().slice(0,40),opacity:getComputedStyle(el).opacity,bgSize:getComputedStyle(el).backgroundSize,sectionH:h?h.textContent.slice(0,30):'?'};}});
  // 4th service link (Predictive)
  const sh=[...document.querySelectorAll('h2')].find(h=>/our services.*automation/i.test(h.textContent));const ssec=sh?.closest('.elementor-section,.e-con');
  const pred=[...(ssec?.querySelectorAll('a')||[])].find(a=>/predictive/i.test(a.textContent));
  return {bgEl, predictiveLink: pred?.getAttribute('href')};
});
console.log(JSON.stringify(r,null,1));await b.close();
