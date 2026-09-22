import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { AwardsBand } from '@/components/sections/AwardsBand';
import { AutoScrollCases, type CaseItem } from '@/components/sections/AutoScrollCases';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

const caseStudies: CaseItem[] = [
  {
    name: 'Weaver Popcorn Hybrids',
    img: '/wp-content/uploads/2026/01/weaver-popcorn-hybrids-1.webp',
    blurb: 'Weaver Popcorn Hybrids modernizes analytics with IntelliFabric on Microsoft Fabric.',
    href: '/case-studies/wph-intellifabric/',
  },
  {
    name: 'Savills',
    img: '/wp-content/uploads/2025/07/microsoft-fabric-reporting-boosting-operational-effiency.webp',
    blurb: 'Microsoft Fabric reporting boosts Savills’ operational efficiency by 13%.',
    href: '/savills/',
  },
  {
    name: 'Alibaba — Power BI Reporting',
    img: '/wp-content/uploads/2025/07/alibaba-achieves-faster-financial-closings-with-power-bi-reporting.webp',
    blurb: 'Alibaba achieves 37% faster financial closings with Power BI reporting.',
    href: '/power-bi-financial-reporting-for-alibaba/',
  },
  {
    name: 'City University of Seattle',
    img: '/wp-content/uploads/2025/07/power-apps-solution-for-city-university.webp',
    blurb: 'Power Apps solution and data platform on Azure for The City University of Seattle.',
    href: '/city-university-azure/',
  },
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
];

const CANONICAL = 'https://azure.folio3.com/microsoft-fabric-services/training/';
const TITLE = 'Microsoft Fabric Training | Folio3';
const DESCRIPTION =
  'Upskill your team with Microsoft Fabric training in analytics, Power BI, data engineering, governance, and OneLake.';
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

const proofPoints = [
  'Role-based learning for analysts, Power BI developers, data engineers, architects, and administrators.',
  'Hands-on labs across OneLake, Lakehouse, Data Factory, pipelines, notebooks, warehouses, semantic models, Power BI, and governance.',
  'Private team workshops using relevant business scenarios and, where appropriate, your own data environment.',
  'Optional readiness assessment, architecture guidance, mentoring, and implementation support after training.',
];

const outcomes = [
  'Navigate Fabric workloads and organize workspaces effectively.',
  'Build Lakehouses and Warehouses for analytics workloads.',
  'Ingest and transform data with Data Factory, Dataflows Gen2, pipelines, and notebooks.',
  'Work with OneLake, Delta tables, shortcuts, and medallion-style data architecture patterns.',
  'Create semantic models, measures, and Power BI reports for business users.',
  'Choose appropriate tools and patterns for SQL, DAX, KQL, Spark, and notebooks.',
  'Implement data access controls, workspace strategy, sensitivity labels, and governance practices.',
  'Monitor, deploy, and manage analytics solutions through a practical development lifecycle.',
  'Build an enterprise Fabric adoption plan aligned to business priorities.',
];

const capstoneSteps = [
  { n: '01', title: 'Connect source data', body: 'Connect operational systems, SaaS applications, and Azure services to Microsoft Fabric.' },
  { n: '02', title: 'Ingest and transform', body: 'Move and shape data through Data Factory, Dataflows Gen2, or pipelines using patterns your team will reuse.' },
  { n: '03', title: 'Store and organize', body: 'Land data in OneLake and organize it in a Lakehouse or Warehouse using medallion-style layers.' },
  { n: '04', title: 'Model for analysis', body: 'Design semantic models and measures that scale beyond one-off dashboards.' },
  { n: '05', title: 'Build Power BI reports', body: 'Ship governed reports and dashboards business stakeholders can actually use.' },
  { n: '06', title: 'Apply governance', body: 'Wire in workspace access, security, data governance, and lifecycle practices.' },
  { n: '07', title: 'Review and adopt', body: 'Inspect performance, refresh, monitoring, and next-step adoption considerations.' },
];

