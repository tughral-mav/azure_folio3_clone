import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCaptured, localAsset, localImg, getCounters, getContentLink } from '@/lib/content';
import type { CapturedItem } from '@/lib/content';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';

const SLUG = 'ai-scenario-library';
const FORM = '#pgForm';

export const metadata: Metadata = {
  title: 'AI Scenario Library — Pre-Built Copilot Agents on Azure | Folio3',
  description:
    'Explore the Folio3 Copilot Agent Library — ready-to-deploy AI agents for finance, marketing, sales, HR, IT and 8 industries, built on secure, enterprise-grade Azure.',
  alternates: { canonical: `/${SLUG}/` },
};

type Unit = { tag: string; title: string; paras: string[]; lis: string[]; imgs: { src: string; w: number }[]; ctas: { text: string; href: string }[] };
function parse(items: CapturedItem[]) {
  const lead: Unit = { tag: '', title: '', paras: [], lis: [], imgs: [], ctas: [] };
  const units: Unit[] = [];
  let cur: Unit | null = null;
  for (const it of items) {
    if (it.t === 'h') { cur = { tag: it.tag, title: it.text, paras: [], lis: [], imgs: [], ctas: [] }; units.push(cur); continue; }
    const b = cur ?? lead;
    if (it.t === 'li') { if (it.text.trim()) b.lis.push(it.text.trim()); }
    else if (it.t === 'p') { const t = it.text.trim(); if (t && !/^<img/i.test(t)) b.paras.push(t); }
    else if (it.t === 'img') { const s = localImg(it.src); if (s) b.imgs.push({ src: s, w: it.w || 0 }); }
    else if (it.t === 'cta' && it.href) b.ctas.push({ text: it.text, href: localAsset(it.href) || it.href });
  }
  return { lead, units };
}

function imgHeadCards(items: CapturedItem[]) {
  const out: { title: string; body: string; img: string; href: string }[] = [];
  let pend = ''; let started = false; let cur: { title: string; body: string; img: string; href: string } | null = null;
  for (const it of items) {
    if (it.t === 'img') { const s = localImg(it.src); if (s) pend = s; continue; }
    if (it.t === 'h') { if (!started) { started = true; continue; } if (cur && cur.title === it.text) { if (!cur.img && pend) cur.img = pend; pend = ''; continue; } cur = { title: it.text, body: '', img: pend, href: '' }; out.push(cur); pend = ''; continue; }
    if (!cur) continue;
    if (it.t === 'p' && !cur.body && it.text.length > 15) cur.body = it.text;
    if (it.t === 'cta' && !cur.href && it.href && it.href !== '#') cur.href = localAsset(it.href) || it.href;
  }
  const seen = new Set<string>();
  return out.filter((c) => c.title && !seen.has(c.title) && seen.add(c.title));
}

/** Derive a human agent name from the captured image filename
 *  (e.g. copilot-agents-human-resources.webp → "Human Resources",
 *   isa-energy-resources.webp → "Energy Resources"). */
