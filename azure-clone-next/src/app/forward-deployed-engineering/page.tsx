import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bot,
  CalendarClock,
  ClipboardCheck,
  Code2,
  Database,
  GraduationCap,
  Layers,
  Search,
  ShieldCheck,
  Unplug,
  UserRoundX,
  UsersRound,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { FaqAccordion } from './FaqAccordion';

const CANONICAL = 'https://azure.folio3.com/forward-deployed-engineering/';
const TITLE = 'Azure AI Forward Deployed Engineering Services';
const META_DESCRIPTION =
  'Azure AI forward deployed engineering: our engineers sit with your team and take one AI agent on Azure AI Foundry or Copilot Studio into production.';
const H1 = 'Azure AI Forward Deployed Engineering Services';
const OG_IMAGE = '/wp-content/uploads/2026/07/petro-chemical-company.webp';
// Temporarily points to the form on this page until the Azure-L02 assessment page
// (/forward-deployed-engineering/ai-pilot-to-production-assessment/) is built.
const ASSESSMENT_HREF = '#pgForm';
const CTA_ASSESSMENT = 'Book an AI pilot-to-production assessment';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 727, height: 607, alt: H1 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const designations = [
  { src: '/wp-content/uploads/2024/08/data-ai-azure-logo-img.webp', alt: 'Microsoft Solutions Partner: Data & AI, Azure', w: 351, h: 238 },
  { src: '/wp-content/uploads/2024/08/infrastructure-azure-logo-img.webp', alt: 'Microsoft Solutions Partner: Infrastructure, Azure', w: 352, h: 238 },
  { src: '/wp-content/uploads/2024/08/digital-app-innovation-logo-img.webp', alt: 'Microsoft Solutions Partner: Digital & App Innovation, Azure', w: 352, h: 238 },
  { src: '/wp-content/uploads/2024/08/business-application-logo-img.webp', alt: 'Microsoft Solutions Partner: Business Applications', w: 352, h: 238 },
  { src: '/wp-content/uploads/2023/10/csp-ms-logo.webp', alt: 'Microsoft Direct Cloud Solution Provider', w: 464, h: 162, pad: true },
];

type IconCard = { title: string; text: ReactNode; Icon: LucideIcon };

const hurdles: IconCard[] = [
  {
    title: 'Top-Down Tool Selection',
    text: 'AI tools are often chosen by leadership from vendor demos, without input from the teams who will use them. The result is a tool that solves the wrong problems and never becomes part of daily work.',
    Icon: UsersRound,
  },
  {
    title: 'Poor Fit With Existing Workflows',
    text: 'Off-the-shelf AI rarely reflects how a business actually runs: its approval rules, exceptions and systems. When a tool does not fit the process, employees work around it or go back to manual methods.',
    Icon: Unplug,
  },
  {
    title: 'No Ownership After Rollout',
    text: 'Once licences are rolled out, nobody is clearly responsible for adoption. Without training on real tasks or a way to measure results, usage declines and the return on the investment cannot be shown.',
    Icon: UserRoundX,
  },
];

const services: IconCard[] = [
  {
    title: 'AI Opportunity Assessment',
    text: 'A two-week assessment before any build. The team picks one workflow, measures today’s baseline, checks your data, licences and environment, and gives you a business case with a clear go or no-go.',
    Icon: Search,
  },
  {
    title: 'AI Agent Development',
    text: 'AI agent development services for your workflow, on Azure AI Foundry and Copilot Studio. The work starts from an agent Microsoft already ships where one exists, and a custom agent where it does not.',
    Icon: Bot,
  },
  {
    title: 'Data and Integrations',
    text: (
      <>
        Data brought to the standard the workflow needs on{' '}
        <Link href="/microsoft-fabric-services" className="text-brand underline">
          Microsoft Fabric
        </Link>
        , and connections to the systems the workflow crosses, such as ERP, e-commerce and banking.
      </>
    ),
    Icon: Database,
  },
  {
    title: 'Testing and Controls',
    text: 'A test set built from your past documents, rerun on every change. Agents go live behind a review queue, so a person approves their work until accuracy holds.',
    Icon: ShieldCheck,
  },
  {
    title: 'Training and Handover',
    text: 'Reviewers and administrators are trained before the team leaves. You keep the code, the agent setup, the tests and a runbook your team can follow.',
    Icon: GraduationCap,
  },
  {
    title: 'Run and Tune',
    text: 'After go-live the team monitors accuracy, retests after each Microsoft release wave, and sends a monthly report. It is a monthly arrangement you can stop.',
    Icon: Activity,
  },
];

