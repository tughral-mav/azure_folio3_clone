/** Illustrative forecasting visuals (decorative; all figures are sample data). */

import type { ReactNode } from 'react';

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
// sample monthly revenue ($M): actuals Jan–Sep, model forecast for all 12 months
const ACTUAL = [3.62, 3.48, 3.91, 3.84, 4.02, 4.18, 3.97, 4.21, 4.36];
const FORECAST = [3.58, 3.55, 3.86, 3.9, 3.98, 4.12, 4.05, 4.18, 4.3, 4.42, 4.51, 4.78];
const BUDGET = [3.7, 3.7, 3.8, 3.8, 3.9, 3.9, 4.0, 4.0, 4.1, 4.2, 4.3, 4.5];

function scale(w: number, h: number, min: number, max: number) {
  return (v: number, i: number, n = 12) => [(i / (n - 1)) * w, h - ((v - min) / (max - min)) * h] as const;
}
const path = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

const KPIS = [
  { l: 'FY revenue forecast', v: '$49.1M', d: '+3.4% vs budget' },
  { l: 'Cash runway', v: '22 mo', d: 'Burn $0.4M / mo' },
  { l: 'Forecast accuracy', v: '96.2%', d: 'MAPE 3.8%' },
];

const VARIANCE = [
  { a: 'Revenue', v: 3.4 },
  { a: 'COGS', v: -1.8 },
  { a: 'OpEx', v: -4.6 },
  { a: 'EBITDA', v: 2.1 },
];

