/** Renders a card's real icon (extracted live SVG, brand-blue) inside the standard
 *  light-blue rounded box. Falls back to a ◆ glyph when no icon was captured. */
export function CardIcon({ src, size = 'md' }: { src?: string; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-11 w-11 rounded-lg' : 'h-14 w-14 rounded-xl';
  const inner = size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';
  return (
    <span className={`flex ${box} items-center justify-center bg-surface-chip text-brand`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt="" className={`${inner} object-contain`} /> : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={inner}><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
    </span>
  );
}
