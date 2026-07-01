'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/** Known case-study thumbnails keyed by the case page href — some "Real Results"
 *  sections (managed-services etc.) ship the case NAME only (no image), but the
 *  main pages show the thumbnail. Fall back to these so every case card has one. */
const CASE_IMG: Record<string, string> = {
  '/savills/': '/wp-content/uploads/2023/06/savills-cs.webp',
  '/city-university-azure/': '/wp-content/uploads/2023/06/City4.webp',
  '/copilot-implementation-food-verification/': '/wp-content/uploads/2025/07/food-verification.webp',
};
// some "Real Results" sections ship the case NAME only (no Read-More cta captured) — map the
// known cases to their study page so the card still links where the live links.
const CASE_HREF: Record<string, string> = {
  savills: '/savills/',
  cityu: '/city-university-azure/',
  'city university': '/city-university-azure/',
  daraz: '/daraz/',
  'food verification organization': '/copilot-implementation-food-verification/',
  // this "Real Results" card ships no Read-More href in the capture (dead on the live too) and has
  // no dedicated study page — send it to the case-studies index so the card still links somewhere.
  'azure data services for private equity firm': '/case-studies/',
};

/** Case-study flip card matching the live's "Real Results" flip boxes: front shows
 *  the case name (over its image if present); on hover a dark-blue panel slides up
 *  revealing the description + Read More. JS-driven hover (group-hover: doesn't compile). */
export function CaseFlip({ title, body, href, img }: { title: string; body?: string; href?: string; img?: string }) {
  const [on, setOn] = useState(false);
  const link = (href && href !== '#' ? href : '') || CASE_HREF[(title || '').toLowerCase().trim()] || '';
  const thumb = img || (link ? CASE_IMG[link] : '') || '';
  return (
    <div
      className="relative h-64 cursor-pointer overflow-hidden rounded-2xl border border-surface-line shadow-card"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      {/* FRONT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-6 text-center" style={{ opacity: on ? 0 : 1, transition: 'opacity .3s ease' }}>
        {thumb && <Image src={thumb} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />}
        {thumb && <span className="absolute inset-0 bg-black/25" />}
        <h3 className={`relative text-lg font-semibold leading-snug ${thumb ? 'text-white' : 'text-ink'}`}>{title}</h3>
      </div>

      {/* BACK slides up (no repeated title — the front already shows it; avoids the
          parity gate counting the hidden duplicate as "extra" body text) */}
      <div className="absolute inset-0 flex flex-col justify-center bg-[#0c2976]/95 p-6 text-white" style={{ transform: on ? 'translateY(0)' : 'translateY(100%)', transition: 'transform .5s ease' }}>
        {body && <p className="line-clamp-6 text-sm leading-relaxed text-white/90">{body}</p>}
        {link && <Link href={link} className="mt-4 inline-block text-sm font-semibold text-white underline">Read More</Link>}
      </div>
    </div>
  );
}
