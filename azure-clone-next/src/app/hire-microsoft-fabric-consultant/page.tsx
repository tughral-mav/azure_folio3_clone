import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { AwardsBand } from '@/components/sections/AwardsBand';
import { AutoScrollCases, type CaseItem } from '@/components/sections/AutoScrollCases';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

const SLUG = 'hire-microsoft-fabric-consultant';
const CANONICAL = `https://azure.folio3.com/${SLUG}/`;
const TITLE = 'Hire Microsoft Fabric Consultants | Consulting, Migration & Implementation | Folio3';
const DESCRIPTION =
  'Hire Microsoft Fabric consultants from Folio3 to assess, implement, migrate, govern, and optimize Microsoft Fabric. Get expert support for OneLake, Power BI, Fabric Data Factory, data warehousing, and analytics.';
const OG_IMAGE = '/wp-content/uploads/2024/06/microsoft-fabric-services-ipad-screen.webp';
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

const trustBar = [
  'Microsoft Solutions Partner',
  '14+ years of Microsoft partnership',
  '200+ certified experts',
  'Microsoft Fabric, Azure, Power BI, data engineering, and AI expertise',
];

const whenToHire = [
  'Unify data from ERP, CRM, finance, operations, IoT, and third-party systems.',
  'Modernize legacy reporting, data warehouses, Azure Data Factory, Synapse, or Power BI environments.',
  'Design a OneLake, Lakehouse, Warehouse, or medallion-style data architecture.',
  'Improve Power BI semantic models, reporting performance, security, and self-service analytics.',
  'Plan Fabric capacity, control costs, and establish monitoring and workload governance.',
  'Implement data security, role-based access, lineage, quality controls, and compliance practices.',
  'Build a proof of concept before making a larger Microsoft Fabric investment.',
  'Add specialized Fabric expertise without immediately recruiting a full-time team.',
];

type Role = { title: string; body: React.ReactNode };

const roles: Role[] = [
  {
    title: 'Microsoft Fabric Solution Architect',
    body: 'Define your Fabric adoption roadmap, target architecture, workspace and domain strategy, security model, capacity approach, and scalable operating model.',
  },
  {
    title: 'Fabric Data Engineer',
    body: 'Build reliable ingestion, transformation, orchestration, Lakehouse pipelines, notebooks, and data products using Microsoft Fabric Data Factory and data engineering capabilities.',
  },
  {
    title: 'Power BI and Semantic Model Consultant',
    body: 'Modernize reporting with governed semantic models, Direct Lake, DAX optimization, row-level security, self-service reporting, and executive dashboards.',
  },
  {
    title: 'Data Warehouse and Lakehouse Specialist',
    body: (
      <>
        Design warehouse and Lakehouse workloads that support trusted reporting, scalable analytics, historical data management, and high-performance query patterns. For a deeper technical overview of this workload, read Folio3&apos;s{' '}
        <a href="https://azure.folio3.com/blog/guide-to-microsoft-fabric-data-warehouse/" className="text-brand underline">
          Microsoft Fabric data warehouse guide
        </a>
        .
      </>
    ),
  },
  {
    title: 'Governance and Optimization Consultant',
    body: 'Help establish data access policies, lineage, monitoring, environment standards, release practices, capacity governance, and cost optimization.',
  },
  {
    title: 'AI and Copilot Enablement Specialist',
    body: (
      <>
        Prepare governed data foundations for AI use cases, analytics automation, and Copilot-enabled insights where appropriate for your environment. Organizations planning governed AI adoption can also explore Folio3&apos;s{' '}
        <a href="https://azure.folio3.com/data-science-ai/microsoft-copilot-consulting/" className="text-brand underline">
          Microsoft Copilot consulting
        </a>{' '}
        services.
      </>
    ),
  },
];

type Service = { title: string; intro: React.ReactNode; bullets?: string[] };

