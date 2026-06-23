import { readFileSync, writeFileSync } from 'node:fs';
const heads=JSON.parse(readFileSync('verify/headings.json','utf8'));
const exPath='azure-clone-next/content-kit/agent-extras.json';
const ex=JSON.parse(readFileSync(exPath,'utf8'));
const CONTENT='azure-clone-next/content-kit/content/';
for(const [slug,h] of Object.entries(heads)){
  ex[slug]=ex[slug]||{};
  // AI advantage heading (the captured h2 the renderer sees)
  if(h.advHeading && h.advHeading!=='null') ex[slug].advHeading=h.advHeading;
  // video heading = the section immediately BEFORE a "Ready to ..." section in the captured content
  try{
    const j=JSON.parse(readFileSync(CONTENT+slug+'.json','utf8'));
    const secs=(j.sections||[]).map(s=>{const hh=(s.items||[]).find(it=>it.t==='h');return hh?hh.text:'';});
    const readyIdx=secs.findIndex(t=>/^\s*ready to /i.test(t));
    if(readyIdx>0){ex[slug].videoHeading=secs[readyIdx-1];}
  }catch{}
  console.log(slug.replace(/^ai_(agents|powered_solutions)_/,'')+' -> adv:"'+(ex[slug].advHeading||'(none)')+'" video:"'+(ex[slug].videoHeading||'(none)').slice(0,40)+'"');
}
writeFileSync(exPath,JSON.stringify(ex,null,1));
