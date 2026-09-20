import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { AwardsBand } from '@/components/sections/AwardsBand';
import { AutoScrollCases, type CaseItem } from '@/components/sections/AutoScrollCases';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

const CANONICAL = 'https://azure.folio3.com/microsoft-fabric-services/cloud-data-modernization';
const TITLE = 'Microsoft Fabric Cloud Data Modernization Services | Folio3';
const DESCRIPTION =
  'Modernize fragmented data platforms with Microsoft Fabric. Folio3 delivers Fabric consulting, readiness assessments, implementation, OneLake, Lakehouse, Power BI, governance, and migration services.';
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

const heroStats = [
  { value: 'Microsoft', label: 'Solutions Partner' },
  { value: '15+', label: 'Years of software and cloud experience' },
  { value: '200+', label: 'Certified technology experts' },
  { value: '5,000+', label: 'Projects delivered' },
];

const problems = [
  'Data is spread across disconnected cloud, SaaS, on-premises, and business systems.',
  'Reporting teams rely on manual exports, spreadsheets, and slow refresh cycles.',
  'Separate tools are used for ETL, data engineering, warehousing, BI, streaming, and machine learning.',
  'Legacy data warehouses are costly, slow to change, and difficult to scale.',
  'Business users wait on technical teams for basic reports and dashboard updates.',
  'Duplicate reports and inconsistent KPIs reduce trust in data.',
  'Security, ownership, lineage, access controls, and governance are unclear.',
  'Existing Azure Synapse, Azure Data Factory, Power BI, SQL Server, and data lake workloads are difficult to manage as separate environments.',
  'AI initiatives stall because data is not unified, governed, accessible, or reliable.',
];

const solutionRows = [
  {
    area: 'Unified data integration',
    outcome: 'Connect cloud, on-premises, database, ERP, CRM, file, and SaaS data sources through automated pipelines.',
  },
  {
    area: 'Centralized data foundation',
    outcome: 'Use OneLake to reduce data silos and make enterprise data easier to discover, manage, and use.',
  },
  {
    area: 'Modern analytics architecture',
    outcome: 'Build Lakehouse and Data Warehouse environments for scalable reporting and advanced analytics.',
  },
  {
    area: 'Self-service BI',
    outcome: 'Give business users governed access to trusted dashboards, semantic models, and Power BI insights.',
  },
  {
    area: 'Real-time intelligence',
    outcome: 'Analyze operational events, streaming data, and live business signals as they happen.',
  },
  {
    area: 'Stronger governance',
    outcome: 'Improve security, access control, lineage, ownership, monitoring, and data quality practices.',
  },
  {
    area: 'AI readiness',
    outcome: 'Prepare governed and trusted data for predictive analytics, machine learning, Copilot, and AI use cases.',
  },
];

const assessmentItems = [
  'Current-state review of data sources, pipelines, data warehouses, reports, dashboards, and analytics tools.',
  'Data platform maturity and cloud readiness evaluation.',
  'Microsoft Fabric workload mapping across Data Factory, Data Engineering, Lakehouse, Warehouse, Power BI, Real-Time Analytics, and Data Science.',
  'Microsoft Fabric migration assessment for legacy and cloud workloads.',
  'Azure Synapse to Microsoft Fabric migration planning.',
  'Azure Data Factory to Microsoft Fabric migration planning.',
  'Power BI to Microsoft Fabric migration assessment.',
  'SQL Server to Microsoft Fabric migration feasibility review.',
  'OneLake, Lakehouse, Data Warehouse, workspace, and capacity recommendations.',
  'Data security, access control, governance, lineage, and operating-model guidance.',
  'AI-readiness assessment for predictive analytics, machine learning, Copilot, and intelligent automation.',
  'A phased Microsoft Fabric roadmap with prioritized opportunities and next steps.',
];

const consultingItems = [
  'Data strategy and platform modernization planning',
  'Microsoft Fabric assessment and readiness assessment',
  'Target architecture and solution design',
  'Workload mapping and platform selection guidance',
  'Microsoft Fabric roadmap development',
  'Governance and operating-model recommendations',
  'Migration planning and implementation planning',
  'Cost, capacity, scalability, and adoption guidance',
];

