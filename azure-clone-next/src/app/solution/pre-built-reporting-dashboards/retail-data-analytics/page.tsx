import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Code2,
  Factory,
  FileSpreadsheet,
  FolderUp,
  Gift,
  Globe2,
  LayoutDashboard,
  Network,
  Rocket,
  SearchCheck,
  Settings2,
  Shirt,
  ShoppingBasket,
  Store,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { DashboardScroller } from './DashboardScroller';
import { HeroDashboard } from './HeroDashboard';

const CANONICAL = 'https://azure.folio3.com/solution/pre-built-reporting-dashboards/retail-data-analytics/';
const TITLE = 'Retail Data Analytics Dashboards on Azure & Power BI | Folio3';
const META_DESCRIPTION =
  'Pre-built retail data analytics dashboards on Microsoft Fabric and Power BI. Sales, inventory, store and customer KPIs from Dynamics 365, POS and e-commerce in weeks.';
const OG_TITLE = 'Pre-Built Retail Data Analytics Dashboards on Microsoft Fabric';
const OG_IMAGE = '/wp-content/uploads/2026/09/ecommerce-retail-sales-dashboard-power-bi.webp';
const LAST_UPDATED_ISO = '2026-10-20';
const FORM_HREF = '#pgForm';
const FABRIC_ASSESSMENT_HREF = '/microsoft-fabric-services/analytics-modernization-assessment/';
const MS_SAMPLE_HREF = 'https://learn.microsoft.com/en-us/power-bi/create-reports/sample-retail-analysis';
const IMG = '/wp-content/uploads/2026/09';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: OG_TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1600, height: 817, alt: 'Retail Sales Overview dashboard in Power BI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const proofBar = [
  'Microsoft Solution Partner – Data & AI',
  'Direct (Tier 1) Microsoft CSP',
  '200+ certified experts',
  '1,000+ clients worldwide',
];

const symptoms = [
  'Month-end sales and margin reporting assembled by hand from ERP exports and POS extracts.',
  'Store managers working from spreadsheets that lag the business by days.',
  'Inventory, e-commerce and loyalty data living in separate tools with no common product or customer key.',
  'A Power BI estate that grew report by report and now has no governance.',
];

const beforeAfter = [
  {
    t: 'Month-end sales and margin',
    before: '3–5 days of ERP and POS exports stitched in Excel.',
    after: 'Available on day 1 from the refreshed Retail Sales Overview dashboard.',
  },
  {
    t: 'Store manager view',
    before: 'A weekly PDF or spreadsheet, often 2–7 days stale.',
    after: "A same-day Store Performance dashboard, limited to each manager's stores.",
  },
  {
    t: 'Sources joined',
    before: 'Sales and inventory in separate files, customer data rarely joined.',
    after: 'ERP, POS, e-commerce and loyalty data conformed on shared product, store and customer keys.',
  },
  {
    t: 'Refresh',
    before: 'On request, when an analyst has time.',
    after: 'Scheduled daily by default, hourly for POS where needed.',
  },
  {
    t: 'Who builds reports',
    before: 'One or two analysts and a queue for every new ask.',
    after: 'Business users self-serve on governed semantic models; analysts add new measures.',
  },
  {
    t: 'KPI definitions',
    before: 'Different in every spreadsheet and region.',
    after: 'One definition per KPI, stored in the semantic model and documented.',
  },
  {
    t: 'Audit and lineage',
    before: 'None.',
    after: 'Every number traces to its source table through Fabric lineage.',
  },
  {
    t: 'Mobile access',
    before: 'Not available.',
    after: 'Phone layouts for every dashboard.',
  },
];

type Dashboard = { name: string; kpis: string; users: string; sources: string; img?: string; Icon: LucideIcon };

/** The seven dashboards in the retail pack. A real Folio3 Power BI screenshot where one matches; an icon tile otherwise. */
const dashboards: Dashboard[] = [
  {
    name: 'Retail Sales Overview',
    kpis: 'Net sales, gross margin, units, YoY and LY comparisons, sales by store/region/channel/category, hourly and daily sales patterns',
    users: 'CEO, CFO, head of sales',
    sources: 'D365 Business Central/F&O, POS, e-commerce',
    img: `${IMG}/sales-performance-dashboard-power-bi.webp`,
    Icon: LayoutDashboard,
  },
  {
    name: 'Store Performance',
    kpis: 'Sales per store and per square foot, conversion, average transaction value, basket size, top and bottom stores, staff sales',
    users: 'Regional and store managers',
    sources: 'POS, workforce/scheduling',
    Icon: Store,
  },
  {
    name: 'Inventory & Stock Health',
    kpis: 'Stock on hand, stock cover (days), sell-through %, ageing stock, out-of-stock and overstock alerts, inventory turnover by SKU/category',
    users: 'Merchandising, supply chain',
    sources: 'ERP inventory, WMS',
    img: `${IMG}/bc-inventory-valuation-dashboard.webp`,
    Icon: Factory,
  },
  {
    name: 'Product & Category Performance',
    kpis: 'Category contribution, margin mix, price-band analysis, new-product tracking, markdown impact',
    users: 'Merchandising, buying',
    sources: 'ERP, POS',
    Icon: ShoppingBasket,
  },
  {
    name: 'Customer & Basket Analytics',
    kpis: 'Repeat-purchase rate, customer lifetime value, basket composition, market-basket affinities, loyalty segment performance',
    users: 'Marketing, CRM',
    sources: 'POS, e-commerce, loyalty/CRM',
    Icon: Users,
  },
  {
    name: 'E-commerce & Omnichannel',
    kpis: 'Online vs store sales, order funnel, returns rate, fulfilment lead time, click-and-collect share',
    users: 'E-commerce, operations',
    sources: 'Shopify/Magento/other storefronts, OMS',
    img: `${IMG}/distribution-dashboard-power-bi.webp`,
    Icon: Globe2,
  },
  {
    name: 'Finance for Retail',
    kpis: 'P&L by store and channel, cost of goods, operating expense ratios, cash and receivables',
    users: 'CFO, controllers',
    sources: 'D365 Business Central/F&O',
    img: `${IMG}/financial-reporting-dashboard-power-bi.webp`,
    Icon: Building2,
  },
];

