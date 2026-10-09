import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  CircleCheckBig,
  DatabaseZap,
  GraduationCap,
  LayoutDashboard,
  SearchCheck,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { DashboardTabs, type DashboardFunction } from '../dashboard-tabs';
import { HeroDashboard } from './HeroDashboard';
import { ResultsScroller, type ResultCase } from './ResultsScroller';

const CANONICAL = 'https://azure.folio3.com/solution/pre-built-reporting-dashboards/retail-data-analytics/';
const TITLE = 'Retail Data Analytics: Pre-Built Power BI Dashboards | Folio3';
const META_DESCRIPTION =
  'Pre-built Power BI retail dashboards from Folio3. Unify POS, ERP and e-commerce data and track sales, inventory and store KPIs. Live in weeks.';
const OG_TITLE = 'Pre-Built Retail Data Analytics Dashboards in Power BI';
const OG_DESCRIPTION =
  'Sales, inventory, store and customer dashboards that connect to your POS, ERP and e-commerce data. Built by Folio3, a Microsoft Solutions Partner.';
const OG_IMAGE = '/wp-content/uploads/2026/09/ecommerce-retail-sales-dashboard-power-bi.webp';
const LAST_UPDATED_ISO = '2026-10-09';
const FORM_HREF = '#pgForm';
const FABRIC_ASSESSMENT_HREF = '/microsoft-fabric-services/analytics-modernization-assessment/';
const IMG = '/wp-content/uploads/2026/09';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1600, height: 817, alt: OG_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const problems = [
  'POS, ERP, e-commerce and loyalty data use different product and store codes.',
  "Weekly sales packs are rebuilt in Excel, so leaders see last week's numbers.",
  'Inventory and margin are reported separately, so slow movers and stockouts surface too late.',
  'Stores, regions and channels calculate KPIs differently, so no one trusts a single number.',
  'Custom BI projects take months and depend on a few analysts.',
];

