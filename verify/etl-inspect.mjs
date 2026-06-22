import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1200},userAgent:UA});
await p.goto('https://azure.folio3.com/data-integration-as-a-service/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1800);
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const h=[...document.querySelectorAll('.elementor-heading-title,h2,h3')].find(e=>/building automated etl/i.test(txt(e)));
  const sec=h?.closest('.elementor-top-section'); if(!sec)return{err:'no section'};
  const S=sec.getBoundingClientRect();
  const rel=(el)=>{if(!el)return null;const r=el.getBoundingClientRect();return {x:Math.round(r.left-S.left),y:Math.round(r.top-S.top),w:Math.round(r.width),h:Math.round(r.height)};};
  // 1) which element(s) carry a background-image, with their styles
  const bgEls=[];sec.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e);if(cs.backgroundImage&&cs.backgroundImage.includes('wp-content')){bgEls.push({tag:e.tagName,cls:(e.className||'').toString().slice(0,40),file:(cs.backgroundImage.match(/uploads\/[^"')]+/)||[''])[0].split('/').pop(),opacity:cs.opacity,size:cs.backgroundSize,pos:cs.backgroundPosition,rect:rel(e)});}});
  // section-level bg
  const secCS=getComputedStyle(sec);const secBg=secCS.backgroundImage.includes('wp-content')?{file:(secCS.backgroundImage.match(/uploads\/[^"')]+/)||[''])[0].split('/').pop(),opacity:secCS.opacity,size:secCS.backgroundSize,pos:secCS.backgroundPosition}:null;
  // 2) the triangle img + its wrapper
  const triImg=[...sec.querySelectorAll('img')].filter(i=>i.getBoundingClientRect().width>200).map(i=>({src:(i.currentSrc||i.src).split('/').pop().split('?')[0],rect:rel(i),opacity:getComputedStyle(i).opacity}))[0];
  // 3) each step: the icon-box widget, the visible white circle, the title, the text
  const stepWidgets=[...sec.querySelectorAll('.elementor-widget-icon-box,.elementor-icon-box-wrapper,[class*="icon-box"]')];
  const steps=[];
  for(const w of stepWidgets){const t=txt(w);if(!/step\s*0\d/i.test(t)||t.length>160)continue;
    const iconWrap=w.querySelector('.elementor-icon-box-icon,.elementor-icon');const img=w.querySelector('img');const title=w.querySelector('.elementor-icon-box-title');const desc=w.querySelector('.elementor-icon-box-content p,.elementor-icon-box-description');
    const iw=iconWrap||img?.parentElement;const iwcs=iw?getComputedStyle(iw):{};
    steps.push({label:txt(title).slice(0,8), widget:rel(w), iconWrap:rel(iw), circleStyle:{bg:iwcs.backgroundColor,radius:iwcs.borderRadius,w:iwcs.width,h:iwcs.height}, title:rel(title), desc:rel(desc), descAlign:desc?getComputedStyle(desc).textAlign:null});
  }
  return {section:{w:Math.round(S.width),h:Math.round(S.height)}, sectionBg:secBg, bgElements:bgEls, triangle:triImg, steps};
});
console.log(JSON.stringify(out,null,1));await b.close();
