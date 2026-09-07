'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

/** Home hero — 3-slide auto-rotating slider (autoplay 5s, loop, swipe) that
 *  replicates the live Elementor carousel. */
const SLIDES = [
  {
    eyebrow: 'Microsoft Gold Partner with Global Expertise',
    head: 'Unlock the Power of Cloud: Build, Run & Manage ',
    highlight: 'Applications with Azure',
    sub: 'Develop cutting-edge apps using the up-to-date AI models available on Azure, trusted by 80% of fortune top 500 companies.',
    cta: 'Schedule a Free Consultation',
    href: '#pgForm',
    img: '/wp-content/uploads/2024/09/Azure-Herobanner-Illustration-updated-new.webp',
  },
  {
    eyebrow: '',
    head: 'Discover the Full Potential of Your Data with the ',
    highlight: 'Folio3 IntelliFabric Solution',
    sub: 'Transform Your Organization with Advanced Data Integration, Real-Time Dashboards, and Scalable Analytics that Empower Smarter Decision-Making and Drive Enhanced Productivity.',
    cta: 'Schedule IntelliFabric Demo Today',
    href: '#pgForm',
    img: '/wp-content/uploads/2026/01/intellifabric-screens.webp',
  },
  {
    eyebrow: '',
    head: 'Transforming HR with ',
    highlight: 'AI and Automation',
    sub: 'Streamline recruitment, onboarding and HR operations with AI-powered Copilot agents and automation built on Microsoft Azure.',
    cta: 'Achieve your AI Vision',
    href: '#pgForm',
    img: '/wp-content/uploads/2024/08/infrastructure-azure-logo-img.webp',
  },
];

export function HeroSlider() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 26 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => embla && setSelected(embla.selectedScrollSnap()), [embla]);
  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
    return () => { embla.off('select', onSelect); };
  }, [embla, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <div className="container-x grid items-center gap-8 pb-10 pt-16 lg:grid-cols-2 lg:pt-20">
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">
                    {s.eyebrow || 'Microsoft Gold Partner with Global Expertise'}
                  </p>
                  {/* only the first slide is an <h1> (SEO: one H1 per page) */}
                  {i === 0 ? (
                    <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">
                      {s.head}
                      <span className="text-brand">{s.highlight}</span>
                    </h1>
                  ) : (
                    <div className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">
                      {s.head}
                      <span className="text-brand">{s.highlight}</span>
                    </div>
                  )}
                  <p className="mt-6 max-w-xl text-lg text-body">{s.sub}</p>
                  <Link href={s.href} className="btn-primary mt-8 uppercase tracking-wide">{s.cta}</Link>
                </div>
                <div className="relative">
                  <Image src={s.img} alt={s.highlight} width={680} height={540} className="float-anim mx-auto h-auto w-full max-w-[640px]" priority={i === 0} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pagination dots */}
      <div className="container-x flex gap-2 pb-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => embla?.scrollTo(i)}
            className={clsx('h-2 rounded-full transition-all', selected === i ? 'w-7 bg-brand' : 'w-2 bg-brand/30')}
          />
        ))}
      </div>
    </div>
  );
}
