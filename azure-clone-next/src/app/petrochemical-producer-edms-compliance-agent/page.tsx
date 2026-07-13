import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCaptured, getFaq, localImg } from '@/lib/content';
import { OrderedRenderer } from '@/components/OrderedRenderer';
import styles from './styles.module.css';

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

  // Delegate every non-hero section to the shared renderer (temporary until each is converted).
  const rest = { ...page, sections: page.sections.filter((s) => !(s.items ?? []).some((i) => i.t === 'h' && i.tag === 'h1')) };

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

      {/* remaining sections (shared renderer) — converted one story at a time */}
      <OrderedRenderer page={rest} title={TITLE} slug={SLUG} faq={faq} />
    </>
  );
}