const implementationItems = [
  'Microsoft Fabric workspace and capacity planning',
  'Data ingestion, transformation, and orchestration',
  'Microsoft Fabric Data Factory implementation',
  'Automated ETL and ELT pipeline development',
  'Microsoft Fabric OneLake implementation',
  'Microsoft Fabric Lakehouse implementation',
  'Microsoft Fabric data warehouse implementation',
  'Data modeling, semantic models, and Power BI enablement',
  'Dashboard and reporting modernization',
  'Real-time analytics and event-driven intelligence',
  'Security, monitoring, governance, and lifecycle management',
];

const migrationItems = [
  'Azure Synapse to Microsoft Fabric migration',
  'Power BI to Microsoft Fabric migration',
  'Azure Data Factory to Microsoft Fabric migration',
  'SQL Server to Microsoft Fabric migration',
  'Data Lake to OneLake migration planning',
  'Legacy data warehouse modernization',
  'Legacy BI and reporting modernization',
  'Pipeline, dataset, report, notebook, and semantic-model migration',
  'Data validation, reconciliation, testing, and performance optimization',
  'Post-migration governance and adoption support',
];

const governanceItems = [
  'Workspace governance and environment design',
  'Role-based access controls and permissions',
  'Data ownership and stewardship practices',
  'Data classification and sensitivity controls',
  'Data lineage and impact analysis',
  'Data quality standards and monitoring',
  'Security and compliance alignment',
  'Deployment processes and lifecycle governance',
  'Capacity planning, cost monitoring, and performance governance',
  'Integration with enterprise governance practices and Microsoft Purview where relevant',
];

const aiReadyItems = [
  'Data quality and accessibility assessment',
  'AI use-case identification and prioritization',
  'Data architecture for machine learning and advanced analytics',
  'Predictive analytics enablement',
  'Semantic modeling and trusted business metrics',
  'Governance planning for sensitive and business-critical data',
  'Integration planning for Azure AI and machine learning workloads',
];

const realtimeItems = [
  'Streaming data ingestion',
  'Eventstream architecture',
  'Operational monitoring',
  'KQL database and real-time analytics use cases',
  'Live dashboards and alerts',
  'Data Activator workflows',
  'IoT, supply chain, customer, finance, and operational intelligence scenarios',
];

const phases = [
  { phase: 'Discover', body: 'Business goals, stakeholder needs, current-state analysis, data inventory, and workload discovery.' },
  { phase: 'Assess', body: 'Microsoft Fabric assessment, readiness evaluation, migration assessment, risk analysis, and roadmap.' },
  { phase: 'Design', body: 'Target architecture for OneLake, Lakehouse, Data Warehouse, Data Factory, Power BI, governance, and security.' },
  { phase: 'Build', body: 'Data pipelines, transformations, data models, dashboards, Fabric configuration, and real-time capabilities.' },
  { phase: 'Migrate', body: 'Phased migration of data, pipelines, reporting assets, warehouses, notebooks, and semantic models.' },
  { phase: 'Govern', body: 'Access control, workspace policies, lineage, data quality, monitoring, deployment, and cost management.' },
  { phase: 'Enable', body: 'Knowledge transfer, user training, adoption planning, self-service analytics standards, and administrative enablement.' },
  { phase: 'Optimize', body: 'Performance tuning, capacity optimization, cost governance, managed support, and continuous improvement.' },
];

const whyBullets = [
  'Microsoft Solutions Partner with experience across Microsoft cloud technologies.',
  '15+ years of custom software, cloud, and enterprise technology delivery.',
  '200+ certified experts across Microsoft and related technologies.',
  'End-to-end expertise in Microsoft Fabric, Azure Data Analytics, Power BI, AI/ML, data engineering, and cloud modernization.',
  'Structured delivery from strategy and assessment through implementation, migration, adoption, and support.',
  'Flexible global delivery capabilities, including Microsoft Fabric consulting Pakistan and Microsoft Fabric services Karachi.',
  'Industry-focused analytics solutions for manufacturing, retail, healthcare, warehousing, distribution, finance, and more.',
];

