import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function shots(url,prefix,isLive){
  const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:isLive?UA:undefined});
  await p.goto(url,{waitUntil:'load',timeout:75000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
  await p.waitForTimeout(2500);
  // find sections by heading text
  const targets=['Awards','Pre-Built Fabric','Industry-Specific Analytics','Trusted by Organizations','What Is IntelliFabric','Why IntelliFabric Wins'];
  for(const t of targets){
    const loc = p.locator(`text=${t}`).first();
    try{
      await loc.scrollIntoViewIfNeeded({timeout:4000});
      await p.waitForTimeout(700);
      // climb to a section ancestor
      const box = await loc.evaluate(el=>{ let n=el; for(let i=0;i<8;i++){ if(!n.parentElement) break; n=n.parentElement; if(n.tagName==='SECTION'||n.classList.contains('elementor-top-section')) break; } const r=n.getBoundingClientRect(); return {x:Math.max(0,r.x),y:r.y,w:r.width,h:Math.min(r.height,1400)}; });
      const yAbs = await loc.evaluate(el=>{ let n=el; for(let i=0;i<8;i++){ if(!n.parentElement) break; n=n.parentElement; if(n.tagName==='SECTION'||n.classList.contains('elementor-top-section')) break; } const r=n.getBoundingClientRect(); return window.scrollY + r.y; });
      await p.evaluate(y=>scrollTo(0,y-20), yAbs);
      await p.waitForTimeout(600);
      const safe=t.replace(/[^a-z0-9]+/gi,'_').slice(0,20);
      await p.screenshot({path:`${prefix}_${safe}.png`, clip:{x:0,y:0,width:1440,height:Math.min(box.h+40,1300)}});
    }catch(e){ console.log('skip',prefix,t,e.message.split('\n')[0]); }
  }
  await p.close();
}
await shots('https://azure.folio3.com/solution/intellifabric/','L',true);
await shots('http://localhost:3000/solution/intellifabric/','C',false);
await b.close();
console.log('done');