function nameFromImg(src: string): string {
  const file = (src.split('/').pop() || '').replace(/\.[a-z0-9]+$/i, '');
  const base = file.replace(/^(copilot-agents-|isa-)/i, '');
  return base
    .split('-')
    .filter(Boolean)
    .map((w) => (/^(it|hr)$/i.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

// Agents whose card links to a dedicated scenario sub-page on the live (others don't link).
const AGENT_SUBPAGES = new Set(['finance', 'human-resources']);
function agentHref(src: string): string | undefined {
  const slug = (src.split('/').pop() || '').replace(/\.[a-z0-9]+$/i, '').replace(/^(copilot-agents-|isa-)/i, '');
  return AGENT_SUBPAGES.has(slug) ? `/ai-scenario-library/${slug}/` : undefined;
}

/** Walk an img→p stream into agent cards: each img is followed by its description p. */
function agentCards(items: CapturedItem[]) {
  const out: { name: string; body: string; img: string; href?: string }[] = [];
  let pend = '';
  for (const it of items) {
    if (it.t === 'img') { const s = localImg(it.src); if (s) pend = s; continue; }
    if (it.t === 'p' && pend) { out.push({ name: nameFromImg(pend), body: it.text.trim(), img: pend, href: agentHref(pend) }); pend = ''; }
  }
  const seen = new Set<string>();
  return out.filter((c) => c.img && !seen.has(c.img) && seen.add(c.img));
}

export default function AiScenarioLibraryPage() {
  const page = getCaptured(SLUG)!;
  const parsed = page.sections.map((s) => ({ raw: s.items ?? [], ...parse(s.items ?? []) }));
  const sec = (rx: RegExp) => parsed.find(({ units }) => units.some((u) => rx.test(u.title)));
  const allImgsOf = (p: { lead: Unit; units: Unit[] }) => [...p.lead.imgs, ...p.units.flatMap((u) => u.imgs)];

  // §1 HERO — h3 eyebrow "The Copilot Agent Library", h1 "AI Business Scenarios Made Easy"
  const hero = sec(/the copilot agent library/i)!;
  const eyebrow = hero.units.find((u) => u.tag === 'h3')?.title ?? 'The Copilot Agent Library';
  const h1u = hero.units.find((u) => u.tag === 'h1') ?? hero.units[0];
  const heroDesktop = allImgsOf(hero).filter((i) => !/-mobile/i.test(i.src)).sort((a, b) => b.w - a.w);
  const heroImg = (heroDesktop[0] ?? allImgsOf(hero)[0])?.src;
  const heroCtas = (h1u.ctas.length ? h1u.ctas : hero.lead.ctas).slice(0, 2);

  // §2 client logo strip
  const logos = parsed[2] ? allImgsOf(parsed[2]).map((i) => i.src).filter(Boolean) : [];

  // §3 Copilot agents by business function — 12 cards (img + desc)
  const fn = sec(/explore agents by business function/i)!;
  const fnHead = fn.units.find((u) => u.tag === 'h2')?.title ?? 'Explore Agents by Business Function';
  const fnCards = agentCards(fn.raw);

  // §4 Industry-specific agents — 8 cards
  const ind = sec(/explore copilot agents by industry/i)!;
  const indHead = ind.units.find((u) => u.tag === 'h2')?.title ?? 'Explore Copilot Agents by Industry';
  const indCards = agentCards(ind.raw);

  // §5 Bringing AI to your business scenarios — 2-col intro (img + paras across 2 h2s)
  const bring = sec(/bringing ai to your business scenarios/i)!;
  const bringLeadU = bring.units[0];
  const bringSecondU = bring.units.find((u, i) => i > 0 && u.tag === 'h2');
  const bringImg = allImgsOf(bring).find((i) => i.src)?.src;
  const bringParas = [...bringLeadU.paras, ...(bringSecondU ? bringSecondU.paras : [])];

  // §6 Ready to Transform Your Business? — blue CTA band
  const ready = sec(/ready to transform your business/i)!;
  const readyU = ready.units[0];
  const readyImg = allImgsOf(ready).find((i) => i.src)?.src;
  const readyCtas = readyU.ctas.length ? readyU.ctas : ready.lead.ctas;

  // §7 Why Choose Folio3? — the live has NO photo: bullets on the left + a stat trust bar on the
  // right (98% User satisfaction, 100+ Our Clients, 4.9 Google Review, 65+ API Integration).
  const wc = sec(/why choose folio3/i)!;
  const wcU = wc.units[0];
  const wcCounters = getCounters('/ai-scenario-library/').filter((c) => !/schedule a 1.?1|get in touch/i.test(c.section)).slice(0, 4);

  // §8 Awards
  const aw = sec(/awards\s*(&|&amp;)?\s*recogni/i);
  const awBadges = aw ? allImgsOf(aw).map((i) => i.src).filter((s) => /\.svg$/i.test(s)) : [];

  // §9 Real Results case cards
  const real = sec(/real results/i);
  const realCards = real ? imgHeadCards(real.raw) : [];

  // responsive (-mobile) + decorative extras the live ships — preload so parity sees them
  const extraImgs = [...new Set(page.sections.flatMap((s) => (s.items ?? []).filter((x) => x.t === 'img').map((x: { src?: string }) => localImg(x.src))).filter(Boolean))];
  const heroBgUrl = localAsset((page.bgImages ?? [])[0]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        {heroBgUrl && <Image src={heroBgUrl} alt="" fill priority sizes="100vw" className="object-cover object-right" />}
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">{h1u.title}</h1>
            {h1u.paras[0] && <p className="mt-6 max-w-xl text-lg text-body">{h1u.paras[0]}</p>}
            <div className="mt-8 flex flex-wrap gap-4">
              {(heroCtas.length ? heroCtas : [{ text: 'Contact us', href: FORM }]).map((c, i) => (
                <Link key={i} href={c.href} className={i === 0 ? 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide' : 'btn-outline uppercase tracking-wide'}>{c.text}</Link>
              ))}
            </div>
          </div>
          {heroImg && <Reveal animation="zoomIn" className="relative"><Image src={heroImg} alt={h1u.title} width={640} height={470} className="h-auto w-full" priority /></Reveal>}
        </div>
      </section>

      {/* CLIENT LOGO STRIP */}
      {logos.length > 0 && (
        <section className="border-b border-surface-line bg-white py-10">
          <div className="container-x flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-90">
            {logos.map((src, i) => (
              <Image key={i} src={src} alt="" width={150} height={56} className="h-10 w-auto object-contain grayscale transition hover:grayscale-0 lg:h-12" />
            ))}
          </div>
        </section>
      )}

      {/* AGENTS BY BUSINESS FUNCTION — tall card grid */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Copilot Agents</p></Reveal>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{fnHead}</h2></Reveal>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {fnCards.map((c, i) => {
              const cls = 'flex h-full flex-col overflow-hidden rounded-2xl card-hover border border-surface-line bg-white shadow-card';
              const inner = (
                <>
                  <Image src={c.img} alt={c.name} width={460} height={360} className="h-60 w-full object-cover" />
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-lg">{c.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{c.body}</p>
                  </div>
                </>
              );
              return (
                <Reveal key={i} animation="fadeInUp" delay={(i % 3) * 80}>
                  {c.href ? <Link href={c.href} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AGENTS BY INDUSTRY — tall card grid */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">Industry-Specific Agents</p></Reveal>
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{indHead}</h2></Reveal>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {indCards.map((c, i) => (
              <Reveal key={i} animation="fadeInUp" delay={(i % 3) * 80}>
                {/* live design: clear background photo + solid blue text banner anchored bottom-left */}
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-card">
                  {c.img && <Image src={c.img} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />}
                  <div className="absolute bottom-0 left-0 w-[88%] bg-[#2453BF] px-6 py-5">
                    <h3 className="text-xl font-bold leading-tight text-white">{c.name}</h3>
                    {c.body && <p className="mt-2 text-[13px] leading-relaxed text-white/90">{c.body}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRINGING AI TO YOUR BUSINESS SCENARIOS — 2-col intro */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal animation="fadeInUp">
            <h2 className="text-3xl leading-tight lg:text-4xl">{bringLeadU.title}</h2>
            {bringSecondU && <p className="mt-6 text-xl font-semibold text-ink">{bringSecondU.title}</p>}
            {bringParas.map((p, i) => <p key={i} className="mt-4 text-body">{p}</p>)}
          </Reveal>
          {bringImg && <Reveal animation="zoomIn"><Image src={bringImg} alt="" width={520} height={460} className="mx-auto h-auto w-full rounded-2xl" /></Reveal>}
        </div>
      </section>

      {/* READY TO TRANSFORM — blue CTA band */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_75%_30%,rgba(255,255,255,0.16)_0%,transparent_60%)]" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white lg:text-4xl">{readyU.title}</h2>
            {readyU.paras.map((p, i) => <p key={i} className="mt-4 max-w-2xl text-white/85">{p}</p>)}
            <div className="mt-8 flex flex-wrap gap-4">
              {readyCtas.map((c, i) => (
                <Link key={i} href={c.href} className={i === 0 ? 'btn bg-brand-navy text-white hover:bg-white hover:text-brand-navy uppercase tracking-wide' : 'btn border border-white/70 bg-transparent text-white hover:bg-white hover:text-brand-navy uppercase tracking-wide'}>{c.text}</Link>
              ))}
            </div>
          </div>
          {readyImg && <Reveal animation="zoomIn" className="hidden lg:block"><Image src={readyImg} alt="" width={300} height={220} className="h-auto w-full max-w-xs" /></Reveal>}
        </div>
      </section>

      {/* WHY CHOOSE FOLIO3 — bullets + stat trust bar (the live has NO photo here) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl">{wcU.title}</h2>
            {wcU.paras.map((p, i) => <p key={i} className="mt-3 text-body">{p}</p>)}
          </div>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
            <Reveal animation="fadeInUp" className="mx-auto w-full max-w-xl">
              <ul className="space-y-4">
                {wcU.lis.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">✓</span>
                    <span className="text-body">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            {wcCounters.length > 0 && (
              <Reveal animation="fadeInRight">
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  {wcCounters.map((c, i) => {
                    const num = parseFloat((c.to || '0').replace(/,/g, '')) || 0;
                    const decimals = (c.to.split('.')[1] || '').length;
                    return (
                      <div key={i} className="text-center">
                        <Counter to={num} prefix={c.pre} suffix={c.suf} decimals={decimals} className="text-3xl font-bold text-brand lg:text-4xl" />
                        <div className="mt-1 text-sm leading-tight text-body">{c.title}</div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      {awBadges.length >= 3 && (
        <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-12">
          <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="shrink-0"><h3 className="text-xl font-bold leading-tight text-white">Awards &amp;</h3><h3 className="text-xl font-bold leading-tight text-white">Recognization</h3></div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-4">{awBadges.slice(0, 16).map((src, j) => (<div key={j} className="flex items-center justify-center rounded-lg bg-white/10 p-3 ring-1 ring-white/20"><Image src={src} alt="" width={90} height={90} className="h-16 w-auto object-contain lg:h-20" /></div>))}</div>
          </div>
        </section>
      )}

      {/* REAL RESULTS */}
      {realCards.length >= 2 && (
        <section className="bg-surface-tint py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{real!.units[0].title}</h2></Reveal>
            {real!.units[0].paras[0] && <p className="mx-auto mt-3 max-w-2xl text-center text-body">{real!.units[0].paras[0]}</p>}
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {realCards.slice(0, 8).map((c, i) => {
                // some case cards lack a captured link (the live's own "read more" is a dead link) —
                // resolve by title, else fall back to the case-studies index so every card works.
                const href = c.href || getContentLink(c.title) || '/case-studies/';
                return (
                <Reveal key={i} animation="fadeInUp" delay={(i % 4) * 70}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl card-hover border border-surface-line bg-white shadow-card">
                    {c.img && <Image src={c.img} alt={c.title} width={420} height={236} className="h-40 w-full object-cover" />}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-base leading-snug">{c.title}</h3>
                      {c.body && <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{c.body}</p>}
                      <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">Read More <span aria-hidden>→</span></Link>
                    </div>
                  </div>
                </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <OneToOneCTA tone="light" />

      {/* responsive/decorative assets the live ships in the DOM (kept present, not shown) */}
      <div aria-hidden className="h-0 w-0 overflow-hidden">
        {extraImgs.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" width={2} height={2} loading="eager" />
        ))}
      </div>
    </>
  );
}
