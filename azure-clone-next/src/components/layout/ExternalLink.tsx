'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
  href: string;
  children: ReactNode;
};

const CONFIRM_MESSAGE =
  "You're about to leave Folio3 Azure and open another Folio3 site. Continue?";

/** Renders an anchor that pops a leave-site confirm before following the href. */
export function ExternalLink({ href, onClick, children, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!window.confirm(CONFIRM_MESSAGE)) e.preventDefault();
  };
  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
