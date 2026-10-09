/** Illustrative dashboard-card thumbnails (decorative; all figures are sample data). */

import type { ReactNode } from 'react';

function scale(w: number, h: number, min: number, max: number) {
  return (v: number, i: number, n = 12) => [(i / (n - 1)) * w, h - ((v - min) / (max - min)) * h] as const;
}
const path = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

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
