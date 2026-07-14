import type { Metadata } from 'next';
import Link from 'next/link';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Accordion } from '@/components/sections/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

// Bespoke Microsoft Power Platform service page (verbatim marketing copy).
// Reuses the site design system: container-x, btn-*, eyebrow, card-hover,
// Reveal entrance animations, Breadcrumb, Accordion (emits FAQPage JSON-LD)
// and the shared OneToOneCTA lead form (id="pgForm"), which is the site-wide
// scoping/contact destination both CTAs point to.
const CANONICAL = 'https://azure.folio3.com/microsoft-power-platform-services/power-automate-consulting-services/';
const OG_IMAGE = '/wp-content/uploads/2024/09/Azure-Herobanner-Illustration-updated-new.webp';
const FORM = '#pgForm'; // on-page scoping/contact form (OneToOneCTA)

const META_TITLE = 'Power Automate Consulting Services | Folio3 Azure';
const META_DESCRIPTION =
  'Folio3 Azure provides Power Automate consulting services that connect SAP, Salesforce, and Dynamics 365 into one data fabric, without custom middleware.';

export const metadata: Metadata = {
  // absolute so the layout template ("%s | Folio3 Azure") does not double the brand
  title: { absolute: META_TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: '/microsoft-power-platform-services/power-automate-consulting-services/' },
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

// "What We Build" - six integrations, each with a distinct simple line icon.
const BUILD_CARDS = [
  {
    title: 'Keep systems in sync',
    body: 'When a customer, order, or invoice changes in SAP, Salesforce, or Dynamics 365, the same record updates in your other systems automatically.',
    icon: <><path d="M4 8a8 8 0 0 1 13-3l3 3" /><path d="M20 4v4h-4" /><path d="M20 16a8 8 0 0 1-13 3l-3-3" /><path d="M4 20v-4h4" /></>,
  },
  {
    title: 'Speed up Quote-to-Cash',
    body: 'Connect CRM, ERP, and finance so a closed deal flows straight into an order, an invoice, and a payment record, with no manual handoffs.',
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.5a2.5 2 0 0 1 2.5-1.5c1.4 0 2.5.7 2.5 1.8 0 2.4-5 1.4-5 3.8 0 1.1 1.1 1.8 2.5 1.8a2.5 2 0 0 0 2.5-1.5" /></>,
  },
  {
    title: 'Process documents with AI',
    body: 'Use AI models in Power Automate and Azure to read invoices, purchase orders, and forms, then post the data into your ERP.',
    icon: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4" /><path d="M9 13h6M9 17h6M9 9h2" /></>,
  },
  {
    title: 'Track the supply chain in real time',
    body: 'Pull shipment, inventory, and supplier updates into one place so your teams see status without checking five different systems.',
    icon: <><path d="M1 3h13v11H1z" /><path d="M14 8h4l3 3v3h-7z" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  },
  {
    title: 'Automate approvals',
    body: 'Route approvals through Microsoft Teams and email, then write the decision back to your system of record automatically.',
    icon: <><path d="M20 6 9 17l-5-5" /><path d="M22 12a10 10 0 1 1-5-8.7" /></>,
  },
  {
    title: 'Automate legacy systems',
    body: 'When a system has no API, we use robotic process automation (RPA) to move data in and out of it safely.',
    icon: <><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M12 8V4M9 4h6" /><circle cx="9" cy="14" r="1" /><circle cx="15" cy="14" r="1" /></>,
  },
];

// "The Cost of Friction" - four seams where data drops.
const FRICTION = [
  {
    title: 'System-to-system: the same record, in three shapes.',
    body: 'SAP, Salesforce, and Dynamics 365 each hold a version of the same customer, order, or invoice. Reconciliation becomes a standing job, and no system holds the truth.',
  },
  {
    title: 'People-to-system: work that waits in inboxes.',
    body: 'Critical steps pause between approvals, spreadsheets, and email. Cycle times stretch not because the work is hard, but because it sits idle between checkpoints.',
  },
  {
    title: 'Cloud-to-cloud: new tools, new seams.',
    body: 'Modern applications and data lakes accumulate faster than integrations can connect them. Each new platform adds another gap for data to fall through.',
  },
  {
    title: 'The middleware tax: custom integration that ages badly.',
    body: 'Bespoke API layers are costly to build, fragile to maintain, and slow to change. The bill arrives twice, once to build it, and again every time the business shifts.',
  },
];

// "The Difference" - commodity automation vs the Folio3 Zero-Friction approach.
// Each dimension carries a line icon (Scope = reach, Focus = aim, Value = growth).
const COMPARISON = [
  {
    dimension: 'Scope',
    icon: <><path d="M4 9V4h5" /><path d="M20 9V4h-5" /><path d="M4 15v5h5" /><path d="M20 15v5h-5" /></>,
    commodity: 'Fixes a single form, email trigger, or list.',
    folio3: 'Connects multi-department, cross-cloud data flows end to end.',
  },
  {
    dimension: 'Focus',
    icon: <><circle cx="12" cy="12" r="7" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /><circle cx="12" cy="12" r="1.5" /></>,
    commodity: 'UI-first bots clicking buttons on a screen.',
    folio3: 'API-first integration built on resilient cloud connectors.',
  },
  {
    dimension: 'Value',
    icon: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
    commodity: 'An employee\'s day made slightly easier.',
    folio3: 'Shorter business cycles, Quote-to-Cash, supply chain, fulfillment.',
  },
];

/** Small brand-tinted glyph used beside each comparison dimension label. */
function DimIcon({ children, className = 'h-4 w-4' }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  );
}

