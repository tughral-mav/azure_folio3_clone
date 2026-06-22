import Image from 'next/image';
import { Section, SectionHeading } from '@/components/ui/Section';

const PILLARS = [
  { title: 'Productivity', image: '/wp-content/uploads/2023/05/employee-image-1-1.png', body: 'Take charge of your cloud like never before and soar towards success with ease, backed by Azure’s productivity tooling.' },
  { title: 'Agility', image: '/wp-content/uploads/2023/05/agility.webp', body: 'Respond to change faster with scalable, cloud-native infrastructure that adapts to your business needs.' },
  { title: 'Scalability', image: '/wp-content/uploads/2023/05/scalability1-1.webp', body: 'Grow without limits — Azure scales compute, storage and data services on demand as you expand.' },
];

/** "Ensuring Productivity, Agility, & Scalability." — 3-column pillars. */
export function Pillars() {
  return (
    <Section>
      <SectionHeading title="Ensuring Productivity, Agility, & Scalability." subtitle="Join us on the journey towards success" />
      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title}>
            <Image src={p.image} alt={p.title} width={420} height={280} className="mb-5 h-auto w-full rounded-xl object-cover" />
            <h3 className="text-xl">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
