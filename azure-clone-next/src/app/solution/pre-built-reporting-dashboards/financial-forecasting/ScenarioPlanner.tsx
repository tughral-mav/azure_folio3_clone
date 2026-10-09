'use client';

/** Interactive what-if demo (illustrative; sample company, simplified driver model). */

import { useMemo, useState } from 'react';

type Drivers = { growth: number; price: number; hires: number };
type Key = 'best' | 'base' | 'worst';

const PRESETS: Record<Key, Drivers & { label: string }> = {
  best: { label: 'Best case', growth: 25, price: 4, hires: 4 },
  base: { label: 'Base case', growth: 12, price: 2, hires: 8 },
  worst: { label: 'Worst case', growth: -8, price: -2, hires: 15 },
};
const ORDER: Key[] = ['best', 'base', 'worst'];

// sample company: $4.0M monthly revenue, 42% COGS at today's prices, $2.3M fixed OpEx, $9M cash
const START_REV = 4.0;
const COGS = 0.42;
const OPEX = 2.3;
const COST_PER_HIRE = 0.015;
const START_CASH = 9.0;

function project({ growth, price, hires }: Drivers) {
  const p = 1 + price / 100;
  const margin = 1 - COGS / p;
  const opex = OPEX + hires * COST_PER_HIRE;
  const revenue: number[] = [];
  const cash: number[] = [];
  let c = START_CASH;
  let runway: number | null = null;
  for (let m = 0; m < 36; m++) {
    const r = START_REV * p * (1 + growth / 100) ** (m / 12);
    c += r * margin - opex;
    if (m < 12) {
      revenue.push(r);
      cash.push(c);
    }
    if (c < 0 && runway === null) runway = m + 1;
  }
  return {
    revenue,
    cash,
    total: revenue.reduce((a, b) => a + b, 0),
    margin,
    endCash: cash[11],
    runway,
  };
}

const fmt = (v: number) => `$${v.toFixed(1)}M`;

function Slider({
  label, value, min, max, unit, onChange,
}: { label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="font-semibold text-brand">{value > 0 && unit === '%' ? '+' : ''}{value}{unit}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#1742E7]"
      />
    </label>
  );
}

export function ScenarioPlanner() {
  const [active, setActive] = useState<Key | 'custom'>('base');
  const [d, setD] = useState<Drivers>(PRESETS.base);
  const cur = useMemo(() => project(d), [d]);
  const all = useMemo(() => ORDER.map((k) => ({ k, ...project(PRESETS[k]) })), []);

  const pick = (k: Key) => {
    setActive(k);
    setD(PRESETS[k]);
  };
  const tweak = (patch: Partial<Drivers>) => {
    setActive('custom');
    setD((prev) => ({ ...prev, ...patch }));
  };

  const W = 520, H = 160;
  const vals = [...cur.cash, ...all.flatMap((s) => s.cash)];
  const MIN = Math.min(0, Math.floor(Math.min(...vals)));
  const MAX = Math.ceil(Math.max(...vals)) + 1;
  const step = Math.max(2, Math.ceil((MAX - MIN) / 4 / 2) * 2);
  const grid = Array.from({ length: Math.floor((MAX - MIN) / step) + 1 }, (_, i) => MIN + i * step);
  const pt = (v: number, i: number) => [(i / 11) * W, H - ((v - MIN) / (MAX - MIN)) * H] as const;
  const line = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${pt(v, i).map((n) => n.toFixed(1)).join(' ')}`).join(' ');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-line bg-brand-ink px-5 py-3">
        <span className="text-xs font-semibold text-white/80">Scenario Planning · What-if analysis</span>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Scenario">
          {ORDER.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={active === k}
              onClick={() => pick(k)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                active === k ? 'bg-white text-brand-ink' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {PRESETS[k].label}
            </button>
          ))}
          {active === 'custom' && (
            <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">Custom</span>
          )}
        </div>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_1.7fr] lg:p-6">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Move the drivers</p>
          <Slider label="Annual growth rate" value={d.growth} min={-20} max={40} unit="%" onChange={(v) => tweak({ growth: v })} />
          <Slider label="Price change" value={d.price} min={-10} max={10} unit="%" onChange={(v) => tweak({ price: v })} />
          <Slider label="Hiring plan (new heads)" value={d.hires} min={0} max={30} unit="" onChange={(v) => tweak({ hires: v })} />
          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              { l: '12-month revenue', v: fmt(cur.total) },
              { l: 'Gross margin', v: `${(cur.margin * 100).toFixed(1)}%` },
              { l: 'Cash at month 12', v: fmt(cur.endCash) },
              { l: 'Cash runway', v: cur.runway ? `${cur.runway} mo` : 'Cash positive' },
            ].map((k) => (
              <div key={k.l} className="rounded-xl bg-surface-tint p-3">
                <p className="text-[11px] text-muted">{k.l}</p>
                <p className="mt-1 text-lg font-bold text-ink" aria-live="polite">{k.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="rounded-xl border border-surface-line p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold text-ink">Cash balance by scenario ($M)</p>
              <div className="flex flex-wrap gap-3 text-[11px] text-muted">
                <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-brand" />Your scenario</span>
                <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-[#B4BCD0]" />Best / base / worst</span>
              </div>
            </div>
            <svg viewBox={`0 -8 ${W} ${H + 30}`} className="mt-3 h-auto w-full" role="img" aria-label="Line chart comparing cash balance across best, base, worst and your scenario">
              {grid.map((g) => (
                <g key={g}>
                  <line x1="0" x2={W} y1={pt(g, 0)[1]} y2={pt(g, 0)[1]} stroke="#DAE3F8" />
                  <text x="2" y={pt(g, 0)[1] - 3} fontSize="10" fill="#6A6C70">{g}</text>
                </g>
              ))}
              {all.map((s) => (
                <path key={s.k} d={line(s.cash)} fill="none" stroke="#B4BCD0" strokeWidth="1.5" strokeDasharray="4 4" />
              ))}
              <path d={line(cur.cash)} fill="none" stroke="#1742E7" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              {months.map((m, i) => (
                <text key={m} x={Math.min(Math.max((i / 11) * W, 10), W - 10)} y={H + 18} textAnchor="middle" fontSize="10" fill="#6A6C70">{m}</text>
              ))}
            </svg>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <caption className="sr-only">Side-by-side scenario comparison</caption>
              <thead>
                <tr className="border-b border-surface-line text-xs text-muted">
                  <th scope="col" className="py-2 font-semibold">Side by side</th>
                  <th scope="col" className="py-2 font-semibold">Revenue</th>
                  <th scope="col" className="py-2 font-semibold">Margin</th>
                  <th scope="col" className="py-2 font-semibold">Cash M12</th>
                  <th scope="col" className="py-2 font-semibold">Runway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-line">
                {all.map((s) => (
                  <tr key={s.k} className={active === s.k ? 'bg-brand/5 font-semibold text-ink' : 'text-body'}>
                    <th scope="row" className="py-2 font-semibold text-ink">{PRESETS[s.k].label}</th>
                    <td className="py-2">{fmt(s.total)}</td>
                    <td className="py-2">{(s.margin * 100).toFixed(1)}%</td>
                    <td className="py-2">{fmt(s.endCash)}</td>
                    <td className="py-2">{s.runway ? `${s.runway} mo` : 'Cash positive'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-right">
            <span className="inline-block rounded-full border border-surface-line bg-surface-tint px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
              Illustrative · sample company
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
