import Link from 'next/link';

// Content strings may carry inline links written as [anchor text](/path/). Render them as real
// links; text without that syntax renders unchanged.
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function InlineLinks({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    out.push(<Link key={i} href={m[2]} className="font-semibold text-brand hover:underline">{m[1]}</Link>);
    last = i + m[0].length;
  }
  if (!out.length) return <>{text}</>;
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Plain-text version (anchor text only), e.g. for JSON-LD. */
export const stripInlineLinks = (text: string) => text.replace(LINK_RE, '$1');
