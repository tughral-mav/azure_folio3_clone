import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  Activity,
  Building2,
  CalendarClock,
  ClipboardCheck,
  FileLock2,
  Fingerprint,
  HeartPulse,
  Layers,
  Lock,
  PlugZap,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Tags,
  Users,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { HeroDashboard } from './HeroDashboard';
import { PlanTimeline } from './PlanTimeline';
import { DashboardGallery } from './DashboardGallery';

const ORIGIN = 'https://azure.folio3.com';
const CANONICAL = `${ORIGIN}/solution/pre-built-reporting-dashboards/healthcare-data-analytics/`;
const TITLE = 'Pre-Built Healthcare Dashboards on Power BI & Fabric | Folio3';
const META_DESCRIPTION =
  'HIPAA-ready healthcare analytics dashboards for hospitals, clinics and payers. Built on Power BI and Microsoft Fabric. Connect your EHR and go live in weeks.';
const OG_TITLE = 'Pre-Built Healthcare Dashboards, Live in Weeks';
const OG_IMAGE = '/wp-content/uploads/2025/07/healthcare-power-bi.webp';
const LAST_UPDATED_ISO = '2026-10-16';
const FORM_HREF = '#pgForm';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: OG_TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 705, height: 630, alt: OG_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/** Fold 5: the dashboard catalog (also feeds the ItemList schema). */
const catalog = [
  {
    name: 'Executive Command Center',
    kpis: 'Net patient revenue, operating margin, patient volume, case mix index, bed occupancy',
    for: 'CEO, CFO, board',
  },
  {
    name: 'Patient Flow and Capacity',
    kpis: 'ED wait time, door-to-provider time, average length of stay, bed turnover, discharges before noon',
    for: 'COO, nursing leadership',
  },
  {
    name: 'Clinical Quality and Safety',
    kpis: '30-day readmission rate, CLABSI/CAUTI rates, mortality index, core measure compliance',
    for: 'CMO, quality teams',
  },
  {
    name: 'Revenue Cycle',
    kpis: 'Days in A/R, clean claim rate, denial rate, net collection rate, payer mix',
    for: 'CFO, RCM teams',
  },
  {
    name: 'Claims and Payment Integrity',
    kpis: 'Claims volume, cost per claim, PMPM, suspected fraud flags',
    for: 'Payers, health plans',
  },
  {
    name: 'Population Health and SDOH',
    kpis: 'Risk stratification, care gaps, chronic disease prevalence, social determinants',
    for: 'Population health, ACOs',
  },
  {
    name: 'Workforce and Productivity',
    kpis: 'Staff-to-patient ratio, overtime hours, turnover, provider RVUs',
    for: 'HR, operations',
  },
  {
    name: 'Patient Experience',
    kpis: 'Satisfaction scores, no-show rate, complaint trends, portal usage',
    for: 'Patient experience leads',
  },
  {
    name: 'Supply Chain and Pharmacy',
    kpis: 'Inventory turnover, stockouts, drug cost per case, vendor spend',
    for: 'Supply chain, pharmacy',
  },
];

const fabricSteps = [
  { t: 'Connect', d: 'Data Factory pipelines pull from your EHR, claims, ERP and HR systems on a schedule or in near real time.' },
  {
    t: 'Standardize',
    d: 'Data moves through bronze, silver and gold layers in a OneLake lakehouse, where it is cleaned, de-duplicated and mapped to the healthcare model.',
  },
  {
    t: 'Model',
    d: 'Pre-built semantic models hold the healthcare measures, such as readmission rate and days in A/R, so every dashboard calculates them the same way.',
  },
  { t: 'Visualize', d: 'Power BI reads the gold layer through Direct Lake, so dashboards refresh fast without copying data.' },
  { t: 'Ask', d: 'Fabric data agents let approved users ask questions of the same governed data in plain English.' },
];

