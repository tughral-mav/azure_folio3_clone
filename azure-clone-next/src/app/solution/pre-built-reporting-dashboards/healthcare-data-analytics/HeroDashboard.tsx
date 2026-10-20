import Image from 'next/image';

/** Hero creative — a real Folio3 Power BI dashboard (executive summary, demo data) in a browser frame,
 *  labelled for what it actually shows, with floating badges. Swap for a real healthcare dashboard
 *  screenshot once one is available. */
export function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <style>{`
        @keyframes hc-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @media (prefers-reduced-motion: reduce) { .hc-anim { animation: none !important } }
      `}</style>
      <figure className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-cardHover">
        {/* window bar */}
        <div className="flex items-center border-b border-surface-line bg-brand-ink px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="ml-3 truncate text-xs font-semibold text-white/80">Executive summary · Power BI</span>
          </div>
        </div>
        <Image
          src="/wp-content/uploads/2026/09/executive-summary-dashboard-power-bi.webp"
          alt="Executive summary dashboard in Power BI built by Folio3, showing sales, profit and customer KPIs on demo data"
          width={1600}
          height={850}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full"
        />
      </figure>

      {/* floating badges */}
      <div
        className="hc-anim absolute -bottom-5 -left-4 hidden rounded-xl border border-surface-line bg-white px-4 py-3 shadow-cardHover sm:block"
        style={{ animation: 'hc-float 4s ease-in-out infinite' }}
      >
        <p className="text-[11px] text-muted">Sources unified</p>
        <p className="text-sm font-bold text-ink">EHR · Claims · Finance</p>
      </div>
      <div
        className="hc-anim absolute -right-4 -top-5 hidden rounded-xl bg-brand px-4 py-3 text-white shadow-cardHover sm:block"
        style={{ animation: 'hc-float 4s ease-in-out 2s infinite' }}
      >
        <p className="text-[11px] text-white/80">Security</p>
        <p className="text-sm font-bold">HIPAA-ready</p>
      </div>
    </div>
  );
}
