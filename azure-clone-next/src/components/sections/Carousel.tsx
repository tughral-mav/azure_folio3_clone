'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

/** Single Embla-based carousel — replaces the dual Swiper + Slick payload on the live site. */
export function Carousel({ children }: { children: React.ReactNode[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' });
  const scroll = useCallback((dir: -1 | 1) => embla && (dir === 1 ? embla.scrollNext() : embla.scrollPrev()), [embla]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {children.map((child, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[48%] lg:basis-[32%]">
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={() => scroll(-1)} aria-label="Previous" className="h-10 w-10 rounded-full border border-surface-line hover:border-brand hover:text-brand">‹</button>
        <button onClick={() => scroll(1)} aria-label="Next" className="h-10 w-10 rounded-full border border-surface-line hover:border-brand hover:text-brand">›</button>
      </div>
    </div>
  );
}
