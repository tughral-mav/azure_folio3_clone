import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  AppWindow,
  BadgeCheck,
  Bot,
  Boxes,
  Building2,
  ChartLine,
  Database,
  FileSearch,
  Headset,
  Hammer,
  KeyRound,
  Landmark,
  Layers,
  LayoutDashboard,
  MessageSquareText,
  Rocket,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { FaqAccordion } from './FaqAccordion';
import { ServicesTabs } from './ServicesTabs';

const CANONICAL = 'https://azure.folio3.com/ai-agents/fabric-data-agents/';
const TITLE = 'Microsoft Fabric Data Agent Implementation Services | Folio3';
const META_DESCRIPTION =
  'Implement secure Microsoft Fabric Data Agents with Folio3. Prepare data, validate answers, and deploy with Foundry and Copilot integration.';
const H1 = 'Microsoft Fabric Data Agent Implementation Services';
const OG_IMAGE = '/wp-content/uploads/2026/09/executive-summary-dashboard-power-bi.webp';
const FORM_HREF = '#pgForm';
const IMG = '/wp-content/uploads/2026/09';
const CTA_ASSESSMENT = 'Book a Fabric Data Agent Implementation Assessment';
const CTA_PILOT = 'Scope Your Fabric Data Agent Pilot';
const CTA_SPECIALIST = 'Talk to a Microsoft Fabric AI Specialist';
const EXAMPLE_QUESTION =
  'Which sales regions are below their gross-margin target this quarter, and what caused the change from last quarter?';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1600, height: 900, alt: H1 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const glance = [
  {
    q: 'What do they do?',
    a: 'They enable users to ask natural-language questions about approved enterprise data in Microsoft Fabric.',
  },
  {
    q: 'Which data can they use?',
    a: 'Power BI semantic models, Lakehouses, Warehouses, and KQL databases.',
  },
  {
    q: 'Do they respect permissions?',
    a: 'Yes. Access follows the permissions applied to underlying Fabric data sources.',
  },
  {
    q: 'Where can users access them?',
    a: 'Microsoft Fabric, Microsoft Foundry, Copilot Studio, Teams, Microsoft 365 Copilot, and custom applications.',
  },
];

const exampleSteps = [
  'Identify approved sales, margin, and target data sources.',
  'Interpret terms such as “gross margin,” “target,” and “this quarter.”',
  'Apply the correct measures, time filters, and regional dimensions.',
  'Compare current performance with the prior period.',
  'Return a concise answer based on the user’s authorized data access.',
  'Point users to the relevant governed report or data view when applicable.',
];

type IconCard = { title: string; text: string; Icon: LucideIcon };

const implementCards: IconCard[] = [
  {
    title: 'Governed Data Sources',
    text: 'Connect the Data Agent to approved Power BI semantic models, Lakehouses, Warehouses, and KQL databases.',
    Icon: Database,
  },
  {
    title: 'Semantic and Business Context',
    text: 'Define KPIs, measures, relationships, metadata, business definitions, terminology, and data ownership.',
    Icon: Layers,
  },
  {
    title: 'Agent Instructions and Example Queries',
    text: 'Configure agent behavior, data-source instructions, example business questions, source priorities, and rules for ambiguous requests.',
    Icon: ScrollText,
  },
  {
    title: 'Role-Based Security',
    text: 'Align Data Agent behavior with Microsoft Entra ID, source permissions, role-based access, row-level security, and column-level security.',
    Icon: KeyRound,
  },
  {
    title: 'Answer Quality Validation',
    text: 'Test real business questions, calculations, dates, filters, terminology, expected outputs, and access behavior before release.',
    Icon: BadgeCheck,
  },
  {
    title: 'Continuous Optimization',
    text: 'Monitor usage, refine business context, manage changes, test updates, and expand the agent into additional business domains.',
    Icon: TrendingUp,
  },
];

const comparisonRows = [
  ['Primary purpose', 'Answer questions about approved Microsoft Fabric data', 'Provide broad conversational assistance'],
  ['Data grounding', 'Uses selected Fabric sources and semantic context', 'Uses public knowledge, uploaded files, or custom retrieval'],
  ['Business logic', 'Uses measures, relationships, metadata, instructions, and verified answers', 'Usually requires separate prompt and data engineering'],
  ['Security model', 'Can follow underlying Fabric data permissions', 'Depends on the application’s identity and security architecture'],
  ['Best use case', 'Governed enterprise-data analytics', 'General productivity and unstructured knowledge tasks'],
];

const proofPoints: { title: string; Icon: LucideIcon }[] = [
  { title: 'End-to-end Fabric and Azure AI implementation', Icon: Rocket },
  { title: 'Semantic-model and business-context design', Icon: Layers },
  { title: 'Security, permissions, and governance validation', Icon: ShieldCheck },
  { title: 'Pilot-to-production delivery and managed optimization', Icon: TrendingUp },
];

