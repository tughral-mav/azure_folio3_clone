import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export type StackLayer = { name: string; tag: string; tone: 'top' | 'mid' | 'base'; href?: string };

/** Layered "Microsoft cloud stack" diagram: copy on one side, a stack of labelled layers
 *  (each with a tag pill) on the other. Modelled on the Folio ESS solution section. */
export function SolutionStack({ eyebrow, heading, paragraphs, layers }: { eyebrow?: string; heading: string; paragraphs: string[]; layers: StackLayer[] }) {
  const row = (tone: StackLayer['tone']) =>
    tone === 'top'
      ? 'bg-gradient-to-br from-brand to-brand-royal text-white shadow-[0_10px_28px_rgba(23,66,231,0.28)]'
      : tone === 'base'
        ? 'bg-brand-ink text-white'
        : 'bg-surface-blue text-brand-navy';
  const pill = (tone: StackLayer['tone']) =>
    tone === 'mid'
      ? 'border border-surface-line bg-white text-brand'
      : 'bg-white/20 text-white';
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}
            <h2 className="text-3xl lg:text-4xl">{heading}</h2>
            {paragraphs.map((t, i) => (
              <p key={i} className="mt-5 leading-relaxed text-body">{t}</p>
            ))}
          </div>
          <Reveal animation="fadeInUp">
            <div className="rounded-2xl border border-surface-line bg-white p-5 shadow-card sm:p-7">
              <div className="flex flex-col gap-3">
                {layers.map((l, i) => (
                  <div key={i} className={`flex items-center justify-between gap-4 rounded-xl px-5 py-4 ${row(l.tone)}`}>
                    {l.href
                      ? <Link href={l.href} className="font-heading text-sm font-semibold underline-offset-4 hover:underline sm:text-base">{l.name}</Link>
                      : <span className="font-heading text-sm font-semibold sm:text-base">{l.name}</span>}
                    <span className={`shrink-0 rounded px-2.5 py-1 text-xs font-medium tracking-wide ${pill(l.tone)}`}>{l.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