const formats = [
  { format: 'Executive Fabric overview', ideal: 'Leaders evaluating Fabric or aligning stakeholders', duration: '2–4 hours', included: 'Platform overview, use-case discussion, adoption considerations, Q&A' },
  { format: 'Fundamentals workshop', ideal: 'Mixed business and technical teams', duration: '1 day', included: 'Core concepts, demonstrations, guided exercises, next-step recommendations' },
  { format: 'Hands-on team workshop', ideal: 'Analysts, BI developers, and data engineers', duration: '2 days', included: 'Role-based labs, practical scenarios, team discussion, action plan' },
  { format: 'Intensive Fabric bootcamp', ideal: 'Teams needing accelerated upskilling', duration: '3–5 days', included: 'Deep technical modules, labs, capstone, instructor-led Q&A' },
  { format: 'Custom enterprise enablement', ideal: 'Organizations adopting or scaling Fabric', duration: 'Custom', included: 'Discovery, tailored curriculum, custom labs, governance and adoption guidance' },
];

const readinessDeliverables = [
  'Review of current data platform, Power BI environment, reporting landscape, and analytical maturity.',
  'Identification of high-value Fabric use cases and priority user groups.',
  'Skills-gap analysis and recommended learning paths.',
  'Initial guidance on target architecture, governance, workspace strategy, and operating model.',
  'Considerations for capacity, licensing, security, migration, and data readiness.',
  'A phased training and adoption roadmap.',
];

const postTraining = [
  'Instructor office hours and implementation Q&A.',
  'Mentoring for analysts, engineers, architects, and internal champions.',
  'Architecture and design reviews.',
  'Proof-of-concept planning and delivery support.',
  'Governance, security, and workspace strategy guidance.',
  'Fabric Center of Excellence enablement.',
  'Documentation, templates, standards, and reusable accelerator assets.',
  'Implementation, migration, and managed support services where required.',
];

const whyApproach = [
  { title: 'Enterprise-focused', body: 'Training designed for teams, operating models, governance, and business outcomes, not isolated feature walkthroughs.' },
  { title: 'Role-based', body: 'Learning paths tailored for analysts, developers, engineers, architects, leaders, and platform administrators.' },
  { title: 'Hands-on', body: 'Practical labs, use cases, exercises, and a capstone approach where appropriate.' },
  { title: 'Customizable', body: 'Training can reflect your existing Azure, Power BI, data, and reporting environment.' },
  { title: 'Adoption-aware', body: 'Guidance can extend to governance, security, capacity planning, support models, user enablement, and a Center of Excellence.' },
  { title: 'End-to-end', body: 'Optional consulting and implementation support after training helps your organization progress from learning to delivery.' },
];

type Path = {
  eyebrow: string;
  title: string;
  bestFor: string;
  intro: React.ReactNode;
  outcomes: string[];
};