// "The Zero-Friction Framework" - three numbered stages.
const FRAMEWORK = [
  {
    title: 'Operation Friction Audit',
    body: 'We map where data drops between your systems, people, and cloud services, then quantify the cost of each seam in delay and rework.',
  },
  {
    title: 'ZFO Blueprint',
    body: 'A prioritized integration architecture focused on the connections that move the needle, designed API-first for resilience and governance.',
  },
  {
    title: 'Blueprint Implementation',
    body: 'Our Power Automate development services build and harden the integrations on Power Automate and Azure, then instrument them so velocity becomes a number, not an impression.',
  },
];

// "Why Folio3 Azure" - four principles.
const WHY = [
  {
    title: 'API-first by default',
    body: 'Deep, connector-based integrations instead of brittle screen-clicking bots, resilient when systems change.',
  },
  {
    title: 'Cross-cloud fluency',
    body: 'Azure, Dynamics 365, SAP, Salesforce, legacy databases, and modern data lakes connected under one fabric.',
  },
  {
    title: 'Governed for IT',
    body: 'Environments, data-loss policies, monitoring, and security designed into the architecture, not added later.',
  },
  {
    title: 'Velocity you can measure',
    body: 'Every integration is instrumented, so shortened cycle times show up in the metrics leadership already tracks.',
  },
];

const FAQ = [
  {
    q: 'We already run an integration platform. Why add Power Automate?',
    a: 'This is not a rip-and-replace. Within a Microsoft estate, Power Automate and Azure often deliver the same connectivity as a dedicated iPaaS at a materially lower cost and with native governance. We assess what your current platform does well, then use Power Automate to close the gaps it leaves, frequently the cross-cloud and last-mile connections that custom middleware made expensive.',
  },
  {
    q: 'Is this just RPA with a different name?',
    a: 'No. RPA automates the user interface, bots that click buttons and break when a screen changes. Our approach is API-first: integrations connect to systems at the data layer through cloud connectors, which makes them faster, more reliable, and far cheaper to maintain. We use UI automation only where no interface to the data exists.',
  },
  {
    q: 'How is this different from hiring Power Automate consultants by the hour?',
    a: 'Most consulting engagements build the flows you ask for. The Zero-Friction Framework starts a level higher, auditing where friction costs the business, designing an integration architecture around those points, and then implementing it. You receive a blueprint and a measurable outcome, not a queue of disconnected automations.',
  },
  {
    q: 'Will this create a governance or security problem for IT?',
    a: 'The opposite is the intent. Environments, data-loss-prevention policies, connection security, and monitoring are designed into the architecture from the Blueprint stage. The objective is integration that passes enterprise IT review, rather than shadow automation that accumulates outside it.',
  },
  {
    q: 'Which systems can you actually connect?',
    a: 'Microsoft Dynamics 365, Business Central, Azure services, SAP, Salesforce, SQL Server and legacy databases, cloud data lakes, SharePoint, and custom REST APIs, among others. Where a managed connector does not exist, we build a secure custom connector so the integration remains supportable.',
  },
  {
    q: 'What happens in a scoping call?',
    a: 'A focused conversation, with no obligation, to identify where friction is most likely costing you and whether an Operation Friction Audit is justified. You leave with a clear view of the highest-value seams in your environment and the shape an engagement would take.',
  },
  {
    q: 'How much do Power Automate consulting services cost?',
    a: 'Engagements are scoped to the work, not sold per seat. Most start with a fixed-fee Operation Friction Audit, followed by a Blueprint and a quoted implementation. Microsoft licensing for Power Automate is separate and billed by Microsoft. You will have a clear price before any build work begins.',
  },
  {
    q: 'What does a Power Automate consulting engagement include?',
    a: 'A typical engagement includes four things: an audit of where data is dropping, an integration blueprint, the build and testing of the integrations on Power Automate and Azure, and the governance and monitoring to keep them running. Support and handover are included.',
  },
];

