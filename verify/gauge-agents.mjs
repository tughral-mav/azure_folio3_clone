import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PAGES=[
  ['smartexpense','/ai-agents/smartexpense-agent/'],
  ['it-asset','/ai-agents/it-asset-management-agent/'],
  ['kube','/ai-agents/kubemonitor-agent/'],
  ['ticketing','/ai-agents/ai-powered-ticketing-and-customer-service-agent/'],
];
const b=await chromium.launch();
for(const [name,route] of PAGES){
  const p=await b.newPage({viewport:{width:1280,height:1100},userAgent:UA});
  try{
    await p.goto('https://azure.folio3.com'+route,{waitUntil:'networkidle',timeout:90000});
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},22);});});
    await p.waitForTimeout(1500);
    const d=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
      const h1=[...document.querySelectorAll('h1')].find(h=>txt(h).length>3);
      const hero=h1?.closest('.elementor-top-section');
      // hero stat items in DOM order: counters + short icon-boxes
      const items=hero?[...hero.querySelectorAll('.elementor-counter, .elementor-icon-box-wrapper')]:[];
      const heroStats=items.map(el=>{if(el.classList.contains('elementor-counter')){const n=el.querySelector('.elementor-counter-number');return {type:'counter',to:parseFloat(n?.getAttribute('data-to-value'))||0,suffix:txt(el.querySelector('.elementor-counter-number-suffix')),label:txt(el.querySelector('.elementor-counter-title'))};}else{const desc=txt(el.querySelector('.elementor-icon-box-description'));const title=txt(el.querySelector('.elementor-icon-box-title'));if(title.length<46&&desc.length<8)return {type:'icon',label:title,hasIcon:!!el.querySelector('svg,img,i')};return null;}}).filter(Boolean);
      // section outline
      const outline=[...document.querySelectorAll('.elementor-top-section')].map(s=>txt(s.querySelector('h1,h2,.elementor-heading-title')).slice(0,40)).filter(Boolean);
      const hasAdvantage=outline.some(o=>/the ai advantage/i.test(o));
      const hasWhatYouGet=outline.some(o=>/what do you get/i.test(o));
      const tabCount=document.querySelectorAll('.elementor-tab-title.elementor-tab-desktop-title').length;
      return {heroStats,hasAdvantage,hasWhatYouGet,tabCount,outline:outline.slice(0,14)};
    });
    console.log('### '+name);
    console.log('  heroStats:',JSON.stringify(d.heroStats));
    console.log('  hasAIAdvantage:',d.hasAdvantage,'| hasWhatYouGet:',d.hasWhatYouGet,'| tabCount:',d.tabCount);
    console.log('  outline:',d.outline.join(' / '));
  }catch(e){console.log(name+' ERR '+e.message.slice(0,50));}
  await p.close();
}
await b.close();
