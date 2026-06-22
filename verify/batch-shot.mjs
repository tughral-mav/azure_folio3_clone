import { chromium } from 'playwright';
const b=await chromium.launch();
// navbar Services dropdown
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('http://localhost:3000/',{waitUntil:'load',timeout:60000});await p.waitForTimeout(800);
const svc=p.locator('nav a',{hasText:/^Services$/i}).first();
await svc.hover(); await p.waitForTimeout(500);
await p.screenshot({path:'verify/nav-services.png', clip:{x:0,y:0,width:1000,height:560}});
// city-university client card
await p.goto('http://localhost:3000/city-university-azure/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>1600){clearInterval(t);r();}},25);});});await p.waitForTimeout(1200);
await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,p')].find(e=>/the customer/i.test(e.textContent));if(h)scrollTo(0,h.closest('section').getBoundingClientRect().top+scrollY-20);});await p.waitForTimeout(500);
await p.screenshot({path:'verify/cityu-card.png', clip:{x:0,y:0,width:1440,height:480}});
await b.close();console.log('shots done');
