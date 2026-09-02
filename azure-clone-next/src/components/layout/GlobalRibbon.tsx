'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from '@/components/layout/ExternalLink';

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
      <span className="fn-ic">{item.icon}</span>
      <span className="fn-txt">
        <span className="fn-label">{item.label}</span>
        <span className="fn-desc">{item.desc}</span>
      </span>
      {isCurrent && <span className="fn-here">You&apos;re here</span>}
    </>
  );
  if (isCurrent) {
    return (
      <span className="fn-item" aria-current="true" style={{ cursor: 'default' }}>
        {inner}
      </span>
    );
  }
  return (
    <ExternalLink className="fn-item" href={item.href}>
      {inner}
    </ExternalLink>
  );
}

/**
 * "Folio3 Network" dropdown — embedded on the right of the main site Header.
 * Bordered button with a 9-dot glyph opens a 3-column panel of Folio3 practices.
 */
export function FolioNetworkNav({ current: currentProp }: { current?: string }) {
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
      <div ref={rootRef} className={`fn-root${open ? ' fn-open' : ''}`}>
        <button
          type="button"
          className="fn-trigger"
          aria-expanded={open}
          aria-controls="fn-panel"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
        >
          <svg className="fn-dots" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
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
          <span className="fn-trigger-label">Folio3 Network</span>
          <svg className="fn-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2 4l3 3 3-3" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="fn-panel" id="fn-panel">
          <div className="fn-grid">
            <div className="fn-col">
              {TECH.map((it) => (
                <ItemRow key={it.key} item={it} current={current} />
              ))}
            </div>
            <div className="fn-col">
              {INDUSTRIES.map((it) => (
                <ItemRow key={it.key} item={it} current={current} />
              ))}
            </div>
            <div className="fn-col">
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
.fn-root,
.fn-root *,
.fn-root *::before,
.fn-root *::after { box-sizing: border-box; }

.fn-root {
  --fn-fg: #121127;
  --fn-fg-dim: #6a6c70;
  --fn-line: #d9def0;
  --fn-panel: #ffffff;
  --fn-panel-line: #e8ecf5;
  --fn-panel-hover: #f5f8fe;
  --fn-accent: #1742E7;
  position: relative;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
}

.fn-root a,
.fn-root button {
  font: inherit;
  color: inherit;
  text-decoration: none;
  background: none;
  border: 0;
  margin: 0;
  cursor: pointer;
}

.fn-root .fn-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--fn-line);
  border-radius: 6px;
  color: var(--fn-fg);
  background: #fff;
  font-weight: 600;
  transition: background .15s ease, border-color .15s ease, color .15s ease;
  white-space: nowrap;
}
.fn-root .fn-trigger:hover,
.fn-root .fn-trigger[aria-expanded="true"] {
  border-color: var(--fn-accent);
  color: var(--fn-accent);
}

.fn-root .fn-dots { display: block; flex: none; }
.fn-root .fn-dots rect { fill: currentColor; }
.fn-root .fn-caret { display: block; flex: none; transition: transform .18s ease; }
.fn-root .fn-trigger[aria-expanded="true"] .fn-caret { transform: rotate(180deg); }
.fn-root .fn-caret path { stroke: currentColor; }

.fn-root .fn-panel {
  display: none;
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(920px, calc(100vw - 40px));
  background: var(--fn-panel);
  color: var(--fn-fg);
  border: 1px solid var(--fn-panel-line);
  border-radius: 12px;
  box-shadow: 0 24px 48px rgba(5,13,32,.18);
  z-index: 60;
}
.fn-root.fn-open .fn-panel { display: block; }

.fn-root .fn-grid {
  padding: 22px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px 20px;
}

.fn-root .fn-col { display: flex; flex-direction: column; gap: 4px; }

.fn-root .fn-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--fn-fg);
  transition: background .15s ease;
  position: relative;
}
.fn-root .fn-item:hover { background: var(--fn-panel-hover); }
.fn-root .fn-item[aria-current="true"] { background: var(--fn-panel-hover); }

.fn-root .fn-ic {
  flex: none;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--fn-panel-line);
  border-radius: 6px;
  color: var(--fn-accent);
  background: #fff;
}
.fn-root .fn-ic svg { display: block; }
.fn-root .fn-ic svg path,
.fn-root .fn-ic svg circle,
.fn-root .fn-ic svg rect {
  stroke: currentColor;
  fill: none;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.fn-root .fn-txt { display: flex; flex-direction: column; min-width: 0; }
.fn-root .fn-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--fn-fg);
  line-height: 1.25;
}
.fn-root .fn-desc {
  margin-top: 2px;
  font-size: 12px;
  color: var(--fn-fg-dim);
  line-height: 1.35;
}
.fn-root .fn-here {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 11px;
  font-weight: 600;
  color: var(--fn-accent);
}

.fn-root :focus-visible {
  outline: 2px solid var(--fn-accent);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (max-width: 900px) {
  .fn-root .fn-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fn-root .fn-panel { width: min(560px, calc(100vw - 24px)); }
}

/* below xl (1280px), the site nav starts to run out of room; collapse the
   trigger to icon-only rather than wrapping the header */
@media (max-width: 1279px) {
  .fn-root .fn-trigger-label { display: none; }
  .fn-root .fn-trigger { padding: 0 10px; }
}

@media (max-width: 620px) {
  .fn-root .fn-trigger { padding: 0 10px; height: 36px; }
  .fn-root .fn-panel { grid-template-columns: 1fr; }
  .fn-root .fn-grid { grid-template-columns: 1fr; gap: 4px; padding: 14px; }
}

@media (prefers-reduced-motion: reduce) {
  .fn-root * { transition: none !important; }
}
`;
