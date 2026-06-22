import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(800);
const r=await p.evaluate(()=>{
  // tech tabs
  const th=[...document.querySelectorAll('h2')].find(h=>/technologies we work with/i.test(h.textContent));
  const tsec=th?.closest('.elementor-section,.e-con');
  const tabLabels=tsec?[...tsec.querySelectorAll('.elementor-tab-title, [role=tab], .e-n-tab-title')].map(t=>t.textContent.replace(/\s+/g,' ').trim()).filter(Boolean):[];
  // industries cards
  const ih=[...document.querySelectorAll('h2')].find(h=>/business intelligence services for indus/i.test(h.textContent));
  const isec=ih?.closest('.elementor-section,.e-con');
  // find a Media card
  const mediaEl=[...(isec?.querySelectorAll('*')||[])].find(e=>e.children.length<=2 && /^Media and Entertainment$/i.test(e.textContent.trim()));
  let card=mediaEl, labelBg='', hasImg=false;
  if(mediaEl){for(let k=0;k<5&&card.parentElement;k++){if(card.querySelector('img')){hasImg=true;break;}card=card.parentElement;} labelBg=getComputedStyle(mediaEl.closest('div')||mediaEl).backgroundColor;}
  return { tabLabels, industryHasImg:hasImg, mediaLabelBg:labelBg, industryCardCls:(card?.className||'').toString().slice(0,50) };
});
console.log(JSON.stringify(r,null,1));await b.close();
