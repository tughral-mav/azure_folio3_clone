import Image from 'next/image';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { Counter } from '@/components/ui/Counter';

const STATS = [
  { to: 500, suffix: '+', label: 'Our Clients' },
  { to: 20, suffix: '+', label: 'Years of Experience' },
  { to: 50, suffix: '+', label: 'Microsoft Certified Experts' },
  { to: 7, suffix: '+', label: 'Offices Worldwide' },
];

/** Home hero — light cyan→blue gradient: 3-slide auto-slider + stats band. */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eff3f4_0%,#cdeaf6_45%,#9fc6e3_100%)]">
      {/* faint circuit-board hero backdrop (matches the live) */}
      <Image src="/wp-content/uploads/2023/07/Home-page-bg.webp" alt="" fill priority className="object-cover object-right" sizes="100vw" />
      <div className="relative">
        <HeroSlider />

      {/* stats band */}
      <div className="container-x pb-14 pt-2">
        <h2 className="mb-6 text-lg font-semibold text-ink">Stats Speak for Themselves</h2>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <Counter to={s.to} suffix={s.suffix} className="text-4xl font-bold text-brand" />
              <div className="mt-1 text-sm text-body">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
