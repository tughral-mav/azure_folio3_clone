import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Clapperboard,
  Cloud,
  FileSearch,
  Gauge,
  HeartPulse,
  Landmark,
  Layers,
  Factory,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  Tags,
  TrendingDown,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { AwardsBand } from '@/components/sections/AwardsBand';
import { FaqAccordion } from '@/app/ai-agents/fabric-data-agents/FaqAccordion';

const CANONICAL = 'https://azure.folio3.com/azure-cloud/azure-cost-management/';
const TITLE = 'Azure Cost Management Services | Cut Azure Spend | Folio3';
const META_DESCRIPTION =
  "Folio3's Azure cost management services find waste, rightsize resources and govern spend. Book a free Azure cost consultation with certified experts.";
const FORM_HREF = '#pgForm';
const CTA_CONSULT = 'Book a Free Azure Cost Consultation';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: META_DESCRIPTION, url: CANONICAL, type: 'website' },
};

const badges = [
  'Infrastructure (Azure)',
  'Data & AI (Azure)',
  'Digital & App Innovation (Azure)',
  'Business Applications',
  'Direct (Tier 1) Microsoft CSP',
];

const whyBillsClimb: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: 'Idle and orphaned resources', text: 'Test VMs left running, unattached disks and old snapshots keep billing long after the project ends.', Icon: Cloud },
  { title: 'Oversized workloads', text: 'Resources sized for peak traffic sit mostly idle the rest of the time.', Icon: Gauge },
  { title: 'Pay-as-you-go by default', text: 'Steady workloads stay on full retail rates when reservations or savings plans would cost far less.', Icon: ReceiptText },
  { title: 'No ownership', text: 'Without tags, budgets or alerts, nobody knows which team or product is driving the bill until finance asks.', Icon: Tags },
];

const services: { title: string; text: ReactNode; Icon: LucideIcon }[] = [
  { title: 'Azure Cost Assessment', text: 'A full review of your subscriptions, resource groups and billing data to pinpoint where money is leaking and rank savings by impact.', Icon: FileSearch },
  { title: 'Rightsizing & Waste Cleanup', text: 'We resize over-provisioned VMs, databases and app plans, and remove idle resources, unattached disks and stale snapshots.', Icon: TrendingDown },
  { title: 'Reservations & Savings Plans', text: 'We analyze usage patterns and recommend the right mix of Azure reserved instances and savings plans for steady workloads.', Icon: Wallet },
  {
    title: 'Licensing Optimization',
    text: (
      <>
        We apply Azure Hybrid Benefit and right-size your Microsoft licensing so you stop paying twice for Windows Server and SQL Server.{' '}
        <Link href="/microsoft-licensing-process/" className="font-medium text-brand hover:underline">Learn how our Microsoft licensing process works.</Link>
      </>
    ),
    Icon: ShieldCheck,
  },
  { title: 'Governance & Cost Allocation', text: 'We build a tagging strategy, budgets and alerts so every dollar maps to a team, product or customer.', Icon: Tags },
  { title: 'Architecture Optimization', text: 'We move suitable workloads to PaaS, serverless or autoscaling designs so you pay for actual use, not idle capacity.', Icon: Layers },
];

const steps = [
  { title: 'Consult', text: 'A free 30-minute call with a senior Azure engineer to understand your environment, bill and goals.' },
  { title: 'Assess', text: 'We pull your cost and usage data, map spend to workloads and find every quick win and structural fix.' },
  { title: 'Optimize', text: 'We implement the agreed changes, quick wins first, so savings show up on your next invoice.' },
  { title: 'Govern', text: 'We set up tags, budgets, alerts and policies so new resources follow the same cost rules.' },
  { title: 'Monitor', text: 'We review spend every month, catch anomalies early and adjust commitments as your usage changes.' },
];

const engagements = [
  { title: 'Free Azure Cost Consultation', best: "Best for teams that suspect overspend but don't know where.", text: 'A 30-minute call, your top 3 savings opportunities and a recommended next step.' },
  { title: 'Azure Cost Optimization Project', best: 'Best for a one-time cleanup after migration or a bill spike.', text: 'A full cost assessment, a prioritized savings plan with estimates, and implementation of the agreed changes.' },
  { title: 'Managed Azure Cost Management', best: 'Best for ongoing control as you grow.', text: 'Monthly cost reviews, anomaly alerts, commitment tuning, governance upkeep and 24/7 monitoring.' },
  { title: 'CSP Licensing & Billing', best: 'Best for buying Azure and Microsoft licenses more efficiently.', text: 'Consolidated billing through a Direct (Tier 1) CSP, a licensing review and a Hybrid Benefit eligibility check.' },
];

