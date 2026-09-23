import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { DashboardTabs, type DashboardFunction } from './dashboard-tabs';

const CANONICAL = 'https://azure.folio3.com/solution/pre-built-reporting-dashboards';
const TITLE = 'Pre-Built Reporting Dashboards | Power BI & Azure Analytics | Folio3';
const DESCRIPTION =
  'Pre-built Power BI reporting dashboards for finance, sales, operations, marketing, ERP, CRM, and e-commerce data. Folio3 configures scalable Azure analytics solutions around your KPIs.';
const OG_IMAGE = '/wp-content/uploads/2025/07/power-bi-ipad-screen.webp';
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Pre-built reporting dashboards' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const challengeBullets = [
  'Bring data from ERP, CRM, finance, marketing, e-commerce, operations, and custom applications into one reporting experience',
  'Track the KPIs that matter to leadership and functional teams',
  'Reduce repetitive spreadsheet-based reporting and manual consolidation',
  'Compare results by company, region, product, customer, team, channel, department, or time period',
  'Drill from executive-level KPIs into the underlying detail',
  'Schedule data refreshes and share controlled access with the right users',
  'Build a scalable reporting foundation that can grow with your Azure environment',
];

const dashboardFunctions: DashboardFunction[] = [
  {
    id: 'executive',
    tab: 'Executive',
    title: 'Executive and Leadership Dashboards',
    body: 'Give leadership a connected view of revenue, profitability, growth, cash position, operational performance, customer trends, and strategic KPIs. Replace disconnected management reports with a clear executive reporting layer.',
    listLabel: 'Common executive dashboard metrics include:',
    items: [
      'Revenue and gross margin',
      'Profitability by business unit, region, product, or customer',
      'Budget versus actual performance',
      'Cash flow and working capital',
      'Sales pipeline and forecast',
      'Customer acquisition, retention, and growth',
      'Operational and delivery performance',
    ],
    preview: {
      accent: '#1742E7',
      kpis: [
        { label: 'Revenue', value: '$12.4M' },
        { label: 'Gross margin', value: '38.2%' },
        { label: 'Cash position', value: '$3.1M' },
        { label: 'Pipeline', value: '$8.7M' },
      ],
      bars: [52, 58, 55, 63, 68, 66, 74, 79, 83, 88],
    },
  },
  {
    id: 'finance',
    tab: 'Finance',
    title: 'Financial Reporting Dashboards',
    body: 'Give finance teams faster visibility into business performance with interactive views of financial data. Analyze profit and loss, budgeting, cash flow, accounts receivable, accounts payable, expenses, revenue trends, and financial performance across entities or cost centers.',
    listLabel: 'Typical finance dashboards include:',
    items: [
      'Profit and loss dashboard',
      'Budget versus actual dashboard',
      'Cash flow dashboard',
      'Accounts receivable aging dashboard',
      'Accounts payable dashboard',
      'Revenue and margin dashboard',
      'Expense and cost-center dashboard',
      'Financial close and management reporting dashboard',
    ],
    preview: {
      accent: '#0E7C66',
      kpis: [
        { label: 'Net profit', value: '$2.3M' },
        { label: 'Budget var.', value: '+4.1%' },
        { label: 'AR > 60 days', value: '$410K' },
        { label: 'Opex', value: '$5.8M' },
      ],
      bars: [40, 46, 43, 50, 48, 55, 57, 54, 61, 65],
    },
  },
  {
    id: 'sales',
    tab: 'Sales',
    title: 'Sales Performance Dashboards',
    body: 'Help sales leaders monitor pipeline health, revenue performance, conversion, account activity, win rates, team productivity, and forecast accuracy in one view.',
    listLabel: 'Typical sales dashboard metrics include:',
    items: [
      'Pipeline value and pipeline coverage',
      'Lead-to-opportunity conversion',
      'Win/loss rate',
      'Sales cycle duration',
      'Revenue by salesperson, territory, account, or product',
      'Target attainment',
      'Forecast versus actual performance',
      'Customer and account growth',
    ],
    preview: {
      accent: '#2F69F2',
      kpis: [
        { label: 'Pipeline', value: '$8.7M' },
        { label: 'Win rate', value: '31%' },
        { label: 'Cycle', value: '42 days' },
        { label: 'Attainment', value: '94%' },
      ],
      bars: [35, 48, 44, 60, 57, 70, 66, 78, 74, 86],
    },
  },
  {
    id: 'marketing',
    tab: 'Marketing',
    title: 'Marketing Reporting Dashboards',
    body: 'Connect your marketing data to measure campaign performance, spend, leads, conversion, pipeline contribution, website activity, and channel ROI. Centralize data from advertising platforms, analytics tools, CRM systems, marketing automation, and e-commerce platforms.',
    listLabel: 'Typical marketing dashboard metrics include:',
    items: [
      'Marketing spend and return on ad spend',
      'Leads, MQLs, SQLs, and opportunities',
      'Cost per lead and customer acquisition cost',
      'Website traffic and conversion rate',
      'Campaign and channel performance',
      'Organic search performance',
      'Email engagement',
      'Pipeline and revenue attribution',
    ],
    preview: {
      accent: '#7A3FE4',
      kpis: [
        { label: 'ROAS', value: '4.6x' },
        { label: 'MQLs', value: '1,284' },
        { label: 'CPL', value: '$38' },
        { label: 'Conv. rate', value: '3.2%' },
      ],
      bars: [30, 42, 38, 51, 64, 58, 70, 67, 81, 77],
    },
  },
  {
    id: 'operations',
    tab: 'Operations & Supply Chain',
    title: 'Operations and Supply Chain Dashboards',
    body: 'Turn operational data into live, practical visibility for inventory, procurement, fulfillment, production, vendor management, and supply chain performance.',
    listLabel: 'Typical operations dashboards include:',
    items: [
      'Inventory availability and turnover',
      'Stock aging and stock-out risk',
      'Order fulfillment performance',
      'Purchase order status',
      'Supplier performance',
      'Procurement spend',
      'Production volume and quality KPIs',
      'On-time delivery and operational exceptions',
    ],
    preview: {
      accent: '#D9730D',
      kpis: [
        { label: 'Inv. turnover', value: '7.4x' },
        { label: 'On-time', value: '96.1%' },
        { label: 'Open POs', value: '218' },
        { label: 'Stock-out risk', value: '12 SKUs' },
      ],
      bars: [62, 58, 66, 61, 70, 68, 73, 71, 76, 79],
    },
  },
  {
    id: 'ecommerce',
    tab: 'E-commerce & Retail',
    title: 'E-commerce and Retail Dashboards',
    body: 'Bring together store, product, order, customer, inventory, marketing, and fulfillment performance. Give retail and e-commerce teams a shared view of what is selling, which channels are performing, and where growth opportunities exist.',
    listLabel: 'Typical e-commerce dashboard metrics include:',
    items: [
      'Revenue by store, product, category, channel, and geography',
      'Average order value',
      'Customer acquisition and repeat purchase trends',
      'Conversion rate',
      'Product and inventory performance',
      'Return rate',
      'Marketing spend and sales attribution',
      'Fulfillment and delivery performance',
    ],
    preview: {
      accent: '#C2185B',
      kpis: [
        { label: 'Revenue', value: '$4.9M' },
        { label: 'AOV', value: '$86' },
        { label: 'Repeat rate', value: '27%' },
        { label: 'Return rate', value: '5.4%' },
      ],
      bars: [44, 50, 47, 56, 62, 59, 68, 75, 72, 90],
    },
  },
  {
    id: 'service',
    tab: 'Customer Service',
    title: 'Customer Service and Support Dashboards',
    body: 'Track service quality, ticket volume, response times, SLA performance, resolution trends, customer satisfaction, and agent workload across support operations.',
    listLabel: 'Typical service dashboard metrics include:',
    items: [
      'Ticket volume and backlog',
      'First response time',
      'Resolution time',
      'SLA compliance',
      'CSAT and customer feedback',
      'Cases by issue type, product, channel, or team',
      'Agent workload and performance',
      'Escalation trends',
    ],
    preview: {
      accent: '#00838F',
      kpis: [
        { label: 'Open tickets', value: '342' },
        { label: 'First response', value: '1.8h' },
        { label: 'SLA met', value: '97%' },
        { label: 'CSAT', value: '4.6/5' },
      ],
      bars: [70, 66, 72, 64, 60, 62, 57, 55, 52, 49],
    },
  },
];

