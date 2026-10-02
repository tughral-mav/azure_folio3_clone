import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Accordion } from '@/components/sections/Accordion';
import { LogoCloud } from '@/components/sections/LogoCloud';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Reveal } from '@/components/ui/Reveal';
import { SupportSteps } from './SupportSteps';

const ORIGIN = 'https://azure.folio3.com';
const PATH = '/azure-managed-services/application-managed-services/';
const FORM = '#pgForm';
const TITLE = 'Application Managed Services on Azure | Folio3';
const DESC = '24/7 application managed services for Azure apps: L2/L3 support, full-stack monitoring, fixes and releases by certified engineers. Talk to Folio3.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESC, type: 'website', url: PATH },
};

const ICON_PATHS: Record<string, string> = {
  bug: 'M8 9a4 4 0 0 1 8 0v5a4 4 0 0 1-8 0V9Zm4-4V3M4 13h4M16 13h4M5 7l3 2M19 7l-3 2M5 19l3-2M19 19l-3-2',
  pulse: 'M3 12h4l3-7 4 14 3-7h4',
  release: 'M6 3v12M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0c0 6-12 3-12 6',
  spark: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Zm7 11 .8 2.2 2.2.8-2.2.8L19 20l-.8-2.2-2.2-.8 2.2-.8L19 14Z',
  shield: 'M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6L12 3Zm-3 9 2.2 2.2L15.5 10',
  gauge: 'M4 18a8 8 0 1 1 16 0M12 18l4-6M8 18h.01M16 18h.01',
  code: 'm8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14',
  phone: 'M7 3h10v18H7zM11 18h2',
  grid: 'M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17.5l9 5 9-5',
  network: 'M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4',
  chart: 'M4 4v16h16M9 16v-5M13 16V8M17 16v-8',
  box: 'm12 3 8 4.5v9L12 21l-8-4.5v-9L12 3ZM4 7.5l8 4.5 8-4.5M12 12v9',
};

const LOGOS = [
  { src: '/wp-content/uploads/2024/01/ias-savills-logo.webp', alt: 'Savills' },
  { src: '/wp-content/uploads/2024/01/ias-cityu-logo.webp', alt: 'City University of Seattle' },
  { src: '/wp-content/uploads/2024/01/ias-daraz-logo.webp', alt: 'Daraz' },
  { src: '/wp-content/uploads/2024/01/ias-rff-logo.webp', alt: 'RFF' },
  { src: '/wp-content/uploads/2025/07/slb-1.webp', alt: 'SLB' },
  { src: '/wp-content/uploads/2025/07/superior-farms-logo.webp', alt: 'Superior Farms' },
];

const STATS = [
  { v: '100+', l: 'Applications supported' },
  { v: '50+', l: 'Microsoft certified experts' },
  { v: '20+', l: 'Years building and running software' },
  { v: '24/7', l: 'Support and maintenance coverage' },
];

const SERVICES: { icon: string; t: string; d: React.ReactNode }[] = [
  { icon: 'bug', t: 'Application support and bug fixing', d: 'Developers diagnose and fix defects in your code, test the fix, and ship it through your pipeline.' },
  { icon: 'pulse', t: 'Application performance monitoring', d: 'Real-time visibility into response times, failures and user journeys, with alerts before users notice.' },
  { icon: 'release', t: 'Release and change management', d: 'Planned releases, hotfixes and rollbacks handled with strict source control and sign-off.' },
  { icon: 'spark', t: 'Enhancements and feature updates', d: <>Small improvements and new features from a shared backlog, built by the same team that supports your app. Larger builds move to our <a href="https://folio3.com/app-development/" className="font-semibold text-brand hover:underline">Azure application development</a> team.</> },
  { icon: 'shield', t: 'Security patching and dependency updates', d: "Framework, library and runtime updates applied on schedule, so known vulnerabilities don't sit in production." },
  { icon: 'gauge', t: 'Performance and cost tuning', d: 'Slow queries, over-sized App Service plans and noisy Functions found and fixed, keeping your Azure bill in line with usage.' },
];