const formats: { t: string; emphasis: string; uses: string; extra: string; Icon: LucideIcon }[] = [
  {
    t: 'Fashion and apparel',
    emphasis: 'Sell-through by style, colour and size; markdown timing; season and drop performance.',
    uses: 'Product & Category Performance, Inventory & Stock Health, Retail Sales Overview.',
    extra: 'Size-curve analysis, aged-stock markdown planner.',
    Icon: Shirt,
  },
  {
    t: 'Grocery and convenience',
    emphasis: 'Hourly and daily sales, basket size, waste and shrink, promotion lift.',
    uses: 'Store Performance, Customer & Basket Analytics, Inventory & Stock Health.',
    extra: 'Hourly sales heatmap, promo uplift vs baseline, waste by category.',
    Icon: ShoppingBasket,
  },
  {
    t: 'Specialty and multi-brand',
    emphasis: 'Category and brand contribution, margin mix, supplier performance.',
    uses: 'Product & Category Performance, Finance for Retail.',
    extra: 'Brand scorecard, supplier fill-rate and lead-time view.',
    Icon: Store,
  },
  {
    t: 'Franchise and multi-entity networks',
    emphasis: 'Like-for-like store comparison, royalty and fee reporting, franchisee compliance.',
    uses: 'Store Performance, Finance for Retail.',
    extra: 'Franchisee-restricted dashboards with row-level security per entity.',
    Icon: Network,
  },
  {
    t: 'Omnichannel and DTC brands',
    emphasis: 'Channel mix, online returns, fulfilment lead time, customer lifetime value.',
    uses: 'E-commerce & Omnichannel, Customer & Basket Analytics.',
    extra: 'Order funnel, click-and-collect share, cohort retention.',
    Icon: Globe2,
  },
  {
    t: 'Consumer goods selling through retailers',
    emphasis: 'Sell-in vs sell-out, retailer scorecards, distribution gaps.',
    uses: 'Retail Sales Overview, Inventory & Stock Health.',
    extra: 'Retailer POS data pipelines, out-of-stock by account.',
    Icon: Factory,
  },
];

const architecture = [
  { t: 'Sources', d: 'D365 BC/F&O, POS, e-commerce, loyalty, WMS, Excel' },
  { t: 'Fabric Data Factory', d: 'Pipelines ingest each source on a schedule' },
  { t: 'OneLake lakehouse', d: 'Bronze, Silver and Gold layers; Gold holds the conformed retail model' },
  { t: 'Power BI semantic models', d: 'Direct Lake connectivity, certified KPI definitions' },
  { t: 'Role-based dashboards', d: 'Head office, regions and stores, each with their own view' },
  { t: 'Copilot and alerts', d: 'Stock, pricing and staffing alerts on the same data' },
];

