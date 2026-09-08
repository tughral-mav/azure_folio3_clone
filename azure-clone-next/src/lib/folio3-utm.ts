const UTM_PARAMS: Record<string, string> = {
  utm_source: 'azure.folio3.com',
  utm_medium: 'referral',
  utm_campaign: 'folio3_crosslinking',
};

/**
 * Append Folio3 cross-linking UTM params to a Folio3 network URL.
 * `content` distinguishes where the click originated (nav | footer | sidebar).
 * Non-Folio3 URLs are returned unchanged. Existing utm_* params are preserved.
 */
export function withFolio3Utm(href: string, content: 'nav' | 'footer' | 'sidebar'): string {
  try {
    const url = new URL(href);
    if (!/(^|\.)folio3\.(com|ai)$/i.test(url.hostname)) return href;
    for (const [k, v] of Object.entries(UTM_PARAMS)) {
      if (!url.searchParams.has(k)) url.searchParams.set(k, v);
    }
    if (!url.searchParams.has('utm_content')) url.searchParams.set('utm_content', content);
    return url.toString();
  } catch {
    return href;
  }
}