const dataSources = [
  {
    category: 'ERP and business applications',
    systems: 'Microsoft Dynamics 365, Business Central, Finance, Supply Chain Management, NetSuite, SAP, Oracle, Odoo, Sage',
  },
  { category: 'CRM and customer data', systems: 'Microsoft Dynamics 365 Sales, Salesforce, HubSpot, Zoho CRM' },
  { category: 'Finance and accounting', systems: 'QuickBooks, Xero, Sage, Excel, accounting databases' },
  {
    category: 'Marketing and analytics',
    systems: 'Google Ads, Microsoft Ads, Meta Ads, LinkedIn Ads, Google Analytics, HubSpot, Search Console',
  },
  { category: 'E-commerce', systems: 'Shopify, Magento, WooCommerce, Amazon, marketplaces' },
  { category: 'Operational systems', systems: 'SQL Server, Azure SQL, APIs, CSV files, Excel workbooks, custom applications' },
  {
    category: 'Cloud data platforms',
    systems: 'Azure Data Lake, Azure Synapse, Microsoft Fabric, Azure Databricks, Snowflake, BigQuery',
  },
];

const customizationItems = [
  'Business-specific KPI definitions and formulas',
  'Company, region, department, cost center, product, and customer dimensions',
  'Role-based views for executives, finance, sales, operations, and marketing teams',
  'Data filtering, drill-through, and data-detail requirements',
  'Branding, layout, terminology, and report navigation',
  'Multi-company, multi-currency, multi-location, and multi-entity reporting',
  'Historical comparisons and forecasting requirements',
  'Scheduled data refresh and exception monitoring',
  'Security and access controls',
  'Custom source-system connections and API integrations',
];

