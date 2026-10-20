'use client';

import { useState } from 'react';
import clsx from 'clsx';

type Chart =
  | { kind: 'bars'; title: string; labels: string[]; values: number[]; unit?: string }
  | { kind: 'line'; title: string; labels: string[]; values: number[]; target?: number; unit?: string }
  | { kind: 'hbars'; title: string; labels: string[]; values: number[]; unit?: string };

export type GalleryDashboard = {
  id: string;
  name: string;
  builtFor: string;
  kpis: { label: string; value: string; delta: string; good: boolean }[];
  main: Chart;
  side: Chart;
};

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

/** Sample-data previews of the healthcare dashboards (coded, not screenshots). */
export const galleryDashboards: GalleryDashboard[] = [
  {
    id: 'executive',
    name: 'Executive Command Center',
    builtFor: 'CEO, CFO, board',
    kpis: [
      { label: 'Net patient revenue', value: '$48.2M', delta: '+5.4% vs plan', good: true },
      { label: 'Operating margin', value: '4.7%', delta: '+0.6 pts', good: true },
      { label: 'Case mix index', value: '1.62', delta: '+0.04', good: true },
      { label: 'Bed occupancy', value: '86.4%', delta: '+2.1 pts', good: false },
    ],
    main: { kind: 'bars', title: 'Net patient revenue by month ($M)', labels: MONTHS, values: [3.6, 3.7, 3.9, 3.8, 4.0, 4.1, 3.9, 4.2, 4.3, 4.1, 4.2, 4.4] },
    side: { kind: 'hbars', title: 'Patient volume by service line', labels: ['Inpatient', 'Outpatient', 'Emergency', 'Surgery'], values: [38, 27, 22, 13], unit: '%' },
  },
  {
    id: 'flow',
    name: 'Patient Flow and Capacity',
    builtFor: 'COO, nursing leadership',
    kpis: [
      { label: 'ED wait time', value: '38 min', delta: '−6 min', good: true },
      { label: 'Door-to-provider', value: '22 min', delta: '−3 min', good: true },
      { label: 'Avg length of stay', value: '4.3 days', delta: '+0.2 days', good: false },
      { label: 'Discharges before noon', value: '31%', delta: '+4 pts', good: true },
    ],
    main: { kind: 'bars', title: 'ED arrivals by hour of day', labels: ['0', '3', '6', '9', '12', '15', '18', '21'], values: [14, 9, 12, 31, 38, 35, 29, 20] },
    side: { kind: 'hbars', title: 'Bed turnover by unit', labels: ['Med-Surg', 'Cardiology', 'ICU', 'Ortho'], values: [5.8, 4.9, 3.1, 4.4] },
  },
  {
    id: 'quality',
    name: 'Clinical Quality and Safety',
    builtFor: 'CMO, quality teams',
    kpis: [
      { label: '30-day readmissions', value: '11.8%', delta: '−0.9 pts', good: true },
      { label: 'CLABSI rate', value: '0.62', delta: '−0.11', good: true },
      { label: 'Mortality index', value: '0.91', delta: '−0.03', good: true },
      { label: 'Core measures', value: '94.6%', delta: '+1.2 pts', good: true },
    ],
    main: { kind: 'line', title: '30-day readmission rate vs target (%)', labels: MONTHS, values: [14.2, 13.8, 13.9, 13.1, 12.9, 12.6, 12.8, 12.2, 12.0, 11.9, 12.1, 11.8], target: 12.5 },
    side: { kind: 'hbars', title: 'Readmissions by unit (%)', labels: ['Cardiology', 'Med-Surg', 'Pulmonary', 'Ortho'], values: [15.1, 12.4, 13.7, 7.9] },
  },
  {
    id: 'rcm',
    name: 'Revenue Cycle',
    builtFor: 'CFO, RCM teams',
    kpis: [
      { label: 'Days in A/R', value: '41.2', delta: '−3.5 days', good: true },
      { label: 'Clean claim rate', value: '93.1%', delta: '+1.8 pts', good: true },
      { label: 'Denial rate', value: '8.4%', delta: '+0.6 pts', good: false },
      { label: 'Net collection rate', value: '96.7%', delta: '+0.4 pts', good: true },
    ],
    main: { kind: 'line', title: 'Days in A/R trend', labels: MONTHS, values: [48.1, 47.4, 46.9, 46.2, 45.0, 44.6, 44.1, 43.5, 42.9, 42.4, 41.9, 41.2], target: 40 },
    side: { kind: 'hbars', title: 'Denials by payer (%)', labels: ['Medicare', 'Medicaid', 'Commercial', 'Self-pay'], values: [6.2, 11.3, 8.1, 4.4] },
  },
];

