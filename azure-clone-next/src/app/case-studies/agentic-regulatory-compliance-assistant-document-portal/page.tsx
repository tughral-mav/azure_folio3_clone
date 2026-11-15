import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import content from '../../../../content-kit/case-studies/agentic-regulatory-compliance-assistant-document-portal.json';

/**
 * Case study: Agentic Regulatory Compliance Assistant & Document Management Portal.
 * White-label (no client name). All copy lives in
 * content-kit/case-studies/agentic-regulatory-compliance-assistant-document-portal.json.
 * Section order + visual language mirror the shared case-study renderer used by
 * /case-studies/agentic-hr-policy-feedback-update-and-reporting-solution/.
 *
 * Images/icons are referenced by their final path. If a file isn't in /public yet, a
 * labelled placeholder renders instead — dropping the file at that path makes it appear.
 */

const c = content;
const SLUG = c.slug;
const ORIGIN = 'https://azure.folio3.com';
const CRUMB = c.card.title;

export function generateMetadata(): Metadata {
  const og = localImg(c.meta.ogImage);
  return {
    // the meta title already carries the "| Folio3 Azure" brand — bypass the layout template
    title: { absolute: c.meta.title },
    description: c.meta.description,
    alternates: { canonical: `/${SLUG}/` },
    openGraph: { title: c.meta.title, description: c.meta.description, type: 'website', url: `/${SLUG}/`, ...(og ? { images: [og] } : {}) },
  };
}

/** Exact-path existence check (no fuzzy variant matching): returns the path if the file is in
 *  /public, else '' so a placeholder renders. */
const localImg = (p: string) => (p && existsSync(path.join(process.cwd(), 'public', p)) ? p : '');

const splitHi = (t: string) => { const w = t.split(' '); if (w.length < 3) return { head: t, tail: '' }; const n = Math.ceil(w.length * 0.6); return { head: w.slice(0, n).join(' ') + ' ', tail: w.slice(n).join(' ') }; };