const useCases = [
  {
    title: 'Finance and financial planning',
    body: 'Bring together finance, operations, planning, sales, and ERP data to improve forecasting, variance analysis, financial reporting, profitability analysis, and executive decision-making. Learn how Microsoft Fabric and Copilot can support AI-driven financial planning.',
  },
  {
    title: 'Supply chain and operations',
    body: 'Connect procurement, inventory, warehouse, logistics, supplier, manufacturing, and ERP data to improve visibility, reduce delays, and enable data-driven supply chain decisions.',
  },
  {
    title: 'Manufacturing and IoT',
    body: 'Modernize production, equipment, quality, sensor, maintenance, and operational data to support predictive maintenance, real-time monitoring, performance reporting, and operational optimization.',
  },
  {
    title: 'Retail and eCommerce',
    body: 'Unify sales, inventory, customer, product, campaign, order, and fulfillment data to improve customer insights, demand forecasting, merchandising, and performance analytics.',
  },
  {
    title: 'Healthcare and regulated industries',
    body: 'Create governed analytics environments for data-intensive industries that require strong access controls, data quality, traceability, reporting consistency, and secure analytics workflows.',
  },
  {
    title: 'Executive reporting and enterprise BI',
    body: 'Replace disconnected spreadsheets and manually maintained reports with trusted KPIs, centralized semantic models, governed dashboards, and self-service Power BI analytics.',
  },
];

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

