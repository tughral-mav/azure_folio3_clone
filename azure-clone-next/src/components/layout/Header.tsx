'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { NAV } from '@/lib/nav';
import { PHONE } from '@/lib/offices';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null); // nested flyout (e.g. Azure Data Analytics, Copilot Agent)
  const closeMenus = () => { setOpenIdx(null); setOpenSub(null); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full bg-white transition-shadow duration-200',
        scrolled && 'shadow-card'
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        {/* logo + nav grouped left (matches live header distribution) */}
        <div className="flex items-center gap-6 xl:gap-[80px]">
          <Link href="/" className="flex items-center" aria-label="Folio3 Azure">
            <Image src="/wp-content/uploads/2022/06/folio3_by_azure.svg" alt="Folio3 Azure" width={186} height={40} priority />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item, i) => {
            const active = openIdx === i;
            // live hover: a 3px #2F69F2 underline that grows from the centre out (~0.3s ease-out)
            const triggerCls = clsx(
              "relative flex items-center gap-1 whitespace-nowrap py-2 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors hover:text-brand after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:-translate-x-1/2 after:rounded-full after:bg-[#2F69F2] after:transition-all after:duration-500 after:ease-out after:content-['']",
              active ? 'text-brand after:w-full' : 'text-[#4a4a57] after:w-0 hover:after:w-full focus-visible:after:w-full'
            );
            return (
            <div
              key={item.label}
              className="group relative"
              onMouseEnter={() => item.children && setOpenIdx(i)}
              onMouseLeave={closeMenus}
              onFocus={() => item.children && setOpenIdx(i)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeMenus(); }}
              onKeyDown={(e) => { if (e.key === 'Escape' && item.children) closeMenus(); }}
            >
              {item.children ? (
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openIdx === i}
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className={clsx(triggerCls, 'cursor-pointer')}
                >
                  {item.label}
                  <Chevron />
                </button>
              ) : (
                <Link href={item.href} className={triggerCls}>
                  {item.label}
                </Link>
              )}
              {item.children && openIdx === i && (
                <div className="absolute left-0 top-full w-64 rounded-lg border border-surface-line bg-white p-2 shadow-cardHover">
                  {item.children.map((c) =>
                    c.children ? (
                      // item with a nested flyout submenu (e.g. Azure Data Analytics, Copilot Agent)
                      <div
                        key={c.label}
                        className="relative"
                        onMouseEnter={() => setOpenSub(c.label)}
                        onMouseLeave={() => setOpenSub(null)}
                        onFocus={() => setOpenSub(c.label)}
                      >
                        <Link
                          href={c.href}
                          aria-haspopup="true"
                          aria-expanded={openSub === c.label}
                          className={clsx(
                            'flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                            openSub === c.label ? 'bg-brand text-white' : 'text-body hover:bg-surface-tint hover:text-brand'
                          )}
                        >
                          <span>{c.label}</span>
                          <ChevronRight />
                        </Link>
                        {openSub === c.label && (
                          <div className="absolute left-full top-0 ml-1 w-64 rounded-lg border border-surface-line bg-white p-2 shadow-cardHover">
                            {c.children.map((gc) => (
                              <Link key={gc.href} href={gc.href} className="block rounded-md px-3 py-2 text-sm text-body hover:bg-surface-tint hover:text-brand">
                                {gc.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={c.href} href={c.href} className="block rounded-md px-3 py-2 text-sm text-body hover:bg-surface-tint hover:text-brand">
                        {c.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
            );
          })}
          </nav>
        </div>

        {/* right: phone block + GET IN TOUCH */}
        <div className="hidden items-center gap-5 lg:flex">
          <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand text-white">
              <PhoneIcon />
            </span>
            <span className="whitespace-nowrap leading-tight">
              <span className="block text-xs text-muted">Talk with Us</span>
              <span className="block text-sm font-semibold text-ink">{PHONE}</span>
            </span>
          </a>
          <Link href="/contact-us/" className="whitespace-nowrap rounded-md bg-brand-navy px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand xl:px-6">
            Get in Touch
          </Link>
        </div>

        <button type="button" className="lg:hidden" aria-label="Toggle menu" aria-expanded={openMobile} aria-controls="mobile-menu" onClick={() => setOpenMobile((v) => !v)}>
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
        </button>
      </div>

      {openMobile && (
        <div id="mobile-menu" className="border-t border-surface-line bg-white lg:hidden">
          <div className="container-x py-4">
            {NAV.map((item, i) => (
              <div key={item.label} className="border-b border-surface-line/60 py-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold uppercase tracking-wide text-ink"
                  onClick={() => (item.children ? setOpenIdx(openIdx === i ? null : i) : setOpenMobile(false))}
                >
                  {item.children ? item.label : <Link href={item.href}>{item.label}</Link>}
                  {item.children && <Chevron />}
                </button>
                {item.children && openIdx === i && (
                  <div className="pb-2 pl-3">
                    {item.children.map((c) =>
                      c.children ? (
                        <div key={c.label}>
                          <div className="py-1.5 text-xs font-bold uppercase tracking-wide text-muted">{c.label}</div>
                          {c.children.map((gc) => (
                            <Link key={gc.href} href={gc.href} className="block py-1.5 pl-3 text-sm text-body" onClick={() => setOpenMobile(false)}>
                              {gc.label}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link key={c.href} href={c.href} className="block py-1.5 text-sm text-body" onClick={() => setOpenMobile(false)}>
                          {c.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact-us/" className="btn mt-4 w-full bg-brand-navy uppercase text-white">Get in Touch</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Chevron() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="ml-2 shrink-0">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .7-.2 1l-2.3 2.2z" />
    </svg>
  );
}