const services: Service[] = [
  {
    title: 'Fabric Strategy and Readiness Assessment',
    intro:
      'Start with a practical assessment of your current data estate, business priorities, integration landscape, reporting needs, risks, and Fabric suitability. You receive a prioritized roadmap that connects platform decisions with business outcomes.',
    bullets: [
      'Current-state data and analytics review',
      'Use-case prioritization and value roadmap',
      'Microsoft Fabric target architecture',
      'OneLake, workspace, and domain recommendations',
      'Capacity and licensing considerations',
      'Governance and security recommendations',
      'Migration approach, delivery plan, and next-step backlog',
    ],
  },
  {
    title: 'Microsoft Fabric Architecture and Implementation',
    intro:
      'Build a Fabric environment designed for scale, governed collaboration, and long-term maintainability. We configure and implement the right combination of Fabric workloads for your needs.',
    bullets: [
      'OneLake architecture and data organization',
      'Lakehouse and Warehouse implementation',
      'Fabric Data Factory pipelines and orchestration',
      'Data ingestion, transformation, and data modeling',
      'Power BI reporting, semantic models, and Direct Lake',
      'Real-time analytics and operational reporting',
      'Deployment standards, monitoring, and performance optimization',
    ],
  },
  {
    title: 'Microsoft Fabric Migration Services',
    intro:
      'Modernize existing data and BI workloads with a phased, low-risk migration plan. Folio3 helps assess dependencies, map workloads to Fabric capabilities, validate results, and support cutover.',
    bullets: [
      'Power BI modernization and semantic model optimization',
      'Azure Synapse to Microsoft Fabric migration',
      'Azure Data Factory pipeline modernization',
      'SQL Server and legacy data warehouse modernization',
      'Fragmented Azure data stack consolidation',
      'Legacy BI reporting rationalization',
    ],
  },
  {
    title: 'Governance, Security, and Compliance',
    intro:
      'Build trust into your Fabric environment from the beginning. We help establish governance practices that let more teams use data confidently without compromising security or control.',
    bullets: [
      'Role-based access and workspace governance',
      'Row-level security and controlled report distribution',
      'Data ownership, stewardship, and approval workflows',
      'Data lineage, data quality, and documentation practices',
      'Environment strategy for development, testing, and production',
      'Monitoring, auditability, and operational controls',
    ],
  },
  {
    title: 'Capacity Planning and Cost Optimization',
    intro:
      'Fabric value depends on choosing the right capacity and governing how it is used. Folio3 helps you evaluate workloads, usage patterns, performance needs, and growth plans to make informed capacity decisions.',
    bullets: [
      'Capacity sizing and workload planning',
      'Usage monitoring and utilization analysis',
      'Performance bottleneck identification',
      'Power BI and semantic model optimization',
      'Cost-aware architecture choices',
      'Ongoing capacity and platform optimization',
    ],
  },
  {
    title: 'Managed Fabric Support and Enablement',
    intro:
      'Keep improving after launch. Folio3 can provide continuous optimization, operational support, mentoring, documentation, and knowledge transfer to help your internal team become self-sufficient.',
  },
];

const engagements = [
  {
    title: 'Dedicated Microsoft Fabric Consultant',
    body:
      'Bring a Fabric architect, engineer, BI specialist, or governance expert into your team for a defined period. Ideal when you need embedded expertise, hands-on delivery, or additional capacity for a priority initiative.',
  },
  {
    title: 'Fractional Fabric Architect',
    body:
      'Access senior architecture and governance guidance without the cost or commitment of a full-time hire. Suitable for strategy, architecture reviews, capacity planning, technical oversight, and complex decision-making.',
  },
  {
    title: 'Fixed-Scope Fabric Implementation',
    body:
      'Engage a delivery team for a defined outcome, such as a Fabric readiness assessment, proof of concept, reporting modernization initiative, Lakehouse implementation, or data migration.',
  },
  {
    title: 'Microsoft Fabric Migration Team',
    body:
      'Get a coordinated team to assess legacy workloads, plan migration waves, rebuild or modernize pipelines and models, validate data, and support rollout.',
  },
  {
    title: 'Managed Fabric Services',
    body:
      'Use Folio3 as a long-term partner for monitoring, optimization, enhancement, governance, and operational support after go-live.',
  },
];

const deliverables = [
  'Microsoft Fabric readiness and maturity assessment',
  'Architecture blueprint and target-state design',
  'OneLake, workspace, and domain model',
  'Data ingestion and transformation pipelines',
  'Lakehouse and Warehouse implementation',
  'Power BI semantic models, dashboards, and reporting assets',
  'Governance, security, and access-control framework',
  'Capacity plan and optimization recommendations',
  'Migration inventory, sequencing plan, and validation approach',
  'Deployment standards, documentation, and runbooks',
  'Training, paired delivery, and knowledge-transfer sessions',
  'Managed optimization and post-launch support plan',
];