const paths: Path[] = [
  {
    eyebrow: 'Learning path 01',
    title: 'Microsoft Fabric Fundamentals',
    bestFor: 'Business analysts, BI professionals, data leaders, Power BI users, and teams evaluating Fabric.',
    intro: 'Build a clear understanding of Fabric workloads, OneLake, Lakehouse, Warehouse, Data Factory, Power BI, and Real-Time Intelligence. Participants learn where Fabric fits in a modern analytics strategy and how the platform supports end-to-end data scenarios.',
    outcomes: [
      'Understand Fabric architecture and core workloads.',
      'Identify priority use cases for your organization.',
      'Understand how OneLake connects data across teams.',
      'Create a practical starting point for Fabric adoption.',
    ],
  },
  {
    eyebrow: 'Learning path 02',
    title: 'Microsoft Fabric for Data Analysts and Power BI Teams',
    bestFor: 'Data analysts, BI developers, report developers, and Power BI teams.',
    intro: (
      <>
        Learn to prepare data, build semantic models, develop measures, create governed reports, and use Fabric capabilities alongside Power BI. Teams that need help extending learning into reporting delivery, governed semantic models, and enterprise BI can also explore Folio3&apos;s{' '}
        <a href="https://azure.folio3.com/azure-data-analytics/" className="text-brand underline">Power BI and data analytics services</a>.
      </>
    ),
    outcomes: [
      'Build reusable semantic models and star-schema-oriented reporting solutions.',
      'Create Power BI reports and dashboards on governed data.',
      'Understand Direct Lake, refresh patterns, security, and lifecycle considerations.',
      'Apply reporting standards that scale beyond individual dashboards.',
    ],
  },
  {
    eyebrow: 'Learning path 03',
    title: 'Microsoft Fabric Data Engineering Training',
    bestFor: 'Data engineers, analytics engineers, ETL developers, and Azure data professionals.',
    intro: 'Build practical skills for data ingestion, transformation, orchestration, and storage using Lakehouses, Warehouses, Data Factory, pipelines, Dataflows Gen2, Spark notebooks, and Delta tables.',
    outcomes: [
      'Create repeatable ingestion and transformation pipelines.',
      'Design Lakehouse and Warehouse patterns for analytics.',
      'Work with notebooks, SQL, and Spark-based transformations.',
      'Implement data quality, monitoring, and operational practices.',
    ],
  },
  {
    eyebrow: 'Learning path 04',
    title: 'Microsoft Fabric Architecture, Governance, and Administration',
    bestFor: 'Solution architects, platform owners, IT leaders, data governance teams, and Fabric administrators.',
    intro: 'Learn how to establish a scalable Fabric operating model. This path addresses workspace strategy, security, capacity considerations, governance, deployment practices, adoption, and a Center of Excellence approach.',
    outcomes: [
      'Define workspace, environment, and ownership models.',
      'Establish access, governance, security, and lifecycle standards.',
      'Create an adoption and user-enablement approach.',
      'Align technology decisions with capacity, cost, and operational requirements.',
    ],
  },
  {
    eyebrow: 'Learning path 05',
    title: 'DP-600 Training: Fabric Analytics Engineer Preparation',
    bestFor: 'Analytics engineers, BI developers, data analysts, and professionals preparing for the Microsoft Certified: Fabric Analytics Engineer Associate exam.',
    intro: 'This instructor-led learning path helps participants build practical skills relevant to implementing analytics solutions in Fabric, including Lakehouses, Warehouses, Dataflows, pipelines, semantic models, Power BI, SQL, DAX, and security. Folio3 provides training and exam-readiness support; Microsoft certification and exam registration are administered by Microsoft and its authorized exam-delivery process.',
    outcomes: [
      'Prepare data and design analytics solutions on Fabric.',
      'Practice with semantic models, Lakehouses, and Warehouses.',
      'Work through SQL, DAX, security, and deployment considerations.',
      'Build exam-ready confidence through instructor-led review.',
    ],
  },
];

