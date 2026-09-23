import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

const CANONICAL =
  'https://azure.folio3.com/solution/pre-built-reporting-dashboards/for-business-central';
const TITLE = 'Pre-Built Dashboards for Dynamics 365 Business Central | Folio3';
const DESCRIPTION =
  'Get faster, clearer insights from Dynamics 365 Business Central with pre-built Power BI dashboards for finance, sales, purchasing, inventory, and executive reporting.';
const OG_TITLE = 'Pre-Built Reporting Dashboards for Dynamics 365 Business Central';
const OG_DESCRIPTION =
  'Transform Business Central data into decision-ready Power BI dashboards for finance, sales, purchasing, inventory, and leadership teams.';
const OG_IMAGE = '/wp-content/uploads/2026/09/bc-distribution-dashboard.webp';
const FORM_HREF = '#pgForm';
const CATALOG_HREF = '#dashboards';
const IMG = '/wp-content/uploads/2026/09';
const ILLUSTRATIVE_LABEL = 'Illustrative dashboard—configured around your Business Central environment.';

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
  lead: string;
  body?: string;
  insights: string[];
  image?: { src: string; alt: string; h: number };
};

const dashboards: Dashboard[] = [
  {
    title: 'Executive Overview Dashboard',
    image: { src: `${IMG}/bc-executive-summary-dashboard.webp`, h: 828, alt: 'Business Central executive dashboard in Power BI showing sales, profit, costs, customers, and stock trends' },
    lead: 'Give leadership a high-level view of business health without waiting for multiple reports from multiple teams.',
    body: 'Monitor revenue, gross profit, margin trends, cash position, overdue receivables, overdue payables, inventory value, budget variance, sales trends, and top-performing customers or products from one executive view.',
    insights: [
      'Revenue, gross profit, and profitability trends',
      'Actual versus budget and prior-period comparison',
      'Cash and working-capital indicators',
      'Overdue receivables and payables',
      'Inventory value and inventory movement',
      'Top customers, products, regions, and business units',
      'Sales performance and margin visibility',
    ],
  },
  {
    title: 'Finance Dashboard',
    image: { src: `${IMG}/bc-financial-dashboard.webp`, h: 903, alt: 'Business Central financial dashboard showing net operating income, property income breakdown, and debt load' },
    lead: 'Turn Business Central financial data into a more visual, timely, and actionable reporting experience.',
    body: 'Track profit and loss, balance-sheet indicators, cash flow, budget versus actual, trial balance trends, profitability by dimension, aging, and period-over-period performance. Finance teams can investigate variances faster and give leadership a more accessible view of business performance.',
    insights: [
      'Profit and loss analysis',
      'Budget versus actual performance',
      'Actual versus prior month, quarter, or year',
      'Revenue, expense, and margin trends',
      'Cash flow and liquidity indicators',
      'Trial balance and account-level analysis',
      'Profitability by department, location, project, or other Business Central dimensions',
      'Accounts receivable and accounts payable aging',
    ],
  },
  {
    title: 'Sales and Customer Dashboard',
    image: { src: `${IMG}/bc-sales-dashboard.webp`, h: 795, alt: 'Business Central sales dashboard showing top products, stores, sales agents, and sales by date and category' },
    lead: 'Help sales and commercial teams understand which customers, products, salespeople, and regions drive revenue and margin.',
    body: 'Move beyond static sales reports with a dashboard that makes it easier to identify high-value customers, sales trends, margin movement, top and underperforming products, and period-based performance.',
    insights: [
      'Sales by customer, salesperson, product, category, and region',
      'Sales trend by day, week, month, quarter, or year',
      'Gross margin and profitability analysis',
      'Top customers and customer concentration',
      'Top-selling and underperforming items',
      'Sales order, invoice, and fulfillment trends',
      'Customer profitability and purchase behavior',
      'Sales target or budget comparison where data is available',
    ],
  },
  {
    title: 'Inventory Dashboard',
    image: { src: `${IMG}/bc-inventory-valuation-dashboard.webp`, h: 900, alt: 'Business Central inventory dashboard showing inventory valuation over time by item and posting group' },
    lead: 'Turn inventory data into visibility that supports better purchasing, sales, operations, and working-capital decisions.',
    body: 'Monitor stock on hand, inventory value, product movement, slow-moving items, stock exposure, item-level performance, and inventory trends. Use the dashboard to spot where cash is tied up, where demand is changing, and where teams may need to review replenishment or purchasing decisions.',
    insights: [
      'Inventory quantity on hand',
      'Inventory value and valuation trends',
      'Inventory by location, category, item, or warehouse',
      'Fast-moving and slow-moving items',
      'Stock movement and turnover indicators',
      'High-value inventory items',
      'Item sales and profitability trends',
      'Inventory aging and excess-stock visibility where data is available',
    ],
  },
  {
    title: 'Accounts Receivable Dashboard',
    lead: 'Make collections and cash-flow risk easier to monitor.',
    body: 'Give finance teams a clear view of outstanding invoices, overdue balances, customer aging, collection priorities, and concentration risk. Drill into customers, invoice status, due dates, and aging buckets to focus follow-up efforts where they matter most.',
    insights: [
      'Outstanding receivables',
      'Aging by customer and period',
      'Overdue invoice value',
      'Top overdue customers',
      'Collection trends',
      'Customer payment behavior',
      'Days sales outstanding indicators',
      'Receivables by business unit, location, or company where applicable',
    ],
  },
  {
    title: 'Accounts Payable Dashboard',
    lead: 'Improve visibility into supplier commitments, upcoming payments, payable aging, and vendor exposure.',
    body: 'Instead of reviewing disconnected payment and vendor reports, finance teams can see what is due, what is overdue, which vendors represent the largest payable balances, and how payables change over time.',
    insights: [
      'Total accounts payable',
      'Outstanding and overdue payables',
      'Payables aging by vendor',
      'Upcoming payment obligations',
      'Top vendors by balance or spend',
      'Payable trends by period',
      'Open purchase invoice visibility',
      'Payables by company, department, or other relevant dimension',
    ],
  },
  {
    title: 'Purchasing Dashboard',
    lead: 'Bring more control and visibility to spend, suppliers, purchase orders, and procurement performance.',
    body: 'A Business Central purchasing dashboard gives procurement and finance teams a clearer picture of open commitments, vendor spend, purchasing patterns, and supplier activity.',
    insights: [
      'Open purchase orders',
      'Purchase spend by vendor, item, category, and period',
      'Purchase trends over time',
      'Top suppliers by spend',
      'Outstanding purchase commitments',
      'Vendor performance indicators',
      'Open order value and delivery status',
      'Purchasing by location, department, or company',
    ],
  },
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
    a: 'The standard focus areas include executive reporting, finance, sales, accounts receivable, accounts payable, purchasing, inventory, and operational reporting. Additional dashboard areas can be planned based on your Business Central configuration, available data, and reporting priorities.',
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

function CtaRow({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      <Link href={FORM_HREF} className={primaryBtn}>
        {primary}
      </Link>
      {secondary && (
        <Link href={FORM_HREF} className={outlineBtn}>
          {secondary}
        </Link>
      )}
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
              <Link href={FORM_HREF} className={primaryBtn}>
                Book a Business Central Dashboard Demo
              </Link>
              <Link href={CATALOG_HREF} className={outlineBtn}>
                View Dashboard Catalog
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
              <figcaption className="border-t border-surface-line px-4 py-3 text-[11px] italic text-body">
                {ILLUSTRATIVE_LABEL}
              </figcaption>
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
              Folio3&apos;s pre-built reporting dashboards for Business Central help you move from scattered data
              to a more connected reporting experience.
            </p>
            <p className="mt-3 text-body">
              With interactive Power BI dashboards, your teams can explore performance, identify trends, monitor
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
          <CtaRow primary="Talk to a Power BI Reporting Expert" secondary="See Dashboard Use Cases" />
        </div>
      </section>

      {/* Dashboard catalog */}
      <section id="dashboards" className="scroll-mt-24 bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Dashboard Catalog</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">One Dashboard Solution for Every Business Central Team</h2>
            <p className="mt-4 text-body">
              Your reporting needs are not limited to one department. Folio3 delivers a practical dashboard
              foundation for the functions that depend on Business Central data every day.
            </p>
            <p className="mt-3 text-body">
              Our{' '}
              <Link href="/power-bi-services/" className="text-brand underline">
                Power BI dashboard development
              </Link>{' '}
              team configures each Dynamics 365 Business Central dashboard around your KPIs, dimensions, and users.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {dashboards.map((d, i) => (
              <Reveal key={d.title} animation="fadeInUp" delay={(i % 2) * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                  {d.image && (
                    <Image
                      src={d.image.src}
                      alt={d.image.alt}
                      width={1600}
                      height={d.image.h}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="mb-5 h-auto w-full rounded-lg border border-surface-line"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-ink">{d.title}</h3>
                  <p className="mt-3 font-medium leading-relaxed text-ink">{d.lead}</p>
                  {d.body && <p className="mt-2 text-sm leading-relaxed text-body">{d.body}</p>}
                  <div className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand">
                    Key insights can include
                  </div>
                  <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-body sm:grid-cols-2">
                    {d.insights.map((a) => (
                      <li key={a} className="flex gap-2">
                        <span aria-hidden className="mt-1 shrink-0 text-brand">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  {d.title === 'Finance Dashboard' && (
                    <p className="mt-5 rounded-lg bg-surface-tint p-4 text-sm text-body">
                      Business Central financial dashboards draw on Folio3&apos;s{' '}
                      <Link
                        href="/azure-data-analytics/data-visualization-as-a-service/"
                        className="text-brand underline"
                      >
                        Azure data analysis and visualization
                      </Link>{' '}
                      expertise.
                    </p>
                  )}
                  {d.image && (
                    <p className="mt-auto pt-5 text-[11px] italic text-body">{ILLUSTRATIVE_LABEL}</p>
                  )}
                </div>
              </Reveal>
            ))}
            <Reveal animation="fadeInUp" delay={70}>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-brand/50 bg-white p-7 shadow-card">
                <Image
                  src={`${IMG}/bc-project-monitoring-dashboard.webp`}
                  alt="Business Central project monitoring dashboard showing actual vs planned budget, cost breakdown, SPI, and CPI"
                  width={1600}
                  height={903}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="mb-5 h-auto w-full rounded-lg border border-surface-line"
                />
                <h3 className="text-xl font-semibold text-ink">Project and Operational Dashboard</h3>
                <p className="mt-3 font-medium leading-relaxed text-ink">
                  Where your Business Central implementation includes projects, jobs, services, manufacturing, or
                  other operational data, Folio3 can extend reporting beyond core finance.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Gain better visibility into project profitability, cost versus budget, operational KPIs, resource
                  utilization, work in progress, production, capacity, or other role-specific metrics based on your
                  Business Central configuration and business needs.
                </p>
                <p className="mt-auto pt-5 text-[11px] italic text-body">{ILLUSTRATIVE_LABEL}</p>
              </div>
            </Reveal>
          </div>
          <CtaRow primary="Explore Your Business Central Reporting Requirements" secondary="Request Dashboard Catalog" />
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
              Folio3 starts with a dashboard foundation designed for Dynamics 365 Business Central and then works
              with your team to align the reporting experience with your KPIs, reporting structure, and operational
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
          <CtaRow primary="Discuss Dashboard Customization" />
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
          <CtaRow primary="Schedule a Free Consultation" secondary="Ask About Your Business Central Setup" />
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
                Talk to an Azure Data Analytics Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Folio3 Instead of Building from Scratch? */}
      <section className="bg-surface-tint py-16 lg:py-24">
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
          <CtaRow primary="Request a Business Central Dashboard Demo" secondary="Compare Reporting Options" />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
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
      <section className="bg-brand-ink py-14">
        <div className="container-x text-center">
          <h2 className="mx-auto max-w-3xl text-2xl font-bold leading-tight text-white lg:text-3xl">
            Ready to turn Business Central data into clear, decision-ready dashboards?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            <Link href="/contact-us/" className="underline hover:text-white">
              Schedule a free consultation
            </Link>{' '}
            with Folio3.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={FORM_HREF} className="btn bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
              Book a Business Central Dashboard Demo
            </Link>
            <Link
              href={FORM_HREF}
              className="btn border border-white text-white hover:bg-white hover:text-brand uppercase tracking-wide"
            >
              Talk to an Azure Data Analytics Expert
            </Link>
          </div>
        </div>
      </section>

      <OneToOneCTA />

      {/* Sticky desktop CTA */}
      <Link
        href={FORM_HREF}
        className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 rounded-l-md bg-brand-navy px-3 py-4 text-xs font-semibold uppercase tracking-wide text-white shadow-card [writing-mode:vertical-rl] hover:bg-brand lg:block"
      >
        Book a Demo
      </Link>

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
