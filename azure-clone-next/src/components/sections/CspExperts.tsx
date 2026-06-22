import Link from 'next/link';
import Image from 'next/image';
import { Section, SectionHeading } from '@/components/ui/Section';

/** "Work With Top Microsoft CSP Experts" — browser-chrome card with the
 *  Microsoft Cloud Solution Provider logo + two CTAs (matches live). */
export function CspExperts() {
  return (
    <Section tone="tint">
      <SectionHeading
        title="Work With Top Microsoft CSP Experts"
        subtitle="Folio3 is a proud Direct (Tier 1) Microsoft Cloud Solution Provider (CSP) offering a comprehensive suite of cloud and business applications licensing solutions, value-added services, and unparalleled support to businesses of all sizes."
      />
      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl shadow-card">
        {/* browser-chrome header */}
        <div className="flex items-center gap-2 bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_100%)] px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="bg-white p-8 text-center md:p-12">
          <Image
            src="/wp-content/uploads/2023/10/csp-ms-logo.webp"
            alt="Microsoft Cloud Solution Provider"
            width={260}
            height={70}
            className="mx-auto h-auto w-[240px] object-contain"
          />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-body">
            Microsoft offers flexible pricing and licensing options for Microsoft 365, Microsoft Dynamics 365, Microsoft
            Azure, and Microsoft Power Platform, to suit your business requirements. Contact us to explore the affordable
            licensing plans, including user-based models, team member licensing, and additional add-ons that can enhance
            the functionality of your existing business solutions.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/contact-us/" className="btn-primary uppercase tracking-wide">Talk to an Expert</Link>
            <Link href="/microsoft-licensing-process/" className="btn-outline uppercase tracking-wide">Learn More</Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
