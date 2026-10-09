import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BrainCircuit, ChartLine, Target, UserPen } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { CashFlowThumb, ScenarioThumb } from './ForecastVisuals';
import { ScenarioPlanner } from './ScenarioPlanner';
import { DeploySteps } from './DeploySteps';
import { DashboardCarousel } from './DashboardCarousel';

const CANONICAL = 'https://azure.folio3.com/solution/pre-built-reporting-dashboards/financial-forecasting/';
const TITLE = 'Financial Forecasting Dashboard | Power BI & Fabric | Folio3';
const META_DESCRIPTION =
  'Pre-built financial forecasting dashboard on Microsoft Fabric & Power BI. Rolling revenue, cash and expense forecasts with Azure ML and Copilot. Book a demo.';
const OG_TITLE = 'Financial Forecasting Dashboard on Microsoft Fabric | Folio3';
const OG_IMAGE = '/wp-content/uploads/2026/09/bc-finance-overview-dashboard.webp';
const PRODUCT = 'Folio3 IntelliFabric Financial Forecasting Dashboard';
const IMG = '/wp-content/uploads/2026/09';
const FORM_HREF = '#pgForm';

const CTA_DEMO = 'Book a Free Forecasting Demo';
const CTA_ASSESS = 'Get a Fabric Readiness Assessment';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: OG_TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1600, height: 900, alt: OG_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const trust = [
  { k: 'Microsoft', v: 'Solutions Partner' },
  { k: 'ISO 27001', v: 'certified' },
  { k: '27', v: 'Microsoft BI certifications' },
  { k: '1,000+', v: 'companies served' },
];

const problems = [
  { t: 'Forecasts go stale on day one.', d: 'Actuals are exported, pasted and reconciled by hand, so the forecast reflects last month.' },
  { t: 'Every question waits on an analyst.', d: 'Leaders cannot drill from a variance to the account or entity behind it.' },
  { t: 'Data sits in silos.', d: 'ERP, CRM, payroll and budget files never meet in one model.' },
  { t: 'No one trusts the number.', d: 'Versions multiply, formulas break and the board pack is rebuilt every quarter.' },
];

type View = { title: string; desc: string; chips: string[]; image?: { src: string; h: number; alt: string }; thumb?: 'cash' | 'scenario' };

const views: View[] = [
  {
    title: 'Revenue forecast',
    desc: 'Rolling 12-month forecast with actuals overlay, by entity, product line and region.',
    chips: ['Rolling 12-month', 'Actuals overlay', 'By entity & region'],
    image: { src: `${IMG}/bc-sales-overview-dashboard.webp`, h: 900, alt: 'Revenue forecasting dashboard view showing sales vs budget over time by department, customer and country' },
  },
  {
    title: 'Expense and OpEx forecast',
    desc: 'Projected COGS, OpEx and CapEx by category and department.',
    chips: ['COGS', 'OpEx', 'CapEx'],
    image: { src: `${IMG}/financial-reporting-dashboard-power-bi.webp`, h: 913, alt: 'Power BI income statement view with EBITDA, operating profit and expense categories by account' },
  },
  {
    title: 'Cash flow and runway',
    desc: 'Cash balance, inflows and outflows, burn rate, months of runway and working capital.',
    chips: ['Cash runway', 'Burn rate', 'Working capital'],
    thumb: 'cash',
  },
  {
    title: 'Budget vs actual vs forecast',
    desc: 'Variance by account, department and period, with drill-through to transactions.',
    chips: ['Variance analysis', 'Drill-through', 'By GL account'],
    image: { src: `${IMG}/bc-expenses-dashboard.webp`, h: 900, alt: 'Budget vs actual dashboard showing expenses vs budget and budget variance by GL account over time' },
  },
  {
    title: 'Scenario planning',
    desc: 'Best, base and worst-case views with adjustable drivers.',
    chips: ['Best / base / worst', 'Driver-based', 'What-if'],
    thumb: 'scenario',
  },
  {
    title: 'KPIs and ratios',
    desc: 'Gross margin, EBITDA, operating margin and current ratio, trend and forecast.',
    chips: ['Gross margin', 'EBITDA forecast', 'Operating margin'],
    image: { src: `${IMG}/bc-finance-overview-dashboard.webp`, h: 900, alt: 'Finance KPI dashboard showing gross profit margin, net profit margin, EBIT, balance sheet and income statement' },
  },
  {
    title: 'Executive summary',
    desc: 'A one-page scorecard with growth rates, key variances and forecast accuracy.',
    chips: ['One-page scorecard', 'Growth rates', 'Forecast accuracy'],
    image: { src: `${IMG}/bc-executive-summary-dashboard.webp`, h: 828, alt: 'Executive summary dashboard with sales, profit, costs and year-over-year change' },
  },
];

