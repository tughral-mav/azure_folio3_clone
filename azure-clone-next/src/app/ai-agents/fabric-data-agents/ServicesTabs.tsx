'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import {
  Bot,
  ChevronDown,
  ClipboardCheck,
  Compass,
  DatabaseZap,
  Network,
  PlugZap,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

type Service = {
  label: string;
  title: string;
  intro: string;
  bullets: string[];
  chips?: string[];
  Icon: LucideIcon;
};

const services: Service[] = [
  {
    label: 'Strategy & Discovery',
    title: 'Fabric Data Agent Strategy and Use-Case Discovery',
    intro:
      'We begin by identifying the business domains, user roles, priority questions, data sources, and measurable outcomes that will create the greatest value from your Microsoft Fabric Data Agent.',
    bullets: [
      'Business use-case prioritization',
      'Stakeholder and user-persona mapping',
      'Priority-question and decision-workflow discovery',
      'Data-source and integration review',
      'Success metrics and acceptance criteria',
      'Pilot and scale-up roadmap',
    ],
    Icon: Compass,
  },
  {
    label: 'Data & Semantic Readiness',
    title: 'Data Foundation and Semantic Model Readiness',
    intro:
      'We prepare the Fabric data sources and Power BI semantic models behind the agent so answers draw on trusted data, approved logic, and clear business definitions.',
    bullets: [
      'Fabric data-source selection and readiness assessment',
      'Power BI semantic-model review and optimization',
      'KPI, measure, relationship, and metadata validation',
      'AI-ready schema, descriptions, and verified-answer setup',
      'Data-quality, freshness, ownership, and lineage review',
      'Business glossary and terminology alignment',
    ],
    Icon: DatabaseZap,
  },
  {
    label: 'Agent Design',
    title: 'AI Data Agent Design and Business Context',
    intro:
      'Folio3 designs AI Data Agents in Microsoft Fabric around the terminology, KPIs, data relationships, decision workflows, and domain expertise your teams already use.',
    bullets: [
      'Mapping business questions to approved Fabric sources',
      'Agent and data-source instructions',
      'Business terminology, synonyms, and date logic',
      'Source priorities and domain boundaries',
      'Response behavior and escalation paths',
      'Ambiguous-question and edge-case testing',
    ],
    Icon: Workflow,
  },
  {
    label: 'Agent Development',
    title: 'Microsoft Fabric Data Agent Development',
    intro:
      'We configure and implement Fabric Data Agents that align with your data sources, business rules, access model, and user requirements.',
    bullets: [
      'Data-source connections and Data Agent setup',
      'Agent configuration and instruction implementation',
      'Natural-language question experience design',
      'Example-query and verified-answer configuration',
      'User acceptance testing and documentation',
      'Production deployment support',
    ],
    Icon: Bot,
  },
  {
    label: 'Foundry & Copilot',
    title: 'Microsoft Foundry and Copilot Integration',
    intro:
      'Extend governed Fabric intelligence beyond analytics workspaces by bringing trusted answers into the Microsoft and Azure experiences your teams already use.',
    bullets: [
      'Microsoft Foundry integration architecture',
      'Copilot Studio connected-agent implementation',
      'Microsoft Teams and Microsoft 365 Copilot experiences',
      'Power Apps and custom application integration',
      'Identity-aware access and user-context design',
      'Deployment and adoption planning',
    ],
    chips: [
      'Microsoft Foundry',
      'Copilot Studio',
      'Microsoft Teams',
      'Microsoft 365 Copilot',
      'Power Apps',
      'Custom Applications',
    ],
    Icon: Network,
  },
  {
    label: 'Governance & Security',
    title: 'Governance, Security, and Access Controls',
    intro:
      'We align each Fabric Data Agent with the identity, permissions, data-governance, and compliance controls required for enterprise use.',
    bullets: [
      'Microsoft Entra ID and role-based access design',
      'Source-level permissions and least-privilege validation',
      'Row-level security and column-level security testing',
      'Approved-source and domain-boundary controls',
      'Sensitivity, lineage, auditability, and monitoring requirements',
      'Security validation before production release',
    ],
    Icon: ShieldCheck,
  },
  {
    label: 'Quality & Optimization',
    title: 'Answer Quality, Validation, and Optimization',
    intro:
      'A Data Agent should not move into production simply because it can generate a response. Folio3 validates whether it answers the right business question, uses the correct governed data, and respects the appropriate access controls.',
    bullets: [
      'Business-question test libraries',
      'Expected-answer and source validation',
      'KPI, measure, calculation, filter, and date-logic checks',
      'Permission and security-role testing',
      'Terminology, synonym, and ambiguity testing',
      'Stakeholder acceptance and regression testing',
      'Usage monitoring and continuous improvement',
    ],
    Icon: ClipboardCheck,
  },
];

