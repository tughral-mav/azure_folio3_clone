'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animated count-up — replicates the live stat counters (0 → value over ~2s
 * when scrolled into view). Honors prefers-reduced-motion (renders final value).
 */
export function Counter({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2000,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(to);
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setStarted(true);
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const v = to * eased;
        setValue(decimals > 0 ? Number(v.toFixed(decimals)) : Math.round(v));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, started, decimals]);

  return (
    <span ref={ref} data-counter className={className}>
      {prefix}{value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}