const agentQuestions = [
  'Which units had the highest 30-day readmission rate last quarter?',
  'Show denied claims over $10,000 by payer this month.',
  'How did ED wait times change after we added the evening shift?',
];

const agentAnswer = [
  { unit: 'Cardiology', rate: 15.1 },
  { unit: 'Pulmonary', rate: 13.7 },
  { unit: 'Med-Surg', rate: 12.4 },
  { unit: 'Ortho', rate: 7.9 },
];

const systems = ['Epic', 'Oracle Health (Cerner)', 'MEDITECH', 'athenahealth', 'eClinicalWorks', 'NextGen', 'Dynamics 365', 'NetSuite', 'SAP'];

const securityControls = [
  { t: 'Row-level security', d: 'Users see only their facility, department or patient panel.', Icon: Lock },
  { t: 'Microsoft Entra ID', d: 'Single sign-on, MFA and role-based workspace access.', Icon: Fingerprint },
  { t: 'Sensitivity labels', d: 'Microsoft Purview labels PHI and follows it into exports.', Icon: Tags },
  { t: 'Audit logging', d: 'Every report view, export and query is logged for compliance review.', Icon: ScrollText },
  { t: 'Encryption', d: 'Data is encrypted at rest and in transit.', Icon: FileLock2 },
  { t: 'Separate environments', d: 'Dev, test and production pipelines keep real PHI out of development.', Icon: Layers },
];

const plan = [
  { when: 'Week 0', t: 'Discovery call', d: 'A free 30-minute call to understand your goals, systems and reporting pain points.' },
  { when: 'Week 1', t: 'Assessment', d: 'We map your data sources to the healthcare model and confirm which dashboards you need first.' },
  { when: 'Weeks 2–3', t: 'Connect', d: 'We build the pipelines and load your data into OneLake.' },
  { when: 'Weeks 4–5', t: 'Configure', d: 'We tailor KPIs, apply row-level security and run user acceptance testing with your team.' },
  { when: 'Week 6', t: 'Go live', d: 'Dashboards launch with role-based training for each user group.' },
  { when: 'Ongoing', t: 'Optimize', d: 'Optional managed support, new dashboards and Fabric data agents as needs grow.' },
];

const packages = [
  {
    name: 'Dashboard Starter',
    body: '3 pre-built dashboards, up to 3 data sources, Power BI setup, row-level security and training.',
    best: 'Best for clinics and single hospitals.',
  },
  {
    name: 'Healthcare Fabric Suite',
    body: 'The full dashboard catalog on Microsoft Fabric, with a OneLake lakehouse, Direct Lake and Fabric data agents.',
    best: 'Best for health systems and payers.',
  },
  {
    name: 'Fabric Readiness Assessment',
    body: 'A review of your current data platform, with a readiness report and cost and ROI estimate.',
    best: 'Best for teams planning a Fabric move.',
  },
];

const comparisonHeaders = ['Factor', 'Folio3 pre-built dashboards', 'Fully custom build', 'DIY in Excel or Power BI'];
const comparisonRows = [
  ['Time to first dashboard', '4–6 weeks', '2–6 months (industry range)', 'Varies; often stalls'],
  ['Upfront cost', 'Lower: model already built', 'Highest', 'Low cash, high staff time'],
  ['Healthcare KPIs', 'Pre-defined and tested', 'Defined from scratch', 'Defined by each analyst'],
  ['HIPAA controls', 'Included', 'Included if specified', 'Often missing'],
  ['Scales across facilities', 'Yes, one shared model', 'Yes', 'Rarely'],
  ['Fits unique workflows', 'Customizable', 'Fully', 'Fully, but manual'],
];

const audiences = [
  { t: 'Hospitals and health systems', d: 'System-wide KPIs with drill-down to each facility and service line.', Icon: Building2 },
  { t: 'Specialty clinics and outpatient centers', d: 'Patient volume, no-shows, provider productivity and revenue per visit.', Icon: Stethoscope },
  { t: 'Payers and health plans', d: 'Claims trends, cost per member and payment integrity.', Icon: ClipboardCheck },
  { t: 'Diagnostic and imaging providers', d: 'Test turnaround, equipment utilization and referral sources.', Icon: Activity },
  { t: 'Elderly and social care providers', d: 'Occupancy, care-plan compliance and staffing.', Icon: Users },
];

