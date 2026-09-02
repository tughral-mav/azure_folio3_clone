'use client';

import { useEffect, useState } from 'react';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
  href: string;
  children: ReactNode;
};

/** Pub/sub for the leave-site modal — one <LeaveSiteConfirm /> in the layout
 *  hosts the visual dialog, and every ExternalLink pushes into it. */
type Listener = (href: string | null) => void;
const listeners = new Set<Listener>();
function openLeaveModal(href: string) {
  listeners.forEach((cb) => cb(href));
}
function closeLeaveModal() {
  listeners.forEach((cb) => cb(null));
}

function isSameSite(href: string): boolean {
  try {
    const target = new URL(href, window.location.href);
    return target.hostname === window.location.hostname;
  } catch {
    return true; // relative / malformed → treat as same-site, no prompt
  }
}

/** Anchor that intercepts primary-click navigation with a visual leave-site
 *  confirm. Same-host targets and modifier-clicks (open in new tab, etc.)
 *  pass through as normal browser navigation. */
export function ExternalLink({ href, onClick, children, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (isSameSite(href)) return;
    e.preventDefault();
    openLeaveModal(href);
  };
  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

/** Visual leave-site modal. Mount once in the root layout. */
export function LeaveSiteConfirm() {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    const cb: Listener = (h) => setHref(h);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  useEffect(() => {
    if (!href) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLeaveModal();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [href]);

  if (!href) return null;

  let host = '';
  try {
    host = new URL(href).hostname.replace(/^www\./, '');
  } catch {
    host = href;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-site-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/60 px-4 backdrop-blur-sm"
      onClick={closeLeaveModal}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-cardHover"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="leave-site-title" className="text-lg font-bold text-ink">
          You&apos;re about to leave this site
        </h3>
        <p className="mt-2 text-sm text-body">
          This link takes you to another Folio3 property (<span className="font-semibold text-ink">{host}</span>). Continue?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeLeaveModal}
            className="rounded-md border border-surface-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-tint"
          >
            Stay here
          </button>
          <a
            href={href}
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-royal"
            onClick={closeLeaveModal}
          >
            Continue
          </a>
        </div>
      </div>
    </div>
  );
}
