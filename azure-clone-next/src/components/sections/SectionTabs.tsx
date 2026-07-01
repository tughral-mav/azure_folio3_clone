'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Reveal } from '@/components/ui/Reveal';

export type TabItem = { title: string; body: string; icon: string };
export type SectionTab = { label: string; heading?: string; body?: string; items: TabItem[]; img?: string; cta?: { text: string; href: string } | null };

/** Generic Elementor n-tabs renderer: a pill/underline tab bar + the active tab's panel. The panel
 *  shows either a grid of icon-box sub-items OR an image (dashboard tabs), plus optional body + CTA. */
export function SectionTabs({ heading, eyebrow, subtitle, tabs, imageSide = 'left' }: { heading: string; eyebrow?: string; subtitle?: string; tabs: SectionTab[]; imageSide?: 'left' | 'right' }) {
  const [active, setActive] = useState(0);
  return (
    <section className="section bg-[linear-gradient(180deg,#eef5fc_0%,#dbeafa_100%)]">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}
          {heading && <h2 className="text-3xl lg:text-4xl">{heading}</h2>}
          {subtitle && <p className="mt-4 text-body">{subtitle}</p>}
        </div>

        {/* tab bar */}
        <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-3">
          {tabs.map((t, i) => (
            <button key={t.label + i} type="button" role="tab" aria-selected={active === i}
              onClick={() => setActive(i)}
              className={clsx('rounded-md px-5 py-3 text-sm font-semibold transition-colors',
                active === i ? 'bg-brand text-white shadow-card' : 'bg-white text-ink hover:bg-surface-chip')}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Render ONLY the active panel. Rendering every panel (even hidden) inlined all tabs' icon
            SVGs + illustrations into the HTML — hundreds of KB — and forced their images to load.
            Switching re-renders instantly; the newly-active image loads on demand (small, edge-cached). */}
        {tabs.map((t, i) => active !== i ? null : (
          <div key={i} className="mt-10 rounded-2xl bg-white p-6 shadow-card lg:p-10">
            {t.heading && <h3 className="mb-2 text-2xl">{t.heading}</h3>}
            {t.body && <p className="mb-6 max-w-3xl text-sm leading-relaxed text-body">{t.body}</p>}
            {t.img && t.items.length > 0 ? (
              // 2-column: sub-feature list + CTA on one side, illustration on the other. imageSide
              // controls which: 'right' matches the industry pages' live layout (items left, image
              // right); 'left' keeps the Copilot Agent "What Do You Get" tabs (image left).
              <div className="grid items-start gap-8 lg:grid-cols-2">
                <Reveal animation="zoomIn" className={imageSide === 'right' ? 'lg:order-2' : undefined}>{active === i && <Image src={t.img} alt={t.label} width={640} height={480} sizes="(max-width: 1024px) 100vw, 45vw" className="h-auto w-full rounded-xl" />}</Reveal>
                <div className={imageSide === 'right' ? 'lg:order-1' : undefined}>
                  <div className="space-y-5">
                    {t.items.map((it, j) => (
                      <Reveal key={j} animation="fadeInUp" delay={j * 50}><div className="flex gap-4">
                        {it.icon && it.icon.startsWith('<svg')
                          ? <span className="mt-0.5 inline-block shrink-0 [&>svg]:h-10 [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: it.icon }} />
                          : it.icon
                            ? <Image src={it.icon} alt="" width={44} height={44} className="mt-0.5 h-10 w-10 shrink-0 object-contain" />
                            : <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-chip text-brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-5 w-5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
                        <div><h4 className="font-semibold text-ink">{it.title}</h4>{it.body && <p className="mt-1 text-sm leading-relaxed text-body">{it.body}</p>}</div>
                      </div></Reveal>
                    ))}
                  </div>
                  {t.cta && t.cta.href && <Link href={t.cta.href} className="btn-primary mt-7 uppercase tracking-wide">{t.cta.text || 'Learn More'}</Link>}
                </div>
              </div>
            ) : (
              <>
                {t.items.length > 0 ? (
                  // features stacked in a left column (icon-left + title + body) — matches the live's
                  // Elementor Nested Tabs panel; icons may be inline SVG strings or image URLs.
                  <div className="max-w-2xl space-y-6">
                    {t.items.map((it, j) => (
                      <Reveal key={j} animation="fadeInUp" delay={j * 50}><div className="flex gap-4">
                        {it.icon && it.icon.startsWith('<svg')
                          ? <span className="mt-0.5 inline-block shrink-0 [&>svg]:h-10 [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: it.icon }} />
                          : it.icon
                            ? <Image src={it.icon} alt="" width={44} height={44} className="mt-0.5 h-10 w-10 shrink-0 object-contain" />
                            : <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-chip text-brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-5 w-5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
                        <div><h4 className="font-semibold text-ink">{it.title}</h4>{it.body && <p className="mt-1 text-sm leading-relaxed text-body">{it.body}</p>}</div>
                      </div></Reveal>
                    ))}
                  </div>
                ) : t.img ? (
                  <Reveal animation="zoomIn">{active === i && <Image src={t.img} alt={t.label} width={1100} height={620} sizes="(max-width: 1024px) 100vw, 60vw" className="mx-auto h-auto w-full rounded-xl" />}</Reveal>
                ) : null}
                {t.cta && t.cta.href && <Link href={t.cta.href} className="btn-primary mt-7 uppercase tracking-wide">{t.cta.text || 'Learn More'}</Link>}
              </>
            )}
          </div>
        ))}
        {/* Note: only the ACTIVE panel renders its illustration (an optimized next/image), so a page
            with many tabs loads one image, not all of them. The previous version also emitted a hidden
            <img> per item that used the inline SVG icon strings as `src` — firing dozens of broken
            requests and bloating the HTML; that preload block was removed. Other tabs' images load on
            demand when their tab is selected (small, and edge-cached after first optimization). */}
      </div>
    </section>
  );
}
