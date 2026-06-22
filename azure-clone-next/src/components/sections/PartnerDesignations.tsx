import Image from 'next/image';
import { Section, SectionHeading } from '@/components/ui/Section';

const BADGES = [
  { src: '/wp-content/uploads/2024/08/data-ai-azure-logo-img.webp', alt: 'Data & AI - Azure' },
  { src: '/wp-content/uploads/2024/08/infrastructure-azure-logo-img.webp', alt: 'Infrastructure - Azure' },
  { src: '/wp-content/uploads/2024/08/digital-app-innovation-logo-img.webp', alt: 'Digital & App Innovation - Azure' },
  { src: '/wp-content/uploads/2024/08/business-application-logo-img.webp', alt: 'Business Applications' },
];

/** "Folio3 Achieves Microsoft Solution Partner Designations" — 4 partner designation badges. */
export function PartnerDesignations() {
  return (
    <Section>
      <SectionHeading title="Folio3 Achieves Microsoft Solution Partner Designations" />
      <div className="mt-12 grid grid-cols-1 items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map((badge) => (
          <Image
            key={badge.src}
            src={badge.src}
            alt={badge.alt}
            width={300}
            height={203}
            className="h-auto w-full max-w-[280px] mx-auto object-contain"
          />
        ))}
      </div>
    </Section>
  );
}
