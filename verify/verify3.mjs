import { chromium } from 'playwright';
const b=await chromium.launch();
async function shot(url,re,name){
  const p=await b.newPage({viewport:{width:1440,height:1100}});
  await p.goto(url,{waitUntil:'load',timeout:60000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
  await p.waitForTimeout(2000);
  const y=await p.evaluate((rs)=>{const re=new RegExp(rs,'i');const h=[...document.querySelectorAll('h2')].find(h=>re.test(h.textContent));return h?h.closest('section').getBoundingClientRect().top+scrollY:0;},re);
  await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-20)),y); await p.waitForTimeout(700);
  await p.screenshot({path:`verify/${name}.png`});
  // is about_us-mock VISIBLE on this page?
  const vis=await p.evaluate(()=>[...document.querySelectorAll('img')].some(i=>/about_us-mock/.test(i.currentSrc||i.src||'')&&i.offsetParent!==null&&i.naturalWidth>50));
  await p.close(); return vis;
}
const v1=await shot('http://localhost:3000/ai-scenario-library/','why choose folio3','aisl-wc');
console.log('ai-scenario about_us-mock VISIBLE:',v1);
await shot('http://localhost:3000/case-studies/','all customer stories','cs-grid');
await b.close();
