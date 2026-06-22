import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('http://localhost:3000/',{waitUntil:'networkidle',timeout:60000});
// open Services dropdown then hover "Azure Data Analytics" to show the flyout
const services=p.locator('nav[aria-label="Primary"] button:has-text("Services")');
await services.hover();await p.waitForTimeout(400);
const ada=p.locator('nav[aria-label="Primary"] a:has-text("Azure Data Analytics")');
await ada.hover();await p.waitForTimeout(500);
const flyoutLinks=await p.locator('nav[aria-label="Primary"] .absolute .absolute a').allInnerTexts();
console.log('Services→Azure Data Analytics flyout links:', JSON.stringify(flyoutLinks));
await p.screenshot({path:'verify/nav-flyout.png',clip:{x:0,y:0,width:760,height:430}});
// cards
await p.goto('http://localhost:3000/ai-scenario-library/',{waitUntil:'networkidle',timeout:60000});
await p.evaluate(()=>{const el=[...document.querySelectorAll('h2')].find(e=>/Explore Copilot Agents By Industry/i.test(e.textContent));el?.scrollIntoView({block:'start'});});
await p.waitForTimeout(800);
await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('img')].map(i=>i.complete?1:new Promise(r=>{i.addEventListener('load',r);setTimeout(r,3000);})));});
await p.waitForTimeout(600);
const y=await p.evaluate(()=>{const el=[...document.querySelectorAll('h2')].find(e=>/Explore Copilot Agents By Industry/i.test(e.textContent));return el.getBoundingClientRect().top+scrollY;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-20)),y);await p.waitForTimeout(500);
await p.screenshot({path:'verify/cards-after.png',clip:{x:0,y:0,width:1280,height:620}});
await b.close();console.log('shots done');
