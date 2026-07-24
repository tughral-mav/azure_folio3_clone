import { chromium } from 'playwright-core';
import fs from 'node:fs';

const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const OUT = '/home/user/azure_folio3_clone/azure-clone-next/public/downloads/azure-finops-cheat-sheet.pdf';
const logoSvg = fs.readFileSync('/home/user/azure_folio3_clone/azure-clone-next/public/wp-content/uploads/2022/06/folio3_by_azure.svg', 'utf8');
const logoData = 'data:image/svg+xml;base64,' + Buffer.from(logoSvg).toString('base64');

const pillars = [
  { n: 1, name: 'Commit & License Smarter', blurb: 'The fastest savings on steady-state workloads — pay less for what you are already running.',
    tactics: [
      { t: 'Reserved Instances & Savings Plans', save: 'Up to ~72%', how: 'Commit to 1- or 3-year usage on predictable workloads (VMs, SQL, Cosmos DB). Azure Savings Plans for Compute give similar discounts with more flexibility across VM families and regions. Start with your always-on production baseline.', trap: 'Buy against your true steady-state floor, not your peak — over-committing locks in spend you will not use.' },
      { t: 'Azure Hybrid Benefit', save: '80%+ stacked', how: 'Apply Windows Server and SQL Server licenses with Software Assurance to Azure VMs and SQL to drop the compute/license rate. Combined with Reserved Instances, savings on Windows VMs can reach 80%+.', trap: 'Track license entitlements so you stay compliant while you claim the benefit.' },
      { t: 'Spot Virtual Machines', save: 'Up to ~90%', how: 'Use Azure spare capacity for interruptible, stateless, or batch work — CI/CD runners, rendering, big-data jobs, dev sandboxes.', trap: 'Spot VMs can be evicted on short notice; use them only where a restart is cheap.' },
      { t: 'Dev/Test Pricing & Subscriptions', save: 'Reduced rates', how: 'Move dev, test, QA, and staging estates onto Azure Dev/Test subscriptions for reduced rates and waived per-hour Windows charges on eligible plans.', trap: 'Dev/Test subscriptions are for non-production use only — keep production separate.' },
    ] },
  { n: 2, name: 'Eliminate Waste', blurb: 'Stop paying for capacity nobody is using.',
    tactics: [
      { t: 'Right-Size Over-Provisioned Resources', save: 'Often the biggest win', how: 'Use Azure Advisor and Azure Monitor metrics to find VMs and databases running under 20% CPU/memory and step them down a size (or to a newer, cheaper series).', trap: 'Right-size against sustained load, not a one-off spike — keep headroom for real peaks.' },
      { t: 'Auto-Shutdown Idle Environments', save: '~65% of non-prod', how: 'Schedule auto-shutdown (built into Azure VMs) or automation runbooks for dev/test/staging. A machine running 45 hrs/week instead of 168 costs about a third as much.', trap: 'Exclude anything that runs scheduled overnight jobs before you switch it off.' },
      { t: 'Delete Orphaned Resources', save: 'Recurring monthly', how: 'Sweep unattached managed disks, unassociated public IPs, stale snapshots, idle load balancers, empty App Service plans, and old NICs with Azure Resource Graph and Cost Management, then delete or archive.', trap: 'Confirm a resource is truly orphaned before deleting — check dependencies first.' },
      { t: 'Storage Lifecycle Tiering', save: 'Up to ~80% on cold data', how: 'Apply Blob lifecycle-management policies to auto-move data from Hot to Cool to Archive by age or last access.', trap: 'Archive has retrieval latency and cost — tier by how quickly you may need the data back.' },
    ] },
  { n: 3, name: 'Scale Efficiently', blurb: 'Match capacity to demand automatically, so you pay for load — not headroom.',
    tactics: [
      { t: 'Autoscale On Demand', save: 'Cuts off-peak spend', how: 'Use VM Scale Sets, App Service, and AKS autoscale with sensible min/max bounds, scaling on the metric that actually drives your load.', trap: 'Tune scale-in cooldowns so you do not thrash capacity up and down.' },
      { t: 'Optimize AKS & Containers', save: 'Reclaims cluster waste', how: 'Right-size pod requests/limits, enable the cluster autoscaler, bin-pack workloads, move fault-tolerant node pools to Spot, and consider the Vertical Pod Autoscaler.', trap: 'Set pod disruption budgets so autoscaling and Spot evictions do not break availability.' },
      { t: 'Right-Tier PaaS Databases', save: 'Idle-time savings', how: 'Move DTU to vCore where cheaper, consolidate small databases into elastic pools, and use the serverless (auto-pause) tier for spiky or intermittent workloads.', trap: 'Serverless resume adds a small cold-start delay — fine for intermittent, not for latency-critical.' },
      { t: 'Cut Egress & Data-Transfer Costs', save: 'Silent line item', how: 'Keep chatty services in the same region and zone, use Private Link/private endpoints, cache at the edge with Azure CDN/Front Door, and avoid unnecessary cross-region replication.', trap: 'Watch cross-region reads from analytics and backups — they add up quietly.' },
    ] },
  { n: 4, name: 'Govern & Sustain the Savings', blurb: 'The difference between a one-time cleanup and durable cost control.',
    tactics: [
      { t: 'Budgets, Tags & Azure Policy', save: 'Enables ownership', how: 'Enforce a tagging standard (owner, environment, cost-center) with Azure Policy, set budgets with alerts per subscription/resource group, and turn on cost anomaly detection to enable showback/chargeback.', trap: 'Tags are only useful if enforced — make them mandatory at resource creation.' },
      { t: 'Work Advisor & Cost Management', save: 'Free, ongoing', how: 'Azure Advisor already surfaces right-size, reservation, and idle-resource recommendations. Make a monthly FinOps review that works the Advisor + Cost Management backlog a routine.', trap: 'Do not action recommendations blindly — validate each against real usage patterns.' },
      { t: 'Modernize to Serverless', save: 'Idle time is free', how: 'Re-platform spiky workloads — event processing, scheduled jobs, uneven-traffic APIs — to Azure Functions and Container Apps (consumption) so you pay per execution.', trap: 'Very high-volume steady workloads can cost more on consumption — model before you move.' },
    ] },
];

