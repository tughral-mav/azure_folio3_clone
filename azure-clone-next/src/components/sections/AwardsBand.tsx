'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback } from 'react';

/** "Awards & Recognition" — bright-blue slider band of Microsoft certification
 *  badges + nav arrows (matches the live cert-badge slider). */
const BADGES = [
  '/wp-content/uploads/2023/07/azure_solution_architect.svg',
  '/wp-content/uploads/2023/07/azure_administration.svg',
  '/wp-content/uploads/2023/07/AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg',
  '/wp-content/uploads/2023/07/azure_security_engineer.svg',
  '/wp-content/uploads/2023/07/data-analyst.svg',
  '/wp-content/uploads/2023/07/azure-data-engineer.svg',
  '/wp-content/uploads/2023/07/power_platform_developers.svg',
  '/wp-content/uploads/2023/07/azure-network-engineer.svg',
  '/wp-content/uploads/2023/07/MB-900.svg',
  '/wp-content/uploads/2023/07/AI-102.svg',
  '/wp-content/uploads/2023/07/DP-100.svg',
  '/wp-content/uploads/2023/07/AZ-140.svg',
  '/wp-content/uploads/2023/07/azure-stack-hub.svg',
  '/wp-content/uploads/2023/07/window-server-hybrid-administration.svg',
  '/wp-content/uploads/2023/07/mirosoft_certified_trainer.svg',
];

export function AwardsBand() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true });
  const scroll = useCallback((d: -1 | 1) => embla && (d === 1 ? embla.scrollNext() : embla.scrollPrev()), [embla]);

  return (
    <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-12">
      <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="shrink-0">
          <h3 className="text-xl font-bold leading-tight text-white">Awards &amp;</h3>
          <h3 className="text-xl font-bold leading-tight text-white">Recognization</h3>
          <div className="mt-3 flex gap-2">
            <button type="button" aria-label="Previous" onClick={() => scroll(-1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-brand-bright">‹</button>
            <button type="button" aria-label="Next" onClick={() => scroll(1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-brand-bright">›</button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {BADGES.map((img) => (
              <div key={img} className="flex min-w-0 flex-[0_0_30%] items-center justify-center rounded-lg bg-white/10 p-3 ring-1 ring-white/20 sm:flex-[0_0_20%] lg:flex-[0_0_15%]">
                <Image src={img} alt="Microsoft certification" width={90} height={90} className="h-20 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
