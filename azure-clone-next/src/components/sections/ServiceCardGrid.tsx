import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export type ServiceCard = {
  title: string;
  description: string;
  href?: string;
  icon?: string;
};

export function ServiceCardGrid({ cards, columns = 3 }: { cards: ServiceCard[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <div className={`grid grid-cols-1 gap-6 ${cols}`}>
      {cards.map((c, i) => {
        const Card = (
          <div className="group h-full rounded-xl border border-surface-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover hover:border-brand/30">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-chip text-brand">
              {c.icon ?? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-6 w-6"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <h3 className="text-xl">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{c.description}</p>
            {c.href && (
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2">
                Learn more →
              </span>
            )}
          </div>
        );
        return (
          <Reveal key={c.title} animation="fadeInUp" delay={i * 100} className="h-full">
            {c.href ? <Link href={c.href} className="block h-full">{Card}</Link> : Card}
          </Reveal>
        );
      })}
    </div>
  );
}
