import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1100},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1800);
const out=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
  // find every element whose text is exactly/contains "Recruit Flow Copilot"
  const hits=[...document.querySelectorAll('*')].filter(e=>e.children.length<=3&&/recruit ?flow copilot/i.test(txt(e))&&txt(e).length<40);
  const res=hits.slice(0,6).map(e=>{const img=e.querySelector('img');const cs=getComputedStyle(e);return {tag:e.tagName,cls:(e.className||'').toString().slice(0,45),text:txt(e).slice(0,30),img:img?(img.currentSrc||img.src||img.getAttribute('data-src')||'').split('/').pop().split('?')[0]:'(no img)',bg:cs.backgroundColor,inPanel:!!e.closest('.elementor-tab-content')};});
  // also: do tab panels each have this badge? count per panel
  const panels=[...document.querySelectorAll('.elementor-tab-content')].slice(0,4).map((pan,i)=>{const badge=[...pan.querySelectorAll('*')].find(e=>/recruit ?flow copilot/i.test(txt(e))&&txt(e).length<40);const img=badge?.querySelector('img');return {tab:i,hasBadge:!!badge,badgeText:txt(badge).slice(0,28),badgeImg:img?(img.currentSrc||img.src).split('/').pop().split('?')[0]:'(none)'};});
  return {hits:res, perPanel:panels};
});
console.log(JSON.stringify(out,null,1));
await b.close();
