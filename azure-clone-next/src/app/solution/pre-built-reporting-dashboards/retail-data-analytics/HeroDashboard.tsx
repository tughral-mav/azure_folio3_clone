/** Hero creative — illustrative retail Power BI dashboard (decorative; figures are sample data). */

const KPIS = [
  { l: 'Net sales (WTD)', v: '$4.82M', d: '+6.4% vs plan' },
  { l: 'Gross margin', v: '41.7%', d: '+1.2 pts LY' },
  { l: 'Like-for-like', v: '+5.1%', d: 'vs last year' },
  { l: 'ATV', v: '$58.40', d: '+$2.10' },
];

// sample weekly net sales ($k) for this year vs last year
const TY = [610, 640, 625, 690, 720, 705, 760, 790, 770, 830, 860, 845];
const LY = [590, 600, 615, 630, 650, 660, 680, 700, 710, 730, 750, 760];

const CHANNELS = [
  { c: 'In-store', p: 62 },
  { c: 'Online', p: 29 },
  { c: 'Marketplace', p: 9 },
];

const STORES = [
  { s: 'Downtown', v: '$412K', pct: 100 },
  { s: 'Westfield', v: '$368K', pct: 89 },
  { s: 'Harbor Point', v: '$301K', pct: 73 },
  { s: 'Airport', v: '$244K', pct: 59 },
];

function path(series: number[], w: number, h: number, min: number, max: number) {
  return series
    .map((v, i) => `${i ? 'L' : 'M'}${((i / (series.length - 1)) * w).toFixed(1)} ${(h - ((v - min) / (max - min)) * h).toFixed(1)}`)
    .join(' ');
}

export function HeroDashboard() {
  const W = 320, H = 84;
  const min = Math.min(...LY) - 20;
  const max = Math.max(...TY) + 20;
  const ty = path(TY, W, H, min, max);
  const ly = path(LY, W, H, min, max);
  return (
    <div
      role="img"
      aria-label="Folio3 retail data analytics dashboard in Power BI showing sales, inventory and store KPIs"
      className="relative mx-auto w-full max-w-xl"
    >
      <div className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-cardHover">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-surface-line bg-brand-ink px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="ml-3 text-xs font-semibold text-white/80">Executive Retail Overview · All stores</span>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">Power BI</span>
        </div>

        <div className="space-y-4 p-5">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {KPIS.map((k) => (
              <div key={k.l} className="rounded-xl bg-surface-tint p-3">
                <p className="text-[11px] text-muted">{k.l}</p>
                <p className="mt-1 text-lg font-bold text-ink">{k.v}</p>
                <p className="text-[10px] font-semibold text-brand">{k.d}</p>
              </div>
            ))}
          </div>

          {/* sales trend TY vs LY */}
          <div className="rounded-xl border border-surface-line p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-ink">Weekly net sales</p>
              <p className="flex items-center gap-3 text-[10px] text-muted">
                <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-brand" />This year</span>
                <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-[#9AA6C0]" />Last year</span>
              </p>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-20 w-full" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="rda-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1742E7" stopOpacity="0.2" /><stop offset="100%" stopColor="#1742E7" stopOpacity="0" /></linearGradient>
              </defs>
              <path d={`${ty} L${W} ${H} L0 ${H} Z`} fill="url(#rda-fill)" />
              <path d={ly} fill="none" stroke="#9AA6C0" strokeWidth="1.8" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
              <path d={ty} fill="none" stroke="#1742E7" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          {/* top stores + channel mix */}
          <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl border border-surface-line p-4">
              <p className="text-xs font-semibold text-ink">Top stores by sales</p>
              <ul className="mt-3 space-y-2">
                {STORES.map((s) => (
                  <li key={s.s} className="text-[11px]">
                    <div className="flex justify-between text-body"><span>{s.s}</span><span className="font-semibold text-ink">{s.v}</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-surface-tint"><div className="h-1.5 rounded-full bg-brand" style={{ width: `${s.pct}%` }} /></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-surface-line p-4">
              <p className="text-xs font-semibold text-ink">Channel mix</p>
              <ul className="mt-3 space-y-2">
                {CHANNELS.map((c) => (
                  <li key={c.c} className="flex items-center justify-between text-[11px] text-body">
                    {c.c}
                    <span className="font-semibold text-ink">{c.p}%</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-surface-line pt-2 text-[11px] text-body">
                Stockout rate <span className="font-semibold text-ink">2.3%</span>
              </p>
            </div>
          </div>
          <p className="text-right"><span className="inline-block rounded-full border border-surface-line bg-surface-tint px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">Illustrative</span></p>
        </div>
      </div>

      {/* floating badges */}
      <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-surface-line bg-white px-4 py-3 shadow-cardHover sm:block">
        <p className="text-[11px] text-muted">Sources unified</p>
        <p className="text-sm font-bold text-ink">POS · ERP · E-commerce</p>
      </div>
      <div className="absolute -right-4 -top-5 hidden rounded-xl bg-brand px-4 py-3 text-white shadow-cardHover sm:block">
        <p className="text-[11px] text-white/80">First dashboards</p>
        <p className="text-sm font-bold">In 2–3 weeks</p>
      </div>
    </div>
  );
}
