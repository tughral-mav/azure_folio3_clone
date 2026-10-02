'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type CaseCard = { title: string; img: string; href: string };

/** Horizontally scrollable, scroll-snapping case-study row with prev/next buttons. */
export function CaseScroller({ cases }: { cases: CaseCard[] }) {
  const ref = useRef<HTMLUListElement | null>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('li');
    const step = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };
  return (
    <div className="relative mt-12">
      <ul ref={ref} className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]" aria-label="Azure case studies">
        {cases.map((c) => (
          <li key={c.href} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[31%]">
            <Link href={c.href} className="group flex h-full flex-col overflow-hidden rounded-2xl card-hover border border-surface-line bg-white shadow-card">
              <Image src={c.img} alt={c.title} width={420} height={236} className="h-44 w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="flex-1 text-base leading-snug">{c.title}</h3>
                <span className="mt-4 text-sm font-semibold text-brand group-hover:underline">Read more →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center gap-3">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous case studies" className="flex h-11 w-11 items-center justify-center rounded-full border border-brand text-brand transition-colors hover:bg-brand hover:text-white">←</button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Next case studies" className="flex h-11 w-11 items-center justify-center rounded-full border border-brand text-brand transition-colors hover:bg-brand hover:text-white">→</button>
      </div>
    </div>
  );
}