const comparisonRows = [
  {
    option: 'Standard system reports',
    bestFor: 'Basic operational reporting inside a single application',
    limitation: 'Limited cross-system analysis, visualization, and executive storytelling',
    advantage: 'Extend standard data into role-based, interactive, decision-ready dashboards',
  },
  {
    option: 'Spreadsheet-based reporting',
    bestFor: 'One-off analysis and manual reporting',
    limitation: 'Time-consuming, error-prone, difficult to govern, and hard to scale',
    advantage: 'Automate refreshes and establish a shared KPI source of truth',
  },
  {
    option: 'Generic dashboard templates',
    bestFor: 'Quick inspiration or simple self-service use cases',
    limitation: 'Often require technical setup and rarely match real business logic',
    advantage: 'Start with a proven framework and configure it around your data and requirements',
  },
  {
    option: 'Fully custom BI project',
    bestFor: 'Highly unique or advanced data needs',
    limitation: 'Longer discovery, design, modeling, and implementation cycles',
    advantage: 'Begin faster with pre-built components, then extend where it matters',
  },
  {
    option: 'Folio3 pre-built reporting dashboards',
    bestFor: 'Teams that want speed plus flexibility',
    limitation: 'Requires source-data discovery and KPI alignment',
    advantage: 'Combine ready-to-deploy dashboard foundations with Azure-ready customization and expert delivery',
    highlight: true,
  },
];

const deliverables = [
  'Pre-built dashboard pages relevant to your functional area',
  'KPI framework and metric-definition workshop',
  'Source-system assessment and data mapping',
  'Power BI report configuration',
  'Data model configuration or enhancement',
  'Azure data integration and transformation design where required',
  'Scheduled refresh setup',
  'Drill-through, filters, role views, and navigation',
  'Security and access configuration',
  'Dashboard validation and reconciliation support',
  'User training and documentation',
  'Hypercare, managed support, and roadmap planning',
  'Optional embedded analytics for customer portals, internal applications, or SaaS products',
];

