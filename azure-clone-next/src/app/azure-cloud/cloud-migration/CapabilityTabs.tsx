'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export type Capability = { label: string; icon: string; body: string; link?: { text: string; href: string } };

/** Fold 7 — "Everything Your Migration Needs, Under One Team": vertical tab list + detail panel. `icon` is an SVG path. */
export function CapabilityTabs({ items }: { items: Capability[] }) {
  const [active, setActive] = useState(0);
  const cur = items[active];
  return (
    <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[2fr_3fr] lg:gap-10">
      <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-2">
        {items.map((t, i) => (
          <button key={t.label} type="button" role="tab" id={`cap-tab-${i}`} aria-selected={active === i} aria-controls="cap-panel" onClick={() => setActive(i)}
            className={clsx('flex items-center justify-between gap-4 rounded-full px-6 py-4 text-left text-base font-semibold transition-colors',
              active === i ? 'bg-brand-ink text-white' : 'text-ink hover:bg-white')}>
            {t.label}
            {active === i && <span aria-hidden="true" className="text-brand">→</span>}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="cap-panel" aria-labelledby={`cap-tab-${active}`} className="rounded-3xl bg-brand-ink p-8 text-white lg:p-12">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={cur.icon} /></svg>
        </span>
        <h3 className="mt-8 text-2xl text-white lg:text-3xl">{cur.label}</h3>
        <p className="mt-4 max-w-xl leading-relaxed text-white/75">{cur.body}</p>
        {cur.link && <Link href={cur.link.href} className="mt-6 inline-block font-semibold text-white underline-offset-4 hover:underline">{cur.link.text} →</Link>}
      </div>
    </div>
  );
}
