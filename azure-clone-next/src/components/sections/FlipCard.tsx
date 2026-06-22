'use client';

import { useState, type ReactNode } from 'react';

/** Elementor zoom-in flip box: a borderless front (icon + title) that, on hover,
 *  is replaced by a blue back card (title + description) which zooms in (scale
 *  0.7 → 1 + fade). Uses useState + inline styles — the project's Tailwind build
 *  doesn't compile group-hover:, so JS-driven hover is the reliable pattern. */
export function FlipCard({ icon, title, back }: { icon: ReactNode; title: string; back: string }) {
  const [on, setOn] = useState(false);
  return (
    <div
      className="relative h-56"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      {/* FRONT — borderless icon + title */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: on ? 0 : 1, transition: 'opacity .4s ease' }}
      >
        {icon}
        <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">{title}</h3>
      </div>

      {/* BACK — blue card zooms in on hover */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl px-6 text-center"
        style={{
          background: 'linear-gradient(135deg,#143CD5 0%,#1742E7 55%,#2F69F2 100%)',
          boxShadow: '0 18px 40px rgba(18,51,201,0.35)',
          opacity: on ? 1 : 0,
          transform: on ? 'scale(1)' : 'scale(0.7)',
          transition: 'opacity .45s ease, transform .45s ease',
          pointerEvents: on ? 'auto' : 'none',
        }}
      >
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/90">{back}</p>
      </div>
    </div>
  );
}
