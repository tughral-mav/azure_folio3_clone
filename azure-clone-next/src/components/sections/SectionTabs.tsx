'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Reveal } from '@/components/ui/Reveal';

export type TabItem = { title: string; body: string; icon: string };
export type SectionTab = { label: string; heading?: string; body?: string; items: TabItem[]; img?: string; cta?: { text: string; href: string } | null };

/** Generic Elementor n-tabs renderer: a pill/underline tab bar + the active tab's panel. The panel
 *  shows either a grid of icon-box sub-items OR an image (dashboard tabs), plus optional body + CTA. */
export function SectionTabs({ heading, eyebrow, tabs }: { heading: string; eyebrow?: string; tabs: SectionTab[] }) {
  const [active, setActive] = useState(0);
  return (
    <section className="section bg-[linear-gradient(180deg,#eef5fc_0%,#dbeafa_100%)]">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}
          {heading && <h2 className="text-3xl lg:text-4xl">{heading}</h2>}
        </div>

        {/* tab bar */}
        <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-3">
          {tabs.map((t, i) => (
            <button key={t.label + i} type="button" role="tab" aria-selected={active === i}
              onClick={() => setActive(i)}
              className={clsx('rounded-md px-5 py-3 text-sm font-semibold transition-colors',
                active === i ? 'bg-brand text-white shadow-card' : 'bg-white text-ink hover:bg-surface-chip')}>
              {t.label}
            </button>
          ))}
        </div>

        {/* panels — render all, hide inactive (so all content + images are in the DOM) */}
        {tabs.map((t, i) => (
          <div key={i} className={clsx('mt-10 rounded-2xl bg-white p-6 shadow-card lg:p-10', active === i ? '' : 'hidden')}>
            {t.heading && <h3 className="mb-2 text-2xl">{t.heading}</h3>}
            {t.body && <p className="mb-6 max-w-3xl text-sm leading-relaxed text-body">{t.body}</p>}
            {t.items.length > 0 ? (
              <div className={`grid gap-6 sm:grid-cols-2 ${t.items.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
                {t.items.map((it, j) => (
                  <Reveal key={j} animation="fadeInUp" delay={j * 50}><div className="flex h-full gap-4">
                    {it.icon ? <Image src={it.icon} alt="" width={44} height={44} className="h-11 w-11 shrink-0 object-contain" /> : <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-chip text-brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-5 w-5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
                    <div><h4 className="font-semibold text-ink">{it.title}</h4>{it.body && <p className="mt-1 text-sm leading-relaxed text-body">{it.body}</p>}</div>
                  </div></Reveal>
                ))}
              </div>
            ) : t.img ? (
              <Reveal animation="zoomIn"><Image src={t.img} alt={t.label} width={1100} height={620} className="mx-auto h-auto w-full rounded-xl" /></Reveal>
            ) : null}
            {t.cta && t.cta.href && <Link href={t.cta.href} className="btn-primary mt-7 uppercase tracking-wide">{t.cta.text || 'Learn More'}</Link>}
          </div>
        ))}

        {/* preload inactive tab images so switching is instant + nothing is "missing" */}
        <div aria-hidden className="h-0 w-0 overflow-hidden">
          {tabs.flatMap((t) => [t.img, ...t.items.map((it) => it.icon)]).filter(Boolean).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src as string} alt="" width={2} height={2} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