const method = [
  { Icon: ChartLine, t: 'Built-in Power BI forecasting', d: "for quick trend views. Power BI's native forecast uses exponential smoothing on time-series data." },
  { Icon: BrainCircuit, t: 'Azure Machine Learning models', d: 'for revenue, expense and cash forecasts. Models account for seasonality and add drivers such as pipeline, headcount or pricing. The most accurate model for your data is selected and deployed.' },
  { Icon: Target, t: 'Accuracy tracking.', d: 'Each forecast is scored against actuals every period (for example with MAPE), so finance can see how reliable each line is.' },
  { Icon: UserPen, t: 'Human override.', d: 'Analysts can adjust any forecast line; the dashboard keeps both the model and the adjusted value.' },
];

const sources = [
  { t: 'ERP', d: 'Dynamics 365 Business Central and Dynamics 365 Finance & Operations', icon: 'erp' },
  { t: 'CRM', d: 'Dynamics 365 Sales, for pipeline-driven revenue forecasts', icon: 'crm' },
  { t: 'Payroll and HR', d: 'Headcount and salary data for workforce cost forecasts', icon: 'hr' },
  { t: 'Budgets', d: 'Excel and SharePoint budget files, loaded into the same model', icon: 'budget' },
] as const;

const architecture = [
  { n: 'Ingest', d: 'Fabric Data Factory pipelines pull ERP, CRM and budget data on a schedule.', tag: 'Data Factory' },
  { n: 'Store', d: 'Data is cleaned into a OneLake lakehouse using a bronze, silver and gold (medallion) structure.', tag: 'OneLake' },
  { n: 'Forecast', d: 'Azure Machine Learning models score the gold data and write forecasts back to OneLake.', tag: 'Azure ML' },
  { n: 'Model', d: 'A Power BI semantic model holds actuals, budgets and forecasts with row-level security.', tag: 'Semantic model' },
  { n: 'Use', d: 'Finance teams work in the Power BI dashboard and ask questions through Copilot.', tag: 'Power BI + Copilot' },
];

const roles = [
  { r: 'CFO', d: 'One trusted forecast for board meetings and investor updates.' },
  { r: 'FP&A manager', d: 'Rolling forecasts without monthly rebuilds, and time for analysis instead of data prep.' },
  { r: 'Controller', d: 'Budget vs actual variance with drill-down to transactions.' },
  { r: 'Business unit leaders', d: 'Their own forecast view, secured to their entity or department.' },
  { r: 'IT and data teams', d: 'A governed Fabric platform instead of scattered Excel models.' },
];

const deploy = ['Discovery', 'Connect data', 'Configure', 'Test and train', 'Go live and support'];

const compareHead = ['Criteria', 'Folio3 pre-built dashboard', 'Excel models', 'FP&A software', 'Custom Power BI build'];
const compareRows = [
  ['Time to first forecast', 'Weeks', 'Rebuilt every month', 'Months of setup', 'Months'],
  ['Forecast method', 'Azure ML + Power BI forecasting', 'Manual formulas', 'Vendor engine', 'Built from scratch'],
  ['Data refresh', 'Scheduled from ERP', 'Manual export and paste', 'Connector-based', 'Depends on build'],
  ['Scenario planning', 'Built in; write-back via Power Apps', 'Copy of the file per scenario', 'Built in', 'Extra development'],
  ['Where data lives', 'Your Microsoft Fabric tenant', 'Local files', 'Vendor cloud', 'Your tenant'],
  ['Extra licences', 'Uses your Microsoft stack', 'None', 'Per-user FP&A licence', 'Uses your Microsoft stack'],
  ['AI and Copilot', 'Included', 'No', 'Varies', 'Extra development'],
];

type Proof = { client: string; stat?: string; statLabel?: string; headline?: string; desc: string; link: { text: string; href: string } };