const team = [
  {
    role: 'Forward Deployed Engineer',
    short: 'FDE',
    lead: 'A senior engineer who builds the AI into your systems and data.',
    Icon: Code2,
    points: [
      'Agent in Copilot Studio or Microsoft Foundry',
      'Grounding in SharePoint, Azure AI Search and Fabric',
      'Tools and integrations through MCP and APIs',
      'Its own Entra ID identity with least access',
      'Test set, tracing and alerts',
    ],
  },
  {
    role: 'Forward Deployed Consultant',
    short: 'FDC',
    lead: 'Works with the people who own the process on rules, training and results.',
    Icon: ClipboardCheck,
    points: [
      'Maps how the work is done today',
      'Writes down the rules the agent must follow',
      'Agrees one success measure with the process owner',
      'Trains the people who review the agent’s work',
      'Reports the before and after numbers',
    ],
  },
];

const agentLinks = [
  { label: 'Service desk', href: '/ai-agents/ai-powered-ticketing-and-customer-service-agent/' },
  { label: 'HR policy and onboarding', href: '/ai-scenario-library/human-resources/' },
  { label: 'Recruitment', href: '/ai-powered-solutions/' },
  { label: 'Expense claims', href: '/ai-powered-solutions/' },
  { label: 'Document compliance', href: '/petrochemical-producer-edms-compliance-agent/' },
  { label: 'Fabric data', href: '/ai-agents/fabric-data-agents/' },
];

const stages = [
  {
    duration: '2 weeks',
    title: 'Assessment',
    text: 'Your FDE and FDC pick one workflow, measure today’s baseline, and check your data, licences and environment. You get a business case, a pilot plan and a clear go or no-go.',
    Icon: Search,
  },
  {
    duration: '8 to 12 weeks',
    title: 'Production Pilot',
    text: 'The FDE builds and tests against your past data, goes live with a person reviewing the agent’s work, and reduces review as accuracy holds.',
    Icon: Wrench,
  },
  {
    duration: 'Monthly',
    title: 'Run and Tune',
    text: 'The FDE team monitors accuracy after go-live, retests after each Microsoft release wave, and starts the next workflow, with a monthly report.',
    Icon: CalendarClock,
  },
];

const options = [
  {
    name: 'One Forward Deployed Engineer',
    get: 'A senior engineer working in your environment, with a forward deployed consultant part-time.',
    best: 'One workflow in one company, where Microsoft’s own agent needs setup, data fixes and a few extensions.',
  },
  {
    name: 'FDE and FDC Pod',
    get: 'Two to four experts on one backlog: a lead engineer, an integration engineer and a consultant.',
    best: 'A workflow that crosses systems, such as ERP with e-commerce or banking, or one that needs a custom agent.',
    highlight: true,
  },
  {
    name: 'Standing Team',
    get: 'A retained team that keeps what it learned, with retesting after each Microsoft release wave.',
    best: 'Companies running several agents across finance and operations.',
  },
];

const results = [
  {
    stat: 'Up to 90%',
    title: 'Less Effort on Status Reports',
    text: 'Three Copilot Studio agents and a validation service on Azure for a KSA petrochemical producer. Figure estimated from the manual steps automated.',
    href: '/petrochemical-producer-edms-compliance-agent/',
    img: { src: '/wp-content/uploads/2026/07/petro-chemical-company.webp', w: 727, h: 607 },
    alt: 'Illustration of a petrochemical plant with a Microsoft Copilot agent',
  },
  {
    stat: '60%',
    title: 'Time Saved on Food Plan Management',
    text: 'Copilot on Fabric data pipelines and a Lakehouse for a food verification organisation.',
    href: '/copilot-implementation-food-verification/',
    img: {
      src: '/wp-content/uploads/2025/07/automating-food-plan-management-saving-time-with-copilot.webp',
      w: 696,
      h: 476,
    },
    alt: 'Illustration of food plan management automated with Microsoft Copilot',
  },
];

