import Image from 'next/image';
import Link from 'next/link';
import { getCardIcon } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';

export type FeatureRow = { title: string; body: string; icon?: string };
export type FeatureGroup = {
  subheading: string;
  intro?: string;
  rows: FeatureRow[];
  img?: string;
  cta?: { text: string; href: string };
};

/** The live's "Let's Dive Into…" / "DevOps Automation…" pattern: a centred section
 *  heading, then a stack of alternating 2-col blocks — each block an image on one
 *  side and a sub-heading + intro + icon-feature rows + CTA on the other. This is
 *  what makes those sections tall on the live (vs a single cramped 2-col list). */
export function FeatureGroups({
  heading,
  subtitle,
  groups,
  tone = 'bg-white',
  slug,
}: {
  heading?: string;
  subtitle?: string;
  groups: FeatureGroup[];
  tone?: string;
  slug?: string;
}) {
  return (
    <section className={`py-16 lg:py-24 ${tone}`}>
      <div className="container-x">
        {heading && (
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{heading}</h2></Reveal>
            {subtitle && <p className="mt-4 text-body">{subtitle}</p>}
          </div>
        )}
        <div className={`${heading ? 'mt-14' : ''} space-y-16 lg:space-y-24`}>
          {groups.map((g, gi) => {
            const imgRight = gi % 2 === 0;
            return (
              <div key={gi} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {g.img && (
                  <Reveal animation={imgRight ? 'fadeInRight' : 'fadeInLeft'} className={imgRight ? 'lg:order-2' : 'lg:order-1'}>
                    <Image src={g.img} alt={g.subheading} width={620} height={460} className="mx-auto h-auto w-full rounded-2xl" />
                  </Reveal>
                )}
                <div className={imgRight ? 'lg:order-1' : 'lg:order-2'}>
                  <Reveal animation="fadeInUp"><h3 className="text-2xl font-semibold text-ink">{g.subheading}</h3></Reveal>
                  <span className="mt-3 block h-1 w-12 rounded bg-brand" />
                  {g.intro && <p className="mt-4 text-body">{g.intro}</p>}
                  <ul className="mt-6 space-y-5">
                    {g.rows.map((r, ri) => {
                      const rowIcon = r.icon || (slug ? getCardIcon(slug, r.title) : '');
                      return (
                      <li key={ri}>
                        <Reveal animation="fadeInUp" delay={ri * 60} className="flex gap-4">
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-chip text-brand">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {rowIcon ? <img src={rowIcon} alt="" className="h-5 w-5 object-contain" /> : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-5 w-5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            )}
                          </span>
                          <div>
                            <h4 className="font-semibold text-ink">{r.title}</h4>
                            {r.body && <p className="mt-1 text-sm leading-relaxed text-body">{r.body}</p>}
                          </div>
                        </Reveal>
                      </li>
                    );})}
                  </ul>
                  {g.cta && <Link href={g.cta.href} className="btn-primary mt-7 uppercase tracking-wide">{g.cta.text}</Link>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