/** The 8 retail dashboards. Real Folio3 Power BI screenshots where one matches; a coded preview otherwise. */
const dashboards: DashboardFunction[] = [
  {
    id: 'executive',
    tab: 'Executive Overview',
    title: 'Executive Retail Overview',
    body: 'How is the business doing today vs plan and last year? One page for leadership with net sales, margin and growth across every store and channel.',
    listLabel: 'Key KPIs',
    items: ['Net sales', 'Gross margin %', 'Like-for-like growth', 'Average transaction value (ATV)'],
    img: `${IMG}/executive-summary-dashboard-power-bi.webp`,
    imgHeight: 850,
    preview: { accent: '#1742E7', kpis: [], bars: [] },
  },
  {
    id: 'sales',
    tab: 'Sales Performance',
    title: 'Sales Performance',
    body: 'Which products, categories, stores and channels drive revenue? A retail sales dashboard in Power BI that drills from total sales down to the SKU.',
    listLabel: 'Key KPIs',
    items: ['Sales by SKU, category and store', 'Units per transaction', 'Discount rate', 'Sales vs budget'],
    img: `${IMG}/sales-performance-dashboard-power-bi.webp`,
    preview: { accent: '#1742E7', kpis: [], bars: [] },
  },
  {
    id: 'inventory',
    tab: 'Inventory & Stock',
    title: 'Inventory & Stock Health',
    body: 'What is overstocked, understocked or aging? An inventory analytics dashboard that flags slow movers and stockout risk before they hit margin.',
    listLabel: 'Key KPIs',
    items: ['Inventory turnover', 'Sell-through', 'Stockout rate', 'Weeks of cover'],
    img: `${IMG}/bc-inventory-valuation-dashboard.webp`,
    imgHeight: 900,
    preview: { accent: '#1742E7', kpis: [], bars: [] },
  },
  {
    id: 'store',
    tab: 'Store Performance',
    title: 'Store Performance',
    body: 'Which stores need attention, and why? A store performance dashboard that compares locations and regions on the same KPI formulas.',
    listLabel: 'Key KPIs',
    items: ['Sales per sq ft', 'Conversion rate', 'Footfall', 'Staff productivity'],
    img: `${IMG}/marketing-campaign-growth-dashboard-power-bi.webp`,
    imgHeight: 850,
    preview: { accent: '#1742E7', kpis: [], bars: [] },
  },
  {
    id: 'customer',
    tab: 'Customer & Loyalty',
    title: 'Customer & Loyalty',
    body: 'Who are the best customers, and are they coming back? Segment shoppers and track loyalty across stores and online.',
    listLabel: 'Key KPIs',
    items: ['Repeat rate', 'Customer lifetime value (CLV)', 'RFM segments', 'Basket size'],
    preview: {
      accent: '#1742E7',
      kpis: [
        { label: 'Repeat rate', value: '38.2%' },
        { label: 'Avg CLV', value: '$1,240' },
        { label: 'Champions (RFM)', value: '12.6%' },
        { label: 'Basket size', value: '3.4 items' },
      ],
      bars: [30, 44, 52, 47, 61, 58, 72, 69, 80, 86],
    },
  },
  {
    id: 'omnichannel',
    tab: 'Omnichannel & E-Commerce',
    title: 'Omnichannel & E-Commerce',
    body: 'How do online and in-store channels compare? Omnichannel retail analytics that puts Shopify, marketplace and store orders in one view.',
    listLabel: 'Key KPIs',
    items: ['Channel mix', 'Online conversion', 'Average order value (AOV)', 'Returns by channel'],
    img: `${IMG}/distribution-dashboard-power-bi.webp`,
    preview: { accent: '#1742E7', kpis: [], bars: [] },
  },
  {
    id: 'margin',
    tab: 'Margin & Promotions',
    title: 'Margin & Promotions',
    body: 'Which promotions and markdowns pay off? Measure uplift against the margin each campaign gives away.',
    listLabel: 'Key KPIs',
    items: ['Promo uplift', 'Markdown %', 'GMROI', 'Return rate'],
    preview: {
      accent: '#143CD5',
      kpis: [
        { label: 'Promo uplift', value: '+18.4%' },
        { label: 'Markdown %', value: '7.9%' },
        { label: 'GMROI', value: '3.12' },
        { label: 'Return rate', value: '4.6%' },
      ],
      bars: [42, 55, 48, 70, 62, 81, 66, 74, 90, 77],
    },
  },
  {
    id: 'supply',
    tab: 'Supply & Replenishment',
    title: 'Supply & Replenishment',
    body: 'Are suppliers keeping shelves full? Track supplier delivery and replenishment so stock arrives before demand does.',
    listLabel: 'Key KPIs',
    items: ['Fill rate', 'Supplier lead time', 'On-time delivery'],
    img: `${IMG}/bc-purchasing-supplier-delivery-dashboard.webp`,
    imgHeight: 900,
    preview: { accent: '#1742E7', kpis: [], bars: [] },
  },
];

const connectors = [
  { k: 'ERP', v: 'Dynamics 365 Business Central, Dynamics 365 Finance & Operations, LS Central, NetSuite' },
  { k: 'POS', v: 'Dynamics 365 Commerce, LS Central POS, Lightspeed, Square, Shopify POS' },
  { k: 'E-commerce and marketplaces', v: 'Shopify, Adobe Commerce (Magento), Amazon Seller Central' },
  { k: 'CRM and loyalty', v: 'Dynamics 365 Customer Insights, Salesforce' },
  { k: 'Other', v: 'Excel and CSV, SQL Server, Google Analytics, footfall counters' },
];

const architecture = [
  { t: 'Ingest', d: 'Azure Data Factory pipelines pull POS, ERP and e-commerce data on a schedule or in near real time.' },
  { t: 'Store', d: 'Data lands in Azure SQL Database or, for larger retailers, a Microsoft Fabric OneLake lakehouse in a medallion layout (bronze, silver, gold).' },
  { t: 'Model', d: 'A retail semantic model standardizes products, stores, calendars and KPI formulas.' },
  { t: 'Visualize', d: 'Power BI dashboards with row-level security for head office, regions and stores.' },
  { t: 'Act', d: 'Copilot in Power BI answers plain-language questions and alerts flag exceptions.' },
];

