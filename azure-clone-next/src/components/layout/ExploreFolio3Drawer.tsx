'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from '@/components/layout/ExternalLink';

const HOSTS: Record<string, string> = {
  'folio3.ai': 'ai',
  'data.folio3.com': 'data',
  'cloud.folio3.com': 'cloud',
  'folio3.com': 'appdev',
  'netsuite.folio3.com': 'netsuite',
  'dynamics.folio3.com': 'dynamics',
  'crm.folio3.com': 'salesforce',
  'ecommerce.folio3.com': 'ecommerce',
  'agtech.folio3.com': 'agtech',
  'foodtech.folio3.com': 'foodtech',
  'digitalhealth.folio3.com': 'health',
  'elearning.folio3.com': 'edtech',
};

function detectCurrent(): string | null {
  if (typeof window === 'undefined') return null;
  const h = window.location.hostname.toLowerCase().replace(/^www\./, '');
  if (HOSTS[h]) return HOSTS[h];
  const parts = h.split('.');
  while (parts.length > 2) {
    parts.shift();
    const candidate = parts.join('.');
    if (HOSTS[candidate]) return HOSTS[candidate];
  }
  return null;
}

type Item = { key: string; label: string; href: string; desc: string };

const TECHNOLOGY: Item[] = [
  { key: 'ai', label: 'AI', href: 'https://www.folio3.ai/', desc: 'Agentic AI, computer vision, generative AI' },
  { key: 'data', label: 'Data', href: 'https://data.folio3.com/', desc: 'Engineering, warehousing, analytics' },
  { key: 'cloud', label: 'Cloud', href: 'https://cloud.folio3.com/', desc: 'Migration, DevOps, managed cloud' },
  { key: 'appdev', label: 'App Development', href: 'https://folio3.com/app-development/', desc: 'Web, mobile, and custom software' },
];

const PLATFORMS: Item[] = [
  { key: 'netsuite', label: 'NetSuite', href: 'https://netsuite.folio3.com/', desc: 'ERP implementation and support' },
  { key: 'dynamics', label: 'Microsoft Dynamics', href: 'https://dynamics.folio3.com/', desc: 'Dynamics 365 and Business Central' },
  { key: 'salesforce', label: 'Salesforce', href: 'https://crm.folio3.com/salesforce/', desc: 'CRM consulting and integration' },
  { key: 'ecommerce', label: 'Ecommerce', href: 'https://ecommerce.folio3.com/', desc: 'Magento, Shopify, BigCommerce' },
];

const INDUSTRIES: Item[] = [
  { key: 'agtech', label: 'AgTech', href: 'https://agtech.folio3.com/', desc: 'Farm, livestock, and crop software' },
  { key: 'foodtech', label: 'FoodTech', href: 'https://foodtech.folio3.com/', desc: 'Traceability and food supply chain' },
  { key: 'health', label: 'Digital Health', href: 'https://digitalhealth.folio3.com/', desc: 'EHR, telehealth, and interoperability' },
  { key: 'edtech', label: 'EdTech', href: 'https://elearning.folio3.com/', desc: 'Learning platforms and e-learning' },
];

function Row({ item, current }: { item: Item; current: string | null }) {
  const isCurrent = current === item.key;
  const inner = (
    <>
      <span className="ef-txt">
        <span className="ef-label">{item.label}</span>
        <span className="ef-desc">{item.desc}</span>
      </span>
      {isCurrent && <span className="ef-here">You&apos;re here</span>}
    </>
  );
  if (isCurrent) {
    return (
      <span className="ef-item" aria-current="true" style={{ cursor: 'default' }}>
        {inner}
      </span>
    );
  }
  return (
    <ExternalLink className="ef-item" href={item.href}>
      {inner}
    </ExternalLink>
  );
}

/**
 * Left-edge "Explore Folio3" drawer — a vertical tab pinned to the viewport
 * that opens a slide-out panel listing the twelve Folio3 practices grouped by
 * Technology, Platforms and Industries. Mounted site-wide from RootLayout.
 */
