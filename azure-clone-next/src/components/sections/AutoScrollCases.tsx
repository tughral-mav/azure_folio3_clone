'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type CaseItem = {
  name: string;
  img: string;
  blurb: string;
  href: string;
};

/** Horizontal auto-scrolling case-study strip. Advances one card at a time
 *  with a 1-second gap between advances, pauses on hover/focus, and respects
 *  prefers-reduced-motion. */
export function AutoScrollCases({ cases }: { cases: CaseItem[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tick = () => {
      if (paused || !el) return;
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-case-card]'));
      if (cards.length === 0) return;
      idxRef.current = (idxRef.current + 1) % cards.length;
      const target = cards[idxRef.current];
      if (idxRef.current === 0) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: 'smooth' });
      }
    };

    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [paused, cases.length]);

  return (
    <section className="bg-surface-tint py-16 lg:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Real results, real impact</span>
          <h2 className="text-3xl lg:text-4xl">See how our customers succeed</h2>
        </div>

        <div
          ref={scrollerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]"
          aria-label="Customer success stories"
          role="region"
        >
          {cases.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              data-case-card
              className="group relative flex h-72 w-[85%] shrink-0 snap-start overflow-hidden rounded-xl shadow-card sm:w-[60%] lg:w-[calc((100%-3rem)/3)]"
            >
              <Image src={c.img} alt={c.name} fill sizes="(max-width:640px) 85vw, (max-width:1024px) 60vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute bottom-4 left-4 rounded-md bg-brand-navy px-4 py-1.5 text-sm font-semibold text-white transition-opacity duration-300 group-hover:opacity-0">
                {c.name}
              </span>
              <div className="pointer-events-none absolute inset-0 flex translate-y-full flex-col justify-center bg-[#0c2976]/95 p-6 text-white transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{c.blurb}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-white underline">Read More</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="#pgForm" className="btn-primary uppercase tracking-wide">Discover All</Link>
        </div>
      </div>
    </section>
  );
}
