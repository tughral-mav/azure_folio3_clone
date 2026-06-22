import { chromium } from 'playwright';
const b=await chromium.launch();
const p=await b.newPage({userAgent:'Mozilla/5.0',viewport:{width:1440,height:1100}});
await p.goto('https://azure.folio3.com/azure-for-retail/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+600){clearInterval(t);r();}},50);});});
await p.waitForTimeout(1500);
const data=await p.evaluate(()=>{
  const up=u=>{const m=(u||'').match(/\/wp-content\/uploads\/[^"')\s]+\.(?:webp|png|jpe?g|svg)/i);return m?m[0]:null;};
  const out=[];
  document.querySelectorAll('img').forEach(im=>{
    const src=up(im.currentSrc)||up(im.src); if(!src)return;
    let sec=im.closest('section,.elementor-section,.e-con'); let h='';
    while(sec){const hh=sec.querySelector('h1,h2,h3');if(hh){h=hh.textContent.replace(/\s+/g,' ').trim().slice(0,32);break;}sec=sec.parentElement;}
    out.push({h, src:src.split('/').pop(), w:im.naturalWidth, alt:(im.alt||'').slice(0,20)});
  });
  return out;
});
// group by heading
const byH={}; for(const x of data){(byH[x.h]=byH[x.h]||[]).push(x);}
for(const h of Object.keys(byH)){ console.log('\n['+h+']'); for(const x of byH[h]) console.log('   '+x.src+' ('+x.w+'px)'+(x.alt?' alt='+x.alt:'')); }
await b.close();