const linkCls = 'text-brand underline';

/** FAQ answers: `a` is rendered on the page (may contain links), `text` is the plain version for structured data. */
const faqs: { q: string; a: ReactNode; text: string }[] = [
  {
    q: 'What is an Azure forward deployed engineer?',
    text: 'An Azure forward deployed engineer is a senior engineer who works inside your Azure tenant, alongside the people who own a process, to build an AI agent against your real data and keep it accurate in production. Unlike an adviser, the engineer writes the code, stays until the agent works for everyone it was built for, and is judged on the business result.',
  },
  {
    q: 'What are forward deployed engineering services on Azure?',
    text: 'They are services in which engineers work inside your Azure and Microsoft 365 environment to take one agent or AI workload from pilot to production on Copilot Studio, Microsoft Foundry or Microsoft Fabric. The work covers the agent build, grounding in your data, identity and access, testing, monitoring, cost estimates and handover to your team.',
  },
  {
    q: 'What is a forward deployed AI engineer?',
    text: 'A forward deployed AI engineer is a forward deployed engineer whose main job is getting AI agents to work in a customer’s live systems. On Azure, that means building agents in Copilot Studio or Foundry and grounding them in SharePoint, Azure AI Search or Fabric. It also means connecting them to business systems through MCP tools and APIs, and testing them against real requests.',
  },
  {
    q: 'How is a forward deployed engineer different from a solutions engineer?',
    text: 'A solutions engineer works before the sale: demonstrating a product and scoping what a customer needs. A forward deployed engineer works after it: writing code, fixing data and setting up access in the customer’s environment until the system runs in production. One is measured on whether the deal closes, the other on whether the result arrives.',
  },
  {
    q: 'How is forward deployed engineering different from staff augmentation?',
    text: 'Staff augmentation adds engineers to your backlog, and you direct their work. Forward deployed engineering takes responsibility for one result, such as service desk tickets resolved without a person, and covers the process, data, security and testing work needed to reach it. If your scope is already clear and you have someone to lead the work, staff augmentation usually costs less.',
  },
  {
    q: 'What is a forward deployed consultant?',
    text: 'A forward deployed consultant owns the business side of the engagement. The consultant maps how the work is done today, writes down the rules the agent must follow, and agrees the success measure with the process owner. They also train the people who review the agent’s work and report the before and after numbers. The engineer builds the agent, and the consultant makes sure it is the right one.',
  },
  {
    q: 'How much do Azure forward deployed engineering services cost?',
    text: 'Cost depends on how many people are embedded and for how long. We price in three parts: a fixed-fee assessment, a fixed-price pilot for one agent, and a monthly fee for a pod or standing team. Microsoft bills Azure consumption separately, including model usage, Copilot Studio capacity and Fabric capacity. We estimate those costs during the assessment.',
  },
  {
    q: 'How long does a forward deployed engineering engagement take?',
    text: 'The assessment takes two weeks. A production pilot for one agent takes 8 to 12 weeks, including a period in which a person reviews what the agent does before more people get access. After that, running and extending the agent is a monthly arrangement you can stop.',
  },
  {
    q: 'Copilot Studio or Microsoft Foundry: which do we need?',
    text: 'Use Copilot Studio when the agent lives in Teams and Microsoft 365, works mostly over business content, and can be built with little code. Use Microsoft Foundry when the agent needs custom code, several agents working together, a model of your choice, or high volume with strict testing. Many companies use both. The assessment recommends one for your case.',
  },
  {
    q: 'Can AI agents use our Microsoft Fabric data?',
    text: 'Yes. Fabric data agents answer questions from data in OneLake, and agents built in Foundry can use Fabric as a knowledge source. The work is in preparing the data. That means modelling it so questions reach the right tables, applying the same permissions your reports use, and keeping it current. Folio3’s IntelliFabric gives agents governed models to start from.',
    a: (
      <>
        Yes.{' '}
        <Link href="/ai-agents/fabric-data-agents/" className={linkCls}>
          Fabric data agents
        </Link>{' '}
        answer questions from data in OneLake, and agents built in Foundry can use Fabric as a knowledge source. The
        work is in preparing the data. That means modelling it so questions reach the right tables, applying the same
        permissions your reports use, and keeping it current. Folio3’s{' '}
        <Link href="/solution/intellifabric/" className={linkCls}>
          IntelliFabric
        </Link>{' '}
        gives agents governed models to start from.
      </>
    ),
  },
  {
    q: 'Should we use Microsoft Frontier Company or a partner?',
    text: 'Microsoft Frontier Company, launched in July 2026, embeds Microsoft engineers and industry specialists in large enterprises, and works with global systems integrators to reach more customers. A partner such as Folio3 suits companies that want to start with one agent and a small team, on a fixed-price pilot, with the same people staying after go-live. Both use the forward deployed model.',
  },
  {
    q: 'How do we choose a forward deployed engineering partner for Azure?',
    text: 'Check five things. Can they show you an agent running in production, not a demo? Do they know Azure AI and your data platform, beyond writing prompts? How do they test an agent before more people get access? Who owns the code, configuration and test set afterwards? And how will they measure the result against today’s baseline?',
  },
  {
    q: 'Is Folio3 a Microsoft Copilot Studio partner?',
    text: 'Folio3 is a Microsoft Solutions Partner that builds and deploys Copilot Studio agents. It holds the Data & AI, Infrastructure, Digital & App Innovation and Business Applications designations and is a Direct Cloud Solution Provider. Its Copilot Studio work includes document and compliance agents for a petrochemical producer.',
    a: (
      <>
        Folio3 is a Microsoft Solutions Partner that builds and deploys{' '}
        <Link href="/data-science-ai/microsoft-copilot-consulting/" className={linkCls}>
          Copilot Studio agents
        </Link>
        . It holds the Data &amp; AI, Infrastructure, Digital &amp; App Innovation and Business Applications
        designations and is a Direct Cloud Solution Provider. Its Copilot Studio work includes document and compliance
        agents for a petrochemical producer.
      </>
    ),
  },
  {
    q: 'What happens when the engagement ends?',
    text: 'Your team runs the agent. We hand over the agent setup, the code and infrastructure definitions in your repository, the test set, the monitoring and a runbook. We also train your administrators and reviewers before we leave. You can keep us on a monthly basis for monitoring and the next agent, or stop there.',
  },
].map((f) => ({ ...f, a: 'a' in f && f.a ? f.a : f.text }));

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
    serviceType: 'Azure AI forward deployed engineering',
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
      { '@type': 'ListItem', position: 2, name: 'Forward Deployed Engineering', item: CANONICAL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.text },
    })),
  },
];

