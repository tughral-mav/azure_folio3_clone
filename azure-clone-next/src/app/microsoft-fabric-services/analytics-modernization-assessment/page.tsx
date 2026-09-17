import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { AwardsBand } from '@/components/sections/AwardsBand';
import { AutoScrollCases, type CaseItem } from '@/components/sections/AutoScrollCases';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

// Real Results — latest first. Savills and City University of Seattle are
// preserved (per the brief); the other 4 are recent case studies pulled from
// the site's Client Success Stories index.
const caseStudies: CaseItem[] = [
  {
    name: 'Agentic HR Policy Feedback',
    img: '/wp-content/uploads/2026/02/hr-policy.webp',
    blurb: 'An agentic solution that collects HR policy feedback, updates the policy document, and generates reporting for enterprise HR teams.',
    href: '/case-studies/agentic-hr-policy-feedback-update-and-reporting-solution/',
  },
  {
    name: 'Copilot Studio HR Policy Agent',
    img: '/wp-content/uploads/2026/02/real-estate-1.webp',
    blurb: 'Microsoft Copilot Studio-based HR policy agent that automates HR operations end-to-end.',
    href: '/case-studies/microsoft-copilot-studio-based-hr-policy-agent/',
  },
  {
    name: 'Weaver Popcorn Hybrids',
    img: '/wp-content/uploads/2026/01/weaver-popcorn-hybrids-1.webp',
    blurb: 'Weaver Popcorn Hybrids modernizes analytics with IntelliFabric on Microsoft Fabric.',
    href: '/case-studies/wph-intellifabric/',
  },
  {
    name: 'Alibaba — Power BI Reporting',
    img: '/wp-content/uploads/2025/07/alibaba-achieves-faster-financial-closings-with-power-bi-reporting.webp',
    blurb: 'Alibaba achieves 37% faster financial closings with Power BI reporting.',
    href: '/power-bi-financial-reporting-for-alibaba/',
  },
  {
    name: 'Savills',
    img: '/wp-content/uploads/2025/07/microsoft-fabric-reporting-boosting-operational-effiency.webp',
    blurb: 'Microsoft Fabric reporting boosts Savills’ operational efficiency by 13%.',
    href: '/savills/',
  },
  {
    name: 'City University of Seattle',
    img: '/wp-content/uploads/2025/07/power-apps-solution-for-city-university.webp',
    blurb: 'Power Apps solution and data platform on Azure for The City University of Seattle.',
    href: '/city-university-azure/',
  },
];

const CANONICAL = 'https://azure.folio3.com/microsoft-fabric-services/analytics-modernization-assessment';
const TITLE = 'Analytics Modernization Assessment | Microsoft Fabric | Folio3';
const DESCRIPTION =
  'Free Analytics Modernization Assessment by a Microsoft Solutions Partner. Get your Fabric Readiness Score, gap analysis, and 4-week migration roadmap.';
const OG_IMAGE = '/wp-content/uploads/2023/07/Microsoft-Fabric-Implementation-Services.webp';
const FORM_HREF = '#pgForm';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const painPoints = [
  'Reports take hours to refresh, so leadership makes decisions on stale data.',
  'Data engineers spend more than 60% of their time maintaining legacy pipelines instead of building new ones.',
  'Your data is fragmented across on-premise systems, multiple clouds, and SaaS applications, making a unified analytics or AI strategy impossible.',
  'Compute, storage, and licensing costs keep climbing across Synapse, Databricks, Azure Data Factory, and Power BI, with no single view of spend.',
  'Business users cannot self-serve because governance is either too loose or too locked-down.',
  'AI and Copilot initiatives stall because the underlying data is not unified, governed, or trustworthy.',
  'You are weighing Microsoft Fabric, Databricks, and Snowflake, and the wrong pick will cost millions to reverse.',
];

