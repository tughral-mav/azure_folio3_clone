import type { Metadata } from 'next';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ServiceCardGrid } from '@/components/sections/ServiceCardGrid';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Azure cloud, data and AI solutions tailored to healthcare, retail, manufacturing, logistics and construction.',
  alternates: { canonical: '/industries/' },
};

// Index page for the "Industry" mega-menu group (live nav had no landing page → fixes a 404).
const INDUSTRIES = [
  { title: 'Healthcare', description: 'HIPAA-ready Azure data platforms and AI for providers and payers.', href: '/azure-for-healthcare/', icon: '🏥' },
  { title: 'Retail', description: 'Unified commerce analytics and demand forecasting on Azure.', href: '/azure-for-retail/', icon: '🛍️' },
  { title: 'Manufacturing', description: 'IoT, predictive maintenance and supply-chain insight.', href: '/azure-for-manufacturing/', icon: '🏭' },
  { title: 'Logistics & Transport', description: 'Real-time fleet, route and warehouse intelligence.', href: '/azure-for-logistics-and-transport/', icon: '🚚' },
  { title: 'Construction', description: 'Project, asset and cost analytics for the built environment.', href: '/azure-for-construction/', icon: '🏗️' },
];

export default function IndustriesIndex() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Industries"
          title="Azure solutions for your industry"
          subtitle="Domain-specific cloud, data and AI accelerators built on Microsoft Azure."
        />
        <div className="mt-12">
          <ServiceCardGrid cards={INDUSTRIES} columns={3} />
        </div>
      </Section>
      <CTABanner />
    </>
  );
}