const faqs = [
  {
    q: 'What are pre-built healthcare dashboards?',
    a: 'Pre-built healthcare dashboards are ready-made Power BI reports with tested data models, KPIs and visuals for hospitals, clinics and payers. You connect your own EHR, claims and finance data instead of building reports from scratch, then customize KPIs and access by role.',
  },
  {
    q: 'Is Power BI HIPAA compliant?',
    a: "Power BI is a HIPAA-eligible service covered by Microsoft's Business Associate Agreement. Compliance also depends on setup: row-level security, Entra ID access control, sensitivity labels, audit logging and encryption. Folio3 configures all of these in every healthcare deployment.",
  },
  {
    q: "How long does it take to deploy Folio3's healthcare dashboards?",
    a: 'Most organizations see their first live dashboards in about four to six weeks. The timeline depends on how many data sources you connect and how much you customize the pre-built model.',
  },
  {
    q: 'Which EHRs can the dashboards connect to?',
    a: 'The dashboards connect to Epic (Clarity and Caboodle), Oracle Health (Cerner), MEDITECH, athenahealth, eClinicalWorks and NextGen. FHIR and HL7 data comes in through Azure Health Data Services. Claims, ERP and HR systems connect through standard connectors or file feeds.',
  },
  {
    q: 'Do I need Microsoft Fabric, or can I use Power BI alone?',
    a: 'You can start with Power BI alone for a small set of dashboards. Microsoft Fabric adds a single OneLake data store, faster Direct Lake reports and Fabric data agents. Fabric is the better fit once you connect several systems or facilities.',
  },
  {
    q: 'What is a Fabric data agent?',
    a: 'A Fabric data agent is an AI assistant in Microsoft Fabric that answers plain-English questions using your lakehouse, warehouse and semantic models. It reads the same governed data as your dashboards, so each user only gets answers from data they are allowed to see.',
  },
  {
    q: 'Can we customize the pre-built dashboards?',
    a: 'Yes. You can change KPIs, targets, visuals, branding and role-based views, and add new dashboards on the same data model. Customizing a pre-built model is faster than building one from scratch.',
  },
  {
    q: 'How much do pre-built healthcare dashboards cost?',
    a: 'Cost depends on the number of dashboards, data sources and users, and whether you run on Power BI alone or Microsoft Fabric. Folio3 gives a fixed quote after a free 30-minute discovery call.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${CANONICAL}#service`,
      name: 'Pre-Built Healthcare Analytics Dashboards',
      serviceType: 'Healthcare business intelligence',
      description:
        'Healthcare analytics solutions from Folio3: pre-built, HIPAA-ready Power BI and Microsoft Fabric dashboards for hospitals, clinics and payers that connect to EHR, claims and finance data.',
      provider: { '@id': `${ORIGIN}/#organization` },
      areaServed: ['US', 'GB', 'Middle East', 'AU'],
      isRelatedTo: [
        { '@type': 'SoftwareApplication', name: 'Microsoft Power BI' },
        { '@type': 'SoftwareApplication', name: 'Microsoft Fabric' },
      ],
      url: CANONICAL,
    },
    {
      '@type': 'Organization',
      '@id': `${ORIGIN}/#organization`,
      name: 'Folio3',
      url: `${ORIGIN}/`,
      sameAs: [
        'https://marketplace.microsoft.com/nb-no/product/folio3software.fabric_solution_discovery',
        'https://www.linkedin.com/company/folio3',
      ],
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Pre-Built Reporting Dashboards',
          item: `${ORIGIN}/solution/pre-built-reporting-dashboards/`,
        },
        { '@type': 'ListItem', position: 3, name: 'Healthcare Data Analytics', item: CANONICAL },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Pre-built Power BI healthcare dashboards',
      numberOfItems: catalog.length,
      itemListElement: catalog.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: d.name })),
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


