import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const titles=['Cut Resume Screening','Productivity Gained','Lower Cost-per-Hire','Match the Right Talent'];
const res=[];
for(const t of titles){
  const card=p.locator('.elementor-icon-box-wrapper').filter({hasText:t.split(' ').slice(0,3).join(' ')}).first();
  // normal icon count
  const before=await card.evaluate(el=>{const box=el.querySelector('.elementor-icon-box-icon')||el;return {svgCount:box.querySelectorAll('svg').length, htmlLen:box.innerHTML.length};});
  await card.hover({force:true});await p.waitForTimeout(500);
  const after=await card.evaluate(el=>{const box=el.querySelector('.elementor-icon-box-icon')||el;const svgs=[...box.querySelectorAll('svg')];const vis=svgs.find(s=>getComputedStyle(s).display!=='none'&&getComputedStyle(s).opacity!=='0')||svgs[svgs.length-1];return {svgCount:svgs.length, visibleSvg:vis?vis.outerHTML:null};});
  res.push({title:t,beforeSvgs:before.svgCount,afterSvgs:after.svgCount,filledSvgLen:after.visibleSvg?.length||0});
  if(t===titles[0])writeFileSync('verify/hover-icon-sample.json',JSON.stringify(after,null,1));
}
console.log(JSON.stringify(res,null,1));
await b.close();
