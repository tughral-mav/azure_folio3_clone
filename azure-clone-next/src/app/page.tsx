import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { HomeHero } from '@/components/sections/HomeHero';
import { PartnerDesignations } from '@/components/sections/PartnerDesignations';
import { IndustriesShowcase } from '@/components/sections/IndustriesShowcase';
import { DiscoverCloud } from '@/components/sections/DiscoverCloud';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  description:
    'Folio3 is a Microsoft Solutions Partner for Azure cloud, data analytics, Microsoft Fabric and Copilot — build, run and manage applications on Azure.',
};
import { AwardsBand } from '@/components/sections/AwardsBand';
import { CspExperts } from '@/components/sections/CspExperts';
import { Pillars } from '@/components/sections/Pillars';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ServiceCardGrid } from '@/components/sections/ServiceCardGrid';
import { FeatureTabs } from '@/components/sections/FeatureTabs';
import { Accordion } from '@/components/sections/Accordion';
import { CTABanner } from '@/components/sections/CTABanner';

// "Discover Cloud Opportunities" — tabbed (content from home.json)
const CLOUD_TABS = [
  { label: 'Azure Cloud Services', heading: 'Azure Cloud Services', body: 'Seamlessly migrate, efficiently deploy, and manage your cloud infrastructure. From initial assessment to ongoing support, we deliver Azure-driven insights and robust security frameworks to drive your digital transformation forward.', bullets: ['Cloud Strategy & Consulting', 'Application Development', 'DevOps Automation as a Service', 'Cloud Migration'] },
  { label: 'Power Platform', heading: 'Microsoft Power Platform', body: 'Automate processes, analyze data and build low-code apps across your organization with the Microsoft Power Platform.', bullets: ['Power BI', 'Power Apps', 'Power Automate', 'Power Virtual Agents'] },
  { label: 'Azure Data Analytics', heading: 'Azure Data Analytics', body: 'Turn raw data into decisions with modern analytics, data warehousing and visualization on Azure and Microsoft Fabric.', bullets: ['Data Warehousing', 'Data Integration', 'Data Visualization', 'Microsoft Fabric'] },
  { label: 'Azure Managed Services', heading: 'Azure Managed Services', body: 'Keep your Azure estate healthy with proactive monitoring, optimization and SLA-backed support around the clock.', bullets: ['24/7 Monitoring', 'Security & Patching', 'Cost Optimization', 'Performance Tuning'] },
];

const NEXT_BIG_IDEA = [
  { title: 'Build Scalable Websites Seamlessly', description: 'With Azure, create scalable workloads that keep pace with your business. Host domains, deploy with ease, and leverage DevOps for greater efficiency.', icon: '🌐' },
  { title: 'Innovate Existing and Future Apps', description: 'Modernize and develop apps that work seamlessly across cloud and hybrid environments with Azure’s app services.', icon: '🚀' },
  { title: 'Build Mobile Experiences for Wider Audience', description: 'Build cloud-connected mobile experiences based on customer reviews and behaviors using AI and cognitive services.', icon: '📱' },
];

const TRUST = [
  { title: '750+ Certified Developers', description: 'Our Azure experts handle the most complex Microsoft Azure infrastructure projects, delivering outstanding results every time.', icon: '👩‍💻' },
  { title: 'Cloud-Centric Approach', description: 'Providing innovative, effective, and secure Azure solutions, ensuring your digital transformation journey is a success.', icon: '☁️' },
  { title: 'App Modernization Specialists', description: 'Extensive experience in modernizing legacy applications, helping businesses leverage the latest Azure technologies.', icon: '🔧' },
  { title: '1,000+ Clients Worldwide', description: 'Our extensive client list speaks volumes about our expertise and commitment to delivering exceptional Azure solutions.', icon: '🌍' },
  { title: '100+ Applications Supported', description: 'We have the expertise to help you leverage Azure for all your business needs, no matter how diverse they may be.', icon: '📦' },
  { title: '24/7 Support and Maintenance', description: 'Folio3 offers round-the-clock support and maintenance services to ensure that your Azure infrastructure is always up and running smoothly.', icon: '🛟' },
];

const FAQS = [
  { q: 'What is Azure Consulting?', a: 'Azure consulting helps businesses plan, build, migrate and manage workloads on Microsoft Azure — from strategy and architecture through implementation and ongoing optimization.' },
  { q: 'What is Microsoft Azure and How Does it Work?', a: 'Microsoft Azure is a cloud computing platform offering compute, storage, networking, data and AI services on demand, billed by usage, across a global network of data centers.' },
  { q: 'What are the top 10 most used Microsoft Azure services?', a: 'Commonly used services include Virtual Machines, App Service, Azure SQL, Blob Storage, AKS, Functions, Azure AD, Data Factory, Synapse/Fabric and Azure OpenAI.' },
  { q: 'What type of cloud service is Microsoft Azure?', a: 'Azure spans IaaS, PaaS and SaaS, letting you choose the level of control and management that fits each workload.' },
  { q: 'Why Azure Folio3 is the best Azure Consulting Company?', a: 'As a Microsoft Solutions Partner with certified engineers across data, AI and infrastructure, Folio3 delivers end-to-end Azure solutions backed by 20+ years of experience.' },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <PartnerDesignations />

      <DiscoverCloud />

      <IndustriesShowcase />

      <AwardsBand />

      <Section>
        <SectionHeading
          title="Your Next Big Idea Starts in the Cloud"
          subtitle="Take charge of your cloud like never before and soar towards success with ease. Don’t let the complexities of cloud computing hold you back — unlock your full potential today!"
        />
        <div className="mt-12">
          <ServiceCardGrid cards={NEXT_BIG_IDEA} columns={3} />
        </div>
      </Section>

      <CTABanner
        title="Scale Your Business with Our Azure Professional Services"
        subtitle="Don’t let the complexities of cloud computing hold you back — unlock your full potential with Azure today!"
        cta={{ label: 'Get Started with Azure', href: '#pgForm' }}
        align="left"
        button="navy"
        image="/wp-content/uploads/2023/05/Scale-Your-Business-with-.png"
      />

      <CspExperts />

      <Pillars />

      <ProcessSteps />

      <Section tone="tint">
        <SectionHeading
          title="Explore Why Businesses Trust Folio3 To Fuel Growth"
          subtitle="With Azure, you can now take charge of your cloud like never before and soar towards success with ease."
        />
        <div className="mt-12">
          <ServiceCardGrid cards={TRUST} columns={3} />
        </div>
        <div className="mt-10 text-center">
          <Link href="#pgForm" className="btn-primary uppercase tracking-wide">Request a Call</Link>
        </div>
      </Section>

      <CaseStudies />

      <Section>
        <SectionHeading title="Your Common Queries Are Resolved" subtitle="We believe in the power of the cloud to transform businesses and empower people." />
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,420px)]">
          <Accordion items={FAQS} />
          <div className="relative hidden lg:block">
            <Image src="/wp-content/uploads/2023/05/faq_img.webp" alt="" width={420} height={420} className="float-anim h-auto w-full" />
          </div>
        </div>
      </Section>

      <OneToOneCTA tone="light" />
    </>
  );
}
