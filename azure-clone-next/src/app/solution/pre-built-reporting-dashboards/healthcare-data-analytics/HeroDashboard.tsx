'use client';

import { useEffect, useState } from 'react';

/** Hero creative — an animated, coded preview of the healthcare Executive Command Center (sample data),
 *  in a browser frame with floating badges. On load the KPIs count up, bars grow, the trend line draws
 *  and unit bars fill; a live dot pulses and the badges float. Static for reduced-motion users.
 *  Swap for a real Power BI screenshot once one is approved. */
const kpis = [
  { label: 'Bed occupancy', value: 86.4, suffix: '%', delta: '+2.1 pts', good: false },
  { label: '30-day readmissions', value: 11.8, suffix: '%', delta: '−0.9 pts', good: true },
  { label: 'Days in A/R', value: 41.2, suffix: '', delta: '−3.5 days', good: true },
  { label: 'Operating margin', value: 4.7, suffix: '%', delta: '+0.6 pts', good: true },
];

const occupancy = [72, 78, 81, 76, 84, 88, 86, 83, 89, 91, 87, 86];
const readmissions = [14.2, 13.8, 13.9, 13.1, 12.9, 12.6, 12.8, 12.2, 12.0, 11.9, 12.1, 11.8];
const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const units = [
  { name: 'Cardiology', pct: 94 },
  { name: 'Med-Surg', pct: 89 },
  { name: 'ICU', pct: 82 },
  { name: 'Orthopedics', pct: 71 },
];

const COUNT_MS = 1400;

export function HeroDashboard() {
  const [on, setOn] = useState(false);
  const [still, setStill] = useState(false);
  const [t, setT] = useState(0); // 0 → 1 count-up progress
  const [pulse, setPulse] = useState(occupancy.length - 1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true); setOn(true); setT(1); return;
    }
    const start = window.setTimeout(() => setOn(true), 150);
    let raf = 0;
    const t0 = performance.now() + 150;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / COUNT_MS));
      setT(1 - Math.pow(1 - p, 3)); // ease-out
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // after the entrance, the "latest" bar highlight steps through the last few months like a live refresh
    const live = window.setInterval(() => setPulse((i) => (i >= occupancy.length - 1 ? occupancy.length - 4 : i + 1)), 1800);
    return () => { window.clearTimeout(start); cancelAnimationFrame(raf); window.clearInterval(live); };
  }, []);

  const max = Math.max(...readmissions);
  const min = Math.min(...readmissions);
  const line = readmissions
    .map((v, i) => `${(i / (readmissions.length - 1)) * 100},${4 + ((max - v) / (max - min)) * 32}`)
    .join(' ');
  const ease = still ? '' : 'transition-all duration-700 ease-out';

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <style>{`
        @keyframes hc-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @keyframes hc-ping { 0% { transform: scale(1); opacity: .7 } 80%,100% { transform: scale(2.4); opacity: 0 } }
        @media (prefers-reduced-motion: reduce) { .hc-anim { animation: none !important } }
      `}</style>
      <figure
        role="img"
        aria-label="Folio3 healthcare executive dashboard in Power BI showing bed occupancy, readmissions and A/R days"
        className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-cardHover"
      >
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-surface-line bg-brand-ink px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="ml-3 truncate text-xs font-semibold text-white/80">Executive Command Center · All facilities</span>
            <span className="ml-2 flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="hc-anim absolute inline-flex h-full w-full rounded-full bg-emerald-400" style={{ animation: 'hc-ping 1.6s cubic-bezier(0,0,.2,1) infinite' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          </div>
          <span className="hidden rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white sm:inline">Power BI</span>
        </div>

        <div aria-hidden className="space-y-4 bg-surface-tint p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kpis.map((k, i) => (
              <div
                key={k.label}
                className={`rounded-xl border border-surface-line bg-white p-3 ${ease} ${on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                style={{ transitionDelay: still ? undefined : `${i * 90}ms` }}
              >
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted">{k.label}</p>
                <p className="mt-1 text-lg font-bold tabular-nums text-ink">
                  {(k.value * t).toFixed(1)}
                  {k.suffix}
                </p>
                <p className={`text-[10px] font-semibold ${k.good ? 'text-emerald-600' : 'text-[#D9480F]'}`}>{k.delta}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl border border-surface-line bg-white p-3">
              <p className="text-[11px] font-semibold text-ink">Bed occupancy by month</p>
              <div className="mt-3 flex h-24 items-end gap-1.5">
                {occupancy.map((v, i) => (
                  <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                    <span
                      className={`w-full rounded-t ${still ? '' : 'transition-[height,background-color] duration-700 ease-out'} ${i === pulse && on && !still ? 'bg-[#2F69F2]' : 'bg-brand'}`}
                      style={{ height: on ? `${v - 50}px` : '0px', opacity: 0.55 + i * 0.04, transitionDelay: still ? undefined : `${300 + i * 60}ms, 0ms` }}
                    />
                    <span className="text-[9px] text-muted">{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-surface-line bg-white p-3">
              <p className="text-[11px] font-semibold text-ink">30-day readmission rate</p>
              <div
                className={still ? '' : 'transition-[clip-path] duration-[1400ms] ease-out'}
                style={{ clipPath: on ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', transitionDelay: still ? undefined : '500ms' }}
              >
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-3 h-16 w-full">
                  <polyline points={line} fill="none" stroke="#1742E7" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
              <div className="mt-3 space-y-1.5">
                {units.map((u, i) => (
                  <div key={u.name} className="flex items-center gap-2">
                    <span className="w-16 shrink-0 text-[9px] text-muted">{u.name}</span>
                    <span className="h-1.5 flex-1 rounded-full bg-surface-line">
                      <span
                        className={`block h-1.5 rounded-full bg-[#2F69F2] ${still ? '' : 'transition-[width] duration-1000 ease-out'}`}
                        style={{ width: on ? `${u.pct}%` : '0%', transitionDelay: still ? undefined : `${700 + i * 120}ms` }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-right text-[10px] text-muted">Sample data</p>
        </div>
      </figure>

      {/* floating badges */}
      <div
        className="hc-anim absolute -bottom-5 -left-4 hidden rounded-xl border border-surface-line bg-white px-4 py-3 shadow-cardHover sm:block"
        style={{ animation: 'hc-float 4s ease-in-out infinite' }}
      >
        <p className="text-[11px] text-muted">Sources unified</p>
        <p className="text-sm font-bold text-ink">EHR · Claims · Finance</p>
      </div>
      <div
        className="hc-anim absolute -right-4 -top-5 hidden rounded-xl bg-brand px-4 py-3 text-white shadow-cardHover sm:block"
        style={{ animation: 'hc-float 4s ease-in-out 2s infinite' }}
      >
        <p className="text-[11px] text-white/80">Security</p>
        <p className="text-sm font-bold">HIPAA-ready</p>
      </div>
    </div>
  );
}
