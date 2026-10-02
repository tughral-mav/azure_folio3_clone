import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Accordion } from '@/components/sections/Accordion';
import { CaseFlip } from '@/components/sections/CaseFlip';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Reveal } from '@/components/ui/Reveal';
import { CapabilityTabs, type Capability } from './CapabilityTabs';

const ORIGIN = 'https://azure.folio3.com';
const PATH = '/azure-cloud/cloud-migration/';
const FORM = '#pgForm';
const TITLE = 'Azure Cloud Migration Services';
const DESC = "Move servers, apps and databases to Azure with Folio3's Azure cloud migration services. Free assessment, phased plan, ongoing support.";

export const metadata: Metadata = {
  title: TITLE, // layout template appends "| Folio3 Azure"
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} | Folio3 Azure`, description: DESC, type: 'website', url: PATH },
};

const LOGOS = [
  { src: '/wp-content/uploads/2024/01/ias-savills-logo.webp', alt: 'Savills' },
  { src: '/wp-content/uploads/2024/01/ias-cityu-logo.webp', alt: 'City University of Seattle' },
  { src: '/wp-content/uploads/2024/01/ias-daraz-logo.webp', alt: 'Daraz' },
];

const ICON_PATHS: Record<string, string> = {
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  wallet: 'M3 7a2 2 0 0 1 2-2h12v3M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-1Zm13 6h2',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
  server: 'M4 4h16v6H4zM4 14h16v6H4zM7.5 7h.01M7.5 17h.01',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17.5l9 5 9-5',
  network: 'M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4',
  drive: 'M4 14h16v6H4zM4 14l2.5-8h11L20 14M7.5 17h.01',
  database: 'M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3',
  chart: 'M4 4v16h16M9 16v-5M13 16V8M17 16v-8',
  cloud: 'M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9.5 4 4 0 0 1 17.5 18H7Z',
  code: 'm8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14',
  shield: 'M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6L12 3Zm-3 9 2.2 2.2L15.5 10',
  backup: 'M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4M12 8v4l3 2',
  box: 'm12 3 8 4.5v9L12 21l-8-4.5v-9L12 3ZM4 7.5l8 4.5 8-4.5M12 12v9',
  spark: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Zm7 11 .8 2.2 2.2.8-2.2.8L19 20l-.8-2.2-2.2-.8 2.2-.8L19 14Z',
};

const WHY_AZURE = [
  { icon: 'bolt', t: 'Scale on demand', d: 'Add compute and storage in minutes instead of buying hardware.' },
  { icon: 'wallet', t: 'Pay for what you use', d: 'Move capital spend to monthly operating costs you can right-size.' },
  { icon: 'lock', t: 'Stronger security', d: 'Microsoft Defender for Cloud, Entra ID and Azure Policy protect workloads from day one.' },
  { icon: 'spark', t: 'Ready for AI and analytics', d: 'Data in Azure connects directly to Microsoft Fabric, Azure AI and Copilot.' },
];

const CHALLENGES = [
  { t: "You don't know what depends on what.", d: 'We map servers, apps, databases and their dependencies before anything moves. Then we classify and prioritize workloads by business value and complexity.' },
  { t: 'Downtime would hurt the business.', d: 'We migrate in waves, start with a low-risk pilot, and schedule cutovers in your quiet hours.' },
  { t: 'The cloud bill could surprise you.', d: 'We build a total cost of ownership estimate and right-size every resource before migration, not after.' },
  { t: 'Security and compliance gaps.', d: 'We set up identity, network segmentation, access policies and backup in Azure before the first workload lands.' },
  { t: 'Your team lacks Azure skills.', d: 'Certified Folio3 engineers do the heavy lifting, document everything, and train your team at handover.' },
];

const SERVICES: { icon: string; t: string; d: string; link?: { text: string; href: string } }[] = [
  { icon: 'server', t: 'Lift-and-Shift to Azure', d: "Move servers and VMs to Azure as they are, with no code changes. It's the fastest way out of a data center before a lease or hardware renewal." },
  { icon: 'layers', t: 'Replatforming', d: 'Upgrade operating systems and software while you move, and switch to managed services such as Azure SQL and Azure App Service to cut maintenance.' },
  { icon: 'spark', t: 'Application Modernization', d: 'Refactor or rebuild legacy apps as cloud-native services on AKS, App Service or Azure Functions so they scale and ship faster.', link: { text: 'Modernize your app with Azure', href: '/blog/modernize-your-app-with-azure/' } },
  { icon: 'network', t: 'Hybrid Setups', d: 'Keep some systems on-premises and run others in Azure, managed as one estate. This works well for regulated data or phased moves.', link: { text: 'Managing hybrid cloud with Azure Arc', href: '/blog/managing-hybrid-cloud-with-azure-arc/' } },
  { icon: 'drive', t: 'Server and VM Migration', d: 'Migrate Windows Server and Linux workloads from on-premises to Azure virtual machines, with tested cutovers.' },
  { icon: 'database', t: 'Database Migration', d: 'Move SQL Server, MySQL, PostgreSQL and Oracle databases to Azure SQL or Azure Database services, with schema checks and data validation.' },
  { icon: 'chart', t: 'Data Warehouse and Analytics Migration', d: 'Shift legacy warehouses and Azure Synapse workloads to Microsoft Fabric, so data and reporting run on one platform.', link: { text: 'Microsoft Fabric migration', href: '/microsoft-fabric-services/microsoft-fabric-migration/' } },
  { icon: 'cloud', t: 'AWS and Google Cloud to Azure', d: 'Consolidate on Azure from AWS or Google Cloud. We map each service to its Azure equivalent so nothing breaks in transit.' },
];

const CAPABILITIES: Capability[] = [
  { label: 'Cloud Architecture and Planning', icon: ICON_PATHS.network, body: 'We map your existing infrastructure to the right Azure models and design the target environment before any workload moves.' },
  { label: 'DevOps and Automation', icon: ICON_PATHS.code, body: 'Infrastructure as code, CI/CD pipelines, and one-click deployments and rollback make every migration wave repeatable.', link: { text: 'Azure DevOps test automation', href: '/blog/azure-devops-test-automation/' } },
  { label: 'Security and Identity', icon: ICON_PATHS.shield, body: 'Microsoft Entra ID, role-based access, encryption, network segmentation and Defender for Cloud protect data during and after the move.' },
  { label: 'Backup and Disaster Recovery', icon: ICON_PATHS.backup, body: 'Azure Backup and Azure Site Recovery, with a secondary region, keep you running if a region fails.' },
  { label: 'Containers and Kubernetes', icon: ICON_PATHS.box, body: 'We move containerized apps to Azure Kubernetes Service and set up monitoring from day one.', link: { text: 'KubeMonitor agent for AKS', href: '/ai-agents/kubemonitor-agent/' } },
  { label: 'Data and Analytics', icon: ICON_PATHS.chart, body: 'We bring reporting and analytics along, so dashboards work on day one in Azure.', link: { text: 'Cloud data modernization', href: '/microsoft-fabric-services/cloud-data-modernization/' } },
];

const STRATEGIES = [
  { s: 'Rehost (lift-and-shift)', m: 'Move as-is to Azure VMs', b: 'Fast data center exits, stable apps' },
  { s: 'Replatform', m: 'Small changes to use managed services', b: 'Databases and web apps that need less upkeep' },
  { s: 'Refactor', m: 'Change code to use cloud-native services', b: 'Apps that need to scale or release faster' },
  { s: 'Rearchitect / Rebuild', m: 'Redesign or rebuild on Azure services', b: 'Legacy apps blocking growth' },
  { s: 'Retire', m: 'Switch off what no one uses', b: 'Duplicate or unused systems' },
  { s: 'Retain (hybrid)', m: 'Keep on-premises for now, manage with Azure', b: 'Regulated data, systems mid-contract' },
];

const STEPS = [
  { t: 'Discover and assess', d: 'We inventory servers, apps and databases with Azure Migrate, map dependencies and estimate Azure costs.' },
  { t: 'Plan and prioritize', d: 'We map each workload to an Azure model, classify it by value and complexity, and group it into migration waves.' },
  { t: 'Prepare the Azure environment', d: 'We set up subscriptions, networking, identity, security and backup before any workload moves.' },
  { t: 'Run a pilot', d: 'We migrate one low-risk workload first to prove the approach before the rest move.' },
  { t: 'Migrate in waves', d: 'We move the rest wave by wave, test each workload, and cut over in agreed windows.' },
  { t: 'Optimize and hand over', d: 'We right-size resources, tune costs, document the environment and train your team.' },
];

const USE_CASES: { t: string; d: string; link?: { text: string; href: string } }[] = [
  { t: 'Data Center Exit', d: 'Leave on-premises hardware and hosting contracts behind by moving every workload to Azure on a fixed wave plan.' },
  { t: 'ERP and CRM Migration', d: "Move Dynamics AX, Dynamics 365 and Business Central workloads and their integrations to Azure, with help from Folio3's in-house ERP team." },
  { t: 'Legacy App Modernization', d: 'Turn aging .NET and Java apps into cloud-native services that are cheaper to run and easier to change.' },
  { t: 'Analytics and Reporting Migration', d: 'Move reports, data pipelines and warehouses so leaders keep their dashboards on day one.', link: { text: 'Azure data analytics services', href: '/azure-data-analytics/' } },
  { t: 'AI Readiness', d: 'Put your data in Azure so you can build with Azure OpenAI, Copilot and AI agents next.', link: { text: 'Azure AI and data science', href: '/data-science-ai/' } },
  { t: 'Industry Workloads', d: 'Migrate regulated and industry-specific systems for healthcare, manufacturing, retail and logistics, with the right compliance controls.', link: { text: 'Industries we serve', href: '/industries/' } },
];

const STATS = [
  { v: '5,000+', l: 'Projects delivered' },
  { v: '1,000+', l: 'Companies served' },
  { v: '700+', l: 'Global employees' },
  { v: '20+', l: 'Global awards won' },
];

const WHY_FOLIO3 = [
  { t: 'Microsoft-validated', d: 'Solutions Partner in Infrastructure (Azure), Data & AI (Azure), Digital & App Innovation (Azure) and Business Applications.' },
  { t: 'One team for infrastructure, apps, data and ERP', d: 'Your servers, custom apps, data warehouse and Dynamics systems move under one plan instead of three vendors.' },
  { t: 'Global delivery', d: 'Offices in the US, UK, UAE, Canada, Mexico, Pakistan and Bulgaria overlap with your working hours.' },
  { t: 'Round-the-clock support', d: 'Our Azure team monitors and supports your environment after go-live.' },
  { t: 'No surprises', d: 'A fixed wave plan, a pilot before full migration, and cost estimates before you commit.' },
];

const DESIGNATIONS = ['Infrastructure (Azure)', 'Data & AI (Azure)', 'Digital & App Innovation (Azure)', 'Business Applications'];

const COST_POINTS = [
  'Right-size VMs and databases from real usage data gathered during assessment.',
  'Audit your Azure environment after go-live to find further savings.',
  'Set budgets, alerts and Azure Advisor reviews in Azure Cost Management from day one.',
];

const CASES = [
  { title: 'Savills', body: 'Global real-estate services provider listed on the London Stock Exchange — modernized analytics on Azure.', href: '/savills/', img: '/wp-content/uploads/2023/06/savills-cs.webp' },
  { title: 'City University of Seattle', body: 'Highly-rated private university in Seattle — data platform on Azure.', href: '/city-university-azure/', img: '/wp-content/uploads/2023/06/City4.webp' },
];

const RELATED = [
  { t: 'Microsoft Fabric', d: 'Unify data engineering, warehousing and reporting on one platform.', href: '/microsoft-fabric-services/', l: 'Microsoft Fabric services' },
  { t: 'Power Platform', d: 'Build apps and automate workflows on your new Azure data.', href: '/microsoft-power-platform-services/', l: 'Power Platform services' },
  { t: 'Power BI', d: 'Turn migrated data into dashboards leaders use.', href: '/power-bi-services/', l: 'Power BI services' },
  { t: 'AI Agents', d: 'Put AI agents to work on tickets, expenses and IT assets.', href: '/ai-agents/', l: 'Azure AI agents' },
];

const INSIGHTS = [
  { t: 'Synapse to Fabric migration guide', href: '/blog/migration-from-synapse-to-microsoft-fabric/' },
  { t: 'Data warehouse modernization on Azure', href: '/blog/data-warehouse-modernization-azure/' },
  { t: 'Microsoft Azure trends', href: '/blog/microsoft-azure-trends/' },
];

const FAQS = [
  { q: 'What is Azure cloud migration?', a: 'Azure cloud migration is moving servers, applications, databases and data from on-premises data centers or another cloud to Microsoft Azure. It can be a straight move (rehost) or include upgrades and redesigns (replatform, refactor).' },
  { q: 'How long does an Azure migration take?', a: 'It depends on how many workloads you have and how complex they are. A few servers can move in weeks; a full data center exit usually runs several months in waves. You get a timeline after the assessment.' },
  { q: 'How much do Azure cloud migration services cost?', a: 'Cost depends on the number of workloads, the strategy for each, and how much modernization you want. After the assessment, we give you a fixed estimate and an Azure running-cost forecast, and check whether Microsoft funding can offset part of it.' },
  { q: 'What are the main Azure migration strategies?', a: 'The six common strategies are rehost, replatform, refactor, rearchitect or rebuild, retire, and retain. We assign one to each workload during assessment.' },
  { q: 'What tools do you use for Azure migration?', a: "We use Microsoft's own tooling, including Azure Migrate, Azure Database Migration Service and Azure Site Recovery, plus infrastructure as code and CI/CD pipelines. See our comparison of the best cloud migration tools for Azure on our blog." },
  { q: 'Will my business face downtime during migration?', a: 'We keep downtime to agreed cutover windows. Each workload is tested in Azure before cutover.' },
  { q: 'Can you migrate from AWS or Google Cloud to Azure?', a: 'Yes. We map each AWS or Google Cloud service to its Azure equivalent, migrate data and workloads in waves, and decommission the old environment once Azure is stable.' },
  { q: 'Can Microsoft help fund my Azure migration?', a: 'Microsoft runs partner-led incentive and Azure credit programs for qualifying migrations. As a Microsoft Solutions Partner, Folio3 checks your eligibility during the assessment call.' },
  { q: 'What happens after the migration is complete?', a: 'We optimize costs, document the environment and train your team. If you want, our managed services team then runs day-to-day monitoring, patching and security for you.' },
];

const H2 = 'text-3xl lg:text-4xl';

function Head({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Reveal animation="fadeInUp"><h2 className={H2}>{title}</h2></Reveal>
      {sub && <p className="mt-4 text-body">{sub}</p>}
    </div>
  );
}

function CtaButton({ children, href = FORM }: { children: React.ReactNode; href?: string }) {
  return <Link href={href} className="btn-primary uppercase tracking-wide">{children}</Link>;
}

export default function AzureCloudMigrationPage() {
  const pageUrl = `${ORIGIN}${PATH}`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: `${TITLE} | Folio3 Azure`, description: DESC, isPartOf: { '@id': `${ORIGIN}/#website` }, breadcrumb: { '@id': `${pageUrl}#breadcrumb` }, inLanguage: 'en-US' },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Azure Cloud', item: `${ORIGIN}/azure-cloud-service/` },
        { '@type': 'ListItem', position: 3, name: 'Cloud Migration', item: pageUrl },
      ],
    },
  ];

  return (
    <>
      {ld.map((o, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />)}

      {/* FOLD 1 — HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Azure Cloud Migration</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">Azure Cloud Migration Services, Planned Around Your Business</h1>
            <p className="mt-6 text-lg text-body">Folio3 moves your servers, applications and databases from on-premises or another cloud to Microsoft Azure in planned waves. An Azure team stays with you after go-live.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={FORM} className="btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide">Book My Free Migration Assessment</Link>
              <Link href={FORM} className="btn-outline uppercase tracking-wide">Talk to an Azure Engineer</Link>
            </div>
            <p className="mt-8 text-sm font-medium text-ink">Microsoft Solutions Partner for Infrastructure (Azure) · 5,000+ projects delivered · US, UK, UAE and Canada</p>
          </div>
          <div className="mt-12">
            <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted">Trusted by teams at</p>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
              {LOGOS.map((l) => <Image key={l.src} src={l.src} alt={l.alt} width={120} height={48} className="h-10 w-auto object-contain" />)}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-brand">
        <nav aria-label="Breadcrumb" className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link><span className="px-2">»</span>
          <Link href="/azure-cloud-service/" className="hover:underline">Azure Cloud</Link><span className="px-2">»</span>
          <span>Cloud Migration</span>
        </nav>
      </div>

      {/* FOLD 3 — WHY AZURE (copy left, staggered 2x2 icon cards right) */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Why Azure</p>
            <Reveal animation="fadeInUp"><h2 className={H2}>Why Move Your Workloads to Microsoft Azure?</h2></Reveal>
            <p className="mt-6 leading-relaxed text-body">Aging servers, data center renewal bills and apps that cannot scale all push teams toward the cloud. Azure cloud migration gives you capacity on demand and Microsoft-grade security. It also connects natively to the tools you already use: Microsoft 365, Dynamics 365, Power BI and Entra ID.</p>
            <p className="mt-4 leading-relaxed text-body">Folio3&apos;s Azure cloud migration services take you from &ldquo;we should move&rdquo; to a running Azure environment. We assess what you have, decide what moves and how, and migrate in waves so your business keeps running. Not sure Azure is the right cloud? <Link href="/blog/comparing-aws-azure-google-cloud-services/" className="font-semibold text-brand hover:underline">See how Azure compares with AWS and Google Cloud.</Link></p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {WHY_AZURE.map((c, i) => (
              <Reveal key={c.t} animation="fadeInUp" delay={i * 80} className={i % 2 === 1 ? 'sm:mt-10' : ''}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICON_PATHS[c.icon]} /></svg>
                  </span>
                  <h3 className="mt-4 text-lg">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 4 — CHALLENGES */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Head title="What's Holding Your Azure Migration Back?" sub="Most migrations stall on the same five problems. Here is how we solve each one." />
          <ol className="mx-auto mt-10 max-w-3xl space-y-4">
            {CHALLENGES.map((c, i) => (
              <li key={c.t} className="flex gap-4 rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{i + 1}</span>
                <p className="text-body"><strong className="text-ink">{c.t}</strong> {c.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center"><CtaButton>Get My Migration Roadmap</CtaButton></div>
        </div>
      </section>

      {/* FOLD 5 — FUNDING & LICENSING */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head title="Lower Your Migration Cost With Microsoft Programs and Licensing" />
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-body">
            <p>As a Microsoft Solutions Partner, Folio3 can check whether your project qualifies for Microsoft partner incentives and Azure credits that offset assessment and migration costs.</p>
            <p>We also help you license correctly from the start. We guide you through the <Link href="/microsoft-licensing-process/" className="font-semibold text-brand hover:underline">Microsoft licensing process</Link> so you buy only what you need.</p>
          </div>
          <div className="mt-8 text-center"><CtaButton>Check My Funding Eligibility</CtaButton></div>
        </div>
      </section>

      {/* FOLD 6 — MIGRATION SERVICES (header row + one divided grid panel) */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="grid items-end gap-4 lg:grid-cols-[2fr_1fr] lg:gap-12">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Services</p>
              <Reveal animation="fadeInUp"><h2 className={H2}>Our Azure Migration Services</h2></Reveal>
            </div>
            <p className="text-body">Whatever you run today, we have a path to Azure for it.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
            <ul className="grid grid-cols-1 gap-px bg-surface-line sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((sv) => (
                <li key={sv.t} className="flex flex-col bg-white p-6 lg:p-8">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-brand" aria-hidden="true"><path d={ICON_PATHS[sv.icon]} /></svg>
                  <h3 className="mt-5 text-lg">{sv.t}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{sv.d}</p>
                  {sv.link && <Link href={sv.link.href} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">{sv.link.text} →</Link>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FOLD 7 — CAPABILITIES (vertical tabs + detail panel) */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Capabilities</p>
          <Reveal animation="fadeInUp"><h2 className={`max-w-3xl ${H2}`}>Everything Your Migration Needs, Under One Team</h2></Reveal>
          <CapabilityTabs items={CAPABILITIES} />
        </div>
      </section>

      {/* FOLD 8 — STRATEGIES */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head title="Choosing the Right Azure Migration Strategy" sub="Not every workload should move the same way. During assessment, we assign each one the strategy that fits its value, age and risk." />
          <div className="mx-auto mt-10 max-w-5xl overflow-x-auto rounded-2xl border border-surface-line shadow-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-brand-navy text-white"><tr><th scope="col" className="px-5 py-4">Strategy</th><th scope="col" className="px-5 py-4">What it means</th><th scope="col" className="px-5 py-4">Best for</th></tr></thead>
              <tbody className="divide-y divide-surface-line bg-white">
                {STRATEGIES.map((r) => (
                  <tr key={r.s}><th scope="row" className="px-5 py-4 font-semibold text-ink">{r.s}</th><td className="px-5 py-4 text-body">{r.m}</td><td className="px-5 py-4 text-body">{r.b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center"><CtaButton>Find the Right Strategy for My Workloads</CtaButton></div>
        </div>
      </section>

      {/* FOLD 9 — PROCESS */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Head title="How Our Cloud Migration to Azure Works" />
          <p className="mx-auto mt-4 max-w-3xl text-center text-body">Every engagement follows six steps, so you know what happens next and who owns it. The planning steps come from our <Link href="/azure-cloud-service/" className="font-semibold text-brand hover:underline">Azure cloud strategy and consulting</Link> practice.</p>
          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                <span className="text-3xl font-bold text-brand">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-lg">{s.t}</h3><p className="mt-2 text-sm leading-relaxed text-body">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOLD 10 — MID-PAGE CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_75%_30%,rgba(255,255,255,0.16)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">Get a Free 30-Minute Azure Migration Assessment Call</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">Tell us what you run today and where you want to be. An Azure engineer will tell you which workloads to move first, which strategy fits, and what the next step costs. No obligation.</p>
          <Link href={FORM} className="btn mt-7 bg-brand-navy text-white hover:bg-white hover:text-brand-navy uppercase tracking-wide">Book My 30-Minute Call</Link>
        </div>
      </section>

      {/* FOLD 11 — USE CASES */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head title="Common Azure Migration Projects We Deliver" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.t} animation="fadeInUp" delay={(i % 3) * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg">{u.t}</h3><p className="mt-2 text-sm leading-relaxed text-body">{u.d}</p>
                  {u.link && <Link href={u.link.href} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">{u.link.text} →</Link>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 12 — STATS */}
      <section className="bg-brand-ink py-16">
        <div className="container-x">
          <h2 className="text-center text-3xl text-white lg:text-4xl">Real Results, Real Impact</h2>
          <dl className="mt-10 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {STATS.map((s) => (<div key={s.l}><dd className="text-4xl font-bold text-white">{s.v}</dd><dt className="mt-1 text-sm text-white/70">{s.l}</dt></div>))}
          </dl>
        </div>
      </section>

      {/* FOLDS 13 + 14 — WHY FOLIO3 (checklist left) + CREDENTIALS (dark panel right) */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Why Folio3</p>
            <Reveal animation="fadeInUp"><h2 className={H2}>Why Choose Folio3 as Your Azure Migration Partner</h2></Reveal>
            <ul className="mt-8 space-y-6">
              {WHY_FOLIO3.map((w) => (
                <li key={w.t} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                  </span>
                  <div><h3 className="text-lg">{w.t}</h3><p className="mt-1 text-sm leading-relaxed text-body">{w.d}</p></div>
                </li>
              ))}
            </ul>
            <p className="mt-8"><Link href="/about-us/" className="font-semibold text-brand hover:underline">Learn more about Folio3 Azure →</Link></p>
          </div>
          <div className="rounded-3xl bg-brand-ink p-8 text-white lg:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">Credentials</p>
            <h2 className="text-3xl leading-tight text-white">A Certified Azure Migration Partner</h2>
            <p className="mt-4 leading-relaxed text-white/75">Microsoft awards Solutions Partner designations only to partners that score at least 70 of 100 points on performance, skilling and customer success. Folio3 holds four.</p>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DESIGNATIONS.map((d) => (
                <li key={d} className="rounded-2xl border border-white/15 p-5">
                  <svg viewBox="0 0 24 24" width="28" height="28" className="text-brand" fill="currentColor" aria-hidden="true"><path d="M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z" /></svg>
                  <p className="mt-4 text-xs text-white/65">Solutions Partner</p>
                  <p className="mt-1 font-semibold text-white">{d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8"><Link href="/about-us/" className="font-semibold text-white underline-offset-4 hover:underline">Read more about Folio3&apos;s Microsoft Solutions Partner designations →</Link></p>
          </div>
        </div>
      </section>

      {/* FOLD 15 — COST OPTIMIZATION */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head title="Cost Optimization Built Into Every Migration" sub="We plan cost before migration, not after the first invoice." />
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {COST_POINTS.map((p) => <li key={p} className="rounded-2xl border border-surface-line bg-white p-6 text-sm leading-relaxed text-body shadow-card">{p}</li>)}
          </ul>
        </div>
      </section>

      {/* FOLD 16 — POST-MIGRATION SUPPORT */}
      <section className="bg-surface-tint py-16 lg:py-20">
        <div className="container-x text-center">
          <Head title="After Go-Live: Ongoing Azure Support" />
          <p className="mx-auto mt-4 max-w-3xl text-body">Migration is the start, not the finish. Our <Link href="/azure-managed-services/" className="font-semibold text-brand hover:underline">Azure managed services</Link> team keeps your new environment healthy with 24/7 monitoring, patching, backup checks, security reviews and monthly cost reports.</p>
          <div className="mt-8"><CtaButton>Ask About Managed Azure Support</CtaButton></div>
        </div>
      </section>

      {/* FOLD 17 — CASE STUDIES */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head title="Azure Case Studies" />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-7 sm:grid-cols-2">
            {CASES.map((c, i) => <Reveal key={c.title} animation="fadeInUp" delay={i * 70}><CaseFlip title={c.title} body={c.body} href={c.href} img={c.img} /></Reveal>)}
          </div>
          <p className="mt-8 text-center"><Link href="/case-studies/" className="font-semibold text-brand hover:underline">View all Azure case studies →</Link></p>
        </div>
      </section>

      {/* FOLD 18 — RELATED SERVICES */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Head title="Do More With Azure After You Migrate" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map((r, i) => (
              <Reveal key={r.t} animation="fadeInUp" delay={i * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg">{r.t}</h3><p className="mt-2 text-sm leading-relaxed text-body">{r.d}</p>
                  <Link href={r.href} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">{r.l} →</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 19 — RESOURCES */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head title="Azure Migration Insights" />
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {INSIGHTS.map((r) => (
              <li key={r.href}><Link href={r.href} className="flex h-full items-center justify-between gap-3 rounded-2xl card-hover border border-surface-line bg-white p-6 font-semibold text-ink shadow-card">{r.t}<span className="text-brand" aria-hidden="true">→</span></Link></li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOLD 21 — FAQ (Accordion emits FAQPage JSON-LD) */}
      <section className="py-16 lg:py-24 bg-surface-tint" aria-labelledby="faq-heading">
        <div className="container-x">
          <Reveal animation="fadeInUp"><h2 id="faq-heading" className={`text-center ${H2}`}>Azure Cloud Migration FAQs</h2></Reveal>
          <div className="mx-auto mt-10 max-w-3xl"><Accordion items={FAQS} headingLevel="h3" /></div>
        </div>
      </section>

      {/* FOLD 20 — FINAL CTA + FORM (id="pgForm") */}
      <OneToOneCTA tone="light" formTitle="Ready to Move to Azure?" formCopy="Book a free 30-minute call with an Azure engineer. You will leave with a clear first step for your Azure cloud migration, whether you work with us or not." />
      <p className="bg-surface-tint pb-10 text-center text-sm text-body">Prefer email or phone? <Link href="/contact-us/" className="font-semibold text-brand hover:underline">Contact our Azure team</Link> · <a href="tel:+14084123813" className="font-semibold text-brand hover:underline">+1 (408) 412-3813</a></p>
    </>
  );
}
