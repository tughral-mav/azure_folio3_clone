import { readFileSync } from 'node:fs';
const j=JSON.parse(readFileSync('azure-clone-next/content-kit/content/ai_agents_it_asset_management_agent.json','utf8'));
const secs=j.sections||[];
secs.forEach((s,i)=>{const items=s.items||[];const firstH=items.find(it=>it.t==='h');const allH=items.filter(it=>it.t==='h').map(it=>it.tag+':'+it.text.slice(0,28));
  console.log('sec'+i+' firstHeading=['+(firstH?firstH.tag:'-')+'] "'+(firstH?firstH.text.slice(0,44):'(none)')+'"');
});
