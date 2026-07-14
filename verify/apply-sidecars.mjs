/**
 * Merge the re-captured tabs + FAQ sidecar data for the petrochemical EDMS case study
 * into the app's content-kit sidecar files (idempotent: overwrites this slug's key).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const KIT = path.resolve('azure-clone-next/content-kit');
const SLUG = 'petrochemical_producer_edms_compliance_agent';
const U = (p) => `/wp-content/uploads/2026/07/${p}`;

const tabs = [
  {
    section: 'Key Features',
    tabs: [
      {
        label: 'Intelligent Discovery and Workflow',
        heading: 'Intelligent Discovery and Workflow',
        body: '',
        img: U('intelligent-discovery-and-workflow.webp'),
        cta: null,
        items: [
          { title: 'Natural Language Search', body: 'Users request any policy, procedure, or manual in plain language, with no file name or location required.', icon: U('natural-language-search-icon.svg') },
          { title: 'Grounded, Cited Retrieval', body: 'Vector and semantic search with WorkIQ return answers by meaning, each linked to its approved source document.', icon: U('grounded-cited-retrieval-icon.svg') },
          { title: 'Workflow Status Tracking', body: 'The Workflow Tracker Agent reports approval stage, progress, and assigned items from EDMS SharePoint lists.', icon: U('workflow-status-tracking-icon.svg') },
          { title: 'On-Demand Reporting', body: 'The Report Generation Agent exports due, overdue, pending, and expired document reports straight to Excel.', icon: U('on-demand-reporting-icon.svg') },
        ],
      },
      {
        label: 'Guided Document Generation',
        heading: 'Guided Document Generation',
        body: '',
        img: U('guided-document-generation.webp'),
        cta: null,
        items: [
          { title: 'Section-by-Section Authoring', body: 'A structured editor walks users through each document category, so they enter content, not formatting.', icon: U('section-authoring-icon.svg') },
          { title: 'Automated Template Population', body: 'Azure Functions convert content into Word XML and place it into the correct template sections, protecting content controls.', icon: U('automated-template-population-icon.svg') },
        ],
      },
      {
        label: 'Automated Compliance Validation',
        heading: 'Automated Compliance Validation',
        body: '',
        img: U('automated-compliance-validation.webp'),
        cta: null,
        items: [
          { title: 'Pre-Submission Checks', body: 'The Validation Service verifies fonts, margins, sections, tables, images, content controls, and file size before initiation.', icon: U('pre-submissions-checks-icon.svg') },
          { title: 'Submission-Ready Output', body: 'User-filled sections are spell checked and returned ready for the existing EDMS approval process.', icon: U('submission-ready-out-icon.svg') },
        ],
      },
    ],
  },
];

// heading MUST equal the section's first heading ("Common Questions") so OrderedRenderer's
// faqHeadMatch fires and renders the accordion inline at the right position.
const faq = {
  heading: 'Common Questions',
  items: [
    { q: 'How does the agent find a document without an exact file name?', a: 'Users ask in plain language for a policy, procedure, charter, or manual. The EDMS Agent searches the approved SharePoint libraries with vector and semantic search, so it matches on meaning and context rather than an exact file name, identifier, or folder location.' },
    { q: "Are the agent's answers grounded, or can it invent information?", a: "The agent is strictly grounded in the organization's approved SharePoint content. Every answer carries citations and references to the source documents, so users can open and verify the original approved file." },
    { q: 'Which Microsoft technologies power the solution?', a: 'The agent is built on Microsoft Copilot Studio, grounded in SharePoint, and surfaced through Microsoft Teams and Power Apps Copilot Chat. The document generation and validation platform runs on Azure Functions, with reports exported to Excel.' },
    { q: 'How does the solution confirm a document is compliant before submission?', a: 'A guided editor populates the approved Word template automatically, then a validation service checks the finished document against the required rules. It flags exact issues such as fonts, margins, required sections, tables, images, content controls, and file size before the document enters the approval workflow.' },
    { q: 'Can users work with the agent inside Microsoft Teams?', a: 'Yes. The agent is available as a one-to-one conversational channel in Microsoft Teams, and it is also embedded directly in the existing EDMS application through Power Apps Copilot Chat.' },
    { q: "Does the agent use only the client's approved documents?", a: "Yes. The agent answers only from the organization's approved SharePoint document libraries, which keeps responses aligned with governed, current, and approved content." },
  ],
};

function merge(file, key, value) {
  const p = path.join(KIT, file);
  const obj = JSON.parse(readFileSync(p, 'utf8'));
  obj[key] = value;
  writeFileSync(p, JSON.stringify(obj));
  return Object.keys(obj).length;
}

const t = merge('tabs-content.json', SLUG, tabs);
const f = merge('faq-full.json', SLUG, faq);
console.log(`tabs-content.json now ${t} keys; faq-full.json now ${f} keys; added SLUG=${SLUG}`);
