import type { Metadata } from 'next';
import Link from 'next/link';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Accordion } from '@/components/sections/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

// Bespoke industry landing page (verbatim marketing copy from the manufacturing
// brief). Reuses the site design system: container-x, btn-*, eyebrow, card-hover,
// Reveal entrance animations, Breadcrumb, Accordion (emits FAQPage JSON-LD) and the
// shared OneToOneCTA lead form (id="pgForm"), which is the site-wide assessment/
// contact destination the primary CTAs point to. Built as its own route so it can
// carry a hero stat strip, a custom case-study band and a per-page FAQ, none of
// which the generic captured renderer supports.
const CANONICAL = 'https://azure.folio3.com/industries/manufacturing/';
const OG_IMAGE = '/wp-content/uploads/2023/11/manufacturing-top-banner-img.webp';
const FORM = '#pgForm'; // on-page assessment/contact form (OneToOneCTA)
const CONTACT = '/contact-us/';

const META_TITLE = 'Azure Cloud for Manufacturing | Folio3 Azure';
const META_DESCRIPTION =
  'Folio3 modernizes manufacturers on Microsoft Azure, Dynamics 365, and Power Platform, connecting the shop floor to the top floor with cloud, IoT, and AI.';

export const metadata: Metadata = {
  // absolute so the layout template ("%s | Folio3 Azure") does not double the brand
  title: { absolute: META_TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: '/industries/manufacturing/' },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL,
    type: 'website',
    siteName: 'Folio3 Azure',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/** Icon box matching the site's CardIcon styling (surface-chip box, brand glyph). */
function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-chip text-brand">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        {children}
      </svg>
    </span>
  );
}

// FOLD 1 - hero stat strip. The years figure from the brief was left as a bracketed
// slot pending a verified number, so it is phrased without an invented statistic.
const STATS = [
  { big: 'Microsoft', small: 'Solutions Partner' },
  { big: 'Enterprise', small: 'software delivery expertise' },
  { big: 'Discrete + process', small: 'manufacturing expertise' },
];

// FOLD 2 - the problems slowing the plant down.
const PAINS = [
  {
    title: 'Data trapped in silos',
    body: 'Your ERP, MES, shop floor systems, and spreadsheets do not talk to each other, so no one has a single view of production.',
  },
  {
    title: 'Aging on-premises systems',
    body: 'Legacy servers are expensive to maintain, hard to scale for new lines, and a growing security exposure.',
  },
  {
    title: 'Unplanned downtime',
    body: 'Without predictive signals from your equipment, maintenance stays reactive and every stoppage costs output.',
  },
  {
    title: 'Supply chain blind spots',
    body: 'Disruptions reach the line before you see them coming, leaving no room to reroute or reschedule.',
  },
  {
    title: 'Manual quality and compliance',
    body: 'Audit trails live in binders and spreadsheets, putting traceability and certifications at risk.',
  },
  {
    title: 'Paper on the floor',
    body: 'Operators rekey the same data across systems, slowing throughput and introducing errors.',
  },
];

// FOLD 3 - how Folio3 fixes it on Azure.
const SOLUTIONS = [
  {
    title: 'One connected data platform',
    body: 'We unify ERP, shop floor, and operational data in Azure and Dataverse so you get shop-floor-to-top-floor visibility in real time.',
  },
  {
    title: 'Cloud migration and modernization',
    body: 'We move legacy manufacturing workloads to Azure securely, with no rip-and-replace and minimal disruption to production.',
  },
  {
    title: 'Predictive maintenance with IoT',
    body: 'Azure IoT and AI read equipment signals to flag failures before they stop the line.',
  },
  {
    title: 'End-to-end supply chain visibility',
    body: 'Dynamics 365 Supply Chain Management plus real-time data gives you early warning and faster replanning.',
  },
  {
    title: 'Automated quality and compliance',
    body: 'Digital traceability and audit-ready records replace manual tracking across every batch and lot.',
  },
  {
    title: 'Process automation',
    body: 'Power Apps and Power Automate remove paper and rekeying, so work moves without friction.',
  },
];

