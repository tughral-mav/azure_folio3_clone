import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { ConversionBeacon } from '@/components/analytics/ConversionBeacon';

export const metadata: Metadata = {
  title: 'Thank You — Contact Us | Folio3 Azure',
  description: 'Thanks for contacting Folio3 Azure. A specialist will be in touch shortly — meanwhile, grab our Azure Cloud Starter Guide or book a call.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/contact-us/thank-you/' },
};

/** Next steps offered on the page (a real second conversion opportunity). */
const EXPLORE = [
  { title: 'Azure Cloud Services', href: '/azure-cloud-service/' },
  { title: 'Azure Data Analytics', href: '/azure-data-analytics/' },
  { title: 'Microsoft Copilot Consulting', href: '/microsoft-power-platform-services/' },
];

export default function ContactThankYou() {
  return (
    <>
      {/* fires the conversion event into the dataLayer on load (GTM wiring is a spec, not code here) */}
      <ConversionBeacon event="generate_lead" source="contact-us" />

      {/* hero — modelled on /thank-you/ */}
      <section className="bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Have a great day!</p>
            <h1 className="text-4xl font-bold leading-tight text-ink lg:text-5xl">Thanks for reaching out!</h1>
            <p className="mt-6 max-w-md text-lg text-body">
              Your message is on its way to our team. A Folio3 Azure specialist will review it and
              be in touch within one business day. While you wait, here are two useful next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/downloads/azure-cloud-starter-guide.pdf"
                download
                className="btn-primary uppercase tracking-wide"
              >
                Download the Azure Cloud Starter Guide
              </a>
              <Link href="#pgForm" className="btn-outline uppercase tracking-wide">
                Book a call
              </Link>
            </div>
          </div>
          <Image
            src="/wp-content/uploads/2022/06/thankyou-right-image-300x235.png"
            alt="Thank you for contacting Folio3 Azure"
            width={520}
            height={408}
            priority
            className="mx-auto h-auto w-full max-w-md"
          />
        </div>
      </section>

      {/* your free guide — gated asset delivery */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Your free guide</p>
            <h2 className="mt-3 text-3xl lg:text-4xl">Azure Cloud Starter Guide</h2>
            <p className="mt-3 text-body">
              A practical primer on planning, migrating and optimising workloads on Microsoft Azure —
              yours to keep as a thank-you for getting in touch.
            </p>
            <a
              href="/downloads/azure-cloud-starter-guide.pdf"
              download
              className="btn-primary mt-6 uppercase tracking-wide"
            >
              Download the guide (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* explore more — keep the visitor moving */}
      <section className="section bg-surface-tint">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl lg:text-4xl">Explore more while you wait</h2>
            <p className="mt-3 text-body">See how teams put Folio3 and Azure to work.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {EXPLORE.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="card-hover block rounded-xl border border-surface-line bg-white p-6 text-center shadow-card"
              >
                <h3 className="text-base font-semibold text-ink">{c.title}</h3>
                <span className="mt-2 inline-block text-sm text-brand">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* book a call — the on-page form the "Book a call" CTA scrolls to (#pgForm) */}
      <OneToOneCTA tone="dark" />
    </>
  );
}
