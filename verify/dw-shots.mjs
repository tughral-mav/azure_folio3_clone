import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/data-warehousing-as-a-service/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('img')].map(i=>i.complete&&i.naturalWidth>0?1:new Promise(r=>{i.addEventListener('load',r);setTimeout(r,3000);})));});
for(const [name,re] of [['proven',/our proven process/i],['models',/solution models/i]]){
  const y=await p.evaluate((rs)=>{const re=new RegExp(rs,'i');const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>re.test(e.textContent||''));return h?h.closest('.elementor-top-section').getBoundingClientRect().top+scrollY:0;},re.source);
  await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-20)),y);await p.waitForTimeout(600);
  await p.screenshot({path:`verify/dw-live-${name}.png`,clip:{x:0,y:0,width:1280,height:620}});
}
// real icon srcs in the proven-process section
const icons=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/our proven process/i.test(e.textContent||''));const sec=h?.closest('.elementor-top-section');if(!sec)return[];return [...sec.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(s=>!/svg%|logo/i.test(s));});
console.log('proven-process icon srcs:',JSON.stringify(icons));
await b.close();
