import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1800);
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  // the "What Do You Get" intro section + the 4 tab labels
  const wh=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/what do you get/i.test(txt(e)));
  const whSec=wh?.closest('.elementor-top-section');
  const tabLabels=[...(whSec?.querySelectorAll('a,button,.elementor-tab-title,[role="tab"]')||[])].map(e=>({text:txt(e).slice(0,42),href:e.getAttribute('href'),role:e.getAttribute('role'),cls:(e.className||'').toString().split(' ').filter(c=>/tab|button|active/i.test(c)).join(' ')})).filter(x=>x.text);
  // the 4 feature sections (5-8): heading + layout (image + text?)
  const featTitles=['Intelligent Sourcing','One-Click Interview','Interview Insights','Seamless Offer'];
  const feats=featTitles.map(t=>{const h=[...document.querySelectorAll('h2,h3,.elementor-heading-title')].find(e=>txt(e).startsWith(t));const sec=h?.closest('.elementor-top-section');if(!sec)return{title:t,err:'no sec'};const imgs=[...sec.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').pop().split('?')[0]).filter(s=>!/svg%|folio3_by/i.test(s));const cols=sec.querySelectorAll('.elementor-column').length;const lists=[...sec.querySelectorAll('li')].length;return {title:t, imgs:[...new Set(imgs)].slice(0,3), cols, listItems:lists};});
  // video section
  const vh=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/tired of admin|recruiter take over|ready to make recruitment/i.test(txt(e)));
  return {whHeading:txt(wh), whSubtitle:txt(whSec?.querySelector('p,.elementor-widget-text-editor')).slice(0,90), tabLabels, feats, videoHeading:txt(vh).slice(0,55)};
});
console.log(JSON.stringify(out,null,1));
// screenshots
for(const [name,re] of [['whatyouget','what do you get'],['feature1','Intelligent Sourcing']]){
  const y=await p.evaluate((rs)=>{const re=new RegExp(rs,'i');const h=[...document.querySelectorAll('h2,h3,.elementor-heading-title')].find(e=>re.test(e.textContent||''));return h?h.closest('.elementor-top-section').getBoundingClientRect().top+scrollY:0;},re);
  await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-20)),y);await p.waitForTimeout(500);
  await p.screenshot({path:`verify/dw-${name}.png`,clip:{x:0,y:0,width:1280,height:600}});
}
await b.close();