const useCases: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Executive and Operational Reporting',
    body: 'Create a reliable, shared view of KPIs across finance, operations, sales, supply chain, and leadership using governed data models and Power BI reporting.',
  },
  {
    title: 'Financial Planning and Analytics',
    body: 'Unify financial, planning, and operational data to support timely performance reporting, forecasting, variance analysis, and AI-ready decision support.',
  },
  {
    title: 'Supply Chain Analytics',
    body: (
      <>
        Connect procurement, inventory, warehousing, transportation, demand, and supplier data to monitor performance and improve responsiveness with real-time dashboards. Explore Folio3&apos;s{' '}
        <a href="https://azure.folio3.com/azure-data-analytics/supply-chain-analytics/" className="text-brand underline">
          supply chain analytics services
        </a>{' '}
        for a deeper look at analytics-led operational improvement.
      </>
    ),
  },
  {
    title: 'Customer and Sales Analytics',
    body: 'Bring CRM, marketing, commerce, service, and ERP data together to create trusted customer and revenue insights.',
  },
  {
    title: 'Real-Time Monitoring',
    body: 'Use Fabric capabilities to surface timely operational intelligence from events, IoT, transaction streams, and business systems.',
  },
  {
    title: 'Enterprise Self-Service Analytics',
    body: 'Give business users access to trusted, governed reporting while maintaining centralized standards for data models, security, definitions, and quality.',
  },
];

const deliverySteps = [
  {
    n: '01',
    title: 'Discover and Assess',
    body: 'We align stakeholders around business goals, use cases, current data sources, constraints, success metrics, and the role Fabric should play in your data strategy.',
  },
  {
    n: '02',
    title: 'Architect and Plan',
    body: 'Our team defines the target architecture, capacity direction, security and governance approach, delivery roadmap, migration sequence, and prioritized implementation backlog.',
  },
  {
    n: '03',
    title: 'Build and Migrate',
    body: 'We configure the Fabric environment, build prioritized data and analytics workloads, migrate selected assets, test performance and data quality, and prepare teams for rollout.',
  },
  {
    n: '04',
    title: 'Govern and Optimize',
    body: 'After launch, we refine performance, capacity usage, adoption, security, documentation, and operating processes to help your platform evolve with the business.',
  },
  {
    n: '05',
    title: 'Enable Your Team',
    body: 'We provide documentation, training, paired delivery, and practical knowledge transfer so your internal team can confidently manage and expand the solution.',
  },
];

const whyFolio3 = [
  {
    title: 'Microsoft Ecosystem Expertise',
    body: 'Folio3 is a Microsoft Solutions Partner with deep experience across Azure, data and AI, Power BI, Power Platform, Dynamics 365, Microsoft 365, and Copilot. This lets us design Fabric solutions that work within your broader Microsoft environment.',
  },
  {
    title: 'From Strategy to Production',
    body: 'We do more than recommend a roadmap. Our team can assess, architect, implement, migrate, optimize, and support your Fabric environment through its full lifecycle.',
  },
  {
    title: 'Faster Analytics With IntelliFabric',
    body: 'When the use case fits, IntelliFabric gives organizations a head start with industry-ready dashboards, governed data models, and a modern analytics operating model built on Microsoft Fabric.',
  },
  {
    title: 'Business-Led Delivery',
    body: 'We tie technical decisions to reporting needs, operational KPIs, adoption goals, governance requirements, and measurable business outcomes.',
  },
  {
    title: 'Flexible Team Structure',
    body: 'Engage one specialist, a fractional architect, a focused implementation team, or an ongoing managed services partner based on your priorities and internal capacity.',
  },
];

const caseStudies: CaseItem[] = [
  {
    name: 'Savills',
    img: '/wp-content/uploads/2025/07/microsoft-fabric-reporting-boosting-operational-effiency.webp',
    blurb: 'Microsoft Fabric reporting delivered a consolidated, real-time view of global operations and improved operational efficiency by 13%.',
    href: 'https://azure.folio3.com/microsoft-fabric-reporting-for-real-estate/',
  },
  {
    name: 'Cattle Feeding Company',
    img: '/wp-content/uploads/2026/01/weaver-popcorn-hybrids-1.webp',
    blurb: 'Plug-and-play data ingestion and reporting on IntelliFabric and Microsoft Fabric supporting operational visibility and animal well-being.',
    href: 'https://azure.folio3.com/case-studies/',
  },
];