const primaryBtn = 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide';
const outlineBtn = 'btn border border-brand text-brand hover:bg-brand hover:text-white uppercase tracking-wide';
const gradientBg = 'bg-[linear-gradient(135deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)]';

function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-body">
      <span aria-hidden className="mt-1 shrink-0 text-brand">
        ✓
      </span>
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

function IconBadge({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
      <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
    </span>
  );
}

/** Hero visual: one agent moving from pilot to production, with the FDE + FDC pod beside it. */
function HeroVisual() {
  const track = [
    { label: 'Assessment', sub: '2 weeks', state: 'done' as const },
    { label: 'Production Pilot', sub: '8 to 12 weeks', state: 'active' as const },
    { label: 'Run and Tune', sub: 'Monthly', state: 'next' as const },
  ];
  return (
    <figure aria-label="Illustration of one AI agent moving from assessment to production with a forward deployed team">
      <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-cardHover lg:p-7">
        <div className="flex items-center gap-3 border-b border-surface-line pb-4">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${gradientBg} text-white`}>
            <Bot aria-hidden="true" size={20} />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">Service desk agent</p>
            <p className="text-xs text-body">Copilot Studio · Microsoft Foundry · Fabric</p>
          </div>
          <span className="ml-auto rounded-full bg-[#E7F7EE] px-2.5 py-1 text-[11px] font-medium text-[#137A3E]">
            Pilot to production
          </span>
        </div>

        <ol className="mt-5 space-y-3">
          {track.map((t) => (
            <li
              key={t.label}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                t.state === 'active' ? 'border-brand bg-brand/5' : 'border-surface-line'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  t.state === 'done'
                    ? 'bg-brand text-white'
                    : t.state === 'active'
                      ? 'bg-white text-brand ring-2 ring-brand'
                      : 'bg-surface-chip text-body'
                }`}
              >
                {t.state === 'done' ? <BadgeCheck aria-hidden="true" size={15} /> : track.indexOf(t) + 1}
              </span>
              <span className="text-sm font-semibold text-ink">{t.label}</span>
              <span className="ml-auto text-xs text-body">{t.sub}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-chip px-3 py-1 text-[11px] font-medium text-brand">
            <ShieldCheck aria-hidden="true" size={12} /> Person reviews the agent’s work
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-chip px-3 py-1 text-[11px] font-medium text-brand">
            <Layers aria-hidden="true" size={12} /> Test set rerun on every change
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-surface-line pt-5">
          {team.map((m) => (
            <div key={m.short} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                {m.short}
              </span>
              <span className="text-xs leading-snug text-body">{m.role}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

export default function ForwardDeployedEngineeringPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <span className="eyebrow">Forward Deployed Engineering · Azure AI</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl xl:text-[3.4rem]">
              Azure AI <span className="text-brand">Forward Deployed Engineering</span> Services
            </h1>
            <p className="mt-6 max-w-xl text-body lg:text-lg">
              Forward deployed engineering is a service delivered by Folio3 experts who join your team. A forward
              deployed engineer and a consultant work out where AI will pay off, build it on Azure, and stay until it
              runs in production and moves the number it was meant to move.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ASSESSMENT_HREF} className={primaryBtn}>
                {CTA_ASSESSMENT}
              </Link>
              <Link href="#how" className={outlineBtn}>
                See how it works
              </Link>
            </div>
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-body/80">Microsoft Solutions Partner</p>
              <ul className="mt-3 grid max-w-xl grid-cols-3 gap-2 sm:grid-cols-5">
                {designations.map((d) => (
                  <li
                    key={d.src}
                    className="flex aspect-[352/238] items-center justify-center overflow-hidden rounded-lg border border-surface-line bg-white shadow-card"
                  >
                    <Image
                      src={d.src}
                      alt={d.alt}
                      width={d.w}
                      height={d.h}
                      sizes="7rem"
                      className={d.pad ? 'h-auto w-full px-2' : 'h-full w-full object-contain'}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Reveal animation="zoomIn">
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand">
        <nav aria-label="Breadcrumb" className="container-x py-3 text-sm text-white/90">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="px-2">/</span>
          <span aria-current="page">Forward Deployed Engineering</span>
        </nav>
      </div>

      {/* Why AI adoption remains a hurdle */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Why AI Adoption Remains a Hurdle in the Modern Workplace">
            <p className="mt-4 text-body">
              Most AI tools are chosen from a demo, rolled out from above, and never fitted to the way teams actually
              work. So people go back to the old way, or to their own AI apps, and the investment shows no return.
            </p>
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {hurdles.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 70}>
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

      {/* Full-scope services */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="FDE Services" title="Full-Scope Forward Deployed Engineering Services">
            <p className="mt-4 text-body">
              From the first assessment through to run and tune after go-live, one Folio3 team covers the complete
              scope of an engagement.
            </p>
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={(i % 3) * 70}>
                <div className="group h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card transition-shadow duration-200 hover:shadow-cardHover">
                  <IconBadge Icon={c.Icon} />
                  <h3 className="mt-5 text-xl font-semibold text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href={ASSESSMENT_HREF} className={primaryBtn}>
              Book an assessment
            </Link>
          </div>
        </div>
      </section>

      {/* The team */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="The Team That Delivers It">
            <p className="mt-4 text-body">
              The service is delivered by two roles. Both work alongside your team for the length of the engagement.
            </p>
          </SectionHead>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {team.map((m, i) => (
              <Reveal key={m.role} animation={i === 0 ? 'fadeInLeft' : 'fadeInRight'} className="h-full">
                <div className="group h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card transition-shadow duration-200 hover:shadow-cardHover lg:p-8">
                  <div className="flex items-center gap-4">
                    <IconBadge Icon={m.Icon} />
                    <h3 className="text-xl font-semibold text-ink">{m.role}</h3>
                  </div>
                  <p className="mt-4 font-medium text-ink/90">{m.lead}</p>
                  <ul className="mt-5 space-y-3 text-sm">
                    {m.points.map((p) => (
                      <Check key={p}>{p}</Check>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal animation="fadeInUp" className="mx-auto mt-10 max-w-5xl">
            <div className="flex flex-col gap-4 rounded-2xl bg-surface-tint p-6 lg:flex-row lg:items-center">
              <Link href="/ai-scenario-library/" className="shrink-0 font-semibold text-brand underline">
                Custom AI agents on Azure:
              </Link>
              <ul className="flex flex-wrap gap-2">
                {agentLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-block rounded-full border border-surface-line bg-white px-3 py-1.5 text-sm text-ink transition-colors hover:border-brand hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How an engagement works */}
      <section id="how" className="scroll-mt-24 bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="How an Engagement Works">
            <p className="mt-4 text-body">
              Three stages. Each ends with something you can check, and you can stop after any of them.
            </p>
          </SectionHead>
          <ol className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
            <span
              aria-hidden
              className="absolute bottom-8 left-8 top-8 w-0.5 bg-gradient-to-b from-brand via-brand/60 to-[#2F69F2]/40 lg:bottom-auto lg:left-[16.66%] lg:right-[16.66%] lg:top-8 lg:h-0.5 lg:w-auto lg:bg-gradient-to-r"
            />
            {stages.map((s, i) => (
              <li key={s.title} className="relative">
                <Reveal
                  animation="fadeInUp"
                  delay={i * 90}
                  className="group flex items-start gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
                >
                  <span
                    className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${gradientBg} text-white shadow-cardHover ring-8 ring-surface-tint transition-transform duration-300 group-hover:scale-110`}
                  >
                    <s.Icon aria-hidden="true" size={22} strokeWidth={1.9} />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand shadow-card">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand shadow-card">
                      {s.duration}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body lg:mx-auto lg:max-w-xs">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Engagement options */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Engagement Options">
            <p className="mt-4 text-body">
              The service is the same at every size. What changes is how many experts join your team.
            </p>
          </SectionHead>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {options.map((o, i) => (
              <Reveal key={o.name} animation="fadeInUp" delay={i * 70} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-2xl border p-7 shadow-card transition-shadow duration-200 hover:shadow-cardHover ${
                    o.highlight ? 'border-brand bg-brand/[0.03] ring-1 ring-brand' : 'border-surface-line bg-white'
                  }`}
                >
                  <h3 className="text-xl font-semibold text-ink">{o.name}</h3>
                  <div className="mt-5 border-t border-surface-line pt-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand">What You Get</h4>
                    <p className="mt-2 text-sm leading-relaxed text-body">{o.get}</p>
                  </div>
                  <div className="mt-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand">Best For</h4>
                    <p className="mt-2 text-sm leading-relaxed text-body">{o.best}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="Results From Folio3 Azure AI Projects" />
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {results.map((r, i) => (
              <Reveal key={r.title} animation="fadeInUp" delay={i * 70} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card transition-shadow duration-200 hover:shadow-cardHover">
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-chip">
                    <Image
                      src={r.img.src}
                      alt={r.alt}
                      width={r.img.w}
                      height={r.img.h}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-4xl font-bold text-brand">{r.stat}</p>
                    <h3 className="mt-2 text-xl font-semibold text-ink">{r.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{r.text}</p>
                    <Link
                      href={r.href}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                    >
                      Read the case study <ArrowRight aria-hidden="true" size={15} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="People Also Ask" />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <OneToOneCTA
        formTitle="Bring One Agent. We Will Tell You if It Is Ready for Production."
        formCopy="The assessment takes two weeks. You get a baseline, a run-cost estimate and a pilot plan, or a clear reason not to proceed."
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
