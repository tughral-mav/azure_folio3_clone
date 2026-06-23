import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,300);y+=300;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},25);});});
await p.waitForTimeout(2000);
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/the ai advantage/i.test(txt(e)));
  const sec=h.closest('.elementor-top-section');
  // every element in section with a background-image url
  const bgs=[];
  sec.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e);const bg=cs.backgroundImage;if(bg&&bg!=='none'&&bg.includes('url')&&bg.includes('wp-content')){const r=e.getBoundingClientRect();bgs.push({file:(bg.match(/uploads\/[^"')]+/)||[''])[0].split('/').pop(),w:Math.round(r.width),h:Math.round(r.height),cls:(e.className||'').toString().slice(0,30)});}});
  // card bg color: find the 4 columns containing the titles
  const titles=['Cut Resume Screening','Productivity Gained','Lower Cost-per-Hire','Match the Right Talent'];
  const cardInfo=titles.map(t=>{const head=[...sec.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title')].find(e=>txt(e).startsWith(t.split(' ').slice(0,3).join(' ')));let box=head,found=null;for(let k=0;k<10&&box;k++){box=box.parentElement;if(!box)break;const cs=getComputedStyle(box);const bg=cs.backgroundColor;if(bg&&bg!=='rgba(0, 0, 0, 0)'){found={bg,radius:cs.borderRadius,shadow:cs.boxShadow.slice(0,40),pad:cs.padding,transition:cs.transition.slice(0,40)};break;}}return {title:t.slice(0,20),...found};});
  return {bgImages:[...new Map(bgs.map(x=>[x.file,x])).values()], cardInfo, secCls:(sec.className||'').toString()};
});
console.log(JSON.stringify(out,null,1));
await b.close();