export default function PowerAutomateConsultingServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Microsoft Power Platform Services</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">Power Automate Consulting Services</h1>
            <p className="mt-6 text-xl text-ink/80">Power Automate consulting for the fractured enterprise.</p>
            <p className="mt-5 max-w-2xl text-lg text-body">
              Large organizations rarely have a task problem. They have a connection problem, multi-million-dollar platforms that refuse to share data. Folio3 Azure delivers Power Automate consulting services that connect your line-of-business systems into one data fabric, without the cost and fragility of custom middleware.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={FORM} className="btn bg-brand-navy uppercase tracking-wide text-white hover:bg-brand">Book a Scoping Call</Link>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumb name="Power Automate Consulting Services" />

      {/* WHAT ARE POWER AUTOMATE CONSULTING SERVICES */}
      <section className="py-16 lg:py-24">
        <div className="container-x mx-auto max-w-3xl">
          <Reveal animation="fadeInUp">
            <h2 className="text-3xl lg:text-4xl">What are Power Automate consulting services?</h2>
          </Reveal>
          <p className="mt-6 text-body">
            Power Automate consulting services are professional services that plan, build, and run automated workflows and system integrations using Microsoft Power Automate. Folio3 Azure uses them to connect enterprise systems, such as SAP, Salesforce, and Microsoft Dynamics 365, so data moves between them automatically, without manual re-entry or custom middleware.
          </p>
          <p className="mt-4 text-body">
            In plain terms: most companies own software that cannot share data. We connect those systems so information flows on its own. This shortens business cycles like Quote-to-Cash and removes the manual work of copying data between tools.
          </p>
        </div>
      </section>

      {/* THE COST OF FRICTION */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The Cost of Friction</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">Friction is expensive, and most of it is invisible.</h2></Reveal>
            <p className="mt-4 text-body">
              Friction is the time, data, and money lost when your systems, people, and apps cannot connect. Every handoff between them is a seam where data can drop, and the business pays for it in delay, rework, and risk long before anyone names the cause.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FRICTION.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-7 shadow-card">
                  <h3 className="text-lg">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THE DIFFERENCE - comparison */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The Difference</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">Stop automating tasks. Start orchestrating operations.</h2></Reveal>
            <p className="mt-4 text-body">
              The market sells workflow automation services as a way to save a few hours on data entry. That framing treats the symptom and ignores the system. Folio3 Azure delivers Power Automate consulting one level up, orchestrating data across departments, clouds, and platforms so the enterprise moves as a single operation.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            {/* Desktop / tablet: designed comparison table */}
            <div className="hidden overflow-hidden rounded-2xl border border-surface-line shadow-card sm:block">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Commodity automation compared with the Folio3 Zero-Friction approach</caption>
                <thead>
                  <tr className="bg-surface-tint">
                    <th scope="col" className="w-32 px-6 py-4 text-sm font-semibold text-muted">&nbsp;</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-ink">Commodity automation</th>
                    <th scope="col" className="border-l-2 border-brand bg-surface-blue px-6 py-4 text-sm font-semibold text-brand">Folio3 Zero-Friction</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.dimension} className="border-t border-surface-line align-top">
                      <th scope="row" className="px-6 py-5 text-sm font-semibold text-ink">
                        <span className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-chip text-brand"><DimIcon>{row.icon}</DimIcon></span>
                          {row.dimension}
                        </span>
                      </th>
                      <td className="px-6 py-5 text-sm leading-relaxed text-body">{row.commodity}</td>
                      <td className="border-l-2 border-brand bg-surface-blue/40 px-6 py-5 text-sm leading-relaxed text-ink">{row.folio3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked two-column cards */}
            <div className="grid gap-5 sm:hidden">
              <div className="rounded-2xl border border-surface-line bg-white p-6 shadow-card">
                <h3 className="text-base font-semibold text-ink">Commodity automation</h3>
                <dl className="mt-4 space-y-4">
                  {COMPARISON.map((row) => (
                    <div key={row.dimension}>
                      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted"><DimIcon className="h-3.5 w-3.5 text-brand">{row.icon}</DimIcon>{row.dimension}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-body">{row.commodity}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-2xl border-2 border-brand bg-surface-blue/40 p-6 shadow-card">
                <h3 className="text-base font-semibold text-brand">Folio3 Zero-Friction</h3>
                <dl className="mt-4 space-y-4">
                  {COMPARISON.map((row) => (
                    <div key={row.dimension}>
                      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand/80"><DimIcon className="h-3.5 w-3.5 text-brand">{row.icon}</DimIcon>{row.dimension}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink">{row.folio3}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD - 6 cards */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">What We Build</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">What Power Automate consulting can do for you.</h2></Reveal>
            <p className="mt-4 text-body">
              Here are common integrations Folio3 Azure builds with Power Automate. Each one connects systems that usually cannot share data on their own.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BUILD_CARDS.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 70}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <div className="mb-4"><IconBox>{c.icon}</IconBox></div>
                  <h3 className="text-lg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THE ZERO-FRICTION FRAMEWORK - 3 numbered steps */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">The Zero-Friction Framework</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">A method, not a pile of flows.</h2></Reveal>
            <p className="mt-4 text-body">
              Three stages move an operation from invisible friction to measured velocity. Each one produces a deliverable you can hold leadership accountable to.
            </p>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {FRAMEWORK.map((s, i) => (
              <Reveal key={s.title} animation="fadeInUp" delay={i * 90}>
                <li className="h-full rounded-2xl border border-surface-line bg-white p-7 shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">{i + 1}</span>
                  <h3 className="mt-5 text-lg">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY FOLIO3 AZURE - 4 items */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Why Folio3 Azure</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">Built for the enterprise, governed for IT.</h2></Reveal>
            <p className="mt-4 text-body">
              Orchestration at this scale only earns its place if it is resilient, secure, and measurable. Our Power Automate experts hold to these principles across every engagement.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <h3 className="text-lg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MICROSOFT POWER AUTOMATE PARTNER */}
      <section className="py-16 lg:py-24">
        <div className="container-x mx-auto max-w-4xl">
          <div className="max-w-3xl">
            <span className="eyebrow">Microsoft Power Automate Partner</span>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">Microsoft Power Automate consulting, delivered Azure-native.</h2></Reveal>
          </div>
          <ul className="mt-8 space-y-4">
            {[
              'Our Microsoft Power Automate consultants apply Power Automate and Azure expertise to enterprise integration, not single-task automation.',
              'A repeatable framework that produces an architecture and a measurable outcome, not a backlog of flows.',
              'Integration patterns built to satisfy enterprise IT review, the standard for Microsoft Power Platform consulting at scale.',
            ].map((t) => (
              <li key={t} className="flex gap-3 text-body">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-5 w-5 shrink-0 text-brand"><path d="M20 6 9 17l-5-5" /></svg>
                <span className="leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-surface-line bg-surface-tint p-6">
              <h3 className="text-base font-semibold text-ink">Systems we bridge</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Microsoft Dynamics 365, Microsoft Azure, Business Central, SAP, Salesforce, legacy databases, cloud data lakes, custom REST APIs, SharePoint, SQL Server.
              </p>
            </div>
            <div className="rounded-2xl border border-surface-line bg-surface-tint p-6">
              <h3 className="text-base font-semibold text-ink">Outcomes we accelerate</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Quote-to-Cash, supply chain tracking, order fulfillment, master data sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-brand-ink py-16 lg:py-20">
        <div className="container-x mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">Zero-Friction Operations</span>
          <Reveal animation="fadeInUp"><h2 className="text-3xl text-white lg:text-4xl">Find the friction before it costs another quarter.</h2></Reveal>
          <p className="mt-5 text-white/70">
            Bring the systems that refuse to talk to each other. A scoping call with our Power Automate consulting services team shows you where data is dropping, and what it would take to connect it.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={FORM} className="btn bg-white uppercase tracking-wide text-brand-navy hover:bg-brand-bright hover:text-white">Book a Scoping Call</Link>
          </div>
        </div>
      </section>

      {/* FAQ - Accordion emits FAQPage JSON-LD */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">The questions a CIO actually asks.</h2></Reveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion items={FAQ.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      <OneToOneCTA tone="light" />
    </>
  );
}
