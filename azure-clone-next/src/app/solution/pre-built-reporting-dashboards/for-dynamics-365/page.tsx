import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

const CANONICAL =
  'https://azure.folio3.com/solution/pre-built-reporting-dashboards/for-dynamics-365';
const TITLE = 'Power BI Dashboards for Dynamics 365 F&SCM | Folio3';
const DESCRIPTION =
  'Accelerate Dynamics 365 Finance and Supply Chain reporting with pre-built Power BI dashboards, Fabric data models, and Azure analytics.';
const OG_IMAGE = '/wp-content/uploads/2024/06/microsoft-fabric-services-ipad-screen.webp';
const FORM_HREF = '#pgForm';

export const metadata: Metadata = {
  title: { absolute: TITLE },
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

const heroBullets = [
  'Replace repetitive spreadsheet reporting with interactive Power BI dashboards',
  'Monitor finance and supply-chain KPIs in one connected reporting experience',
  'Analyze performance by company, business unit, location, supplier, product, department, or financial dimension',
  'Drill from executive KPIs into the details behind performance changes',
  'Create a scalable reporting foundation for additional analytics, forecasting, and AI use cases',
];

const foundationStack = [
  'Dynamics 365 Finance and Supply Chain Management data',
  'Microsoft Azure data integration and storage services',
  'Microsoft Fabric data engineering, warehousing, and governance capabilities',
  'Power BI dashboards, reports, semantic models, and secure sharing',
  'Additional enterprise data sources when reporting requires a broader operational view',
];

type Coverage = {
  title: string;
  intro: string;
  areas: string[];
  kpis: string;
  linkText?: string;
  linkHref?: string;
  linkTail?: string;
};

const coverage: Coverage[] = [
  {
    title: 'Finance and Executive Reporting',
    intro:
      'Give CFOs, controllers, finance leaders, and executives a timely view of financial health and operational performance.',
    areas: [
      'Profit and loss analysis',
      'Budget versus actual performance',
      'Revenue and expense trends',
      'Balance sheet and financial-position reporting',
      'Cash flow and liquidity monitoring',
      'Working capital analysis',
      'Accounts receivable aging and collections',
      'Accounts payable aging and payment analysis',
      'Financial dimension analysis',
      'Multi-company and legal-entity performance comparison',
      'Executive KPI summaries and trend reporting',
    ],
    kpis:
      'Gross margin, operating margin, actual-versus-budget variance, Days Sales Outstanding, Days Payable Outstanding, cash position, overdue receivables, and working-capital trends.',
    linkText: 'Azure, Microsoft Fabric, and Copilot-enabled financial planning',
    linkHref: 'https://azure.folio3.com/microsoft-fabric-services/',
    linkTail:
      ' extends these dashboards into modern financial planning, forecasting, and AI-assisted analysis.',
  },
  {
    title: 'Procurement and Vendor Performance',
    intro:
      'Help procurement teams track spending, supplier performance, purchasing activity, and exceptions before they become operational issues.',
    areas: [
      'Purchase spend analysis',
      'Spend by supplier, category, company, and site',
      'Purchase-order status and fulfillment',
      'Vendor delivery performance',
      'Supplier lead-time variance',
      'Purchase-price trends',
      'Invoice matching and exception visibility',
      'Vendor concentration and procurement risk indicators',
    ],
    kpis:
      'On-time delivery rate, purchase spend, purchase-order cycle time, supplier lead-time performance, invoice accuracy, and open purchase-order value.',
  },
  {
    title: 'Inventory, Warehouse, and Supply Chain Analytics',
    intro:
      'Give supply-chain leaders a connected view of inventory, movement, availability, warehouse activity, and fulfillment performance.',
    areas: [
      'Inventory on hand and inventory value',
      'Inventory aging and slow-moving inventory',
      'Inventory turnover',
      'Stock availability and stock-out risk',
      'Demand and supply trends',
      'Warehouse performance',
      'Order fulfillment performance',
      'Inventory by location, site, warehouse, product, and legal entity',
      'Supplier and purchasing performance',
      'Supply-chain exception monitoring',
    ],
    kpis:
      'Inventory turns, inventory aging, fill rate, stock-out rate, on-time in-full performance, warehouse throughput, open-order value, and supplier-delivery performance.',
    linkText: 'supply chain analytics services',
    linkHref: 'https://azure.folio3.com/azure-data-analytics/',
    linkTail:
      ' consolidate KPIs across procurement, inventory, logistics, and supplier systems.',
  },
  {
    title: 'Production, Operations, and Project Reporting',
    intro:
      'Use role-based operational dashboards to monitor production performance, capacity, orders, projects, and delivery outcomes.',
    areas: [
      'Production order status',
      'Production costs and variances',
      'Capacity utilization',
      'Delivery performance',
      'Sales and profitability',
      'Project cost and margin reporting',
      'Operational KPI scorecards',
      'Cross-functional management reporting',
    ],
    kpis:
      'Production output, schedule adherence, capacity utilization, order fulfillment, project margin, and cross-functional operational KPIs.',
  },
];

const insightCapabilities = [
  'Filter by legal entity, business unit, site, warehouse, vendor, customer, product, department, period, and financial dimension',
  'Move from an executive summary to detailed supporting transactions or operational views',
  'Compare actual performance with budget, plan, prior period, or historical benchmarks',
  'Identify exceptions, unfavorable variances, and emerging trends',
  'Access relevant insights based on role and permitted data access',
];

const included = [
  {
    title: 'Pre-built dashboard framework',
    body: 'A faster starting point for commonly required finance and supply-chain reporting needs.',
  },
  {
    title: 'Power BI reports and dashboards',
    body: 'Interactive visuals, KPI scorecards, drill-down analysis, filtering, and trend reporting.',
  },
  {
    title: 'D365 F&SCM data integration',
    body: 'Structured access to relevant finance, procurement, inventory, warehouse, production, and operational data.',
  },
  {
    title: 'Governed data model',
    body: 'Consistent KPI definitions and reusable semantic modeling for trusted reporting.',
  },
  {
    title: 'Microsoft Fabric and Azure architecture',
    body: 'A scalable foundation for ingestion, transformation, storage, reporting, and future analytics expansion.',
  },
  {
    title: 'Security and access design',
    body: 'Role-appropriate access and controlled reporting distribution.',
  },
  {
    title: 'Configuration and customization',
    body: 'Alignment with your entities, dimensions, KPIs, business rules, and reporting priorities.',
  },
  {
    title: 'Documentation and enablement',
    body: 'Dashboard walkthroughs, user guidance, and knowledge transfer for business and IT teams.',
  },
  {
    title: 'Ongoing enhancement support',
    body: 'Scope-based improvements, new dashboards, new KPIs, and expanded analytics use cases.',
  },
];

const architectureLayers = [
  { label: 'Source', title: 'Dynamics 365 Finance & Supply Chain Management' },
  { label: 'Integration', title: 'Azure data integration and transformation' },
  { label: 'Foundation', title: 'Microsoft Fabric data foundation and semantic model' },
  { label: 'Insight', title: 'Power BI dashboards and reports' },
  { label: 'Access', title: 'Secure, role-based business access' },
];

const flexibility = [
  'Legal entities and organizational hierarchy',
  'Financial dimensions and chart-of-accounts structure',
  'Business-specific KPI definitions',
  'Reporting periods, currencies, regions, and units of measure',
  'Security and user-access requirements',
  'Power BI workspace and sharing approach',
  'Existing Azure, Fabric, and enterprise-data architecture',
  'Additional reporting needs beyond standard Dynamics 365 F&SCM data',
];

const deliverySteps = [
  {
    n: '01',
    title: 'Discovery and KPI alignment',
    body: 'Identify decisions, audiences, reporting gaps, source data, and success measures.',
  },
  {
    n: '02',
    title: 'Data and architecture assessment',
    body: 'Validate D365 entities, integration approach, data quality, refresh needs, and access requirements.',
  },
  {
    n: '03',
    title: 'Dashboard configuration',
    body: 'Apply relevant pre-built dashboard patterns and align them with your organization.',
  },
  {
    n: '04',
    title: 'Validation and security setup',
    body: 'Review KPI logic, establish access controls, test performance, and validate outputs with stakeholders.',
  },
  {
    n: '05',
    title: 'Enablement and go-live',
    body: 'Train users, publish dashboards, document the solution, and define an enhancement roadmap.',
  },
];

const faqs = [
  {
    q: 'What are pre-built Dynamics 365 F&SCM dashboards?',
    a: 'Pre-built Dynamics 365 Finance & Supply Chain Management dashboards are reusable Power BI reporting patterns designed around common finance, procurement, inventory, warehouse, production, and executive reporting needs. They provide a faster starting point than developing every dashboard from scratch and can be configured for your business structure, KPI definitions, and access requirements.',
  },
  {
    q: 'Can the dashboards support multiple legal entities?',
    a: 'Yes. Multi-entity reporting can be considered as part of the dashboard and data-model design. The final approach depends on your Dynamics 365 configuration, available data, security model, reporting requirements, and the intended level of consolidation.',
  },
  {
    q: 'Can we customize KPIs and financial dimensions?',
    a: 'Yes. Folio3 can align dashboards with your financial dimensions, legal entities, chart of accounts, KPI calculations, reporting filters, and business rules. The level of customization should be defined during discovery and solution scoping.',
  },
  {
    q: 'Do these dashboards work with Microsoft Fabric?',
    a: "Yes. The solution can be designed to use Microsoft Fabric capabilities for data integration, transformation, storage, semantic modeling, governance, and Power BI reporting. Folio3's IntelliFabric offering is built around pre-built dashboards, governed data models, and a modern Fabric architecture.",
  },
  {
    q: 'Can Folio3 connect dashboards to sources beyond D365 F&SCM?',
    a: 'Yes. Where required, the analytics solution can incorporate additional enterprise data sources to provide a more complete reporting view. Integration scope, source readiness, data quality, and governance requirements should be evaluated during discovery.',
  },
  {
    q: 'How long does implementation take?',
    a: 'Timeline depends on the dashboard scope, number of entities and modules, data readiness, required integrations, security needs, validation cycles, and customization level. Folio3 defines an implementation plan after assessing your Dynamics 365 F&SCM environment and reporting priorities.',
  },
  {
    q: 'Does Folio3 provide training and support?',
    a: 'Training, documentation, knowledge transfer, and ongoing dashboard enhancement support can be included based on the agreed engagement scope.',
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
  name: 'Pre-Built Power BI Dashboards for Dynamics 365 F&SCM',
  serviceType: 'Dynamics 365 Finance and Supply Chain Management dashboards',
  provider: {
    '@type': 'Organization',
    name: 'Folio3',
    url: 'https://azure.folio3.com/',
  },
  areaServed: 'Worldwide',
  url: CANONICAL,
  description: DESCRIPTION,
};

export default function PreBuiltD365DashboardsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <span className="eyebrow">Dynamics 365 F&SCM · Azure · Microsoft Fabric · Power BI</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl xl:text-6xl">
              Pre-Built Power BI Dashboards for{' '}
              <span className="text-brand">Dynamics 365 Finance &amp; Supply Chain Management</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Turn Dynamics 365 F&amp;SCM data into timely, trusted business insight with pre-built Power BI
              dashboards designed for finance, procurement, inventory, supply chain, warehouse, production, and
              executive reporting.
            </p>
            <p className="mt-4 max-w-xl text-body">
              Folio3 helps organizations move beyond disconnected exports and static spreadsheets with dashboards
              built on Microsoft Azure and Microsoft Fabric. Gain visibility into the KPIs that matter, explore
              trends with interactive drill-downs, and give decision-makers a governed foundation for self-service
              reporting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={FORM_HREF}
                className="btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide"
              >
                Explore the Dashboard Catalog
              </Link>
              <Link
                href={FORM_HREF}
                className="btn border border-brand text-brand hover:bg-brand hover:text-white uppercase tracking-wide"
              >
                Book a Live Dashboard Demo
              </Link>
            </div>
          </div>
          <Reveal animation="zoomIn" className="relative">
            <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
              <div className="flex items-center justify-between border-b border-surface-line pb-3">
                <div className="text-sm font-semibold text-ink">D365 F&amp;SCM · Executive View</div>
                <div className="text-xs text-body">Power BI · Refreshed today</div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: 'Gross Margin', value: '42.6%' },
                  { label: 'Cash Position', value: '$18.4M' },
                  { label: 'DSO', value: '38 days' },
                  { label: 'On-Time In-Full', value: '96.2%' },
                  { label: 'Inventory Turns', value: '7.1x' },
                  { label: 'Open PO Value', value: '$4.9M' },
                ].map((k) => (
                  <div key={k.label} className="rounded-lg bg-surface-tint p-3">
                    <div className="text-lg font-bold text-brand">{k.value}</div>
                    <div className="mt-1 text-[11px] leading-snug text-body">{k.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-28 rounded-lg bg-[linear-gradient(135deg,#eaf1ff_0%,#d5e3ff_100%)] p-3">
                <div className="flex h-full items-end gap-1.5">
                  {[36, 48, 42, 60, 55, 72, 68, 84, 78, 90, 85, 96].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 rounded-t bg-brand/80"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 flex justify-between text-[11px] text-body">
                <span>Actual vs. Budget · YTD</span>
                <span>Drill: entity · dimension · period</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand">
        <div className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="px-2">/</span>
          <span>Solution</span>
          <span className="px-2">/</span>
          <span>Pre-Built Reporting Dashboards</span>
          <span className="px-2">/</span>
          <span>For Dynamics 365</span>
        </div>
      </div>

      {/* Reporting Should Not Slow Down Decisions */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The Problem</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Reporting should not slow down decisions</h2>
            <p className="mt-4 text-body">
              Finance and operations teams often have the data they need in Dynamics 365 F&amp;SCM—but turning that
              data into a useful management view can still require manual exports, reconciliations, spreadsheet
              consolidation, and recurring report requests.
            </p>
            <p className="mt-3 text-body">
              Folio3&apos;s pre-built Dynamics 365 reporting dashboards provide a faster starting point for business
              intelligence. Instead of beginning with a blank Power BI canvas, your teams get focused dashboard
              experiences and governed data foundations aligned with common finance and supply-chain decisions.
            </p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {heroBullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            Folio3&apos;s approach aligns with its broader{' '}
            <a
              href="https://azure.folio3.com/microsoft-fabric-services/"
              className="text-brand underline"
            >
              IntelliFabric analytics solution
            </a>
            , which combines pre-built dashboards with Microsoft Fabric-based data architecture and governance.
          </p>
        </div>
      </section>

      {/* One Reporting Foundation */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Reporting Foundation</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">One reporting foundation for D365 F&amp;SCM</h2>
            <p className="mt-4 text-body">
              Folio3 pre-built reporting dashboards are designed to help Dynamics 365 Finance &amp; Supply Chain
              Management teams get to useful insight faster while retaining the flexibility to adapt dashboards,
              KPIs, data models, and access controls to their operating model.
            </p>
            <p className="mt-3 text-body">The solution can bring together:</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foundationStack.map((f, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <div className="text-brand">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 7h16M4 12h16M4 17h10" />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-body">{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Rather than treating dashboards as isolated visuals, Folio3 helps establish a trusted analytics layer
            that supports consistent business definitions, controlled refreshes, and role-appropriate access. For a
            broader data and reporting modernization initiative, explore Folio3&apos;s{' '}
            <a
              href="https://azure.folio3.com/microsoft-power-platform-services/"
              className="text-brand underline"
            >
              Microsoft Power Platform services
            </a>
            .
          </p>
        </div>
      </section>

      {/* Dashboard Coverage */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Dashboard Coverage</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Dashboard coverage for every function</h2>
            <p className="mt-4 text-body">
              Pre-built patterns for finance, procurement, inventory, warehouse, production, and executive
              reporting — configured to your legal entities, dimensions, and KPIs.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {coverage.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                  <h3 className="text-xl font-semibold text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{c.intro}</p>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand">
                    Common dashboard areas
                  </div>
                  <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-body sm:grid-cols-2">
                    {c.areas.map((a) => (
                      <li key={a} className="flex gap-2">
                        <span aria-hidden className="mt-1 shrink-0 text-brand">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-lg bg-surface-tint p-4 text-sm text-body">
                    <span className="font-semibold text-ink">Typical KPIs: </span>
                    {c.kpis}
                  </div>
                  {c.linkText && c.linkHref && (
                    <p className="mt-4 text-sm text-body">
                      <a href={c.linkHref} className="text-brand underline">
                        {c.linkText}
                      </a>
                      {c.linkTail}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* See the Metrics Behind Performance */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Beyond the KPI</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">See the metrics behind performance</h2>
            <p className="mt-4 text-body">
              A dashboard should do more than show a KPI. It should help users understand what changed, why it
              changed, and where to investigate next.
            </p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {insightCapabilities.map((c, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            Folio3&apos;s{' '}
            <a href="https://azure.folio3.com/microsoft-fabric-services/" className="text-brand underline">
              IntelliFabric dashboard case study
            </a>{' '}
            demonstrates the value of consolidating finance, sales, and inventory information into a unified view
            with automated KPI tracking against budgets and historical benchmarks.
          </p>
        </div>
      </section>

      {/* What Is Included */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">What Is Included</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">A complete reporting engagement</h2>
            <p className="mt-4 text-body">
              Every Dynamics 365 F&amp;SCM environment has its own legal-entity structure, financial dimensions,
              processes, reporting requirements, and data readiness. Folio3 uses pre-built dashboard patterns to
              accelerate delivery, then aligns the reporting experience with your business context.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <Reveal key={item.title} animation="fadeInUp" delay={i * 50}>
                <div className="h-full rounded-r-2xl border-l-4 border-brand bg-white p-6 shadow-card">
                  <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Built for speed, designed for governance
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              A pre-built dashboard should reduce time to value without creating a disconnected reporting
              environment. Folio3 combines a dashboard-first user experience with the architecture needed for
              reliable, controlled analytics.
            </p>
            <Link
              href={FORM_HREF}
              className="btn mt-8 bg-white text-brand hover:bg-surface-chip uppercase tracking-wide"
            >
              Book a Live Dashboard Demo
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Typical Reporting Architecture */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Architecture</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Typical reporting architecture</h2>
            <p className="mt-4 text-body">
              Depending on your environment and requirements, the implementation can incorporate appropriate
              Dynamics 365 connection and data-integration patterns, data refresh practices, enterprise data
              sources, and Power BI security controls.
            </p>
          </Reveal>
          <ol className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-5">
            {architectureLayers.map((layer, i) => (
              <li key={layer.label} className="relative">
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-5 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {`Layer ${i + 1} · ${layer.label}`}
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-snug text-ink">{layer.title}</div>
                </div>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            Read Folio3&apos;s guide to{' '}
            <a href="https://azure.folio3.com/microsoft-fabric-services/" className="text-brand underline">
              Power BI dashboards with Microsoft Fabric
            </a>{' '}
            for a deeper look at connecting data, modeling it for analysis, building dashboards, monitoring
            refreshes, and managing sharing and access.
          </p>
        </div>
      </section>

      {/* Fast Starting Point, Flexible Delivery */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Flexible Delivery</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Fast starting point, flexible delivery</h2>
            <p className="mt-4 text-body">
              Pre-built does not mean one-size-fits-all. Folio3 can configure and extend dashboard experiences
              around your:
            </p>
          </Reveal>
          <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {flexibility.map((f, i) => (
              <li key={i} className="flex gap-3 text-body">
                <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {deliverySteps.map((s, i) => (
              <Reveal key={s.n} animation="fadeInUp" delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <div className="text-3xl font-bold text-brand">{s.n}</div>
                  <h3 className="mt-3 text-base font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            For businesses that need reporting across Dynamics 365 and plant-floor or operational systems, Folio3
            also provides{' '}
            <a href="https://azure.folio3.com/azure-data-analytics/" className="text-brand underline">
              manufacturing data analytics solutions
            </a>{' '}
            built with Azure and Power BI.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Frequently asked questions</h2>
            <p className="mt-4 text-body">
              Everything finance, supply-chain, and BI leaders typically ask before starting a pre-built dashboard
              engagement.
            </p>
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

      {/* Ready to Modernize CTA */}
      <section className="relative overflow-hidden bg-brand-ink py-16 lg:py-20">
        <div className="container-x text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Ready to modernize D365 reporting?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Give finance and supply-chain teams a faster path from Dynamics 365 F&amp;SCM data to confident
              decisions. Explore pre-built Power BI dashboards for Finance, Procurement, Inventory, Warehouse,
              Production, and Executive Reporting—delivered on a scalable Microsoft Azure and Microsoft Fabric
              foundation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={FORM_HREF}
                className="btn bg-white text-brand hover:bg-surface-chip uppercase tracking-wide"
              >
                Explore the Dashboard Catalog
              </Link>
              <Link
                href={FORM_HREF}
                className="btn border border-white/60 text-white hover:bg-white hover:text-brand uppercase tracking-wide"
              >
                Book a Live Dashboard Demo
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OneToOneCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
