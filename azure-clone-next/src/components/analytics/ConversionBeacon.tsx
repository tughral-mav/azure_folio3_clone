'use client';

import { useEffect } from 'react';

/**
 * Fires a single conversion signal into the GTM dataLayer when a thank-you page
 * mounts. This ONLY pushes the event — it does not configure GTM, GA4 or Ads.
 * The marketer wires a Custom-Event trigger on `event` + the conversion tags in
 * GTM (see docs/bmad plan for the exact spec). Safe no-op if GTM is absent.
 */
export function ConversionBeacon({
  event = 'generate_lead',
  source,
}: {
  event?: string;
  source: string;
}) {
  useEffect(() => {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, form_location: source });
  }, [event, source]);

  return null;
}
