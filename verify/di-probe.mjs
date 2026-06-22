import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
async function probe(url,label){
  await p.goto(url,{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
  await p.waitForTimeout(1200);
  const r=await p.evaluate(()=>{
    const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
    const out={};
    // ETL section: visual order of steps + the main image
    const etl=[...document.querySelectorAll('.elementor-top-section')].find(s=>/building automated etl/i.test(txt(s.querySelector('h2'))));
    if(etl){out.etlSteps=[...etl.querySelectorAll('h3,h4,.elementor-heading-title')].map(h=>txt(h)).filter(t=>/step/i.test(t));out.etlImgs=[...etl.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(f=>!f.includes('svg%'));}
    // CTA band "Ready to Transform": image present?
    const cta=[...document.querySelectorAll('.elementor-top-section')].find(s=>/ready to transform your data/i.test(txt(s.querySelector('h2,.elementor-heading-title'))));
    if(cta)out.ctaImgs=[...cta.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(f=>!f.includes('svg%'));
    // Why Choose: photo present?
    const wc=[...document.querySelectorAll('.elementor-top-section')].find(s=>/why choose folio3/i.test(txt(s.querySelector('h2'))));
    if(wc)out.wcImgs=[...wc.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(f=>!f.includes('svg%'));
    return out;
  });
  console.log('### '+label+' ###');console.log(JSON.stringify(r,null,1));
}
await probe('https://azure.folio3.com/data-integration-as-a-service/','LIVE data-integration');
await b.close();
