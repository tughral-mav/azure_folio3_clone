import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function shoot(url, tag){
  const p=await b.newPage({viewport:{width:1440,height:1200},userAgent:UA});
  await p.goto(url,{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},30);});});
  await p.waitForTimeout(1500);
  const secInfo=await p.evaluate(()=>{
    const out=[];
    const h2s=[...document.querySelectorAll('h2,h1')];
    const want=[/^why leverage azure services for construction/i,/^why choose folio3/i];
    for(const h of h2s){
      const txt=h.textContent.replace(/\s+/g,' ').trim();
      if(want.some(re=>re.test(txt))){
        const sec=h.closest('.elementor-top-section')||h.closest('section');
        if(sec){const r=sec.getBoundingClientRect();out.push({txt:txt.slice(0,30),top:Math.round(r.top+scrollY),h:Math.round(r.height)});}
      }
    }
    return out;
  });
  let i=0;
  for(const s of secInfo){
    await p.evaluate((y)=>scrollTo(0,Math.max(0,y-10)), s.top);
    await p.waitForTimeout(400);
    await p.screenshot({path:`verify/x-${tag}-${i}.png`}); // viewport shot after scrolling to section top
    console.log(`${tag} ${i}: "${s.txt}" top=${s.top} h=${s.h}`);
    i++;
  }
  await p.close();
}
await shoot('https://azure.folio3.com/azure-for-construction/','live');
await shoot('http://localhost:3000/azure-for-construction/','clone');
await b.close();