/** md and up: WAI-ARIA tabs (vertical list on lg, wrapped pills on md).
 *  Below md: accordion. Every panel is server-rendered; inactive ones use `hidden`. */
const TABS_QUERY = '(min-width: 768px)';
const VERTICAL_QUERY = '(min-width: 1024px)';

export function ServicesTabs() {
  const base = useId();
  const [active, setActive] = useState<number | null>(0);
  const [tabsMode, setTabsMode] = useState(true); // SSR renders tab semantics
  const [vertical, setVertical] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia(TABS_QUERY);
    const mqV = window.matchMedia(VERTICAL_QUERY);
    const sync = () => {
      setTabsMode(mq.matches);
      setVertical(mqV.matches);
      // tabs always need a selected panel
      if (mq.matches) setActive((a) => (a === null ? 0 : a));
    };
    sync();
    mq.addEventListener('change', sync);
    mqV.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      mqV.removeEventListener('change', sync);
    };
  }, []);

  const tabId = (i: number) => `${base}-tab-${i}`;
  const accId = (i: number) => `${base}-acc-${i}`;
  const panelId = (i: number) => `${base}-panel-${i}`;
  const selected = active ?? 0;

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = services.length;
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? (i + 1) % n
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? (i - 1 + n) % n
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? n - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[19rem_1fr]">
      {/* Tab list (md+) */}
      <div
        role="tablist"
        aria-label="Microsoft Fabric Data Agent implementation services"
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        className="hidden flex-wrap gap-2 md:flex lg:flex-col lg:gap-2 lg:self-start lg:rounded-2xl lg:border lg:border-surface-line lg:bg-white lg:p-3 lg:shadow-card"
      >
        {services.map((s, i) => {
          const isActive = selected === i;
          return (
            <button
              key={s.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId(i)}
              aria-selected={isActive}
              aria-controls={panelId(i)}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`group flex items-center gap-3 rounded-full border px-4 py-2.5 text-left text-sm font-semibold transition-colors duration-200 lg:rounded-xl lg:px-3 lg:py-3 ${focusRing} ${
                isActive
                  ? 'border-brand bg-brand text-white shadow-card'
                  : 'border-surface-line bg-white text-ink hover:border-brand/40 hover:text-brand lg:border-transparent lg:bg-transparent lg:hover:bg-surface-tint'
              }`}
            >
              <span
                className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg lg:flex ${
                  isActive ? 'bg-white/15 text-white' : 'bg-brand/10 text-brand'
                }`}
              >
                <s.Icon aria-hidden="true" size={18} strokeWidth={1.9} />
              </span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panels (and accordion triggers below md) */}
      <div className="space-y-3 md:space-y-0">
        {services.map((s, i) => {
          const open = tabsMode ? selected === i : active === i;
          return (
            <div
              key={s.label}
              className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card md:contents"
            >
              <div className="md:hidden">
                <button
                  type="button"
                  id={accId(i)}
                  aria-expanded={open}
                  aria-controls={panelId(i)}
                  onClick={() => setActive(open ? null : i)}
                  className={`flex w-full items-center gap-3 px-5 py-4 text-left text-base font-semibold text-ink ${focusRing} focus-visible:outline-offset-[-2px]`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <s.Icon aria-hidden="true" size={20} strokeWidth={1.9} />
                  </span>
                  <span className="flex-1">{s.label}</span>
                  <ChevronDown
                    aria-hidden="true"
                    size={20}
                    className={`shrink-0 text-brand transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
              <div
                id={panelId(i)}
                role={tabsMode ? 'tabpanel' : 'region'}
                aria-labelledby={tabsMode ? tabId(i) : accId(i)}
                tabIndex={tabsMode ? 0 : undefined}
                hidden={!open}
                className={`relative border-t border-surface-line px-5 pb-6 pt-5 motion-safe:animate-[f3-fadeIn_220ms_ease-out] md:overflow-hidden md:rounded-2xl md:border md:bg-white md:p-8 md:shadow-card lg:min-h-full lg:p-10 ${focusRing}`}
              >
                <s.Icon
                  aria-hidden="true"
                  size={180}
                  strokeWidth={1}
                  className="pointer-events-none absolute -right-8 -top-8 hidden text-brand/[0.06] md:block"
                />
                <div className="relative">
                  <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand md:flex">
                    <s.Icon aria-hidden="true" size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-lg font-semibold leading-snug text-ink md:mt-5 md:text-2xl">{s.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body md:text-base">{s.intro}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand">
                    What&apos;s included
                  </p>
                  <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-body">
                        <span aria-hidden className="mt-0.5 shrink-0 text-brand">✓</span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                  {s.chips && (
                    <ul aria-label="Integration options" className="mt-6 flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <li
                          key={c}
                          className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-surface-chip px-3 py-1.5 text-xs font-medium text-brand"
                        >
                          <PlugZap aria-hidden="true" size={12} /> {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