/** Connector tiles: a brand logo where we have one, a lettered mark or a generic icon otherwise. */
type Connector = { name: string; logo?: string; logoClass?: string; mark?: string; Icon?: LucideIcon };
const LOGO = '/logos/connectors';
const D365 = `${LOGO}/dynamics-365.png`;
const connectors: { k: string; v: Connector[] }[] = [
  {
    k: 'ERP',
    v: [
      { name: 'Dynamics 365 Business Central', logo: D365 },
      { name: 'Dynamics 365 Finance & Operations', logo: D365 },
      { name: 'Dynamics 365 Commerce', logo: D365 },
      { name: 'NetSuite', mark: 'N' },
    ],
  },
  {
    k: 'POS and retail management',
    v: [
      { name: 'LS Central', mark: 'LS' },
      { name: 'Dynamics 365 Commerce POS', logo: D365 },
      { name: 'Lightspeed', mark: 'L' },
      { name: 'Square', logo: `${LOGO}/square.svg` },
      { name: 'Custom POS via SQL or API', Icon: Code2 },
    ],
  },
  {
    k: 'E-commerce',
    v: [
      { name: 'Shopify', logo: `${LOGO}/shopify.svg` },
      { name: 'Magento/Adobe Commerce', logo: `${LOGO}/magento.svg` },
      { name: 'BigCommerce', logo: `${LOGO}/bigcommerce.svg` },
      { name: 'WooCommerce', logo: `${LOGO}/woocommerce.svg`, logoClass: 'h-5 w-[92px]' },
    ],
  },
  {
    k: 'Customer and marketing',
    v: [
      { name: 'Dynamics 365 Customer Insights', logo: D365 },
      { name: 'Salesforce', logo: `${LOGO}/salesforce.svg` },
      { name: 'HubSpot', logo: `${LOGO}/hubspot.svg` },
      { name: 'Loyalty platforms', Icon: Gift },
    ],
  },
  {
    k: 'Files and legacy',
    v: [
      { name: 'Excel', logo: `${LOGO}/excel.png` },
      { name: 'CSV', Icon: FileSpreadsheet },
      { name: 'SFTP drops', Icon: FolderUp },
      { name: 'On-premises SQL Server', logo: `${LOGO}/sql-server.png`, logoClass: 'h-10 w-10' },
    ],
  },
];

const partnerBadges = [
  { src: '/wp-content/uploads/2024/08/data-ai-azure-logo-img.webp', alt: 'Microsoft Solutions Partner: Data & AI, Azure' },
  { src: '/wp-content/uploads/2024/08/infrastructure-azure-logo-img.webp', alt: 'Microsoft Solutions Partner: Infrastructure, Azure' },
  { src: '/wp-content/uploads/2024/08/digital-app-innovation-logo-img.webp', alt: 'Microsoft Solutions Partner: Digital & App Innovation, Azure' },
  { src: '/wp-content/uploads/2024/08/business-application-logo-img.webp', alt: 'Microsoft Solutions Partner: Business Applications' },
];

const steps = [
  {
    n: '01',
    t: 'Discovery',
    w: 'Week 1',
    d: '30-minute call, then a half-day workshop to confirm sources, hierarchies and the KPI definitions your finance team already uses.',
    Icon: SearchCheck,
  },
  {
    n: '02',
    t: 'Connect and model',
    w: 'Weeks 2–4',
    d: 'Pipelines built, retail data model populated, data validated against your month-end numbers.',
    Icon: Network,
  },
  {
    n: '03',
    t: 'Configure dashboards',
    w: 'Weeks 4–6',
    d: 'Pre-built reports mapped to your hierarchies, branding applied, row-level security set, user acceptance testing.',
    Icon: Settings2,
  },
];

const comparisonHeaders = ['Criterion', 'Microsoft Retail Analysis sample', 'Custom Power BI build', 'Folio3 pre-built retail pack'];
const comparisonRows: ReactNode[][] = [
  [
    'What it is',
    <>
      Free demo report with fictional store data (
      <a href={MS_SAMPLE_HREF} target="_blank" rel="noopener noreferrer" className="text-brand underline">
        Microsoft Learn
      </a>
      )
    </>,
    'Reports designed and built from scratch on your data',
    'Retail data model, pipelines and seven dashboards deployed on your data',
  ],
  ['Time to first live dashboard', 'Minutes, but on sample data only', '12–20 weeks', '6–8 weeks'],
  [
    'Data model',
    'Single flat table; no connection to real systems',
    'Designed per project; quality depends on the team',
    "Conformed retail model aligned to Microsoft's retail industry data model",
  ],
  ['Source connectivity', 'None', 'Built per source', 'Existing pipelines for Dynamics 365, POS, e-commerce and CRM'],
  ['Governance and security', 'None', 'Added if scoped', 'Row-level security, Purview lineage, certified models included'],
  ['Ongoing support', 'None', 'Internal team or retained consultancy', 'Optional Folio3 managed services'],
  ['Cost band', 'Free', 'Highest; largely design and discovery hours', 'Fixed-price implementation; licences via CSP'],
  [
    'Best for',
    'Learning Power BI',
    'Highly unusual data models or bespoke planning tools',
    'Retailers on the Microsoft stack who want trusted numbers quickly',
  ],
];