const SUPPORT_STEPS = [
  { t: 'Report', d: 'Your IT team or users log an issue through our service desk.' },
  { t: 'Triage (L2)', d: 'We reproduce the issue, check Azure service health and logs, and assign a priority from P1 to P4.' },
  { t: 'Find the root cause', d: 'We decide whether the fault sits in the Azure layer or in your code, and route it to the right engineer.' },
  { t: 'Fix (L3)', d: 'Developers change the code under source control and test it in your dev or staging environment.' },
  { t: 'Release', d: 'The fix ships through your existing DevOps and CI/CD pipelines, then we verify it in production.' },
  { t: 'Close and learn', d: 'We update release notes, close the ticket, and write a root-cause report for every P1 and P2 incident.' },
];

const MONITORING = [
  ['Azure Monitor alerts on App Service, AKS, Azure SQL, Functions and storage', 'Application Insights telemetry: response times, exceptions, dependency failures'],
  ['Capacity, scaling and availability checks', 'Health checks on the transactions that matter to you: login, payments, sync jobs, APIs'],
  ['Configuration drift and expiring certificates or secrets', 'Log Analytics queries tuned to your app, with alerts routed to the on-call engineer'],
];

const REPORTING = [
  { t: 'Named service delivery manager', d: 'One person who knows your apps and owns your account.' },
  { t: 'Monthly service report', d: 'Incidents, fixes, releases, SLA performance and open risks, in one view.' },
  { t: 'Quarterly application and architecture review', d: 'Trends, recurring issues, technical debt and an improvement roadmap.' },
  { t: 'Continuous improvement backlog', d: 'Recommendations turned into prioritised, estimated work items you approve.' },
];

const HANDOVER = [
  { p: 'Weeks 1–2', t: 'Discover', d: 'Access set-up, architecture and code review, dependency map, and a list of known issues.' },
  { p: 'Weeks 3–4', t: 'Shadow', d: 'We work alongside your current team and write runbooks for every recurring task.' },
  { p: 'Weeks 5–8', t: 'Reverse shadow', d: 'We lead support while your team checks our work.' },
  { p: 'Week 9 onward', t: 'Steady state', d: 'Full service levels apply, and the monthly reporting cycle begins.' },
];

const SLAS = [
  { p: 'P1 Critical', e: 'App down or core transaction failing for all users', r: '30 minutes, 24/7', t: '4 hours' },
  { p: 'P2 High', e: 'Major feature broken, no workaround', r: '2 hours', t: '1 business day' },
  { p: 'P3 Medium', e: 'Feature impaired, workaround exists', r: '8 business hours', t: '5 business days' },
  { p: 'P4 Low', e: 'Cosmetic issue or minor request', r: '2 business days', t: 'Next planned release' },
];

const APPS = [
  { icon: 'code', t: 'Custom web apps and APIs', d: '.NET, Node.js, Python and Java apps on App Service, AKS or Functions.' },
  { icon: 'phone', t: 'Mobile app backends', d: 'APIs, push notifications, authentication and data sync.' },
  { icon: 'grid', t: 'Low-code apps', d: 'Power Apps and Power Automate solutions, with governance, ALM and break/fix support.', href: '/microsoft-power-platform-services/' },
  { icon: 'layers', t: 'Dynamics 365 extensions', d: 'Custom plugins, Azure Functions and integrations that extend your ERP or CRM.' },
  { icon: 'network', t: 'Integrations', d: 'Logic Apps, Service Bus, Event Grid and API Management workflows.' },
  { icon: 'chart', t: 'Data apps', d: 'Data Factory pipelines, Fabric workloads and Power BI reports that your business relies on daily.' },
  { icon: 'box', t: 'Migrated legacy apps', d: 'Older apps re-hosted or re-platformed on Azure that still need someone who understands them.', href: '/azure-cloud-service/' },
];

const TECH = [
  { t: 'Azure', items: ['App Service', 'AKS', 'Functions', 'Logic Apps', 'API Management', 'Service Bus', 'Azure SQL', 'Cosmos DB', 'Key Vault', 'Entra ID', 'Front Door', 'Application Insights', 'Azure Monitor'] },
  { t: 'Code and DevOps', items: ['.NET and C#', 'ASP.NET Core', 'Blazor', 'Node.js', 'Python', 'Java', 'React', 'Angular', 'Azure DevOps', 'GitHub Actions'] },
];

