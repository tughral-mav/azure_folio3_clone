import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCaptured, getFaq, localImg } from '@/lib/content';
import { OrderedRenderer } from '@/components/OrderedRenderer';
import { Reveal } from './Reveal';
import { KeyFeaturesTabs } from './KeyFeaturesTabs';
import styles from './styles.module.css';

const OUTCOMES = [
  { stat: '50% to 70%', desc: 'faster access to workflow, approval status, and assigned items.' },
  { stat: '70% to 90%', desc: 'less effort preparing due, overdue, pending, and expired reports' },
  { stat: '40% to 60%', desc: 'fewer avoidable rework and rejection cycles before initiation' },
  { stat: '30% to 50%', desc: 'less document preparation time through guided authoring.' },
  { stat: '60% to 80%', desc: 'faster document discovery through natural language search.' },
  { stat: '2x to 3x', desc: 'faster creation of a submission-ready document' },
];

const ICON = '/wp-content/uploads/2026/07/pc';
const FACTS = [
  { icon: `${ICON}/about-0.svg`, label: 'KSA' },
  { icon: `${ICON}/about-1.svg`, label: 'Petrochemicals and Refining' },
  { icon: `${ICON}/about-2.svg`, label: '3,000+ employees' },
];
const IMPACTS = [
  { icon: `${ICON}/problem-1.svg`, label: 'Manual operational reporting' },
  { icon: `${ICON}/problem-2.svg`, label: 'Unclear workflow status' },
  { icon: `${ICON}/problem-3.svg`, label: 'Avoidable document rework' },
];
const NEEDS = [
  'Natural language search across the full controlled-document library',
  'A single conversational entry point for status and assigned work',
  'On-demand reports for due, overdue, pending, and expired documents',
  'Guided authoring that applies the correct template automatically',
  'Automated compliance validation before the approval workflow',
  'Grounded answers with citations back to source documents',
].map((label, i) => ({ icon: `${ICON}/need-${i}.svg`, label }));
const SOLUTIONS = [
  'EDMS Agent grounded in SharePoint, with cited answers',
  'Workflow Tracker Agent for status and assigned items',
  'Report Generation Agent that exports to Excel',
  'Guided editor that auto-populates Word templates',
  'Validation service that flags exact compliance errors',
  'Access through Microsoft Teams and Power Apps Copilot Chat',
  'Vector and semantic search with WorkIQ grounding',
  'An end to manual navigation of nested folders',
].map((label, i) => ({ icon: `${ICON}/sol-${i}.svg`, label, n: i + 1 }));

/**
 * Dedicated, pixel-matched rebuild of the live case study
 * (/petrochemical-producer-edms-compliance-agent/). Built section-by-section under the
 * BMAD workflow (docs/bmad/pixel-perfect-plan.md). Sections already converted render
 * bespoke here; the remainder is delegated to the shared OrderedRenderer until converted.
 * Reserved from the [...slug] catch-all in getMarketingSlugs().
 */

const SLUG = 'petrochemical-producer-edms-compliance-agent';
const ORIGIN = 'https://azure.folio3.com';
const TITLE = 'Petrochemical Producer EDMS Compliance Agent';

export function generateMetadata(): Metadata {
  const page = getCaptured(SLUG);
  if (!page) return {};
  const title = page.meta.title.replace(/\s*[|–—-]\s*Folio3(\s*Azure)?\s*$/i, '').trim() || page.meta.title;
  const description = page.meta.description ?? undefined;
  const ogImage = page.meta.ogImage?.replace(/^https?:\/\/[^/]+/, '') || undefined;
  return {
    title,
    description,
    alternates: { canonical: `/${SLUG}/` },
    openGraph: { title, description, type: 'website', url: `/${SLUG}/`, ...(ogImage ? { images: [ogImage] } : {}) },
  };
}

