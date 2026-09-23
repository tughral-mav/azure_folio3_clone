import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

const CANONICAL =
  'https://azure.folio3.com/solution/pre-built-reporting-dashboards/for-business-central';
const TITLE = 'Pre-Built Power BI Dashboards for Dynamics 365 Business Central | Folio3';
const DESCRIPTION =
  'Get faster, clearer insights from Dynamics 365 Business Central with pre-built Power BI dashboards for finance, sales, purchasing, inventory, and executive reporting. Tailored and implemented by Folio3.';
const OG_TITLE = 'Pre-Built Reporting Dashboards for Dynamics 365 Business Central';
const OG_DESCRIPTION =
  'Transform Business Central data into decision-ready Power BI dashboards for finance, sales, purchasing, inventory, and leadership teams.';
const OG_IMAGE = '/wp-content/uploads/2026/09/bc-distribution-dashboard.webp';
const FORM_HREF = '#pgForm';
const CATALOG_HREF = '#dashboards';
const IMG = '/wp-content/uploads/2026/09';
const DISCLAIMER =
  'Dashboard visuals are illustrative. Folio3 configures reporting views around your Business Central data structure, KPIs, business dimensions, and user requirements.';
const CTA_DEMO = 'Book a Business Central Dashboard Demo';
const CTA_CATALOG = 'View Dashboard Catalog';
const CTA_EXPERT = 'Talk to a Reporting Expert';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1600, height: 900, alt: OG_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const painBullets = [
  'Reduce repetitive spreadsheet exports and manual consolidation.',
  'Create a consistent view of KPIs across finance and operations.',
  'Help decision-makers move from summary metrics to the underlying transactions.',
  'Track performance across companies, dimensions, departments, locations, customers, items, and periods where applicable.',
  'Give teams self-service access to the dashboards that matter to their role.',
  'Establish a more scalable foundation for Business Central reporting as your organization grows.',
];

type Dashboard = {
  title: string;
  description: string;
  chips: string[];
  image: { src: string; alt: string; h: number };
};

const coreDashboards: Dashboard[] = [
  {
    title: 'Executive Overview Dashboard',
    description:
      'Give leadership a unified view of business performance without waiting for reports from multiple teams.',
    chips: ['Revenue & Profit', 'Cash Position', 'Budget Variance', 'Top Customers'],
    image: {
      src: `${IMG}/bc-executive-summary-dashboard.webp`,
      h: 828,
      alt: 'Dynamics 365 Business Central dashboards — executive overview of sales, profit, costs, and customers',
    },
  },
  {
    title: 'Finance Dashboard',
    description:
      'Turn Business Central financial data into clear, interactive views of performance, profitability, cash flow, and variance.',
    chips: ['P&L Performance', 'Budget vs. Actual', 'Cash Flow', 'Margin Trends'],
    image: {
      src: `${IMG}/bc-finance-overview-dashboard.webp`,
      h: 900,
      alt: 'Business Central financial dashboards showing gross profit, net profit, balance sheet, and income statement',
    },
  },
  {
    title: 'Sales and Customer Dashboard',
    description:
      'Understand which customers, products, salespeople, and regions are influencing revenue and margin.',
    chips: ['Sales Trends', 'Customer Profitability', 'Top Products', 'Salesperson Performance'],
    image: {
      src: `${IMG}/bc-sales-overview-dashboard.webp`,
      h: 900,
      alt: 'Business Central sales dashboard showing sales vs budget by customer, country, salesperson, and department',
    },
  },
  {
    title: 'Accounts Receivable Dashboard',
    description:
      'Help finance teams prioritize collections, monitor overdue balances, and identify cash-flow risk earlier.',
    chips: ['Outstanding Receivables', 'Aging Analysis', 'Overdue Invoices', 'Collection Trends'],
    image: {
      src: `${IMG}/bc-accounts-receivable-dashboard.webp`,
      h: 900,
      alt: 'Business Central accounts receivable dashboard showing overdue balance, aging groups, and balance by customer',
    },
  },
  {
    title: 'Inventory Dashboard',
    description:
      'Track stock value, item movement, and inventory exposure to support stronger purchasing and working-capital decisions.',
    chips: ['Stock on Hand', 'Inventory Value', 'Slow-Moving Items', 'Inventory Turnover'],
    image: {
      src: `${IMG}/bc-inventory-valuation-dashboard.webp`,
      h: 900,
      alt: 'Business Central inventory dashboard showing inventory valuation over time by item and posting group',
    },
  },
  {
    title: 'Purchasing Dashboard',
    description:
      'Bring more visibility to purchase commitments, supplier spend, open orders, and procurement performance.',
    chips: ['Open Purchase Orders', 'Vendor Spend', 'Purchase Trends', 'Supplier Performance'],
    image: {
      src: `${IMG}/bc-purchasing-supplier-delivery-dashboard.webp`,
      h: 900,
      alt: 'Business Central purchasing dashboard showing supplier on-time delivery and delay by supplier',
    },
  },
];

