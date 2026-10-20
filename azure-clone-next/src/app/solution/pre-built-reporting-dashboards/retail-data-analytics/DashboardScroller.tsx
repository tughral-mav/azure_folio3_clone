'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Horizontal, snap-scrolling track for the dashboard cards, with prev/next buttons. */
export function DashboardScroller({ children, label }: { children: ReactNode; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const btn =
    'flex h-11 w-11 items-center justify-center rounded-full border border-surface-line bg-white text-brand shadow-card transition hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-40';

  return (
    <div>
      <ul
        ref={track}
        onScroll={update}
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:thin]"
      >
        {children}
      </ul>
      <div className="mt-6 flex justify-center gap-3">
        <button type="button" className={btn} onClick={() => scrollBy(-1)} disabled={atStart} aria-label="Previous dashboard">
          <ChevronLeft aria-hidden size={20} />
        </button>
        <button type="button" className={btn} onClick={() => scrollBy(1)} disabled={atEnd} aria-label="Next dashboard">
          <ChevronRight aria-hidden size={20} />
        </button>
      </div>
    </div>
  );
}
