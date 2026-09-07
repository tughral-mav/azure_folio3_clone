import { ContactForm } from '@/components/forms/ContactForm';

const STATS = [
  { value: '5,000+', label: 'Projects Deilvered' },
  { value: '700+', label: 'Global Employees' },
  { value: '1,000+', label: 'Companies Served' },
  { value: '20+', label: 'Global Awards won' },
];

/** "Schedule a 1:1 Call Today" — left column: short headline + stats row;
 *  right column: lead form (the visual focus). */
export function OneToOneCTA({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';
  return (
    <section id="pgForm" className={`relative overflow-hidden py-20 ${dark ? 'bg-brand-ink' : 'bg-surface-tint'}`}>
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        {/* left: short pitch + stats row */}
        <div>
          <p className={`text-sm font-medium uppercase tracking-wider ${dark ? 'text-brand/80' : 'text-brand'}`}>Talk to an Azure engineer</p>
          <h2 className={`mt-3 text-3xl font-bold leading-tight sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}>
            Let&apos;s talk about your Azure project.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className={`text-3xl font-bold ${dark ? 'text-white' : 'text-ink'}`}>{s.value}</div>
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
