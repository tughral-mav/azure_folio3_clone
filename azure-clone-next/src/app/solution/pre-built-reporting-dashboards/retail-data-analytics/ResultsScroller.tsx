'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export type ResultCase = { stat: string; client: string; body: string; href: string; cta: string };

/** Horizontal case-study strip that advances one card every 2 seconds, loops back to the start,
 *  pauses on hover/focus, and respects prefers-reduced-motion. All cards stay in the HTML. */
export function ResultsScroller({ cases }: { cases: ResultCase[] }) {
  const ref = useRef<HTMLUListElement | null>(null);
  const idx = useRef(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);

  const goTo = (i: number, auto = false) => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-case]');
    if (!cards.length) return;
    const maxLeft = el.scrollWidth - el.clientWidth;
    // auto-advance loops back to the first card once the last one is fully visible
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
        aria-label="Retail and commerce client results"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((c) => (
          <li
            key={c.href}
            data-case
            className="flex w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <div className="flex w-full flex-col rounded-2xl bg-white p-7 shadow-card">
              <p className="text-4xl font-bold text-brand">{c.stat}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{c.client}</h3>
              <p className="mt-3 flex-1 text-body">{c.body}</p>
              <Link href={c.href} className="mt-4 inline-block font-semibold text-brand underline">
                {c.cta}
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center gap-2">
        {cases.map((c, i) => (
          <button
            key={c.href}
            type="button"
            aria-label={`Show ${c.client} result`}
            aria-current={active === i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all ${active === i ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
}
