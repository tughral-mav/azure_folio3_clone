import Image from 'next/image';
import { ContactForm } from '@/components/forms/ContactForm';
import { Counter } from '@/components/ui/Counter';

const STATS = [
  { to: 5000, suffix: '+', label: 'Projects Deilvered' },
  { to: 700, suffix: '+', label: 'Global Employees' },
  { to: 1000, suffix: '+', label: 'Companies Served' },
  { to: 20, suffix: '+', label: 'Global Awards won' },
];

/** "Schedule a 1:1 Call Today" — left column: contained world-map + a row of
 *  stats beneath it; right column: lead form. Matches the live layout/scale. */
export function OneToOneCTA({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';
  return (
    <section id="pgForm" className={`relative overflow-hidden py-20 ${dark ? 'bg-brand-ink' : 'bg-surface-tint'}`}>
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        {/* left: world map + stats row */}
        <div>
          <Image
            src="/wp-content/uploads/2024/08/azure-offices-map-img.webp"
            alt="Folio3 global offices"
            width={900}
            height={460}
            priority
            className="mx-auto h-auto w-full max-w-[540px] lg:mx-0"
            style={dark ? { filter: 'invert(1) hue-rotate(180deg)', opacity: 0.85 } : undefined}
          />
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <Counter to={s.to} suffix={s.suffix} className={`text-3xl font-bold ${dark ? 'text-white' : 'text-ink'}`} />
                <div className={`mt-1 text-xs ${dark ? 'text-white/60' : 'text-body'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right: lead form */}
        <div className="rounded-2xl bg-white p-8 shadow-cardHover">
          <h2 className="text-2xl">Schedule a 1:1 Call Today</h2>
          <p className="mt-2 text-sm text-body">Get in touch with our team to solve your Azure queries.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
