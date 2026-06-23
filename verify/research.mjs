import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1100},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1800);
// PART A: AI Advantage icon box geometry on HOVER
const card=p.locator('.elementor-icon-box-wrapper').filter({hasText:'Cut Resume Screening'}).first();
await card.hover({force:true});await p.waitForTimeout(500);
const iconBox=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();const head=[...document.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].find(e=>/^Cut Resume Screening/i.test(txt(e)));const box=head.closest('.elementor-widget-icon-box,.elementor-icon-box-wrapper');
  const elIcon=box.querySelector('.elementor-icon');const elIconBoxIcon=box.querySelector('.elementor-icon-box-icon');const svg=box.querySelector('svg');
  const m=(el)=>{if(!el)return null;const r=el.getBoundingClientRect();const cs=getComputedStyle(el);return {w:Math.round(r.width),h:Math.round(r.height),radius:cs.borderRadius,pad:cs.padding,bg:cs.backgroundColor,display:cs.display};};
  return {elementorIcon:m(elIcon), iconBoxIcon:m(elIconBoxIcon), svg:m(svg)};});
console.log('PART A — AI Advantage icon box (HOVER):');
console.log(JSON.stringify(iconBox,null,1));
// PART B: tab panel sub-feature icons + tab button icons
const tabInfo=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
  const tabBtns=[...document.querySelectorAll('.elementor-tab-title')].slice(0,4).map(t=>({label:txt(t).slice(0,30),hasIcon:!!t.querySelector('svg,img,i[class]'),iconType:t.querySelector('svg')?'svg':t.querySelector('img')?'img':t.querySelector('i')?'i':'none'}));
  // active panel sub-features
  const panel=document.querySelector('.elementor-tab-content.elementor-active')||document.querySelector('.elementor-tab-content');
  const subs=panel?[...panel.querySelectorAll('.elementor-icon-box-wrapper,.elementor-icon-list-item')].slice(0,5).map(s=>{const ic=s.querySelector('svg,img,i[class]');return {title:txt(s.querySelector('h3,h4,h5,.elementor-icon-box-title,.elementor-icon-list-text')).slice(0,34),iconType:ic?ic.tagName:'NONE',svgPaths:ic?.tagName==='svg'?ic.querySelectorAll('path').length:0};}):[];
  return {tabBtns,subFeatures:subs};});
console.log('PART B — tab buttons + sub-feature icons:');
console.log(JSON.stringify(tabInfo,null,1));
await b.close();