type Layer = { title: string; text: string; Icon: LucideIcon; highlight?: boolean };

const architecture: Layer[] = [
  {
    title: 'Enterprise systems',
    text: 'ERP, CRM, Dynamics 365, Dataverse, SQL databases, APIs, files, operational systems, and third-party applications.',
    Icon: Boxes,
  },
  {
    title: 'Microsoft Fabric data foundation',
    text: 'OneLake, Data Factory, Lakehouse, Warehouse, Real-Time Intelligence, KQL databases, Power BI, and governed data pipelines.',
    Icon: Database,
  },
  {
    title: 'Business and semantic context',
    text: 'KPIs, measures, relationships, metadata, business definitions, verified answers, synonyms, and agent instructions.',
    Icon: Layers,
  },
  {
    title: 'Microsoft Fabric Data Agent',
    text: 'Natural-language questions, permission-aware answers, source-grounded insights, and conversational analytics.',
    Icon: Bot,
    highlight: true,
  },
  {
    title: 'Employee and customer experiences',
    text: 'Microsoft Fabric, Microsoft Foundry, Copilot Studio, Microsoft 365 Copilot, Teams, Power Apps, custom portals, and business applications.',
    Icon: UsersRound,
  },
];

const governanceLayer = {
  title: 'Governance and operations',
  text: 'Microsoft Entra ID, source permissions, RLS/CLS, Purview-aligned controls, testing, monitoring, adoption, and managed optimization.',
};

const channels: IconCard[] = [
  {
    title: 'Microsoft Fabric',
    text: 'Enable analysts, data teams, and business users to explore governed data through conversational questions inside the Fabric environment.',
    Icon: LayoutDashboard,
  },
  {
    title: 'Microsoft Foundry',
    text: 'Use Fabric Data Agents as a governed enterprise-data capability within custom AI applications, broader agent workflows, and Azure-based solutions.',
    Icon: Sparkles,
  },
  {
    title: 'Microsoft Copilot Studio',
    text: 'Connect a Fabric Data Agent to a custom Copilot Studio agent so it can use governed enterprise data to ground its answers.',
    Icon: Bot,
  },
  {
    title: 'Microsoft Teams and Microsoft 365 Copilot',
    text: 'Bring conversational data insights to users in the Microsoft collaboration environments they work in every day.',
    Icon: MessageSquareText,
  },
  {
    title: 'Custom Applications and Portals',
    text: 'Embed permission-aware data conversations into internal portals, customer-facing applications, operational systems, and custom business workflows.',
    Icon: AppWindow,
  },
];

const readiness = [
  {
    title: 'Trusted Data Foundation',
    text: 'We assess data availability, quality, freshness, ownership, and suitability across your Microsoft Fabric environment.',
  },
  {
    title: 'Semantic Model Readiness',
    text: 'We review measures, relationships, metadata, KPI definitions, business language, report logic, and AI-ready data-model design.',
  },
  {
    title: 'Business Context',
    text: 'We define priority user questions, expected answers, terminology, approved sources, source priorities, and rules for ambiguous requests.',
  },
  {
    title: 'Security and Governance',
    text: 'We validate identity, user roles, source permissions, row-level security, column-level security, sensitive-data requirements, and governance controls.',
  },
  {
    title: 'Deployment and Adoption',
    text: 'We recommend the best experience layer, Fabric, Microsoft Foundry, Copilot Studio, Teams, Microsoft 365 Copilot, Power Apps, or a custom application, and define the rollout approach.',
  },
];

type UseCase = {
  title: string;
  text: ReactNode;
  Icon: LucideIcon;
  image: { src: string; alt: string };
  question: string;
};