function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl lg:text-4xl">{title}</h2>
      {children}
    </Reveal>
  );
}

export default function HealthcareDataAnalyticsPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24">
          <div className="min-w-0">
            <span className="eyebrow max-w-full whitespace-normal">Pre-Built Reporting Dashboards · Healthcare</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl">
              Pre-Built Healthcare Analytics Dashboards on <span className="text-brand">Power BI and Microsoft Fabric</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Connect your EHR, claims and finance data to ready-made, HIPAA-ready dashboards for hospitals, clinics and
              payers. Customize what you need, and go live in weeks instead of months.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={FORM_HREF} className={`${primaryBtn} whitespace-normal text-center`}>
                Book a free 30-minute dashboard demo
              </Link>
              <Link href="#dashboards" className={`${outlineBtn} whitespace-normal text-center`}>
                See the dashboards with sample data
              </Link>
            </div>
            <p className="mt-6 text-sm font-semibold text-ink">
              Microsoft Solutions Partner · Direct (Tier 1) Microsoft CSP · 1,000+ clients worldwide
            </p>
          </div>
          <Reveal animation="zoomIn" className="relative pb-6">
            <HeroDashboard />
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand">
        <div className="container-x py-3 text-sm text-white/90">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="px-2">»</span>
            <Link href="/solution/pre-built-reporting-dashboards/" className="hover:underline">
              Pre-Built Reporting Dashboards
            </Link>
            <span className="px-2">»</span>
            <span>Healthcare Data Analytics</span>
          </nav>
        </div>
      </div>

      {/* 2. Key facts strip */}
      <section className="border-b border-surface-line bg-white py-8">
        <ul className="container-x grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <li className="flex items-start gap-3">
            <Layers aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
            <span className="text-sm text-body"><strong className="text-ink">Power BI + Microsoft Fabric</strong> on Azure</span>
          </li>
          <li className="flex items-start gap-3">
            <HeartPulse aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
            <span className="text-sm text-body"><strong className="text-ink">9 pre-built dashboards</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <CalendarClock aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
            <span className="text-sm text-body"><strong className="text-ink">Live in 4–6 weeks</strong></span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
            <span className="text-sm text-body"><strong className="text-ink">HIPAA-ready</strong> on services covered by Microsoft&apos;s BAA</span>
          </li>
          <li className="flex items-start gap-3">
            <PlugZap aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
            <span className="text-sm text-body">
              <strong className="text-ink">Connects to Epic, Oracle Health (Cerner) and MEDITECH</strong>
            </span>
          </li>
        </ul>
      </section>

      {/* 4. What are pre-built healthcare dashboards? */}
      <section className="py-16 lg:py-24">
        <div className="container-x mx-auto max-w-3xl">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">Definition</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">What Are Pre-Built Healthcare Dashboards?</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink">
              Pre-built healthcare dashboards are ready-made Power BI reports with tested data models, KPIs and visuals
              for hospitals, clinics and payers. Instead of designing every report from scratch, you connect your EHR,
              claims and finance data to an existing model. You get working dashboards in weeks, then customize KPIs,
              branding and access by role.
            </p>
            <p className="mt-5 text-body">
              Folio3&apos;s healthcare dashboards are part of our{' '}
              <Link href="/power-bi-services/" className={link}>
                Power BI business intelligence services
              </Link>
              . Each dashboard ships with its semantic model, DAX measures and role-based views, so finance, clinical and
              operations teams work from the same numbers. When a team needs something new, we extend the model rather
              than start over.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Proof band */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-10">
        <div className="container-x">
          <dl className="grid grid-cols-2 gap-6 text-center text-white lg:grid-cols-4">
            {[
              ['750+', 'certified developers'],
              ['1,000+', 'clients worldwide'],
              ['Since 2005', 'in application modernization'],
              ['24/7', 'support and maintenance'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-3xl font-bold lg:text-4xl">{v}</dd>
                <dd className="mt-1 text-sm text-white/85">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 5. Dashboard catalog (table 1 of 2) */}
      <section id="dashboards" className="scroll-mt-24 bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Dashboard Catalog" title="Power BI Healthcare Dashboards Included">
            <p className="mt-4 text-body">
              Nine dashboards cover the questions healthcare leaders ask every week. Every dashboard is customizable, and
              all of them run on one shared data model. They are delivered through our{' '}
              <Link href="/azure-data-analytics/" className={link}>
                Azure data visualization and analytics services
              </Link>
              .
            </p>
          </SectionHead>
          <div className="mx-auto mt-10 max-w-6xl overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="caption-bottom px-5 py-4 text-left text-xs text-muted">
                Healthcare KPI dashboard catalog: nine pre-built Power BI dashboards and the KPIs each one tracks.
              </caption>
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th scope="col" className="px-5 py-4 font-semibold">Dashboard</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Key KPIs</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Built for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-line">
                {catalog.map((d) => (
                  <tr key={d.name}>
                    <th scope="row" className="px-5 py-4 font-semibold text-ink">{d.name}</th>
                    <td className="px-5 py-4 text-body">{d.kpis}</td>
                    <td className="px-5 py-4 text-body">{d.for}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Reveal animation="fadeInUp" className="mt-14">
            <p className="mb-6 text-center text-lg font-semibold text-ink">Preview the dashboards</p>
            <DashboardGallery />
          </Reveal>
        </div>
      </section>

      {/* 6. How it works on Microsoft Fabric */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="How It Works" title="How the Dashboards Run on Microsoft Fabric for Healthcare">
            <p className="mt-4 text-body">
              The dashboards sit on a governed Microsoft Fabric foundation, set up by our{' '}
              <Link href="/microsoft-fabric-services/" className={link}>
                Microsoft Fabric implementation team
              </Link>
              . Your data lands once in OneLake and feeds every report.
            </p>
          </SectionHead>
          <ol className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-5">
            {fabricSteps.map((s, i) => (
              <li key={s.t} className="relative">
                <Reveal animation="fadeInUp" delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl border border-surface-line bg-white p-5 shadow-card">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-ink">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{s.d}</p>
                  </div>
                </Reveal>
                {i < fabricSteps.length - 1 && (
                  <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl text-brand md:block">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            If you already use Microsoft&apos;s healthcare data solutions in Fabric, we build on that foundation instead of
            replacing it.
          </p>
        </div>
      </section>

      {/* 7. Fabric data agents */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal animation="fadeInUp">
            <span className="eyebrow">AI on Your Data</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Ask Your Healthcare Data Questions with Fabric Data Agents</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink">
              A Fabric data agent is an AI assistant in Microsoft Fabric that answers plain-English questions using your
              lakehouse, warehouse and semantic models. Because it reads the same governed data as your dashboards,
              answers respect the same row-level security.
            </p>
            <p className="mt-5 text-body">
              We configure data agents on request and limit them to the data each role is allowed to see.
            </p>
          </Reveal>
          <div className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-cardHover">
            <div className="flex items-center gap-2 border-b border-surface-line bg-brand-ink px-5 py-3">
              <Sparkles aria-hidden className="h-4 w-4 text-white/80" />
              <span className="text-xs font-semibold text-white/85">Fabric data agent · Healthcare model</span>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <h3 className="sr-only">Example questions your teams can ask</h3>
              <Reveal animation="fadeInLeft" className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-4 py-3 text-sm text-white">{agentQuestions[0]}</p>
              </Reveal>
              <Reveal animation="fadeInUp" delay={300}>
                <div aria-label="Sample answer from a Fabric data agent" className="max-w-[92%] rounded-2xl rounded-bl-sm bg-surface-tint px-4 py-4 text-sm text-body">
                  <p>
                    <strong className="text-ink">Cardiology</strong> had the highest 30-day readmission rate last quarter at{' '}
                    <strong className="text-ink">15.1%</strong>, followed by Pulmonary at 13.7%.
                  </p>
                  <div aria-hidden className="mt-4 space-y-2">
                    {agentAnswer.map((u) => (
                      <div key={u.unit} className="flex items-center gap-2">
                        <span className="w-20 shrink-0 text-[11px] text-body">{u.unit}</span>
                        <span className="h-2 flex-1 rounded-full bg-white">
                          <span className="block h-2 rounded-full bg-brand" style={{ width: `${(u.rate / 15.1) * 100}%` }} />
                        </span>
                        <span className="w-10 shrink-0 text-right text-[11px] font-semibold text-ink">{u.rate}%</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-muted">Source: Clinical Quality model · row-level security applied · sample data</p>
                </div>
              </Reveal>
              <div className="border-t border-surface-line pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">More questions your teams can ask</p>
                <ul className="mt-3 space-y-2">
                  {agentQuestions.slice(1).map((q) => (
                    <li key={q} className="rounded-xl border border-surface-line px-4 py-2.5 text-sm text-body">
                      &ldquo;{q}&rdquo;
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Integrations */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Integrations" title="Connects to Your EHR and Healthcare Systems" />
          <ul className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
            {systems.map((s) => (
              <li
                key={s}
                className="rounded-xl border border-surface-line bg-white px-5 py-3 text-sm font-semibold text-ink shadow-card"
              >
                {s}
              </li>
            ))}
          </ul>
          <ul className="mx-auto mt-10 max-w-3xl space-y-4">
            <li className="flex gap-3 text-body">
              <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
              <span>
                <strong className="text-ink">EHR data</strong> comes in through database extracts (such as Epic Clarity
                and Caboodle), vendor APIs or FHIR.
              </span>
            </li>
            <li className="flex gap-3 text-body">
              <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
              <span>
                <strong className="text-ink">FHIR R4 and HL7 v2 feeds</strong> land through the Azure Health Data
                Services FHIR service.
              </span>
            </li>
            <li className="flex gap-3 text-body">
              <span aria-hidden className="mt-1 shrink-0 text-brand">✓</span>
              <span>
                <strong className="text-ink">Claims, ERP and HR data</strong> connect through native connectors, APIs or
                scheduled file feeds such as 835/837 files.
              </span>
            </li>
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            Don&apos;t see your system? If it exports data, we can connect it.
          </p>
        </div>
      </section>

      {/* 9. HIPAA security */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Security</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Is Power BI HIPAA Compliant? How We Secure Patient Data</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink">
              Power BI, Microsoft Fabric and Azure are HIPAA-eligible services covered by Microsoft&apos;s Business
              Associate Agreement. Compliance also depends on configuration. Every Folio3 healthcare deployment includes
              the controls below, set up on{' '}
              <Link href="/azure-for-healthcare/" className={link}>
                Azure for healthcare
              </Link>
              .
            </p>
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {securityControls.map((c, i) => (
              <li key={c.t}>
                <Reveal animation="fadeInUp" delay={i * 60} className="h-full">
                  <div className="card-hover h-full rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                    <c.Icon aria-hidden className="h-7 w-7 text-brand" />
                    <h3 className="mt-4 text-lg font-semibold text-ink">{c.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{c.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. Engagement plan */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Engagement Plan" title="From Kickoff to Live Dashboards in About Six Weeks" />
          <div className="mx-auto max-w-6xl">
            <PlanTimeline steps={plan} />
          </div>
        </div>
      </section>

      {/* 11. Packages and offers */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Packages" title="Choose How You Start">
          </SectionHead>
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.name} animation="fadeInUp" delay={i * 80} className="h-full">
                <div
                  className={`card-hover flex h-full flex-col rounded-2xl border bg-white p-7 shadow-card ${
                    i === 1 ? 'border-brand' : 'border-surface-line'
                  }`}
                >
                  <h3 className="text-xl font-semibold text-ink">{p.name}</h3>
                  <p className="mt-3 flex-1 text-body">{p.body}</p>
                  <p className="mt-4 text-sm font-semibold text-brand">{p.best}</p>
                  <Link href={FORM_HREF} className={`${i === 1 ? primaryBtn : outlineBtn} mt-6 justify-center`}>
                    Book a demo
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-body">
            As a Direct (Tier 1) Microsoft CSP, Folio3 can also supply your Power BI and Fabric licenses.
          </p>
        </div>
      </section>

      {/* 12. Pre-built vs custom vs DIY (table 2 of 2) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Compare Options" title="Pre-Built vs Custom Healthcare Dashboards: Which Is Right for You?" />
          <div className="mx-auto mt-10 max-w-6xl overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full min-w-[760px] text-left text-sm">
              <caption className="sr-only">Pre-built vs custom vs DIY healthcare dashboards</caption>
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
            <strong className="text-ink">Bottom line:</strong> Start pre-built when your questions are standard
            healthcare KPIs. Choose a custom build when your workflows are unique. Folio3 offers both, through{' '}
            <Link href="/azure-data-analytics/healthcare-data-analytics/" className={link}>
              healthcare data analytics services
            </Link>{' '}
            for custom projects.
          </p>
        </div>
      </section>

      {/* 13. Who it's for */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Who It's For" title="Built for Hospitals, Clinics, Payers and Care Providers" />
          <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a) => (
              <li key={a.t} className="card-hover rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                <a.Icon aria-hidden className="h-7 w-7 text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-ink">{a.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{a.d}</p>
              </li>
            ))}
            <li className="card-hover rounded-2xl border border-surface-line bg-white p-6 shadow-card">
              <HeartPulse aria-hidden className="h-7 w-7 text-brand" />
              <h3 className="mt-4 text-lg font-semibold text-ink">Pharma and biotech</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Trial enrollment and site performance.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* 15. Support after go-live */}
      <section className="bg-surface-tint py-16 lg:py-20">
        <div className="container-x">
          <SectionHead eyebrow="Support" title="Support That Keeps Your Dashboards Accurate">
            <p className="mt-4 text-body">
              Dashboards are only useful while the data behind them is right. Our{' '}
              <Link href="/azure-managed-services/" className={link}>
                Azure managed services
              </Link>{' '}
              team monitors pipelines, refreshes and capacity 24/7. You also get monthly service reports and quarterly
              architecture reviews.
            </p>
          </SectionHead>
        </div>
      </section>

      {/* 16. More pre-built dashboards */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <SectionHead eyebrow="Related" title="Explore Other Pre-Built Dashboards">
            <p className="mt-4 text-body">
              Running Dynamics 365 alongside your clinical systems? See our{' '}
              <Link href="/solution/pre-built-reporting-dashboards/for-business-central/" className={link}>
                pre-built Business Central dashboards
              </Link>{' '}
              for finance and operations reporting.
            </p>
          </SectionHead>
        </div>
      </section>

      {/* 17. Final CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              See Your Healthcare Data in a Live Dashboard
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Book a free 30-minute call. We&apos;ll walk through the dashboards, map your data sources, and give you a
              timeline and quote for your organization.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={FORM_HREF} className="btn bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">
                Book my dashboard demo
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/85">
              Prefer email?{' '}
              <Link href="/contact-us/" className="text-white underline">
                Contact our Azure team
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ (answers rendered as visible HTML so crawlers and LLMs can read them) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="FAQs" title="Healthcare Dashboard FAQs" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-surface-line rounded-2xl border border-surface-line bg-white shadow-card">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
                  <h3 className="text-base font-semibold text-ink">{f.q}</h3>
                  <span aria-hidden className="text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-body">
                  {f.a}
                </p>
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
