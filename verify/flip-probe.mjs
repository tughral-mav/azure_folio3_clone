import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0'});
await p.goto('https://azure.folio3.com/azure-for-construction/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(800);
const r=await p.evaluate(()=>{
  const f=document.querySelector('.elementor-flip-box');
  if(!f)return {found:false};
  const layers=[...f.querySelectorAll('.elementor-flip-box__layer')];
  const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  return {found:true, nLayers:layers.length,
    layerClasses:layers.map(l=>l.className),
    titles:[...f.querySelectorAll('.elementor-flip-box__layer__title')].map(t=>txt(t)),
    descs:[...f.querySelectorAll('.elementor-flip-box__layer__description')].map(d=>txt(d).slice(0,50)),
    iconHTML:(f.querySelector('.elementor-flip-box__layer__icon')||{}).innerHTML?.slice(0,60)};
});
console.log(JSON.stringify(r,null,1));await b.close();
