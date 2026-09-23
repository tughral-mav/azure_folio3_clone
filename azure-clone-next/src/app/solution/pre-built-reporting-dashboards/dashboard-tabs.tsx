'use client';

import { useState } from 'react';
import Image from 'next/image';

export type DashboardFunction = {
  id: string;
  tab: string;
  title: string;
  body: string;
  listLabel: string;
  items: string[];
  /** Real dashboard screenshot. When unset, a coded preview is shown instead. */
  img?: string;
  /** Pixel height of `img` at its 1600px width (defaults to 913). */
  imgHeight?: number;
  preview: { accent: string; kpis: { label: string; value: string }[]; bars: number[] };
};

function DashboardPreview({ fn }: { fn: DashboardFunction }) {
  if (fn.img) {
    return (
      <a href={fn.img} target="_blank" rel="noopener" className="block cursor-zoom-in" title="Open full-size dashboard">
        <Image
          src={fn.img}
          alt={`${fn.title} — pre-built Power BI reporting dashboard`}
          width={1600}
          height={fn.imgHeight ?? 913}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full rounded-xl border border-surface-line shadow-card"
        />
      </a>
    );
  }
  const { accent, kpis, bars } = fn.preview;
  const max = Math.max(...bars);
  return (
    <div
      role="img"
      aria-label={`${fn.title} — pre-built Power BI reporting dashboard preview`}
      className="overflow-hidden rounded-xl border border-surface-line bg-white shadow-card"
    >
      <div className="flex items-center justify-between px-5 py-3 text-white" style={{ background: accent }}>
        <span className="text-sm font-semibold">{fn.title}</span>
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="h-2 w-2 rounded-full bg-white/60" />
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg bg-[#f4f7fb] p-3">
            <div className="text-[11px] uppercase tracking-wide text-body">{k.label}</div>
            <div className="mt-1 text-lg font-bold text-ink">{k.value}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 px-4 pb-4 sm:grid-cols-[2fr_1fr]">
        <div className="flex h-40 items-end gap-2 rounded-lg bg-[#f4f7fb] p-3">
          {bars.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{ height: `${(b / max) * 100}%`, background: accent, opacity: 0.45 + (0.55 * b) / max }}
            />
          ))}
        </div>
        <div className="flex h-40 items-center justify-center rounded-lg bg-[#f4f7fb]">
          <div
            className="h-24 w-24 rounded-full"
            style={{ background: `conic-gradient(${accent} 0 62%, ${accent}66 62% 85%, #d7deea 85% 100%)` }}
          >
            <div className="m-[22%] h-[56%] w-[56%] rounded-full bg-[#f4f7fb]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardTabs({ functions }: { functions: DashboardFunction[] }) {
  const [active, setActive] = useState(functions[0].id);

  return (
    <div>
      <div role="tablist" aria-label="Dashboard solutions by business function" className="flex flex-wrap justify-center gap-2">
        {functions.map((fn) => (
          <button
            key={fn.id}
            type="button"
            role="tab"
            id={`tab-${fn.id}`}
            aria-selected={active === fn.id}
            aria-controls={`panel-${fn.id}`}
            onClick={() => setActive(fn.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === fn.id
                ? 'border-brand bg-brand text-white'
                : 'border-surface-line bg-white text-ink hover:border-brand hover:text-brand'
            }`}
          >
            {fn.tab}
          </button>
        ))}
      </div>

      {/* All panels stay in the HTML (only visually hidden) so every function's copy is crawlable. */}
      {functions.map((fn) => (
        <div
          key={fn.id}
          role="tabpanel"
          id={`panel-${fn.id}`}
          aria-labelledby={`tab-${fn.id}`}
          className={`mt-10 grid items-center gap-10 lg:grid-cols-2 ${active === fn.id ? '' : 'hidden'}`}
        >
          <div>
            <h3 className="text-2xl font-semibold text-ink lg:text-3xl">{fn.title}</h3>
            <p className="mt-4 leading-relaxed text-body">{fn.body}</p>
            <p className="mt-6 text-sm font-semibold text-ink">{fn.listLabel}</p>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {fn.items.map((it) => (
                <li key={it} className="flex gap-3 text-sm text-body">
                  <span aria-hidden className="mt-0.5 shrink-0 text-brand">✓</span>
                  <span className="leading-relaxed">{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <DashboardPreview fn={fn} />
        </div>
      ))}
    </div>
  );
}