const tools = [
  ['Microsoft Cost Management + Billing', 'cost analysis, budgets, alerts, exports and cost allocation rules'],
  ['Azure Advisor', 'cost recommendations for idle and underutilized resources, validated by our engineers before any change'],
  ['Azure Reservations & Savings Plans', 'commitment planning for steady compute and database workloads'],
  ['Azure Hybrid Benefit', 'reusing eligible Windows Server and SQL Server licenses on Azure'],
  ['Azure Policy & Tags', 'enforcing tagging, allowed SKUs and regions so new spend follows the rules'],
  ['Azure Monitor & Automation', 'utilization data and scheduled shutdowns for non-production environments'],
  ['Power BI', 'executive cost dashboards by team, product or customer'],
];

const stats = [
  { v: '20+', l: 'Years of Experience' },
  { v: '50+', l: 'Microsoft Certified Experts' },
  { v: '7+', l: 'Offices Worldwide' },
  { v: '24/7', l: 'Support' },
];

const industries: { title: string; text: string; Icon: LucideIcon; href?: string }[] = [
  { title: 'Healthcare', text: "Control the cost of storing and processing large volumes of patient data while keeping compliance-driven redundancy where it's required.", Icon: HeartPulse, href: '/azure-for-healthcare/' },
  { title: 'Financial Services', text: 'Allocate spend by business unit and product, and cut idle capacity in dev and test without touching regulated production systems.', Icon: Landmark },
  { title: 'Retail', text: 'Scale up for seasonal peaks and back down afterwards, so you stop paying holiday-sized bills in February.', Icon: ShoppingCart, href: '/azure-for-retail/' },
  { title: 'Manufacturing', text: 'Keep IoT and telemetry costs predictable as device counts and data ingestion grow.', Icon: Factory, href: '/azure-for-manufacturing/' },
  { title: 'Media & Entertainment', text: 'Tier storage for large content libraries and right-size rendering and streaming workloads.', Icon: Clapperboard },
];

const faqs = [
  { q: 'What is Azure cost management?', a: 'Azure cost management is the practice of monitoring, allocating and reducing what you spend on Microsoft Azure. It covers visibility (who spends what), optimization (cutting waste and paying less per unit) and governance (rules that stop overspend from coming back).' },
  { q: 'Is Azure Cost Management free?', a: "Microsoft's Cost Management + Billing tool is included with Azure at no extra charge for Azure usage. The tool shows you the data; Azure cost management services like ours act on it by rightsizing, restructuring commitments and setting up governance." },
  { q: 'Do I need a partner if Azure already has a cost management tool?', a: "The tool flags issues; it doesn't fix them or weigh them against performance. A partner validates each recommendation, implements changes safely and builds the tagging and budgets that keep costs down." },
  { q: 'How can I reduce Azure costs quickly?', a: 'The fastest wins are usually shutting down idle resources, deleting unattached disks, rightsizing oversized VMs and scheduling non-production environments to turn off outside working hours.' },
  { q: "What's the difference between Azure savings plans and reserved instances?", a: 'Microsoft says a savings plan for compute can save up to 65% versus pay-as-you-go and applies flexibly across compute services. Reservations can save up to 72% on VMs or SQL Database compute but lock you to a specific resource type for one or three years. Most environments benefit from a mix.' },
  { q: 'How much can I save with Azure cost optimization services?', a: 'It depends on how your environment was built and how long it has run without review. Your free consultation includes an initial estimate based on your actual usage.' },
  { q: 'Will cost optimization affect performance?', a: 'No, when done correctly. We test every change against your performance and availability requirements before rolling it out, and keep redundancy where compliance needs it.' },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    url: CANONICAL,
    description: META_DESCRIPTION,
    isPartOf: { '@type': 'WebSite', name: 'Folio3 Azure', url: 'https://azure.folio3.com/' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Azure Cost Management Services',
    serviceType: 'Azure cost optimization',
    provider: { '@type': 'Organization', name: 'Folio3', url: 'https://azure.folio3.com/' },
    areaServed: 'Worldwide',
    url: CANONICAL,
    description: META_DESCRIPTION,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azure.folio3.com/' },
      { '@type': 'ListItem', position: 2, name: 'Azure Cloud', item: 'https://azure.folio3.com/azure-cloud-service/' },
      { '@type': 'ListItem', position: 3, name: 'Azure Cost Management', item: CANONICAL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
];

const primaryBtn = 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide';
const outlineBtn = 'btn border border-brand text-brand hover:bg-brand hover:text-white uppercase tracking-wide';
const gradientBg = 'bg-[linear-gradient(135deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)]';

function SectionHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl lg:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-body">{children}</p>}
    </Reveal>
  );
}

