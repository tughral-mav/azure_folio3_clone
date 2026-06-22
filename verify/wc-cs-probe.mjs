import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
async function wc(url){
  await p.goto(url,{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
  await p.waitForTimeout(1200);
  return await p.evaluate(()=>{
    const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
    const wc=[...document.querySelectorAll('.elementor-top-section')].find(s=>/why choose folio3/i.test(txt(s.querySelector('h2'))));
    if(!wc)return {wc:'NO WHY-CHOOSE SECTION'};
    return {imgs:[...wc.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(f=>!f.includes('svg%')&&f.length>3)};
  });
}
console.log('LIVE ai-scenario-library why-choose imgs:',JSON.stringify(await wc('https://azure.folio3.com/ai-scenario-library/')));
console.log('LIVE data-integration why-choose imgs:',JSON.stringify(await wc('https://azure.folio3.com/data-integration-as-a-service/')));
// case-studies: section headings live vs clone
async function heads(url){await p.goto(url,{waitUntil:'load',timeout:90000});await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},22);});});await p.waitForTimeout(1000);return await p.evaluate(()=>[...document.querySelectorAll('main h1,main h2, main .elementor-heading-title, section h1, section h2')].map(h=>(h.textContent||'').replace(/\s+/g,' ').trim()).filter(t=>t.length>3&&t.length<55).slice(0,16));}
console.log('\nLIVE /case-studies/ headings:',JSON.stringify(await heads('https://azure.folio3.com/case-studies/'),null,0));
console.log('\nCLONE /case-studies/ headings:',JSON.stringify(await heads('http://localhost:3000/case-studies/'),null,0));
await b.close();