const smartFirstStep = [
  { n: '01', title: 'Architecture fit.', body: 'Which parts of your current data platform are already Fabric-compatible on OneLake, and which are not.' },
  { n: '02', title: 'Redesign vs. reuse.', body: 'What genuinely needs to be rebuilt for Fabric, and what can be migrated with minimal change to your existing ', link: { text: 'Power BI models and pipelines', href: 'https://azure.folio3.com/microsoft-power-platform/' }, tail: '.' },
  { n: '03', title: 'Strategy alignment.', body: 'How Microsoft Fabric fits alongside your existing ', link: { text: 'Azure Synapse, Databricks, and Azure Machine Learning', href: 'https://azure.folio3.com/azure-data-analytics/' }, tail: ' investments, not against them.' },
  { n: '04', title: 'Migration approach.', body: 'Whether a full replacement, phased migration, or long-term coexistence with your current stack makes the strongest commercial case.' },
  { n: '05', title: 'Real effort and ROI.', body: 'Honest numbers on migration effort, run cost on Fabric capacity, and payback period, before you commit to an F-SKU tier.' },
];

const benefits = [
  'A quantified TCO comparison across Microsoft Fabric, Synapse, Databricks, and your current stack.',
  'Workload readiness classification, every dataset and pipeline scored as Ready, Ready with Conditions, or Rebuild for both analytics and AI use cases.',
  'A workload-by-workload migration backlog ranked by ROI and complexity.',
  'A skills-gap analysis for your BI and data engineering teams.',
  'Fabric capacity sizing (F-SKU recommendation) based on real workload benchmarks, not vendor estimates.',
  'A governance and security blueprint aligned with Microsoft Purview and OneLake.',
  'A fixed-price, fixed-timeline migration proposal you can take to your board.',
  'Assessment fee credited toward your migration if you engage Folio3 to execute the roadmap.',
];

const weeks = [
  {
    label: 'Week 1',
    title: 'Discovery',
    body: 'Structured interviews with your data, BI, and business stakeholders. Complete inventory of sources, pipelines, warehouses, dashboards, and downstream applications. Baseline of current pain points from the people who live with the platform every day.',
  },
  {
    label: 'Week 2',
    title: 'Benchmarking',
    body: 'Query performance profiling on your top workloads. Cost baselining across Azure, Databricks, and Power BI, including overprovisioned capacity, improper storage tiering, orphaned datasets, and unused Power BI capacity. Data quality, duplication, and lifecycle scoring against a six-dimension framework. Security vulnerability scan across your current data estate.',
  },
  {
    label: 'Week 3',
    title: 'Architecture Design',
    body: 'Target-state medallion architecture on OneLake. Every workload classified as Ready, Ready with Conditions, or Rebuild with the specific remediation steps for each. Direct Lake and Copilot in Fabric enablement plan. Purview-based governance and security model.',
  },
  {
    label: 'Week 4',
    title: 'Roadmap and Business Case',
    body: 'Prioritized migration backlog. Fixed-price Microsoft Fabric migration services proposal. Executive-ready ROI model with 3-year TCO and payback period.',
  },
];

const featuresBenefits = [
  { title: 'Fixed 4-week timeline.', body: 'You get answers before your next quarterly planning cycle, not after two months of scope negotiation.' },
  { title: 'Fixed-price engagement.', body: 'No scope creep, no hourly billing surprises, no invoice arguments at the end.' },
  { title: 'Assessment fee credited toward migration.', body: 'If you proceed with Folio3 for the Fabric migration, the full assessment fee is credited against your migration invoice.' },
  { title: 'Vendor-neutral evaluation.', body: 'We benchmark Microsoft Fabric against Databricks, Snowflake, and your current stack honestly. Our recommendation is not tied to any hyperscaler’s revenue targets.' },
  { title: 'Real workload benchmarking.', body: 'F-SKU capacity sizing based on your actual data, not vendor spreadsheets or generic sizing calculators.' },
  { title: 'Executive-ready deliverables.', body: 'A TCO model and business case a CFO will actually sign off on, not a slide deck full of Gartner quadrants.' },
  { title: 'Migration warranty.', body: 'Everything we scope in the assessment, we commit to deliver at the quoted price if you choose to proceed with Folio3.' },
  { title: 'IntelliFabric acceleration.', body: 'Folio3 clients moving to Microsoft Fabric can accelerate delivery with IntelliFabric, our pre-built data integration and analytics accelerator on Fabric, reducing time-to-first-dashboard from months to weeks.' },
];

