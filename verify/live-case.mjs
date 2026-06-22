import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0'});
await p.goto('https://azure.folio3.com/data-science-ai/microsoft-copilot-consulting/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(1000);
// find the flip boxes / case cards mentioning Food Verification
const r=await p.evaluate(()=>{
  const out=[];
  document.querySelectorAll('*').forEach(el=>{
    if(el.children.length===0 && /Food Verification/i.test(el.textContent||'')){
      const card=el.closest('.elementor-widget,.elementor-column,[class*="box"]');
      const img=card?.querySelector('img');
      if(img)out.push((img.currentSrc||img.src||'').split('/').slice(-1)[0]);
    }
  });
  return [...new Set(out)];
});
console.log('Food Verification card images:',JSON.stringify(r));await b.close();
