import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

/** Mobile "fold": copy + a checked feature list on one side, a phone mockup on the other.
 *  Content (heading, intro, bullets) comes from the page section; the image from a sidecar. */
export function MobileShowcase({ heading, paragraph, bullets, img }: { heading: string; paragraph?: string; bullets: string[]; img: string }) {
  return (
    <section className="section bg-surface-tint">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl lg:text-4xl">{heading}</h2>
            {paragraph && <p className="mt-5 leading-relaxed text-body">{paragraph}</p>}
            {bullets.length > 0 && (
              <ul className="mt-8 space-y-4">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="h-3.5 w-3.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="leading-relaxed text-body">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Reveal animation="zoomIn">
            <Image src={img} alt="Folio ESS mobile app" width={560} height={600} sizes="(max-width: 1024px) 80vw, 44vw" className="mx-auto h-auto w-full max-w-sm" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
