import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  BadgeCheck,
  Calculator,
  ClipboardCheck,
  Coins,
  Database,
  FileText,
  Gauge,
  KeyRound,
  Map as MapIcon,
  Plug,
  Rocket,
  Server,
  ShieldCheck,
  TrendingUp,
  UserRoundX,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/forms/ContactForm';
import { FaqAccordion } from '@/app/ai-agents/fabric-data-agents/FaqAccordion';

const CANONICAL = 'https://azure.folio3.com/forward-deployed-engineering/ai-pilot-to-production-assessment/';
const TITLE = 'AI Pilot to Production Assessment for Azure AI Agents';
const META_DESCRIPTION =
  'AI pilot to production assessment on Azure: in two weeks our engineers review your pilot, data and security, and give you a plan to take it live.';
const H1 = 'AI Pilot to Production Assessment on Azure';
const FORM_HREF = '#request';
const CTA = 'Book the Assessment';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: META_DESCRIPTION, url: CANONICAL, type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: META_DESCRIPTION },
};

type IconCard = { title: string; text: string; Icon: LucideIcon };

const blockers: IconCard[] = [
  {
    title: 'Data Access',
    text: 'The pilot ran on sample or exported data. In production it needs live data, with permissions that someone has approved.',
    Icon: Database,
  },
  {
    title: 'Security',
    text: 'Nobody has agreed what the agent may read and change, so the security review hasn’t signed it off.',
    Icon: ShieldCheck,
  },
  {
    title: 'Cost',
    text: 'Usage costs at full volume are unknown, and nobody will approve a rollout without a number.',
    Icon: Coins,
  },
  {
    title: 'Ownership',
    text: 'No one owns the process or the result. Decisions about the pilot wait, and the pilot stalls with them.',
    Icon: UserRoundX,
  },
];

const checks: IconCard[] = [
  {
    title: 'Workflow and Baseline',
    text: 'They pick one workflow with you, by volume and cost, and measure how it performs today.',
    Icon: Gauge,
  },
  {
    title: 'Data, Licences and Environment',
    text: 'They check that your data, licences and environment can support the workflow in production.',
    Icon: Server,
  },
  {
    title: 'Connecting the Pilot to Live ERP Data',
    text: 'Pilots that need live ERP data often stall at the connection. The assessment checks how the pilot would connect to your ERP and what’s in the way.',
    Icon: Plug,
  },
  {
    title: 'Security and Usage Costs',
    text: 'They review what the pilot can access, and estimate Microsoft’s usage charges at full volume.',
    Icon: KeyRound,
  },
];

const stages: { duration: string; title: string; text: string; Icon: LucideIcon }[] = [
  {
    duration: '2 weeks',
    title: 'Assessment',
    text: 'Your forward deployed engineer and consultant run the readiness checks and give you a go or no-go recommendation.',
    Icon: ClipboardCheck,
  },
  {
    duration: '8 to 12 weeks',
    title: 'Production Pilot',
    text: 'The engineer builds and tests against your past data. The agent goes live with a person reviewing its work, and review is reduced as accuracy holds.',
    Icon: Rocket,
  },
  {
    duration: 'Monthly',
    title: 'Run and Tune',
    text: 'The team monitors accuracy, retests after each Microsoft release wave and sends a monthly report.',
    Icon: Wrench,
  },
];

const deliverables: IconCard[] = [
  {
    title: 'A Baseline',
    text: 'Today’s number for the workflow, so later results have something to be compared against.',
    Icon: TrendingUp,
  },
  { title: 'A Business Case', text: 'What taking the workflow to production should return.', Icon: Calculator },
  { title: 'A Pilot Plan', text: 'The plan for an 8 to 12 week production pilot.', Icon: MapIcon },
  { title: 'A Go or No-Go Recommendation', text: 'A clear recommendation on whether to proceed.', Icon: BadgeCheck },
];

