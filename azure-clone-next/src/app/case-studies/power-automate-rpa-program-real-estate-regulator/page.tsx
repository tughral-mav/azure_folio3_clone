import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { Reveal } from '@/components/ui/Reveal';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import content from '../../../../content-kit/case-studies/power-automate-rpa-program-real-estate-regulator.json';

/**
 * Case study: Power Automate RPA Program for a Real Estate Regulator.
 * White-label (no client name). All copy lives in
 * content-kit/case-studies/power-automate-rpa-program-real-estate-regulator.json.
 * Section order + visual language mirror the other case-study pages in /case-studies/,
 * with two extra data sections (Program in Numbers, Use Cases by Business Area).
 *
 * Images are referenced by their final path. If a file isn't in /public yet, a
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

/** Exact-path existence check: returns the path if the file is in /public, else '' so a placeholder renders. */
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
  industry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 4l9 6.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2"/></svg>',
  bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="2.5"/><path d="M12 4v4M9 13h.01M15 13h.01M9.5 16.5h5"/><circle cx="12" cy="3.5" r="1"/></svg>',
  workflow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="6" height="5" rx="1"/><rect x="15" y="4" width="6" height="5" rx="1"/><rect x="9" y="15" width="6" height="5" rx="1"/><path d="M9 6.5h6M18 9v3H12v3"/></svg>',
  report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 17v-4M12 17V9M16 17v-6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5z"/><path d="m9.5 13.5 2 2 3.5-3.5"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.3-1.5 7.2 5-2.7 5 2.7-1.5-7.2"/></svg>',
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
  const facts = c.client.facts.filter((f) => f.label && f.label.trim());
  const maxDelivered = Math.max(...c.useCases.rows.map((r) => r.delivered));

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
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">{c.hero.label}</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">{head}{tail && <span className="text-brand">{tail}</span>}</h1>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={c.hero.cta.href} className="btn bg-brand-navy uppercase tracking-wide text-white hover:bg-brand">{c.hero.cta.text}</Link>
            </div>
          </div>
          <Reveal animation="zoomIn" className="relative">
            {heroImg
              ? <Image src={heroImg} alt={c.hero.imgAlt} width={1200} height={800} sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full rounded-2xl shadow-card" priority />
              : <ImgPlaceholder path={c.hero.img} className="aspect-[3/2] w-full" />}
          </Reveal>
        </div>
      </section>
      <div className="bg-brand"><div className="container-x py-3 text-sm text-white/90"><Link href="/" className="hover:underline">Home</Link><span className="px-2">»</span><Link href="/case-studies/" className="hover:underline">Case Studies</Link><span className="px-2">»</span><span>{CRUMB}</span></div></div>

      {/* ---------- Client info strip + About The Client ---------- */}
      <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 text-white lg:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[0.8fr_1.6fr]">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-1 lg:gap-7 lg:border-r lg:border-white/25 lg:pr-10">
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
                  <span className="text-4xl font-bold leading-tight text-brand lg:text-5xl">{s.value}</span>
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

      {/* ---------- The Program in Numbers ---------- */}
      <section className="relative overflow-hidden bg-brand-navy py-16 text-white lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_120%_at_85%_10%,rgba(47,105,242,0.45)_0%,transparent_60%)]" />
        <div className="container-x relative">
          <Reveal animation="fadeInUp"><h2 className="text-center text-3xl font-bold leading-tight text-white lg:text-4xl">{c.numbers.heading}</h2></Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {c.numbers.items.map((n, i) => (
              <Reveal key={n.label} animation="fadeInUp" delay={i * 50} className={i === c.numbers.items.length - 1 ? 'col-span-2 sm:col-span-1 lg:col-span-1' : ''}>
                <li className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm">
                  <span className="text-4xl font-bold leading-none lg:text-5xl">{n.value}</span>
                  <span className="mt-3 text-sm leading-snug text-white/80">{n.label}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Use Cases Delivered by Business Area ---------- */}
      <section className="section bg-white">
        <div className="container-x">
          <Reveal animation="fadeInUp"><h2 className="text-center text-3xl font-bold leading-tight text-ink lg:text-4xl">{c.useCases.heading}</h2></Reveal>
          <div className="mt-12 overflow-hidden rounded-2xl border border-surface-line shadow-card">
            <table className="w-full border-collapse text-left">
              <thead className="hidden bg-brand text-sm uppercase tracking-wider text-white md:table-header-group">
                <tr>
                  <th scope="col" className="w-[22%] px-6 py-4 font-semibold">{c.useCases.columns[0]}</th>
                  <th scope="col" className="w-[22%] px-6 py-4 font-semibold">{c.useCases.columns[1]}</th>
                  <th scope="col" className="px-6 py-4 font-semibold">{c.useCases.columns[2]}</th>
                </tr>
              </thead>
              <tbody>
                {c.useCases.rows.map((r, i) => (
                  <tr key={r.area} className={`block border-b border-surface-line px-5 py-5 md:table-row md:p-0 ${i % 2 ? 'bg-surface-tint' : 'bg-white'}`}>
                    <th scope="row" className="block font-semibold text-ink md:table-cell md:px-6 md:py-5 md:align-top">{r.area}</th>
                    <td className="mt-2 block md:mt-0 md:table-cell md:px-6 md:py-5 md:align-top">
                      <div className="flex items-center gap-3">
                        <span className="w-8 shrink-0 text-2xl font-bold text-brand">{r.delivered}</span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-chip" aria-hidden>
                          <span className="block h-full rounded-full bg-brand" style={{ width: `${(r.delivered / maxDelivered) * 100}%` }} />
                        </span>
                      </div>
                    </td>
                    <td className="mt-3 block text-sm leading-relaxed text-body md:mt-0 md:table-cell md:px-6 md:py-5 md:align-top">{r.examples}</td>
                  </tr>
                ))}
                <tr className="block bg-[#eef3fb] px-5 py-5 md:table-row md:p-0">
                  <th scope="row" className="inline font-bold uppercase tracking-wider text-ink md:table-cell md:px-6 md:py-5">{c.useCases.totalLabel}</th>
                  <td className="ml-3 inline text-2xl font-bold text-brand md:ml-0 md:table-cell md:px-6 md:py-5">{c.useCases.total}</td>
                  <td className="hidden md:table-cell" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------- The Customer ---------- */}
      <section className="section bg-surface-tint">
        <div className="container-x">
          <Reveal animation="fadeInUp"><h2 className="text-3xl font-bold leading-tight text-ink lg:text-4xl">{c.customer.heading}</h2></Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
            <div>
              {c.customer.paragraphs.map((p, i) => <p key={i} className={`${i ? 'mt-4' : ''} leading-relaxed text-body`}>{p}</p>)}
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
        </div>
      </section>

      {/* ---------- The Problem: What The Regulator Needed ---------- */}
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

      {/* ---------- Folio3 Solution ---------- */}
      <section className="section bg-surface-tint">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl font-bold leading-tight text-ink lg:text-4xl">{c.solution.heading}</h2></Reveal>
            <p className="mt-5 text-body">{c.solution.intro}</p>
          </div>
          <ol className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3" aria-label="Delivery lifecycle">
            {c.solution.lifecycle.map((s, i) => (
              <li key={s} className="flex items-center gap-2 sm:gap-3">
                <span className="rounded-full border border-brand/20 bg-white px-4 py-2 text-sm font-semibold text-brand shadow-card">{String(i + 1).padStart(2, '0')} · {s}</span>
                {i < c.solution.lifecycle.length - 1 && <span className="text-brand/50" aria-hidden>→</span>}
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {c.solution.groups.map((g, gi) => (
              <Reveal key={g.heading} animation="fadeInUp" delay={gi * 80}>
                <div className="h-full rounded-2xl border border-surface-line bg-white p-8 shadow-card lg:p-10">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                      <Icon name={g.icon} className="[&>svg]:h-7 [&>svg]:w-7" />
                    </span>
                    <h3 className="text-xl font-bold leading-snug text-ink">{g.heading}</h3>
                  </div>
                  <ul className="mt-7 space-y-5">
                    {g.items.map((t) => (
                      <li key={t.label} className="flex gap-3">
                        <Check />
                        <p className="leading-relaxed text-body"><strong className="font-semibold text-ink">{t.label}:</strong> {t.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- End-to-End Power Automate RPA Workflow ---------- */}
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
                      <div className="mt-6 rounded-xl border-l-4 border-brand bg-[#eef3fb] p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-brand">Value Delivered</h4>
                        <p className="mt-2 leading-relaxed text-ink">{s.value}</p>
                      </div>
                    </div>
                    <div className={i % 2 ? 'lg:order-1' : ''}>
                      {img
                        ? <Image src={img} alt={s.title} width={880} height={726} className="mx-auto h-auto w-full max-w-md rounded-2xl" />
                        : <ImgPlaceholder path={s.img} className="mx-auto aspect-[880/726] w-full max-w-md" />}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Impact & Outcomes + Client Recognition ---------- */}
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
          <div className="mt-14 rounded-2xl border border-surface-line bg-white p-8 shadow-card lg:p-10">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"><Icon name="award" className="[&>svg]:h-6 [&>svg]:w-6" /></span>
              <h3 className="text-2xl font-bold text-ink">{c.impact.recognition.heading}</h3>
            </div>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {c.impact.recognition.items.map((t, i) => (
                <li key={i} className="relative rounded-xl bg-[#eef3fb] p-6">
                  <span className="text-sm font-semibold uppercase tracking-wider text-brand">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-2 leading-relaxed text-body">{t}</p>
                </li>
              ))}
            </ol>
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
