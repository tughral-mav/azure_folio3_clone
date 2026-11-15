'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export type SolutionItem = { icon: string; iconFile: string; label: string; text: string };
export type SolutionGroup = { heading: string; intro: string; items: SolutionItem[] };

/** Folio3 Solution groups as selectable tabs (same tab-bar styling as SectionTabs).
 *  `icon` is pre-resolved on the server: '' means the file isn't in /public yet. */
export function SolutionTabs({ groups }: { groups: SolutionGroup[] }) {
  const [active, setActive] = useState(0);
  const g = groups[active];
  return (
    <div className="mt-12">
      <div role="tablist" className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {groups.map((t, i) => (
          <button key={t.heading} type="button" role="tab" id={`sol-tab-${i}`} aria-selected={active === i} aria-controls={`sol-panel-${i}`}
            onClick={() => setActive(i)}
            className={clsx('rounded-md px-5 py-3 text-left text-sm font-semibold transition-colors sm:text-center lg:text-base',
              active === i ? 'bg-brand text-white shadow-card' : 'bg-white text-ink hover:bg-surface-chip')}>
            {t.heading}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`sol-panel-${active}`} aria-labelledby={`sol-tab-${active}`} key={active} className="mt-10">
        <p className="mx-auto max-w-4xl text-center leading-relaxed text-body">{g.intro}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {g.items.map((t) => (
            <div key={t.text} className="flex h-full flex-col items-center rounded-2xl border border-surface-line bg-white p-7 text-center shadow-card card-hover">
              <div className="flex h-20 w-full items-center justify-center">
                {t.icon
                  ? <Image src={t.icon} alt={t.label} width={150} height={80} className="h-auto max-h-20 w-auto max-w-[170px] object-contain" />
                  : <span className="flex h-16 min-w-16 items-center justify-center rounded-xl border-2 border-dashed border-brand/30 px-3 text-xs font-semibold text-brand" title={`Icon placeholder: ${t.iconFile}`}>{t.label}</span>}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-body">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
