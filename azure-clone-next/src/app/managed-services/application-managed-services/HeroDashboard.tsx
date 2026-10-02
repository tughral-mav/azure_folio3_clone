/** Hero creative — illustrative application-health dashboard (decorative; figures are sample data). */

const KPIS = [
  { l: 'Uptime (30d)', v: '99.98%' },
  { l: 'Avg response', v: '182 ms' },
  { l: 'SLA met', v: '100%' },
];

// sample p95 response times (ms) for the sparkline
const SERIES = [240, 228, 236, 214, 222, 205, 210, 196, 201, 188, 194, 182, 186, 178];

const TICKETS = [
  { p: 'P2', t: 'Checkout API timeout', s: 'Fixed', tone: 'done' },
  { p: 'P3', t: 'Report export slow', s: 'In release', tone: 'prog' },
  { p: 'P4', t: 'Label typo on login', s: 'Planned', tone: 'todo' },
] as const;

const LAYERS = ['App Service', 'Azure SQL', 'Functions', 'App Insights'];

function sparkPath(w: number, h: number) {
  const min = Math.min(...SERIES) - 10;
  const max = Math.max(...SERIES) + 10;
  const pts = SERIES.map((v, i) => [(i / (SERIES.length - 1)) * w, h - ((v - min) / (max - min)) * h]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return { line, area: `${line} L${w} ${h} L0 ${h} Z`, last: pts[pts.length - 1] };
}

export function HeroDashboard() {
  const W = 320, H = 84;
  const { line, area, last } = sparkPath(W, H);
  return (
    <div role="img" aria-label="Illustrative application health dashboard showing uptime, response time, SLA status and recent tickets" className="relative mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-cardHover">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-surface-line bg-brand-ink px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="ml-3 text-xs font-semibold text-white/80">Application Health · Customer Portal</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" /></span>
            Live
          </span>
        </div>

        <div className="space-y-4 p-5">
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3">
            {KPIS.map((k) => (
              <div key={k.l} className="rounded-xl bg-surface-tint p-3">
                <p className="text-[11px] text-muted">{k.l}</p>
                <p className="mt-1 text-lg font-bold text-ink">{k.v}</p>
              </div>
            ))}
          </div>

          {/* response-time chart */}
          <div className="rounded-xl border border-surface-line p-4">
            <p className="text-xs font-semibold text-ink">p95 response time</p>
            <p className="mt-0.5 text-[11px] font-semibold text-brand">↓ 24% after tuning</p>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-20 w-full" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="hd-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1742E7" stopOpacity="0.22" /><stop offset="100%" stopColor="#1742E7" stopOpacity="0" /></linearGradient>
              </defs>
              <path d={area} fill="url(#hd-fill)" />
              <path d={line} fill="none" stroke="#1742E7" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <circle cx={last[0]} cy={last[1]} r="3.5" fill="#1742E7" />
            </svg>
          </div>

          {/* tickets + layer health */}
          <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl border border-surface-line p-4">
              <p className="text-xs font-semibold text-ink">Recent tickets</p>
              <ul className="mt-3 space-y-2.5">
                {TICKETS.map((t) => (
                  <li key={t.t} className="flex items-center gap-2 text-[11px]">
                    <span className="rounded bg-brand-navy px-1.5 py-0.5 font-bold text-white">{t.p}</span>
                    <span className="flex-1 truncate text-body">{t.t}</span>
                    <span className={t.tone === 'done' ? 'font-semibold text-brand' : t.tone === 'prog' ? 'font-semibold text-brand-navy' : 'text-muted'}>{t.s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-surface-line p-4">
              <p className="text-xs font-semibold text-ink">Azure + app layers</p>
              <ul className="mt-3 space-y-2">
                {LAYERS.map((l) => (
                  <li key={l} className="flex items-center justify-between text-[11px] text-body">
                    {l}
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#1742E7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-right"><span className="inline-block rounded-full border border-surface-line bg-surface-tint px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">Illustrative</span></p>
        </div>
      </div>

      {/* floating badges */}
      <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-surface-line bg-white px-4 py-3 shadow-cardHover sm:block">
        <p className="text-[11px] text-muted">P1 first response</p>
        <p className="text-sm font-bold text-ink">30 min, 24/7</p>
      </div>
      <div className="absolute -right-6 top-[34%] hidden rounded-xl bg-brand px-4 py-3 text-white shadow-cardHover sm:block">
        <p className="text-[11px] text-white/80">Handover</p>
        <p className="text-sm font-bold">Week 9: steady state</p>
      </div>
    </div>
  );
}