const useCases: UseCase[] = [
  {
    title: 'Finance and FP&A',
    text: (
      <>
        Enable finance teams to ask questions about revenue, margin, expenses, cash flow, budget variance, forecast
        performance, and cost drivers using governed data and approved business metrics. Learn how Folio3 connects{' '}
        <Link
          href="/blog/how-azure-fabric-and-copilot-enable-ai-driven-financial-planning/"
          className="text-brand underline"
        >
          Azure, Fabric, and Copilot for financial planning
        </Link>
        .
      </>
    ),
    Icon: Landmark,
    image: {
      src: `${IMG}/financial-reporting-dashboard-power-bi.webp`,
      alt: 'Illustrative Power BI finance dashboard showing revenue, margin, and budget variance that a Fabric Data Agent can answer questions about',
    },
    question: 'Why did operating expenses exceed budget in Q3?',
  },
  {
    title: 'Sales and Revenue Operations',
    text: 'Help sales leaders explore pipeline health, conversion rates, forecast variance, account performance, territory trends, and opportunities requiring attention.',
    Icon: ChartLine,
    image: {
      src: `${IMG}/sales-performance-dashboard-power-bi.webp`,
      alt: 'Illustrative Power BI sales performance dashboard showing pipeline, territory, and account trends',
    },
    question: 'Which accounts need attention this month?',
  },
  {
    title: 'Supply Chain and Operations',
    text: 'Give operations teams faster visibility into inventory risk, fulfillment performance, supplier trends, production issues, delivery delays, and operational exceptions.',
    Icon: Truck,
    image: {
      src: `${IMG}/distribution-dashboard-power-bi.webp`,
      alt: 'Illustrative Power BI distribution dashboard showing fulfillment and on-time delivery performance',
    },
    question: 'Where is inventory risk increasing?',
  },
  {
    title: 'Customer Service',
    text: 'Support service leaders with questions about case volume, resolution time, service-level performance, recurring issues, escalation trends, and customer experience.',
    Icon: Headset,
    image: {
      src: `${IMG}/customer-service-sla-dashboard-power-bi.webp`,
      alt: 'Illustrative Power BI customer service SLA dashboard showing case volume and resolution time',
    },
    question: 'Which issue types are driving escalations?',
  },
  {
    title: 'Executive Reporting',
    text: 'Allow leaders to ask clear business questions, compare periods, understand performance drivers, and identify the decisions requiring attention.',
    Icon: Target,
    image: {
      src: `${IMG}/executive-summary-dashboard-power-bi.webp`,
      alt: 'Illustrative Power BI executive summary dashboard comparing revenue, profit, and performance drivers across periods',
    },
    question: 'How did we perform versus last quarter?',
  },
  {
    title: 'Real Estate and Asset Operations',
    text: (
      <>
        Surface portfolio, occupancy, maintenance, leasing, property operations, and financial insights through
        governed conversational analytics. Folio3’s{' '}
        <Link href="/microsoft-fabric-reporting-for-real-estate/" className="text-brand underline">
          Microsoft Fabric reporting work for Savills
        </Link>{' '}
        improved real-estate operational efficiency by 13%.
      </>
    ),
    Icon: Building2,
    image: {
      src: `${IMG}/real-estate-property-portfolio-dashboard-power-bi.webp`,
      alt: 'Illustrative Power BI property portfolio dashboard showing occupancy rate by property against a 90% target, occupancy trend, lease expiries, and open work orders',
    },
    question: 'Which properties have the lowest occupancy?',
  },
];

type Step = { title: string; text: string; Icon: LucideIcon };

const delivery: Step[] = [
  {
    title: 'Discover',
    text: 'Define business goals, user roles, priority questions, source systems, target outcomes, and deployment requirements.',
    Icon: Search,
  },
  {
    title: 'Prepare',
    text: 'Assess data quality, Fabric sources, semantic models, business definitions, permissions, governance, and readiness.',
    Icon: FileSearch,
  },
  {
    title: 'Build',
    text: 'Configure the Data Agent, connect approved sources, create instructions, establish business context, and design the user experience.',
    Icon: Hammer,
  },
  {
    title: 'Validate',
    text: 'Test business questions, answer logic, calculations, filters, security, terminology, and stakeholder acceptance.',
    Icon: BadgeCheck,
  },
  {
    title: 'Deploy',
    text: 'Publish the Data Agent to Microsoft Fabric, Foundry, Copilot Studio, Teams, Microsoft 365 Copilot, Power Apps, or a custom application.',
    Icon: Rocket,
  },
  {
    title: 'Optimize',
    text: 'Monitor usage, improve answer quality, update business context, add sources, and scale governance as adoption grows.',
    Icon: Activity,
  },
];

const pilot = [
  'One priority business domain',
  'One to three approved Fabric data sources',
  'Priority business-question library',
  'Data-source and semantic-model readiness',
  'KPI definitions, instructions, and example queries',
  'Security and role-based access validation',
  'Answer-quality testing and stakeholder acceptance',
  'Deployment recommendation',
  'Scale-up roadmap',
];

const managed = [
  'Answer-quality monitoring and optimization.',
  'Business-question and usage analysis.',
  'Semantic-model, metadata, and instruction updates.',
  'New data-source onboarding.',
  'Security and governance reviews.',
  'Regression testing after model changes.',
  'Adoption reporting and user enablement.',
  'Performance, capacity, and cost optimization.',
  'Expansion into additional business domains.',
];

