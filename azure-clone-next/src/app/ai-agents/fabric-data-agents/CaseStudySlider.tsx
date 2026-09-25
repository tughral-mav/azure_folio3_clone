'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type CaseStudy = {
  client: string;
  tag: string;
  stat: string;
  statLabel: string;
  title: string;
  summary: string;
  href: string;
  img: { src: string; w: number; h: number };
  alt: string;
};

/** Manual case-study slider: native horizontal scroll + CSS scroll-snap, Previous/Next buttons
 *  that move one card per click and disable at either end. No autoplay, no looping. */
export function CaseStudySlider({ items }: { items: CaseStudy[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(items.length <= 1);
  const [range, setRange] = useState<[number, number]>([1, Math.min(2, items.length)]);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const list = el.firstElementChild as HTMLElement | null;
    const first = list?.firstElementChild as HTMLElement | null;
    if (!list || !first) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const step = first.offsetWidth + gap;
    const start = Math.round(el.scrollLeft / step);
    const fullyVisible = Math.max(1, Math.floor((el.clientWidth + gap + 2) / step));
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    setRange([start + 1, Math.min(items.length, start + fullyVisible)]);
  }, [items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const go = (dir: -1 | 1) => {
    const el = trackRef.current;
    const list = el?.firstElementChild as HTMLElement | null;
    const first = list?.firstElementChild as HTMLElement | null;
    if (!el || !list || !first) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: reduce ? 'auto' : 'smooth' });
  };

  const btn =
    'flex h-11 w-11 items-center justify-center rounded-full border border-brand text-brand transition-colors duration-200 hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:border-surface-line disabled:text-body/40 disabled:hover:bg-transparent motion-reduce:transition-none';

  return (
    <div className="mt-12">
      <div
        ref={trackRef}
        role="region"
        aria-label="Case studies"
        tabIndex={0}
        className="relative -mx-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth scroll-px-1 px-1 pb-4 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
      <ul className="flex gap-6">
        {items.map((c, i) => (
          <li
            key={c.href}
            className="relative w-[86%] shrink-0 snap-start snap-always sm:w-[72%] md:w-[68%] lg:w-[calc((100%-1.5rem-4rem)/2)]"
          >
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card transition-shadow duration-200 hover:shadow-cardHover">
              <div className="flex h-44 items-center justify-center bg-[linear-gradient(135deg,#eef3f8_0%,#dfeaf5_100%)] p-4">
                <Image
                  src={c.img.src}
                  alt={c.alt}
                  width={c.img.w}
                  height={c.img.h}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 86vw"
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{c.tag}</p>
                <p className="mt-4">
                  <span className="block whitespace-nowrap text-3xl font-bold leading-none text-ink">{c.stat}</span>
                  <span className="mt-1.5 block text-sm text-body">{c.statLabel}</span>
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{c.title}</h3>
                <p className="mt-1 text-xs font-medium text-body/80">{c.client}</p>
                <p className="mt-3 text-sm leading-relaxed text-body">{c.summary}</p>
                <Link
                  href={c.href}
                  className="mt-auto inline-flex w-fit items-center gap-1 pt-5 text-sm font-semibold text-brand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Read the Case Study<span className="sr-only">: {c.title}</span> <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <Link
          href="/case-studies/"
          className="text-sm font-semibold text-brand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          View All Case Studies <span aria-hidden>→</span>
        </Link>
        <div className="flex items-center gap-3">
          <p aria-live="polite" className="text-sm tabular-nums text-body">
            {range[0] === range[1] ? range[0] : `${range[0]}–${range[1]}`} / {items.length}
          </p>
          <button type="button" aria-label="Previous case study" onClick={() => go(-1)} disabled={atStart} className={btn}>
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <button type="button" aria-label="Next case study" onClick={() => go(1)} disabled={atEnd} className={btn}>
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
