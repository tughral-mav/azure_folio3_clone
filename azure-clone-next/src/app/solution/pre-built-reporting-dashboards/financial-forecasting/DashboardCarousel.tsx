'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode, type TransitionEvent } from 'react';
import clsx from 'clsx';
import s from './DashboardCarousel.module.css';

const AUTOPLAY_MS = 2000;
const SWIPE_PX = 50;
// clones of the first slides appended after the last one, enough to fill the widest view (3 per row)
const CLONES = 3;

/**
 * Card carousel (used for the dashboard views and the case studies): one row, 3/2/1 cards per view, auto-advances every 2s,
 * loops seamlessly via appended clones. Slides are server-rendered children, so every card's
 * text stays in the HTML; clones are only added after hydration and hidden from AT.
 */
export function DashboardCarousel({ slides, label, itemName = 'dashboard' }: { slides: ReactNode[]; label: string; itemName?: string }) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  // bumps on every user/autoplay move, so the 2s timer restarts from each move (not from loop resets)
  const [tick, setTick] = useState(0);
  const indexRef = useRef(0);
  indexRef.current = index;
  const drag = useRef<{ x: number; id: number } | null>(null);
  // set when a drag actually moved, so the click that ends it doesn't follow a link inside a card
  const moved = useRef(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReduced(mq.matches);
    const onVis = () => setHidden(document.hidden);
    onMq();
    onVis();
    mq.addEventListener('change', onMq);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      mq.removeEventListener('change', onMq);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // instant reposition to an equivalent slot, then animate to the target on the next frame
  const jumpThen = useCallback((from: number, to: number) => {
    setAnimate(false);
    setIndex(from);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(to);
      }),
    );
  }, []);

  const moveBy = useCallback(
    (d: number) => {
      setTick((t) => t + 1);
      const cur = indexRef.current;
      if (reduced || !mounted) {
        setAnimate(false);
        setIndex((((cur + d) % n) + n) % n);
        return;
      }
      const t = cur + d;
      if (t < 0) jumpThen(cur + n, t + n);
      else if (t > n) jumpThen(cur - n, t - n);
      else {
        setAnimate(true);
        setIndex(t);
      }
    },
    [jumpThen, mounted, n, reduced],
  );

  const goTo = useCallback(
    (k: number) => {
      setTick((t) => t + 1);
      const cur = indexRef.current;
      if (reduced) {
        setAnimate(false);
        setIndex(k);
      } else if (cur >= n) jumpThen(cur - n, k);
      else {
        setAnimate(true);
        setIndex(k);
      }
    },
    [jumpThen, n, reduced],
  );

  // after sliding onto the first clone, snap back to the real first slide (identical view, no visible jump)
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (indexRef.current >= n) {
      setAnimate(false);
      setIndex(indexRef.current - n);
    }
  };

  const paused = hover || focus || hidden || dragging || reduced;
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => moveBy(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [paused, tick, moveBy]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, id: e.pointerId };
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setAnimate(false);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== e.pointerId) return;
    const d = e.clientX - drag.current.x;
    if (Math.abs(d) > 5) moved.current = true;
    setDx(d);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>, cancelled = false) => {
    if (drag.current?.id !== e.pointerId) return;
    const delta = cancelled ? 0 : e.clientX - drag.current.x;
    drag.current = null;
    // the click (if any) fires right after pointerup; clear afterwards so later keyboard clicks still work
    window.setTimeout(() => { moved.current = false; }, 0);
    setDragging(false);
    setDx(0);
    if (Math.abs(delta) > SWIPE_PX) moveBy(delta < 0 ? 1 : -1);
    else {
      setAnimate(!reduced);
      setTick((t) => t + 1);
    }
  };

  const active = ((index % n) + n) % n;
  const showClones = mounted && !reduced;

  return (
    <div
      className={s.root}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(false);
      }}
    >
      <div className="relative">
        <div
          className={clsx(s.viewport, dragging && s.dragging)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => endDrag(e)}
          onPointerCancel={(e) => endDrag(e, true)}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => {
            if (moved.current) {
              e.preventDefault();
              e.stopPropagation();
              moved.current = false;
            }
          }}
        >
          <div
            className={clsx(s.track, (!animate || dragging) && s.noTransition)}
            style={{ '--i': index, '--dx': `${dx}px` } as CSSProperties}
            onTransitionEnd={onTransitionEnd}
            aria-live={paused ? 'polite' : 'off'}
          >
            {slides.map((slide, i) => (
              <div key={i} className={s.slide} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`}>
                {slide}
              </div>
            ))}
            {showClones &&
              slides.slice(0, CLONES).map((slide, i) => (
                <div key={`clone-${i}`} className={s.slide} aria-hidden="true" inert>
                  {slide}
                </div>
              ))}
          </div>
        </div>
        <button type="button" className={clsx(s.arrow, s.prev)} aria-label={`Previous ${itemName}`} onClick={() => moveBy(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button type="button" className={clsx(s.arrow, s.next)} aria-label={`Next ${itemName}`} onClick={() => moveBy(1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
      <div className={s.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={clsx(s.dot, i === active && s.dotActive)}
            aria-label={`Go to ${itemName} ${i + 1} of ${n}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