const faqs = [
  {
    q: 'What does a Microsoft Fabric consultant do?',
    a: 'A Microsoft Fabric consultant helps organizations plan, design, implement, migrate, govern, and optimize a unified analytics platform using Microsoft Fabric. Depending on your needs, this can include OneLake architecture, data ingestion and engineering, Lakehouse and Warehouse design, Power BI reporting, semantic models, security, capacity planning, performance optimization, and enablement.',
  },
  {
    q: 'Can I hire a dedicated Microsoft Fabric consultant from Folio3?',
    a: 'Yes. Folio3 can provide dedicated or fractional Microsoft Fabric expertise based on the role, duration, delivery scope, and level of support you need. Options can include architects, data engineers, Power BI consultants, governance specialists, and cross-functional delivery teams.',
  },
  {
    q: 'Can Folio3 migrate our existing Power BI or Azure data workloads to Fabric?',
    a: 'Yes. Folio3 supports assessment and migration planning for Power BI, Azure Synapse, Azure Data Factory, SQL-based data environments, legacy warehouses, and fragmented reporting estates. The approach is tailored to your dependencies, risk tolerance, governance requirements, and target architecture.',
  },
  {
    q: 'Do you provide Microsoft Fabric capacity and licensing guidance?',
    a: 'Yes. Our consultants can help evaluate workload needs, usage patterns, performance requirements, growth expectations, and capacity options. We can also help establish monitoring and optimization practices after implementation.',
  },
  {
    q: 'Can you help with OneLake, Lakehouse, Warehouse, and Data Factory?',
    a: 'Yes. Folio3 supports Microsoft Fabric architecture and implementation across OneLake, Lakehouse, Warehouse, Data Factory, Power BI, semantic models, real-time analytics, governance, and related Fabric capabilities.',
  },
  {
    q: 'Do you offer a Microsoft Fabric proof of concept?',
    a: "Yes. A proof of concept is a useful option when you want to validate an important use case, test Fabric's fit with your data environment, demonstrate value to stakeholders, or establish an implementation foundation before scaling.",
  },
  {
    q: 'What happens after Fabric implementation?',
    a: 'Folio3 can provide ongoing optimization, managed support, enhancement delivery, governance assistance, reporting expansion, capacity monitoring, documentation, and training for your internal teams.',
  },
  {
    q: 'How do we get started?',
    a: 'Start with a conversation about your current data environment, business objectives, primary use cases, and transformation priorities. Folio3 will recommend the most suitable next step, which may be a readiness assessment, architecture workshop, proof of concept, migration plan, IntelliFabric deployment, or implementation engagement.',
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
  name: 'Microsoft Fabric Consulting Services',
  serviceType: 'Microsoft Fabric Consulting, Migration & Implementation',
  provider: {
    '@type': 'Organization',
    name: 'Folio3',
    url: 'https://azure.folio3.com/',
  },
  areaServed: 'Worldwide',
  url: CANONICAL,
  description: DESCRIPTION,
};

export default function HireMicrosoftFabricConsultantPage() {
  return (
    <>
      {/* Fold 1 — Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="eyebrow">Microsoft Fabric Consulting</span>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl xl:text-6xl">
              Hire <span className="text-brand">Microsoft Fabric</span> Consultants to Build a Governed, AI-Ready Data Platform
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Turn fragmented data, slow reporting, and complex analytics workloads into a governed, scalable Microsoft
              Fabric platform. Folio3&apos;s Microsoft Fabric consultants help you assess readiness, design the right
              architecture, migrate data workloads, implement Fabric capabilities, and continuously optimize performance
              and adoption.
            </p>
            <p className="mt-4 max-w-xl text-body">
              Whether you need a dedicated Fabric expert, a fractional data architect, a migration team, or end-to-end
              implementation support, we align the engagement to your business goals, existing Microsoft estate, and
              internal team capacity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={FORM_HREF} className="btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide">
                Get a Free Fabric Readiness Assessment
              </Link>
              <Link href={FORM_HREF} className="btn border border-brand text-brand hover:bg-brand hover:text-white uppercase tracking-wide">
                Talk to a Fabric Consultant
              </Link>
            </div>
          </div>
          <Reveal animation="zoomIn" className="relative">
            <Image
              src="/wp-content/uploads/2024/06/microsoft-fabric-services-ipad-screen.webp"
              alt="Microsoft Fabric analytics dashboard"
              width={620}
              height={460}
              priority
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-[linear-gradient(180deg,#f4f7fb_0%,#eef3f8_100%)]">
        <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4 lg:py-10">
          {trustBar.map((t) => (
            <div key={t} className="flex items-start gap-3">
              <span aria-hidden className="mt-1 shrink-0 text-brand">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span className="text-sm font-medium leading-snug text-ink">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand">
        <div className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="px-2">/</span>
          <Link href="/microsoft-fabric-services/" className="hover:underline">Microsoft Fabric Services</Link>
          <span className="px-2">/</span>
          <span>Hire Microsoft Fabric Consultants</span>
        </div>
      </div>

      {/* Fold 2 — Build More From Your Data */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Build more from your data</h2>
            <p className="mt-4 text-body">
              Microsoft Fabric brings data integration, engineering, lakehouse analytics, warehousing, real-time
              intelligence, data science, and Power BI into one unified SaaS analytics environment. But realizing value
              requires the right architecture, capacity strategy, governance model, and delivery expertise.
            </p>
            <p className="mt-3 text-body">
              Folio3 helps organizations move from disconnected reporting and data silos to a secure, scalable analytics
              foundation built around Microsoft Fabric and OneLake. Our consultants work alongside your business, data,
              IT, and analytics teams to deliver a practical roadmap — and execute it.
            </p>
            <p className="mt-3 text-body">
              New to the platform? Start with Folio3&apos;s overview of{' '}
              <a
                href="https://azure.folio3.com/blog/what-is-microsoft-fabric-features-benefits-use-cases/"
                className="text-brand underline"
              >
                what Microsoft Fabric is and how it supports unified analytics
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Fold 3 — When to hire a Microsoft Fabric consultant */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Signals it&apos;s time</span>
            <h2 className="text-3xl lg:text-4xl">When to hire a Microsoft Fabric consultant</h2>
            <p className="mt-4 text-body">Hire a Fabric consultant when your organization needs to:</p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
            {whenToHire.map((p, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fold 4 — Hire the Right Fabric Expertise (roles) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Hire the right Fabric expertise</h2>
            <p className="mt-4 text-body">
              Folio3 gives you access to cross-functional Microsoft Fabric specialists who can work as an extension of
              your internal team or deliver a defined project end to end.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((r, i) => (
              <Reveal key={r.title} animation="fadeInUp" delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-7 shadow-card card-hover">
                  <h3 className="text-lg font-semibold leading-snug">{r.title}</h3>
                  <div className="mt-3 text-sm leading-relaxed text-body">{r.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 5 — Consulting Services */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">End-to-end delivery</span>
            <h2 className="text-3xl lg:text-4xl">Microsoft Fabric Consulting Services</h2>
            <p className="mt-4 text-body">
              For organizations that need broader platform support, explore Folio3&apos;s{' '}
              <a href="https://azure.folio3.com/microsoft-fabric-services/" className="text-brand underline">
                Microsoft Fabric services
              </a>
              , covering consulting, migration, implementation, and analytics modernization.
            </p>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                  <h3 className="text-lg font-semibold leading-snug text-ink">{s.title}</h3>
                  <div className="mt-3 text-sm leading-relaxed text-body">{s.intro}</div>
                  {s.bullets && (
                    <ul className="mt-4 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-sm text-body">
                          <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 6 — Engagement Models */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Choose your engagement model</h2>
            <p className="mt-4 text-body">
              Engage the shape of expertise that fits how your team works today — from a single specialist to a full
              delivery pod or long-term managed partner.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {engagements.map((e, i) => (
              <Reveal key={e.title} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-r-2xl border-l-4 border-brand bg-white p-6 shadow-card">
                  <h3 className="text-base font-semibold leading-snug">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 7 — What You Receive */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">What you receive</h2>
            <p className="mt-4 text-body">
              Every engagement is tailored to your scope, but the work is anchored in tangible outcomes — not vague
              recommendations. Depending on your engagement, deliverables can include:
            </p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {deliverables.map((d, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
              Book Your Fabric Readiness Discussion
            </Link>
          </div>
        </div>
      </section>

      {/* Fold 8 — CTA Banner: readiness discussion */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Start with a Fabric readiness assessment
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Not sure where to begin? We&apos;ll discuss your business objectives, current analytics environment, data
              sources, reporting challenges, modernization priorities, and desired outcomes — then recommend whether to
              begin with an assessment, a proof of concept, a focused migration, IntelliFabric, or a broader
              implementation initiative.
            </p>
            <Link href={FORM_HREF} className="btn mt-8 bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
              Book Your Fabric Readiness Discussion
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Fold 9 — IntelliFabric */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">Accelerator</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Accelerate time to insight with IntelliFabric</h2>
            <p className="mt-4 text-body">
              For organizations that want a faster route to governed, self-service analytics,{' '}
              <a href="https://azure.folio3.com/solution/intellifabric/" className="text-brand underline">
                IntelliFabric
              </a>{' '}
              is Folio3&apos;s industry-ready analytics solution built on Microsoft Fabric.
            </p>
            <p className="mt-3 text-body">
              IntelliFabric combines pre-built dashboards, governed data models, modern Fabric architecture, and reusable
              accelerators to help teams reduce the time and complexity associated with building analytics capabilities
              from scratch. It can be tailored to your operational and industry needs while preserving the flexibility of
              Microsoft Fabric.
            </p>
            <ul className="mt-5 space-y-2">
              {[
                'Organizations that need faster reporting and analytics outcomes',
                'Teams that want pre-built dashboards and governed models',
                'Businesses seeking a scalable analytics operating model',
                'Companies that want to reduce custom BI development time',
              ].map((b) => (
                <li key={b} className="flex gap-2 text-body">
                  <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
                Explore IntelliFabric
              </Link>
            </div>
          </Reveal>
          <Reveal animation="zoomIn">
            <Image
              src="/wp-content/uploads/2024/06/microsoft-fabric-pricing.jpg"
              alt="IntelliFabric analytics accelerator on Microsoft Fabric"
              width={620}
              height={460}
              className="h-auto w-full rounded-2xl shadow-card"
            />
          </Reveal>
        </div>
      </section>

      {/* Fold 10 — Business-Critical Use Cases */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Built for business-critical use cases</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <Reveal key={u.title} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-2xl border border-surface-line bg-white p-6 shadow-card card-hover">
                  <h3 className="text-base font-semibold leading-snug text-ink">{u.title}</h3>
                  <div className="mt-2 text-sm leading-relaxed text-body">{u.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 11 — Delivery Approach */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Our delivery approach</h2>
          </Reveal>
          <ol className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {deliverySteps.map((s, i) => (
              <Reveal key={s.n} animation="fadeInUp" delay={i * 60}>
                <li className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <div className="text-3xl font-bold text-brand">{s.n}</div>
                  <h3 className="mt-2 text-base font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Fold 12 — Why Folio3 */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Why Folio3 for Microsoft Fabric</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyFolio3.map((w, i) => (
              <Reveal key={w.title} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                  <h3 className="text-lg font-semibold leading-snug">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 13 — Awards */}
      <AwardsBand autoScroll />

      {/* Fold 14 — Client Results */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Client results</h2>
            <p className="mt-4 text-body">
              Folio3 helped Savills improve reporting and analytics with a scalable Microsoft Fabric solution that
              created a consolidated, real-time view of global operations — improving operational efficiency by 13%.
              Folio3 also implemented a plug-and-play data ingestion and reporting solution using IntelliFabric and
              Microsoft Fabric for a cattle feeding company to support better operational visibility and animal
              well-being outcomes. Want to see more?{' '}
              <a href="https://azure.folio3.com/case-studies/" className="text-brand underline">
                Explore Folio3 case studies
              </a>
              .
            </p>
          </Reveal>
        </div>
        <AutoScrollCases cases={caseStudies} />
      </section>

      {/* Fold 15 — FAQs */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Frequently asked questions</h2>
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

      {/* Fold 16 — Final CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#0b1a52_0%,#143CD5_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_30%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Ready to build a more connected, governed analytics foundation?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Hire Microsoft Fabric consultants from Folio3 to turn data complexity into trusted, scalable insights.
              Start with a Fabric readiness discussion and define the right path for your organization.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={FORM_HREF} className="btn bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
                Get a Free Fabric Readiness Assessment
              </Link>
              <Link href={FORM_HREF} className="btn border border-white text-white hover:bg-white hover:text-brand uppercase tracking-wide">
                Talk to a Fabric Consultant
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OneToOneCTA />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <div aria-hidden className="h-0 w-0 overflow-hidden">
        <Image src={OG_IMAGE} alt="" width={2} height={2} />
      </div>
    </>
  );
}
