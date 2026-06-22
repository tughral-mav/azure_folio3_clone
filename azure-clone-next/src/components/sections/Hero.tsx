import Link from 'next/link';
import Image from 'next/image';

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta = { label: 'Talk to an Expert', href: '/contact-us/' },
  secondaryCta,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { src: string; alt: string; width?: number; height?: number };
}) {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(60%_60%_at_80%_-10%,#2F69F2_0%,transparent_60%)]" />
      <div className="container-x relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          {eyebrow && (
            <span className="mb-4 inline-block rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {eyebrow}
            </span>
          )}
          {/* Single H1 per page — fixes the 3-H1 SEO issue on the live site */}
          <h1 className="text-4xl font-bold leading-tight text-white lg:text-5xl">{title}</h1>
          {subtitle && <p className="mt-6 max-w-xl text-lg text-white/75">{subtitle}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={primaryCta.href} className="btn bg-white text-brand-navy hover:bg-surface-tint">
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="btn border border-white/40 text-white hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
        {image && (
          <div className="relative">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 640}
              height={image.height ?? 480}
              className="h-auto w-full rounded-xl"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
