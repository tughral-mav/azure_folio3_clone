import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1200},userAgent:UA});
await p.goto('https://azure.folio3.com/data-integration-as-a-service/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1800);
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const h=[...document.querySelectorAll('.elementor-heading-title,h2,h3')].find(e=>/building automated etl/i.test(txt(e)));
  const sec=h?.closest('.elementor-top-section'); const S=sec.getBoundingClientRect();
  const rel=(el)=>{if(!el)return null;const r=el.getBoundingClientRect();return {x:Math.round(r.left-S.left),y:Math.round(r.top-S.top),w:Math.round(r.width),h:Math.round(r.height)};};
  // background-repeat for the section
  const secCS=getComputedStyle(sec);
  // each "Step 0N": find the heading element, walk up to its column/widget, get circle (img's nearest rounded ancestor) + text
  const steps=[];
  [...document.querySelectorAll('*')].forEach(e=>{ if(e.children.length) return; const t=txt(e); if(!/^step\s*0\d$/i.test(t)) return;
    const col=e.closest('.elementor-column, .elementor-widget-wrap, .e-con'); if(!col) return;
    const img=col.querySelector('img'); let circle=img; while(circle&&circle!==col){const cs=getComputedStyle(circle);if(parseFloat(cs.borderRadius)>20||cs.borderRadius.includes('50')){break;}circle=circle.parentElement;}
    const desc=[...col.querySelectorAll('p')].find(x=>txt(x).length>20);
    steps.push({label:t, col:rel(col), title:rel(e), circle:rel(circle), circleStyle:circle?(()=>{const c=getComputedStyle(circle);return {bg:c.backgroundColor.slice(0,20),r:c.borderRadius,box:c.boxShadow.slice(0,15)};})():null, desc:rel(desc), descAlign:desc?getComputedStyle(desc).textAlign:null, colFlex:getComputedStyle(col).flexDirection});
  });
  return {secBgRepeat:secCS.backgroundRepeat, secBgAttach:secCS.backgroundAttachment, steps};
});
console.log(JSON.stringify(out,null,1));await b.close();