const faqs = [
  {
    q: 'What is an AI pilot to production assessment?',
    a: 'It’s a two-week review that shows what is stopping an AI pilot from going live and what it’ll take to fix it. A Folio3 forward deployed engineer and consultant review the pilot, its data and its security, then hand over a business case and a pilot plan.',
  },
  {
    q: 'How do I move an AI pilot into production with ERP integration?',
    a: 'Start by checking the connection to live ERP data, because that’s where ERP-connected pilots tend to stall. Folio3’s assessment covers that check. After it, a production pilot of 8 to 12 weeks builds and tests the agent against your past data, with a person reviewing its work at go-live.',
  },
  {
    q: 'How do I troubleshoot my AI pilot’s failing connections to live ERP data?',
    a: 'Find where the connection fails before changing anything. The usual places are the pilot’s permissions, the ERP’s API or connector, and the data itself. The assessment looks at each of them as part of its live ERP data check.',
  },
  {
    q: 'What kinds of services help move AI pilots into production?',
    a: 'Forward deployed engineering is the service for this. An engineer and a consultant join your team, take one workflow into production and stay until it runs. Folio3 offers it on Azure, and this assessment is where it starts.',
  },
  {
    q: 'How should I choose support for moving my ERP AI pilot into production?',
    a: 'Ask five questions. Can they show a workflow running in production? Do they know your Microsoft platform in depth? How do they test an agent before go-live? Who owns the code and configuration afterwards? How do they measure the result against a baseline?',
  },
  {
    q: 'What does the Azure AI assessment deliver?',
    a: 'It delivers a baseline for the workflow, a business case, a plan for the production pilot, and a go or no-go recommendation.',
  },
  { q: 'How long does the assessment take?', a: 'The assessment takes two weeks.' },
  {
    q: 'Who carries out the assessment?',
    a: 'A Folio3 forward deployed engineer and a forward deployed consultant carry it out. The engineer reviews the pilot, the data and the environment. The consultant maps how the work is done today and agrees the success measure with the person who owns the process.',
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
    serviceType: 'AI pilot to production assessment',
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Forward Deployed Engineering',
        item: 'https://azure.folio3.com/forward-deployed-engineering/',
      },
      { '@type': 'ListItem', position: 3, name: 'AI Pilot to Production Assessment', item: CANONICAL },
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
const gradientBg = 'bg-[linear-gradient(135deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)]';
const inlineLink = 'font-semibold text-brand underline-offset-4 hover:underline';

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

function CardGrid({ items }: { items: IconCard[] }) {
  return (
    <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((c, i) => (
        <Reveal
          key={c.title}
          animation="fadeInUp"
          delay={i * 80}
          className="group h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card transition-shadow duration-200 hover:shadow-cardHover"
        >
          <IconBadge Icon={c.Icon} />
          <h3 className="mt-5 text-lg font-semibold leading-snug text-ink">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-body">{c.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

const IMG = '/wp-content/uploads/2026';

const reportRows: { label: string; status: string; ok: boolean; Icon: LucideIcon }[] = [
  { label: 'Data access', status: 'Live data approved', ok: true, Icon: Database },
  { label: 'Security', status: 'Agent scope agreed', ok: true, Icon: ShieldCheck },
  { label: 'Live ERP connection', status: 'Connector fix needed', ok: false, Icon: Plug },
  { label: 'Usage cost at full volume', status: 'Estimated', ok: true, Icon: Coins },
];

/** Hero visual: an illustrative assessment readiness report ending in a go recommendation. */
function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-lg">
      <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-cardHover">
        <div className="flex items-center justify-between gap-4 border-b border-surface-line pb-4">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${gradientBg} text-white`}>
              <ClipboardCheck aria-hidden="true" size={20} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">Production Readiness Report</p>
              <p className="text-xs text-body">Example workflow · Week 2 of 2</p>
            </div>
          </div>
          <div className="flex items-center gap-2" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/01/microsoft-copilot-studio-icon.svg`} alt="" className="h-7 w-7" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/11/azure-ai-foundry-icon.svg`} alt="" className="h-7 w-7" />
          </div>
        </div>
        <ul className="mt-4 space-y-2.5">
          {reportRows.map((r) => (
            <li key={r.label} className="flex items-center gap-3 rounded-xl bg-surface-tint px-3 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand">
                <r.Icon aria-hidden="true" size={16} />
              </span>
              <span className="flex-1 text-sm font-medium text-ink">{r.label}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  r.ok ? 'bg-[#E7F7EE] text-[#137A3E]' : 'bg-[#FEF3C7] text-[#92400E]'
                }`}
              >
                {r.status}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-body">
          {['Baseline', 'Business case', 'Pilot plan'].map((d) => (
            <span key={d} className="rounded-lg border border-surface-line px-2 py-2">
              <span aria-hidden className="mr-1 text-brand">✓</span>
              {d}
            </span>
          ))}
        </div>
        <div className={`mt-4 flex items-center justify-between rounded-xl ${gradientBg} px-4 py-3 text-white`}>
          <span className="text-sm font-medium">Recommendation</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand">
            <BadgeCheck aria-hidden="true" size={14} /> GO<span className="hidden sm:inline"> · Start production pilot</span>
          </span>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-xl border border-surface-line bg-white px-4 py-3 shadow-card sm:flex lg:-left-10">
        <Rocket aria-hidden="true" size={18} className="text-brand" />
        <div className="leading-tight">
          <p className="text-xs font-semibold text-ink">Next: Production Pilot</p>
          <p className="text-[11px] text-body">8 to 12 weeks</p>
        </div>
      </div>
      <figcaption className="sr-only">
        Illustrative readiness report from the two-week assessment, showing data, security, ERP connection and cost
        checks, the deliverables, and a go recommendation.
      </figcaption>
    </figure>
  );
}

export default function AiPilotToProductionAssessmentPage() {
  return (
    <>
      {/* Hero + request form */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <span className="eyebrow">Forward Deployed Engineering · Azure AI</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-ink lg:text-5xl xl:text-[3.4rem]">
              AI Pilot to <span className="text-brand">Production Assessment</span> on Azure
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Folio3&apos;s two-week assessment is for teams whose AI pilot or proof of concept hasn&apos;t reached
              production. A forward deployed engineer and consultant review your pilot, data and security, and give
              you a plan for taking the AI POC to production.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={FORM_HREF} className={primaryBtn}>
                {CTA}
              </Link>
              <Link href="#checks" className={outlineBtn}>
                Learn More
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-ink">
              {['2-week fixed scope', 'One workflow', 'Go or no-go recommendation'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden className="text-brand">✓</span>
                  {t}
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
          <Link href="/forward-deployed-engineering/" className="hover:underline">Forward Deployed Engineering</Link>
          <span className="px-2">/</span>
          <span aria-current="page">AI Pilot to Production Assessment</span>
        </nav>
      </div>

      {/* Why AI Pilots Fail */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Common Blockers" title="Why AI Pilots Fail to Reach Production">
            <p className="mt-4 text-body">
              If your AI pilot has stalled, the first help it needs is someone to find what&apos;s blocking it. On
              Azure, the blocker is usually one of these four.
            </p>
          </SectionHead>
          <CardGrid items={blockers} />
        </div>
      </section>

      {/* Readiness Checks */}
      <section id="checks" className="scroll-mt-28 bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="What We Review" title="AI Production Readiness Checks">
            <p className="mt-4 text-body">
              The assessment is an AI production readiness review of one workflow. Folio3&apos;s engineer and
              consultant check four areas.
            </p>
          </SectionHead>
          <CardGrid items={checks} />
        </div>
      </section>

      {/* Three stages */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="The Path to Production" title="How to Move an AI Agent From Pilot to Production">
            <p className="mt-4 text-body">
              Moving an AI agent from pilot to production takes three stages. The assessment is the first, and each
              stage has a fixed scope.
            </p>
          </SectionHead>
          <ol className="relative mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-3 lg:gap-8">
            <span
              aria-hidden
              className="absolute bottom-8 left-8 top-8 w-0.5 bg-gradient-to-b from-brand via-brand/60 to-[#2F69F2]/40 lg:bottom-auto lg:left-[16.67%] lg:right-[16.67%] lg:top-8 lg:h-0.5 lg:w-auto lg:bg-gradient-to-r"
            />
            {stages.map((s, i) => (
              <li key={s.title} className="relative">
                <Reveal
                  animation="fadeInUp"
                  delay={i * 100}
                  className="group flex items-start gap-5 lg:flex-col lg:items-center lg:text-center"
                >
                  <span
                    className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${gradientBg} text-white shadow-cardHover ring-8 ring-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    <s.Icon aria-hidden="true" size={24} strokeWidth={1.9} />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand shadow-card">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <span className="inline-block rounded-pill bg-surface-chip px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                      {s.duration}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Copilot Studio */}
      <section className={`relative overflow-hidden ${gradientBg} py-16 lg:py-20`}>
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_80%_20%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <Reveal animation="fadeInUp" className="container-x relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-pill bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Copilot Studio Pilots
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white lg:text-4xl">
            Copilot Readiness Assessment for Copilot Studio Pilots
          </h2>
          <p className="mt-4 text-white/90">
            If your pilot is a Copilot Studio agent, the same two weeks work as a{' '}
            <Link
              href="/data-science-ai/microsoft-copilot-consulting/"
              className="font-semibold text-white underline underline-offset-4 hover:no-underline"
            >
              Copilot readiness assessment
            </Link>
            . The review covers the data the agent draws on and what the agent will cost to run at full volume.
          </p>
        </Reveal>
      </section>

      {/* Scope and Deliverables */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Fixed Scope" title="Azure AI Assessment Scope and Deliverables">
            <p className="mt-4 text-body">
              The Azure AI assessment has a fixed scope: one workflow, reviewed over two weeks. It ends with four
              deliverables.
            </p>
          </SectionHead>
          <CardGrid items={deliverables} />
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal
            animation="fadeInUp"
            className="mx-auto flex max-w-4xl flex-col gap-6 rounded-2xl border border-surface-line bg-white p-8 shadow-card sm:flex-row sm:items-start lg:p-10"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <FileText aria-hidden="true" size={26} strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-2xl lg:text-3xl">Next Steps After the Assessment</h2>
              <p className="mt-4 text-body">
                After a go recommendation, the production pilot starts. Scaling AI pilots to more workflows is the job
                of Folio3&apos;s{' '}
                <Link href="/forward-deployed-engineering/" className={inlineLink}>
                  forward deployed engineering services
                </Link>
                .
              </p>
              <p className="mt-3 text-body">
                For pilots that answer managers&apos; questions from Fabric data, see{' '}
                <Link href="/ai-agents/fabric-data-agents/" className={inlineLink}>
                  Fabric data agent implementation
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Book the Assessment */}
      <section className="relative overflow-hidden bg-brand-ink py-16 lg:py-20">
        <Reveal animation="fadeInUp" className="container-x mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-white lg:text-4xl">{CTA}</h2>
          <p className="mt-4 text-white/80">
            If you&apos;re looking for guidance on taking an AI pilot into production, this is where to start. Tell
            Folio3 about your platform, your workflow and its monthly volume.
          </p>
          <Link href={FORM_HREF} className={`${whiteBtn} mt-8`}>
            {CTA}
          </Link>
        </Reveal>
      </section>

      {/* People Also Ask */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead title="People Also Ask">
            <p className="mt-4 text-body">
              Answers to the questions teams ask most about getting an AI pilot into production.
            </p>
          </SectionHead>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Request form (before the footer) */}
      <section id="request" className="scroll-mt-28 bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal animation="fadeInLeft">
            <span className="eyebrow">Two Weeks · One Workflow</span>
            <h2 className="mt-3 text-3xl lg:text-4xl">{CTA}</h2>
            <p className="mt-4 text-body">
              Tell Folio3 about your platform (Copilot Studio, Azure AI Foundry, Microsoft Fabric or Microsoft 365
              Copilot), your workflow, its monthly volume and your timeline.
            </p>
            <ul className="mt-6 space-y-3 text-body">
              {deliverables.map((d) => (
                <li key={d.title} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 text-brand">✓</span>
                  <span>{d.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal animation="fadeInRight">
            <div className="rounded-2xl bg-white p-8 shadow-cardHover">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

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
