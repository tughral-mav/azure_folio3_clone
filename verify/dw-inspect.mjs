import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/data-warehousing-as-a-service/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('img')].map(i=>i.complete&&i.naturalWidth>0?1:new Promise(r=>{i.addEventListener('load',r);setTimeout(r,3000);})));});
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const res={};
  // 1) Our Proven Process — icons per card
  const ph=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/our proven process/i.test(txt(e)));
  const psec=ph?.closest('.elementor-top-section');
  if(psec){const cards=[...psec.querySelectorAll('.elementor-widget-image-box,.elementor-image-box-wrapper,[class*="icon-box"]')].filter(c=>/book a discover|build your data|design.*deploy/i.test(txt(c)));
    res.process=cards.map(c=>{const im=c.querySelector('img');return {title:txt(c.querySelector('.elementor-image-box-title,h3,h4,.elementor-heading-title')).slice(0,30),icon:im?(im.currentSrc||im.src).split('/').pop().split('?')[0]:'NO-IMG'};});}
  // 2) Solution Models — card structure (is card 1 a banner?)
  const sh=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/solution models/i.test(txt(e)));
  const ssec=sh?.closest('.elementor-top-section');
  if(ssec){const cols=[...ssec.querySelectorAll('.elementor-column,.e-con-inner > .e-con,.elementor-widget-wrap')].filter(c=>/data warehouse (as a service|implementation|migration|consultation)/i.test(txt(c)));
    res.models=cols.slice(0,6).map(c=>{const cs=getComputedStyle(c);const bg=cs.backgroundImage.includes('url')?(cs.backgroundImage.match(/uploads\/[^"')]+/)||[''])[0].split('/').pop():'';const im=c.querySelector('img');const hasCheck=!!c.querySelector('svg,[class*="icon"] i,.elementor-icon');return {title:txt(c.querySelector('h2,h3,h4,.elementor-heading-title')).slice(0,34),bgImg:bg,img:im?(im.currentSrc||im.src).split('/').pop():'',hasIcon:hasCheck,bgColor:cs.backgroundColor};});}
  return res;
});
console.log(JSON.stringify(out,null,1));await b.close();