/** Folio3 analytics case studies published on this site; each stat is taken from its case study page. */
const results = [
  {
    stat: 'Same-day',
    client: 'Weaver Popcorn Hybrids',
    tag: 'Consumer goods · IntelliFabric',
    body: 'Replaced manual Business Central reporting with pre-built Finance, Sales and Inventory dashboards on an Azure-native architecture; leadership moved from "yesterday\'s picture" to same-day numbers.',
    href: '/case-studies/popcorn-producer-intellifabric-dashboards/',
    cta: 'Read the Weaver Popcorn case study',
  },
  {
    stat: '37%',
    client: 'Alibaba',
    tag: 'Retail marketplace · Power BI',
    body: 'Power BI financial reporting enabling real-time performance tracking and 37% faster financial closings.',
    href: '/power-bi-financial-reporting-for-alibaba/',
    cta: 'Read the Alibaba case study',
  },
  {
    stat: '10M+',
    client: 'Daraz',
    tag: 'Online retail · Power BI on Azure',
    body: "South Asia's leading online marketplace, with 10 million+ products, uses Folio3's Azure expertise to power its Power BI reporting.",
    href: '/daraz/',
    cta: 'Read the Daraz case study',
  },
  {
    stat: '13%',
    client: 'Savills',
    tag: 'Real estate · Microsoft Fabric',
    body: 'Microsoft Fabric reporting gave the real estate leader unified, real-time intelligence and boosted operational efficiency by 13%.',
    href: '/microsoft-fabric-reporting-for-real-estate/',
    cta: 'Read the Savills case study',
  },
  {
    stat: '99.9%',
    client: 'SLB',
    tag: 'Energy · Azure data reporting',
    body: 'Automated Azure data pipelines ingest, store and visualise operational data in Power BI with 99.9% data accuracy.',
    href: '/azure-automated-data-reporting-for-slb/',
    cta: 'Read the SLB case study',
  },
  {
    stat: '12%',
    client: 'Food Crop Grower',
    tag: 'Agriculture · Power BI',
    body: 'Power BI gave real-time visibility of grower operations, improving yield potential by 12%.',
    href: '/implementing-power-bi-dashboard-for-food-crop-grower/',
    cta: 'Read the food crop grower case study',
  },
];