const AI_OPS = [
  { t: 'Smarter alerting', d: 'Related alerts are grouped and noise is filtered, so engineers act on real issues first.' },
  { t: 'Log summaries', d: 'Large error logs are condensed into a plain-English summary of what failed and where.' },
  { t: 'Faster coding', d: 'GitHub Copilot speeds up routine fixes and test writing, and every change is still reviewed by an engineer.' },
  { t: 'Early warnings', d: 'Anomaly detection in Application Insights flags slowdowns before they become outages.' },
];

const COMPARE = [
  { k: 'Coverage', a: 'Business hours, with gaps for leave and turnover', b: 'Up to 24/7, with backup engineers' },
  { k: 'Time to staff', a: 'Months to hire and onboard', b: 'Weeks, through structured handover' },
  { k: 'Skills', a: 'Limited to the people you employ', b: '.NET, front-end, DevOps, data and Azure specialists' },
  { k: 'Cost', a: 'Salaries, benefits, training and tools', b: 'One predictable monthly fee' },
  { k: 'Knowledge risk', a: 'Leaves when people leave', b: 'Documented in runbooks you keep' },
  { k: 'Scaling', a: 'New hires needed', b: 'Change the tier as your portfolio grows' },
];

const INDUSTRIES: { t: string; d: React.ReactNode }[] = [
  { t: 'Healthcare', d: <>Patient-facing and clinical apps where uptime and data protection matter, backed by Folio3&apos;s <a href="https://digitalhealth.folio3.com/" className="font-semibold text-brand hover:underline">digital health</a> expertise.</> },
  { t: 'Financial services', d: 'Secure, auditable change management for portals and internal systems.' },
  { t: 'Retail and e-commerce', d: 'Peak-season monitoring for storefronts, inventory and order apps.' },
  { t: 'Manufacturing and supply chain', d: 'Support for IoT, production and supplier integration apps.' },
  { t: 'Media and entertainment', d: 'Content delivery and audience apps that must scale on demand.' },
];

const DESIGNATIONS = ['Data & AI (Azure)', 'Infrastructure (Azure)', 'Digital & App Innovation (Azure)', 'Business Applications'];

const CHOOSE = [
  { q: 'Who fixes the code: developers, or a helpdesk that escalates?', a: 'Developers fix it, at L3.' },
  { q: "Will you support an app you didn't build?", a: 'Yes, through an 8-week structured handover.' },
  { q: 'Do you monitor the app, or only Azure?', a: 'Both: Azure services and application telemetry.' },
  { q: 'What are your SLAs?', a: 'Published P1–P4 response and resolution targets.' },
  { q: 'How is pricing set?', a: 'A fixed monthly fee based on app count and complexity.' },
  { q: 'Who is my point of contact?', a: 'A named service delivery manager.' },
];

const FAQS = [
  { q: 'What are application managed services?', a: 'Application managed services means a specialist partner runs your software day to day. They monitor it, fix defects, apply updates and ship small enhancements under agreed service levels, so your internal team can focus on new projects.' },
  { q: "What is included in Folio3's application managed services?", a: 'The service covers L2/L3 support and bug fixing, application and Azure monitoring, release management, security patching, performance tuning, enhancement hours, monthly reporting and quarterly reviews. The exact scope depends on the tier you choose.' },
  { q: 'How are application managed services different from Azure managed services?', a: 'Azure managed services look after the infrastructure: VMs, backup, disaster recovery, security and networking. Application managed services look after what runs on top: your code, releases and user experience. Many clients take both, so one team owns the whole stack.' },
  { q: 'Can you support an application another vendor built?', a: 'Yes. Our structured handover covers discovery, shadowing and reverse shadowing over about eight weeks. We document everything in runbooks before full service levels begin.' },
  { q: 'How much do application managed services cost?', a: 'Pricing is a fixed monthly fee. It depends on how many applications we support, how complex they are, and the coverage hours you need. It is not tied to your Azure spend. Book a free health check for a quote.' },
  { q: 'Do you offer 24/7 application support?', a: 'Yes. 24/7 cover for P1 and P2 incidents is available on our Advanced and Dedicated tiers. The Essential tier covers business hours.' },
  { q: 'Do you support Dynamics 365 and Power Platform apps?', a: 'Yes. We support Power Apps, Power Automate and Azure-based extensions to Dynamics 365. For the ERP or CRM platform itself, our Dynamics 365 and Business Central team works alongside us.' },
  { q: 'Do we keep ownership of our code?', a: 'Yes. Your code stays in your repositories, and every runbook and document we create belongs to you.' },
  { q: 'How do we get started?', a: 'Book a free application health check. We review your apps, Azure set-up and current support model, then recommend a tier and an onboarding plan.' },
];