export default function Page() {
  const page = getCaptured(SLUG);
  if (!page) notFound();
  const faq = getFaq(SLUG);

  // Hero (bespoke): split the H1 so "by up to 90%" is highlighted like the live.
  const h1 = 'A KSA Petrochemical Producer Cut Report Preparation Time by up to 90% with Microsoft Copilot Studio';
  const [h1Head, h1Tail] = h1.split('by up to 90%');
  const heroImg = localImg(`${ORIGIN}/wp-content/uploads/2026/07/petro-chemical-company.webp`);

  // Sections through "What The Client Needed" are bespoke below; delegate the rest (from the
  // "One Grounded…" solution section onward) to the shared renderer until each is converted.
  const restIdx = page.sections.findIndex((s) => (s.items ?? []).some((i) => i.t === 'h' && /Ready to modernize your document management/i.test(i.text)));
  const rest = { ...page, sections: restIdx >= 0 ? page.sections.slice(restIdx) : page.sections.filter((s) => !(s.items ?? []).some((i) => i.t === 'h' && i.tag === 'h1')) };

  const pageUrl = `${ORIGIN}/${SLUG}/`;
  const webPageLd = { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: page.meta.title, description: page.meta.description, isPartOf: { '@id': `${ORIGIN}/#website` }, breadcrumb: { '@id': `${pageUrl}#breadcrumb` }, inLanguage: 'en-US' };
  const breadcrumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` }, { '@type': 'ListItem', position: 2, name: TITLE, item: pageUrl }] };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ---------- Story 1: Hero ---------- */}
      <section className={styles.hero}>
        <div className="container-x">
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>A leading petrochemical producer</p>
              <h1 className={styles.h1}>{h1Head}<span className={styles.hl}>by up to 90%</span>{h1Tail}</h1>
              <p className={styles.heroSub}>Approval visibility, on-demand reporting, and template compliance, once slow and manual, now run on one SharePoint-grounded system built with Microsoft Copilot Studio and Azure.</p>
              <Link href="#pgForm" className={styles.btnNavy}>Contact us to modernize your document workflows</Link>
            </div>
            <div className={styles.heroImgWrap}>
              <Image src={heroImg} alt="" width={727} height={607} priority className={styles.heroImg} />
            </div>
          </div>
        </div>
      </section>

      {/* breadcrumb */}
      <div className={styles.crumb}>
        <div className="container-x">
          <div className={styles.crumbInner}>
            <Link href="/">Home</Link><span className={styles.crumbSep}>»</span><span>{TITLE}</span>
          </div>
        </div>
      </div>

      {/* ---------- Story 2: About The Client ---------- */}
      <section className={styles.clientBand}>
        <div className="container-x">
          <div className={styles.clientGrid}>
            <div className={styles.facts}>
              {FACTS.map((f) => (
                <div key={f.label} className={styles.fact}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.icon} alt="" className={styles.factIcon} width={46} height={46} />
                  <span className={styles.factLabel}>{f.label}</span>
                </div>
              ))}
            </div>
            <Reveal>
              <p className={styles.clientEyebrow}>About The Client</p>
              <h2 className={styles.clientName}>A Leading Saudi Arabian Petrochemical Producer</h2>
              <p className={styles.clientDesc}>Our client is a leading petrochemical producer in Saudi Arabia (KSA), formed as a joint venture between two global energy and chemical leaders. It runs one of the largest integrated refining and petrochemical complexes in the Kingdom, supplying hydrocarbons and petrochemical products used worldwide in plastics, fuels, packaging, detergents, and automotive components.</p>
              <p className={styles.clientDesc}>An operation this size runs on controlled documentation. More than 4,000 approved procedures, policies, charters, and manuals live in an Electronic Document Management System (EDMS) built on Power Apps and SharePoint. The system was only ever as useful as how fast its people could work inside it.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Story 3: The Problem ---------- */}
      <section className={styles.problem}>
        <div className="container-x">
          <div className={styles.problemGrid}>
            <Reveal>
              <div className={styles.problemLeft}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${ICON}/problem-0.svg`} alt="" className={styles.problemIcon} width={70} height={70} />
              <p className={styles.eyebrowBlue}>The Problem</p>
              <h2 className={styles.h2Dark}>Manual Reporting, Unclear Status, and Avoidable Rework</h2>
              <p className={styles.problemDesc}>For a controlled-document operation, storing documents was never the hard part. Seeing them was. Approval status lived out of sight, so learning where a document stood, who owned the next step, or which items were due, overdue, pending, or expired meant clicking through EDMS one screen at a time and assembling reports by hand. Compliance made it worse: strict templates lived in a manual few people read, so documents reached submission with broken formatting and Word content controls, failed review, and came back for rework that added days to every cycle. The friction showed up in three places.</p>
              <Link href="#pgForm" className={styles.btnNavy}>Facing similar challenges?</Link>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h3 className={styles.impactH3}>Key business areas impacted included:</h3>
              <div className={styles.impactList}>
                {IMPACTS.map((it) => (
                  <div key={it.label} className={styles.impactItem}>
                    <span className={styles.impactIconWrap}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.icon} alt="" className={styles.impactIcon} width={34} height={34} />
                    </span>
                    <span className={styles.impactLabel}>{it.label}</span>
                  </div>
                ))}
              </div>
              <p className={styles.searchPara}>Search was the quiet tax underneath all of it. Staff usually knew what a document was for, not its exact file name, identifier, or location, so keyword search fell short and every request began with a hunt through nested SharePoint folders.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Story 4: What The Client Needed ---------- */}
      <section className={styles.needs}>
        <div className="container-x">
          <div className={styles.needsHead}>
            <Reveal><h2 className={styles.h2Dark}>What The Client Needed</h2></Reveal>
          </div>
          <div className={styles.needsGrid}>
            {NEEDS.map((n, i) => (
              <Reveal key={n.label} delay={i * 80}>
                <div className={styles.needCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.icon} alt="" className={styles.needIcon} width={92} height={92} />
                  <h3 className={styles.needTitle}>{n.label}</h3>
                </div>
              </Reveal>
            ))}
          </div>
          <div className={styles.mt36 + ' ' + styles.center}>
            <Link href="#pgForm" className={styles.btnNavy}>Request a call</Link>
          </div>
        </div>
      </section>

      {/* ---------- Story 5: Our Solution ---------- */}
      <section className={styles.solution}>
        <div className="container-x">
          <div className={styles.solHead}>
            <Reveal>
              <p className={styles.solEyebrow}>Folio3 Solution</p>
              <h2 className={styles.solH2}>One Grounded, Conversational Source of Truth</h2>
              <p className={styles.solIntro}>Folio3 built an AI-powered, SharePoint-grounded knowledge and workflow agent on Microsoft Copilot Studio, paired with a custom document generation and validation platform on Azure. A multi-agent assistant now sits in front of the entire EDMS environment. It answers document questions in plain language, routes status and reporting requests to specialized agents, and replies only from approved SharePoint content with citations. A guided editor then populates approved Word templates and validates every document before it enters the approval workflow.</p>
            </Reveal>
          </div>
          <h4 className={styles.solDelivered}>What the solution delivered:</h4>
          <div className={styles.solGrid}>
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.label} delay={(i % 4) * 80}>
                <div className={styles.solCard}>
                  <div className={styles.solNode}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt="" className={styles.solIcon} width={58} height={58} />
                  </div>
                  <div className={styles.solBadge}>{s.n}</div>
                  <h3 className={styles.solTitle}>{s.label}</h3>
                </div>
              </Reveal>
            ))}
          </div>
          <div className={styles.solBtnWrap}>
            <Link href="#pgForm" className={styles.btnNavy}>Modernize your document estate</Link>
          </div>
        </div>
      </section>

      {/* ---------- Story 6: Key Features (tabs) ---------- */}
      <section className={styles.kf}>
        <div className="container-x">
          <h2 className={styles.kfTitle}>Key Features</h2>
          <p className={styles.kfIntro}>The solution delivered three core capability sets, each addressing a specific place where documentation used to slow the business down.</p>
        </div>
        <KeyFeaturesTabs />
      </section>

      {/* ---------- Story 7: Impact & Outcomes ---------- */}
      <section className={styles.outcomes}>
        <div className="container-x">
          <div className={styles.outHead}>
            <Reveal>
              <h2 className={styles.outTitle}>Impact &amp; Outcomes</h2>
              <p className={styles.outIntro}>The solution turned EDMS from a system that depended on manual navigation and exact document knowledge into an intelligent, guided, and compliant experience. Based on the manual steps automated, the estimated impact includes:</p>
            </Reveal>
          </div>
          <div className={styles.outGrid}>
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.stat} delay={(i % 2) * 80}>
                <div className={styles.outCard}>
                  <span className={styles.outStat}>{o.stat}</span>
                  <p className={styles.outDesc}>{o.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className={styles.outBanner}>
            <p className={styles.outBannerText}>The result: a single, grounded, conversational source of truth for controlled documentation that shortened discovery, authoring, and reporting cycles, while preserving the client&apos;s existing document governance and approval processes.</p>
          </div>
        </div>
      </section>

      {/* remaining sections (shared renderer) — CTA, FAQ, lead form */}
      <OrderedRenderer page={rest} title={TITLE} slug={SLUG} faq={faq} />
    </>
  );
}