const steps = [
  {
    title: 'Discover',
    body: 'We begin by understanding your reporting challenges, source systems, stakeholder roles, existing reports, KPI definitions, and the decisions your teams need to make.',
  },
  {
    title: 'Connect and Prepare',
    body: 'We assess and connect approved sources, map the required data, identify data-quality considerations, and recommend the right data refresh and architecture approach.',
  },
  {
    title: 'Configure and Customize',
    body: 'We apply the relevant dashboard framework, configure metrics and dimensions, design user-friendly views, and tailor the experience to your teams.',
  },
  {
    title: 'Validate and Reconcile',
    body: 'We review results with business stakeholders, reconcile key measures against approved source reports, confirm security requirements, and refine the dashboards before launch.',
  },
  {
    title: 'Launch and Scale',
    body: 'We train users, deploy the reporting solution, monitor adoption, and create a roadmap for additional dashboards, data sources, automation, Azure analytics, or embedded reporting.',
  },
];

const azureItems = [
  'Azure Data Factory or Microsoft Fabric for data ingestion and transformation',
  'Azure SQL, Data Lake, Synapse, Fabric, or Databricks for scalable data storage and processing',
  'Power BI semantic models for standardized KPIs and trusted reporting',
  'Role-based access and governance practices',
  'Real-time and near-real-time operational reporting where needed',
  'Power BI Embedded for dashboards inside web applications, portals, or customer products',
  'AI-enabled insights, forecasting, and advanced analytics as data maturity increases',
];

const whyBullets = [
  'A faster alternative to starting every dashboard from a blank canvas',
  'Reporting designed around your business users, KPIs, and decision-making process',
  'A partner that can connect business systems and prepare data—not only design visuals',
  'Flexible support for one system, multiple sources, cloud data platforms, and custom applications',
  'A practical path from immediate dashboards to scalable Azure analytics',
  'Help with data integration, reporting automation, governance, security, and managed support',
  'An experienced Azure partner with a global delivery capability',
];

