'use client';
import { useState } from 'react';
import styles from './styles.module.css';

const ICON = '/wp-content/uploads/2026/07';
const TABS = [
  {
    label: 'Intelligent Discovery and Workflow',
    img: `${ICON}/intelligent-discovery-and-workflow.webp`,
    features: [
      { icon: `${ICON}/natural-language-search-icon.svg`, title: 'Natural Language Search', body: 'Users request any policy, procedure, or manual in plain language, with no file name or location required.' },
      { icon: `${ICON}/grounded-cited-retrieval-icon.svg`, title: 'Grounded, Cited Retrieval', body: 'Vector and semantic search with WorkIQ return answers by meaning, each linked to its approved source document.' },
      { icon: `${ICON}/workflow-status-tracking-icon.svg`, title: 'Workflow Status Tracking', body: 'The Workflow Tracker Agent reports approval stage, progress, and assigned items from EDMS SharePoint lists.' },
      { icon: `${ICON}/on-demand-reporting-icon.svg`, title: 'On-Demand Reporting', body: 'The Report Generation Agent exports due, overdue, pending, and expired document reports straight to Excel.' },
    ],
  },
  {
    label: 'Guided Document Generation',
    img: `${ICON}/guided-document-generation.webp`,
    features: [
      { icon: `${ICON}/section-authoring-icon.svg`, title: 'Section-by-Section Authoring', body: 'A structured editor walks users through each document category, so they enter content, not formatting.' },
      { icon: `${ICON}/automated-template-population-icon.svg`, title: 'Automated Template Population', body: 'Azure Functions convert content into Word XML and place it into the correct template sections, protecting content controls.' },
    ],
  },
  {
    label: 'Automated Compliance Validation',
    img: `${ICON}/automated-compliance-validation.webp`,
    features: [
      { icon: `${ICON}/pre-submissions-checks-icon.svg`, title: 'Pre-Submission Checks', body: 'The Validation Service verifies fonts, margins, sections, tables, images, content controls, and file size before initiation.' },
      { icon: `${ICON}/submission-ready-out-icon.svg`, title: 'Submission-Ready Output', body: 'User-filled sections are spell checked and returned ready for the existing EDMS approval process.' },
    ],
  },
];

export function KeyFeaturesTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  return (
    <>
      <div className={styles.kfTabRow} role="tablist" aria-label="Key features">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={i === active}
            className={`${styles.kfTab} ${i === active ? styles.kfActive : ''}`}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.kfPanel}>
        <div className="container-x">
          <div className={styles.kfPanelInner}>
            <div>
              <h3 className={styles.kfPanelHead}>{tab.label}</h3>
              <div className={styles.kfFeatures}>
                {tab.features.map((f) => (
                  <div key={f.title} className={styles.kfFeat}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.icon} alt="" className={styles.kfFeatIcon} width={44} height={44} />
                    <div>
                      <h4 className={styles.kfFeatTitle}>{f.title}</h4>
                      <p className={styles.kfFeatBody}>{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tab.img} alt={tab.label} className={styles.kfImg} width={705} height={592} />
          </div>
        </div>
      </div>
    </>
  );
}
