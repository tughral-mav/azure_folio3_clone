import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('http://localhost:3000/data-warehousing-as-a-service/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
// count distinct visible card tiles in the Folio3 Advantage section
const r=await p.evaluate(()=>{const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const h=[...document.querySelectorAll('h2')].find(h=>/folio3 advantage/i.test(h.textContent));
  const sec=h?.closest('section'); if(!sec)return{};
  const titles=[...sec.querySelectorAll('h3')].map(t=>txt(t));
  const uniq=[...new Set(titles)];
  return {totalH3:titles.length, uniqueTitles:uniq, sectionTop:Math.round(sec.getBoundingClientRect().top+scrollY)};
});
console.log(JSON.stringify(r));
if(r.sectionTop){await p.evaluate((y)=>scrollTo(0,Math.max(0,y-20)),r.sectionTop);await p.waitForTimeout(500);await p.screenshot({path:'verify/folio3-advantage.png',clip:{x:0,y:0,width:1440,height:560}});}
await b.close();