export function ExploreFolio3Drawer() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(detectCurrent());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    // lock body scroll while drawer is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <style>{CSS}</style>
      <button
        type="button"
        className="ef-tab"
        aria-expanded={open}
        aria-controls="ef-drawer-panel"
        onClick={() => setOpen(true)}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <rect x="0" y="1" width="14" height="2" rx="1" />
          <rect x="0" y="6" width="14" height="2" rx="1" />
          <rect x="0" y="11" width="14" height="2" rx="1" />
        </svg>
        <span className="ef-tab-label">Explore Folio3</span>
      </button>

      <div
        className={`ef-backdrop${open ? ' ef-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        id="ef-drawer-panel"
        ref={panelRef}
        className={`ef-panel${open ? ' ef-open' : ''}`}
        aria-hidden={!open}
        aria-label="Explore Folio3"
      >
        <header className="ef-head">
          <div>
            <div className="ef-title">Explore Folio3</div>
            <div className="ef-sub">One company, twelve specialist practices.</div>
          </div>
          <button type="button" className="ef-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="ef-body">
          <section className="ef-group">
            <div className="ef-grouplabel">Technology</div>
            {TECHNOLOGY.map((it) => <Row key={it.key} item={it} current={current} />)}
          </section>
          <section className="ef-group">
            <div className="ef-grouplabel">Platforms</div>
            {PLATFORMS.map((it) => <Row key={it.key} item={it} current={current} />)}
          </section>
          <section className="ef-group">
            <div className="ef-grouplabel">Industries</div>
            {INDUSTRIES.map((it) => <Row key={it.key} item={it} current={current} />)}
          </section>
        </div>
      </aside>
    </>
  );
}

const CSS = `
.ef-tab,
.ef-panel,
.ef-backdrop,
.ef-tab *,
.ef-panel * { box-sizing: border-box; }

.ef-tab {
  position: fixed;
  left: 0;
  top: 45%;
  transform: translateY(-50%);
  z-index: 55;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 10px;
  background: #121127;
  color: #fff;
  border: 0;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  writing-mode: vertical-rl;
  transform-origin: center;
  font: 600 12px/1 var(--font-jakarta, system-ui, sans-serif);
  letter-spacing: 0.02em;
  box-shadow: 2px 2px 10px rgba(5,13,32,.22);
  transition: background .15s ease;
}
.ef-tab:hover { background: #1742E7; }
.ef-tab svg { fill: currentColor; transform: rotate(90deg); }
.ef-tab-label { white-space: nowrap; }

.ef-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(5,13,32,.45);
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease;
  z-index: 70;
}
.ef-backdrop.ef-open { opacity: 1; pointer-events: auto; }

.ef-panel {
  --ef-fg: #121127;
  --ef-fg-dim: #6a6c70;
  --ef-line: #e8ecf5;
  --ef-hover: #f5f8fe;
  --ef-accent: #1742E7;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: min(340px, 88vw);
  background: #fff;
  color: var(--ef-fg);
  z-index: 75;
  transform: translateX(-100%);
  transition: transform .25s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 24px rgba(5,13,32,.18);
  font-family: var(--font-jakarta, system-ui, sans-serif);
}
.ef-panel.ef-open { transform: translateX(0); }

.ef-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 16px;
  background: #121127;
  color: #fff;
}
.ef-title { font-size: 16px; font-weight: 700; line-height: 1.2; }
.ef-sub { margin-top: 4px; font-size: 12px; opacity: .8; line-height: 1.35; }

.ef-close {
  flex: none;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
.ef-close:hover { background: rgba(255,255,255,.12); }

.ef-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px 14px 24px;
}

.ef-group + .ef-group { margin-top: 14px; }

.ef-grouplabel {
  display: inline-block;
  margin: 8px 6px 6px;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ef-accent);
  border: 1px solid #ffd1d8;
  border-radius: 4px;
}

.ef-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 6px;
  color: var(--ef-fg);
  text-decoration: none;
  transition: background .15s ease;
  position: relative;
}
.ef-item:hover { background: var(--ef-hover); }
.ef-item[aria-current="true"] { background: #ff2f52; color: #fff; }
.ef-item[aria-current="true"] .ef-desc { color: rgba(255,255,255,.85); }

.ef-txt { display: flex; flex-direction: column; min-width: 0; }
.ef-label { font-size: 14px; font-weight: 700; line-height: 1.25; }
.ef-desc { margin-top: 2px; font-size: 12px; color: var(--ef-fg-dim); line-height: 1.35; }
.ef-here {
  flex: none;
  align-self: center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: none;
  color: #fff;
}

.ef-panel :focus-visible {
  outline: 2px solid var(--ef-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
.ef-tab:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

@media (max-width: 620px) {
  .ef-tab { padding: 10px 8px; font-size: 11px; }
}

@media print {
  .ef-tab, .ef-panel, .ef-backdrop { display: none !important; }
}

@media (prefers-reduced-motion: reduce) {
  .ef-tab, .ef-panel, .ef-backdrop { transition: none !important; }
}
`;
