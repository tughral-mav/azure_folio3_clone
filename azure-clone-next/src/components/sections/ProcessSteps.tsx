'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = [
  { n: 'Step 1', title: 'Schedule a Free Consultation', body: 'Looking to harness Azure at its maximum potential? Just book your 30-minute discovery call with our Azure experts and jumpstart your cloud journey with a personalized consultation session.', icon: '/wp-content/uploads/2023/07/free-consultation-blue.png' },
  { n: 'Step 2', title: 'Choose the Services that’s right for you', body: 'Our Azure consultants will listen to your business needs and guide you to the best service that fits your budget.', icon: '/wp-content/uploads/2023/07/choose_services_blue.png' },
  { n: 'Step 3', title: 'Meet with your new Senior-Level Expert', body: 'Sit back and leave the implementation process to our senior-level experts with years of experience and the latest Azure skills.', icon: '/wp-content/uploads/2023/07/senior_level_expert.png' },
  { n: 'Step 4', title: 'Let the Cloud Empower you', body: 'Experience tangible results with our seamless implementation strategies to help you achieve your goals and drive business success.', icon: '/wp-content/uploads/2023/07/cloud_empover.webp' },
];

/** "Our Process" — Elementor-style zoom-in flip cards over the office-people
 *  background. Front shows icon + STEP + title; on hover the back layer zooms in
 *  (scale 0.7 → 1, fade) revealing the same plus the step description. */
export function ProcessSteps() {
  const [hovered, setHovered] = useState<number | null>(null);

  const IconCircle = ({ src, solid }: { src: string; solid?: boolean }) => (
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: solid ? '#1f4fe0' : 'rgba(255,255,255,0.18)' }}>
      {/* eager-load so the icon is ready before the entrance animation (no pop-in glitch) */}
      <Image src={src} alt="" width={30} height={30} priority className="h-7 w-7 object-contain brightness-0 invert" />
    </div>
  );

  return (
    <section className="section relative overflow-hidden bg-[#d7e9ff]">
      <Image src="/wp-content/uploads/2023/05/step-bg.webp" alt="" fill priority className="object-cover" style={{ opacity: 0.7 }} sizes="100vw" />
      <div className="container-x relative">
        <SectionHeading title="Our Process" subtitle="Join Us on the Journey Towards Success" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const on = hovered === i;
            return (
              <Reveal key={s.n} animation="fadeInUp" delay={i * 150} className="h-full">
                <div
                  className="relative h-[300px]"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* FRONT — minimal: blue circle icon + STEP + title on the band, no card */}
                  <div
                    className="absolute inset-0 flex flex-col justify-start p-2"
                    style={{ opacity: on ? 0 : 1, transition: 'opacity .4s ease' }}
                  >
                    <IconCircle src={s.icon} solid />
                    <div className="text-xs font-bold uppercase tracking-wider text-brand">{s.n}</div>
                    <h3 className="mt-1 text-lg font-semibold leading-snug text-ink">{s.title}</h3>
                  </div>

                  {/* BACK — solid blue card zooms in on hover, adds the description */}
                  <div
                    className="absolute inset-0 flex flex-col justify-start rounded-xl p-6"
                    style={{
                      background: '#1f4fe0',
                      boxShadow: '0 18px 40px rgba(18,51,201,0.35)',
                      opacity: on ? 1 : 0,
                      transform: on ? 'scale(1)' : 'scale(0.7)',
                      transition: 'opacity .45s ease, transform .45s ease',
                    }}
                  >
                    <IconCircle src={s.icon} />
                    <div className="text-xs font-bold uppercase tracking-wider text-white/75">{s.n}</div>
                    <h3 className="mt-1 text-lg font-semibold leading-snug text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