export function ForecastHeroDashboard() {
  const W = 360, H = 110;
  const s = scale(W, H, 3.2, 5.0);
  const fc = FORECAST.map((v, i) => s(v, i));
  const ac = ACTUAL.map((v, i) => s(v, i));
  const bd = BUDGET.map((v, i) => s(v, i));
  // confidence band widens over the forecast horizon
  const upper = FORECAST.map((v, i) => s(v + (i >= 8 ? (i - 7) * 0.09 : 0.05), i));
  const lower = FORECAST.map((v, i) => s(v - (i >= 8 ? (i - 7) * 0.09 : 0.05), i));
  const band = `${path(upper)} ${[...lower].reverse().map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')} Z`;
  const todayX = ac[ac.length - 1][0];

  return (
    <div
      role="img"
      aria-label="Folio3 financial forecasting dashboard in Power BI showing rolling 12-month revenue forecast vs actuals"
      className="relative mx-auto w-full max-w-xl"
    >
      <div className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-cardHover">
        <div className="flex items-center justify-between border-b border-surface-line bg-brand-ink px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="ml-3 text-xs font-semibold text-white/80">Financial Forecasting · Rolling 12 months</span>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">Base case</span>
        </div>

        <div className="space-y-4 p-5">
          <div className="grid grid-cols-3 gap-3">
            {KPIS.map((k) => (
              <div key={k.l} className="rounded-xl bg-surface-tint p-3">
                <p className="text-[11px] leading-tight text-muted">{k.l}</p>
                <p className="mt-1 text-lg font-bold text-ink">{k.v}</p>
                <p className="text-[10px] font-semibold text-brand">{k.d}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-surface-line p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold text-ink">Revenue: actual vs forecast ($M)</p>
              <div className="flex gap-3 text-[10px] text-muted">
                <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-brand-navy" />Actual</span>
                <span className="flex items-center gap-1"><span className="h-0.5 w-3 border-t-2 border-dashed border-brand" />Forecast</span>
                <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-[#F2C811]" />Budget</span>
              </div>
            </div>
            <svg viewBox={`0 -6 ${W} ${H + 22}`} className="mt-3 h-32 w-full" aria-hidden="true">
              <path d={band} fill="#1742E7" fillOpacity="0.1" />
              <line x1={todayX} x2={todayX} y1={-4} y2={H} stroke="#DAE3F8" strokeDasharray="3 3" />
              <path d={path(bd)} fill="none" stroke="#F2C811" strokeWidth="1.8" />
              <path d={path(fc)} fill="none" stroke="#1742E7" strokeWidth="2" strokeDasharray="5 4" />
              <path d={path(ac)} fill="none" stroke="#00217F" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx={todayX} cy={ac[ac.length - 1][1]} r="3.5" fill="#00217F" />
              {MONTHS.map((m, i) => (
                <text key={i} x={(i / 11) * W} y={H + 16} textAnchor="middle" fontSize="10" fill="#6A6C70">{m}</text>
              ))}
            </svg>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.3fr_1fr]">
            <div className="rounded-xl border border-surface-line p-4">
              <p className="text-xs font-semibold text-ink">Forecast vs budget variance</p>
              <ul className="mt-3 space-y-2">
                {VARIANCE.map((r) => (
                  <li key={r.a} className="grid grid-cols-[3.5rem_1fr_2.75rem] items-center gap-2 text-[11px]">
                    <span className="text-body">{r.a}</span>
                    <span className="relative h-2 rounded-full bg-surface-tint">
                      <span
                        className={`absolute top-0 h-2 rounded-full ${r.v >= 0 ? 'left-1/2 bg-brand' : 'right-1/2 bg-[#B4BCD0]'}`}
                        style={{ width: `${Math.abs(r.v) * 9}%` }}
                      />
                    </span>
                    <span className={`text-right font-semibold ${r.v >= 0 ? 'text-brand' : 'text-muted'}`}>
                      {r.v > 0 ? '+' : ''}{r.v}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-brand-navy p-4 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Copilot</p>
              <p className="mt-2 text-[11px] leading-snug text-white/90">&ldquo;Why is Q3 cash below forecast?&rdquo;</p>
              <p className="mt-2 text-[11px] leading-snug text-white/70">Receivables collected 9 days slower in EMEA; OpEx ran 4.6% under plan.</p>
            </div>
          </div>
          <p className="text-right"><span className="inline-block rounded-full border border-surface-line bg-surface-tint px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">Illustrative · sample data</span></p>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-surface-line bg-white px-4 py-3 shadow-cardHover sm:block">
        <p className="text-[11px] text-muted">Models</p>
        <p className="text-sm font-bold text-ink">Azure Machine Learning</p>
      </div>
    </div>
  );
}

/** Small card thumbnails (16:9) styled like the Folio3 Power BI dashboards. */
function ThumbFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex aspect-[16/9] w-full overflow-hidden rounded-lg border border-surface-line bg-[#F3F5FA]">
      <div className="flex w-[18%] flex-col justify-between bg-[#4A5A8C] p-2">
        <span className="text-[8px] font-bold uppercase leading-tight text-white sm:text-[9px]">{title}</span>
        <span className="text-[7px] font-semibold text-white/80">folio3 | Azure</span>
      </div>
      <div className="flex-1 p-2">{children}</div>
    </div>
  );
}

function Tile({ l, v }: { l: string; v: string }) {
  return (
    <div className="rounded border border-surface-line bg-white px-1.5 py-1 text-center">
      <p className="truncate text-[7px] text-muted">{l}</p>
      <p className="text-[11px] font-bold text-[#3B4A7A]">{v}</p>
    </div>
  );
}

const CASH = [8.2, 7.9, 8.4, 8.1, 7.6, 7.8, 7.3, 7.0, 7.2, 6.8, 6.5, 6.3];

export function CashFlowThumb() {
  const W = 300, H = 90;
  const s = scale(W, H, 5.5, 9);
  const pts = CASH.map((v, i) => s(v, i));
  const line = path(pts);
  return (
    <ThumbFrame title="Cash Flow & Runway">
      <div className="grid grid-cols-3 gap-1.5">
        <Tile l="Cash balance" v="$8.2M" />
        <Tile l="Monthly burn" v="$0.4M" />
        <Tile l="Runway" v="22 mo" />
      </div>
      <div className="mt-1.5 grid h-[62%] grid-cols-[1.6fr_1fr] gap-1.5">
        <div className="rounded border border-surface-line bg-white p-1">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
            <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="#4A5A8C" fillOpacity="0.25" />
            <path d={line} fill="none" stroke="#3B4A7A" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="flex items-end gap-1 rounded border border-surface-line bg-white p-1.5">
          {[60, 75, 55, 80, 68, 90].map((h, i) => (
            <span key={i} className="flex flex-1 flex-col justify-end gap-0.5" style={{ height: '100%' }}>
              <span className="rounded-sm bg-[#4A5A8C]" style={{ height: `${h * 0.55}%` }} />
              <span className="rounded-sm bg-[#B4BCD0]" style={{ height: `${(100 - h) * 0.4}%` }} />
            </span>
          ))}
        </div>
      </div>
    </ThumbFrame>
  );
}

export function ScenarioThumb() {
  const W = 300, H = 90;
  const s = scale(W, H, 3, 6);
  const mk = (g: number) => path(Array.from({ length: 12 }, (_, i) => s(4 * (1 + g) ** (i / 11), i)));
  return (
    <ThumbFrame title="Scenario Planning">
      <div className="flex gap-1">
        {['Best', 'Base', 'Worst'].map((c, i) => (
          <span key={c} className={`rounded px-2 py-0.5 text-[8px] font-semibold ${i === 1 ? 'bg-[#3B4A7A] text-white' : 'border border-surface-line bg-white text-muted'}`}>{c}</span>
        ))}
      </div>
      <div className="mt-1.5 grid h-[74%] grid-cols-[1.6fr_1fr] gap-1.5">
        <div className="rounded border border-surface-line bg-white p-1">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
            <path d={mk(0.3)} fill="none" stroke="#B4BCD0" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d={mk(0.1)} fill="none" stroke="#3B4A7A" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            <path d={mk(-0.15)} fill="none" stroke="#F2C811" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="space-y-1.5 rounded border border-surface-line bg-white p-1.5">
          {['Growth', 'Price', 'Hiring'].map((d, i) => (
            <div key={d}>
              <p className="text-[7px] text-muted">{d}</p>
              <span className="relative mt-0.5 block h-1 rounded-full bg-surface-line">
                <span className="absolute -top-[3px] h-2.5 w-2.5 rounded-full bg-[#3B4A7A]" style={{ left: `${[55, 35, 70][i]}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </ThumbFrame>
  );
}