const H2 = 'text-3xl lg:text-4xl';
const LINK = 'font-semibold text-brand hover:underline';

function Head({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}
      <Reveal animation="fadeInUp"><h2 className={H2}>{title}</h2></Reveal>
      {sub && <p className="mt-4 text-body">{sub}</p>}
    </div>
  );
}

function Check() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-brand" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
}

function Icon({ name, className = 'text-brand', size = 28 }: { name: string; className?: string; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d={ICON_PATHS[name]} /></svg>;
}

export default function ApplicationManagedServicesPage() {
  const pageUrl = `${ORIGIN}${PATH}`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: TITLE, description: DESC, isPartOf: { '@id': `${ORIGIN}/#website` }, breadcrumb: { '@id': `${pageUrl}#breadcrumb` }, inLanguage: 'en-US' },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Azure Managed Services', item: `${ORIGIN}/azure-managed-services/` },
        { '@type': 'ListItem', position: 3, name: 'Application Managed Services', item: pageUrl },
      ],
    },
  ];

  return (
    <>
      {ld.map((o, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />)}

      {/* FOLD 1 — HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Application Managed Services on Azure</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">Application Managed Services That Take Over Without the Risk</h1>
            <p className="mt-6 text-lg text-body">We take over support for any Azure app, including ones we didn&apos;t build, with a structured 8-week handover and published SLAs.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={FORM} className="btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide">Plan My Handover</Link>
              <Link href={FORM} className="btn-outline uppercase tracking-wide">Talk to an Azure Engineer</Link>
            </div>
          </div>
          <Reveal animation="zoomIn">
            <div className="rounded-3xl bg-brand-ink p-8 text-white shadow-cardHover lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">Your 8-week handover</p>
              <ol className="mt-6 space-y-5">
                {HANDOVER.map((h, i) => (
                  <li key={h.t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold">{i + 1}</span>
                    <div><p className="font-semibold text-white">{h.t}</p><p className="text-sm text-white/70">{h.p}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="bg-brand">
        <nav aria-label="Breadcrumb" className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link><span className="px-2">»</span>
          <Link href="/azure-managed-services/" className="hover:underline">Azure Managed Services</Link><span className="px-2">»</span>
          <span>Application Managed Services</span>
        </nav>
      </div>

      {/* FOLD 2 — CLIENT LOGOS */}
      <section className="py-12">
        <div className="container-x"><LogoCloud title="Trusted by teams that run business-critical apps on Azure" logos={LOGOS} /></div>
      </section>

      {/* FOLD 3 — STATS */}
      <section className="bg-brand-ink py-14">
        <div className="container-x">
          <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {STATS.map((s) => (<div key={s.l}><dd className="text-4xl font-bold text-white">{s.v}</dd><dt className="mt-1 text-sm text-white/70">{s.l}</dt></div>))}
          </dl>
        </div>
      </section>

      {/* FOLD 4 — WHAT ARE APPLICATION MANAGED SERVICES? */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Overview</p>
            <Reveal animation="fadeInUp"><h2 className={H2}>What Are Application Managed Services?</h2></Reveal>
            <p className="mt-6 leading-relaxed text-body">Application managed services means handing the day-to-day running of your software to a specialist team. That team monitors your apps, fixes defects, applies updates, ships small enhancements and keeps performance on target, all under agreed service levels.</p>
            <p className="mt-4 leading-relaxed text-body">Our <Link href="/azure-managed-services/" className={LINK}>Azure managed services</Link> already look after your Azure infrastructure: VMs, backup, disaster recovery and security. Application managed services adds the layer on top: your code, your releases and your users&apos; experience. You get one partner covering everything from the Azure subscription to the last line of code.</p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-brand p-6 text-white shadow-card">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/75">Application managed services</p>
              <p className="mt-2 text-lg font-semibold">Your code, your releases, your users&apos; experience</p>
            </div>
            <div className="rounded-2xl border border-surface-line bg-surface-tint p-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">Azure managed services</p>
              <p className="mt-2 text-lg font-semibold text-ink">VMs, backup, disaster recovery and security</p>
            </div>
            <p className="text-center text-sm text-body">One partner, from the Azure subscription to the last line of code.</p>
          </div>
        </div>
      </section>

      {/* FOLD 5 — SERVICES */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="grid items-end gap-4 lg:grid-cols-[2fr_1fr] lg:gap-12">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Services</p>
              <Reveal animation="fadeInUp"><h2 className={H2}>Our Application Management Services</h2></Reveal>
            </div>
            <p className="text-body">Everything your Azure applications need after go-live, delivered by one team.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
            <ul className="grid grid-cols-1 gap-px bg-surface-line sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((sv) => (
                <li key={sv.t} className="flex flex-col bg-white p-6 lg:p-8">
                  <Icon name={sv.icon} size={32} />
                  <h3 className="mt-5 text-lg">{sv.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{sv.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FOLD 6 — HOW SUPPORT WORKS */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head eyebrow="Process" title="How Our Azure Application Support Works" sub="L2 and L3 application support, with a clear path from reported issue to verified fix." />
          <SupportSteps steps={SUPPORT_STEPS.map((s) => s.t)} />
        </div>
      </section>

      {/* FOLD 7 — FULL-STACK MONITORING */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Head eyebrow="Monitoring" title="Full-Stack Monitoring, From Azure to Code" sub="Monitoring Azure alone tells you a service is up. It doesn't tell you checkout is failing. We watch both layers." />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            {[{ h: 'Azure layer', dark: false }, { h: 'Application layer', dark: true }].map((col, ci) => (
              <div key={col.h} className={col.dark ? 'rounded-3xl bg-brand-ink p-8 text-white lg:p-10' : 'rounded-3xl border border-surface-line bg-white p-8 shadow-card lg:p-10'}>
                <h3 className={col.dark ? 'text-2xl text-white' : 'text-2xl'}>{col.h}</h3>
                <ul className="mt-6 space-y-4">
                  {MONITORING.map((row) => (
                    <li key={row[ci]} className={`flex gap-3 text-sm leading-relaxed ${col.dark ? 'text-white/85' : 'text-ink'}`}><Check />{row[ci]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 8 — REPORTING (heading left, 2x2 items right) */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Reporting</p>
            <Reveal animation="fadeInUp"><h2 className={H2}>Clear Reporting and a Named Point of Contact</h2></Reveal>
            <p className="mt-4 leading-relaxed text-body">You always know what we did, what we found, and what we recommend next.</p>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {REPORTING.map((r) => (
              <li key={r.t} className="border-t-2 border-brand pt-5">
                <h3 className="text-lg">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{r.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FOLD 9 — HANDOVER (left-aligned intro + horizontal timeline; vertical on mobile) */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Structured handover</p>
            <Reveal animation="fadeInUp"><h2 className={H2}>We Take Over Apps We Didn&apos;t Build</h2></Reveal>
            <p className="mt-4 leading-relaxed text-body">Switching support partners shouldn&apos;t put your app at risk. Our structured handover moves knowledge from your team, or your previous vendor, to ours without a gap in cover. We&apos;ve done it for everything from internal tools to customer-facing <a href="https://folio3.com/app-development/" className={LINK}>custom web and mobile apps</a>.</p>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-0">
            {HANDOVER.map((h, i) => {
              const last = i === HANDOVER.length - 1;
              return (
                <li key={h.t} className="relative pl-12 lg:pl-0 lg:pr-8">
                  {!last && <span aria-hidden="true" className="absolute left-[11px] top-7 -bottom-10 w-0.5 bg-brand/25 lg:left-7 lg:right-0 lg:top-[11px] lg:bottom-auto lg:h-0.5 lg:w-auto" />}
                  <span aria-hidden="true" className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full ring-4 lg:static ${last ? 'bg-brand-navy ring-brand-navy/15' : 'bg-brand ring-brand/15'}`}>
                    {last && <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>}
                  </span>
                  <p className={`text-xs font-semibold uppercase tracking-wider lg:mt-6 ${last ? 'text-brand-navy' : 'text-brand'}`}>{h.p}</p>
                  <h3 className="mt-2 text-xl">{h.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{h.d}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-12"><Link href={FORM} className="btn-primary uppercase tracking-wide">Plan My Handover</Link></div>
        </div>
      </section>

      {/* FOLD 10 — SLAs */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head eyebrow="Service levels" title="Service Levels You Can Hold Us To" sub="Every ticket gets a priority, a response target and a resolution target." />
          <div className="mx-auto mt-10 max-w-5xl overflow-x-auto rounded-2xl border border-surface-line shadow-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-brand-navy text-white"><tr><th scope="col" className="px-5 py-4">Priority</th><th scope="col" className="px-5 py-4">Example</th><th scope="col" className="px-5 py-4">First response</th><th scope="col" className="px-5 py-4">Target resolution or workaround</th></tr></thead>
              <tbody className="divide-y divide-surface-line bg-white">
                {SLAS.map((r) => (
                  <tr key={r.p}><th scope="row" className="px-5 py-4 font-semibold text-ink">{r.p}</th><td className="px-5 py-4 text-body">{r.e}</td><td className="px-5 py-4 text-body">{r.r}</td><td className="px-5 py-4 text-body">{r.t}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FOLD 12 — APPLICATIONS WE SUPPORT */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head eyebrow="Coverage" title="Applications We Support on Azure" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPS.map((a, i) => (
              <Reveal key={a.t} animation="fadeInUp" delay={(i % 4) * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand"><Icon name={a.icon} className="text-white" size={24} /></span>
                  <h3 className="mt-4 text-lg">{a.href ? <Link href={a.href} className="hover:text-brand">{a.t}</Link> : a.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{a.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 13 — TECH */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Head eyebrow="Technology" title="Azure Services and Frameworks We Know Inside Out" />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            {TECH.map((g) => (
              <div key={g.t} className="rounded-3xl border border-surface-line bg-white p-8 shadow-card">
                <h3 className="text-xl">{g.t}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((t) => <li key={t} className="rounded-full border border-surface-line bg-surface-tint px-4 py-2 text-sm text-ink">{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-body">We support the data layer too, including platforms built by our <Link href="/azure-data-analytics/" className={LINK}>Azure data analytics</Link> team.</p>
        </div>
      </section>

      {/* FOLD 14 — AI-ASSISTED OPERATIONS */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">AI-assisted operations</p>
            <Reveal animation="fadeInUp"><h2 className={H2}>Faster Fixes With AI-Assisted Operations</h2></Reveal>
            <p className="mt-6 leading-relaxed text-body">We use AI where it shortens the time from alert to fix, drawing on our <a href="https://www.folio3.ai/" className={LINK}>AI and machine learning</a> practice.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {AI_OPS.map((c, i) => (
              <Reveal key={c.t} animation="fadeInUp" delay={i * 80} className={i % 2 === 1 ? 'sm:mt-10' : ''}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand"><Icon name="spark" className="text-white" size={24} /></span>
                  <h3 className="mt-4 text-lg">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 15 — IN-HOUSE VS OUTSOURCED */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Head eyebrow="Compare" title="In-House Team or Outsourced Application Management?" />
          <div className="mx-auto mt-10 max-w-5xl overflow-x-auto rounded-2xl border border-surface-line shadow-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead><tr><th scope="col" className="bg-brand-navy px-5 py-4 text-white"><span className="sr-only">Factor</span></th><th scope="col" className="bg-brand-navy px-5 py-4 text-white">In-house team</th><th scope="col" className="bg-brand px-5 py-4 text-white">Folio3 application managed services</th></tr></thead>
              <tbody className="divide-y divide-surface-line bg-white">
                {COMPARE.map((r) => (
                  <tr key={r.k}><th scope="row" className="px-5 py-4 font-semibold text-ink">{r.k}</th><td className="px-5 py-4 text-body">{r.a}</td><td className="px-5 py-4 font-medium text-ink">{r.b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FOLD 16 — INDUSTRIES */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head eyebrow="Industries" title="Application Support Across Industries" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.t} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg">{ind.t}</h3><p className="mt-2 text-sm leading-relaxed text-body">{ind.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLDS 17 + 18 — CERTIFIED PARTNER (dark panel) + REAL RESULTS (case card) */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-3xl bg-brand-ink p-8 text-white lg:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">Credentials</p>
            <h2 className="text-3xl leading-tight text-white">A Certified Microsoft Partner You Can Trust</h2>
            <p className="mt-6 text-sm font-semibold text-white/70">Microsoft Solutions Partner designations</p>
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DESIGNATIONS.map((d) => (
                <li key={d} className="rounded-2xl border border-white/15 p-5">
                  <svg viewBox="0 0 24 24" width="28" height="28" className="text-brand" fill="currentColor" aria-hidden="true"><path d="M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z" /></svg>
                  <p className="mt-4 text-xs text-white/65">Solutions Partner</p>
                  <p className="mt-1 font-semibold text-white">{d}</p>
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-3 text-sm text-white/85">
              <li className="flex gap-3"><Check />Direct (Tier 1) Microsoft Cloud Solution Provider</li>
              <li className="flex gap-3"><Check />Certified Azure Solutions Architects, Administrators, DevOps Engineer Experts, Security Engineers and Data Engineers</li>
            </ul>
          </div>
          <div className="flex flex-col overflow-hidden rounded-3xl border border-surface-line bg-white shadow-card">
            <Image src="/wp-content/uploads/2023/06/savills-cs.webp" alt="Savills analytics on Azure" width={800} height={450} className="h-56 w-full object-cover lg:h-64" />
            <div className="flex flex-1 flex-col p-8 lg:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Case study</p>
              <h2 className="text-3xl leading-tight">Real Results on Azure</h2>
              <p className="mt-4 flex-1 leading-relaxed text-body">See how we helped Savills, a global real estate services provider listed on the London Stock Exchange, modernise its analytics on Azure.</p>
              <div className="mt-8"><Link href="/savills/" className="btn-primary">Read the Savills Story <span aria-hidden="true" className="ml-2">→</span></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOLD 19 — HOW TO CHOOSE */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Head eyebrow="Buyer's checklist" title="How to Choose an Application Managed Services Provider" sub="Ask every provider these six questions. Here are our answers." />
          <div className="mx-auto mt-10 max-w-5xl overflow-x-auto rounded-2xl border border-surface-line shadow-card">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-brand-navy text-white"><tr><th scope="col" className="px-5 py-4">Question to ask</th><th scope="col" className="px-5 py-4">Folio3&apos;s answer</th></tr></thead>
              <tbody className="divide-y divide-surface-line bg-white">
                {CHOOSE.map((r) => (
                  <tr key={r.q}><th scope="row" className="px-5 py-4 font-semibold text-ink">{r.q}</th><td className="px-5 py-4 text-body"><span className="flex gap-3"><Check />{r.a}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center"><Link href={FORM} className="btn-primary uppercase tracking-wide">Book a Free Application Health Check</Link></div>
        </div>
      </section>

      {/* FOLD 20 — FAQ (Accordion emits FAQPage JSON-LD) */}
      <section className="bg-surface-tint py-16 lg:py-24" aria-labelledby="faq-heading">
        <div className="container-x">
          <Reveal animation="fadeInUp"><h2 id="faq-heading" className={`text-center ${H2}`}>Application Managed Services FAQs</h2></Reveal>
          <div className="mx-auto mt-10 max-w-3xl"><Accordion items={FAQS} headingLevel="h3" /></div>
        </div>
      </section>

      {/* FINAL CTA + FORM (id="pgForm") */}
      <OneToOneCTA tone="light" formTitle="Book a Free Application Health Check" formCopy="We review your apps, Azure set-up and current support model, then recommend a tier and an onboarding plan." />
    </>
  );
}
