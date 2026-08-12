import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export type Shot = { src: string; w: number; h: number; caption?: string };

/** Product-tour gallery: a grid of app screenshots, each in a subtle browser frame with a caption. */
export function ScreenshotGallery({ eyebrow, heading, subtitle, items }: { eyebrow?: string; heading: string; subtitle?: string; items: Shot[] }) {
  return (
    <section className="section bg-surface-tint">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}
          <h2 className="text-3xl lg:text-4xl">{heading}</h2>
          {subtitle && <p className="mt-4 text-body">{subtitle}</p>}
        </div>
        <div className="mt-12 grid items-start gap-8 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={i} animation="fadeInUp" delay={i * 60}>
              <figure className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
                <div className="flex items-center gap-2 border-b border-surface-line bg-surface-tint px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-surface-line" />
                  <span className="h-3 w-3 rounded-full bg-surface-line" />
                  <span className="h-3 w-3 rounded-full bg-surface-line" />
                </div>
                <Image src={it.src} alt={it.caption ?? ''} width={it.w} height={it.h} sizes="(max-width: 768px) 100vw, 48vw" className="h-auto w-full" />
                {it.caption && <figcaption className="border-t border-surface-line px-5 py-4 text-sm leading-relaxed text-body">{it.caption}</figcaption>}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
