'use client';

import { useId, useState } from 'react';
import clsx from 'clsx';

export type FaqItem = { q: string; a: string };

/** Replaces 27 Elementor accordions/page with one component. Renders FAQPage JSON-LD for SEO. */
export function Accordion({ items, headingLevel }: { items: FaqItem[]; headingLevel?: 'h3' }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className="mx-auto max-w-3xl divide-y divide-surface-line rounded-xl border border-surface-line bg-white">
      {items.map((it, i) => (
        <div key={it.q}>
          {(() => {
            // Opt-in (headingLevel): wrap each question in a heading and link button ↔ panel for assistive tech.
            const a11y = headingLevel ? { id: `${uid}-q${i}`, 'aria-controls': `${uid}-a${i}` } : {};
            const btn = (
              <button
                type={headingLevel ? 'button' : undefined}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                {...a11y}
              >
                <span className="text-base font-semibold text-ink">{it.q}</span>
                <span className={clsx('text-brand transition-transform', open === i && 'rotate-45')} aria-hidden={headingLevel ? true : undefined}>+</span>
              </button>
            );
            return headingLevel ? <h3 className="m-0 font-sans text-base font-normal leading-normal">{btn}</h3> : btn;
          })()}
          <div
            className={clsx('grid transition-all', open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
            {...(headingLevel ? { id: `${uid}-a${i}`, role: 'region', 'aria-labelledby': `${uid}-q${i}`, 'aria-hidden': open !== i } : {})}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-5 text-sm leading-relaxed text-body">{it.a}</p>
            </div>
          </div>
        </div>
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((it) => ({
              '@type': 'Question',
              name: it.q,
              acceptedAnswer: { '@type': 'Answer', text: it.a },
            })),
          }),
        }}
      />
    </div>
  );
}