const additionalDashboards: Dashboard[] = [
  {
    title: 'Accounts Payable Dashboard',
    description:
      'Improve visibility into supplier commitments, upcoming payments, payable aging, and vendor exposure.',
    chips: ['Payables Aging', 'Upcoming Payments', 'Vendor Balances', 'Open Purchase Invoices'],
    image: {
      src: `${IMG}/bc-expenses-dashboard.webp`,
      h: 900,
      alt: 'Business Central spend dashboard showing operating expenses and expenses vs budget by GL account',
    },
  },
  {
    title: 'Project and Operational Dashboard',
    description:
      'Extend reporting for organizations using Business Central projects, jobs, services, manufacturing, or other operational modules.',
    chips: ['Project Profitability', 'Cost vs. Budget', 'Work in Progress', 'Operational KPIs'],
    image: {
      src: `${IMG}/bc-project-monitoring-dashboard.webp`,
      h: 903,
      alt: 'Business Central project dashboard showing actual vs planned budget, cost breakdown, SPI, and CPI',
    },
  },
];

const included = [
  'Business Central reporting discovery workshop',
  'Pre-built Power BI dashboard foundation',
  'KPI, dimension, and filter configuration',
  'Dashboard design review and refinement',
  'Business Central data connection guidance',
  'Power BI workspace and sharing guidance',
  'User enablement and dashboard adoption support',
  'Optional post-launch dashboard enhancement support',
];

const customization = [
  'Choose the KPI tiles, visuals, and measures that matter to each team.',
  'Filter and analyze data by company, department, location, customer, vendor, item, project, or Business Central dimension.',
  'Configure date periods, comparison views, thresholds, and exception reporting.',
  'Apply organization-specific terminology, branding, and report layouts.',
  'Add new pages, measures, or reports as your reporting requirements evolve.',
  'Extend reporting with additional approved data sources where required.',
];

const steps = [
  {
    n: '01',
    title: 'Discover Your Reporting Priorities',
    body: 'We begin by understanding your Business Central setup, users, reporting gaps, key KPIs, dimensions, required dashboard areas, and decision-making needs.',
  },
  {
    n: '02',
    title: 'Connect and Configure',
    body: 'Our team configures the required data connection and dashboard foundation, then aligns dashboard views, metrics, filters, security requirements, and visualizations with your requirements. Business Central supports Power BI report connections and embedded Power BI experiences, including selecting Power BI workspaces for functional reporting areas.',
  },
  {
    n: '03',
    title: 'Review, Refine, and Go Live',
    body: 'Your stakeholders review the dashboards, validate reporting logic, and provide feedback. Folio3 refines the experience, supports user enablement, and helps prepare teams to use the dashboards effectively.',
  },
  {
    n: '04',
    title: 'Improve as Your Needs Evolve',
    body: 'Reporting requirements change as your business changes. Folio3 can help you enhance KPIs, create additional dashboard views, introduce new data sources, and optimize your Power BI reporting environment over time.',
  },
];

