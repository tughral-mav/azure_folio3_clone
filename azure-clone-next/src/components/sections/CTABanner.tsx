import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Reveal } from '@/components/ui/Reveal';

export function CTABanner({
  title = 'Ready to unlock the power of Azure?',
  subtitle = 'Talk to our Microsoft-certified architects about your cloud, data or Copilot roadmap.',
  cta = { label: 'Talk to an Expert', href: '/contact-us/' },
  align = 'center',
  button = 'white',
  image,
}: {
  title?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  align?: 'center' | 'left';
  button?: 'white' | 'navy';
  image?: string;
}) {
  const left = align === 'left';
  const content = (
    <div className={clsx('flex flex-col gap-6', left ? 'items-start text-left' : 'items-center text-center')}>
      <h2 className="max-w-2xl text-3xl text-white lg:text-4xl">{title}</h2>
      <p className="max-w-xl text-white/80">{subtitle}</p>
      <Link
        href={cta.href}
        className={clsx(
          'btn uppercase tracking-wide',
          button === 'navy' ? 'bg-brand-navy text-white hover:bg-white hover:text-brand-navy' : 'bg-white text-brand hover:bg-surface-tint'
        )}
      >
        {cta.label}
      </Link>
    </div>
  );

  return (
    <section className="section relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)]">
      {/* subtle radial lighting (matches the live band's texture) */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_70%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
      {image ? (
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
          {content}
          <Reveal animation="zoomIn" className="relative">
            <Image src={image} alt="" width={620} height={420} className="mx-auto h-auto w-full max-w-[560px]" />
          </Reveal>
        </div>
      ) : (
        <div className="container-x relative">{content}</div>
      )}
    </section>
  );
}
