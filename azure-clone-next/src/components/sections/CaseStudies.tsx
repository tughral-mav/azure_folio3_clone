'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Section, SectionHeading } from '@/components/ui/Section';

export type CaseCard = { name: string; img: string; blurb: string; href: string };

const DEFAULT_CASES: CaseCard[] = [
  {
    name: 'Savills',
    img: '/wp-content/uploads/2023/06/savills-cs.webp',
    blurb: 'Savills’ global real-estate services provider listed on the London Stock Exchange — modernized analytics on Azure.',
    href: '/savills/',
  },
  {
    name: 'CityU',
    img: '/wp-content/uploads/2023/06/City4.webp',
    blurb: 'The City University of Seattle is a highly-rated private university located in Seattle — data platform on Azure.',
    href: '/city-university-azure/',
  },
];

/** "Real Results, Real Impact" — flip cards: image front; dark-blue story panel
 *  slides up on hover (JS-driven for reliability). Pass `prepend` to show extra cards before the
 *  default pair on one page (other pages keep just the defaults). */
export function CaseStudies({ prepend = [] }: { prepend?: CaseCard[] } = {}) {
  const cases = [...prepend, ...DEFAULT_CASES];
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <Section tone="tint">
      <SectionHeading title="Real Results, Real Impact," subtitle="See How Our Customers Succeed" />
      <div className={`mx-auto mt-12 grid grid-cols-1 gap-8 ${cases.length >= 3 ? 'max-w-6xl md:grid-cols-3' : 'max-w-4xl md:grid-cols-2'}`}>
        {cases.map((c, i) => {
          const on = hovered === i;
          return (
            <div
              key={c.name}
              className="relative h-72 cursor-pointer overflow-hidden rounded-xl shadow-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image src={c.img} alt={c.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              <span
                className="absolute bottom-4 left-4 rounded-md bg-brand-navy px-4 py-1.5 text-sm font-semibold text-white"
                style={{ opacity: on ? 0 : 1, transition: 'opacity .3s ease' }}
              >
                {c.name}
              </span>
              <div
                className="absolute inset-0 flex flex-col justify-center bg-[#0c2976]/95 p-6 text-white"
                style={{ transform: on ? 'translateY(0)' : 'translateY(100%)', transition: 'transform .5s ease' }}
              >
                <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{c.blurb}</p>
                {c.href && c.href !== '#' && <Link href={c.href} className="mt-4 inline-block text-sm font-semibold text-white underline">Read More</Link>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <Link href="#pgForm" className="btn-primary uppercase tracking-wide">Discover All</Link>
      </div>
    </Section>
  );
}