const foundation = [
  'Dynamics 365 Business Central data connectivity',
  'Power BI dashboard and report design',
  'Business Central finance, sales, purchasing, inventory, and operations reporting',
  'Role-based dashboard experiences',
  'Embedded reporting options where appropriate',
  'Scheduled data-refresh configuration based on the selected architecture',
  'Power BI workspace and sharing guidance',
  'KPI and data-model customization',
  'User training and dashboard adoption support',
  'Ongoing dashboard enhancement and managed reporting support',
];

const comparisonHeaders = [
  'Reporting approach',
  'Time to first dashboard',
  'Business Central relevance',
  'Customization',
  'Internal reporting effort',
  'Ongoing support',
];

const comparisonRows = [
  ['Manual Excel reporting', 'Fast for a single report, slow to maintain', 'Depends on the report owner', 'Limited and manual', 'High', 'Internal team dependent'],
  ['Build Power BI from scratch', 'Variable and often longer', 'Must be designed internally', 'High', 'High', 'Internal or external support needed'],
  ['Generic dashboard templates', 'Faster initial setup', 'May require adaptation', 'Varies', 'Moderate', 'Often limited'],
  ['Folio3 pre-built dashboard solution', 'Faster, structured starting point', 'Designed around Business Central reporting needs', 'Tailored to your KPI and operational requirements', 'Reduced', 'Available through Folio3'],
];

const whyFolio3 = [
  'Pre-built Business Central reporting foundation',
  'Power BI dashboard expertise',
  'Faster path from data to usable insight',
  'Tailored KPI and role-based views',
  'Support for finance and operational reporting needs',
  'Azure data and analytics expertise',
  'User enablement and post-launch enhancement options',
  'A consultative approach rather than a template-only handoff',
];

type Faq = { q: string; a: string; link?: { pre: string; text: string; href: string; post: string } };

