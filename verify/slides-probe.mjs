import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/data-science-ai/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const slidesW=document.querySelector('.elementor-widget-slides');
  if(!slidesW)return{found:false};
  const sec=slidesW.closest('.elementor-top-section');
  const secHead=txt(sec?.querySelector('h2,.elementor-heading-title'));
  // each slide
  const slides=[...slidesW.querySelectorAll('.swiper-slide, .elementor-repeater-item, .elementor-slide')].map(s=>{
    const heading=txt(s.querySelector('.elementor-slide-heading'));
    const desc=txt(s.querySelector('.elementor-slide-description'));
    const bg=getComputedStyle(s.querySelector('.swiper-slide-bg')||s).backgroundImage;
    return {heading, desc:desc.slice(0,60), bg:(bg.match(/url\(["']?([^"')]+)/)||[])[1]?.split('/').pop()};
  }).filter(x=>x.heading||x.desc);
  return {found:true, section:secHead, slideCount:slides.length, slides};
});
console.log(JSON.stringify(r,null,2));await b.close();
