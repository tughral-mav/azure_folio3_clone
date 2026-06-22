'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Section, SectionHeading } from '@/components/ui/Section';

/** "Our Industries" — Slick-style slider of portrait boxes. Default: image with a
 *  solid-blue title bar at the bottom. Hover: a translucent-blue caption panel
 *  slides up to fill the box (title + description + "Request a call"). Auto-advances
 *  with a bottom-centre ‹ N/total › counter control (matches the live). */
const INDUSTRIES = [
  { title: 'Media and Entertainment', img: '/wp-content/uploads/2023/07/media-img-updated.webp', body: 'Azure services enable media and entertainment organizations drive innovation and improve content delivery with advanced analytics, media services, and content delivery solutions.' },
  { title: 'Manufacturing', img: '/wp-content/uploads/2023/06/Manufacturing-1.webp', body: 'Azure services help manufacturing organizations optimize their operations, reduce their costs, and improve their product quality by providing them with advanced analytics and IoT solutions.' },
  { title: 'Healthcare', img: '/wp-content/uploads/2023/06/Healthcare-1.webp', body: 'Azure services enable healthcare organizations securely manage, store, and analyze large volumes of patient data, while also improving patient outcomes and reducing healthcare costs.' },
  { title: 'Retail', img: '/wp-content/uploads/2023/06/retail-1.webp', body: 'Azure services help retailers drive innovation and improve their customer experience by providing them with advanced analytics, supply chain management, and e-commerce solutions.' },
  { title: 'Financial Service', img: '/wp-content/uploads/2023/06/Financial-services.webp', body: 'Azure services assist financial services organizations improve their efficiency, reduce costs, and enhance customer experience by providing secured infrastructure and applications.' },
];

type Item = { title: string; img: string; body: string; href?: string };
export function IndustriesShowcase({
  heading = 'Our Industries',
  subtitle = 'Microsoft Power Platform Services are designed to cater to the needs of a wide range of businesses and organizations, offering solutions for process automation, data analysis, and app development.',
  items = INDUSTRIES,
}: { heading?: string; subtitle?: string; items?: Item[] } = {}) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', containScroll: false, slidesToScroll: 1 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState(0);
  const [total, setTotal] = useState(items.length);
  const scroll = useCallback((d: -1 | 1) => embla && (d === 1 ? embla.scrollNext() : embla.scrollPrev()), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSel = () => setSelected(embla.selectedScrollSnap());
    const onReInit = () => { setTotal(embla.scrollSnapList().length); onSel(); };
    onReInit();
    embla.on('select', onSel);
    embla.on('reInit', onReInit);
    return () => { embla.off('select', onSel); embla.off('reInit', onReInit); };
  }, [embla]);

  return (
    <Section>
      <SectionHeading title={heading} subtitle={subtitle} />
      <div className="mt-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {items.map((it, i) => {
              const on = hovered === i;
              return (
                <div key={it.title} className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_46%] lg:flex-[0_0_31%] xl:flex-[0_0_23.5%]">
                  <div
                    className="relative h-[400px] cursor-pointer overflow-hidden rounded-lg"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <Image src={it.img} alt={it.title} fill sizes="(max-width:768px) 78vw, 24vw" className="object-cover" />

                    {/* default: solid-blue title bar at the bottom */}
                    <div
                      className="absolute inset-x-0 bottom-0 px-5 py-5 text-[1.2rem] font-semibold leading-[1.2rem] text-white"
                      style={{ background: 'rgb(11,59,171)', opacity: on ? 0 : 1, transition: 'opacity .25s ease' }}
                    >
                      {it.title}
                    </div>

                    {/* hover: translucent-blue caption panel slides up to fill the box */}
                    <div
                      className="absolute inset-x-0 flex flex-col justify-end px-5 pb-9 pt-5 text-white"
                      style={{ background: 'rgba(12,63,184,0.898)', bottom: on ? '0' : '-100%', height: on ? '100%' : 'auto', transition: '.5s' }}
                    >
                      <h3 className="mb-[15px] text-[1.2rem] font-medium leading-[1.2rem]">{it.title}</h3>
                      <p className="mb-[25px] text-[13px] leading-[24px]">{it.body}</p>
                      <div>
                        <Link href={it.href ?? '#pgForm'} className="inline-block rounded bg-white px-5 py-2 text-sm font-semibold text-brand transition-colors hover:bg-surface-tint">
                          Request a call
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* bottom-centre counter control: ‹  N / total  › */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous" onClick={() => scroll(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-brand shadow-card transition-colors hover:bg-brand hover:text-white">‹</button>
          <span className="text-sm font-medium tabular-nums text-muted">{selected + 1} / {total}</span>
          <button type="button" aria-label="Next" onClick={() => scroll(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-brand shadow-card transition-colors hover:bg-brand hover:text-white">›</button>
        </div>
      </div>
    </Section>
  );
}