/** Labelled placeholder shown until the real asset is added at `path`. */
function ImgPlaceholder({ path, className = '' }: { path: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-brand/30 bg-white/60 p-4 text-center ${className}`}>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">Image placeholder</p>
        <p className="mt-1 break-all text-xs text-body">{path.split('/').pop()}</p>
      </div>
    </div>
  );
}

const ICONS: Record<string, string> = {
  location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.7-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.3 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.4"/></svg>',
  industry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h1.5M13.5 7H15M9 11h1.5M13.5 11H15M9 15h1.5M13.5 15H15"/></svg>',
  employees: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7.5" r="3"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.8a3 3 0 0 1 0 5.4M22 20a6.5 6.5 0 0 0-4.3-6.1"/></svg>',
  library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M8 13h8M8 16h5"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><path d="M12 15v2"/></svg>',
  sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 20v-4h-4"/></svg>',
  quote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 10.5h.01M9 10.5c0 1.5-.5 2.5-1.5 3M14 10.5h.01M14 10.5c0 1.5-.5 2.5-1.5 3"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
};
const Icon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span aria-hidden className={`inline-flex ${className}`} dangerouslySetInnerHTML={{ __html: ICONS[name] ?? '' }} />
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden><path d="m5 12 4.5 4.5L19 7" /></svg>
);

export default function Page() {
  const { head, tail } = splitHi(c.hero.h1);
  const heroImg = localImg(c.hero.img);
  const facts = [
    { icon: 'location', label: c.client.location },
    { icon: 'industry', label: c.client.industry },
    // employee count is optional — hidden until a value is set in the content file
    { icon: 'employees', label: c.client.employees },
  ].filter((f) => f.label && f.label.trim());

  const pageUrl = `${ORIGIN}/${SLUG}/`;
  const ogAbs = localImg(c.meta.ogImage);
  const webPageLd = {
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl,
    name: c.meta.title, description: c.meta.description, isPartOf: { '@id': `${ORIGIN}/#website` },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` }, inLanguage: 'en-US',
    ...(ogAbs ? { primaryImageOfPage: { '@type': 'ImageObject', url: `${ORIGIN}${ogAbs}` } } : {}),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${ORIGIN}/case-studies/` },
      { '@type': 'ListItem', position: 3, name: CRUMB, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">{c.card.title}</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">{head}{tail && <span className="text-brand">{tail}</span>}</h1>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={c.hero.cta.href} className="btn bg-brand-navy uppercase tracking-wide text-white hover:bg-brand">{c.hero.cta.text}</Link>
            </div>
          </div>
          <Reveal animation="zoomIn" className="relative">
            {heroImg
              ? <Image src={heroImg} alt="Agentic regulatory compliance assistant on Azure" width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full rounded-2xl shadow-card" priority />
              : <ImgPlaceholder path={c.hero.img} className="aspect-[665/631] w-full" />}
          </Reveal>
        </div>
      </section>
      <div className="bg-brand"><div className="container-x py-3 text-sm text-white/90"><Link href="/" className="hover:underline">Home</Link><span className="px-2">»</span><Link href="/case-studies/" className="hover:underline">Case Studies</Link><span className="px-2">»</span><span>{CRUMB}</span></div></div>

      {/* ---------- Client info strip + About The Client ---------- */}
      <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 text-white lg:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[0.8fr_1.6fr]">
          <div className={`grid gap-5 lg:grid-cols-1 lg:gap-7 lg:border-r lg:border-white/25 lg:pr-10 ${facts.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {facts.map((f) => (
              <div key={f.icon} className="text-center lg:text-left">
                <Icon name={f.icon} className="text-white [&>svg]:h-9 [&>svg]:w-9" />
                <p className="mt-2 text-sm font-semibold leading-snug">{f.label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">{c.client.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold lg:text-4xl">{c.client.name}</h2>
            {c.client.description.map((p, i) => <p key={i} className="mt-4 max-w-2xl leading-relaxed text-white/90">{p}</p>)}
          </div>
        </div>
      </section>

      {/* ---------- Quantified Business Outcomes ---------- */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal animation="fadeInUp"><h2 className="text-center text-3xl font-bold leading-tight text-ink lg:text-4xl">{c.outcomes.heading}</h2></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {c.outcomes.stats.map((s, i) => (
              <Reveal key={s.value} animation="fadeInUp" delay={i * 70}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-[#e9eefb] bg-[#f5f8fe] p-8 text-center card-hover">
                  <span className="text-3xl font-bold leading-tight text-brand lg:text-4xl">{s.value}</span>
                  <p className="mt-3 text-sm leading-relaxed text-body">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-14 max-w-4xl rounded-2xl bg-[#eef3fb] p-8 lg:p-10">
            <h3 className="text-xl font-semibold text-ink">{c.outcomes.areasHeading}</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {c.outcomes.areas.map((a) => <li key={a} className="flex gap-3 text-body"><Check /><span>{a}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- The Customer ---------- */}
      <section className="section bg-surface-tint">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
          <div>
            <Reveal animation="fadeInUp"><h2 className="text-3xl font-bold leading-tight text-ink lg:text-4xl">{c.customer.heading}</h2></Reveal>
            {c.customer.paragraphs.map((p, i) => <p key={i} className="mt-4 leading-relaxed text-body">{p}</p>)}
          </div>
          <ul className="space-y-4">
            {c.customer.bullets.map((b, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 60}>
                <li className="flex gap-4 rounded-2xl border border-surface-line bg-white p-5 shadow-card">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">{i + 1}</span>
                  <span className="leading-relaxed text-body">{b}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- The Problem: What The Company Needed ---------- */}
      <section className="section bg-white">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-16">
          <div className="rounded-2xl bg-[#eef3fb] p-8 lg:p-10">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            </span>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand">{c.needs.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-ink lg:text-4xl">{c.needs.heading}</h2>
            <p className="mt-4 text-body">{c.needs.intro}</p>
            <Link href={c.needs.cta.href} className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:opacity-90">{c.needs.cta.text} <span aria-hidden>→</span></Link>
          </div>
          <ol className="space-y-5">
            {c.needs.items.map((n, i) => (
              <Reveal key={n.text} animation="fadeInUp" delay={i * 60}>
                <li className="flex gap-5">
                  <div className="flex flex-col items-center self-stretch">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Icon name={n.icon} className="[&>svg]:h-7 [&>svg]:w-7" />
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">{i + 1}</span>
                    </span>
                    {i < c.needs.items.length - 1 && <span className="mt-1 w-px flex-1 border-l-2 border-dashed border-brand/25" aria-hidden />}
                  </div>
                  <p className="pt-4 leading-relaxed text-body">{n.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Folio3 Solution (tech icons) ---------- */}
      <section className="section bg-surface-tint">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl font-bold leading-tight text-ink lg:text-4xl">{c.solution.heading}</h2></Reveal>
            <p className="mt-5 text-body">{c.solution.intro}</p>
          </div>
          {c.solution.groups.map((g) => (
            <div key={g.heading} className="mt-14">
              <h3 className="text-center text-xl font-semibold text-ink lg:text-2xl">{g.heading}</h3>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((t, i) => {
                  const icon = localImg(t.icon);
                  return (
                    <Reveal key={t.text} animation="fadeInUp" delay={(i % 3) * 60}>
                      <div className="flex h-full flex-col items-center rounded-2xl border border-surface-line bg-white p-7 text-center shadow-card card-hover">
                        <div className="flex h-20 w-full items-center justify-center">
                          {icon
                            ? <Image src={icon} alt={t.label} width={150} height={80} className="h-auto max-h-20 w-auto max-w-[170px] object-contain" />
                            : <span className="flex h-16 min-w-16 items-center justify-center rounded-xl border-2 border-dashed border-brand/30 px-3 text-xs font-semibold text-brand" title={`Icon placeholder: ${t.icon.split('/').pop()}`}>{t.label}</span>}
                        </div>
                        <p className="mt-5 text-sm leading-relaxed text-body">{t.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- End-to-End Agentic Workflow ---------- */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal animation="fadeInUp"><h2 className="text-center text-3xl font-bold leading-tight text-ink lg:text-4xl">{c.workflow.heading}</h2></Reveal>
          <div className="mt-12 space-y-8">
            {c.workflow.steps.map((s, i) => {
              const img = localImg(s.img);
              return (
                <Reveal key={s.title} animation="fadeInUp">
                  <article className="grid items-center gap-8 rounded-2xl border border-surface-line bg-white p-7 shadow-card lg:grid-cols-[1.5fr_1fr] lg:p-10">
                    <div className={i % 2 ? 'lg:order-2' : ''}>
                      <p className="text-sm font-semibold uppercase tracking-wider text-brand">Step {String(i + 1).padStart(2, '0')}</p>
                      <h3 className="mt-2 text-2xl font-bold leading-snug text-ink">{s.title}</h3>
                      {s.groups.map((g) => (
                        <div key={g.label} className="mt-5">
                          <p className="font-medium text-ink">{g.label}</p>
                          <ul className="mt-3 space-y-2">
                            {g.bullets.map((b) => <li key={b} className="flex gap-3 text-body"><Check /><span>{b}</span></li>)}
                          </ul>
                        </div>
                      ))}
                      {'note' in s && s.note && <p className="mt-5 text-body">{s.note}</p>}
                      <div className="mt-6 rounded-xl border-l-4 border-brand bg-[#eef3fb] p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand">Value Delivered</h4>
                        <p className="mt-2 leading-relaxed text-ink">{s.value}</p>
                      </div>
                    </div>
                    <div className={i % 2 ? 'lg:order-1' : ''}>
                      {img
                        ? <Image src={img} alt={s.title} width={520} height={430} className="mx-auto h-auto w-full max-w-md rounded-2xl" />
                        : <ImgPlaceholder path={s.img} className="mx-auto aspect-[182/150] w-full max-w-md" />}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Impact & Outcomes ---------- */}
      <section className="section bg-surface-tint">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl font-bold leading-tight text-ink lg:text-4xl">{c.impact.heading}</h2></Reveal>
            <p className="mt-5 text-body">{c.impact.intro}</p>
          </div>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
            {localImg(c.impact.img) && <Reveal animation="zoomIn"><Image src={localImg(c.impact.img)} alt="" width={520} height={446} className="h-auto w-full rounded-2xl" /></Reveal>}
            <ul className="space-y-4">
              {c.impact.bullets.map((b) => <li key={b} className="flex gap-3 text-body"><Check /><span>{b}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_75%_30%,rgba(255,255,255,0.16)_0%,transparent_60%)]" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white lg:text-4xl">{c.closing.heading}</h2>
            <p className="mt-4 max-w-xl text-white/85">{c.closing.subtitle}</p>
            <Link href={c.closing.cta.href} className="btn mt-7 bg-brand-navy uppercase tracking-wide text-white hover:bg-white hover:text-brand-navy">{c.closing.cta.text}</Link>
          </div>
          {localImg(c.closing.img) && <Reveal animation="zoomIn"><Image src={localImg(c.closing.img)} alt="" width={520} height={380} className="mx-auto h-auto w-full max-w-[420px]" /></Reveal>}
        </div>
      </section>

      {/* ---------- Standard contact form block ---------- */}
      <OneToOneCTA tone="light" />
    </>
  );
}