const comparisonHeaders = ['Criteria', 'Folio3 Pre-Built Retail Dashboards', 'Custom Power BI build', 'Downloadable .pbit templates'];
const comparisonRows = [
  ['Time to first dashboards', '2–3 weeks to first dashboards; 4–6 weeks for the full pack', 'Typically months', 'Days, on sample data'],
  ['Data model', 'Pre-built retail model in Power BI, Fabric-ready', 'Built from scratch', 'Flat, single source'],
  ['POS + ERP + e-commerce in one view', 'Yes, unified in one model', 'Yes, at added cost', 'Usually one connector'],
  ['Governance and security', 'Row-level security, IT-governed', 'Depends on the build', 'Minimal'],
  ['Customization', 'Mapped to your KPIs', 'Unlimited', 'Manual, by your team'],
  ['Ongoing support', 'Managed by Folio3', 'Varies', 'None'],
];

const results: ResultCase[] = [
  {
    stat: '37%',
    client: 'Alibaba',
    body: "Folio3's Power BI reporting delivered 37% faster financial closings for a marketplace serving 100,000+ brands and 30 million shoppers.",
    href: '/power-bi-financial-reporting-for-alibaba/',
    cta: 'Read the Alibaba case study',
  },
  {
    stat: '3 dashboards',
    client: 'Weaver Popcorn Hybrids',
    body: 'Pre-built Finance, Sales and Inventory dashboards on IntelliFabric replaced manual reporting on Dynamics 365 Business Central data, with Budget vs Actual tracked in real time.',
    href: '/case-studies/popcorn-producer-intellifabric-dashboards/',
    cta: 'See the IntelliFabric dashboards case study',
  },
  {
    stat: '13%',
    client: 'Savills',
    body: 'Microsoft Fabric reporting boosted operational efficiency by 13%, giving the real estate leader unified, real-time intelligence.',
    href: '/microsoft-fabric-reporting-for-real-estate/',
    cta: 'Read the Savills case study',
  },
  {
    stat: '99.9%',
    client: 'SLB',
    body: 'Azure automated data reporting ingests, stores and visualizes oil and gas data in Power BI dashboards with 99.9% data accuracy.',
    href: '/azure-automated-data-reporting-for-slb/',
    cta: 'Read the SLB case study',
  },
  {
    stat: '12%',
    client: 'Food Crop Grower',
    body: 'A Power BI data portal for farm operations, contract management and grower engagement improved yield potential by 12%.',
    href: '/implementing-power-bi-dashboard-for-food-crop-grower/',
    cta: 'Read the food crop grower case study',
  },
  {
    stat: '20%',
    client: 'Cattle Feeding Company',
    body: 'IntelliFabric, a plug-and-play data ingestion and reporting solution built on Microsoft Fabric, helped maximize animal well-being by 20%.',
    href: '/automated-data-reporting/',
    cta: 'Read the cattle feeding case study',
  },
];

const steps = [
  { n: '01', title: 'Discovery and data audit', Icon: SearchCheck },
  { n: '02', title: 'Connect and ingest', Icon: DatabaseZap },
  { n: '03', title: 'Deploy the pre-built dashboards', Icon: LayoutDashboard },
  { n: '04', title: 'Tailor and secure', Icon: ShieldCheck },
  { n: '05', title: 'Train and hand over', Icon: GraduationCap },
  { n: '06', title: 'Run and improve', Icon: TrendingUp },
];

const whyFolio3 = [
  'Microsoft Solutions Partner in Data & AI, Infrastructure, Digital & App Innovation, and Business Applications.',
  '200+ Microsoft-certified experts, with architects holding 27 Microsoft BI certifications.',
  '15+ years delivering Power BI to enterprises, including Fortune 500 companies.',
  '24/7 support and maintenance.',
];

