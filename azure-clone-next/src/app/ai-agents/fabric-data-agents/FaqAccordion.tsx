'use client';

import { useId, useState } from 'react';

type Faq = { q: string; a: string };

/** Accessible FAQ accordion. Every answer is rendered in the HTML (collapsed panels use
 *  the `hidden` attribute), so search engines can read them without a click. */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto mt-10 max-w-3xl divide-y divide-surface-line rounded-2xl border border-surface-line bg-white shadow-card">
      {faqs.map((f, i) => {
        const expanded = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden
                  className={`shrink-0 text-xl leading-none text-brand transition-transform ${expanded ? 'rotate-45' : ''}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!expanded}
              className="px-6 pb-5 text-sm leading-relaxed text-body"
            >
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
