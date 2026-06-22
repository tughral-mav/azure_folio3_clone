'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export type TechTab = { label: string; logos: string[] };

/** "Technologies We Work With" — the live's tabbed logo interface: a 4-tab bar with a
 *  teal underline, and the active tab's technology logos in a card grid below. */
export function TechTabs({ heading, subtitle, tabs }: { heading: string; subtitle?: string; tabs: TechTab[] }) {
  const [active, setActive] = useState(0);
  const t = tabs[active];
  return (
    <section className="section bg-[linear-gradient(180deg,#eef5fc_0%,#ffffff_40%)]">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl">{heading}</h2>
          {subtitle && <p className="mt-4 text-body">{subtitle}</p>}
        </div>

        {/* tab bar with teal underline */}
        <div className="mt-10 grid grid-cols-2 gap-3 border-b-2 border-[#26c6b9] sm:grid-cols-4">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(i)}
              className={clsx(
                'rounded-t-lg px-4 py-4 text-sm font-semibold transition-colors',
                active === i ? 'bg-white text-ink shadow-[0_-2px_10px_rgba(0,0,0,0.04)]' : 'bg-surface-chip text-body hover:text-ink'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* active tab's logo grid */}
        <div className="mt-12 grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3">
          {t.logos.map((src, i) => (
            <div key={i} className="flex h-32 w-full items-center justify-center rounded-xl bg-surface-tint p-6">
              <Image src={src} alt="" width={220} height={96} className="h-auto max-h-16 w-auto object-contain" />
            </div>
          ))}
        </div>

        {/* preload every tab's logos (the live ships them all) so switching is instant and
            nothing is "missing" before a click */}
        <div aria-hidden className="h-0 w-0 overflow-hidden">
          {tabs.flatMap((tab, ti) => ti === active ? [] : tab.logos).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" width={2} height={2} loading="eager" />
          ))}
        </div>
      </div>
    </section>
  );
}