// FOLD 4 - what we deliver for manufacturers. Each capability carries a distinct line icon.
const CAPABILITIES = [
  {
    title: 'Azure cloud migration and modernization',
    icon: <><path d="M6 17a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.5-1.5A4 4 0 0 1 17 17z" /><path d="M12 12v6" /><path d="m9 15 3-3 3 3" /></>,
  },
  {
    title: 'IoT and real-time production monitoring',
    icon: <><circle cx="12" cy="12" r="2" /><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" /><path d="M6 6a9 9 0 0 0 0 12M18 6a9 9 0 0 1 0 12" /></>,
  },
  {
    title: 'Predictive maintenance with Azure AI',
    icon: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="3.5" /></>,
  },
  {
    title: 'Manufacturing analytics with Microsoft Fabric and Power BI',
    icon: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  },
  {
    title: 'Dynamics 365 for Supply Chain and Finance',
    icon: <><path d="M3 6h13v9H3z" /><path d="M16 9h3l2 3v3h-5z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>,
  },
  {
    title: 'Power Apps and Power Automate solutions',
    icon: <><path d="m13 2-9 11h6l-2 9 9-11h-6z" /></>,
  },
  {
    title: 'Shop floor data collection',
    icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 20h10M8 8h4M8 12h8" /></>,
  },
  {
    title: 'Quality management and compliance',
    icon: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="m9 11 2 2 4-4" /></>,
  },
  {
    title: 'EDI and system integration',
    icon: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.2 10.8 15.8 7.2M8.2 13.2l7.6 3.6" /></>,
  },
  {
    title: 'Security, governance, and disaster recovery',
    icon: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><circle cx="12" cy="11" r="2" /><path d="M12 13v3" /></>,
  },
];

// FOLD 6 - manufacturing sub-verticals. None have dedicated pages yet, so these render
// as plain chips (no links) rather than pointing at routes that do not exist.
const SUB_VERTICALS = [
  'Discrete manufacturing',
  'Process manufacturing',
  'Food manufacturing',
  'Industrial equipment and machinery',
  'Packaging',
  'Chemicals',
  'Consumer packaged goods',
  'Electronics and high tech',
  'Automotive and components',
  'Aerospace and defense',
];

// FOLD 8 - FAQs.
const FAQ = [
  {
    q: 'Why run manufacturing operations on Azure instead of on-premises?',
    a: 'Azure gives you elastic capacity for new lines, built-in security and disaster recovery, and native AI and IoT services, without the cost of maintaining aging hardware.',
  },
  {
    q: 'Do you support both discrete and process manufacturing?',
    a: 'Yes. We deliver for both, including food manufacturing, chemicals, industrial equipment, and packaging.',
  },
  {
    q: 'How do you migrate without disrupting production?',
    a: 'We phase migrations, run systems in parallel where needed, and validate at each step so the line keeps moving.',
  },
  {
    q: 'Can you integrate with our existing MES, ERP, and shop floor systems?',
    a: 'Yes. Integration and EDI are core to what we do, so your current investments keep working while new capabilities come online.',
  },
  {
    q: 'How do you approach predictive maintenance and IoT?',
    a: 'We connect equipment through Azure IoT, then apply Azure AI to surface failure signals early and reduce unplanned downtime.',
  },
  {
    q: 'What about security and compliance?',
    a: 'Security, governance, traceability, and audit-ready records are built into every engagement.',
  },
  {
    q: 'Is Folio3 a Microsoft partner?',
    a: 'Yes, Folio3 is a Microsoft Solutions Partner.',
  },
];

