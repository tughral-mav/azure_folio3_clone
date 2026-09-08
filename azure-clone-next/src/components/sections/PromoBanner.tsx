'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import promo from '../../../content-kit/promo-blog.json';

/**
 * Blog promo bar — bottom corner slide-in.
 *
 * ALL copy, the offer, the CTA, the schedule and the display rules live in
 * content-kit/promo-blog.json (marketer-editable, no code change needed).
 *
 * Display rules (from the JSON):
 *  - shows only after the visitor scrolls past `scrollTrigger` (10%) of the page
 *  - closes on the X and stays closed for `frequencyCapDays` (localStorage, no PII)
 *  - renders NOTHING before `startDate` or after `endDate` (end-of-day, inclusive),
 *    or when `enabled` is false — so it cannot linger after the campaign ends
 *
 * Placement: fixed bottom-right card on desktop, compact bottom bar on mobile.
 * It is a corner toast, so it never covers the centered page CTA or the footer
 * CTA band. z-40 keeps it under the sticky header (z-50).
 */

const STORAGE_KEY = `promo-dismissed:${promo.id}`;

function withinSchedule(now: Date): boolean {
  if (!promo.enabled) return false;
  const start = new Date(`${promo.startDate}T00:00:00`);
  const end = new Date(`${promo.endDate}T23:59:59`);
  return now >= start && now <= end;
}

function recentlyDismissed(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const when = Number(raw);
    if (!Number.isFinite(when)) return false;
    const capMs = promo.frequencyCapDays * 24 * 60 * 60 * 1000;
    return Date.now() - when < capMs;
  } catch {
    return false; // private mode / storage blocked → treat as not dismissed
  }
}

export function PromoBanner() {
  // `armed` = allowed to show at all (in schedule, not capped). `visible` = the
  // scroll threshold has been crossed. Both start false so the server renders
  // nothing and there is no hydration mismatch.
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!withinSchedule(new Date()) || recentlyDismissed()) return;
    setArmed(true);

    const check = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const fraction = scrollable > 0 ? window.scrollY / scrollable : 1;
      if (fraction >= promo.scrollTrigger) {
        setVisible(true);
        window.removeEventListener('scroll', check);
      }
    };

    window.addEventListener('scroll', check, { passive: true });
    check(); // in case the visitor already scrolled before this mounted
    return () => window.removeEventListener('scroll', check);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* storage blocked — bar simply reappears next session */
    }
  };

  if (!armed) return null;

  return (
    <div
      role="dialog"
      aria-label={promo.headline}
      data-promo="blog-50off"
      className={[
        'fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md p-3',
        'sm:inset-x-auto sm:right-5 sm:bottom-5 sm:p-0',
        'transition-all duration-500 ease-out motion-reduce:transition-none',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-6 opacity-0',
      ].join(' ')}
    >
      <div className="relative rounded-xl border border-surface-line bg-white p-5 pr-10 shadow-cardHover sm:p-6 sm:pr-11">
        <button
          type="button"
          onClick={dismiss}
          aria-label={promo.dismissLabel}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full text-body transition-colors hover:bg-surface-blue hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <p className="text-xs font-semibold uppercase tracking-wider text-brand">{promo.eyebrow}</p>
        <p className="mt-1 font-heading text-lg font-bold leading-snug text-ink">{promo.headline}</p>
        <p className="mt-2 text-sm text-body">{promo.body}</p>

        <Link
          href={promo.ctaHref}
          data-promo-cta="blog-50off"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {promo.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