const faqs = [
  {
    q: 'What is retail data analytics?',
    a: 'Retail data analytics is the use of sales, inventory, store, customer and supply-chain data to measure retail performance and guide merchandising, pricing, staffing and stock decisions. It spans descriptive reporting (what sold), diagnostic analysis (why margin moved), and predictive models (what demand will be).',
  },
  {
    q: 'What KPIs should a retail dashboard track?',
    a: "At minimum: net sales, gross margin and margin %, units sold, average transaction value, basket size, conversion rate, sales per square foot, sell-through %, stock cover in days, inventory turnover, out-of-stock rate, returns rate and customer repeat-purchase rate. Folio3's pre-built dashboards include all of these plus category, store and channel breakdowns.",
  },
  {
    q: 'How long does it take to deploy pre-built retail dashboards?',
    a: 'Six to eight weeks for a single ERP, POS and storefront; eight to twelve weeks for multi-entity or multi-ERP estates. The pre-built data model and reports remove the design phase; time goes into source connections and validation.',
  },
  {
    q: 'Do I need Microsoft Fabric, or will Power BI alone work?',
    a: 'Power BI alone works for small estates with one or two sources. Microsoft Fabric adds the lakehouse, pipelines and governance needed once you combine ERP, POS, e-commerce and loyalty data or want AI on top. Folio3 deploys on either and migrates Power BI-only estates to Fabric without rebuilding reports.',
  },
  {
    q: 'Which systems can the dashboards connect to?',
    a: 'Dynamics 365 Business Central, Finance & Operations and Commerce, LS Central, NetSuite, Shopify, Magento, BigCommerce, Salesforce, HubSpot, SQL Server and flat files are covered by existing pipelines. Other systems are connected through Data Factory in the first sprint.',
  },
  {
    q: 'Are the dashboards customisable?',
    a: 'Yes. Hierarchies, KPI definitions, branding and security are configured in every deployment, and new report pages or KPIs are added by our Power BI team. You own the Power BI files and the Fabric workspace.',
  },
  {
    q: 'How much do pre-built retail dashboards cost?',
    a: 'Pricing depends on the number of source systems, entities and users. A fixed-price implementation is quoted after the discovery workshop, with optional managed-services support billed monthly. Fabric capacity and Power BI licences are purchased through Folio3 as a Direct CSP or through your existing Microsoft agreement.',
  },
  {
    q: 'Is this software or a service?',
    a: 'Both. You receive the pre-built dashboards, data model and pipelines as deployable assets in your own Azure tenant, delivered and configured by Folio3 as a project. There is no third-party SaaS layer between your data and your users.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${CANONICAL}#service`,
      name: 'Retail Data Analytics Dashboards',
      serviceType: 'Retail data analytics and pre-built Power BI reporting dashboards on Microsoft Fabric',
      description: META_DESCRIPTION,
      provider: { '@type': 'Organization', name: 'Folio3 Software Inc.', url: 'https://azure.folio3.com/' },
      areaServed: ['US', 'GB', 'AE', 'AU', 'CA'],
      url: CANONICAL,
      isRelatedTo: {
        '@type': 'SoftwareApplication',
        name: 'IntelliFabric',
        url: 'https://azure.folio3.com/solution/intellifabric/',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: TITLE,
      dateModified: LAST_UPDATED_ISO,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azure.folio3.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Pre-Built Reporting Dashboards',
          item: 'https://azure.folio3.com/solution/pre-built-reporting-dashboards/',
        },
        { '@type': 'ListItem', position: 3, name: 'Retail Data Analytics', item: CANONICAL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

const primaryBtn = 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide';
const outlineBtn = 'btn border border-brand text-brand hover:bg-brand hover:text-white uppercase tracking-wide';
const link = 'text-brand underline';
const card = 'h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card';

function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-body">
      <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl lg:text-4xl">{title}</h2>
      {children}
    </Reveal>
  );
}

export default function RetailDataAnalyticsPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24">
          <div>
            <span className="eyebrow">Pre-Built Reporting Dashboards · Retail</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl">
              Retail Data Analytics: <span className="text-brand">Pre-Built Reporting Dashboards on Azure</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Sales, inventory, store and customer performance in one governed view. Folio3&apos;s retail data
              analytics dashboards run on Microsoft Fabric and Power BI, connect to Dynamics 365, POS and e-commerce
              data, and go live in weeks instead of quarters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={FORM_HREF} className={primaryBtn}>
                Book a 30-minute discovery call
              </Link>
              <Link href="#dashboards" className={outlineBtn}>
                See the dashboards
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink">
              {proofBar.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span aria-hidden className="text-brand">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <Reveal animation="zoomIn" className="relative pb-6">
            <HeroDashboard />
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-brand">
        <div className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="px-2">›</span>
          <Link href="/solution/pre-built-reporting-dashboards/" className="hover:underline">
            Pre-Built Reporting Dashboards
          </Link>
          <span className="px-2">›</span>
          <span>Retail Data Analytics</span>
        </div>
      </nav>

      {/* 2. Definition */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Definition" title="What Is Retail Data Analytics?" />
          <Reveal animation="fadeInUp" className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-body">
            <p>
              Retail data analytics is the practice of combining sales, inventory, store, supply-chain and customer
              data into a single model so that merchandising, operations and finance teams can measure performance and
              act on it. On Microsoft Azure it typically means landing data from ERP, POS and e-commerce systems in a
              Fabric lakehouse, modelling it in Power BI, and surfacing it as role-based dashboards.
            </p>
            <p>
              A <strong className="text-ink">retail analytics dashboard</strong> is the delivery layer: a set of Power
              BI reports that track retail KPIs such as net sales, gross margin, sell-through, stock cover, basket size
              and store traffic, refreshed automatically from source systems. Pre-built dashboards ship with the data
              model, KPIs and visuals already defined, so the work shrinks to connecting your sources and adjusting
              labels and hierarchies.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Why pre-built */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">Why Pre-Built</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Why Retailers Choose Pre-Built Dashboards Over Custom BI Projects</h2>
            <p className="mt-4 text-body">
              Most retailers do not lack data. They lack a usable, trusted version of it. Typical symptoms we see
              before an engagement:
            </p>
          </Reveal>
          <ul className="space-y-4 rounded-2xl border border-surface-line bg-white p-7 shadow-card">
            {symptoms.map((p) => (
              <li key={p} className="flex gap-3 text-body">
                <span aria-hidden className="mt-0.5 shrink-0 font-bold text-[#D9480F]">✕</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <Reveal animation="fadeInUp" className="container-x mt-10">
          <p className="mx-auto max-w-4xl text-body">
            Pre-built retail reporting dashboards remove the twelve-to-twenty-week build that a custom BI project needs
            before anyone sees a number. The data model and KPIs are standard retail; what is unique to you is the data
            mapping and the hierarchies, and that is where the implementation time goes. The dashboards are part of{' '}
            <Link href="/solution/intellifabric/" className={link}>
              IntelliFabric
            </Link>
            , Folio3&apos;s industry-ready analytics solution built on Microsoft Fabric, so the same governed
            architecture serves finance, operations and merchandising.
          </p>
        </Reveal>
      </section>

      {/* 4. Before / after */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Before and After" title="Manual Reporting vs Pre-Built Dashboards: What Changes Day to Day" />
          <div className="mx-auto mt-10 max-w-6xl overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">What changes day to day when retailers move from manual reporting to pre-built dashboards</caption>
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th scope="col" className="w-1/5 px-5 py-4 font-semibold">Task</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Before: manual reporting</th>
                  <th scope="col" className="bg-brand px-5 py-4 font-semibold">After: pre-built dashboards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-line">
                {beforeAfter.map((b) => (
                  <tr key={b.t} className="align-top">
                    <th scope="row" className="px-5 py-4 font-semibold text-ink">{b.t}</th>
                    <td className="px-5 py-4 leading-relaxed text-body">
                      <span aria-hidden className="mr-2 font-bold text-[#D9480F]">✕</span>
                      {b.before}
                    </td>
                    <td className="bg-brand/5 px-5 py-4 font-medium leading-relaxed text-ink">
                      <span aria-hidden className="mr-2 font-bold text-brand">✓</span>
                      {b.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Dashboards included (HTML table) */}
      <section id="dashboards" className="scroll-mt-24 bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="What You Get" title="The Power BI Retail Dashboards Included">
            <p className="mt-4 text-body">
              Seven retail reporting dashboards ship in the pack, all on one shared retail data model.
            </p>
          </SectionHead>
          <div className="mx-auto mt-10 max-w-6xl">
            <DashboardScroller label="Retail reporting dashboards included in the Folio3 retail pack">
              {dashboards.map((d, i) => (
                <li
                  key={d.name}
                  className="flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card sm:w-[340px]"
                >
                  <div className="relative border-b border-surface-line bg-surface-tint">
                    {d.img ? (
                      <Image
                        src={d.img}
                        alt={`${d.name} dashboard in Power BI: ${d.kpis}`}
                        width={600}
                        height={340}
                        sizes="340px"
                        className="aspect-[600/340] h-auto w-full object-cover object-top"
                      />
                    ) : (
                      <span className="flex aspect-[600/340] items-center justify-center bg-[linear-gradient(135deg,#eef3f8_0%,#dfeaf5_100%)]">
                        <d.Icon aria-hidden size={44} strokeWidth={1.6} className="text-brand" />
                      </span>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-white">
                      {String(i + 1).padStart(2, '0')} / {String(dashboards.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold text-ink">{d.name}</h3>
                    <dl className="mt-4 space-y-3 text-sm leading-relaxed text-body">
                      <div>
                        <dt className="font-semibold text-ink">KPIs and views</dt>
                        <dd>{d.kpis}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">Primary users</dt>
                        <dd>{d.users}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">Typical sources</dt>
                        <dd>{d.sources}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </DashboardScroller>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Every dashboard includes scheduled refresh, mobile layouts and drill-through to transaction detail;
            security and governance are covered below. Retailers already running Dynamics 365 Business Central can
            start from the{' '}
            <Link href="/solution/pre-built-reporting-dashboards/for-business-central/" className={link}>
              Business Central dashboards
            </Link>{' '}
            suite and add the retail-specific views on top.
          </p>
        </div>
      </section>

      {/* 6. Retail formats */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Retail Formats" title="Built for Every Retail Format">
            <p className="mt-4 text-body">
              The same data model and dashboards are configured differently by format. Hierarchies, KPI emphasis and
              alert thresholds change; the architecture does not.
            </p>
          </SectionHead>
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {formats.map((f, i) => (
              <Reveal key={f.t} animation="fadeInUp" delay={(i % 3) * 80} className="h-full">
                <div className={card}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <f.Icon aria-hidden size={22} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-ink">{f.t}</h3>
                  <dl className="mt-3 space-y-3 text-sm leading-relaxed text-body">
                    <div>
                      <dt className="font-semibold text-ink">Emphasis</dt>
                      <dd>{f.emphasis}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">Dashboards used</dt>
                      <dd>{f.uses}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">Extra views</dt>
                      <dd>{f.extra}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Format-specific configuration is scoped in the discovery workshop and is included in the standard
            engagement.
          </p>
        </div>
      </section>

      {/* 7. Architecture */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Architecture" title="Retail Analytics on Microsoft Fabric and Power BI" />
          <figure className="mx-auto mt-12 max-w-6xl">
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {architecture.map((a, i) => (
                <li key={a.t} className="relative">
                  <Reveal animation="fadeInUp" delay={i * 60} className="h-full">
                    <div className="h-full rounded-2xl border border-surface-line bg-white p-5 shadow-card">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-ink">{a.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-body">{a.d}</p>
                    </div>
                  </Reveal>
                  {i < architecture.length - 1 && (
                    <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl text-brand lg:block">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <figcaption className="mt-5 text-center text-sm text-muted">
              Source systems flow through Fabric pipelines into one governed OneLake lakehouse that feeds every
              dashboard and AI workload.
            </figcaption>
          </figure>
          <div className="mx-auto mt-10 max-w-4xl space-y-5 text-body">
            <p>
              The retail pack runs on a medallion-architecture lakehouse in Microsoft Fabric. Data Factory pipelines
              ingest source systems into OneLake, a Gold layer holds the conformed retail model (product, store,
              customer, transaction, inventory and promotion entities aligned to Microsoft&apos;s retail industry data
              model), and Power BI semantic models sit on top with Direct Lake connectivity. The result is one governed
              copy of the data that serves dashboards, ad-hoc analysis and AI workloads. Our{' '}
              <Link href="/microsoft-fabric-services/" className={link}>
                Microsoft Fabric services
              </Link>{' '}
              team handles the platform build, migration from legacy warehouses and capacity sizing.
            </p>
            <p>
              If you are not yet on Fabric, the same dashboards deploy on Azure Synapse or Azure SQL with Power BI
              Premium, and migrate to Fabric later without rebuilding reports.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Connectors */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Connectors" title="Connects to the Systems Retailers Already Run" />
          <div className="mx-auto mt-10 max-w-6xl divide-y divide-surface-line rounded-2xl border border-surface-line bg-white shadow-card">
            {connectors.map((c) => (
              <div key={c.k} className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[200px_1fr] lg:items-center lg:gap-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand">{c.k}</h3>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {c.v.map((v) => (
                    <li
                      key={v.name}
                      className="flex h-full flex-col items-center gap-2 rounded-xl border border-surface-line px-3 py-4 text-center transition hover:border-brand/40 hover:shadow-card"
                    >
                      <span className="flex h-10 min-w-10 items-center justify-center">
                        {v.logo ? (
                          <Image src={v.logo} alt="" width={92} height={40} className={`object-contain ${v.logoClass ?? 'h-9 w-9'}`} />
                        ) : v.Icon ? (
                          <v.Icon aria-hidden size={28} strokeWidth={1.6} className="text-brand" />
                        ) : (
                          <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy text-sm font-bold text-white">
                            {v.mark}
                          </span>
                        )}
                      </span>
                      <span className="text-xs font-medium leading-snug text-ink">{v.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Connectors not listed are scoped during discovery; most are delivered as a Data Factory pipeline in the
            first sprint.
          </p>
        </div>
      </section>

      {/* 9. Security, governance and licensing */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">Security and Licensing</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Security, Governance and Licensing</h2>
            <p className="mt-4 text-body">
              Your data stays in your Azure tenant. Folio3 deploys the lakehouse, pipelines and Power BI workspaces
              into your subscription, and you hold the admin rights from day one.
            </p>
            <ul className="mt-8 grid max-w-md grid-cols-2 gap-4">
              {partnerBadges.map((b) => (
                <li key={b.src} className="overflow-hidden rounded-xl border border-surface-line bg-white shadow-card">
                  <Image src={b.src} alt={b.alt} width={352} height={238} sizes="14rem" className="h-auto w-full" />
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
            <ul className="space-y-4">
              <Check>
                <strong className="text-ink">Access control:</strong> row-level security by store, region, entity and
                role; object-level security for sensitive measures such as margin and cost of goods; Microsoft Entra ID
                groups drive all permissions.
              </Check>
              <Check>
                <strong className="text-ink">Governance:</strong> Microsoft Purview lineage and sensitivity labels on
                the Fabric lakehouse; certified semantic models so business users build on one approved dataset.
              </Check>
              <Check>
                <strong className="text-ink">Data residency and compliance:</strong> deployed in the Azure region you
                choose; supports retailers&apos; PCI-DSS scoping by keeping cardholder data out of the analytics layer
                and GDPR obligations through pseudonymised customer keys.
              </Check>
              <Check>
                <strong className="text-ink">Operations:</strong> pipeline monitoring, refresh failure alerts and
                capacity usage reports handed to your team or run under Folio3 managed services.
              </Check>
              <Check>
                <strong className="text-ink">Licensing:</strong> Microsoft Fabric capacity (F-SKUs) and Power BI Pro or
                Premium Per User licences are purchased through Folio3 as a{' '}
                <Link href="/" className={link}>
                  Direct (Tier 1) Cloud Solution Provider
                </Link>{' '}
                or through your existing Enterprise Agreement; we size capacity during discovery so you are not
                over-licensed at launch.
              </Check>
            </ul>
          </div>
        </div>
      </section>

      {/* 10. Engagement */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="How It Works" title="What the Engagement Looks Like" />
          <ol className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.n}>
                <Reveal animation="fadeInUp" delay={i * 80} className="h-full">
                  <div className={card}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] text-white">
                        <s.Icon aria-hidden size={20} strokeWidth={2} />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand">{s.w}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-ink">
                      {s.n}. {s.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{s.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
            <li>
              <Reveal animation="fadeInUp" delay={240} className="h-full">
                <div className={card}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] text-white">
                      <Rocket aria-hidden size={20} strokeWidth={2} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">Weeks 6–8</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink">04. Go live and enable</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    Rollout to store and head-office users, training, handover to your BI team or to Folio3{' '}
                    <Link href="/azure-managed-services/" className={link}>
                      Azure managed services
                    </Link>{' '}
                    for ongoing support.
                  </p>
                </div>
              </Reveal>
            </li>
          </ol>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            A single-ERP retailer with one POS and one storefront is typically live in six weeks. Multi-country or
            multi-ERP estates run eight to twelve.
          </p>
        </div>
      </section>

      {/* 11. Customise, extend, AI */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Extend" title="Customise, Extend, and Add AI" />
          <Reveal animation="fadeInUp" className="mx-auto mt-8 max-w-4xl">
            <p className="text-lg leading-relaxed text-body">
              The dashboards are a starting point, not a cage. Our{' '}
              <Link href="/power-bi-services/" className={link}>
                Power BI services
              </Link>{' '}
              team adds company-specific KPIs, new report pages, planning and budgeting views, and embedded analytics
              for suppliers or franchisees. Because the data lives in a governed Fabric lakehouse, you can layer on
              demand forecasting, markdown optimisation or an operational{' '}
              <Link href="/ai-scenario-library/copilot-in-retail/" className={link}>
                Copilot in Retail
              </Link>{' '}
              agent that watches the same data and raises stock, pricing and staffing alerts automatically.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 12. Pre-built vs custom vs sample (HTML table) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Compare Options" title="Pre-Built Pack vs Custom Build vs Microsoft's Free Sample">
            <p className="mt-4 text-body">Retailers usually weigh three options. The table shows where each fits.</p>
          </SectionHead>
          <div className="mx-auto mt-10 max-w-6xl overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full min-w-[860px] text-left text-sm">
              <caption className="sr-only">
                Comparison of Microsoft&apos;s Retail Analysis sample, a custom Power BI build and the Folio3 pre-built
                retail pack
              </caption>
              <thead>
                <tr className="bg-brand-navy text-white">
                  {comparisonHeaders.map((h, i) => (
                    <th key={h} scope="col" className={`px-4 py-4 font-semibold ${i === 3 ? 'bg-brand' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-line">
                {comparisonRows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, j) =>
                      j === 0 ? (
                        <th key={j} scope="row" className="px-4 py-4 font-semibold text-ink">
                          {cell}
                        </th>
                      ) : (
                        <td key={j} className={`px-4 py-4 ${j === 3 ? 'bg-brand/5 font-medium text-ink' : 'text-body'}`}>
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            Many retailers start with the sample to see what Power BI can do, then discover the real work is the data
            model and pipelines, which is exactly what the pre-built pack supplies.
          </p>
        </div>
      </section>

      {/* 13. Why Folio3 */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">Why Folio3</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Why Folio3 for Retail Data Analytics</h2>
            <p className="mt-4 text-body">
              Among retail data analytics companies, Folio3 covers ERP, data platform, BI and AI under one Microsoft
              partnership, so your retail analytics solutions come from a single team.
            </p>
            <Link href={FORM_HREF} className={`${primaryBtn} mt-8`}>
              Book a discovery call
            </Link>
          </Reveal>
          <ul className="space-y-4 rounded-2xl border border-surface-line bg-white p-7 shadow-card">
            <Check>
              <strong className="text-ink">Microsoft Solution Partner</strong> with designations in Data & AI,
              Infrastructure, Digital & App Innovation and Business Applications, and a Direct (Tier 1) Cloud Solution
              Provider.
            </Check>
            <Check>
              <strong className="text-ink">One partner across the stack:</strong> ERP (Dynamics 365), data platform
              (Azure and Fabric), BI (Power BI) and AI (Azure OpenAI, Copilot).
            </Check>
            <Check>
              <strong className="text-ink">Retail and consumer-goods delivery record:</strong> Power BI financial
              reporting for Alibaba, IntelliFabric dashboards for Weaver Popcorn Hybrids, plus Dynamics 365 retail
              implementations across North America, the UK and the Middle East.
            </Check>
            <Check>
              <strong className="text-ink">200+ Microsoft-certified experts</strong> and 24/7 support, so the
              dashboards keep running after the project ends.
            </Check>
            <Check>
              <strong className="text-ink">Industry framing, not generic BI:</strong> the retail pack is one of several
              industry solutions under our{' '}
              <Link href="/azure-for-retail/" className={link}>
                Azure for Retail
              </Link>{' '}
              practice.
            </Check>
          </ul>
        </div>
      </section>

      {/* 14. Results */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Results from Folio3 Analytics Customers</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-6xl">
            <DashboardScroller label="Folio3 analytics case studies" itemNoun="case study">
              {results.map((r) => (
                <li
                  key={r.client}
                  className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl bg-white p-7 shadow-cardHover sm:w-[340px]"
                >
                  <p className="text-4xl font-bold text-brand">{r.stat}</p>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{r.client}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{r.tag}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-body">{r.body}</p>
                  <Link href={r.href} className="mt-5 text-sm font-semibold text-brand hover:underline">
                    {r.cta} →
                  </Link>
                </li>
              ))}
            </DashboardScroller>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-white/90">
            More stories are in our{' '}
            <Link href="/case-studies/" className="font-semibold text-white underline">
              case studies
            </Link>{' '}
            library.
          </p>
        </div>
      </section>

      {/* 15. FAQ (answers stay in the DOM so crawlers and LLMs can read them) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="FAQs" title="Frequently Asked Questions" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-surface-line rounded-2xl border border-surface-line bg-white shadow-card">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
                  <h3 className="text-base font-semibold text-ink">{f.q}</h3>
                  <span aria-hidden className="text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 16. Final CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              See Your Retail Numbers in a Working Dashboard
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Bring a sample sales or inventory extract to a 30-minute discovery call and we will show it in the Retail
              Sales Overview dashboard. If you are planning a move to Microsoft Fabric, ask for the complimentary
              Fabric readiness assessment.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={FORM_HREF} className="btn bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
                Book a discovery call
              </Link>
              <Link
                href={FABRIC_ASSESSMENT_HREF}
                className="btn border border-white text-white hover:bg-white hover:text-brand uppercase tracking-wide"
              >
                Request the Fabric readiness assessment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OneToOneCTA formTitle="Book a 30-Minute Discovery Call" formCopy="Tell us which ERP and POS you run, and we will show your numbers in the retail dashboards." />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
