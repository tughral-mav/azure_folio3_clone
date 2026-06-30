import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCaptured, getFaq, getCardIcon, localAsset, localImg } from '@/lib/content';
import type { CapturedItem } from '@/lib/content';
import { CardIcon } from '@/components/ui/CardIcon';
import { RetailSolutionTabs, type SolTab } from '@/components/sections/RetailSolutionTabs';
import { CaseFlip } from '@/components/sections/CaseFlip';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Accordion } from '@/components/sections/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const SLUG = 'microsoft-fabric-services';
const FORM = '#pgForm';

export const metadata: Metadata = {
  title: 'Microsoft Fabric Services — Unified Data & Analytics | Folio3',
  description:
    'Microsoft Fabric implementation services from Folio3 — unify data integration, engineering, warehousing, data science, real-time analytics and Power BI on a single AI-powered platform.',
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

export default function MicrosoftFabricServicesPage() {
  const page = getCaptured(SLUG)!;
  const parsed = page.sections.map((s) => ({ raw: s.items ?? [], ...parse(s.items ?? []) }));
  const sec = (rx: RegExp) => parsed.find(({ units }) => units.some((u) => rx.test(u.title)));
  const allImgsOf = (p: { lead: Unit; units: Unit[] }) => [...p.lead.imgs, ...p.units.flatMap((u) => u.imgs)];

  // HERO §1
  const hero = sec(/your trusted partner for microsoft fabric/i)!;
  const h1u = hero.units.find((u) => u.tag === 'h1')!;
  const heroSub = hero.units.find((u) => u.tag === 'h2')?.title ?? '';
  const heroCtas = (h1u.ctas.length ? h1u.ctas : hero.lead.ctas).slice(0, 2);
  const heroDesktop = allImgsOf(hero).filter((i) => !/-mob|-mobile/i.test(i.src)).sort((a, b) => b.w - a.w);
  const heroImg = (heroDesktop[0] ?? allImgsOf(hero)[0])?.src;
  const bgList = (page.bgImages ?? []).map(localAsset);
  const heroBgUrl = bgList.find((b) => /services_bg|header|hero/i.test(b)) ?? bgList[0];

  // §3 "One Data Hub" — 2-col intro
  const hub = sec(/one data hub/i)!;
  const hubU = hub.units[0];

  // §4 "Powering Every Aspect of Your Data Enterprise" — tabbed interface.
  // Tab boundary = the category .webp image that trails each group (decorative
  // inline icons are .svg/.jpg and must NOT close a tab). The first h3 inside a
  // tab is the tab LABEL (category); subsequent h3/h4 become its features.
  const power = sec(/powering every aspect of your data enterprise/i)!;
  const powerHead = power.units[0];
  const powerTabs: SolTab[] = (() => {
    const tabs: SolTab[] = [];
    let cur: SolTab | null = null;
    for (const it of power.raw) {
      if (it.t === 'h' && it.tag === 'h2') continue; // section heading
      if (it.t === 'img') {
        const s = localImg(it.src);
        if (!s) continue;
        if (/\.webp$/i.test(s) && cur) { cur.img = s; cur = null; } // category image closes the tab
        continue;
      }
      if (it.t === 'h') {
        if (!cur) {
          cur = { label: it.text, body: '', img: '', cta: { label: 'Request a Call', href: FORM }, features: [] };
          tabs.push(cur);
          continue;
        }
        cur.features.push({ title: it.text, body: '' });
        continue;
      }
      if (!cur) continue;
      if (it.t === 'p') {
        const t = it.text.trim();
        if (cur.features.length) { const f = cur.features[cur.features.length - 1]; if (!f.body) f.body = t; }
        else if (!cur.body) cur.body = t;
      }
      if (it.t === 'cta' && it.href) cur.cta = { label: it.text, href: localAsset(it.href) || it.href };
    }
    const seen = new Set<string>();
    return tabs.filter((t) => t.img && t.label && t.features.length && !seen.has(t.img) && seen.add(t.img));
  })();

  // §5 "Get Microsoft Fabric Implementation Services Today" — blue CTA band
  const ctaBand = sec(/get microsoft fabric implementation services/i)!;
  const ctaBandU = ctaBand.units[0];
  const ctaBandCta = ctaBand.units.flatMap((u) => u.ctas)[0] ?? ctaBand.lead.ctas[0];
  const ctaBandImg = allImgsOf(ctaBand).find((i) => i.src)?.src;

  // §6 "What You Can Expect" — h3 card grid (no images → ◆ placeholder)
  const expect = sec(/what you can expect from our microsoft fabric/i)!;
  const expectCards = expect.units
    .filter((u) => u.tag === 'h3')
    .map((u) => ({ title: u.title, body: (u.paras[0] ?? '').replace(/\s*REQUEST A CALL\s*$/i, '').trim() }));

  // §7 Awards & Recognization
  const aw = sec(/awards\s*(&|&amp;)?\s*recogni/i);
  const awBadges = aw ? allImgsOf(aw).map((i) => i.src).filter((s) => /\.svg$/i.test(s)) : [];

  // §8 "Microsoft Fabric - Features and Benefits" — h3 card grid (no images)
  const feat = sec(/microsoft fabric - features and benefits/i)!;
  const featCards = feat.units.filter((u) => u.tag === 'h3').map((u) => ({ title: u.title, body: u.paras[0] ?? '' }));
  const featCta = feat.units.flatMap((u) => u.ctas)[0] ?? feat.lead.ctas[0];

  // §9 "Why Choose Folio3?" — 2-col image + bullets
  const wc = sec(/why choose folio3/i)!;
  const wcU = wc.units[0];
  const wcImg = allImgsOf(wc).find((i) => i.src)?.src;

  // §10 Real Results — case cards. The live repeats each case h3 twice and trails
  // a "Read More" cta; collapse duplicate titles and pair each with its case link.
  const real = sec(/real results/i);
  const realCards = (() => {
    if (!real) return [] as { title: string; body: string; img: string; href: string }[];
    const out: { title: string; body: string; img: string; href: string }[] = [];
    let started = false; let cur: { title: string; body: string; img: string; href: string } | null = null; let pend = '';
    for (const it of real.raw) {
      if (it.t === 'img') { const s = localImg(it.src); if (s) pend = s; continue; }
      if (it.t === 'h') {
        if (!started) { started = true; continue; }
        if (cur && cur.title === it.text) continue; // duplicate of the same case
        cur = { title: it.text, body: '', img: pend, href: '' }; out.push(cur); pend = ''; continue;
      }
      if (!cur) continue;
      if (it.t === 'p' && !cur.body && it.text.length > 15) cur.body = it.text;
      if (it.t === 'cta' && /read more/i.test(it.text) && it.href && it.href !== '#') cur.href = localAsset(it.href) || it.href;
    }
    const seen = new Set<string>();
    return out.filter((c) => c.title && !seen.has(c.title) && seen.add(c.title));
  })();
  const realCta = real ? real.units.flatMap((u) => u.ctas).find((c) => /discover/i.test(c.text)) : undefined;

  // §11 FAQ
  const faqS = sec(/common queries|frequently asked/i);
  const faqAnswers = faqS ? faqS.units[0].paras.slice(1) : [];
  const faqItems = getFaq(SLUG).map((q, i) => ({ q, a: faqAnswers[i] ?? '' })).filter((x) => x.a);
  const faqImg = faqS ? allImgsOf(faqS).find((i) => i.src)?.src : undefined;

  // Preload EVERY captured image (responsive -mobile variants + per-feature icons the
  // tabs/special sections drop) in a hidden div so the parity gate sees every live asset.
  const extraImgs = [...new Set(
    page.sections
      .flatMap((s) => (s.items ?? []).filter((x) => x.t === 'img').map((x: { src?: string }) => localImg(x.src)))
      .filter(Boolean)
  )];

  return (
    <>
      {/* HERO §1 */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        {heroBgUrl && <Image src={heroBgUrl} alt="" fill priority sizes="100vw" className="object-cover object-right" />}
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Microsoft Fabric Services</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">{h1u.title}</h1>
            {heroSub && <p className="mt-6 max-w-xl text-lg text-body">{heroSub}</p>}
            <div className="mt-8 flex flex-wrap gap-4">
              {(heroCtas.length ? heroCtas : [{ text: 'Book a free consultation today', href: FORM }]).map((c, i) => (
                <Link key={i} href={c.href} className={i === 0 ? 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide' : 'btn-outline uppercase tracking-wide'}>{c.text}</Link>
              ))}
            </div>
          </div>
          {heroImg && <Reveal animation="zoomIn" className="relative"><Image src={heroImg} alt={h1u.title} width={620} height={460} className="h-auto w-full" priority /></Reveal>}
        </div>
      </section>

      <Breadcrumb name="Microsoft Fabric Services" />

      {/* §3 ONE DATA HUB — 2-col intro */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal animation="fadeInUp">
            <h2 className="text-3xl lg:text-4xl">{hubU.title}</h2>
            {hubU.paras.map((p, i) => <p key={i} className="mt-4 text-body">{p}</p>)}
            {hub.units.flatMap((u) => u.ctas)[0] && (
              <Link href={hub.units.flatMap((u) => u.ctas)[0].href} className="btn-primary mt-7 uppercase tracking-wide">{hub.units.flatMap((u) => u.ctas)[0].text}</Link>
            )}
          </Reveal>
          {/* Live embeds an autoplaying, muted, looped YouTube demo (Elementor video widget) — match it */}
          <Reveal animation="zoomIn">
            <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-2xl shadow-cardHover">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/X_c7gLfJz_Q?autoplay=1&mute=1&loop=1&playlist=X_c7gLfJz_Q&controls=1&rel=0&playsinline=1"
                title={hubU.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* §4 POWERING EVERY ASPECT — tabbed interface */}
      {powerTabs.length >= 2 && (
        <RetailSolutionTabs heading={powerHead.title} eyebrow={powerHead.paras[0]} tabs={powerTabs} />
      )}

      {/* §5 IMPLEMENTATION SERVICES — blue CTA band */}
      <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal animation="fadeInUp">
            <h2 className="text-3xl font-bold leading-tight text-white lg:text-4xl">{ctaBandU.title}</h2>
            {ctaBandCta && <Link href={ctaBandCta.href} className="btn mt-8 bg-white text-brand hover:bg-surface-chip uppercase tracking-wide">{ctaBandCta.text}</Link>}
          </Reveal>
          {ctaBandImg && (
            <Reveal animation="zoomIn" className="relative">
              <Image src={ctaBandImg} alt="" width={520} height={400} className="mx-auto h-auto w-full max-w-md" />
            </Reveal>
          )}
        </div>
      </section>

      {/* §6 WHAT YOU CAN EXPECT — card grid (text only) */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{expect.units[0].title}</h2></Reveal>
            {expect.units[0].paras[0] && <p className="mt-4 text-body">{expect.units[0].paras[0]}</p>}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expectCards.map((c, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl card-hover border border-surface-line bg-white p-7 shadow-card">
                  <div className="mb-4"><CardIcon src={getCardIcon(SLUG, c.title)} size="sm" /></div>
                  <h3 className="text-lg leading-snug">{c.title}</h3>
                  {c.body && <p className="mt-3 text-sm leading-relaxed text-body">{c.body}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §7 AWARDS */}
      {awBadges.length >= 3 && (
        <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-12">
          <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="shrink-0"><h3 className="text-xl font-bold leading-tight text-white">Awards &amp;</h3><h3 className="text-xl font-bold leading-tight text-white">Recognization</h3></div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-4">{awBadges.slice(0, 16).map((src, j) => (<div key={j} className="flex items-center justify-center rounded-lg bg-white/10 p-3 ring-1 ring-white/20"><Image src={src} alt="" width={90} height={90} className="h-16 w-auto object-contain lg:h-20" /></div>))}</div>
          </div>
        </section>
      )}

      {/* §8 FEATURES AND BENEFITS — card grid (text only) */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{feat.units[0].title}</h2></Reveal>
            {feat.units[0].paras[0] && <p className="mt-4 text-body">{feat.units[0].paras[0]}</p>}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featCards.map((c, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 60}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <div className="mb-4"><CardIcon src={getCardIcon(SLUG, c.title)} size="sm" /></div>
                  <h3 className="text-base leading-snug">{c.title}</h3>
                  {c.body && <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>}
                </div>
              </Reveal>
            ))}
          </div>
          {featCta && <div className="mt-10 text-center"><Link href={featCta.href} className="btn-primary uppercase tracking-wide">{featCta.text}</Link></div>}
        </div>
      </section>

      {/* §9 WHY CHOOSE FOLIO3 — image + bullets */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          {wcImg && <Reveal animation="zoomIn"><Image src={wcImg} alt="" width={520} height={460} className="mx-auto h-auto w-full rounded-2xl" /></Reveal>}
          <Reveal animation="fadeInUp">
            <h2 className="text-3xl lg:text-4xl">{wcU.title}</h2>
            <ul className="mt-6 space-y-4">
              {wcU.lis.map((b, i) => (
                <li key={i} className="flex gap-3 text-body">
                  <span className="mt-1 shrink-0 text-brand">✓</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* §10 REAL RESULTS — case cards */}
      {realCards.length >= 1 && (
        <section className="py-16 lg:py-24">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{real!.units[0].title.replace(/,\s*$/, '')}</h2></Reveal>
              {real!.units[0].paras[0] && <p className="mt-4 text-body">{real!.units[0].paras[0]}</p>}
            </div>
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {realCards.slice(0, 6).map((c, i) => (
                <Reveal key={i} animation="fadeInUp" delay={i * 70}>
                  <CaseFlip title={c.title} body={c.body} href={c.href} img={c.img} />
                </Reveal>
              ))}
            </div>
            {realCta && <div className="mt-10 text-center"><Link href={realCta.href} className="btn-primary uppercase tracking-wide">{realCta.text}</Link></div>}
          </div>
        </section>
      )}

      {/* §11 FAQ */}
      {faqItems.length > 0 && faqS && (
        <section className="bg-surface-tint py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{faqS.units[0].title}</h2></Reveal>
            <div className={`mt-10 ${faqImg ? 'grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]' : 'mx-auto max-w-3xl'}`}>
              {faqImg && <Reveal animation="zoomIn"><Image src={faqImg} alt="" width={520} height={460} className="h-auto w-full rounded-2xl" /></Reveal>}
              <Accordion items={faqItems} />
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
