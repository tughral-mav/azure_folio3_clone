'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type RealDashboard = { src: string; h: number; title: string; caption: string };

const IMG = '/wp-content/uploads/2026/09';

/** Real Folio3 Power BI dashboards (non-healthcare), captioned with what each one actually shows. */
export const realDashboards: RealDashboard[] = [
  {
    src: `${IMG}/sales-performance-dashboard-power-bi.webp`,
    h: 913,
    title: 'Sales performance dashboard',
    caption: 'Sales vs budget over time, with sales by department, customer, country and salesperson.',
  },
  {
    src: `${IMG}/financial-reporting-dashboard-power-bi.webp`,
    h: 913,
    title: 'Income statement dashboard',
    caption: 'Gross profit, EBITDA and operating profit with drill-down by account.',
  },
  {
    src: `${IMG}/bc-inventory-valuation-dashboard.webp`,
    h: 900,
    title: 'Inventory valuation dashboard',
    caption: 'Inventory value over time and by posting group, from Dynamics 365 Business Central.',
  },
  {
    src: `${IMG}/customer-service-sla-dashboard-power-bi.webp`,
    h: 913,
    title: 'Shipping SLA scorecard',
    caption: 'Orders processed, SLA misses and shipping performance by class and state.',
  },
];

/** Horizontal strip that advances one card every 2 seconds, loops, pauses on hover/focus/touch,
 *  and respects prefers-reduced-motion. Each screenshot opens full size. */
export function RealDashboards({ items = realDashboards }: { items?: RealDashboard[] }) {
  const ref = useRef<HTMLUListElement | null>(null);
  const idx = useRef(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);

  const goTo = (i: number, auto = false) => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-dash]');
    if (!cards.length) return;
    const maxLeft = el.scrollWidth - el.clientWidth;
    const next = i >= cards.length || (auto && el.scrollLeft >= maxLeft - 4) ? 0 : i;
    idx.current = next;
    setActive(next);
    el.scrollTo({ left: Math.min(cards[next].offsetLeft - cards[0].offsetLeft, maxLeft), behavior: 'smooth' });
  };

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => goTo(idx.current + 1, true), 2000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <ul
        ref={ref}
        aria-label="Real Power BI dashboards built by Folio3"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((d) => (
          <li key={d.src} data-dash className="flex w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
            <figure className="flex w-full flex-col overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
              <a href={d.src} target="_blank" rel="noopener" className="block cursor-zoom-in" title="Open full-size dashboard">
                <Image
                  src={d.src}
                  alt={`${d.title} in Power BI built by Folio3`}
                  width={1600}
                  height={d.h}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                  className="h-auto w-full border-b border-surface-line"
                />
              </a>
              <figcaption className="flex-1 p-5">
                <p className="font-semibold text-ink">{d.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-body">{d.caption}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center gap-2">
        {items.map((d, i) => (
          <button
            key={d.src}
            type="button"
            aria-label={`Show ${d.title}`}
            aria-current={active === i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all ${active === i ? 'w-8 bg-brand' : 'w-2.5 bg-brand/30 hover:bg-brand/60'}`}
          />
        ))}
      </div>
    </div>
  );
}
