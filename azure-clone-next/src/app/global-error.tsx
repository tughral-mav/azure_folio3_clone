'use client';

// Root-level error boundary: catches errors in the root layout itself. It must render
// its own <html>/<body> because it replaces the root layout. Inline styles only (the
// app stylesheet may not be available in this fallback).
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#121127', margin: 0 }}>Something went wrong</h1>
          <p style={{ marginTop: '1rem', color: '#4B4F58' }}>An unexpected error occurred. Please try again.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ marginTop: '1.5rem', padding: '0.65rem 1.5rem', background: '#1742E7', color: '#fff', border: 0, borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
