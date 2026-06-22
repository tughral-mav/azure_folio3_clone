'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Reveal } from '@/components/ui/Reveal';

export type SolTab = {
  label: string;
  body: string;
  img: string;
  cta: { label: string; href: string };
  features: { title: string; body: string }[];
};

/** "Powerful Solutions…" — the live's tabbed interface: pill tab-bar + a 2-col
 *  active panel (heading + intro + sub-feature list on the left, image on the right). */
export function RetailSolutionTabs({ heading, eyebrow, tabs }: { heading: string; eyebrow?: string; tabs: SolTab[] }) {
  const [active, setActive] = useState(0);
  const t = tabs[active];
  return (
    <section className="section bg-[linear-gradient(180deg,#eef5fc_0%,#dbeafa_100%)]">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}
          <h2 className="text-3xl lg:text-4xl">{heading}</h2>
        </div>

        {/* tab pills */}
        <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={clsx(
                'rounded-md px-5 py-3 text-sm font-semibold transition-colors',
                active === i ? 'bg-brand text-white shadow-card' : 'bg-white text-ink hover:bg-surface-chip'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* active panel */}
        <div className="mt-10 rounded-2xl bg-white p-8 shadow-card lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl">{t.label}</h3>
              <span className="mt-2 block h-1 w-12 rounded bg-brand" />
              <p className="mt-4 text-sm leading-relaxed text-body">{t.body}</p>
              <ul className="mt-6 space-y-5">
                {t.features.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-chip text-brand">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="h-3.5 w-3.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <div>
                      <h4 className="font-semibold text-ink">{f.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-body">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href={t.cta.href} className="btn-primary mt-7 uppercase tracking-wide">{t.cta.label}</Link>
            </div>
            <Reveal animation="zoomIn" className="relative">
              <Image src={t.img} alt={t.label} width={620} height={520} className="mx-auto h-auto w-full" />
            </Reveal>
          </div>
        </div>

        {/* preload every tab's image into the DOM (the live ships all of them) so
            switching tabs is instant and nothing is "missing" before a click */}
        <div aria-hidden className="h-0 w-0 overflow-hidden">
          {tabs.map((tab, i) => i === active ? null : (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={tab.img} src={tab.img} alt="" width={4} height={4} loading="eager" />
          ))}
        </div>
      </div>
    </section>
  );
}
