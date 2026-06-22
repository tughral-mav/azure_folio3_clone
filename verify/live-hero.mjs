import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:900}});
await p.goto('https://azure.folio3.com/azure-cloud-service/',{waitUntil:'load',timeout:90000});
await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{
  const h1=document.querySelector('h1');const sec=h1.closest('.elementor-section,.e-con');
  // all imgs in hero with their rendered size + src
  const imgs=[...sec.querySelectorAll('img')].map(i=>{const r=i.getBoundingClientRect();return {src:(i.currentSrc||i.src||'').split('/').pop().slice(0,50),w:Math.round(r.width),h:Math.round(r.height),natW:i.naturalWidth,natH:i.naturalHeight};}).filter(x=>x.w>20);
  // any element with bg-image
  let bg=null;sec.querySelectorAll('*').forEach(el=>{const b=getComputedStyle(el).backgroundImage;if(b&&b.includes('wp-content')){const r=el.getBoundingClientRect();bg={img:(b.match(/[^/]+\.(webp|png|jpg)/i)||[''])[0].slice(0,50),w:Math.round(r.width),h:Math.round(r.height),size:getComputedStyle(el).backgroundSize,pos:getComputedStyle(el).backgroundPosition};}});
  return {imgs,bg};
});
console.log(JSON.stringify(r,null,1));await b.close();
