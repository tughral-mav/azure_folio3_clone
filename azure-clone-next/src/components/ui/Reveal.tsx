'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type Anim = 'fadeIn' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn';

/**
 * Scroll-entrance wrapper — replicates Elementor Motion Effects.
 * IntersectionObserver triggers a 1.25s CSS animation when the element enters
 * the viewport. Zero animation libraries; honors prefers-reduced-motion (via CSS).
 */
export function Reveal({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  animation?: Anim;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    let done = false;
    const reveal = () => { if (!done) { done = true; setShown(true); } };
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) { reveal(); io.disconnect(); break; } },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    // Safety net: content must NEVER stay invisible if the observer misfires
    // (fast scroll / hydration timing). Worst case it shows without the animation.
    const t = window.setTimeout(reveal, 1800);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, [shown]);

  return (
    <div
      ref={ref}
      className={clsx('reveal', shown && ['is-in', `a-${animation}`], className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
