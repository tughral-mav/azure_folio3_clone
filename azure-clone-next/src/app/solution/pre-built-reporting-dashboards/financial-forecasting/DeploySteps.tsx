'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

/** Deployment fold — scroll-driven process: a line fills as the section scrolls into view and each step lights up when reached. */
export function DeploySteps({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLOListElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setProgress(1); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      // starts when the row reaches 85% of the viewport, completes by 35%
      setProgress(Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.5))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const n = steps.length;

  return (
    <ol ref={ref} className="relative mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-0">
      {/* track + fill: vertical on mobile, horizontal on desktop (between first and last node centres) */}
      <span aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-0.5 bg-surface-line lg:bottom-auto lg:left-[calc(100%/10)] lg:right-[calc(100%/10)] lg:top-7 lg:h-0.5 lg:w-auto" />
      <span aria-hidden="true" className="absolute left-7 top-7 w-0.5 bg-brand lg:hidden" style={{ height: `calc((100% - 3.5rem) * ${progress})` }} />
      <span aria-hidden="true" className="absolute left-[calc(100%/10)] top-7 hidden h-0.5 bg-brand lg:block" style={{ width: `calc((100% - 100%/5) * ${progress})` }} />
      {steps.map((t, i) => {
        const on = progress >= (n === 1 ? 0 : i / (n - 1)) - 0.001;
        return (
          <li key={t} className="relative flex items-center gap-5 lg:flex-col lg:gap-0 lg:px-2 lg:text-center">
            <span className={clsx('relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold transition-all duration-500',
              on ? 'scale-100 border-brand bg-brand text-white shadow-cardHover' : 'scale-90 border-surface-line bg-white text-muted')}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={clsx('text-lg transition-all duration-500 lg:mt-5', on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-40')}>{t}</h3>
          </li>
        );
      })}
    </ol>
  );
}