function IconBadge({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
      <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
    </span>
  );
}

export default function AzureCostManagementPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">Azure Cloud · Cost Management</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl">
              Azure Cost Management Services That Cut <span className="text-brand">Waste, Not Performance</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-body">
              Your Azure bill should grow with your business, not with forgotten VMs and oversized databases. Folio3&apos;s certified Azure engineers find hidden waste, rightsize your resources and put guardrails in place so you reduce Azure costs and keep them down.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={FORM_HREF} className={primaryBtn}>{CTA_CONSULT}</Link>
              <Link href="#how-we-work" className={outlineBtn}>See How We Work</Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Microsoft partner designations">
              {badges.map((b) => (
                <li key={b} className="rounded-full border border-surface-line bg-white px-3 py-1 text-xs font-medium text-brand">{b}</li>
              ))}
            </ul>
            <p className="mt-5 max-w-2xl text-sm text-body">
              As a Direct Microsoft CSP, Folio3 sees both sides of your Azure costs: what you consume and what you pay for it.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand">
        <nav aria-label="Breadcrumb" className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="px-2">/</span>
          <Link href="/azure-cloud-service/" className="hover:underline">Azure Cloud</Link>
          <span className="px-2">/</span>
          <span aria-current="page">Azure Cost Management</span>
        </nav>
      </div>

      {/* Why Azure bills keep climbing */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Why Azure Bills Keep Climbing">
            Azure makes it easy to spin up resources in minutes. It makes it just as easy to forget them. Most overspend isn&apos;t one big mistake; it&apos;s dozens of small ones that compound every month.
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyBillsClimb.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 80}>
                <div className="group h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <IconBadge Icon={c.Icon} />
                  <h3 className="mt-4 text-lg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            If you moved workloads with a{' '}
            <Link href="/azure-cloud-service/" className="font-medium text-brand hover:underline">lift-and-shift Azure cloud migration</Link>
            , there&apos;s a good chance they were sized for your old data center, not for Azure.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Our Azure Cost Management Services">
            Azure cost optimization services that cover every lever on your bill: what you run, how big it is, how you pay for it and who is accountable for it.
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} animation="fadeInUp" delay={i * 70}>
                <div className="group h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <IconBadge Icon={s.Icon} />
                  <h3 className="mt-4 text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AwardsBand autoScroll title="Awards & Recognition" />

      {/* Process */}
      <section id="how-we-work" className="scroll-mt-24 py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="How Our Azure FinOps Process Works">
            A five-step loop built on FinOps practices and the Microsoft Well-Architected Framework cost pillar. Savings come early; governance keeps them.
          </SectionHead>
          <ol className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-5">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal animation="fadeInUp" delay={i * 80} className="flex items-start gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center">
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${gradientBg} text-lg font-bold text-white shadow-cardHover`}>{i + 1}</span>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Engagement models */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Choose How You Want to Work With Us" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {engagements.map((e, i) => (
              <Reveal key={e.title} animation="fadeInUp" delay={i * 70}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-7 shadow-card">
                  <h3 className="text-xl">{e.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-brand">{e.best}</p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{e.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Already need day-to-day support too? Cost management is built into our{' '}
            <Link href="/azure-managed-services/" className="font-medium text-brand hover:underline">Azure managed services</Link>
            , alongside 24/7 monitoring and security management.
          </p>
          <div className="mt-6 text-center"><Link href={FORM_HREF} className={primaryBtn}>{CTA_CONSULT}</Link></div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Built on Azure's Own Cost Tools. No Lock-In.">
            We work inside the tools you already own, so every dashboard, budget and policy stays yours when the engagement ends.
          </SectionHead>
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            {tools.map(([name, text]) => (
              <li key={name} className="flex gap-3 rounded-xl border border-surface-line bg-white p-5 shadow-card">
                <span aria-hidden className="mt-0.5 shrink-0 text-brand">✓</span>
                <p className="text-sm leading-relaxed text-body"><strong className="text-ink">{name}:</strong> {text}</p>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-10 max-w-3xl space-y-3 text-center text-body">
            <p>
              Want finance and engineering on one cost view? We build custom spend dashboards with Power BI and the{' '}
              <Link href="/microsoft-power-platform-services/" className="font-medium text-brand hover:underline">Microsoft Power Platform</Link>.
            </p>
            <p>Many cost management providers run your data through their own proprietary platform. We keep everything in your Azure tenant.</p>
          </div>
          <Reveal animation="fadeInUp" className="mx-auto mt-12 max-w-4xl">
            <figure>
              <div className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
                <Image
                  src="/wp-content/uploads/2026/09/bc-expenses-dashboard.webp"
                  alt="Example Power BI expense dashboard showing spend against budget, budget variance over time and spend by category"
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-body">
                Example Power BI dashboard: spend vs. budget, variance and cost by category. Your cost dashboards are built the same way, from your own Azure data.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className={`${gradientBg} py-12`}>
        <dl className="container-x grid grid-cols-2 gap-8 text-center text-white lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l}>
              <dt className="sr-only">{s.l}</dt>
              <dd className="text-4xl font-bold" aria-hidden>{s.v}</dd>
              <dd className="mt-1 text-sm text-white/85">{s.l}</dd>
              <span className="sr-only">{s.v}</span>
            </div>
          ))}
        </dl>
      </section>

      {/* Industries */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Azure Cost Management for Your Industry" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} animation="fadeInUp" delay={i * 70}>
                <div className="group h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <IconBadge Icon={ind.Icon} />
                  <h3 className="mt-4 text-lg">{ind.href ? <Link href={ind.href} className="hover:text-brand">{ind.title}</Link> : ind.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{ind.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Data platforms are often the fastest-growing line on the bill. Our{' '}
            <Link href="/azure-data-analytics/" className="font-medium text-brand hover:underline">Azure data analytics</Link>
            {' '}team designs pipelines and warehouses that scale without runaway compute costs.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className={`${gradientBg} py-16 lg:py-20`}>
        <div className="container-x text-center text-white">
          <Building2 aria-hidden="true" className="mx-auto mb-4" size={36} strokeWidth={1.6} />
          <h2 className="mx-auto max-w-3xl text-3xl font-bold lg:text-4xl">Cost Control Starts With the Right Architecture</h2>
          <p className="mx-auto mt-4 max-w-3xl text-white/90">
            The cheapest Azure resource is the one you designed out before deployment. When cost reviews point to bigger changes, like re-platforming an app, consolidating subscriptions or rethinking your landing zone, our{' '}
            <Link href="/azure-cloud-service/" className="font-semibold underline">Azure cloud strategy and consulting</Link>
            {' '}team plans the change so savings are built in from day one.
          </p>
          <Link href={FORM_HREF} className="btn mt-8 bg-white uppercase tracking-wide text-brand hover:bg-surface-chip">Talk to an Azure Architect</Link>
        </div>
      </section>

      {/* Why Folio3 */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Why Teams Choose Folio3 as Their Azure Cost Optimization Partner">
            Certified Azure engineers, a Direct (Tier 1) Microsoft CSP view of both usage and billing, and tooling that stays in your own tenant.
          </SectionHead>
          <div className="mt-8 text-center">
            <Link href="/case-studies/" className={outlineBtn}>Read the Full Case Study</Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Frequently Asked Questions" />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <OneToOneCTA
        formTitle="Find Out Where Your Azure Budget Is Going"
        formCopy="Book a free 30-minute Azure cost consultation. A senior engineer will review your setup with you and point out where you're most likely overspending. You leave with clear next steps whether you work with us or not."
      />

      {jsonLd.map((d) => (
        <script key={d['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}
