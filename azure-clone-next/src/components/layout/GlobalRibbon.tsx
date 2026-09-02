'use client';

import { useEffect, useRef, useState } from 'react';

const HOSTS: Record<string, string> = {
  'folio3.ai': 'ai',
  'data.folio3.com': 'data',
  'cloud.folio3.com': 'cloud',
  'netsuite.folio3.com': 'netsuite',
  'dynamics.folio3.com': 'dynamics',
  'crm.folio3.com': 'salesforce',
  'ecommerce.folio3.com': 'ecommerce',
  'agtech.folio3.com': 'agtech',
  'foodtech.folio3.com': 'foodtech',
  'digitalhealth.folio3.com': 'health',
  'elearning.folio3.com': 'edtech',
  'azure.folio3.com': 'azure',
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

type Item = {
  key: string;
  label: string;
  href: string;
  desc: string;
  icon: React.ReactNode;
};

const TECH: Item[] = [
  {
    key: 'ai',
    label: 'AI & Data',
    href: 'https://www.folio3.ai/',
    desc: 'Agentic AI, computer vision, generative AI',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="8" y="8" width="8" height="8" rx="1" />
        <path d="M4 9h4M4 15h4M16 9h4M16 15h4M9 4v4M15 4v4M9 16v4M15 16v4" />
      </svg>
    ),
  },
  {
    key: 'appdev',
    label: 'App Development',
    href: 'https://folio3.com/app-development/',
    desc: 'Web, mobile, and custom software',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    key: 'cloud',
    label: 'Cloud',
    href: 'https://cloud.folio3.com/',
    desc: 'Cloud migration, DevOps, managed services',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.5A3.75 3.75 0 0117.5 18z" />
      </svg>
    ),
  },
];

const INDUSTRIES: Item[] = [
  {
    key: 'agtech',
    label: 'AgTech',
    href: 'https://agtech.folio3.com/',
    desc: 'Farm, livestock, and crop software',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21v-8" />
        <path d="M12 13c0-4 2.5-7 8-7 0 5-3 8-8 7z" />
        <path d="M12 16c0-3-2-5.5-6-5.5 0 4 2.5 6 6 5.5z" />
      </svg>
    ),
  },
  {
    key: 'foodtech',
    label: 'FoodTech',
    href: 'https://foodtech.folio3.com/',
    desc: 'Traceability and food supply chain',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 3v8a2 2 0 002 2h0a2 2 0 002-2V3" />
        <path d="M7 13v8" />
        <path d="M17 3c-1.5 2-2 4-2 6s.7 3 2 3h1V3z" />
        <path d="M18 12v9" />
      </svg>
    ),
  },
  {
    key: 'health',
    label: 'Digital Health',
    href: 'https://digitalhealth.folio3.com/',
    desc: 'EHR, telehealth, and interoperability',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 12h4l2-5 3 10 2.5-5H21" />
      </svg>
    ),
  },
];

const PLATFORMS: Item[] = [
  {
    key: 'azure',
    label: 'Azure',
    href: 'https://azure.folio3.com/',
    desc: 'Cloud services and Microsoft solutions',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 4l-7 14h6l1.5-3" />
        <path d="M13 4h5l4 16h-9l6-5-3-3z" />
      </svg>
    ),
  },
  {
    key: 'netsuite',
    label: 'NetSuite',
    href: 'https://netsuite.folio3.com/',
    desc: 'ERP implementation and support',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 20V9l9-5 9 5v11" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    key: 'dynamics',
    label: 'Dynamics',
    href: 'https://dynamics.folio3.com/',
    desc: 'Dynamics 365 and Business Central',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    key: 'salesforce',
    label: 'Salesforce',
    href: 'https://crm.folio3.com/salesforce/',
    desc: 'CRM consulting and integration',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20a6 6 0 0112 0" />
        <path d="M16 6.5a3 3 0 010 5.8" />
        <path d="M18 15.2A5 5 0 0121 20" />
      </svg>
    ),
  },
  {
    key: 'ecommerce',
    label: 'Ecommerce',
    href: 'https://ecommerce.folio3.com/',
    desc: 'Magento, Shopify, BigCommerce',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="20" r="1.2" />
        <circle cx="18" cy="20" r="1.2" />
        <path d="M2 3h2.5l2.6 12h11.4l2.1-8.5H6" />
      </svg>
    ),
  },
];

