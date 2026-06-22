import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thanks for reaching out to Folio3 Azure.',
  robots: { index: false },
  alternates: { canonical: '/thank-you/' },
};

export default function ThankYou() {
  return (
    <>
      <section className="bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Have a great day!</p>
            <h1 className="text-4xl font-bold leading-tight text-ink lg:text-5xl">Thank you for getting in touch!</h1>
            <p className="mt-6 max-w-md text-lg text-body">
              Your message is on its way to our team. A Folio3 Azure specialist will review it and
              be in touch within one business day.
            </p>
            <Link href="/" className="btn-primary mt-8 uppercase tracking-wide">Back to home</Link>
          </div>
          <Image
            src="/wp-content/uploads/2022/06/thankyou-right-image-300x235.png"
            alt="Thank you"
            width={520}
            height={408}
            priority
            className="mx-auto h-auto w-full max-w-md"
          />
        </div>
      </section>
      <OneToOneCTA tone="dark" />
    </>
  );
}
