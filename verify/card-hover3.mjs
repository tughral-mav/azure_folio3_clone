import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const y=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/the ai advantage/i.test(e.textContent));return h.closest('.elementor-top-section').getBoundingClientRect().top+scrollY;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-20)),y);await p.waitForTimeout(500);
await p.mouse.move(10,10);await p.waitForTimeout(300);
await p.screenshot({path:'verify/card-normal.png',clip:{x:60,y:200,width:330,height:360}});
// hover the FIRST card (icon-box-wrapper)
const card=p.locator('.elementor-icon-box-wrapper').filter({hasText:'Cut Resume Screening'}).first();
await card.hover({force:true});await p.waitForTimeout(700);
// re-capture same clip
const y2=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/the ai advantage/i.test(e.textContent));return h.closest('.elementor-top-section').getBoundingClientRect().top+scrollY;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-20)),y2);
await card.hover({force:true});await p.waitForTimeout(400);
await p.screenshot({path:'verify/card-hovered.png',clip:{x:60,y:200,width:330,height:360}});
console.log('shots done');await b.close();
