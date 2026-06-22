import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:700}});
await p.goto('http://localhost:3000/',{waitUntil:'networkidle',timeout:60000});
await p.locator('nav[aria-label="Primary"] button:has-text("Services")').hover();await p.waitForTimeout(350);
const ada=p.locator('nav[aria-label="Primary"] a:has-text("Azure Data Analytics")');
await ada.hover();await p.waitForTimeout(400);
// computed colors of the hovered parent link
const c=await ada.evaluate(el=>{const s=getComputedStyle(el);return {color:s.color,bg:s.backgroundColor,visibleText:el.textContent.trim()};});
console.log('Azure Data Analytics (hovered):',JSON.stringify(c));
await p.screenshot({path:'verify/nav-hover.png',clip:{x:280,y:0,width:760,height:430}});
await b.close();