const faqs = [
  {
    q: 'What is retail data analytics?',
    a: 'Retail data analytics is the practice of combining point-of-sale, inventory, e-commerce and customer data to measure and improve sales, margin and stock performance. It typically covers sales, inventory, store, customer and promotion analysis, delivered through dashboards that update automatically from the source systems.',
  },
  {
    q: 'What KPIs should a retail analytics dashboard track?',
    a: "A retail analytics dashboard should track GMROI, inventory turnover, sell-through rate, average transaction value, units per transaction, conversion rate, sales per square foot, like-for-like sales growth, stockout rate, shrink, return rate and customer lifetime value. Folio3's retail pack calculates each with one formula across all stores and channels.",
  },
  {
    q: 'What are pre-built retail dashboards?',
    a: 'Pre-built retail dashboards are ready-made Power BI reports, data models and pipelines designed for retail KPIs. Instead of building from scratch, the pack is mapped to your POS, ERP and e-commerce data and tailored to your KPIs, which cuts delivery time from months to weeks.',
  },
  {
    q: "How long does it take to deploy Folio3's retail analytics dashboards?",
    a: 'Most retailers see the first dashboards on their own data within 2–3 weeks, and the full pack is live in 4–6 weeks. Timing depends on the number of data sources, data quality and how much customization is needed. A one-week discovery sets the exact plan.',
  },
  {
    q: 'How much does retail data analytics cost?',
    a: 'Cost depends on the number of data sources, stores and users, and on how much the pre-built dashboards are customized. Because the dashboards and data model already exist, it costs less than a custom BI build. Power BI licenses are separate; Folio3 can supply them as a Direct (Tier 1) Microsoft CSP. You get a fixed-price quote after a free discovery call.',
  },
  {
    q: 'Can Power BI connect to POS and e-commerce systems?',
    a: 'Yes. Power BI, through Azure Data Factory pipelines, connects to POS systems such as Dynamics 365 Commerce, LS Central, Lightspeed, Square and Shopify POS, and to e-commerce platforms such as Shopify and Adobe Commerce. Folio3 unifies these sources in one retail data model before they reach the dashboards.',
  },
  {
    q: 'Do I need Microsoft Fabric to use the retail dashboards?',
    a: 'No. The pre-built retail dashboards run on Power BI, with Pro or Premium Per User licenses for report users. Retailers with high data volumes or many sources can run them on Microsoft Fabric through IntelliFabric, and Folio3 sizes that capacity during discovery.',
  },
  {
    q: 'Can the dashboards be customized?',
    a: 'Yes. The pre-built dashboards are a starting point. Folio3 adjusts KPIs, hierarchies, branding and row-level security, and can add custom reports or new data sources as your needs grow.',
  },
  {
    q: 'How is retail data kept secure?',
    a: 'Data stays in your Microsoft tenant. Access is controlled with Microsoft Entra ID and Power BI row-level security, so store managers see only their stores and head office sees everything.',
  },
  {
    q: 'What is the difference between retail analytics and e-commerce analytics?',
    a: "E-commerce analytics measures online behavior such as sessions, conversion and cart abandonment. Retail analytics covers all channels, including stores, inventory, margin and supply. Folio3's retail pack includes an omnichannel dashboard that brings both views together.",
  },
  {
    q: 'Do you support multi-store and multi-country retailers?',
    a: 'Yes. The retail model supports store, region and country hierarchies with multi-currency reporting, so leaders can compare locations side by side.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${CANONICAL}#service`,
      name: 'Retail Data Analytics with Pre-Built Power BI Dashboards',
      serviceType: 'Retail data analytics',
      description:
        'Pre-built Power BI retail dashboards that unify POS, ERP and e-commerce data to track sales, inventory, store and customer KPIs. Live in 4-6 weeks.',
      provider: { '@type': 'Organization', name: 'Folio3', url: 'https://azure.folio3.com/' },
      areaServed: ['US', 'GB', 'AE', 'SA', 'AU'],
      audience: { '@type': 'BusinessAudience', audienceType: 'Retail and e-commerce companies' },
      isRelatedTo: [
        { '@type': 'SoftwareApplication', name: 'Microsoft Power BI' },
        { '@type': 'SoftwareApplication', name: 'Microsoft Fabric' },
      ],
      url: CANONICAL,
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
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://azure.folio3.com/solution/' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Pre-Built Reporting Dashboards',
          item: 'https://azure.folio3.com/solution/pre-built-reporting-dashboards/',
        },
        { '@type': 'ListItem', position: 4, name: 'Retail Data Analytics' },
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
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl xl:text-6xl">
              Retail Data Analytics with <span className="text-brand">Pre-Built Power BI Dashboards</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Connect your POS, ERP and e-commerce data to ready-made Power BI dashboards. Track sales, inventory,
              store and customer KPIs in one place, live in weeks rather than months.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={FORM_HREF} className={primaryBtn}>
                Book a Retail Dashboard Demo
              </Link>
              <Link href={FABRIC_ASSESSMENT_HREF} className={outlineBtn}>
                Get a Free Fabric Readiness Assessment
              </Link>
            </div>
          </div>
          <Reveal animation="zoomIn" className="relative pb-6">
            <HeroDashboard />
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
          <Link href="/solution/pre-built-reporting-dashboards/" className="hover:underline">
            Pre-Built Reporting Dashboards
          </Link>
          <span className="px-2">/</span>
          <span>Retail Data Analytics</span>
        </div>
      </div>

      {/* 2. Problem */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">The Problem</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Why Retail Reporting Breaks Down</h2>
            <p className="mt-4 text-body">
              Most retailers have plenty of data. The problem is that it sits in separate systems and gets stitched
              together by hand.
            </p>
          </Reveal>
          <ul className="space-y-4 rounded-2xl border border-surface-line bg-white p-7 shadow-card">
            {problems.map((p) => (
              <li key={p} className="flex gap-3 text-body">
                <span aria-hidden className="mt-0.5 shrink-0 font-bold text-[#D9480F]">✕</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. What you get — dashboard gallery */}
      <section id="dashboards" className="scroll-mt-24 bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="What You Get" title="Pre-Built Retail Dashboards, Ready to Deploy">
            <p className="mt-4 text-body">
              The retail pack ships with 8 dashboards, a data model and pipelines already built. Folio3 maps it to your
              sources and tailors it to your KPIs. Every Power BI retail dashboard below shares one retail analytics
              model, so a KPI means the same thing in every store, region and channel.
            </p>
          </SectionHead>
          <div className="mt-10">
            <DashboardTabs functions={dashboards} />
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            For deeper supplier, logistics and procurement reporting, pair the pack with Folio3&apos;s{' '}
            <Link href="/azure-data-analytics/supply-chain-analytics/" className={link}>
              supply chain analytics
            </Link>{' '}
            dashboards.
          </p>
        </div>
      </section>

      {/* 4. Connectors */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Connectors" title="Connects to the Retail Systems You Already Run">
            <p className="mt-4 text-body">
              Retail data analytics only works when every source feeds one model. Folio3 brings every source into one
              retail data model through its{' '}
              <Link href="/data-integration-as-a-service/" className={link}>
                data integration as a service
              </Link>{' '}
              pipelines on Azure Data Factory.
            </p>
          </SectionHead>
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Retail systems the pre-built dashboards connect to</caption>
              <tbody className="divide-y divide-surface-line">
                {connectors.map((c) => (
                  <tr key={c.k}>
                    <th scope="row" className="w-1/3 bg-surface-tint px-5 py-4 font-semibold text-ink">
                      {c.k}
                    </th>
                    <td className="px-5 py-4 text-body">{c.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Architecture */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Architecture" title="Built on Power BI, Ready for Microsoft Fabric">
            <p className="mt-4 text-body">
              The pack runs in 5 layers on Azure and Power BI, and moves to Microsoft Fabric for retail when your data
              volumes grow.
            </p>
          </SectionHead>
          <ol className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-5">
            {architecture.map((a, i) => (
              <li key={a.t} className="relative">
                <Reveal animation="fadeInUp" delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl border border-surface-line bg-white p-5 shadow-card">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-ink">{a.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{a.d}</p>
                  </div>
                </Reveal>
                {i < architecture.length - 1 && (
                  <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl text-brand md:block">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Need the platform to reach beyond retail reporting? Folio3&apos;s{' '}
            <Link href="/microsoft-fabric-services/" className={link}>
              Microsoft Fabric services
            </Link>{' '}
            cover design, implementation and governance across the business. Teams that want a SQL warehouse layer can
            add{' '}
            <Link href="/data-warehousing-as-a-service/" className={link}>
              data warehousing as a service
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 6. Pre-built vs custom */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Compare Options" title="Pre-Built vs Custom Retail Dashboards">
            <p className="mt-4 text-body">
              Pre-built dashboards reach your own data in 2–3 weeks, against months for a custom build, and keep the
              governance a template cannot.
            </p>
          </SectionHead>
          <div className="mx-auto mt-10 max-w-6xl overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="bg-brand-navy text-white">
                  {comparisonHeaders.map((h, i) => (
                    <th key={h} scope="col" className={`px-4 py-4 font-semibold ${i === 1 ? 'bg-brand' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-line">
                {comparisonRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, j) =>
                      j === 0 ? (
                        <th key={j} scope="row" className="px-4 py-4 font-semibold text-ink">
                          {cell}
                        </th>
                      ) : (
                        <td key={j} className={`px-4 py-4 ${j === 1 ? 'bg-brand/5 font-medium text-ink' : 'text-body'}`}>
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
            Microsoft also offers Retail data solutions in Fabric, currently a preview workload that needs Microsoft
            Fabric or Power BI Premium. Folio3 can advise whether to use it, IntelliFabric, or both. Need something
            fully bespoke? Our{' '}
            <Link href="/power-bi-services/" className={link}>
              Power BI business intelligence services
            </Link>{' '}
            team builds custom models and reports.
          </p>
        </div>
      </section>

      {/* 7. AI add-ons */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="AI Add-Ons" title="From Dashboards to AI-Driven Retail Decisions">
            <p className="mt-4 text-body">
              Three AI add-ons run on the same retail data model, so forecasts and answers match the dashboards.
            </p>
          </SectionHead>
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal animation="fadeInUp" className="h-full">
              <div className="h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                <h3 className="text-xl font-semibold text-ink">Demand forecasting</h3>
                <p className="mt-3 text-body">
                  Machine learning models predict demand by SKU, store and week, built by Folio3&apos;s{' '}
                  <Link href="/data-science-ai/" className={link}>
                    data science and AI
                  </Link>{' '}
                  team.
                </p>
              </div>
            </Reveal>
            <Reveal animation="fadeInUp" delay={80} className="h-full">
              <div className="h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                <h3 className="text-xl font-semibold text-ink">Autonomous stock actions</h3>
                <p className="mt-3 text-body">
                  The{' '}
                  <Link href="/ai-scenario-library/copilot-in-retail/" className={link}>
                    Copilot in Retail agent
                  </Link>{' '}
                  spots demand spikes, checks stock across locations and recommends reorders.
                </p>
              </div>
            </Reveal>
            <Reveal animation="fadeInUp" delay={160} className="h-full">
              <div className="h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                <h3 className="text-xl font-semibold text-ink">Ask your data</h3>
                <p className="mt-3 text-body">
                  Copilot in Power BI answers questions like &ldquo;Which stores missed margin last week?&rdquo; in plain
                  language.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. How it goes live */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="How It Works" title="How the Retail Analytics Pack Goes Live">
            <p className="mt-4 text-body">
              Six steps take the pack from a one-week discovery to a live, supported retail reporting platform in 4–6
              weeks.
            </p>
          </SectionHead>
          <ol className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            <span
              aria-hidden
              className="absolute left-[8.33%] right-[8.33%] top-10 hidden h-0.5 bg-gradient-to-r from-brand via-brand/60 to-[#2F69F2]/40 lg:block"
            />
            {steps.map((s, i) => (
              <li key={s.n} className="relative">
                <Reveal animation="fadeInUp" delay={i * 80} className="group flex items-center gap-5 lg:flex-col lg:text-center">
                  <span className="relative flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-full bg-[linear-gradient(135deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] text-xl font-bold leading-none text-white shadow-cardHover ring-8 ring-white transition-transform duration-300 group-hover:scale-110">
                    <s.Icon aria-hidden="true" size={16} strokeWidth={2} className="text-white/90" />
                    {s.n}
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-ink">{s.title}</h3>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-12 max-w-3xl text-center text-body">
            Coming from Azure Synapse or on-premises SQL? Step 2 can include a{' '}
            <Link href="/microsoft-fabric-services/microsoft-fabric-migration/" className={link}>
              Microsoft Fabric migration
            </Link>
            . After go-live, Folio3&apos;s{' '}
            <Link href="/azure-managed-services/" className={link}>
              Azure managed services
            </Link>{' '}
            team runs and improves the platform.
          </p>
        </div>
      </section>

      {/* 9. Proof */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">Results from Folio3 Analytics Clients</h2>
            <p className="mt-4 text-white/85">
              More than 100 retail companies worldwide use Folio3&apos;s retail analytics solutions, from single stores
              to large chains.
            </p>
          </Reveal>
          <div className="mx-auto mt-10 max-w-6xl">
            <ResultsScroller cases={results} />
          </div>
        </div>
      </section>

      {/* 10. Why Folio3 */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">Why Folio3</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Why Retailers Choose Folio3 for Data Analytics</h2>
            <p className="mt-4 text-body">
              Retailers choose Folio3 for 15+ years of Power BI delivery and a Microsoft partnership that covers
              licensing, build and support in one contract.
            </p>
            <Link href={FORM_HREF} className={`${primaryBtn} mt-8`}>
              Book a Retail Dashboard Demo
            </Link>
          </Reveal>
          <ul className="space-y-4 rounded-2xl border border-surface-line bg-white p-7 shadow-card">
            {whyFolio3.slice(0, 3).map((w) => (
              <Check key={w}>{w}</Check>
            ))}
            <Check>
              Direct (Tier 1) Microsoft CSP: Fabric and Power BI licenses in the same contract through our{' '}
              <Link href="/microsoft-licensing-process/" className={link}>
                Microsoft licensing process
              </Link>
              .
            </Check>
            <Check>{whyFolio3[3]}</Check>
          </ul>
        </div>
      </section>

      {/* 11. Related solutions */}
      <section className="bg-surface-tint py-16 lg:py-20">
        <div className="container-x">
          <SectionHead eyebrow="Related Solutions" title="More Ways Folio3 Supports Retail" />
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
              <p className="text-body">
                Need live store monitoring and analytics consulting? See{' '}
                <Link href="/azure-data-analytics/retail-analytics/" className={link}>
                  real-time retail performance tracking
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
              <p className="text-body">
                Modernizing beyond analytics, from omnichannel to IoT? Explore{' '}
                <Link href="/azure-for-retail/" className={link}>
                  Azure for retail
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
              <p className="text-body">
                Need dashboards for finance, HR or operations teams too? Try{' '}
                <Link href="/azure-data-analytics/data-visualization-as-a-service/" className={link}>
                  data visualization as a service
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              See Your Retail Data in Power BI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Book a 30-minute demo. We will show the retail pack on sample data and map it to your POS, ERP and
              e-commerce systems.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact-us/" className="btn bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
                Book a Retail Dashboard Demo
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ (answers rendered as visible HTML so crawlers and LLMs can read them) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="FAQs" title="Retail Data Analytics FAQs" />
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

      <OneToOneCTA />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