function BarChart({ c, accent }: { c: Extract<Chart, { kind: 'bars' }>; accent: string }) {
  const max = Math.max(...c.values);
  return (
    <div className="flex h-36 items-end gap-1.5">
      {c.values.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <span className="w-full rounded-t transition-all duration-700" style={{ height: `${(v / max) * 112}px`, background: accent, opacity: 0.45 + (0.55 * v) / max }} />
          <span className="text-[9px] text-muted">{c.labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ c, accent }: { c: Extract<Chart, { kind: 'line' }>; accent: string }) {
  const all = c.target !== undefined ? [...c.values, c.target] : c.values;
  const max = Math.max(...all);
  const min = Math.min(...all);
  const y = (v: number) => 6 + ((max - v) / (max - min || 1)) * 88;
  const pts = c.values.map((v, i) => `${(i / (c.values.length - 1)) * 100},${y(v)}`).join(' ');
  return (
    <div className="h-36">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[124px] w-full">
        {c.target !== undefined && (
          <line x1="0" x2="100" y1={y(c.target)} y2={y(c.target)} stroke="#D9480F" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        )}
        <polyline points={`0,100 ${pts} 100,100`} fill={accent} opacity="0.1" />
        <polyline points={pts} fill="none" stroke={accent} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="flex justify-between text-[9px] text-muted">
        {c.labels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  );
}

function HBarChart({ c, accent }: { c: Extract<Chart, { kind: 'hbars' }>; accent: string }) {
  const max = Math.max(...c.values);
  return (
    <div className="space-y-2.5">
      {c.labels.map((l, i) => (
        <div key={l} className="flex items-center gap-2">
          <span className="w-20 shrink-0 text-[11px] text-body">{l}</span>
          <span className="h-2 flex-1 rounded-full bg-surface-line">
            <span className="block h-2 rounded-full transition-all duration-700" style={{ width: `${(c.values[i] / max) * 100}%`, background: accent }} />
          </span>
          <span className="w-10 shrink-0 text-right text-[11px] font-semibold text-ink">
            {c.values[i]}
            {c.unit ?? ''}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChartCard({ c, accent }: { c: Chart; accent: string }) {
  return (
    <div className="rounded-xl border border-surface-line bg-white p-4">
      <p className="mb-3 text-xs font-semibold text-ink">{c.title}</p>
      {c.kind === 'bars' && <BarChart c={c} accent={accent} />}
      {c.kind === 'line' && <LineChart c={c} accent={accent} />}
      {c.kind === 'hbars' && <HBarChart c={c} accent={accent} />}
    </div>
  );
}

export function DashboardGallery({ dashboards = galleryDashboards }: { dashboards?: GalleryDashboard[] }) {
  const [active, setActive] = useState(dashboards[0].id);
  const accent = '#1742E7';

  return (
    <div>
      <div role="tablist" aria-label="Healthcare dashboard previews" className="flex flex-wrap justify-center gap-2">
        {dashboards.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            id={`hc-tab-${d.id}`}
            aria-selected={active === d.id}
            aria-controls={`hc-panel-${d.id}`}
            onClick={() => setActive(d.id)}
            className={clsx(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              active === d.id ? 'border-brand bg-brand text-white' : 'border-surface-line bg-white text-ink hover:border-brand hover:text-brand',
            )}
          >
            {d.name}
          </button>
        ))}
      </div>

      {dashboards.map((d) => (
        <div
          key={d.id}
          role="tabpanel"
          id={`hc-panel-${d.id}`}
          aria-labelledby={`hc-tab-${d.id}`}
          className={clsx('mx-auto mt-8 max-w-5xl', active === d.id ? 'animate-[f3-fadeIn_0.4s_ease]' : 'hidden')}
        >
          <figure
            role="img"
            aria-label={`${d.name} dashboard preview in Power BI with sample data`}
            className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-cardHover"
          >
            <div className="flex items-center justify-between border-b border-surface-line bg-brand-ink px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="ml-3 truncate text-xs font-semibold text-white/80">{d.name}</span>
              </div>
              <span className="hidden rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white sm:inline">Power BI</span>
            </div>
            <div aria-hidden className="space-y-4 bg-surface-tint p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {d.kpis.map((k) => (
                  <div key={k.label} className="rounded-xl border border-surface-line bg-white p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-muted">{k.label}</p>
                    <p className="mt-1 text-xl font-bold text-ink">{k.value}</p>
                    <p className={clsx('text-[11px] font-semibold', k.good ? 'text-emerald-600' : 'text-[#D9480F]')}>{k.delta}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
                <ChartCard c={d.main} accent={accent} />
                <ChartCard c={d.side} accent="#2F69F2" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
                <span>Built for: {d.builtFor}</span>
                <span>Sample data</span>
              </div>
            </div>
          </figure>
        </div>
      ))}
    </div>
  );
}
