'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './styles.module.css';

/** Scoped entrance reveal (fade-up on scroll into view), matched to the live's Elementor
 *  entrance feel. Kept local to this page so it never affects the shared Reveal/home. */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); o.disconnect(); } }, { threshold: 0.15 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${styles.reveal} ${inView ? styles.in : ''} ${className}`} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
