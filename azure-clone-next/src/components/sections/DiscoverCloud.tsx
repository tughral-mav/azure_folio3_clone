'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

type Tab = {
  label: string;
  heading: string;
  body: string;
  href: string;
  ctaLabel: string;
  illustration: string;
  items: { label: string; icon: string }[];
};

const TABS: Tab[] = [
  {
    label: 'Azure Cloud Services',
    heading: 'Azure Cloud Services',
    body: 'Seamlessly migrate, efficiently deploy, and manage your cloud infrastructure. From initial assessment to ongoing support, we deliver data-driven insights, and robust security frameworks to drive your digital transformation forward.',
    href: '/azure-cloud-service/',
    ctaLabel: 'Explore Our Cloud Services',
    illustration: '/wp-content/uploads/2023/04/azure-banner-cloud-services.webp',
    items: [
      { label: 'Cloud Strategy & Consulting', icon: '/wp-content/uploads/2023/07/1-Cloud-Strategy-n-Consulting.png' },
      { label: 'Application Development', icon: '/wp-content/uploads/2023/04/Azure-Application-Development.png' },
      { label: 'DevOps Automation as Service', icon: '/wp-content/uploads/2023/07/3-DevOps-Automation.png' },
      { label: 'Cloud Migration', icon: '/wp-content/uploads/2023/07/4-Cloud-Migration.png' },
    ],
  },
  {
    label: 'Power Platform',
    heading: 'Microsoft Power Platform',
    body: 'Empower your organization by automating processes, optimizing workflows, and delivering personalized experiences with low-code solutions and seamless integrations that enhance customer engagement.',
    href: '/microsoft-power-platform/',
    ctaLabel: 'Explore Our Power Platform Services',
    illustration: '/wp-content/uploads/2023/04/azure-Microsoft-Power-Platform.webp',
    items: [
      { label: 'Power Apps', icon: '/wp-content/uploads/2023/04/Modernize-Legacy-Applications.svg' },
      { label: 'Power Automate', icon: '/wp-content/uploads/2023/04/Automate-Manual-Processes.svg' },
      { label: 'Power Virtual Agents', icon: '/wp-content/uploads/2023/04/Power-Virtual-Agents.png' },
      { label: 'Power BI', icon: '/wp-content/uploads/2023/04/Automate-Integrate-Business-Processes-2.svg' },
    ],
  },
  {
    label: 'Azure Data Analytics',
    heading: 'Azure Data Analytics',
    body: 'Get ready to see the bigger picture of your business with Azure cutting-edge solutions! From big data analytics to real-time streaming, we bring your business insights to life to help make confident decisions.',
    href: '/azure-data-analytics/',
    ctaLabel: 'Explore Our Analytical Services',
    illustration: '/wp-content/uploads/2023/04/azure_data_analytics.webp',
    items: [
      { label: 'Data Storage and Management', icon: '/wp-content/uploads/2023/04/Data-Storage-and-Management.png' },
      { label: 'Data Integration and ETL', icon: '/wp-content/uploads/2023/04/Data-Integration-and-ETL.png' },
      { label: 'Data Analysis and Visualization', icon: '/wp-content/uploads/2023/04/Data-Analysis-and-Visualization.png' },
      { label: 'Governance, Security, and Compliance', icon: '/wp-content/uploads/2023/04/Governance-Security-and-Compliance.png' },
    ],
  },
  {
    label: 'Azure Managed Services',
    heading: 'Azure Managed Services',
    body: 'Ensure maximum uptime and smooth running apps with our team of experts. We offer 24/7 monitoring, comprehensive security, performance optimization, and infrastructure monitoring for your Azure environment.',
    href: '/azure-managed-services/',
    ctaLabel: 'Explore Our Managed Services',
    illustration: '/wp-content/uploads/2023/04/azure-managed-services-3.webp',
    items: [
      { label: 'Holistic Support Services', icon: '/wp-content/uploads/2023/07/5-Holistic-Support.png' },
      { label: 'Advisory', icon: '/wp-content/uploads/2023/07/6-Advisory.png' },
      { label: 'Advanced Support', icon: '/wp-content/uploads/2023/07/7-Advanced-Support.png' },
      { label: 'Security Management', icon: '/wp-content/uploads/2023/07/8-Security-Managment.png' },
    ],
  },
];

/** "Discover Cloud Opportunities" — horizontal tabs + 2-col (icon list + illustration). */
export function DiscoverCloud() {
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-[linear-gradient(180deg,#eef5fc_0%,#dbeafa_100%)]">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl">Discover Cloud Opportunities</h2>
          <p className="mt-4 text-lg text-body">
            Our team of certified Azure experts can help you design, deploy, and manage cloud-based solutions that scale with your business and drive growth.
          </p>
        </div>

        {/* horizontal tab pills */}
        <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-3">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={active === i ? 'true' : 'false'}
              onClick={() => setActive(i)}
              className={clsx(
                'rounded-md px-5 py-3 text-sm font-semibold transition-colors',
                active === i ? 'bg-brand text-white shadow-card' : 'bg-white text-ink hover:bg-surface-chip'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 2-column panel — render EVERY tab (inactive ones hidden) so all icons + service links
            are in the DOM, while the visible design stays a single active panel. */}
        {TABS.map((t, i) => (
          <div key={t.label} className={clsx('mt-10 grid items-center gap-10 lg:grid-cols-2', active === i ? '' : 'hidden')}>
            <div className="rounded-2xl bg-white p-8 shadow-card">
              <h3 className="text-2xl">{t.heading}</h3>
              <span className="mt-2 block h-1 w-12 rounded bg-brand" />
              <p className="mt-4 text-sm leading-relaxed text-body">{t.body}</p>
              <ul className="mt-6 space-y-3">
                {t.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={t.href}
                      className="flex items-center gap-3 rounded-lg border border-surface-line px-4 py-3 transition-colors hover:border-brand hover:bg-surface-tint"
                    >
                      <Image src={it.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                      <span className="text-sm font-medium text-ink">{it.label}</span>
                      <span className="ml-auto text-brand">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="#pgForm" className="btn-primary mt-6 uppercase tracking-wide">{t.ctaLabel}</Link>
            </div>
            <div className="relative">
              <Image src={t.illustration} alt={t.heading} width={680} height={520} className="float-anim mx-auto h-auto w-full" loading={i === 0 ? undefined : 'lazy'} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