const faqs: Faq[] = [
  {
    q: 'What are pre-built Power BI dashboards for Business Central?',
    a: "Pre-built Power BI dashboards for Dynamics 365 Business Central are ready-made reporting templates and dashboard structures designed around common Business Central data areas, such as finance, sales, purchasing, inventory, receivables, and payables. Folio3 configures and tailors these dashboards to match your organization's KPIs, dimensions, users, and reporting requirements.",
  },
  {
    q: 'Can Power BI connect to Dynamics 365 Business Central?',
    a: 'Yes. Business Central supports Power BI integration and reporting experiences, including embedding Power BI reports within Business Central and connecting reports to functional areas through Power BI workspaces. The implementation approach depends on your Business Central environment, data requirements, Microsoft licensing, and security needs.',
  },
  {
    q: 'Which Business Central dashboard areas can Folio3 support?',
    a: 'The standard focus areas include executive reporting, Business Central financial dashboards, a Business Central sales dashboard, accounts receivable and accounts payable reporting, a Business Central purchasing dashboard, a Business Central inventory dashboard, and operational reporting. Additional dashboard areas can be planned based on your Business Central configuration, available data, and reporting priorities.',
  },
  {
    q: 'Can the dashboards be customized?',
    a: "Yes. Folio3 can tailor dashboards around your organization's KPIs, companies, departments, locations, dimensions, reporting periods, thresholds, visualizations, and user roles. The precise customization scope is agreed during discovery and solution planning.",
  },
  {
    q: 'Can I see multiple Business Central companies in one dashboard?',
    a: 'Multi-company reporting can be designed where your Business Central setup, data model, permissions, and reporting requirements support it. Folio3 will assess the appropriate approach during discovery.',
  },
  {
    q: 'How often will Business Central dashboard data refresh?',
    a: 'Refresh frequency depends on the selected architecture, data source, Power BI configuration, licensing, and business requirements. Folio3 will recommend a suitable refresh approach during implementation.',
  },
  {
    q: 'Do we need Power BI licenses?',
    a: 'Power BI licensing requirements depend on how reports are developed, published, shared, embedded, and accessed by users. Folio3 can help you review your intended reporting setup and identify the relevant Microsoft licensing considerations.',
    link: {
      pre: 'Learn more about ',
      text: 'Microsoft Cloud Solution Provider licensing',
      href: '/microsoft-licensing-process/',
      post: ' with Folio3.',
    },
  },
  {
    q: 'Can dashboards be embedded in Business Central?',
    a: 'Business Central supports embedded Power BI report experiences. Folio3 can assess whether embedded reporting is appropriate for your users and configure the reporting experience accordingly.',
  },
  {
    q: 'How long does implementation take?',
    a: 'Implementation time depends on the number of dashboards, the complexity of Business Central data, required custom KPIs, data quality, security needs, and stakeholder availability. Folio3 begins with pre-built dashboard foundations to help reduce time-to-value, then confirms a realistic delivery plan after discovery.',
  },
  {
    q: 'Does Folio3 provide support after launch?',
    a: 'Yes. Folio3 can provide ongoing assistance for dashboard refinements, new reporting requirements, user adoption, data-model enhancements, refresh monitoring, and broader Azure data analytics needs.',
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
  name: 'Pre-Built Power BI Dashboards for Dynamics 365 Business Central',
  serviceType: 'Business Central Power BI dashboards',
  provider: {
    '@type': 'Organization',
    name: 'Folio3',
    url: 'https://azure.folio3.com/',
  },
  areaServed: 'Worldwide',
  url: CANONICAL,
  description: DESCRIPTION,
};

const primaryBtn = 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide';
const outlineBtn = 'btn border border-brand text-brand hover:bg-brand hover:text-white uppercase tracking-wide';

function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-body">
      <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

type Cta = { label: string; href: string };
const demo: Cta = { label: CTA_DEMO, href: FORM_HREF };
const catalog: Cta = { label: CTA_CATALOG, href: CATALOG_HREF };
const expert: Cta = { label: CTA_EXPERT, href: FORM_HREF };

function CtaRow({ primary, secondary }: { primary: Cta; secondary?: Cta }) {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      <Link href={primary.href} className={primaryBtn}>
        {primary.label}
      </Link>
      {secondary && (
        <Link href={secondary.href} className={outlineBtn}>
          {secondary.label}
        </Link>
      )}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-auto flex flex-wrap gap-2 pt-5">
      {items.map((c) => (
        <li
          key={c}
          className="rounded-full bg-surface-tint px-3 py-1 text-xs font-medium leading-snug text-brand"
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

function DashboardCard({ d, compact = false }: { d: Dashboard; compact?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-surface-line bg-white shadow-card ${
        compact ? 'p-5' : 'p-6'
      }`}
    >
      <Image
        src={d.image.src}
        alt={d.image.alt}
        width={1600}
        height={d.image.h}
        sizes={compact ? '(min-width: 768px) 40vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw'}
        className="h-auto w-full rounded-lg border border-surface-line"
      />
      <h3 className={`mt-5 font-semibold text-ink ${compact ? 'text-lg' : 'text-xl'}`}>{d.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-body">{d.description}</p>
      <Chips items={d.chips} />
    </div>
  );
}

export default function PreBuiltBusinessCentralDashboardsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <span className="eyebrow">Dynamics 365 Business Central · Power BI</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl xl:text-6xl">
              Pre-Built Power BI Dashboards for{' '}
              <span className="text-brand">Dynamics 365 Business Central</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Turn your Dynamics 365 Business Central data into clear, interactive, and decision-ready Power BI
              dashboards, without building every report from scratch.
            </p>
            <p className="mt-4 max-w-xl text-body">
              Folio3 helps Business Central teams gain faster visibility into financial performance, sales,
              purchasing, inventory, receivables, payables, and operational KPIs. Start with pre-built reporting
              dashboards, tailor them to the way your business works, and give every decision-maker the
              information they need in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={demo.href} className={primaryBtn}>
                {demo.label}
              </Link>
              <Link href={catalog.href} className={outlineBtn}>
                {catalog.label}
              </Link>
            </div>
            <p className="mt-4 text-sm font-medium text-body">
              Built for Business Central. Powered by Power BI. Configured by Folio3 experts.
            </p>
          </div>
          <Reveal animation="zoomIn" className="relative">
            <figure className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
              <Image
                src={`${IMG}/bc-distribution-dashboard.webp`}
                alt="Business Central Power BI dashboards — distribution view with order fulfillment accuracy, order cycle time, and on-time delivery"
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </figure>
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
          <span>For Business Central</span>
        </div>
      </div>

      {/* Make Business Central Reporting Easier to Use */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Business Central Reporting</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Make Business Central Reporting Easier to Use</h2>
            <p className="mt-4 text-body">
              Business Central holds critical financial and operational data, but turning that data into useful
              insight can still take too much time. Teams often export data to spreadsheets, reconcile reports
              manually, wait for month-end reporting, or struggle to find the KPI behind a business problem.
            </p>
            <p className="mt-3 text-body">
              Folio3&apos;s Business Central reporting dashboards help you move from scattered data to a more
              connected reporting experience.
            </p>
            <p className="mt-3 text-body">
              With interactive Business Central Power BI dashboards, your teams can explore performance, identify trends, monitor
              exceptions, and drill into the numbers behind the results—without relying on disconnected Excel files
              or starting every reporting request from zero.
            </p>
            <p className="mt-3 text-body">
              Microsoft supports Power BI reporting and embedded report experiences within Business Central,
              including options to connect reports across functional areas. Folio3 helps turn those capabilities
              into a business-ready reporting solution tailored to your reporting priorities.
            </p>
            <p className="mt-3 text-body">
              Folio3 combines Business Central reporting expertise with its broader{' '}
              <Link href="/azure-data-analytics/" className="text-brand underline">
                Azure Data Analytics
              </Link>{' '}
              capabilities to help organizations turn operational data into usable business insight.
            </p>
          </Reveal>
          <h3 className="mx-auto mt-12 max-w-3xl text-center text-xl font-semibold text-ink">
            Replace manual reporting with clearer business insight
          </h3>
          <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {painBullets.map((b) => (
              <Check key={b}>{b}</Check>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            If your reporting requirements extend beyond standard Business Central data, Folio3 can also support the
            required{' '}
            <Link href="/data-integration-as-a-service/" className="text-brand underline">
              data integration and ETL
            </Link>{' '}
            foundation.
          </p>
          <CtaRow primary={expert} secondary={catalog} />
        </div>
      </section>

      {/* Dashboard catalog */}
      <section id="dashboards" className="scroll-mt-24 bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Business Central Dashboard Catalog</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Reporting Dashboards for Every Business Central Team</h2>
            <p className="mt-4 text-body">
              Start with pre-built Power BI dashboards for the Business Central areas that matter most—finance,
              sales, receivables, purchasing, inventory, and executive reporting. Folio3 configures each dashboard
              around your Business Central data, KPIs, dimensions, and user roles.
            </p>
            <p className="mt-3 text-body">
              Our{' '}
              <Link href="/power-bi-services/" className="text-brand underline">
                Power BI dashboard development
              </Link>{' '}
              team configures each Business Central dashboard around your reporting priorities, dimensions, and users.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coreDashboards.map((d, i) => (
              <Reveal key={d.title} animation="fadeInUp" delay={(i % 3) * 70}>
                <DashboardCard d={d} />
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs italic text-body">{DISCLAIMER}</p>
          <CtaRow primary={{ label: CTA_CATALOG, href: FORM_HREF }} secondary={demo} />

          {/* Additional Reporting Areas */}
          <details className="group mx-auto mt-14 max-w-5xl rounded-2xl border border-surface-line bg-white shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
              <span>
                <span className="block text-xl font-semibold text-ink">Additional Reporting Areas</span>
                <span className="mt-1 block text-sm text-body">
                  Extend your Business Central reporting with additional dashboards based on the modules, data, and
                  operational priorities relevant to your organization.
                </span>
              </span>
              <span aria-hidden className="text-2xl text-brand transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-surface-line px-6 pb-6 pt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {additionalDashboards.map((d) => (
                  <DashboardCard key={d.title} d={d} compact />
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-body">
                Additional dashboard areas are scoped based on your Business Central configuration, available data,
                and reporting requirements.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Start Pre-Built. Tailor What Matters. */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Customization</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Start Pre-Built. Tailor What Matters.</h2>
            <p className="mt-4 text-body">
              Pre-built dashboards should accelerate your reporting journey—not force your organization to use a
              generic view of its business.
            </p>
            <p className="mt-3 text-body">
              Folio3 starts with Dynamics 365 Business Central dashboards designed as a reporting foundation, then
              works with your team to align the reporting experience with your KPIs, reporting structure, and operational
              priorities.
            </p>
          </Reveal>
          <h3 className="mx-auto mt-12 max-w-3xl text-center text-xl font-semibold text-ink">
            Customize dashboards around your business
          </h3>
          <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {customization.map((c) => (
              <Check key={c}>{c}</Check>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            The objective is simple: provide a faster route to useful reporting while preserving the flexibility
            your organization needs. Where reporting connects to automation, apps, or low-code extensions, Folio3&apos;s{' '}
            <Link href="/microsoft-power-platform-services/" className="text-brand underline">
              Microsoft Power Platform services
            </Link>{' '}
            can extend the solution.
          </p>
          <CtaRow primary={expert} />
        </div>
      </section>

      {/* From Business Central Data to Live Dashboards */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">How It Works</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">From Business Central Data to Live Dashboards</h2>
            <p className="mt-4 text-body">
              Folio3 follows a structured approach to help you launch a reporting experience that aligns with your
              Business Central environment and reporting priorities.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
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
            Discovery, architecture, and implementation are backed by Folio3&apos;s{' '}
            <Link href="/azure-cloud-service/" className="text-brand underline">
              Azure consulting services
            </Link>
            .
          </p>
          <CtaRow primary={expert} />
        </div>
      </section>

      {/* See Your Business Central Data in Action */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              See Your Business Central Data in Action
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Give your finance, sales, purchasing, inventory, and leadership teams a clearer way to understand
              performance.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-white/85">
              With Folio3&apos;s pre-built Power BI dashboards for Dynamics 365 Business Central, you can start with a
              practical reporting foundation, tailor it to your business, and help teams make better decisions with
              data they can actually use.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={FORM_HREF} className="btn bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
                Book a Business Central Dashboard Demo
              </Link>
              <Link
                href={FORM_HREF}
                className="btn border border-white text-white hover:bg-white hover:text-brand uppercase tracking-wide"
              >
                Talk to a Reporting Expert
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Built for Business Central and Power BI */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Power BI Integration</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Built for Business Central and Power BI</h2>
            <p className="mt-4 text-body">
              Folio3&apos;s solution is designed to help Business Central organizations use Power BI in a more
              practical, scalable way.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
              <h3 className="text-xl font-semibold text-ink">Your reporting foundation can include</h3>
              <ul className="mt-5 space-y-3">
                {foundation.map((f) => (
                  <Check key={f}>{f}</Check>
                ))}
              </ul>
              <p className="mt-5 text-sm text-body">
                Power BI can be used to create reports and dashboards from Business Central data, publish datasets to
                the Power BI service, and share reporting experiences through workspaces.
              </p>
            </div>
            <div className="rounded-r-2xl border-l-4 border-brand bg-surface-tint p-7">
              <h3 className="text-xl font-semibold text-ink">Security and governance</h3>
              <p className="mt-4 text-body">
                Your reporting solution should provide insight without compromising governance. Folio3 can help
                define the appropriate approach for workspace access, report sharing, user roles, data refreshes,
                and security controls based on your environment and Microsoft licensing.
              </p>
              <p className="mt-3 text-body">
                Where supported and required, dashboards can be designed around role-based access and row-level data
                visibility so users see the reporting data appropriate to their responsibilities.
              </p>
              <p className="mt-3 text-body">
                Our approach can be aligned with your organization&apos;s{' '}
                <Link href="/azure-data-analytics/" className="text-brand underline">
                  governance, security, and compliance
                </Link>{' '}
                requirements for business-critical reporting data.
              </p>
              <Link href={FORM_HREF} className={`${primaryBtn} mt-6`}>
                {CTA_EXPERT}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-surface-tint py-16 lg:py-20">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">What&apos;s Included</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">What You Receive With Your Dashboard Implementation</h2>
            <p className="mt-4 text-body">
              Folio3 combines a pre-built Business Central reporting foundation with the implementation support
              needed to make dashboards relevant, usable, and ready for your teams.
            </p>
            <Link href={expert.href} className={`${primaryBtn} mt-8`}>
              {expert.label}
            </Link>
          </Reveal>
          <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {included.map((item) => (
                <Check key={item}>{item}</Check>
              ))}
            </ul>
            <p className="mt-6 border-t border-surface-line pt-4 text-sm text-body">
              The final scope is aligned with your Business Central environment, selected dashboard areas, data
              availability, security requirements, and reporting priorities.
            </p>
          </div>
        </div>
      </section>

      {/* Why Use Folio3 Instead of Building from Scratch? */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Compare Reporting Options</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Why Use Folio3 Instead of Building from Scratch?</h2>
            <p className="mt-4 text-body">
              Building Business Central reporting internally can be valuable, but it often requires substantial time
              for data analysis, KPI definition, Power BI modeling, dashboard design, testing, publishing,
              governance, training, and maintenance.
            </p>
            <p className="mt-3 text-body">
              Pre-built Power BI dashboards for Business Central from Folio3 provide a faster starting point with
              room to customize.
            </p>
          </Reveal>
          <div className="mx-auto mt-10 max-w-6xl overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="bg-brand-navy text-white">
                  {comparisonHeaders.map((h) => (
                    <th key={h} scope="col" className="px-4 py-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-line">
                {comparisonRows.map((row, i) => {
                  const isFolio3 = i === comparisonRows.length - 1;
                  return (
                    <tr key={row[0]} className={isFolio3 ? 'bg-brand/5' : undefined}>
                      {row.map((cell, j) =>
                        j === 0 ? (
                          <th
                            key={j}
                            scope="row"
                            className={`px-4 py-4 font-semibold ${isFolio3 ? 'text-brand' : 'text-ink'}`}
                          >
                            {cell}
                          </th>
                        ) : (
                          <td key={j} className={`px-4 py-4 ${isFolio3 ? 'font-medium text-ink' : 'text-body'}`}>
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h3 className="mx-auto mt-14 max-w-3xl text-center text-xl font-semibold text-ink">
            Why organizations choose Folio3
          </h3>
          <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {whyFolio3.map((w) => (
              <Check key={w}>{w}</Check>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            After go-live, teams can extend their reporting environment through Folio3&apos;s{' '}
            <Link href="/azure-managed-services/" className="text-brand underline">
              Azure Managed Services
            </Link>{' '}
            support model.
          </p>
          <CtaRow primary={demo} secondary={catalog} />
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-body">Power BI reports for Business Central — what teams ask before getting started.</p>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-surface-line rounded-2xl border border-surface-line bg-white shadow-card">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-base font-semibold text-ink">{f.q}</span>
                  <span aria-hidden className="text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-body">
                  {f.a}
                  {f.link && (
                    <p className="mt-2">
                      {f.link.pre}
                      <Link href={f.link.href} className="text-brand underline">
                        {f.link.text}
                      </Link>
                      {f.link.post}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Ready to turn Business Central data into clear, decision-ready dashboards?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Start with pre-built Power BI dashboards for the Business Central reporting areas that matter most,
              then tailor the experience to your teams, KPIs, and decision-making needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={demo.href} className="btn bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
                {demo.label}
              </Link>
              <Link
                href={expert.href}
                className="btn border border-white text-white hover:bg-white hover:text-brand uppercase tracking-wide"
              >
                {expert.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OneToOneCTA
        formTitle="Schedule a 1:1 Business Central Dashboard Consultation"
        formCopy="Tell us about your Dynamics 365 Business Central reporting needs, and our team will help you identify the right dashboard starting point."
      />

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
