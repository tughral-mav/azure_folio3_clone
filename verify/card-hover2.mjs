import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const snap=(label)=>p.evaluate((lbl)=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();const head=[...document.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].find(e=>/^Cut Resume Screening/i.test(txt(e)));const chain=[];let n=head;for(let k=0;k<9&&n;k++){const cs=getComputedStyle(n);chain.push({lvl:k,tag:n.tagName,cls:(n.className||'').toString().split(' ').filter(c=>/box|con|column|wrap|widget/i.test(c)).slice(0,2).join(' '),bg:cs.backgroundColor,boxShadow:cs.boxShadow.slice(0,45),transform:cs.transform,transition:cs.transition.slice(0,40)});n=n.parentElement;}return chain;},label);
const before=await snap('before');
// hover the card center
const head=p.locator('text=Cut Resume Screening Time by 80%').first();
await head.scrollIntoViewIfNeeded();
const box=await head.boundingBox();
await p.mouse.move(box.x+box.width/2, box.y+30);await p.waitForTimeout(600);
const after=await snap('after');
for(let i=0;i<before.length;i++){const b0=before[i],a0=after[i];const changed=b0.transform!==a0.transform||b0.boxShadow!==a0.boxShadow||b0.bg!==a0.bg;console.log(`L${i} ${b0.tag} ${b0.cls} ${changed?'>>> CHANGED':''}`);if(changed){console.log('   transform:',b0.transform,'->',a0.transform);console.log('   boxShadow:',b0.boxShadow,'->',a0.boxShadow);console.log('   bg:',b0.bg,'->',a0.bg);console.log('   transition:',b0.transition);}}
await b.close();
