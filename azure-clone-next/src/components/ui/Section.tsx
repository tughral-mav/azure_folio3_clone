import clsx from 'clsx';
import { Reveal } from '@/components/ui/Reveal';

type Tone = 'white' | 'tint' | 'navy' | 'ink';
const toneClass: Record<Tone, string> = {
  white: 'bg-white text-body',
  tint: 'bg-surface-tint text-body',
  navy: 'bg-brand-navy text-white',
  ink: 'bg-brand-ink text-white',
};

export function Section({
  children,
  tone = 'white',
  className,
  id,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={clsx('section', toneClass[tone], className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  light?: boolean;
}) {
  return (
    <Reveal animation="fadeInUp" className={clsx('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={clsx('text-3xl lg:text-4xl', light && 'text-white')}>{title}</h2>
      {subtitle && (
        <p className={clsx('mt-4 text-lg', light ? 'text-white/70' : 'text-body')}>{subtitle}</p>
      )}
    </Reveal>
  );
}
