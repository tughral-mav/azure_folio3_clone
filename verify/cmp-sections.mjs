import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function shoot(url, tag){
  const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
  await p.goto(url,{waitUntil:'load',timeout:90000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},30);});});
  await p.waitForTimeout(1500);
  const boxes=await p.evaluate(()=>{
    const out=[];
    const heads=[...document.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title,.elementor-flip-box, span')];
    const want=[{k:'whylev',re:/^why leverage azure services for construction/i},{k:'whychoose',re:/^why choose folio3/i}];
    for(const w of want){
      const hits=heads.filter(h=>w.re.test(h.textContent.replace(/\s+/g,' ').trim()));
      let idx=0;
      for(const h of hits){
        const sec=h.closest('section,.elementor-top-section,.e-con');
        if(!sec)continue;
        const r=sec.getBoundingClientRect();
        const top=r.top+scrollY;
        out.push({key:w.k+'-'+idx, top, height:Math.min(r.height,1300)});
        idx++;
      }
    }
    // dedupe by top
    const seen=new Set();return out.filter(o=>{const key=Math.round(o.top);if(seen.has(key))return false;seen.add(key);return true;});
  });
  for(const box of boxes){
    await p.evaluate((y)=>scrollTo(0,y), box.top);
    await p.waitForTimeout(300);
    await p.screenshot({path:`verify/sec-${tag}-${box.key}.png`, clip:{x:0,y:box.top,width:1440,height:box.height}}).catch(e=>console.log('skip',box.key,e.message.slice(0,30)));
  }
  await p.close();
  console.log(tag,'sections:',boxes.map(b=>b.key).join(', '));
}
await shoot('https://azure.folio3.com/azure-for-construction/','live');
await shoot('http://localhost:3000/azure-for-construction/','clone');
await b.close();