export default function ManufacturingIndustryPage() {
  return (
    <>
      {/* FOLD 1 - HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Industries / Manufacturing</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">
              Cloud Built for the Way Manufacturers <span className="text-brand">Actually Run</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-body">
              Connect the shop floor to the top floor, retire aging systems, and turn production data into decisions. As a Microsoft Solutions Partner, Folio3 modernizes manufacturers on Azure, Dynamics 365, and Power Platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={FORM} className="btn bg-brand-navy uppercase tracking-wide text-white hover:bg-brand">Book a Manufacturing Cloud Assessment</Link>
              <Link href={CONTACT} className="btn border border-brand-navy uppercase tracking-wide text-brand-navy hover:bg-brand-navy hover:text-white">Talk to an Azure Expert</Link>
            </div>
            <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.big} className="border-l-2 border-brand pl-4">
                  <dt className="text-xl font-bold text-ink">{s.big}</dt>
                  <dd className="mt-1 text-sm text-body">{s.small}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Breadcrumb name="Manufacturing" />

      {/* FOLD 2 - PAIN POINTS */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The Challenge</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">The problems slowing your plant down</h2></Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PAINS.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 70}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 3 - SOLUTIONS */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The Solution</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">How Folio3 fixes it on Azure</h2></Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 70}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 4 - CAPABILITIES */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Capabilities</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">What we deliver for manufacturers</h2></Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 60}>
                <div className="flex h-full items-start gap-4 rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <div className="shrink-0"><IconBox>{c.icon}</IconBox></div>
                  <h3 className="text-base font-semibold text-ink">{c.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 5 - MID-PAGE CTA BAND */}
      <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-14 lg:py-16">
        <div className="container-x flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white lg:text-3xl">Ready to modernize your plant?</h2>
            <p className="mt-3 text-white/80">Get a clear, no-pressure roadmap for moving your manufacturing operations to the cloud.</p>
          </div>
          <Link href={FORM} className="btn shrink-0 bg-white uppercase tracking-wide text-brand-navy hover:bg-brand-bright hover:text-white">Schedule Your Assessment</Link>
        </div>
      </section>

      {/* FOLD 6 - SUB-VERTICALS */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Industries We Serve</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">Manufacturing expertise across your sub-verticals</h2></Reveal>
            <p className="mt-4 text-body">
              Every plant runs differently. We tailor Azure and Dynamics 365 to how your specific operation makes things.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUB_VERTICALS.map((v, i) => (
              <Reveal key={v} animation="fadeInUp" delay={i * 50}>
                <div className="flex h-full items-center gap-3 rounded-xl border border-surface-line bg-surface-tint px-5 py-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-brand"><path d="M20 6 9 17l-5-5" /></svg>
                  <span className="text-sm font-medium text-ink">{v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOLD 7 - CASE STUDY */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Case Study</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">Proof from the plant floor</h2></Reveal>
          </div>
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-surface-line bg-white p-8 shadow-card lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">TricorBraun, Packaging</p>
            <p className="mt-5 text-lg leading-relaxed text-body">
              TricorBraun needed to modernize how its teams accessed and acted on operational data across a distributed business. Folio3 helped consolidate systems on the Microsoft cloud, streamline reporting, and give teams a faster, unified view of the information they rely on daily.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={FORM} className="btn bg-brand-navy uppercase tracking-wide text-white hover:bg-brand">Talk to a Manufacturing Specialist</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOLD 8 - FAQ (Accordion emits FAQPage JSON-LD) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">Manufacturing cloud questions, answered</h2></Reveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* FOLD 9 - CLOSING CTA */}
      <section className="bg-brand-ink py-16 lg:py-20">
        <div className="container-x mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">Manufacturing Cloud Roadmap</span>
          <Reveal animation="fadeInUp"><h2 className="text-3xl text-white lg:text-4xl">Let&apos;s build your manufacturing cloud roadmap</h2></Reveal>
          <p className="mt-5 text-white/70">
            Talk to a Folio3 manufacturing specialist about modernizing on Azure, Dynamics 365, and Power Platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={FORM} className="btn bg-white uppercase tracking-wide text-brand-navy hover:bg-brand-bright hover:text-white">Book Your Assessment</Link>
            <Link href={CONTACT} className="btn border border-white/40 uppercase tracking-wide text-white hover:bg-white hover:text-brand-navy">Contact Us</Link>
          </div>
        </div>
      </section>

      <OneToOneCTA tone="light" />
    </>
  );
}