const checklist = [
  ['Week 1 — See it', 'Turn on Cost Management + anomaly alerts. Tag your top subscriptions. Pull the Advisor cost recommendations. Identify your always-on baseline.'],
  ['Week 2 — Cut waste', 'Delete orphaned disks/IPs/snapshots. Add auto-shutdown to all non-prod. Apply Blob lifecycle policies. Right-size the top 10 over-provisioned resources.'],
  ['Week 3 — Commit', 'Buy Reserved Instances / a Savings Plan for the baseline. Apply Azure Hybrid Benefit. Move eligible batch work to Spot. Switch non-prod to Dev/Test pricing.'],
  ['Week 4 — Sustain', 'Enable autoscale where capacity is static. Set budgets per team. Book the recurring monthly FinOps review. Pick one workload to modernize to serverless.'],
];

const mondayFive = [
  'What are my 10 most expensive resources this month, and is each one right-sized?',
  'How much non-production compute is running right now, outside business hours?',
  'What is my reservation / savings-plan coverage on always-on workloads?',
  'Which resources have no owner or environment tag?',
  'What is Azure Advisor recommending under Cost right now — and who owns actioning it?',
];

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1b2233; font-size: 11.5px; line-height: 1.55; }
  .page { page-break-after: always; padding: 46px 54px; position: relative; min-height: 100vh; }
  .page:last-child { page-break-after: auto; }
  h1,h2,h3 { color: #0a1560; line-height: 1.15; }
  .brandbar { height: 6px; background: linear-gradient(90deg,#143CD5,#2F69F2); border-radius: 3px; }
  /* cover */
  .cover { background: linear-gradient(150deg,#0a1560 0%,#143CD5 55%,#2F69F2 100%); color: #fff; display: flex; flex-direction: column; justify-content: center; }
  .cover .logo { position: absolute; top: 46px; left: 54px; background:#fff; padding:10px 16px; border-radius:8px; }
  .cover .logo img { height: 30px; display:block; }
  .cover .kicker { text-transform: uppercase; letter-spacing: 3px; font-size: 12px; font-weight: 700; color: #bcd0ff; }
  .cover h1 { color: #fff; font-size: 40px; margin: 16px 0 10px; max-width: 90%; }
  .cover .accent { color: #8ff0d8; }
  .cover p.sub { font-size: 15px; color: #dbe6ff; max-width: 78%; margin-top: 6px; }
  .cover .foot { position: absolute; bottom: 46px; left: 54px; right: 54px; font-size: 11px; color: #cfe0ff; display:flex; justify-content:space-between; }
  .cover .badge { display:inline-block; margin-top: 26px; background: rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.3); padding: 10px 16px; border-radius: 999px; font-weight:700; font-size:12px; }
  /* headers */
  .phead { display:flex; align-items:center; justify-content:space-between; border-bottom: 2px solid #eef1fb; padding-bottom: 14px; margin-bottom: 20px; }
  .phead .mini { height: 20px; }
  .phead .pg { font-size: 11px; color: #6b7690; }
  /* toc */
  .toc h2 { font-size: 24px; margin-bottom: 6px; }
  .toc .lead { color:#586179; margin-bottom: 20px; }
  .tocrow { display:flex; align-items:baseline; gap: 10px; padding: 9px 0; border-bottom: 1px dashed #dfe4f3; }
  .tocrow .num { width: 26px; height: 26px; flex: none; background:#eef1fb; color:#143CD5; border-radius:7px; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center; }
  .tocrow .t { font-weight:600; color:#1b2233; }
  .tocrow .pill { margin-left:auto; font-size:10px; font-weight:700; color:#0f9d6f; background:#e7f8f0; padding:3px 9px; border-radius:999px; white-space:nowrap; }
  .pillar-toc { margin: 18px 0 6px; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1.5px; color:#143CD5; }
  /* pillar page */
  .pillar-hero { background: linear-gradient(120deg,#143CD5,#2F69F2); color:#fff; border-radius:14px; padding: 22px 26px; margin-bottom: 22px; }
  .pillar-hero .pn { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#cfe0ff; font-weight:700; }
  .pillar-hero h2 { color:#fff; font-size:25px; margin:6px 0 8px; }
  .pillar-hero p { color:#e3ecff; font-size:12px; max-width: 92%; }
  .tactic { border:1px solid #e7ebf7; border-radius:12px; padding: 16px 18px; margin-bottom: 14px; }
  .tactic .th { display:flex; align-items:center; gap:12px; }
  .tactic .tnum { width:30px;height:30px;flex:none;background:#0a1560;color:#fff;border-radius:8px;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center; }
  .tactic h3 { font-size:15px; }
  .tactic .save { margin-left:auto; font-size:10px; font-weight:800; color:#0f9d6f; background:#e7f8f0; padding:4px 10px; border-radius:999px; white-space:nowrap; }
  .tactic .how { margin: 10px 0 8px; color:#39435c; }
  .tactic .trap { font-size:10.5px; color:#7a5200; background:#fff7e6; border-left:3px solid #f4b400; padding:7px 11px; border-radius:0 8px 8px 0; }
  .tactic .trap b { color:#9a6a00; }
  /* generic content */
  h2.sec { font-size:23px; margin-bottom:4px; }
  .sub { color:#586179; margin-bottom:18px; }
  .ck { border:1px solid #e7ebf7; border-radius:12px; padding:15px 18px; margin-bottom:12px; }
  .ck h3 { font-size:14px; color:#143CD5; margin-bottom:5px; }
  .mon { display:flex; gap:12px; padding:11px 0; border-bottom:1px solid #eef1fb; }
  .mon .q { width:26px;height:26px;flex:none;background:#eef1fb;color:#143CD5;border-radius:50%;font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center; }
  .cta { background:linear-gradient(150deg,#0a1560,#143CD5); color:#fff; border-radius:16px; padding:34px 34px; margin-top:26px; text-align:center; }
  .cta h2 { color:#fff; font-size:24px; }
  .cta p { color:#dbe6ff; max-width:80%; margin:10px auto 18px; }
  .cta .btn { display:inline-block; background:#8ff0d8; color:#06341f; font-weight:800; padding:12px 26px; border-radius:999px; font-size:13px; }
  .cta .url { margin-top:14px; font-size:12px; color:#bcd0ff; }
  .foot-note { position:absolute; bottom:26px; left:54px; right:54px; font-size:9.5px; color:#9aa3b8; border-top:1px solid #eef1fb; padding-top:8px; display:flex; justify-content:space-between; }
`;

const miniHeader = (label) => `<div class="phead"><img class="mini" src="${logoData}"/><div class="pg">${label}</div></div>`;
const footNote = `<div class="foot-note"><span>The Azure FinOps Cheat Sheet — Folio3 Azure</span><span>azure.folio3.com/azure-finops-cheat-sheet</span></div>`;

let tocRows = '';
let n = 0;
for (const p of pillars) {
  tocRows += `<div class="pillar-toc">Pillar ${p.n} · ${p.name}</div>`;
  for (const t of p.tactics) { n++; tocRows += `<div class="tocrow"><span class="num">${n}</span><span class="t">${t.t}</span><span class="pill">${t.save}</span></div>`; }
}

let pillarPages = '';
let gi = 0;
for (const p of pillars) {
  let tacticsHtml = '';
  for (const t of p.tactics) { gi++; tacticsHtml += `
    <div class="tactic">
      <div class="th"><span class="tnum">${gi}</span><h3>${t.t}</h3><span class="save">${t.save}</span></div>
      <p class="how">${t.how}</p>
      <div class="trap"><b>Watch out:</b> ${t.trap}</div>
    </div>`; }
  pillarPages += `<div class="page">${miniHeader(`Pillar ${p.n} of 4`)}
    <div class="pillar-hero"><div class="pn">Pillar ${p.n}</div><h2>${p.name}</h2><p>${p.blurb}</p></div>
    ${tacticsHtml}
    ${footNote}
  </div>`;
}

const checklistHtml = checklist.map(([h, b]) => `<div class="ck"><h3>${h}</h3><p>${b}</p></div>`).join('');
const mondayHtml = mondayFive.map((q, i) => `<div class="mon"><span class="q">${i + 1}</span><p>${q}</p></div>`).join('');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>

<div class="page cover">
  <div class="logo"><img src="${logoData}"/></div>
  <div class="kicker">Azure Cost Optimization · FinOps</div>
  <h1>The Azure FinOps Cheat Sheet<br><span class="accent">15 Ways to Cut Your Azure Bill by 30%+</span></h1>
  <p class="sub">A field-tested playbook for IT and infrastructure leaders — eliminate cloud waste, right-size your commitments, and put real governance around spend, without compromising performance.</p>
  <div><span class="badge">15 tactics · 4 pillars · a 30-day action plan</span></div>
  <div class="foot"><span>Folio3 Azure — Microsoft Solutions Partner</span><span>azure.folio3.com</span></div>
</div>

<div class="page toc">
  ${miniHeader('Contents')}
  <h2 class="sec">What's Inside</h2>
  <p class="sub">Fifteen high-ROI levers, grouped into four moves. Most need no re-architecture — start at the top and work down.</p>
  ${tocRows}
  ${footNote}
</div>

${pillarPages}

<div class="page">
  ${miniHeader('Action Plan')}
  <h2 class="sec">Your 30-Day FinOps Action Plan</h2>
  <p class="sub">A simple cadence to turn this cheat sheet into recovered spend — one focused week at a time.</p>
  ${checklistHtml}
  <h2 class="sec" style="margin-top:24px">First Five Things to Check on Monday</h2>
  <p class="sub">Open Azure Cost Management and answer these. The gaps are your fastest wins.</p>
  ${mondayHtml}
  ${footNote}
</div>

<div class="page">
  ${miniHeader('Next Step')}
  <div class="cta">
    <h2>Want us to find the 30% in your Azure bill?</h2>
    <p>Folio3's engineers run these exact levers on enterprise Azure estates every week. Book a free Azure cost review and we'll pinpoint your top savings opportunities — no obligation.</p>
    <span class="btn">Book a Free Azure Cost Review</span>
    <div class="url">azure.folio3.com/azure-finops-cheat-sheet</div>
  </div>
  <p style="text-align:center;margin-top:26px;color:#586179;font-size:11px">Folio3 Azure — Microsoft Solutions Partner for Azure cloud, data and AI.<br>5000+ projects delivered · 1000+ companies served · 700+ engineers worldwide.</p>
  ${footNote}
</div>

</body></html>`;

const b = await chromium.launch({ executablePath: EXE });
const p = await b.newPage();
await p.setContent(html, { waitUntil: 'networkidle' });
await p.pdf({ path: OUT, format: 'A4', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
await p.setViewportSize({ width: 794, height: 1123 });
await p.screenshot({ path: '/tmp/claude-0/-home-user-azure-folio3-clone/8e1d5504-6670-581f-bdbf-cbbcb9181779/scratchpad/pdf_preview.png', fullPage: true });
await b.close();
const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log('PDF written:', OUT, kb + ' KB');