const faqs = [
  {
    q: 'What is Microsoft Fabric training?',
    a: "Microsoft Fabric training teaches teams how to use Microsoft's unified analytics platform to ingest, transform, store, model, govern, and analyze data on a shared OneLake foundation. Folio3's programs are hands-on and role-based, so participants practice the workflows they will actually use in their environment.",
  },
  {
    q: 'Who should attend Microsoft Fabric training?',
    a: 'Microsoft Fabric training is relevant for data analysts, Power BI developers, BI professionals, data engineers, analytics engineers, solution architects, Fabric administrators, IT leaders, and business stakeholders. Folio3 can recommend separate or combined learning tracks based on participant roles and current skill levels.',
  },
  {
    q: 'Does the training require prior Power BI or Azure experience?',
    a: 'Requirements depend on the learning path. A Fabric fundamentals workshop can be suitable for mixed audiences. Data engineering and advanced analytics tracks may require familiarity with SQL, Power BI, data modeling, Python, Spark, or Azure data services. We confirm prerequisites during the discovery process.',
  },
  {
    q: 'Can Folio3 customize Microsoft Fabric training for our organization?',
    a: "Yes. We can tailor the learning agenda, examples, labs, delivery schedule, and technical depth to your team's roles, current environment, data sources, Power BI maturity, and target Fabric use cases.",
  },
  {
    q: 'Is the training available virtually or onsite?',
    a: 'Yes. Folio3 can deliver live virtual, onsite, or hybrid Microsoft Fabric training. Delivery options depend on location, cohort size, timeline, and engagement scope.',
  },
  {
    q: 'Will participants receive hands-on labs?',
    a: 'Hands-on labs can be included in most technical tracks. Lab content may cover OneLake, Lakehouse, Warehouse, Data Factory, pipelines, Dataflows Gen2, notebooks, semantic models, Power BI, governance, and administration depending on your selected learning path.',
  },
  {
    q: 'Does the course prepare participants for DP-600?',
    a: 'The DP-600 preparation path covers practical Fabric Analytics Engineer skills relevant to the exam, such as data preparation, analytics solution design, semantic models, Lakehouses, Warehouses, security, and deployment considerations. It is training support, not a guarantee of certification or exam outcome.',
  },
  {
    q: 'Can you help us implement Microsoft Fabric after the training?',
    a: 'Yes. Beyond training, Folio3 provides Microsoft Fabric consulting and implementation support, including follow-up office hours, architecture guidance, proof-of-concept delivery, governance enablement, migration support, and managed services where required.',
    aLinkHref: 'https://azure.folio3.com/microsoft-fabric-services/',
    aLinkText: 'Microsoft Fabric consulting and implementation',
  },
  {
    q: 'How long is Microsoft Fabric training?',
    a: 'Programs can range from a short 2–4 hour executive workshop to a one-day fundamentals session, two-day hands-on workshop, three-to-five-day bootcamp, or a multi-phase enterprise enablement program. The best format depends on audience roles, starting skill level, desired depth, and use cases.',
  },
  {
    q: 'What is a Microsoft Fabric readiness workshop?',
    a: 'A short engagement that reviews your current data platform, identifies high-value Fabric use cases, analyzes skills gaps, and produces a phased training and adoption roadmap before broad technical enablement or implementation.',
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

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Microsoft Fabric Training for Enterprise Teams',
  description: DESCRIPTION,
  provider: {
    '@type': 'Organization',
    name: 'Folio3',
    sameAs: 'https://azure.folio3.com/',
  },
  url: CANONICAL,
};

export default function MicrosoftFabricTrainingPage() {
  return (
    <>
      {/* Fold 1 — Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Microsoft Fabric Training</p>
            <h1 className="text-4xl font-bold leading-[1.1] text-ink lg:text-5xl xl:text-6xl">
              Microsoft Fabric training built for your{' '}
              <span className="text-brand">data, teams, and adoption goals</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Give your data, BI, and engineering teams the practical Microsoft Fabric skills they need to build governed, scalable analytics solutions. Folio3 delivers live, hands-on training, virtually, on-site, or in a hybrid format, tailored to your current Azure and Power BI environment, learner roles, business use cases, and Fabric adoption roadmap.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={FORM_HREF} className="btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide">
                Request a Custom Training Plan
              </Link>
              <Link href={FORM_HREF} className="btn-outline uppercase tracking-wide">
                Download the Curriculum
              </Link>
            </div>
          </div>
          <Reveal animation="zoomIn" className="relative">
            <Image
              src="/wp-content/uploads/2024/06/microsoft-fabric-services-ipad-screen.webp"
              alt="Microsoft Fabric training on a laptop and tablet"
              width={620}
              height={460}
              priority
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand">
        <div className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="px-2">/</span>
          <Link href="/#services" className="hover:underline">Services</Link>
          <span className="px-2">/</span>
          <Link href="/microsoft-fabric-services/" className="hover:underline">Microsoft Fabric Services</Link>
          <span className="px-2">/</span>
          <span>Training</span>
        </div>
      </div>

      {/* Proof points */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {proofPoints.map((p) => (
              <li key={p} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What Is Microsoft Fabric Training */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The training</span>
            <h2 className="text-3xl lg:text-4xl">What is Microsoft Fabric training?</h2>
            <p className="mt-4 text-body">
              Microsoft Fabric training teaches teams how to use Microsoft&apos;s unified analytics platform to ingest, transform, store, model, govern, and analyze data. Rather than treating data engineering, data warehousing, BI, and real-time analytics as separate disciplines, Fabric brings these workloads together on a shared data foundation in OneLake.
            </p>
            <p className="mt-3 text-body">
              At Folio3, training is not limited to product demonstrations. Your team practices the workflows needed to design and operate solutions — from data ingestion and transformation through governed reporting, security, lifecycle management, and adoption.
            </p>
          </Reveal>

          <Reveal animation="fadeInUp" className="mx-auto mt-14 max-w-5xl">
            <h3 className="text-2xl font-semibold text-ink lg:text-3xl">What will your team be able to do after training?</h3>
            <p className="mt-3 text-body">Depending on the learning path selected, participants can learn to:</p>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
              {outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-body">
                  <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                  <span className="leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Learning paths */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Learning paths</span>
            <h2 className="text-3xl lg:text-4xl">Choose the right Microsoft Fabric learning path</h2>
            <p className="mt-4 text-body">
              Every path is instructor-led, hands-on, and can be delivered as a focused workshop, multi-day program, bootcamp, or phased enablement plan.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {paths.map((p, i) => (
              <Reveal key={p.title} animation="fadeInUp" delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-7 shadow-card card-hover">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">{p.eyebrow}</div>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-ink">{p.title}</h3>
                  <p className="mt-3 text-sm text-body"><span className="font-semibold text-ink">Best for:</span> {p.bestFor}</p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{p.intro}</p>
                  <ul className="mt-5 space-y-2 text-sm text-body">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex gap-2">
                        <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                        <span className="leading-relaxed">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Custom training callout */}
          <Reveal animation="fadeInUp" className="mx-auto mt-10 max-w-5xl rounded-2xl border border-brand/20 bg-[#f4f7ff] p-8">
            <h3 className="text-xl font-semibold text-ink">Custom Microsoft Fabric training for teams</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">
              <span className="font-semibold text-ink">Best for:</span> organizations with specific workloads, technical standards, learning objectives, or adoption plans. We tailor the agenda around your team&apos;s roles, current skills, source systems, Power BI estate, Azure services, data architecture, and target business outcomes.
            </p>
            <div className="mt-6">
              <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">Request a Custom Training Plan</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Awards & Recognition */}
      <AwardsBand autoScroll />

      {/* Hands-on labs and capstone */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Hands-on</span>
            <h2 className="text-3xl lg:text-4xl">Hands-on labs and a realistic capstone</h2>
            <p className="mt-4 text-body">
              Your team learns by building — not only by watching demos. Folio3 training can include guided labs, exercises, discussions, and a capstone scenario that reflects a real analytics workflow.
            </p>
            <p className="mt-3 text-body">
              Lab depth is set by the learning path. Data engineering cohorts go deeper on notebooks, pipelines, Spark, Delta tables, and orchestration; analyst cohorts focus on semantic models, DAX, Direct Lake, and Power BI reporting.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capstoneSteps.map((s, i) => (
              <Reveal key={s.n} animation="fadeInUp" delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <div className="text-2xl font-bold text-brand">{s.n}</div>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-body">
            The lab environment reflects the full analytics workflow covered by Folio3&apos;s wider{' '}
            <a href="https://azure.folio3.com/azure-data-analytics/" className="text-brand underline">Azure data analytics services</a>, so participants practice patterns they can reuse in production.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Build Microsoft Fabric skills your team will actually use on Monday
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Private cohorts, role-based labs, and a delivery format that fits your team&apos;s calendar.
            </p>
            <Link href={FORM_HREF} className="btn mt-8 bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
              Talk to a Fabric Training Consultant
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Training That Uses Your Business Context */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Business context</span>
            <h2 className="text-3xl lg:text-4xl">Training that uses your business context</h2>
            <p className="mt-4 text-body">
              Generic courses can teach features. Enterprise training should help teams apply those features in the environment they actually work in. Folio3 can customize Microsoft Fabric training around:
            </p>
          </Reveal>

          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {[
              'Your data sources, such as ERP, CRM, SQL databases, APIs, SaaS applications, files, and Azure services.',
              'Your current Power BI reports, semantic models, refresh challenges, and governance requirements.',
              'Your data engineering and BI operating model.',
              <>Priority business scenarios, including finance reporting, operations analytics, customer insights,{' '}
                <a href="https://azure.folio3.com/azure-data-analytics/supply-chain-analytics/" className="text-brand underline">supply chain analytics</a>, and executive dashboards.</>,
              'Your target Fabric architecture, migration plan, or proof-of-concept goals.',
              'Your organization’s roles, learning levels, time zones, and delivery preferences.',
            ].map((b, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            If you need an accelerated, governed starting point for self-service analytics, explore the{' '}
            <a href="https://azure.folio3.com/solution/intellifabric/" className="text-brand underline">IntelliFabric analytics solution</a>, Folio3&apos;s Microsoft Fabric-based analytics operating model with prebuilt dashboards, automated pipelines, and governed data models.
          </p>
        </div>
      </section>

      {/* Delivery formats table */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Delivery formats</span>
            <h2 className="text-3xl lg:text-4xl">Delivery formats for every team</h2>
            <p className="mt-4 text-body">
              Live virtual training, onsite training, hybrid delivery, private cohorts, and regional or global scheduling — subject to engagement requirements.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
            <div className="hidden grid-cols-[1.2fr_1.4fr_0.9fr_1.8fr] gap-4 bg-[#f4f7fb] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink md:grid">
              <div>Format</div>
              <div>Ideal for</div>
              <div>Typical duration</div>
              <div>What is included</div>
            </div>
            {formats.map((r, i) => (
              <div
                key={r.format}
                className={`grid grid-cols-1 gap-2 px-6 py-5 text-sm text-body md:grid-cols-[1.2fr_1.4fr_0.9fr_1.8fr] md:gap-4 ${i !== 0 ? 'border-t border-surface-line' : ''}`}
              >
                <div className="font-semibold text-ink">{r.format}</div>
                <div>{r.ideal}</div>
                <div className="text-brand">{r.duration}</div>
                <div>{r.included}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Readiness Workshop */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Before broad enablement</span>
            <h2 className="text-3xl lg:text-4xl">Start with a Microsoft Fabric readiness workshop</h2>
            <p className="mt-4 text-body">
              Not every organization needs a course first. If you are still deciding how Fabric fits your data strategy, begin with a Microsoft Fabric Readiness Workshop. For a deeper audit ahead of training or implementation, our{' '}
              <a href="https://azure.folio3.com/microsoft-fabric-services/analytics-modernization-assessment/" className="text-brand underline">Analytics Modernization Assessment</a>{' '}
              evaluates the current analytics estate and provides a prioritized Fabric roadmap.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-2xl border border-surface-line bg-white p-8 shadow-card">
              <h3 className="text-lg font-semibold text-ink">Readiness workshop deliverables</h3>
              <ul className="mt-5 space-y-3 text-sm text-body">
                {readinessDeliverables.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">Book a Fabric Readiness Workshop</Link>
              </div>
            </div>
            <div className="rounded-2xl border border-surface-line bg-[#f4f7fb] p-8">
              <h3 className="text-lg font-semibold text-ink">Support beyond the training room</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Training creates momentum; sustained adoption requires a practical support model. Folio3 can continue working with your team after the course through:
              </p>
              <ul className="mt-5 space-y-3 text-sm text-body">
                {postTraining.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Folio3 */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Why choose Folio3 for Microsoft Fabric training?</h2>
            <p className="mt-4 text-body">
              Folio3 brings together Azure, data engineering, Power BI, analytics, and enterprise implementation expertise to help teams connect learning with real delivery outcomes. Organizations connecting Fabric enablement with predictive analytics, machine learning, or AI initiatives can also explore Folio3&apos;s{' '}
              <a href="https://azure.folio3.com/data-science-ai/" className="text-brand underline">Data Science and AI services</a>.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {whyApproach.map((f, i) => (
              <Reveal key={f.title} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-r-2xl border-l-4 border-brand bg-white p-6 shadow-card">
                  <h3 className="text-base font-semibold leading-snug">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">Request a Custom Training Plan</Link>
          </div>
        </div>
      </section>

      {/* Real Results — case studies */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Real results</span>
            <h2 className="text-3xl lg:text-4xl">Enterprises that turned Fabric learning into delivery</h2>
            <p className="mt-4 text-body">
              A sample of Folio3 client engagements where training, readiness, and Microsoft Fabric implementation came together to move real business outcomes.
            </p>
          </Reveal>
        </div>
        <div className="mt-12">
          <AutoScrollCases cases={caseStudies} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Frequently asked questions about Microsoft Fabric training</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-surface-line rounded-2xl border border-surface-line bg-white shadow-card">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-base font-semibold text-ink">{f.q}</span>
                  <span aria-hidden className="text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-body">
                  {f.aLinkHref ? (
                    <>
                      Yes. Beyond training, Folio3 provides{' '}
                      <a href={f.aLinkHref} className="text-brand underline">{f.aLinkText}</a>{' '}
                      support, including follow-up office hours, architecture guidance, proof-of-concept delivery, governance enablement, migration support, and managed services where required.
                    </>
                  ) : (
                    f.a
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <OneToOneCTA />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />

      <div aria-hidden className="h-0 w-0 overflow-hidden">
        <Image src={OG_IMAGE} alt="" width={2} height={2} />
      </div>
    </>
  );
}