function ItemRow({ item, current }: { item: Item; current: string | null }) {
  const isCurrent = current === item.key;
  const inner = (
    <>
      <span className="f3-ic">{item.icon}</span>
      <span className="f3-txt">
        <span className="f3-label">{item.label}</span>
        <span className="f3-desc">{item.desc}</span>
      </span>
      {isCurrent && <span className="f3-here">You&apos;re here</span>}
    </>
  );
  const cls = 'f3-item';
  if (isCurrent) {
    return (
      <span className={cls} aria-current="true" style={{ cursor: 'default' }}>
        {inner}
      </span>
    );
  }
  return (
    <a className={cls} href={item.href}>
      {inner}
    </a>
  );
}

export function GlobalRibbon({ current: currentProp }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(currentProp ?? null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentProp) return;
    setCurrent(detectCurrent());
  }, [currentProp]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div ref={rootRef} className={`f3-ribbon${open ? ' f3-open' : ''}`}>
        <div className="f3-bar">
          <nav className="f3-links" aria-label="Folio3 corporate">
            <a href="https://folio3.com/about-us/">About us</a>
            <a href="https://folio3.com/">Company</a>
          </nav>

          <button
            type="button"
            className="f3-trigger"
            aria-expanded={open}
            aria-controls="f3-panel"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <svg className="f3-dots" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <rect x="0" y="0" width="3" height="3" />
              <rect x="4.5" y="0" width="3" height="3" />
              <rect x="9" y="0" width="3" height="3" />
              <rect x="0" y="4.5" width="3" height="3" />
              <rect x="4.5" y="4.5" width="3" height="3" />
              <rect x="9" y="4.5" width="3" height="3" />
              <rect x="0" y="9" width="3" height="3" />
              <rect x="4.5" y="9" width="3" height="3" />
              <rect x="9" y="9" width="3" height="3" />
            </svg>
            <span className="f3-trigger-label">Folio3 Network</span>
            <svg className="f3-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 4l3 3 3-3" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="f3-panel" id="f3-panel">
          <div className="f3-grid">
            <div className="f3-col">
              {TECH.map((it) => (
                <ItemRow key={it.key} item={it} current={current} />
              ))}
            </div>
            <div className="f3-col">
              {INDUSTRIES.map((it) => (
                <ItemRow key={it.key} item={it} current={current} />
              ))}
            </div>
            <div className="f3-col">
              {PLATFORMS.map((it) => (
                <ItemRow key={it.key} item={it} current={current} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
.f3-ribbon,
.f3-ribbon *,
.f3-ribbon *::before,
.f3-ribbon *::after { box-sizing: border-box; }

.f3-ribbon {
  --f3-bg: #12161c;
  --f3-fg: #e8eaed;
  --f3-fg-dim: #9aa3ad;
  --f3-line: rgba(255,255,255,.14);
  --f3-panel: #ffffff;
  --f3-panel-fg: #121127;
  --f3-panel-dim: #6a6c70;
  --f3-panel-line: #e8ecf5;
  --f3-panel-hover: #f5f8fe;
  --f3-accent: #1742E7;
  position: relative;
  z-index: 60;
  background: var(--f3-bg);
  color: var(--f3-fg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
  border-bottom: 1px solid rgba(0,0,0,.2);
}

.f3-ribbon .f3-bar {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.f3-ribbon a,
.f3-ribbon button {
  font: inherit;
  color: inherit;
  text-decoration: none;
  background: none;
  border: 0;
  margin: 0;
  cursor: pointer;
}

.f3-ribbon .f3-links { display: flex; align-items: center; gap: 22px; }
.f3-ribbon .f3-links a { color: var(--f3-fg-dim); transition: color .15s ease; }
.f3-ribbon .f3-links a:hover { color: var(--f3-fg); }

.f3-ribbon .f3-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 26px;
  padding: 0 12px;
  border: 1px solid var(--f3-line);
  border-radius: 5px;
  color: var(--f3-fg);
  transition: background .15s ease, border-color .15s ease;
}
.f3-ribbon .f3-trigger:hover,
.f3-ribbon .f3-trigger[aria-expanded="true"] {
  background: rgba(255,255,255,.07);
  border-color: rgba(255,255,255,.28);
}

.f3-ribbon .f3-dots { display: block; flex: none; }
.f3-ribbon .f3-dots rect { fill: var(--f3-fg-dim); }
.f3-ribbon .f3-caret { display: block; flex: none; transition: transform .18s ease; }
.f3-ribbon .f3-trigger[aria-expanded="true"] .f3-caret { transform: rotate(180deg); }
.f3-ribbon .f3-caret path { stroke: var(--f3-fg-dim); }

.f3-ribbon .f3-panel {
  display: none;
  position: absolute;
  top: 100%;
  right: 20px;
  width: min(960px, calc(100vw - 40px));
  margin-top: 8px;
  background: var(--f3-panel);
  color: var(--f3-panel-fg);
  border: 1px solid var(--f3-panel-line);
  border-radius: 10px;
  box-shadow: 0 24px 48px rgba(5,13,32,.18);
}
.f3-ribbon.f3-open .f3-panel { display: block; }

.f3-ribbon .f3-grid {
  padding: 22px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px 20px;
}

.f3-ribbon .f3-col { display: flex; flex-direction: column; gap: 4px; }

.f3-ribbon .f3-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--f3-panel-fg);
  transition: background .15s ease;
  position: relative;
}
.f3-ribbon .f3-item:hover { background: var(--f3-panel-hover); }
.f3-ribbon .f3-item[aria-current="true"] { background: var(--f3-panel-hover); }

.f3-ribbon .f3-ic {
  flex: none;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--f3-panel-line);
  border-radius: 6px;
  color: var(--f3-accent);
  background: #fff;
}
.f3-ribbon .f3-ic svg { display: block; }
.f3-ribbon .f3-ic svg path,
.f3-ribbon .f3-ic svg circle,
.f3-ribbon .f3-ic svg rect {
  stroke: currentColor;
  fill: none;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.f3-ribbon .f3-txt { display: flex; flex-direction: column; min-width: 0; }
.f3-ribbon .f3-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--f3-panel-fg);
  line-height: 1.25;
}
.f3-ribbon .f3-desc {
  margin-top: 2px;
  font-size: 12px;
  color: var(--f3-panel-dim);
  line-height: 1.35;
}
.f3-ribbon .f3-here {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 11px;
  font-weight: 600;
  color: var(--f3-accent);
}

.f3-ribbon :focus-visible {
  outline: 2px solid var(--f3-accent);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (max-width: 900px) {
  .f3-ribbon .f3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .f3-ribbon .f3-panel { right: 12px; left: 12px; width: auto; }
}

@media (max-width: 620px) {
  .f3-ribbon .f3-bar { padding: 0 14px; gap: 10px; }
  .f3-ribbon .f3-trigger-label { display: none; }
  .f3-ribbon .f3-trigger { padding: 0 8px; }
  .f3-ribbon .f3-links { gap: 16px; }
  .f3-ribbon .f3-grid { grid-template-columns: 1fr; gap: 4px; padding: 14px; }
}

@media (prefers-reduced-motion: reduce) {
  .f3-ribbon * { transition: none !important; }
}
`;