const whyStats = [
  { value: '20+', label: 'Years delivering enterprise data platforms' },
  { value: '5,000+', label: 'Projects delivered' },
  { value: '500+', label: 'Enterprise clients served' },
  { value: '700+', label: 'Global employees' },
  { value: '50+', label: 'Microsoft-certified experts' },
  { value: '7+', label: 'Delivery offices worldwide' },
];

const whyBullets = [
  'Over 20+ years delivering enterprise data platforms across Azure, AWS, and on-premise environments.',
  '5,000+ projects delivered and 500+ enterprise clients served across the US, UK, UAE, Canada, Mexico, and APAC.',
  '700+ global employees and 50+ Microsoft-certified experts across Fabric, Synapse, Databricks, Power BI, Purview, and Azure Machine Learning.',
  'Four Microsoft Solutions Partner designations covering Data & AI, Infrastructure, Digital & App Innovation, and Business Applications on Azure.',
  '7+ delivery offices worldwide with 24/7 support coverage for post-migration operations.',
  'Fixed-price engagement model applied across more than 90% of data platform modernization services projects.',
  'Referenceable enterprise customers across manufacturing, retail, healthcare, financial services, media, agriculture, food, and higher education.',
];

const relatedServices = [
  { label: 'Azure cloud services', href: 'https://azure.folio3.com/azure-cloud-service/' },
  { label: 'Azure managed services', href: 'https://azure.folio3.com/azure-managed-services/' },
  { label: 'Microsoft Power Platform', href: 'https://azure.folio3.com/microsoft-power-platform/' },
];