const proof: Proof[] = [
  {
    client: 'Weaver Popcorn Hybrids',
    headline: 'Pre-built Finance, Sales and Inventory dashboards',
    desc: 'Replaced manual reporting with pre-built Finance, Sales and Inventory dashboards on Dynamics 365 Business Central.',
    link: { text: 'Read the IntelliFabric dashboards case study', href: '/case-studies/popcorn-producer-intellifabric-dashboards/' },
  },
  {
    client: 'Daraz (Alibaba Group)',
    stat: '37%',
    statLabel: 'faster financial closings',
    desc: 'After Folio3 rebuilt its Power BI financial reporting for very large datasets.',
    link: { text: 'See how we optimised Power BI financial reporting', href: '/power-bi-financial-reporting-for-alibaba/' },
  },
  {
    client: 'SLB',
    stat: '99.9%',
    statLabel: 'data accuracy',
    desc: 'Automated data ingestion and Power BI reporting on Azure gave teams direct access to reliable data, with less dependence on DBAs.',
    link: { text: 'Read the SLB automated reporting case study', href: '/azure-automated-data-reporting-for-slb/' },
  },
  {
    client: 'Savills',
    stat: '13%',
    statLabel: 'operational efficiency gain',
    desc: 'Microsoft Fabric reporting gave the global real estate firm a single, real-time view of its operations.',
    link: { text: 'Read the Savills Microsoft Fabric case study', href: '/microsoft-fabric-reporting-for-real-estate/' },
  },
  {
    client: 'Food crop grower',
    headline: 'Real-time yield estimates against history',
    desc: 'A Power BI grower portal centralised contracts and field operations, comparing real-time yield estimates with historical data.',
    link: { text: 'Read the Power BI grower portal case study', href: '/implementing-power-bi-dashboard-for-food-crop-grower/' },
  },
];

const security = [
  'Data stays in your own Microsoft Fabric and Azure tenant.',
  'Row-level security limits each user to their entity, region or department.',
  'Sign-in through Microsoft Entra ID with your existing access policies.',
  'Folio3 is ISO 27001 certified and follows enterprise-grade encryption practices.',
];

const related = [
  { t: 'Pre-built Power BI dashboards for Dynamics 365 Business Central', d: 'Financial management, receivables, payables, cash flow, sales and inventory.', href: '/solution/pre-built-reporting-dashboards/for-business-central/', img: `${IMG}/bc-accounts-receivable-dashboard.webp` },
  { t: 'Pre-built Power BI dashboards for Dynamics 365', d: 'Finance, sales, operations and service reporting across Dynamics 365.', href: '/solution/pre-built-reporting-dashboards/for-dynamics-365/', img: `${IMG}/sales-performance-dashboard-power-bi.webp` },
];
const suites = [
  { t: 'Pre-built manufacturing analytics dashboards', href: '/azure-data-analytics/manufacturing-data-analytics/' },
  { t: 'Supply chain analytics dashboards', href: '/azure-data-analytics/supply-chain-analytics/' },
  { t: 'Retail analytics dashboards', href: '/azure-data-analytics/retail-analytics/' },
];

