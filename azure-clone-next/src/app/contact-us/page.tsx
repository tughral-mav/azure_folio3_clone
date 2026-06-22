import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

export const metadata: Metadata = {
  title: 'Contact Us — Azure Cloud Services | Folio3',
  description: 'Reach out for general inquiries about Azure cloud services. Talk to Folio3’s Microsoft-certified Azure architects about your cloud, data or Copilot project.',
  alternates: { canonical: '/contact-us/' },
};

const DETAILS = [
  { label: 'Email', value: 'azure@folio3.com', href: 'mailto:azure@folio3.com' },
  { label: 'Phone', value: '+1 (408) 365 4638', href: 'tel:+14083654638' },
  { label: 'Support', value: 'support-team@folio3.com', href: 'mailto:support-team@folio3.com' },
];

export default function ContactPage() {
  return (
    <>
      {/* hero — banner background + illustration */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <Image src="/wp-content/uploads/2023/06/contact_us-banner.webp" alt="" fill priority sizes="100vw" className="object-cover object-right opacity-90" />
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Get in Touch</p>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">
              Reach Out For General Inquiries About <span className="text-brand">Azure Cloud Services</span>
            </h1>
            <p className="mt-6 text-lg text-body">Speak to our Azure experts.</p>
          </div>
          <Image src="/wp-content/uploads/2023/06/azure-banner-contact-us.webp" alt="" width={580} height={460} priority className="mx-auto h-auto w-full max-w-md" />
        </div>
      </section>
      <div className="bg-brand"><div className="container-x py-3 text-sm text-white/90"><Link href="/" className="hover:underline">Home</Link><span className="px-2">»</span><span>Contact Us</span></div></div>

      {/* have questions — illustration + contact details on the left, form on the right */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl lg:text-4xl">Have questions? get in touch!</h2>
            <p className="mt-3 text-body">We believe in the power of the cloud to transform businesses and empower people.</p>
          </div>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="relative mx-auto max-w-md">
                <Image src="/wp-content/uploads/2023/04/Oval-bg.webp" alt="" width={520} height={520} className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-contain opacity-90" />
                <Image src="/wp-content/uploads/2023/06/contact-us-1.webp" alt="Contact Folio3 Azure experts" width={520} height={460} className="relative mx-auto h-auto w-full" />
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {DETAILS.map((d) => (
                  <div key={d.label} className="rounded-xl card-hover border border-surface-line bg-white p-5 text-center shadow-card">
                    <h3 className="text-base font-semibold text-ink">{d.label}</h3>
                    <a href={d.href} className="mt-1 block break-words text-sm text-brand hover:underline">{d.value}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-cardHover ring-1 ring-surface-line">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">get in touch today!</span>
              <div className="mt-6"><ContactForm /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Work — CTA band with the Scale-Your-Business illustration */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-white lg:text-4xl">Ready to Work with The Ultimate Azure Experts?</h2>
            <p className="mt-4 max-w-xl text-white/85">Get the power to boost your business, innovation, and growth.</p>
            <Link href="#pgForm" className="btn mt-7 bg-brand-navy text-white hover:bg-white hover:text-brand-navy uppercase tracking-wide">Get Customized Azure Cloud Services</Link>
          </div>
          <Image src="/wp-content/uploads/2023/05/Scale-Your-Business-with-.png" alt="" width={560} height={420} className="mx-auto h-auto w-full max-w-md" />
        </div>
      </section>

      <OneToOneCTA tone="dark" />
    </>
  );
}