const faqs: { q: string; a: string; node?: React.ReactNode }[] = [
  {
    q: 'What are pre-built reporting dashboards?',
    a: 'Pre-built reporting dashboards are ready-made dashboard frameworks designed around common business functions, KPIs, and reporting needs. They provide a faster starting point than building every report from scratch, while still allowing configuration for your data, metrics, business logic, and users.',
  },
  {
    q: 'Are these dashboards only for Microsoft Dynamics 365?',
    a: 'No. Folio3 can design dashboard solutions around supported ERP, CRM, finance, marketing, e-commerce, operational, database, and custom application data sources. Dynamics 365 and Business Central can be included, but this solution is not limited to them.',
  },
  {
    q: 'Can Folio3 combine multiple data sources in one dashboard?',
    a: 'Yes. We can assess your source systems and design a reporting approach that combines approved data from multiple platforms. For more complex environments, Folio3 can build a governed Azure data layer before connecting Power BI reporting.',
  },
  {
    q: 'Can the dashboards be customized?',
    a: 'Yes. We can tailor dashboards to your KPIs, company structure, product lines, regions, departments, currencies, terminology, branding, source data, security requirements, and drill-down needs.',
  },
  {
    q: 'Do we need Power BI licenses?',
    a: 'Power BI licensing needs depend on how dashboards will be created, shared, refreshed, embedded, and accessed. Folio3 can review your planned user model and recommend the appropriate licensing approach as part of discovery.',
  },
  {
    q: 'How long does implementation take?',
    a: 'Timeline depends on the number of data sources, data readiness, dashboard scope, KPI complexity, security requirements, and customization needs. Pre-built dashboard frameworks can accelerate the initial delivery, while multi-source and enterprise reporting environments may require additional data engineering and validation.',
  },
  {
    q: 'Can dashboards be embedded in our application or customer portal?',
    a: 'Yes. Folio3 can assess embedded reporting requirements and help design Power BI Embedded solutions for internal applications, SaaS products, customer portals, or partner portals. Microsoft supports embedding Power BI visualizations and interactive reports in applications and websites through Azure-based options.',
    node: (
      <>
        Yes. Folio3 can assess embedded reporting requirements and help design{' '}
        <Link href="/power-bi-services/" className="text-brand underline">
          Power BI Embedded solutions
        </Link>{' '}
        for internal applications, SaaS products, customer portals, or partner portals. Microsoft supports embedding
        Power BI visualizations and interactive reports in applications and websites through Azure-based options.
      </>
    ),
  },
  {
    q: 'Who owns our data and dashboard assets?',
    a: 'Ownership, licensing, access, documentation, and handover terms should be defined clearly in the engagement scope. Folio3 can work within your existing Azure and Power BI environment or help establish one based on your technical and operational requirements.',
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
  name: 'Pre-Built Reporting Dashboards',
  serviceType: 'Power BI dashboard solutions',
  provider: {
    '@type': 'Organization',
    name: 'Folio3',
    url: 'https://azure.folio3.com/',
  },
  areaServed: 'Worldwide',
  url: CANONICAL,
  description: DESCRIPTION,
};

function CheckList({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 }) {
  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-4 ${cols === 2 ? 'md:grid-cols-2' : ''}`}>
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-body">
          <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
          <span className="leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PreBuiltReportingDashboardsPage() {
  return (
    <>
      {/* Fold 1 — Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="eyebrow">Power BI Dashboard Solutions</span>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl">
              <span className="text-brand">Pre-Built Reporting Dashboards</span> for Faster, Smarter Decisions
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Launch decision-ready Power BI dashboards for finance, sales, marketing, operations, ERP, CRM, and
              e-commerce reporting. Folio3 configures proven dashboard frameworks around your data, KPIs, and business
              goals, then scales them on Azure as your reporting needs grow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={FORM_HREF} className="btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide">
                Schedule a Free Consultation
              </Link>
              <Link
                href="#dashboard-solutions"
                className="btn border border-brand text-brand hover:bg-brand hover:text-white uppercase tracking-wide"
              >
                Explore Dashboard Solutions
              </Link>
            </div>
            <p className="mt-6 max-w-xl text-sm text-body">
              Power BI supports interactive reporting from hundreds of sources, including Azure-native services, and can
              deliver analytics across devices, collaboration tools, applications, and business systems.
            </p>
          </div>
          <Reveal animation="zoomIn" className="relative">
            <Image
              src="/wp-content/uploads/2025/07/power-bi-ipad-screen.webp"
              alt="Pre-built Power BI reporting dashboards on Azure"
              width={736}
              height={533}
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
          <Link href="/solution/" className="hover:underline">Solutions</Link>
          <span className="px-2">/</span>
          <span>Pre-Built Reporting Dashboards</span>
        </div>
      </div>

      {/* Fold 2 — Challenge */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Make Every Decision Data-Driven</h2>
            <p className="mt-4 text-body">
              Manual spreadsheets, disconnected systems, and inconsistent KPI definitions make it hard to see what is
              really happening in the business. Even when the data exists, teams may spend too much time collecting it,
              reconciling it, and formatting it before they can act on it.
            </p>
            <p className="mt-3 text-body">Folio3 helps you move from reactive reporting to a centralized view of performance.</p>
          </Reveal>
          <h3 className="mx-auto mt-12 max-w-4xl text-center text-lg font-semibold text-ink">
            With pre-built reporting dashboards, you can:
          </h3>
          <div className="mx-auto mt-6 max-w-5xl">
            <CheckList items={challengeBullets} />
          </div>
          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-surface-line bg-surface-tint p-6 text-center text-body">
            Combine data from your business systems with Folio3’s{' '}
            <Link href="/data-integration-as-a-service/" className="text-brand underline">
              Azure data integration services
            </Link>{' '}
            before it reaches your reporting layer.
          </p>
        </div>
      </section>

      {/* Fold 3 — Dashboard library */}
      <section id="dashboard-solutions" className="scroll-mt-24 bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Pre-built Power BI dashboards</span>
            <h2 className="text-3xl lg:text-4xl">Explore Dashboard Solutions by Business Function</h2>
            <p className="mt-4 text-body">
              Choose from proven dashboard frameworks designed around the way your teams make decisions. Each solution
              can be configured to reflect your KPIs, definitions, dimensions, hierarchy, and source-system data.
            </p>
          </Reveal>
          <div className="mt-10">
            <DashboardTabs functions={dashboardFunctions} />
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-body">
            Extend dashboard insights with workflow automation, approvals, and low-code applications through Folio3’s{' '}
            <Link href="/microsoft-power-platform-services/" className="text-brand underline">
              Microsoft Power Platform services
            </Link>
            .
          </p>
          <div className="mt-8 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Fold 4 — Data sources */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Connect the Data You Already Use</h2>
            <p className="mt-4 text-body">
              Your dashboards should reflect the way your business actually operates—not force your teams into a new
              system. Folio3 can design reporting solutions around a single source system or a multi-source data
              environment.
            </p>
          </Reveal>
          <h3 className="mx-auto mt-12 max-w-4xl text-center text-lg font-semibold text-ink">
            We can connect and prepare data from supported sources such as:
          </h3>
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
            <div className="hidden grid-cols-[minmax(0,260px)_1fr] gap-6 border-b border-surface-line bg-[#f4f7fb] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-ink md:grid">
              <div>Data category</div>
              <div>Example systems</div>
            </div>
            {dataSources.map((r) => (
              <div
                key={r.category}
                className="grid gap-2 border-b border-surface-line px-6 py-5 last:border-b-0 md:grid-cols-[minmax(0,260px)_1fr] md:gap-6"
              >
                <div className="text-sm font-semibold text-ink">{r.category}</div>
                <div className="text-sm leading-relaxed text-body">{r.systems}</div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-4 text-center text-body">
            <p>
              Folio3 validates source availability, data quality, refresh requirements, security, and reporting
              requirements during discovery. We then recommend the right reporting architecture—from direct dashboard
              connections for simpler use cases to a governed Azure data layer for complex, multi-source, high-volume, or
              enterprise reporting.
            </p>
            <p>
              Azure and Power BI can support reporting across cloud-based, on-premises, single-source, multi-source,
              real-time, and enterprise-scale environments. Microsoft specifically notes that organizations can connect
              one or several Azure data sources, shape the data, and build reports around the result.
            </p>
            <p>
              Explore Folio3’s{' '}
              <Link href="/azure-data-analytics/" className="text-brand underline">
                Azure Data Analytics services
              </Link>{' '}
              for data engineering, integration, visualization, governance, and scalable analytics architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Fold 5 — Customization */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Pre-Built Does Not Mean One-Size-Fits-All</h2>
            <p className="mt-4 text-body">
              A pre-built dashboard gives you a faster and lower-risk starting point. It does not mean your reporting
              must be generic.
            </p>
          </Reveal>
          <h3 className="mx-auto mt-12 max-w-4xl text-center text-lg font-semibold text-ink">
            Folio3 configures dashboards to match your business requirements, including:
          </h3>
          <div className="mx-auto mt-6 max-w-5xl">
            <CheckList items={customizationItems} />
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Our approach combines the speed of reusable reporting frameworks with the flexibility of a tailored Power BI
            and Azure analytics solution.
          </p>
        </div>
      </section>

      {/* Fold 6 — Comparison */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Pre-Built Dashboards vs. Other Reporting Options</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
            <div className="hidden grid-cols-4 gap-6 border-b border-surface-line bg-[#f4f7fb] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-ink lg:grid">
              <div>Option</div>
              <div>Best for</div>
              <div>Limitation</div>
              <div>Folio3 advantage</div>
            </div>
            {comparisonRows.map((r) => (
              <div
                key={r.option}
                className={`grid gap-3 border-b border-surface-line px-6 py-5 last:border-b-0 lg:grid-cols-4 lg:gap-6 ${
                  r.highlight ? 'bg-brand/5' : ''
                }`}
              >
                <div className={`text-sm font-semibold ${r.highlight ? 'text-brand' : 'text-ink'}`}>{r.option}</div>
                <div className="text-sm leading-relaxed text-body">
                  <span className="font-semibold text-ink lg:hidden">Best for: </span>
                  {r.bestFor}
                </div>
                <div className="text-sm leading-relaxed text-body">
                  <span className="font-semibold text-ink lg:hidden">Limitation: </span>
                  {r.limitation}
                </div>
                <div className="text-sm leading-relaxed text-body">
                  <span className="font-semibold text-ink lg:hidden">Folio3 advantage: </span>
                  {r.advantage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 7 — What you receive */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">What You Receive</h2>
            <p className="mt-4 text-body">
              Every dashboard engagement is scoped according to your business requirements, data landscape, and
              reporting goals. Depending on the selected solution, your deliverables may include:
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d, i) => (
              <Reveal key={d} animation="fadeInUp" delay={(i % 3) * 60}>
                <div className="flex h-full gap-3 rounded-2xl border border-surface-line bg-white p-5 shadow-card">
                  <span aria-hidden className="mt-0.5 shrink-0 text-brand">✓</span>
                  <span className="text-sm leading-relaxed text-body">{d}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Keep your reporting environment reliable with Folio3’s{' '}
            <Link href="/azure-managed-services/" className="text-brand underline">
              Azure Managed Services
            </Link>{' '}
            for monitoring, optimization, security, and ongoing support.
          </p>
        </div>
      </section>

      {/* Fold 8 — Delivery process */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">How We Deliver Your Dashboard Solution</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} animation="fadeInUp" delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                    Step {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 9 — CTA banner */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Turn Your Business Data Into Clearer Decisions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-white">
              Start with proven reporting dashboards. Configure them around the KPIs that matter. Scale with Azure when
              your reporting needs grow.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Whether you need an executive dashboard, financial reporting, sales analytics, marketing performance
              reporting, operational visibility, or a unified view across multiple systems, Folio3 can help you launch
              faster with a reporting solution built for your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={FORM_HREF} className="btn bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
                Schedule a Free Consultation
              </Link>
              <Link
                href="/contact-us/"
                className="btn border border-white text-white hover:bg-white hover:text-brand uppercase tracking-wide"
              >
                Talk to an Azure Data Expert
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fold 10 — Azure scale */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Azure reporting dashboards</span>
            <h2 className="text-3xl lg:text-4xl">Built for Azure. Ready to Scale.</h2>
            <p className="mt-4 text-body">
              Your initial dashboard requirement may be simple: visibility into sales, finance, marketing, or operational
              data. But as your business grows, reporting often needs to handle more users, sources, history, governance,
              refresh frequency, and analytical complexity.
            </p>
            <p className="mt-3 text-body">
              Folio3 helps you start with the reporting outcomes you need now and build toward a scalable Azure
              analytics foundation.
            </p>
          </Reveal>
          <h3 className="mx-auto mt-12 max-w-4xl text-center text-lg font-semibold text-ink">
            Depending on your environment, this can include:
          </h3>
          <div className="mx-auto mt-6 max-w-5xl">
            <CheckList items={azureItems} />
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-4 text-center text-body">
            <p>
              Microsoft describes Power BI as an enterprise and self-service analytics service that can connect to
              hundreds of sources, support interactive reports, share insights across an organization, and embed
              analytics into websites or applications. Azure data services can extend that reporting layer with
              large-scale storage, integration, and processing capabilities.
            </p>
            <p>
              Work with Folio3’s{' '}
              <Link href="/azure-cloud-service/" className="text-brand underline">
                Azure cloud consulting services
              </Link>{' '}
              to design the secure, scalable foundation behind your reporting and analytics environment.
            </p>
          </div>
        </div>
      </section>

      {/* Fold 11 — Why Folio3 */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Why Folio3</span>
            <h2 className="text-3xl lg:text-4xl">Why Choose Folio3</h2>
            <p className="mt-4 text-body">
              Folio3 brings together Azure expertise, data engineering capability, Power BI reporting experience, and
              business-focused solution delivery.
            </p>
          </Reveal>
          <div className="mx-auto mt-10 max-w-5xl">
            <CheckList items={whyBullets} />
          </div>
          <div className="mt-10 text-center">
            <Link href={FORM_HREF} className="btn-primary uppercase tracking-wide">
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Fold 12 — FAQs */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Frequently Asked Questions</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-surface-line rounded-2xl border border-surface-line bg-white shadow-card">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-base font-semibold text-ink">{f.q}</span>
                  <span aria-hidden className="text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-body">{f.node ?? f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 13 — Lead form */}
      <OneToOneCTA />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