const faqs = [
  { q: 'What is a financial forecasting dashboard?', a: "A financial forecasting dashboard is a live report that projects revenue, expenses and cash from historical actuals and drivers, and compares them with budget and actuals. Folio3's version is a pre-built Power BI dashboard on Microsoft Fabric that refreshes from your ERP automatically." },
  { q: 'Can Power BI do financial forecasting?', a: 'Yes, Power BI can forecast natively using exponential smoothing on line charts, which suits quick trend views. For revenue, expense and cash forecasts that need seasonality and business drivers, Folio3 adds Azure Machine Learning models and shows their output in Power BI.' },
  { q: 'Does the dashboard work with Dynamics 365 Business Central?', a: 'Yes, Dynamics 365 Business Central is a core supported source, alongside Dynamics 365 Finance & Operations.' },
  { q: 'What data do I need to start forecasting?', a: 'You need historical general ledger actuals, your budget, and your chart of accounts and entity structure. CRM pipeline, headcount and bank balances improve accuracy but are optional.' },
  { q: 'How long does deployment take?', a: 'Most deployments go live in weeks because the data model and dashboards are pre-built. Timing depends on the number of data sources, entities and custom KPIs.' },
  { q: 'How accurate is AI financial forecasting?', a: 'Accuracy depends on data history and stability, so the dashboard scores every forecast against actuals each period and shows that error rate. Finance can then see which lines to trust and where to apply judgement.' },
  { q: 'Can we run what-if scenarios and enter budgets in the dashboard?', a: 'Yes, the dashboard includes best, base and worst-case scenarios with adjustable drivers. For entering budgets or assumptions directly, Folio3 adds Power Apps write-back so planning data stays in the same model.' },
  { q: 'Power BI or FP&A software: which is better for forecasting?', a: 'Power BI on Microsoft Fabric is the better fit if you already use Microsoft 365 or Dynamics 365 and want forecasts in your own tenant without extra per-user FP&A licences. Dedicated FP&A software suits teams that need complex consolidation and approval workflows above all else.' },
  { q: 'Is our financial data secure?', a: 'Yes, data stays in your own Microsoft Fabric and Azure tenant, protected by Microsoft Entra ID sign-in and row-level security. Folio3 is ISO 27001 certified.' },
  { q: 'Can the dashboard be customised?', a: 'Yes, every view is mapped to your chart of accounts, entities and KPIs during setup, and new views or data sources can be added later.' },
  { q: 'Do we need Microsoft Fabric licences?', a: 'The dashboard runs on Microsoft Fabric capacity and Power BI licences in your tenant. Folio3 sizes the capacity during discovery so you only pay for what the workload needs.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: PRODUCT,
      serviceType: 'Pre-built financial forecasting dashboard for Power BI and Microsoft Fabric',
      provider: { '@type': 'Organization', name: 'Folio3', url: 'https://azure.folio3.com/' },
      areaServed: 'Worldwide',
      url: CANONICAL,
      description:
        'Pre-built Power BI dashboard on Microsoft Fabric that forecasts revenue, expenses and cash flow from ERP data using Azure Machine Learning, with scenario planning and Copilot Q&A.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azure.folio3.com/' },
        { '@type': 'ListItem', position: 2, name: 'Solutions' },
        { '@type': 'ListItem', position: 3, name: 'Pre-Built Reporting Dashboards', item: 'https://azure.folio3.com/solution/pre-built-reporting-dashboards/' },
        { '@type': 'ListItem', position: 4, name: 'Financial Forecasting', item: CANONICAL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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

function Heading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl lg:text-4xl">{title}</h2>
      {children}
    </Reveal>
  );
}

function CtaRow() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      <Link href={FORM_HREF} className={primaryBtn}>{CTA_DEMO}</Link>
      <Link href={FORM_HREF} className={outlineBtn}>{CTA_ASSESS}</Link>
    </div>
  );
}

function ViewCard({ v }: { v: View }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-5 shadow-card">
      {v.image ? (
        <Image src={v.image.src} alt={v.image.alt} width={1600} height={v.image.h} loading="lazy" sizes="(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 100vw" className="aspect-[16/9] h-auto w-full rounded-lg border border-surface-line object-cover object-left-top" />
      ) : v.thumb === 'cash' ? (
        <CashFlowThumb />
      ) : (
        <ScenarioThumb />
      )}
      <h3 className="mt-5 text-xl font-semibold text-ink">{v.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-body">{v.desc}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
        {v.chips.map((c) => (
          <li key={c} className="rounded-full bg-surface-tint px-3 py-1 text-xs font-medium text-brand">{c}</li>
        ))}
      </ul>
    </div>
  );
}

function ProofCard({ c }: { c: Proof }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-7 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted">{c.client}</p>
      {c.stat ? (
        <>
          <p className="mt-3 text-5xl font-bold text-brand">{c.stat}</p>
          <p className="mt-1 text-lg font-semibold text-ink">{c.statLabel}</p>
        </>
      ) : (
        <p className="mt-3 text-2xl font-bold text-ink">{c.headline}</p>
      )}
      <p className="mt-3 text-body">{c.desc}</p>
      <Link href={c.link.href} draggable={false} className={`${link} mt-auto pt-5 font-semibold`}>
        {c.link.text}
      </Link>
    </div>
  );
}

