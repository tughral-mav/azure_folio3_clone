import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function measure(url, isLive){
  const p=await b.newPage({viewport:{width:1440,height:1200},userAgent:isLive?UA:undefined});
  await p.goto(url,{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
  await p.waitForTimeout(1800);
  return await p.evaluate(()=>{
    const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
    const h=[...document.querySelectorAll('h2,.elementor-heading-title,h3')].find(e=>/building automated etl/i.test(txt(e)));
    const sec=h?.closest('.elementor-top-section')||h?.closest('section'); if(!sec)return{};
    const S=sec.getBoundingClientRect();
    const rel=(el)=>{if(!el)return null;const r=el.getBoundingClientRect();return {x:Math.round(r.left-S.left),y:Math.round(r.top-S.top),w:Math.round(r.width),h:Math.round(r.height)};};
    // heading + subtitle
    const headEl=[...sec.querySelectorAll('h2,.elementor-heading-title')].find(e=>/building automated etl/i.test(txt(e)));
    const cs=headEl?getComputedStyle(headEl):{};
    // each step block (the widget containing "Step 0N") + its icon img/circle
    const steps=[...sec.querySelectorAll('*')].filter(e=>{const t=txt(e);return /^step\s*0\d/i.test(t)&&t.length<140&&e.querySelector('p');}).slice(0,3).map(e=>{
      const img=e.querySelector('img')||e.parentElement?.querySelector('img');
      const circle=img?.closest('[class*="icon"],[class*="image"]')||img?.parentElement;
      return {label:txt(e.querySelector('h3,h4,.elementor-heading-title')).slice(0,8), block:rel(e), circle:rel(circle), img:(img?.currentSrc||'').split('/').pop().split('?')[0]};
    });
    // triangle: largest bg-image OR img
    let tri=null;sec.querySelectorAll('*').forEach(el=>{const bg=getComputedStyle(el).backgroundImage;if(bg&&bg.includes('wp-content')){const r=rel(el);if(r&&r.w>200&&(!tri||r.w>tri.w))tri={...r,file:(bg.match(/uploads\/[^"')]+/)||[''])[0].split('/').pop()};}});
    const bigImg=[...sec.querySelectorAll('img')].filter(i=>i.getBoundingClientRect().width>200).map(i=>({...rel(i),file:(i.currentSrc||'').split('/').pop().split('?')[0]}))[0];
    return {section:{w:Math.round(S.width),h:Math.round(S.height)}, heading:{...rel(headEl), fontSize:cs.fontSize, align:cs.textAlign}, steps, triangleBg:tri, triangleImg:bigImg};
  }).finally(()=>p.close());
}
console.log('### LIVE ###');console.log(JSON.stringify(await measure('https://azure.folio3.com/data-integration-as-a-service/',true),null,1));
console.log('### CLONE ###');console.log(JSON.stringify(await measure('http://localhost:3000/data-integration-as-a-service/',false),null,1));
await b.close();
