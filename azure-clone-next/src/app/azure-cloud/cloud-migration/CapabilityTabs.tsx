'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export type Capability = { label: string; body: string; link?: { text: string; href: string } };

/** Fold 7 — "Everything Your Migration Needs, Under One Team" tab switcher. */
export function CapabilityTabs({ items }: { items: Capability[] }) {
  const [active, setActive] = useState(0);
  const cur = items[active];
  return (
    <div className="mt-10">
      <div role="tablist" className="flex flex-wrap justify-center gap-3">
        {items.map((t, i) => (
          <button key={t.label} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)}
            className={clsx('rounded-md px-5 py-3 text-sm font-semibold transition-colors',
              active === i ? 'bg-brand text-white shadow-card' : 'bg-white text-ink hover:bg-surface-chip')}>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mx-auto mt-8 max-w-3xl rounded-2xl border border-surface-line bg-white p-8 text-center shadow-card">
        <h3 className="text-xl">{cur.label}</h3>
        <p className="mt-3 leading-relaxed text-body">{cur.body}</p>
        {cur.link && <Link href={cur.link.href} className="mt-4 inline-block font-semibold text-brand hover:underline">{cur.link.text} →</Link>}
      </div>
    </div>
  );
}
