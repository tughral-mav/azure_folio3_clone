import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">Error 404</p>
      <h1 className="mt-4 text-4xl font-bold text-ink lg:text-5xl">This page could not be found</h1>
      <p className="mt-4 max-w-xl text-lg text-body">
        The page you’re looking for may have moved or no longer exists. Let’s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/services/" className="btn border border-surface-line text-ink hover:text-brand">Explore services</Link>
        <Link href="/contact-us/" className="btn border border-surface-line text-ink hover:text-brand">Contact us</Link>
      </div>
    </section>
  );
}
