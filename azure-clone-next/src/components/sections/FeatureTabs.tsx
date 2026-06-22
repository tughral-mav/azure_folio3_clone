'use client';

import { useState } from 'react';
import clsx from 'clsx';

export type Tab = { label: string; heading: string; body: string; bullets?: string[] };

/** Replaces the 13 Elementor tab widgets observed on the homepage with one a11y primitive. */
export function FeatureTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div role="tablist" aria-orientation="vertical" className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={clsx(
              'whitespace-nowrap rounded-lg px-5 py-3 text-left text-sm font-semibold transition-colors',
              active === i ? 'bg-brand text-white' : 'bg-surface-tint text-ink hover:bg-surface-chip'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="rounded-xl border border-surface-line bg-white p-8 shadow-card">
        <h3 className="text-2xl">{tab.heading}</h3>
        <p className="mt-3 text-body">{tab.body}</p>
        {tab.bullets && (
          <ul className="mt-5 space-y-2">
            {tab.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-body">
                <span className="mt-1 text-brand">✓</span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