const faqs = [
  {
    q: 'What is an Analytics Modernization Assessment?',
    a: "An Analytics Modernization Assessment is a structured audit of your current data platform, reporting stack, and analytics workloads. It identifies which workloads are ready to move to Microsoft Fabric, quantifies the cost and ROI of the migration, and produces a prioritized roadmap. Folio3's version is delivered by a Microsoft Solutions Partner in Data & AI and runs 4 weeks with fixed scope.",
  },
  {
    q: 'Do we have to commit to a Fabric migration to book the assessment?',
    a: 'No. The assessment is deliberately independent. You keep the report, TCO model, and target-state architecture whether you engage Folio3, another partner, or execute the migration in-house. Roughly one in three assessment clients delay or restructure their migration plans based on our findings.',
  },
  {
    q: 'Should we move to Microsoft Fabric or stay on Azure Synapse and Databricks?',
    a: 'It depends on your workload mix, existing licensing, and team skills. Microsoft Fabric is generally the stronger choice when Power BI is your primary BI tool, when unified governance through OneLake and Purview matters, or when Copilot-driven analytics is a priority. The assessment produces a workload-level answer, not a generic recommendation.',
  },
  {
    q: "Who runs the assessment on Folio3's side?",
    a: 'Each engagement is led by a senior Microsoft Fabric solution architect and staffed with a data engineering lead, a BI lead, and a cloud economics analyst. Every team member is Microsoft-certified and has delivered at least three Fabric or Azure Synapse implementations in production.',
  },
  {
    q: 'How is a Folio3 assessment different from a free Microsoft or vendor-partner assessment?',
    a: "Vendor-run assessments are typically pre-sales exercises designed to move you to a specific SKU. Folio3's assessment is vendor-neutral: we benchmark Microsoft Fabric against Databricks, Snowflake, and your current stack using your actual workloads. Our recommendation as an independent analytics modernization consulting company is not tied to any hyperscaler's revenue targets.",
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Analytics Modernization Assessment',
  serviceType: 'Microsoft Fabric Readiness Assessment',
  provider: {
    '@type': 'Organization',
    name: 'Folio3',
    url: 'https://azure.folio3.com/',
  },
  areaServed: 'Worldwide',
  url: CANONICAL,
  description: DESCRIPTION,
};

export default function AnalyticsModernizationAssessmentPage() {
  return (
    <>
      {/* Fold 1 — Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Microsoft Fabric Services</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">
              Analytics Modernization Assessment for Microsoft Fabric
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              A 4-week, fixed-scope audit of your data estate by a Microsoft Solutions Partner. We benchmark your current
              analytics stack, classify every workload for Microsoft Fabric and AI readiness, and hand over a costed
              migration roadmap — before you commit to a single license or Copilot seat.
            </p>
            <div className="mt-8">
              <Link href={FORM_HREF} className="btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide">
                Schedule a Free Consultation
              </Link>
            </div>
          </div>
          <Reveal animation="zoomIn" className="relative">
            <Image
              src="/wp-content/uploads/2024/06/microsoft-fabric-services-ipad-screen.webp"
              alt="Team reviewing a Microsoft Fabric analytics dashboard"
              width={620}
              height={460}
              priority
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* Trust strip — sits directly under the hero */}
      <section className="bg-[linear-gradient(180deg,#f4f7fb_0%,#eef3f8_100%)]">
        <div className="container-x grid grid-cols-1 gap-8 py-8 md:grid-cols-3 md:gap-6 lg:py-10">
          <div className="flex items-center gap-4">
            <span aria-hidden className="shrink-0">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="17" height="17" fill="#F25022" />
                <rect x="23" y="4" width="17" height="17" fill="#7FBA00" />
                <rect x="4" y="23" width="17" height="17" fill="#00A4EF" />
                <rect x="23" y="23" width="17" height="17" fill="#FFB900" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold leading-snug text-ink">Microsoft Solutions Partner</div>
              <div className="text-sm text-body">Data &amp; AI (Azure)</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span aria-hidden className="shrink-0 text-brand">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3.2" />
                <path d="M2.5 19c0-3 3-5 6.5-5s6.5 2 6.5 5" />
                <circle cx="17" cy="7" r="2.6" />
                <path d="M15 13.5c3 .3 5.5 2.2 5.5 5" />
              </svg>
            </span>
            <div>
              <div className="text-2xl font-bold leading-none text-ink">500+</div>
              <div className="text-sm text-body">clients across 7+ global offices</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span aria-hidden className="shrink-0 text-brand">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3c2.8 3 4.2 6 4.2 9s-1.4 6-4.2 9" />
                <path d="M12 3c-2.8 3-4.2 6-4.2 9s1.4 6 4.2 9" />
              </svg>
            </span>
            <div>
              <div className="text-2xl font-bold leading-none text-ink">20+</div>
              <div className="text-sm text-body">years delivering enterprise data platforms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb bar */}
      <div className="bg-brand">
        <div className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="px-2">/</span>
          <Link href="/#services" className="hover:underline">Services</Link>
          <span className="px-2">/</span>
          <Link href="/microsoft-fabric-services/" className="hover:underline">Microsoft Fabric Services</Link>
          <span className="px-2">/</span>
          <span>Analytics Modernization Assessment</span>
        </div>
      </div>

      {/* Fold 2 — Pain Points */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Signs your analytics stack is holding your business back</h2>
            <p className="mt-4 text-body">
              An analytics modernization assessment is a structured audit that identifies where your current data platform
              is losing money, slowing decisions, or blocking AI adoption — and quantifies the return of moving to Microsoft
              Fabric.
            </p>
            <p className="mt-3 text-body">
              Most enterprises coming to Folio3 for a Microsoft Fabric readiness assessment recognize themselves in at
              least three of the following:
            </p>
          </Reveal>
          <ul className="mx-auto mt-10 max-w-3xl space-y-4">
            {painPoints.map((p, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✕</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fold 3 — Why a Fabric Readiness Assessment Is the Smart First Step */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Before you commit</span>
            <h2 className="text-3xl lg:text-4xl">Why a Fabric readiness assessment is the smart first step</h2>
            <p className="mt-4 text-body">
              Microsoft Fabric is not another BI tool. It changes how you architect, operate, and cost your data platform,
              which is why enterprises that jump straight into a Fabric build without an honest assessment tend to overpay,
              over-scope, and rework the same design two or three times before it stabilizes.
            </p>
            <p className="mt-3 text-body">
              A readiness assessment gives you five decisions you cannot make from a sales deck or a vendor demo:
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {smartFirstStep.map((c, i) => (
              <Reveal key={c.n} animation="fadeInUp" delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-7 shadow-card card-hover">
                  <div className="text-3xl font-bold text-brand">{c.n}</div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">
                    {c.body}
                    {c.link && <a href={c.link.href} className="text-brand underline">{c.link.text}</a>}
                    {c.tail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            For most enterprises, four weeks of assessment saves nine months of rework. That is the trade the Folio3
            Analytics Modernization Assessment is designed around.
          </p>
        </div>
      </section>

      {/* Fold 4 — Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">What you get from a Folio3 Analytics Modernization Assessment</h2>
            <p className="mt-4 text-body">
              The Folio3 assessment gives you a validated business case, a target-state architecture on Microsoft Fabric,
              and a fixed-price migration plan in 4 weeks. No open-ended discovery, no vague recommendations, no vendor
              lock-in.
            </p>
            <p className="mt-3 text-body">Every engagement delivers:</p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {benefits.map((b, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            Explore our full{' '}
            <a href="https://azure.folio3.com/azure-data-analytics/" className="text-brand underline">
              Azure data analytics services
            </a>{' '}
            and how they fit into a Fabric-first modernization program.
          </p>
          <div className="mt-8 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">Request a Call</Link>
          </div>
        </div>
      </section>

      {/* Fold 5 — CTA Banner */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Get your data estate audited by a Microsoft Solutions Partner
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              4 weeks. Fixed scope. Zero obligation to continue with Folio3 for the migration itself.
            </p>
            <Link href={FORM_HREF} className="btn mt-8 bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
              Schedule a Free Consultation
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Fold 6 — What the Assessment Covers */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Assessment scope</span>
            <h2 className="text-3xl lg:text-4xl">What the assessment covers</h2>
            <p className="mt-4 text-body">
              A Folio3 Analytics Modernization Assessment audits your data estate across five dimensions. Every dimension
              gets its own scored section in the final report, so nothing important gets buried inside a summary paragraph.
            </p>
          </Reveal>
          <div className="mt-12 space-y-6">
            <Reveal animation="fadeInUp">
              <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                <h3 className="text-lg font-semibold">Architecture and infrastructure</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  The full topology of your current platform, sources, ingestion, storage, compute, pipelines, dependencies,
                  and security posture. We identify what is already Fabric-ready, what is not, and where technical debt is
                  concentrated across{' '}
                  <a href="https://azure.folio3.com/azure-data-analytics/" className="text-brand underline">
                    Azure Synapse, Azure Data Factory
                  </a>
                  , on-premise SQL Server, and any parallel Databricks or Snowflake estate. Sits alongside the wider{' '}
                  <a href="https://azure.folio3.com/azure-cloud-service/" className="text-brand underline">
                    Azure cloud services
                  </a>{' '}
                  portfolio Folio3 runs for enterprise customers.
                </p>
              </div>
            </Reveal>
            <Reveal animation="fadeInUp" delay={70}>
              <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                <h3 className="text-lg font-semibold">Data engineering and operations</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  How well your ingestion, orchestration, and processing layers translate to Fabric&apos;s lake-centric
                  model on OneLake. Pipeline complexity, scheduling maturity, notebook and stored-procedure inventory, and
                  the real run cost of your current DataOps setup.
                </p>
              </div>
            </Reveal>
            <Reveal animation="fadeInUp" delay={140}>
              <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                <h3 className="text-lg font-semibold">Analytics, BI, AI, and self-service</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  Where your{' '}
                  <a href="https://azure.folio3.com/microsoft-power-platform/" className="text-brand underline">
                    Power BI reports, semantic models
                  </a>
                  , KPIs, data products, and AI workloads stand today, and how each one lands in Microsoft Fabric with
                  Direct Lake and Copilot in Fabric enabled. Self-service maturity for the business users who will
                  actually be using the platform after migration.
                </p>
              </div>
            </Reveal>
            <Reveal animation="fadeInUp" delay={210}>
              <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                <h3 className="text-lg font-semibold">Governance and compliance</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  DataOps and DevOps maturity, access controls, monitoring, audit logging, and alignment with your
                  enterprise security and regulatory obligations. Every finding is mapped against a Microsoft Purview
                  target-state model so remediation is actionable, not abstract. Ongoing enforcement is handled by{' '}
                  <a href="https://azure.folio3.com/azure-managed-services/" className="text-brand underline">
                    Folio3&apos;s Azure managed services
                  </a>{' '}
                  after migration.
                </p>
              </div>
            </Reveal>
            <Reveal animation="fadeInUp" delay={280}>
              <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                <h3 className="text-lg font-semibold">Skills and team capability</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  An honest read on which of your data engineering, BI, and platform skills carry directly into Fabric,
                  which need targeted upskilling, and where you may need to hire or partner. The most expensive Fabric
                  mistakes are not architectural, they are the skills gaps nobody scoped for.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Fold 7 — What You Can Expect (4-week timeline + Who this is for) */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">What you can expect from our Microsoft Fabric assessment</h2>
            <p className="mt-4 text-body">
              Every engagement follows the same four-week structure. You get the same senior team from kickoff to hand-off,
              and every deliverable is yours to keep whether or not you continue with Folio3.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {weeks.map((w, i) => (
              <Reveal key={w.label} animation="fadeInUp" delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">{w.label}</div>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal animation="fadeInUp">
              <div className="h-full rounded-2xl border-l-4 border-brand bg-white p-7 shadow-card">
                <h3 className="text-lg font-semibold">Deliverables you keep</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  Assessment report of approximately 40 pages, 3-year TCO model in Excel, reference architecture diagrams,
                  workload classification matrix, and an executive summary deck ready for board-level review.
                </p>
              </div>
            </Reveal>
            <Reveal animation="fadeInUp" delay={80}>
              <div className="h-full rounded-2xl border-l-4 border-brand-navy bg-white p-7 shadow-card">
                <h3 className="text-lg font-semibold">Who this assessment is built for</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  CIOs, CTOs, and Chief Data Officers evaluating Microsoft Fabric. Heads of Data &amp; Analytics and
                  Enterprise Architects planning a data platform consolidation. VPs of BI moving off legacy Synapse,
                  Teradata, on-premise SQL Server, or fragmented Databricks estates.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Fold 8 — Your Fabric Readiness Score */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Your deliverables</span>
            <h2 className="text-3xl lg:text-4xl">Your Fabric Readiness Score: what you receive</h2>
            <p className="mt-4 text-body">
              At the end of the four weeks, you receive a single, defensible artifact you can walk into a board meeting
              with. Every deliverable is designed to be understood in five minutes by a CFO and in five hours by an
              enterprise architect.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
            {/* Score card visual (static illustrative) */}
            <Reveal animation="zoomIn">
              <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-cardHover">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand">Sample enterprise result</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-6xl font-bold text-ink">72</span>
                  <span className="text-lg text-body">/ 100</span>
                </div>
                <div className="mt-1 text-sm font-semibold text-brand">Fabric Readiness Score</div>
                <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-surface-chip">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#143CD5] to-[#2F69F2]" style={{ width: '72%' }} />
                </div>
                <div className="mt-6 space-y-3 text-sm">
                  {[
                    { k: 'Architecture', v: 78 },
                    { k: 'Data engineering', v: 74 },
                    { k: 'Governance', v: 65 },
                    { k: 'Analytics & AI', v: 80 },
                    { k: 'Team readiness', v: 62 },
                  ].map((row) => (
                    <div key={row.k}>
                      <div className="flex justify-between text-body">
                        <span>{row.k}</span>
                        <span className="font-semibold text-ink">{row.v}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-chip">
                        <div className="h-full rounded-full bg-brand" style={{ width: `${row.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[11px] leading-relaxed text-muted">
                  Illustrative only. Your engagement produces your own scored report.
                </p>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal animation="fadeInUp">
                <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg font-semibold">Fabric Readiness Score (0–100)</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    A single number that tells you, and everyone else in the room, how ready your data estate actually is
                    for Microsoft Fabric. Backed by the full underlying scoring model, not a marketing exercise.
                  </p>
                </div>
              </Reveal>
              <Reveal animation="fadeInUp" delay={70}>
                <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg font-semibold">Dimension breakdown</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    Independent scores for architecture, data engineering, governance, analytics, and team readiness, so
                    you know exactly where to invest ahead of migration and where you can move fast without preparation.
                  </p>
                </div>
              </Reveal>
              <Reveal animation="fadeInUp" delay={140}>
                <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg font-semibold">Gap analysis</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    A precise list of what is missing, what is already strong, and what needs to be fixed first. Written in
                    language your engineering leads can act on the same day the report lands.
                  </p>
                </div>
              </Reveal>
              <Reveal animation="fadeInUp" delay={210}>
                <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg font-semibold">Prioritized Fabric adoption roadmap</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    A phased migration plan sequenced by ROI, risk, and dependency, with named workloads, suggested
                    owners, and target sprint windows. Ready to slot into your existing PMO. See how this played out for{' '}
                    <a href="https://azure.folio3.com/savills/" className="text-brand underline">Savills</a> and{' '}
                    <a href="https://azure.folio3.com/city-university-azure/" className="text-brand underline">
                      City University of Seattle
                    </a>
                    .
                  </p>
                </div>
              </Reveal>
              <Reveal animation="fadeInUp" delay={280}>
                <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg font-semibold">Cost and ROI signals</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    A realistic snapshot of migration investment, projected run-cost delta on Microsoft Fabric capacity,
                    and payback period. No inflated savings, no vendor optimism, no numbers that fall apart under a
                    CFO&apos;s review.
                  </p>
                </div>
              </Reveal>
              <p className="text-sm text-body">
                Every artifact is yours to keep, the readiness report, TCO model, reference architecture, and executive
                deck, whether or not you continue with Folio3 for the migration itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fold 9 — Awards & Recognition */}
      <AwardsBand />
      <section className="bg-surface-tint py-10">
        <div className="container-x text-center">
          <p className="text-sm text-body">
            For a fuller view of Folio3&apos;s Microsoft licensing capabilities, see our{' '}
            <a href="https://azure.folio3.com/microsoft-licensing-process/" className="text-brand underline">
              Microsoft licensing services
            </a>
            .
          </p>
        </div>
      </section>

      {/* Fold 10 — Features and Benefits (2-column grid with left-border accents; NOT a table) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">
              How our assessment is different from vendor-run and free alternatives
            </h2>
            <p className="mt-4 text-body">
              Most &ldquo;free&rdquo; assessments are pre-sales exercises designed to move you to a specific SKU.
              Folio3&apos;s assessment is engineered around independence, speed, and financial accountability, the three
              things enterprise buyers actually need before signing a multi-million-dollar modernization contract.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuresBenefits.map((f, i) => (
              <Reveal key={f.title} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-r-2xl border-l-4 border-brand bg-white p-6 shadow-card">
                  <h3 className="text-base font-semibold leading-snug">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">Request a Call</Link>
          </div>
        </div>
      </section>

      {/* Fold 11 — Why Choose Folio3? */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Why enterprises choose Folio3 for Microsoft Fabric modernization</h2>
            <p className="mt-4 text-body">
              Folio3 is one of a small group of Microsoft Solutions Partners with the depth to run a vendor-neutral
              analytics modernization consulting engagement and then deliver the resulting Microsoft Fabric implementation
              services end-to-end.
            </p>
          </Reveal>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {whyStats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white p-5 text-center shadow-card">
                <div className="text-2xl font-bold text-brand lg:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs leading-snug text-body">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bullet list */}
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {whyBullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            To see how the assessment slots into a broader engagement, review our related services:
          </p>

          {/* Related-services chip row */}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {relatedServices.map((r) => (
              <a
                key={r.href}
                href={r.href}
                className="rounded-full border border-surface-line bg-white px-4 py-2 text-sm font-medium text-brand shadow-sm hover:bg-surface-chip"
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 12 — Real Results, Real Impact (auto-scrolling horizontal strip) */}
      <AutoScrollCases cases={caseStudies} />

      {/* Fold 13 — FAQs + Consultation form */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Frequently asked questions about the Analytics Modernization Assessment</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-surface-line rounded-2xl border border-surface-line bg-white shadow-card">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-base font-semibold text-ink">{f.q}</span>
                  <span aria-hidden className="text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <OneToOneCTA />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hidden preload of the OG image so it's discoverable in the DOM */}
      <div aria-hidden className="h-0 w-0 overflow-hidden">
        <Image src={OG_IMAGE} alt="" width={2} height={2} />
      </div>
    </>
  );
}
