'use client';

import Link from 'next/link';
import { useEffect } from 'react';

// Route-level error boundary: any uncaught render error shows this instead of a blank crash.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // surface in server/Vercel logs for diagnosis
    console.error(error);
  }, [error]);

  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">Something went wrong</p>
      <h1 className="mt-4 text-4xl font-bold text-ink lg:text-5xl">An unexpected error occurred</h1>
      <p className="mt-4 max-w-xl text-lg text-body">
        Sorry about that — please try again, or head back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button type="button" onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn border border-surface-line text-ink hover:text-brand">Back to home</Link>
      </div>
    </section>
  );
}