const faqs = [
  {
    q: 'What is Microsoft Fabric Cloud Data Modernization?',
    a: 'Microsoft Fabric Cloud Data Modernization is the process of upgrading fragmented, legacy, or disconnected data environments using Microsoft Fabric. It consolidates data integration, engineering, data warehousing, real-time analytics, data science, and Power BI in a unified cloud platform so organizations can manage and use data more efficiently.',
  },
  {
    q: 'Why should my organization modernize its data platform with Microsoft Fabric?',
    a: 'Organizations modernize with Microsoft Fabric to reduce data silos, simplify complex analytics environments, improve reporting speed, increase trust in business metrics, strengthen governance, and create a scalable foundation for AI. Fabric can reduce the need to manage separate tools for data movement, storage, analytics, reporting, and real-time intelligence.',
  },
  {
    q: 'What is included in Microsoft Fabric consulting services?',
    a: 'Microsoft Fabric consulting services typically include current-state assessment, business and technical requirements gathering, data strategy, target architecture, workload mapping, Microsoft Fabric roadmap development, migration planning, governance design, capacity guidance, implementation planning, and user-adoption strategy.',
  },
  {
    q: 'What is a Microsoft Fabric readiness assessment?',
    a: 'A Microsoft Fabric readiness assessment evaluates your current data environment, including data sources, pipelines, reports, dashboards, warehouses, security, governance, skills, costs, and priority use cases. It identifies which workloads are ready for Fabric and provides a phased modernization roadmap.',
  },
  {
    q: 'Can Folio3 help with Azure Synapse to Microsoft Fabric migration?',
    a: 'Yes. Folio3 supports Azure Synapse to Microsoft Fabric migration through workload assessment, architecture planning, pipeline and data migration, Lakehouse or Data Warehouse design, report modernization, validation, performance optimization, governance, and adoption support.',
  },
  {
    q: 'Can Azure Data Factory workloads be migrated to Microsoft Fabric?',
    a: 'Microsoft Fabric includes Data Factory capabilities for ingestion, transformation, orchestration, and data pipeline development. Folio3 can assess existing Azure Data Factory pipelines, connectors, schedules, dependencies, transformations, and operational requirements to determine the best Azure Data Factory to Microsoft Fabric migration approach.',
  },
  {
    q: 'Can Power BI reports be migrated to Microsoft Fabric?',
    a: 'Yes. Power BI is a core workload in Microsoft Fabric. A Power BI to Microsoft Fabric migration can include reviewing reports, datasets, semantic models, gateways, workspace structure, refresh schedules, access controls, capacity requirements, governance practices, and opportunities to connect reporting to a unified Fabric data foundation.',
  },
  {
    q: 'Does Microsoft Fabric support OneLake, Lakehouse, and Data Warehouse workloads?',
    a: 'Yes. Microsoft Fabric includes OneLake as a unified data foundation and supports Lakehouse and Data Warehouse workloads for different analytical requirements. Folio3 helps determine the right architecture based on data types, reporting needs, scale, performance expectations, governance requirements, and future AI plans.',
  },
  {
    q: 'How does Microsoft Fabric support data governance and security?',
    a: 'Microsoft Fabric supports governance through workspace management, identity and access controls, role-based permissions, data ownership, lineage, sensitivity labels, deployment practices, and capacity governance. Folio3 helps organizations design Microsoft Fabric governance services that align analytics access with security, compliance, and operational needs.',
  },
  {
    q: 'Is Microsoft Fabric suitable for AI and advanced analytics?',
    a: 'Yes. Microsoft Fabric can support a trusted, governed, and connected data foundation for predictive analytics, machine learning, Copilot, and AI-driven decision-making. Successful adoption also requires good data quality, clear governance, the right architecture, relevant use cases, and a practical enablement plan.',
  },
  {
    q: 'How long does a Microsoft Fabric implementation take?',
    a: 'The implementation timeline depends on the number of data sources, complexity of existing pipelines, size of the data estate, reporting requirements, governance needs, data quality, security controls, and migration scope. Folio3 begins with discovery and assessment to define a practical phased delivery plan.',
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
  name: 'Microsoft Fabric Cloud Data Modernization',
  serviceType: 'Cloud Data Modernization with Microsoft Fabric',
  provider: {
    '@type': 'Organization',
    name: 'Folio3',
    url: 'https://azure.folio3.com/',
  },
  areaServed: 'Worldwide',
  url: CANONICAL,
  description: DESCRIPTION,
};

function CapabilityBlock({
  title,
  intro,
  items,
  extra,
}: {
  title: string;
  intro: string;
  items: string[];
  extra?: React.ReactNode;
}) {
  return (
    <Reveal animation="fadeInUp">
      <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
        <h3 className="text-xl font-semibold text-ink lg:text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-body">{intro}</p>
        <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
          {items.map((it) => (
            <li key={it} className="flex gap-3 text-sm text-body">
              <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
              <span className="leading-relaxed">{it}</span>
            </li>
          ))}
        </ul>
        {extra ? <div className="mt-4 text-sm leading-relaxed text-body">{extra}</div> : null}
      </div>
    </Reveal>
  );
}

export default function CloudDataModernizationPage() {
  return (
    <>
      {/* Fold 1 — Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="eyebrow">Microsoft Fabric Cloud Data Modernization Services</span>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl xl:text-6xl">
              Modernize Your Cloud Data Platform with{' '}
              <span className="text-brand">Microsoft Fabric</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Unify siloed data, modernize legacy analytics, and build a trusted, AI-ready data foundation with Microsoft
              Fabric.
            </p>
            <p className="mt-4 max-w-xl text-base text-body">
              Folio3 helps organizations replace disconnected data pipelines, warehouses, dashboards, and reporting tools
              with a unified Microsoft Fabric platform. From strategy and assessment to implementation, migration,
              governance, and optimization, our Microsoft Fabric experts help you turn complex data environments into
              scalable business intelligence.
            </p>
            <p className="mt-4 max-w-xl text-base text-body">
              Whether you are modernizing Azure Synapse, Azure Data Factory, Power BI, SQL Server, data lakes, or legacy
              reporting systems, Folio3 provides the architecture, engineering, and delivery support required to move
              forward with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={FORM_HREF} className="btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide">
                Book a Microsoft Fabric Consultation
              </Link>
              <Link href="#assessment" className="btn border border-brand text-brand hover:bg-brand hover:text-white uppercase tracking-wide">
                Get a Fabric Readiness Assessment
              </Link>
            </div>
          </div>
          <Reveal animation="zoomIn" className="relative">
            <Image
              src="/wp-content/uploads/2024/06/microsoft-fabric-services-ipad-screen.webp"
              alt="Microsoft Fabric unified analytics platform"
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
        <div className="container-x py-8 lg:py-10">
          <p className="text-center text-sm font-medium text-body">
            Trusted by businesses building with Microsoft technologies
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white p-4 text-center shadow-card">
                <div className="text-xl font-bold text-brand lg:text-2xl">{s.value}</div>
                <div className="mt-1 text-xs leading-snug text-body">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-body">
            Bring your data integration, engineering, warehousing, real-time analytics, data science, and Power BI
            workloads together on one modern analytics platform.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand">
        <div className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="px-2">/</span>
          <Link href="/microsoft-fabric-services/" className="hover:underline">Microsoft Fabric Services</Link>
          <span className="px-2">/</span>
          <span>Cloud Data Modernization</span>
        </div>
      </div>

      {/* Fold 2 — Problem */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Is Your Data Platform Creating More Complexity Than Insight?</h2>
            <p className="mt-4 text-body">
              Most businesses have no shortage of data. The problem is that information is usually distributed across
              cloud applications, on-premises systems, CRM platforms, ERP systems, SQL databases, data lakes,
              spreadsheets, and separate analytics tools.
            </p>
            <p className="mt-3 text-body">
              When your data platform is fragmented, teams spend more time finding, cleaning, moving, reconciling, and
              validating data than using it to make decisions.
            </p>
          </Reveal>
          <h3 className="mx-auto mt-12 max-w-4xl text-center text-lg font-semibold text-ink">
            Common data modernization challenges
          </h3>
          <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
            {problems.map((p, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-0.5 shrink-0 text-[#d93636]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 8.5l7 7" />
                    <path d="M15.5 8.5l-7 7" />
                  </svg>
                </span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-surface-line bg-surface-tint p-6">
            <h4 className="text-base font-semibold text-ink">The impact of fragmented data</h4>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Disconnected systems slow down reporting, increase operational overhead, create security risks, and make
              it harder for leaders to act on trusted information. A modern cloud data platform should give your teams
              one governed environment for integrating, storing, preparing, analyzing, and sharing data.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link href="#assessment" className="btn-primary uppercase tracking-wide">
              Assess Your Data Modernization Readiness
            </Link>
          </div>
        </div>
      </section>

      {/* Fold 3 — Solution */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The solution</span>
            <h2 className="text-3xl lg:text-4xl">Data Platform Modernization with Microsoft Fabric</h2>
            <p className="mt-4 text-body">
              Microsoft Fabric brings data integration, data engineering, data warehousing, data science, real-time
              analytics, and Power BI together in one unified SaaS analytics platform. Folio3’s Microsoft Fabric Cloud
              Data Modernization services help organizations simplify their data estate, reduce dependency on
              disconnected tools, and create a scalable foundation for business intelligence and AI.
            </p>
            <p className="mt-3 text-body">
              As a Microsoft Fabric Services provider, Folio3 supports the complete modernization journey, from
              discovery and architecture design to migration, implementation, governance, enablement, and ongoing
              optimization.
            </p>
          </Reveal>

          <h3 className="mx-auto mt-12 max-w-4xl text-center text-lg font-semibold text-ink">
            What Microsoft Fabric modernization enables
          </h3>
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
            <div className="hidden grid-cols-[minmax(0,260px)_1fr] gap-6 border-b border-surface-line bg-[#f4f7fb] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-ink md:grid">
              <div>Modernization area</div>
              <div>Business outcome</div>
            </div>
            {solutionRows.map((r) => (
              <div key={r.area} className="grid gap-2 border-b border-surface-line px-6 py-5 last:border-b-0 md:grid-cols-[minmax(0,260px)_1fr] md:gap-6">
                <div className="text-sm font-semibold text-ink">{r.area}</div>
                <div className="text-sm leading-relaxed text-body">{r.outcome}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
              Talk to a Microsoft Fabric Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Fold 4 — Readiness Assessment */}
      <section id="assessment" className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Start here</span>
            <h2 className="text-3xl lg:text-4xl">Start with a Microsoft Fabric Readiness Assessment</h2>
            <p className="mt-4 text-body">
              Modernizing a data platform should not begin with a migration script. It should begin with a clear
              understanding of your current environment, business priorities, workload dependencies, data quality,
              security requirements, and future analytics goals.
            </p>
            <p className="mt-3 text-body">
              Folio3’s Microsoft Fabric assessment helps you determine where you are today, what should move to Fabric,
              how workloads should be modernized, and what your organization needs to do first.
            </p>
          </Reveal>
          <h3 className="mx-auto mt-12 max-w-4xl text-center text-lg font-semibold text-ink">
            What our Microsoft Fabric assessment includes
          </h3>
          <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {assessmentItems.map((it, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{it}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
              Get Your Fabric Readiness Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Fold 5 — CTA Banner */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Ready to Make Your Data Easier to Trust, Use, and Scale?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Build a unified data platform that supports faster insights, stronger governance, self-service reporting,
              operational intelligence, and future AI innovation. Folio3 helps you plan and execute Microsoft Fabric
              Cloud Data Modernization without disrupting the systems your business depends on today.
            </p>
            <Link href={FORM_HREF} className="btn mt-8 bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
              Book a Microsoft Fabric Consultation
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Fold 6 — Capabilities */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Capabilities</span>
            <h2 className="text-3xl lg:text-4xl">Microsoft Fabric Cloud Data Modernization Capabilities</h2>
            <p className="mt-4 text-body">
              Folio3 provides end-to-end Microsoft Fabric consulting services, Microsoft Fabric implementation
              services, and Microsoft Fabric migration services for organizations at every stage of their cloud data
              modernization journey.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6">
            <CapabilityBlock
              title="Microsoft Fabric consulting services"
              intro="Create a data modernization strategy aligned with your business goals, technology environment, reporting needs, data governance requirements, and AI ambitions."
              items={consultingItems}
              extra={
                <p>
                  Explore our complete{' '}
                  <Link href="/microsoft-fabric-services/" className="text-brand underline">
                    Microsoft Fabric Services
                  </Link>
                  .
                </p>
              }
            />

            <CapabilityBlock
              title="Microsoft Fabric implementation services"
              intro="Folio3 designs, configures, develops, and deploys Microsoft Fabric environments that support your current reporting needs and future data, analytics, and AI priorities."
              items={implementationItems}
              extra={
                <p>
                  Folio3 also provides{' '}
                  <Link href="/azure-data-analytics/" className="text-brand underline">
                    Azure Data Analytics Services
                  </Link>{' '}
                  for organizations that need end-to-end ETL/ELT pipelines, data warehousing, visualization, predictive
                  analytics, and business intelligence capabilities.
                </p>
              }
            />

            <CapabilityBlock
              title="Microsoft Fabric migration services"
              intro="Modernize outdated or disconnected data systems through a structured, phased migration approach that minimizes risk and protects business continuity."
              items={migrationItems}
              extra={
                <>
                  <p>
                    Folio3 can help organizations plan and execute an Azure Synapse to Microsoft Fabric migration by
                    assessing existing Synapse assets, mapping workloads to Fabric capabilities, validating data and
                    pipelines, and establishing a secure target architecture.
                  </p>
                  <p className="mt-4">
                    <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
                      Plan Your Fabric Migration
                    </Link>
                  </p>
                </>
              }
            />

            <CapabilityBlock
              title="Microsoft Fabric governance services"
              intro="A modern data platform should improve access to data without compromising control. Folio3 helps organizations implement Microsoft Fabric governance services that make data discoverable, secure, reliable, and accountable."
              items={governanceItems}
              extra={
                <p>
                  <span className="font-semibold text-ink">Microsoft Fabric security and governance.</span>{' '}
                  Microsoft Fabric security and governance should be considered from the beginning of your
                  implementation. Folio3 helps define access controls, workspace standards, ownership models,
                  operational policies, and monitoring practices so your teams can scale analytics responsibly.
                </p>
              }
            />

            <CapabilityBlock
              title="Microsoft Fabric AI readiness"
              intro="AI succeeds when the underlying data is reliable, connected, governed, and accessible. Folio3 helps organizations establish a Fabric data platform for AI, giving teams a stronger foundation for analytics, machine learning, forecasting, Copilot, and intelligent automation."
              items={aiReadyItems}
              extra={
                <p>
                  Extend your modernized Fabric environment with Folio3’s Data Science and AI Services to build
                  predictive models, intelligent analytics solutions, and AI-driven business capabilities.
                </p>
              }
            />

            <CapabilityBlock
              title="Real-time analytics modernization"
              intro="Operational data loses value when it arrives too late. Folio3 helps organizations modernize streaming and event-driven workloads with Microsoft Fabric so they can monitor business operations, detect changes, analyze real-time signals, and respond faster."
              items={realtimeItems}
              extra={
                <p>Learn more about managing real-time data streams with Microsoft Fabric.</p>
              }
            />
          </div>
        </div>
      </section>

      {/* Fold 7 — Why Folio3 */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Why Folio3</span>
            <h2 className="text-3xl lg:text-4xl">What to Expect from Folio3 Microsoft Fabric Experts</h2>
            <p className="mt-4 text-body">
              Folio3 is a Microsoft Fabric consulting company and Microsoft Fabric development company that combines
              data engineering, cloud architecture, business intelligence, data science, AI, and industry knowledge to
              deliver practical modernization outcomes.
            </p>
            <p className="mt-3 text-body">
              We do more than configure a platform. We help you create a sustainable data environment that supports
              trusted reporting, scalable analytics, governed self-service, and long-term AI readiness.
            </p>
          </Reveal>

          <h3 className="mx-auto mt-12 max-w-4xl text-center text-lg font-semibold text-ink">
            Our approach to Microsoft Fabric Cloud Data Modernization
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((p, i) => (
              <Reveal key={p.phase} animation="fadeInUp" delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">Phase {String(i + 1).padStart(2, '0')}</div>
                  <h4 className="mt-2 text-lg font-semibold leading-snug">{p.phase}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-body">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <h3 className="mx-auto mt-12 max-w-4xl text-center text-lg font-semibold text-ink">Why choose Folio3?</h3>
          <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {whyBullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            For organizations that need faster time to value, <span className="font-semibold text-ink">IntelliFabric</span>{' '}
            is Folio3’s industry-ready analytics solution built on Microsoft Fabric. It combines modern Fabric
            architecture, automated pipelines, Power BI semantic models, governed self-service analytics, and prebuilt
            dashboards for priority business use cases.
          </p>
          <div className="mt-8 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
              Speak with a Folio3 Data Modernization Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Fold 8 — Use Cases */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Business use cases</span>
            <h2 className="text-3xl lg:text-4xl">Microsoft Fabric Data Modernization for Business-Critical Use Cases</h2>
            <p className="mt-4 text-body">
              Microsoft Fabric Cloud Data Modernization makes data more useful across teams, departments, and
              decision-making processes.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <Reveal key={u.title} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-2xl border border-surface-line bg-white p-6 shadow-card card-hover">
                  <h3 className="text-lg font-semibold leading-snug text-ink">{u.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{u.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
              Discuss Your Microsoft Fabric Use Case
            </Link>
          </div>
        </div>
      </section>

      {/* Fold 9 — Case studies */}
      <AutoScrollCases cases={caseStudies} />
      <section className="bg-surface-tint py-10">
        <div className="container-x text-center">
          <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
            Talk to Us About Your Data Modernization Project
          </Link>
        </div>
      </section>

      {/* Awards */}
      <AwardsBand autoScroll />

      {/* Fold 10 — FAQs */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Microsoft Fabric Cloud Data Modernization FAQs</h2>
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

      {/* Fold 11 — Lead form */}
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