const faqs = [
  {
    q: 'What are Microsoft Fabric Data Agents?',
    a: 'Microsoft Fabric Data Agents are AI-powered conversational experiences that let authorized users ask natural-language questions about approved Microsoft Fabric data sources. They can use Power BI semantic models, Lakehouses, Warehouses, and KQL databases to provide responses based on governed enterprise data.',
  },
  {
    q: 'What is included in Microsoft Fabric Data Agent implementation services?',
    a: 'Microsoft Fabric Data Agent implementation services typically include readiness assessment, use-case discovery, data-source and Power BI semantic-model preparation, business context and agent instructions, security and permission validation, answer-quality testing, deployment to Fabric, Microsoft Foundry, Copilot Studio, Teams, or a custom application, and ongoing optimization. Folio3 scopes each engagement around your data, users, and priority business questions.',
  },
  {
    q: 'How do AI Data Agents in Microsoft Fabric work?',
    a: 'AI Data Agents in Microsoft Fabric connect to approved sources, use semantic-model context and agent instructions to interpret business questions, apply a user’s data permissions, and return natural-language answers based on governed enterprise information.',
  },
  {
    q: 'Can Microsoft Fabric Data Agents use Power BI semantic models?',
    a: 'Yes. Fabric Data Agents can use Power BI semantic models as data sources. Semantic models can contain governed measures, relationships, metadata, and business definitions that help agents interpret questions and provide relevant answers.',
  },
  {
    q: 'Are Microsoft Fabric Data Agents secure?',
    a: 'They can be implemented around the permissions applied to underlying Fabric sources. A secure implementation should include identity configuration, role-based access, source permissions, row-level and column-level security validation, data boundaries, and governance controls.',
  },
  {
    q: 'Can Microsoft Fabric Data Agents respect row-level security?',
    a: 'Yes, provided the underlying data source and access model are correctly configured. Folio3 validates role-based data access, source permissions, and security behavior during implementation and testing.',
  },
  {
    q: 'Can Fabric Data Agents integrate with Microsoft Foundry?',
    a: 'Yes. Microsoft Foundry can support AI agents that use Fabric Data Agents for enterprise data analysis. Folio3 can design the data, agent, identity, security, and deployment architecture required for this integration.',
  },
  {
    q: 'Can Fabric Data Agents work with Copilot Studio?',
    a: 'Yes. A Fabric Data Agent can be added to a custom Microsoft Copilot Studio agent as a connected agent, enabling the custom agent to use governed Fabric data to ground its responses.',
  },
  {
    q: 'What is required before implementing a Fabric Data Agent?',
    a: 'You need a defined business use case, approved Fabric data sources, appropriate permissions, a well-structured semantic or data model, clear business definitions, and a prioritized list of business questions. Folio3 can assess readiness and define a practical pilot roadmap.',
  },
  {
    q: 'How does Folio3 validate Fabric Data Agent answer quality?',
    a: 'Folio3 creates business-question test libraries, validates responses against approved data and expected outputs, checks measures and filters, tests permissions by user role, identifies ambiguous terminology, and performs regression testing after relevant model or source changes.',
  },
];

