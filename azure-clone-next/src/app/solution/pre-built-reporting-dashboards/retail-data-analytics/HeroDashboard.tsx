import Image from 'next/image';

/** Hero creative — real Folio3 retail Power BI dashboard (sample data) in a browser frame, with floating badges. */
export function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <figure className="overflow-hidden rounded-2xl border border-surface-line bg-white shadow-cardHover">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-surface-line bg-brand-ink px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="ml-3 truncate text-xs font-semibold text-white/80">Retail Sales · All stores and channels</span>
          </div>
          <span className="hidden rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white sm:inline">Power BI</span>
        </div>
        <Image
          src="/wp-content/uploads/2026/09/ecommerce-retail-sales-dashboard-power-bi.webp"
          alt="Folio3 retail data analytics dashboard in Power BI showing sales, inventory and store KPIs"
          width={1600}
          height={817}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full"
        />
      </figure>

      {/* floating badges */}
      <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-surface-line bg-white px-4 py-3 shadow-cardHover sm:block">
        <p className="text-[11px] text-muted">Sources unified</p>
        <p className="text-sm font-bold text-ink">POS · ERP · E-commerce</p>
      </div>
      <div className="absolute -right-4 -top-5 hidden rounded-xl bg-brand px-4 py-3 text-white shadow-cardHover sm:block">
        <p className="text-[11px] text-white/80">First dashboards</p>
        <p className="text-sm font-bold">In 2–3 weeks</p>
      </div>
    </div>
  );
}
