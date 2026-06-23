import { readFileSync, writeFileSync } from 'node:fs';
const tcPath='azure-clone-next/content-kit/tabs-content.json';
const tc=JSON.parse(readFileSync(tcPath,'utf8'));
const wyg=JSON.parse(readFileSync('verify/wyg.json','utf8'));
let fixedTabs=0, totalRemoved=0, iconified=0;
for(const [key,entry] of Object.entries(tc)){
  const secs=Array.isArray(entry)?entry:[entry];
  for(const s of secs){
    for(let ti=0;ti<(s.tabs||[]).length;ti++){
      const tab=s.tabs[ti];
      const seen=new Set();const deduped=[];
      for(const it of (tab.items||[])){const k=(it.title||'').toLowerCase().trim();if(k&&seen.has(k))continue;seen.add(k);deduped.push(it);}
      if(deduped.length!==(tab.items||[]).length){fixedTabs++;totalRemoved+=(tab.items.length-deduped.length);}
      tab.items=deduped;
      const w=wyg[key];
      if(w&&w.tabIcons&&w.tabIcons[ti]){deduped.forEach((it,ii)=>{const ic=w.tabIcons[ti][ii];if(ic&&ic.startsWith('<svg')){it.icon=ic;iconified++;}});}
    }
  }
}
writeFileSync(tcPath,JSON.stringify(tc));
console.log('deduped '+fixedTabs+' tabs site-wide (removed '+totalRemoved+' dup items); injected '+iconified+' icons');
// remove now-redundant whatYouGet from agent-extras for the 3 tabRec pages (recruit keeps its own)
const exPath='azure-clone-next/content-kit/agent-extras.json';const ex=JSON.parse(readFileSync(exPath,'utf8'));
for(const k of ['ai_agents_it_asset_management_agent','ai_agents_kubemonitor_agent','ai_agents_ai_powered_ticketing_and_customer_service_agent']){if(ex[k]?.whatYouGet){delete ex[k].whatYouGet;console.log('  removed redundant whatYouGet from '+k.replace('ai_agents_',''));}}
writeFileSync(exPath,JSON.stringify(ex,null,1));