const PROVIDER = { '@type': 'Organization', name: 'Folio3', url: 'https://azure.folio3.com/' };

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    url: CANONICAL,
    description: META_DESCRIPTION,
    isPartOf: { '@type': 'WebSite', name: 'Folio3 Azure', url: 'https://azure.folio3.com/' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: H1,
    serviceType: 'Microsoft Fabric Data Agent implementation',
    provider: PROVIDER,
    areaServed: 'Worldwide',
    url: CANONICAL,
    description: META_DESCRIPTION,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azure.folio3.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Agents', item: 'https://azure.folio3.com/ai-agents/' },
      { '@type': 'ListItem', position: 3, name: 'Fabric Data Agents', item: CANONICAL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

const primaryBtn = 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide';
const outlineBtn = 'btn border border-brand text-brand hover:bg-brand hover:text-white uppercase tracking-wide';
const whiteBtn = 'btn bg-white uppercase tracking-wide text-brand hover:bg-surface-chip';
const whiteOutlineBtn = 'btn border border-white uppercase tracking-wide text-white hover:bg-white hover:text-brand';
const gradientBg = 'bg-[linear-gradient(135deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)]';

function Check({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <li className={`flex gap-3 ${light ? 'text-white/90' : 'text-body'}`}>
      <span aria-hidden className={`mt-1 shrink-0 ${light ? 'text-white' : 'text-brand'}`}>✓</span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function SectionHead({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <Reveal animation="fadeInUp" className="mx-auto max-w-3xl text-center">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 text-3xl lg:text-4xl">{title}</h2>
      {children}
    </Reveal>
  );
}

function IconBadge({ Icon, size = 'md' }: { Icon: LucideIcon; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-14 w-14 rounded-2xl' : 'h-12 w-12 rounded-xl';
  return (
    <span
      className={`flex ${box} shrink-0 items-center justify-center bg-brand/10 text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white`}
    >
      <Icon aria-hidden="true" size={size === 'lg' ? 26 : 22} strokeWidth={1.8} />
    </span>
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

/** Horizontal timeline on desktop, vertical on mobile. */
function Timeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-5">
      <span
        aria-hidden
        className="absolute bottom-8 left-8 top-8 w-0.5 bg-gradient-to-b from-brand via-brand/60 to-[#2F69F2]/40 lg:bottom-auto lg:left-[8.33%] lg:right-[8.33%] lg:top-8 lg:h-0.5 lg:w-auto lg:bg-gradient-to-r"
      />
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <Reveal
            animation="fadeInUp"
            delay={i * 80}
            className="group flex items-start gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
          >
            <span
              className={`relative flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full ${gradientBg} text-white shadow-cardHover ring-8 ring-surface-tint transition-transform duration-300 group-hover:scale-110`}
            >
              <s.Icon aria-hidden="true" size={22} strokeWidth={1.9} />
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand shadow-card">
                {i + 1}
              </span>
            </span>
            <div>
              <h3 className="text-base font-semibold leading-snug text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** Hero visual: a governed Power BI dashboard with a Fabric Data Agent chat panel in front of it. */
function HeroVisual() {
  const bars = [
    { r: 'North', v: 92, miss: false },
    { r: 'East', v: 78, miss: true },
    { r: 'South', v: 96, miss: false },
    { r: 'West', v: 71, miss: true },
  ];
  return (
    <figure>
      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
          <Image
            src={`${IMG}/executive-summary-dashboard-power-bi.webp`}
            alt="Illustrative Power BI executive dashboard behind a Microsoft Fabric Data Agent chat answering a gross-margin question"
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>
        <div className="relative mx-auto -mt-12 w-[92%] max-w-sm rounded-2xl border border-surface-line bg-white/95 p-4 shadow-cardHover backdrop-blur lg:absolute lg:-bottom-24 lg:-left-10 lg:mx-0 lg:mt-0 lg:w-[66%] lg:max-w-[20rem]">
          <div className="flex items-center gap-2 border-b border-surface-line pb-3">
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${gradientBg} text-white`}>
              <Bot aria-hidden="true" size={16} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">Fabric Data Agent</p>
              <p className="text-[11px] text-body">Sales semantic model · Warehouse</p>
            </div>
          </div>
          <p className="ml-auto mt-3 w-fit max-w-[92%] rounded-2xl rounded-br-sm bg-brand px-3 py-2 text-xs leading-snug text-white">
            {EXAMPLE_QUESTION}
          </p>
          <div className="mt-3 rounded-2xl rounded-bl-sm bg-surface-tint px-3 py-3">
            <p className="text-xs leading-snug text-ink">
              <span className="font-semibold">2 of 4 regions</span> are below target. West shows the largest gap
              versus last quarter, driven mainly by lower-margin product mix.
            </p>
            <div className="mt-3 space-y-1.5" aria-hidden>
              {bars.map((b) => (
                <div key={b.r} className="flex items-center gap-2 text-[10px] text-body">
                  <span className="w-9">{b.r}</span>
                  <span className="relative h-2 flex-1 rounded-full bg-white">
                    <span
                      className={`absolute inset-y-0 left-0 rounded-full ${b.miss ? 'bg-[#F59E0B]' : 'bg-brand'}`}
                      style={{ width: `${b.v}%` }}
                    />
                    <span className="absolute inset-y-[-3px] left-[85%] w-px bg-ink/50" />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F7EE] px-2 py-0.5 text-[10px] font-medium text-[#137A3E]">
              <ShieldCheck aria-hidden="true" size={11} /> Row-level security applied
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-chip px-2 py-0.5 text-[10px] font-medium text-brand">
              <BadgeCheck aria-hidden="true" size={11} /> Verified measure
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mx-auto mt-4 max-w-sm text-center text-[11px] leading-snug text-body lg:ml-auto lg:mr-0 lg:mt-3 lg:max-w-[16rem] lg:text-right">
        Illustrative example. Actual responses depend on approved Fabric data sources, semantic models, configured
        business definitions, and user permissions.
      </figcaption>
    </figure>
  );
}

export default function FabricDataAgentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <span className="eyebrow">AI Agents · Microsoft Fabric</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl xl:text-[3.4rem]">
              Microsoft Fabric <span className="text-brand">Data Agent</span> Implementation Services
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium text-ink/90">
              Build and deploy secure, governed Microsoft Fabric Data Agents with Folio3.
            </p>
            <p className="mt-4 max-w-xl text-body">
              We help organizations assess Fabric readiness, prepare data and semantic models, configure AI Data
              Agents, validate answer quality, integrate with Microsoft Foundry and Copilot experiences, and scale
              conversational analytics across the enterprise.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={FORM_HREF} className={primaryBtn}>
                {CTA_ASSESSMENT}
              </Link>
              <Link href={FORM_HREF} className={outlineBtn}>
                {CTA_PILOT}
              </Link>
            </div>
            <ul aria-label="Supported Fabric data sources" className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-brand">
              {['Power BI semantic models', 'Lakehouse', 'Warehouse', 'KQL databases', 'OneLake'].map((s) => (
                <li key={s} className="rounded-full border border-brand/20 bg-white/70 px-3 py-1">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <Reveal animation="zoomIn">
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand">
        <nav aria-label="Breadcrumb" className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="px-2">/</span>
          <Link href="/ai-agents/" className="hover:underline">AI Agents</Link>
          <span className="px-2">/</span>
          <span aria-current="page">Fabric Data Agents</span>
        </nav>
      </div>

      {/* What Are Microsoft Fabric Data Agents? */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal animation="fadeInLeft">
            <span className="eyebrow">Microsoft Fabric Data Agents Overview</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">What Are Microsoft Fabric Data Agents?</h2>
            <p className="mt-4 text-body">
              Microsoft Fabric Data Agents are AI-powered conversational experiences that allow authorized users to
              ask questions in natural language about governed enterprise data in Microsoft Fabric. They can use
              approved sources such as Power BI semantic models, Lakehouses, Warehouses, and KQL databases to return
              relevant answers while respecting access controls on the underlying data.
            </p>
            <p className="mt-3 text-body">
              Folio3 implements Fabric Data Agents with the data foundation, semantic context, security, validation,
              integration, and managed support required for enterprise use.
            </p>
          </Reveal>
          <Reveal animation="fadeInRight">
            <Image
              src="/wp-content/uploads/2026/01/what-is-intellifabric.webp"
              alt="Business user reviewing governed Microsoft Fabric data, a Power BI semantic model, and automated data pipelines"
              width={816}
              height={607}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* At a Glance (table 1 of 2) */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Quick Answers" title="Microsoft Fabric Data Agents at a Glance" />
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th scope="col" className="w-1/3 px-5 py-4 font-semibold">Question</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Direct answer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-line">
                {glance.map((g) => (
                  <tr key={g.q}>
                    <th scope="row" className="px-5 py-4 align-top font-semibold text-ink">{g.q}</th>
                    <td className="px-5 py-4 leading-relaxed text-body">{g.a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How AI Data Agents Turn Data Into Decisions */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal animation="fadeInLeft">
            <span className="eyebrow">From Question to Decision</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">
              How AI Data Agents in Microsoft Fabric Turn Data Into Decisions
            </h2>
            <p className="mt-4 text-body">
              AI Data Agents in Microsoft Fabric allow teams to interact with governed data through everyday language.
              A finance leader can ask why gross margin changed. A sales leader can ask which accounts need attention.
              An operations manager can ask where inventory risk is increasing.
            </p>
            <div className="mt-6 rounded-r-2xl border-l-4 border-brand bg-surface-tint p-6">
              <p className="text-body">
                Reliable responses depend on curated data sources, semantic models, KPI definitions, business
                terminology, agent instructions, verified examples, and testing.
              </p>
            </div>
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">Example Business Question</p>
              <div className="mt-4 flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-chip text-brand">
                  <MessageSquareText aria-hidden="true" size={18} />
                </span>
                <p className="rounded-2xl rounded-tl-sm bg-brand px-4 py-3 text-sm font-medium leading-relaxed text-white">
                  “{EXAMPLE_QUESTION}”
                </p>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink">
                <Bot aria-hidden="true" size={18} className="text-brand" /> A Fabric Data Agent can:
              </p>
              <ol className="mt-4 space-y-3">
                {exampleSteps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm text-body">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA banner */}
      <section className={`relative overflow-hidden ${gradientBg} py-16 lg:py-20`}>
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Build a Production-Ready Microsoft Fabric Data Agent With Folio3
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Move from fragmented dashboards, reporting queues, and disconnected data sources to governed,
              natural-language answers from your Microsoft Fabric environment.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-white/85">
              Folio3 helps you prepare the data foundation, configure the Data Agent, validate answer quality,
              integrate it with Microsoft and Azure experiences, and scale it securely across your organization.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={FORM_HREF} className={whiteBtn}>
                {CTA_ASSESSMENT}
              </Link>
              <Link href={FORM_HREF} className={whiteOutlineBtn}>
                {CTA_SPECIALIST}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Folio3 Implements */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Production-Ready"
            title="What Folio3 Implements for Production-Ready Fabric Data Agents"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {implementCards.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={(i % 3) * 70}>
                <div className="group h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card transition-shadow duration-200 hover:shadow-cardHover">
                  <IconBadge Icon={c.Icon} />
                  <h3 className="mt-5 text-xl font-semibold text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Services */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Our Services" title="Microsoft Fabric Data Agent Implementation Services">
            <p className="mt-4 text-body">
              Folio3 provides end-to-end implementation services for organizations that need more than a basic AI
              chat interface.
            </p>
          </SectionHead>
          <ServicesTabs />
          <CtaRow primary={CTA_ASSESSMENT} secondary={CTA_SPECIALIST} />
        </div>
      </section>

      {/* Why Organizations Choose Folio3 */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal animation="fadeInLeft">
            <span className="eyebrow">Why Folio3</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Why Organizations Choose Folio3</h2>
            <p className="mt-4 text-body">
              Folio3 brings together Microsoft Fabric engineering, Power BI semantic modeling, Azure AI integration,
              security controls, answer-quality validation, and managed optimization in one implementation team.
            </p>
            <p className="mt-3 text-body">
              We help organizations avoid the common mistake of connecting AI directly to unprepared data. Instead, we
              establish the governed data foundation, business context, access model, and testing process needed for
              trusted enterprise answers.
            </p>
            <p className="mt-5 text-body">
              See how Folio3 used{' '}
              <Link href="/microsoft-fabric-reporting-for-real-estate/" className="text-brand underline">
                Microsoft Fabric reporting to improve real-estate operational efficiency for Savills
              </Link>
              .
            </p>
          </Reveal>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {proofPoints.map((p, i) => (
              <li key={p.title}>
                <Reveal animation="fadeInUp" delay={i * 70} className="h-full">
                  <div className="group flex h-full flex-col gap-4 rounded-2xl border border-surface-line bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-cardHover">
                    <IconBadge Icon={p.Icon} />
                    <p className="text-base font-semibold leading-snug text-ink">{p.title}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Built for Your Microsoft Fabric and Azure Data Estate */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Reference Architecture" title="Built for Your Microsoft Fabric and Azure Data Estate">
            <p className="mt-4 text-body">
              Folio3 designs Microsoft Fabric Data Agent solutions around a connected architecture that brings data,
              business context, AI, and governance together.
            </p>
          </SectionHead>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[1fr_17rem]">
            <ol className="space-y-3">
              {architecture.map((l, i) => (
                <li key={l.title}>
                  <Reveal animation="fadeInUp" delay={i * 70}>
                    <div
                      className={`flex items-center gap-4 rounded-2xl border p-5 ${
                        l.highlight
                          ? `${gradientBg} border-transparent text-white shadow-cardHover`
                          : 'border-surface-line bg-white shadow-card'
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          l.highlight ? 'bg-white/15 text-white' : 'bg-brand/10 text-brand'
                        }`}
                      >
                        <l.Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                      </span>
                      <div>
                        <h3 className={`text-lg font-semibold ${l.highlight ? 'text-white' : 'text-ink'}`}>
                          {l.title}
                        </h3>
                        <p className={`mt-1 text-sm leading-relaxed ${l.highlight ? 'text-white/85' : 'text-body'}`}>
                          {l.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                  {i < architecture.length - 1 && (
                    <span aria-hidden className="mx-auto mt-3 block h-4 w-0.5 bg-brand/40 lg:ml-11" />
                  )}
                </li>
              ))}
            </ol>
            <Reveal animation="fadeInRight" className="h-full">
              <aside className="flex h-full flex-col rounded-2xl border-2 border-dashed border-brand/40 bg-surface-tint p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white">
                  <ShieldCheck aria-hidden="true" size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{governanceLayer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{governanceLayer.text}</p>
                <p className="mt-auto pt-6 text-xs font-medium uppercase tracking-wider text-brand">
                  Applied across every layer
                </p>
              </aside>
            </Reveal>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-body">
            Folio3 can also strengthen the reporting and semantic layer behind your Data Agent through{' '}
            <Link href="/blog/integrating-microsoft-fabric-in-power-bi/" className="text-brand underline">
              Microsoft Fabric and Power BI integration
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Put Trusted Data Answers Where Work Happens */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Deployment Options" title="Put Trusted Data Answers Where Work Happens">
            <p className="mt-4 text-body">
              A Fabric Data Agent delivers greater value when it is available in the tools your employees already use.
            </p>
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            {channels.map((c, i) => (
              <Reveal
                key={c.title}
                animation="fadeInUp"
                delay={(i % 3) * 70}
                className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
              >
                <div className="group h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card transition-shadow duration-200 hover:shadow-cardHover">
                  <IconBadge Icon={c.Icon} />
                  <h3 className="mt-5 text-lg font-semibold text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs italic text-body">
            Available integration paths depend on Microsoft product availability, licensing, tenant settings, security
            configuration, and your organization’s approved architecture.
          </p>
        </div>
      </section>

      {/* Readiness */}
      <section className="relative overflow-hidden bg-brand-ink py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_80%_at_85%_20%,rgba(47,105,242,0.35)_0%,transparent_60%)]" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="eyebrow">Readiness Assessment</span>
            <h2 className="mt-3 text-3xl text-white lg:text-4xl">Assess Your Microsoft Fabric Data Agent Readiness</h2>
            <p className="mt-4 max-w-xl text-white/80">
              Wondering whether your Fabric environment is ready for a Data Agent? Folio3 evaluates the data, semantic
              model, security, business context, and deployment requirements needed for a successful implementation.
            </p>
            <ol className="mt-8 space-y-5">
              {readiness.map((r, i) => (
                <li key={r.title}>
                  <Reveal animation="fadeInUp" delay={i * 70} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white ring-1 ring-white/30">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{r.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/75">{r.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Link href={FORM_HREF} className={`${whiteBtn} mt-10`}>
              {CTA_ASSESSMENT}
            </Link>
          </div>
          <Reveal animation="zoomIn">
            <Image
              src="/wp-content/uploads/2026/01/intellifabric-screens.webp"
              alt="Illustrative Microsoft Fabric and Power BI dashboards on tablets, representing the governed data foundation a Fabric Data Agent relies on"
              width={757}
              height={601}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="mx-auto h-auto w-full max-w-lg drop-shadow-2xl"
            />
          </Reveal>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Use Cases" title="Microsoft Fabric Data Agent Use Cases">
            <p className="mt-4 text-body">
              Conversational analytics in Microsoft Fabric gives each team governed answers to the questions it asks
              most.
            </p>
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <Reveal key={u.title} animation="fadeInUp" delay={(i % 3) * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card transition-shadow duration-200 hover:shadow-cardHover">
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-tint">
                    <Image
                      src={u.image.src}
                      alt={u.image.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/20 to-transparent" />
                    <p className="absolute bottom-3 left-3 right-3 flex items-start gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs font-medium leading-snug text-ink shadow-card">
                      <MessageSquareText aria-hidden="true" size={14} className="mt-0.5 shrink-0 text-brand" />
                      “{u.question}”
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <IconBadge Icon={u.Icon} />
                      <h3 className="text-lg font-semibold leading-snug text-ink">{u.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-body">{u.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs italic text-body">
            Example questions and dashboard visuals are illustrative.
          </p>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Implementation Process" title="Our Microsoft Fabric Data Agent Implementation Process" />
          <Timeline steps={delivery} />
          <CtaRow primary={CTA_ASSESSMENT} />
        </div>
      </section>

      {/* Fabric Data Agents vs. Generic AI Chatbots (table 2 of 2) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Compare" title="Microsoft Fabric Data Agents vs. Generic AI Chatbots" />
          <div className="mx-auto mt-10 max-w-5xl overflow-x-auto rounded-2xl border border-surface-line bg-white shadow-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th scope="col" className="px-5 py-4 font-semibold">Capability</th>
                  <th scope="col" className="bg-brand px-5 py-4 font-semibold">
                    <span className="inline-flex items-center gap-2">
                      <Bot aria-hidden="true" size={16} /> Microsoft Fabric Data Agent
                    </span>
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">Generic AI Chatbot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-line">
                {comparisonRows.map(([cap, agent, bot]) => (
                  <tr key={cap}>
                    <th scope="row" className="px-5 py-4 align-top font-semibold text-ink">{cap}</th>
                    <td className="bg-brand/5 px-5 py-4 align-top font-medium text-ink">
                      <span className="flex gap-2">
                        <span aria-hidden className="text-brand">✓</span>
                        {agent}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top text-body">{bot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pilot */}
      <section className={`relative overflow-hidden ${gradientBg} py-16 lg:py-24`}>
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_80%_20%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="container-x relative grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal animation="fadeInLeft">
            <span className="mb-3 inline-block rounded-pill bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Pilot Program
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white lg:text-4xl">
              Launch a Governed Microsoft Fabric Data Agent Pilot
            </h2>
            <p className="mt-4 text-white/85">
              Start with a focused business domain, demonstrate value, and create a scalable foundation for
              enterprise rollout.
            </p>
            <Link href={FORM_HREF} className={`${whiteBtn} mt-8`}>
              {CTA_PILOT}
            </Link>
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/80">A pilot includes</p>
              <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {pilot.map((p) => (
                  <Check key={p} light>
                    {p}
                  </Check>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Managed Services */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal animation="fadeInLeft">
            <span className="eyebrow">Managed Services</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Managed Fabric Data Agent Optimization and Support</h2>
            <p className="mt-4 text-body">
              A production Data Agent needs continuous attention as business definitions, data sources, semantic
              models, permissions, and user needs evolve.
            </p>
            <Link href={FORM_HREF} className={`${primaryBtn} mt-8`}>
              {CTA_SPECIALIST}
            </Link>
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="rounded-2xl border border-surface-line bg-white p-7 shadow-card">
              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {managed.map((m) => (
                  <Check key={m}>{m}</Check>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Frequently Asked Questions" />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <OneToOneCTA
        formTitle="Book a Fabric Data Agent Implementation Assessment"
        formCopy="Tell us about your Microsoft Fabric environment, priority business questions, and target users. Our team will assess your readiness and recommend the right implementation path, pilot scope, and deployment approach."
      />

      {jsonLd.map((d) => (
        <script
          key={d['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