function SourceIcon({ name }: { name: (typeof sources)[number]['icon'] }) {
  const p = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (name) {
    case 'erp':
      return <svg {...p}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>;
    case 'crm':
      return <svg {...p}><path d="M3 17l5-5 4 4 8-8" /><path d="M14 8h6v6" /></svg>;
    case 'hr':
      return <svg {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 5.5a3 3 0 0 1 0 5" /><path d="M18 14.5c1.8.8 3 2.6 3 5.5" /></svg>;
    case 'budget':
      return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 9v12M15 9v12" /></svg>;
  }
}

export default function FinancialForecastingPage() {
  return (
    <>
      {/* Fold 1: Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <span className="eyebrow">Pre-Built Reporting Dashboards</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl">
              Pre-Built Financial Forecasting Dashboard for{' '}
              <span className="text-brand">Power BI and Microsoft Fabric</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Forecast revenue, expenses, and cash from live ERP data instead of rebuilding spreadsheets every month.
              Folio3&apos;s pre-built financial forecasting dashboard runs on Microsoft Fabric, uses Azure Machine
              Learning for its forecasts, and goes live in weeks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={FORM_HREF} className={primaryBtn}>{CTA_DEMO}</Link>
              <Link href={FORM_HREF} className={outlineBtn}>{CTA_ASSESS}</Link>
            </div>
            <ul className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {trust.map((t) => (
                <li key={t.k} className="rounded-xl border border-white/70 bg-white/70 px-3 py-2 backdrop-blur">
                  <span className="block text-sm font-bold text-ink">{t.k}</span>
                  <span className="block text-[11px] leading-tight text-body">{t.v}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal animation="zoomIn" className="relative">
            {/* real Folio3 Power BI finance dashboards, layered */}
            <div className="relative px-2 py-10 sm:px-6 sm:py-14">
              <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-0 w-[72%] rotate-[4deg] overflow-hidden rounded-xl border border-white shadow-cardHover">
                <Image src={`${IMG}/bc-expenses-dashboard.webp`} alt="" width={1600} height={900} sizes="(min-width: 1024px) 34vw, 72vw" className="h-auto w-full" />
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute -left-10 bottom-0 w-[62%] -rotate-[5deg] overflow-hidden rounded-xl border border-white shadow-cardHover">
                <Image src={`${IMG}/bc-sales-overview-dashboard.webp`} alt="" width={1600} height={900} sizes="(min-width: 1024px) 30vw, 62vw" className="h-auto w-full" />
              </div>
              <figure className="relative overflow-hidden rounded-2xl border border-surface-line bg-white shadow-cardHover">
                <div className="flex items-center gap-2 border-b border-surface-line bg-brand-ink px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="ml-2 text-xs font-semibold text-white/80">Power BI · Finance Overview</span>
                </div>
                <Image
                  src={`${IMG}/bc-finance-overview-dashboard.webp`}
                  alt="Folio3 Power BI finance dashboard showing gross profit, net profit margin, EBIT, balance sheet and income statement"
                  width={1600}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="h-auto w-full"
                />
              </figure>
              <div className="absolute -bottom-1 right-2 hidden rounded-xl border border-surface-line bg-white px-4 py-3 shadow-cardHover sm:block">
                <p className="text-[11px] text-muted">Built on</p>
                <p className="text-sm font-bold text-ink">Microsoft Fabric + Power BI</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-3 text-sm text-white/90">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="px-2">»</span>
            <span>Solutions</span>
            <span className="px-2">»</span>
            <Link href="/solution/pre-built-reporting-dashboards/" className="hover:underline">Pre-Built Reporting Dashboards</Link>
            <span className="px-2">»</span>
            <span>Financial Forecasting</span>
          </nav>
        </div>
      </div>

      {/* Fold 2: At a glance */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-4xl rounded-2xl border-l-4 border-brand bg-surface-tint p-7 lg:p-10">
            <span className="eyebrow">At a glance</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">What Is a Financial Forecasting Dashboard?</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink">
              A financial forecasting dashboard is a live report that projects revenue, expenses and cash flow from
              historical actuals and business drivers, and compares those projections with budget and actual results.
            </p>
            <p className="mt-4 text-body">
              Folio3&apos;s version, the {PRODUCT}, is a pre-built Power BI dashboard on Microsoft Fabric that connects
              to your ERP, refreshes on a schedule and uses Azure Machine Learning to produce rolling forecasts.
            </p>
            <p className="mt-4 text-body">
              It ships as part of{' '}
              <Link href="/solution/intellifabric/" className={link}>
                IntelliFabric, Folio3&apos;s pre-built analytics solution on Microsoft Fabric
              </Link>
              , so the data model, pipelines and security are already built before your data goes in.
            </p>
            <p className="mt-4 text-body">
              Where the ERP dashboards for Dynamics 365 and Business Central show what has happened, Financial
              Forecasting adds what comes next: it sits on the same data and projects it forward.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Fold 3: The problem */}
      <section className="bg-brand-ink py-16 text-white lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow text-brand-bright">The problem</span>
            <h2 className="mt-3 text-3xl text-white lg:text-4xl">Why Finance Teams Outgrow Spreadsheet Forecasts</h2>
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p, i) => (
              <li key={p.t}><Reveal animation="fadeInUp" delay={i * 70} className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="text-sm font-bold text-brand-bright">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{p.d}</p>
              </Reveal></li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-3xl text-center text-white/80">
            Folio3 has already replaced this kind of manual work, for example by{' '}
            <Link href="/automated-data-reporting/" className="text-white underline">
              automating Power BI data pipelines for a food verification company
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Fold 4: What's inside */}
      <section id="dashboards" className="scroll-mt-24 bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Heading eyebrow="Dashboard views" title="What's Inside the Financial Forecasting Dashboard">
            <p className="mt-4 text-body">
              Seven views, from the rolling revenue forecast to the executive summary, on one Power BI semantic model.
            </p>
          </Heading>
          <div className="mt-12">
            <DashboardCarousel label="Pre-built dashboards" slides={views.map((v) => <ViewCard key={v.title} v={v} />)} />
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Every view is customised to your chart of accounts, entities and KPIs during setup. The visual layer follows
            the same standards as our{' '}
            <Link href="/azure-data-analytics/data-visualization-as-a-service/" className={link}>data visualization as a service</Link> work.
          </p>
          <CtaRow />
        </div>
      </section>

      {/* Fold 5: How the forecasting works */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">Forecasting method</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">AI Financial Forecasting with Azure Machine Learning and Power BI</h2>
            <p className="mt-4 text-body">
              The dashboard uses two forecasting layers, so you get speed for simple trends and accuracy for the
              numbers that matter.
            </p>
            <p className="mt-4 text-body">
              How does AI improve financial forecasting accuracy? Azure ML models learn seasonality and the drivers
              behind each line, and every forecast is scored against actuals, so accuracy is measured rather than assumed.
              Models are built and maintained by our{' '}
              <Link href="/data-science-ai/" className={link}>machine learning and predictive analytics team</Link>.
            </p>
          </Reveal>
          <ul className="space-y-4">
            {method.map((m, i) => (
              <li key={m.t}><Reveal animation="fadeInUp" delay={i * 70} className="group h-full flex gap-5 rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  <m.Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                </span>
                <p className="text-body"><strong className="text-ink">{m.t}</strong> {m.d}</p>
              </Reveal></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fold 6: Scenario and what-if planning */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Heading eyebrow="What-if analysis" title="Scenario Planning and What-If Analysis">
            <p className="mt-4 text-body">Can you do what-if and scenario planning in Power BI? Yes. Try it below.</p>
          </Heading>
          <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[1fr_2.2fr]">
            <ul className="space-y-4 self-center">
              <Check>Switch between best, base and worst-case scenarios in one click.</Check>
              <Check>Move drivers such as growth rate, price, churn or hiring plan and watch revenue, margin and cash recalculate.</Check>
              <Check>Compare scenarios side by side for board meetings.</Check>
              <Check>
                Need planners to enter assumptions or budgets directly? We add input forms and write-back with Power
                Apps through our{' '}
                <Link href="/microsoft-power-platform-services/" className={link}>Microsoft Power Platform services</Link>, so
                planning and reporting stay in one Microsoft model.
              </Check>
            </ul>
            <Reveal animation="fadeInUp">
              <ScenarioPlanner />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Fold 7: Data sources */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Heading eyebrow="Data sources" title="Connects to Your ERP, CRM and Budget Files" />
          <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sources.map((s, i) => (
              <li key={s.t}><Reveal animation="fadeInUp" delay={i * 70} className="h-full group rounded-2xl border border-surface-line bg-white p-6 text-center shadow-card transition-shadow hover:shadow-cardHover">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <SourceIcon name={s.icon} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{s.d}</p>
              </Reveal></li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Connections are built and monitored as part of our{' '}
            <Link href="/data-integration-as-a-service/" className={link}>data integration as a service</Link> offering, so new
            sources can be added later without rebuilding the dashboard.
          </p>
        </div>
      </section>

      {/* Fold 8: Architecture */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">Architecture</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Financial Forecasting on Microsoft Fabric: How It Fits Together</h2>
            <p className="mt-4 text-body">
              Your finance data lands in one governed lakehouse, models forecast it, and Power BI shows the result.
            </p>
            <p className="mt-4 text-body">
              The platform is set up through our{' '}
              Microsoft Fabric implementation services, with the
              lakehouse delivered under our{' '}
              data warehousing as a service model. Already on
              Azure Synapse or a legacy warehouse? Our{' '}
              <Link href="/microsoft-fabric-services/microsoft-fabric-migration/" className={link}>Microsoft Fabric migration</Link>{' '}
              team moves it first.
            </p>
          </Reveal>
          <ol className="relative space-y-3" aria-label="Data flow from ingest to use">
            {architecture.map((a, i) => {
              const last = i === architecture.length - 1;
              return (
                <li key={a.n}><Reveal animation="fadeInUp" delay={i * 80} className="h-full relative">
                  <div className={`flex items-center gap-4 rounded-2xl border p-5 ${last ? 'border-brand bg-brand text-white shadow-cardHover' : 'border-surface-line bg-white shadow-card'}`}>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${last ? 'bg-white text-brand' : 'bg-brand/10 text-brand'}`}>{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`text-lg font-semibold ${last ? 'text-white' : 'text-ink'}`}>{a.n}</h3>
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${last ? 'bg-white/15 text-white' : 'bg-surface-tint text-brand'}`}>{a.tag}</span>
                      </div>
                      <p className={`mt-1 text-sm leading-relaxed ${last ? 'text-white/85' : 'text-body'}`}>{a.d}</p>
                    </div>
                  </div>
                  {!last && <span aria-hidden className="absolute -bottom-3 left-[2.45rem] z-10 text-brand">▼</span>}
                </Reveal></li>
              );
            })}
            <li className="pt-1 text-center text-xs italic text-muted">Only the last layer is what finance users see.</li>
          </ol>
        </div>
      </section>

      {/* Fold 9: Copilot */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal animation="fadeInUp" className="order-2 lg:order-1">
            <div className="rounded-2xl bg-brand-ink p-6 shadow-cardHover">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Copilot in Power BI</p>
              {[
                { q: 'Why is Q3 cash below forecast?', a: 'Q3 cash is $1.2M below forecast. Receivables collected 9 days slower in EMEA, partly offset by OpEx running 4.6% under plan.' },
                { q: 'Which regions drive the revenue gap?', a: 'North America accounts for 68% of the gap, driven by two delayed enterprise renewals in the pipeline.' },
              ].map((c) => (
                <div key={c.q} className="mt-5 space-y-3">
                  <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-sm text-white">{c.q}</p>
                  <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2.5 text-sm leading-relaxed text-white/90">{c.a}</p>
                </div>
              ))}
              <p className="mt-5 text-right"><span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">Illustrative</span></p>
            </div>
          </Reveal>
          <Reveal animation="fadeInUp" className="order-1 lg:order-2">
            <span className="eyebrow">Copilot for finance</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Ask Your Forecast Questions with Copilot</h2>
            <p className="mt-4 text-body">
              Copilot in Power BI lets finance leaders ask, &ldquo;Why is Q3 cash below forecast?&rdquo; or &ldquo;Which regions
              drive the revenue gap?&rdquo; and get a written answer with the supporting visual.
            </p>
            <ul className="mt-6 space-y-3">
              <Check>Plain-English summaries of forecast changes for board packs</Check>
              <Check>Variance explanations without waiting for an analyst</Check>
              <Check>Narrative commentary generated from the latest refresh</Check>
            </ul>
            <p className="mt-6 text-body">
              We set up Copilot through our{' '}
              <Link href="/data-science-ai/microsoft-copilot-consulting/" className={link}>Microsoft Copilot consulting</Link>{' '}
              practice. For wider finance use cases such as risk and compliance, see the{' '}
              <Link href="/ai-scenario-library/finance/" className={link}>Folio3 Finance Copilot scenarios</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Fold 10: Who it's for */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Heading eyebrow="Who it's for" title="Built for CFOs, FP&A and Controllers" />
          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {roles.map((r, i) => (
              <li key={r.r}><Reveal animation="fadeInUp" delay={i * 60} className="h-full rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                <h3 className="text-lg font-semibold text-brand">{r.r}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{r.d}</p>
              </Reveal></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fold 11: How deployment works */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Heading eyebrow="Deployment" title="From Kickoff to Live Forecasts in Weeks" />
          <div className="mx-auto max-w-6xl">
            <DeploySteps steps={deploy} />
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-body">
            Folio3 already deploys 10+ pre-built Business Central dashboards within a week; forecasting adds the time
            needed to train models on your history. After go-live, refreshes are monitored and enhanced through{' '}
            <Link href="/azure-managed-services/" className={link}>Azure managed services</Link>.
          </p>
          <CtaRow />
        </div>
      </section>

      {/* Fold 12: Comparison */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Heading eyebrow="Compare options" title="Pre-Built Dashboard vs Excel, FP&A Software and Custom Builds">
            <p className="mt-4 text-body">
              How a pre-built Power BI forecast compares with spreadsheets, financial forecasting software and a
              build-your-own approach.
            </p>
          </Heading>
          <div className="mx-auto mt-10 max-w-6xl overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="bg-brand-navy text-white">
                  {compareHead.map((h, i) => (
                    <th key={h} scope="col" className={`px-4 py-4 font-semibold ${i === 1 ? 'bg-brand' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-line">
                {compareRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, j) =>
                      j === 0 ? (
                        <th key={j} scope="row" className="px-4 py-4 font-semibold text-ink">{cell}</th>
                      ) : (
                        <td key={j} className={`px-4 py-4 ${j === 1 ? 'bg-brand/5 font-semibold text-brand' : 'text-body'}`}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fold 13: Proof */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Heading eyebrow="Proof" title="Results from Folio3 Finance Analytics Projects" />
          <div className="mt-12">
            <DashboardCarousel label="Case studies" itemName="case study" slides={proof.map((c) => <ProofCard key={c.client} c={c} />)} />
          </div>
        </div>
      </section>

      {/* Fold 14: Security */}
      <section className="bg-brand-ink py-16 text-white lg:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal animation="fadeInUp">
            <span className="eyebrow text-brand-bright">Security and governance</span>
            <h2 className="mt-3 text-3xl text-white lg:text-4xl">Secure by Design for Financial Data</h2>
            <p className="mt-4 text-white/75">Is financial data secure in Microsoft Fabric? Yes, and it never leaves your tenant.</p>
          </Reveal>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {security.map((s) => (
              <li key={s} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-white/85">
                <span aria-hidden className="text-brand-bright">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fold 15: Related dashboards */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Heading eyebrow="Related dashboards" title="More Pre-Built Reporting Dashboards from Folio3">
            <p className="mt-4 text-body">
              Financial Forecasting sits alongside Folio3&apos;s other pre-built reporting dashboards in the Solutions menu.
            </p>
          </Heading>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.href} href={r.href} className="group flex flex-col rounded-2xl border border-surface-line bg-white p-5 shadow-card transition-shadow hover:shadow-cardHover">
                <Image src={r.img} alt="" width={1600} height={900} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[16/9] h-auto w-full rounded-lg border border-surface-line object-cover object-left-top" />
                <span className="mt-5 text-lg font-semibold text-ink group-hover:text-brand">{r.t}</span>
                <span className="mt-1 text-sm text-body">{r.d}</span>
              </Link>
            ))}
          </div>
          <p className="mt-12 text-center text-body">The same IntelliFabric foundation also powers our industry analytics suites:</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-3">
            {suites.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="inline-block rounded-full border border-surface-line bg-surface-tint px-5 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white">
                  {s.t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fold 18: Final CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">See Your Numbers in a Live Forecast</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Book a free demo. We will walk through the dashboard with sample data and show how your ERP data would
              map into it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <Link href={FORM_HREF} className="btn bg-white uppercase tracking-wide text-brand hover:bg-surface-chip">{CTA_DEMO}</Link>
              <Link href="/contact-us/" className="font-semibold text-white underline">Talk to a Folio3 Azure expert</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fold 17: FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Heading eyebrow="FAQ" title="Financial Forecasting Dashboard FAQs" />
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

      <OneToOneCTA
        formTitle="Book a Free Financial Forecasting Dashboard Demo"
        formCopy="Tell us about your ERP, entities and forecasting process, and we will show how the dashboard maps to your data."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
