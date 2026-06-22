import Image from 'next/image';

/** Client/partner logo strip — fed by the localized brand logos in /public. */
export function LogoCloud({ logos, title }: { logos: { src: string; alt: string }[]; title?: string }) {
  return (
    <div className="text-center">
      {title && <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted">{title}</p>}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map((l) => (
          <Image
            key={l.src}
            src={l.src}
            alt={l.alt}
            width={120}
            height={48}
            className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  );
}
