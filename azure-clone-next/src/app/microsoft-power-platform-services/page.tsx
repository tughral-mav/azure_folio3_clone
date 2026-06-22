import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCaptured, getFaq, getCardIcon, localAsset, localImg } from '@/lib/content';
import type { CapturedItem } from '@/lib/content';
import { CardIcon } from '@/components/ui/CardIcon';
import { FeatureGroups, type FeatureGroup } from '@/components/sections/FeatureGroups';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Accordion } from '@/components/sections/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const SLUG = 'microsoft-power-platform-services';
const FORM = '#pgForm';

export const metadata: Metadata = {
  title: 'Microsoft Power Platform Services — Enterprise Innovation & Efficiency | Folio3',
  description:
    'Drive enterprise innovation with Microsoft Power Platform consulting — Power Apps, Power Automate, Power BI, Power Pages and Copilot Studio for agile, low-code business transformation.',
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

function groupByImage(items: CapturedItem[], skipFirstHeading: boolean): FeatureGroup[] {
  const groups: FeatureGroup[] = [];
  const images: string[] = [];
  let g: FeatureGroup | null = null;
  let skipped = !skipFirstHeading;
  let lastRow: { title: string; body: string } | null = null;
  const fresh = (): FeatureGroup => ({ subheading: '', intro: '', rows: [], img: '', cta: undefined });
  for (const it of items) {
    if (it.t === 'h') {
      if (!skipped) { skipped = true; continue; }
      if (!g || g.cta) { g = fresh(); groups.push(g); g.subheading = it.text; lastRow = null; continue; }
      if (!g.subheading) { g.subheading = it.text; lastRow = null; continue; }
      lastRow = { title: it.text, body: '' }; g.rows.push(lastRow); continue;
    }
    if (it.t === 'p' || it.t === 'li') {
      const t = it.text.trim(); if (!t || !g) continue;
      if (lastRow && !lastRow.body) lastRow.body = t;
      else if (!g.intro && g.rows.length === 0) g.intro = t;
      continue;
    }
    if (it.t === 'img') { const s = localImg(it.src); if (s) images.push(s); continue; }
    if (it.t === 'cta' && it.href && g) { g.cta = { text: it.text, href: localAsset(it.href) || it.href }; continue; }
  }
  groups.forEach((grp, i) => { grp.img = images[i] || images[images.length - 1] || ''; });
  return groups.filter((grp) => grp.subheading);
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

export default function MicrosoftPowerPlatformServicesPage() {
  const page = getCaptured(SLUG)!;
  const parsed = page.sections.map((s) => ({ raw: s.items ?? [], ...parse(s.items ?? []) }));
  const sec = (rx: RegExp) => parsed.find(({ units }) => units.some((u) => rx.test(u.title)));
  const allImgsOf = (p: { lead: Unit; units: Unit[] }) => [...p.lead.imgs, ...p.units.flatMap((u) => u.imgs)];

  // §1 HERO
  const hero = sec(/driving enterprise innovation/i)!;
  const h1u = hero.units.find((u) => u.tag === 'h1')!;
  const heroSub = hero.units.find((u) => u.tag === 'h2');
  const heroCtas = (h1u.ctas.length ? h1u.ctas : hero.units.flatMap((u) => u.ctas)).slice(0, 2);
  const heroDesktop = allImgsOf(hero).filter((i) => !/-mobile/i.test(i.src)).sort((a, b) => b.w - a.w);
  const heroImg = (heroDesktop[0] ?? allImgsOf(hero)[0])?.src;
  const heroBgUrl = localAsset((page.bgImages ?? [])[0]);

  // §3 Transforming Manual Workloads — card grid (h3, no images)
  const transform = sec(/transforming manual workloads/i)!;
  const transformCards = transform.units.filter((u) => u.tag === 'h3').map((u) => ({ title: u.title, body: u.paras[0] ?? '' }));
  const transformCta = transform.units.flatMap((u) => u.ctas)[0];

  // §4 Our Microsoft Power Platform Services — card grid
  const services = sec(/our microsoft power platform services for enterprise/i)!;
  const serviceCards = services.units.filter((u) => u.tag === 'h3').map((u) => ({ title: u.title, body: u.paras[0] ?? '' }));

  // §5 Equipped To Deliver Full Capabilities — card grid
  const caps = sec(/equipped to deliver full capabilities/i)!;
  const capCards = caps.units.filter((u) => u.tag === 'h3').map((u) => ({ title: u.title, body: u.paras[0] ?? '' }));

  // §6 Integrate Advanced AI — 2-col image + text + cta
  const ai = sec(/integrate advanced ai/i)!;
  const aiU = ai.units[0];
  const aiImg = allImgsOf(ai).find((i) => i.w >= 300)?.src ?? allImgsOf(ai)[0]?.src;

  // §7 The Essentials of Power Platform — big image + icon/text rows
  const ess = sec(/the essentials of power platform/i)!;
  const essImg = allImgsOf(ess).find((i) => /\.webp$/i.test(i.src))?.src ?? allImgsOf(ess)[0]?.src;
  const essItems = (() => {
    const out: { icon: string; body: string }[] = [];
    let pend = '';
    for (const it of ess.raw) {
      if (it.t === 'img') { const s = localImg(it.src); if (/\.svg$/i.test(s)) pend = s; continue; }
      if (it.t === 'p' && pend) { const t = it.text.trim(); if (t) out.push({ icon: pend, body: t }); pend = ''; }
    }
    return out;
  })();

  // §8 SAP Innovation & Agility — FeatureGroups split at image boundaries
  const sap = parsed.find(({ units }) => units.some((u) => /sap innovation\s*(&|&amp;)?\s*agility/i.test(u.title)))!;
  const sapHead = 'Our Microsoft Power Platform Services in Action';
  const sapIntro = sap.lead.paras[0];
  const sapGroups = groupByImage(sap.raw, false);

  // §9 Awards
  const aw = sec(/awards\s*(&|&amp;)?\s*recogni/i);
  const awBadges = aw ? allImgsOf(aw).map((i) => i.src).filter((s) => /\.svg$/i.test(s)) : [];

  // §10 Why Partner With Folio3 — card grid
  const why = sec(/why partner with folio3/i)!;
  const whyCards = why.units.filter((u) => u.tag === 'h3').map((u) => ({ title: u.title, body: u.paras[0] ?? '' }));
  const whyIntro = why.units[0].paras[0];
  const whyCta = why.units.flatMap((u) => u.ctas)[0];

  // §11 Connect With Our Power Platform Experts — CSP-style centered band
  const connect = sec(/connect with our power platform experts/i)!;
  const connectU = connect.units[0];
  const connectImg = allImgsOf(connect).find((i) => i.src)?.src;
  const connectCta = connect.units.flatMap((u) => u.ctas)[0];

  // §12 Real Results, Real Impact — case cards with images
  const real = sec(/real results,?\s*real impact/i);
  const realCards = real ? imgHeadCards(real.raw) : [];

  // FAQ (none explicit in this page, but wire it up for parity if captured)
  const faqS = sec(/common queries|frequently asked|your common queries/i);
  const faqAnswers = faqS ? faqS.units[0].paras.slice(1) : [];
  const faqItems = getFaq(SLUG).map((q, i) => ({ q, a: faqAnswers[i] ?? '' })).filter((x) => x.a);

  // responsive (-mobile) + decorative extras the live ships in the DOM
  const extraImgs = [...new Set(page.sections.flatMap((s) => (s.items ?? []).filter((x) => x.t === 'img').map((x: { src?: string }) => localImg(x.src))).filter((s) => /-mobile|arrow_bottom/i.test(s)))];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        {heroBgUrl && <Image src={heroBgUrl} alt="" fill priority sizes="100vw" className="object-cover object-right" />}
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Microsoft Power Platform Services</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">{h1u.title}</h1>
            {heroSub?.title && <p className="mt-6 max-w-xl text-lg text-body">{heroSub.title}</p>}
            <div className="mt-8 flex flex-wrap gap-4">
              {(heroCtas.length ? heroCtas : [{ text: 'Move to Power Platform Today', href: FORM }]).map((c, i) => (
                <Link key={i} href={c.href} className={i === 0 ? 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide' : 'btn-outline uppercase tracking-wide'}>{c.text}</Link>
              ))}
            </div>
          </div>
          {heroImg && <Reveal animation="zoomIn" className="relative"><Image src={heroImg} alt={h1u.title} width={620} height={460} className="h-auto w-full" priority /></Reveal>}
        </div>
      </section>

      <Breadcrumb name="Microsoft Power Platform Services" />

      {/* §3 TRANSFORMING MANUAL WORKLOADS — card grid */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{transform.units[0].title}</h2></Reveal>
            {transform.units[0].paras[0] && <p className="mt-4 text-body">{transform.units[0].paras[0]}</p>}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {transformCards.map((c, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <div className="mb-4"><CardIcon src={getCardIcon(SLUG, c.title)} size="sm" /></div>
                  <h3 className="text-lg">{c.title}</h3>{c.body && <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>}
                </div>
              </Reveal>
            ))}
          </div>
          {transformCta && <div className="mt-10 text-center"><Link href={transformCta.href} className="btn-primary uppercase tracking-wide">{transformCta.text}</Link></div>}
        </div>
      </section>

      {/* §4 OUR POWER PLATFORM SERVICES — card grid */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{services.units[0].title}</h2></Reveal>
            {services.units[0].paras[0] && <p className="mt-4 text-body">{services.units[0].paras[0]}</p>}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((c, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <div className="mb-4"><CardIcon src={getCardIcon(SLUG, c.title)} size="sm" /></div>
                  <h3 className="text-lg">{c.title}</h3>{c.body && <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §5 EQUIPPED TO DELIVER FULL CAPABILITIES — card grid */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{caps.units[0].title}</h2></Reveal>
            {caps.units[0].paras[0] && <p className="mt-4 text-body">{caps.units[0].paras[0]}</p>}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capCards.map((c, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-7 shadow-card">
                  <div className="mb-4"><CardIcon src={getCardIcon(SLUG, c.title)} size="sm" /></div>
                  <h3 className="text-lg">{c.title}</h3>{c.body && <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §6 INTEGRATE ADVANCED AI — 2-col image + text + cta */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal animation="fadeInUp">
            <h2 className="text-3xl lg:text-4xl">{aiU.title}</h2>
            {aiU.paras.map((p, i) => <p key={i} className="mt-4 text-body">{p}</p>)}
            {aiU.ctas[0] && <Link href={aiU.ctas[0].href} className="btn-primary mt-7 uppercase tracking-wide">{aiU.ctas[0].text}</Link>}
          </Reveal>
          {aiImg && <Reveal animation="zoomIn"><Image src={aiImg} alt={aiU.title} width={575} height={460} className="mx-auto h-auto w-full rounded-2xl" /></Reveal>}
        </div>
      </section>

      {/* §7 THE ESSENTIALS OF POWER PLATFORM — image + icon/text rows */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{ess.units[0].title}</h2></Reveal>
            {ess.units[0].paras[0] && <p className="mt-4 text-body">{ess.units[0].paras[0]}</p>}
          </div>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            {essImg && <Reveal animation="zoomIn"><Image src={essImg} alt="" width={620} height={520} className="h-auto w-full rounded-2xl" /></Reveal>}
            <div className="space-y-6">
              {essItems.map((it, i) => (
                <Reveal key={i} animation="fadeInUp" delay={i * 60} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-chip"><Image src={it.icon} alt="" width={26} height={26} className="h-6 w-6 object-contain" /></span>
                  <p className="text-sm leading-relaxed text-body">{it.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §8 SAP / POWER PLATFORM IN ACTION — feature groups */}
      {sapGroups.length >= 2 && <FeatureGroups slug={SLUG} heading={sapHead} subtitle={sapIntro} groups={sapGroups} tone="bg-surface-tint" />}

      {/* §9 AWARDS */}
      {awBadges.length >= 3 && (
        <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-12">
          <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="shrink-0"><h3 className="text-xl font-bold leading-tight text-white">Awards &amp;</h3><h3 className="text-xl font-bold leading-tight text-white">Recognization</h3></div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-4">{awBadges.slice(0, 16).map((src, j) => (<div key={j} className="flex items-center justify-center rounded-lg bg-white/10 p-3 ring-1 ring-white/20"><Image src={src} alt="" width={90} height={90} className="h-16 w-auto object-contain lg:h-20" /></div>))}</div>
          </div>
        </section>
      )}

      {/* §10 WHY PARTNER WITH FOLIO3 — card grid */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{why.units[0].title}</h2></Reveal>
            {whyIntro && <p className="mt-4 text-body">{whyIntro}</p>}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyCards.map((c, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  <div className="mb-4"><CardIcon src={getCardIcon(SLUG, c.title)} size="sm" /></div>
                  <h3 className="text-lg">{c.title}</h3>{c.body && <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>}
                </div>
              </Reveal>
            ))}
          </div>
          {whyCta && <div className="mt-10 text-center"><Link href={whyCta.href} className="btn-primary uppercase tracking-wide">{whyCta.text}</Link></div>}
        </div>
      </section>

      {/* §11 CONNECT WITH OUR POWER PLATFORM EXPERTS — CSP-style centered band */}
      <section className="bg-surface-tint py-16 lg:py-20">
        <div className="container-x text-center">
          <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{connectU.title}</h2></Reveal>
          {connectImg && <Image src={connectImg} alt="" width={300} height={160} className="mx-auto mt-8 h-auto w-auto max-w-[220px]" />}
          {connectU.paras[0] && <p className="mx-auto mt-8 max-w-3xl text-body">{connectU.paras[0]}</p>}
          {connectCta && (
            <div className="mt-8 flex justify-center">
              <Link href={connectCta.href} className="btn-primary uppercase tracking-wide">{connectCta.text}</Link>
            </div>
          )}
        </div>
      </section>

      {/* §12 REAL RESULTS, REAL IMPACT — case cards */}
      {realCards.length >= 2 && (
        <section className="py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{real!.units[0].title}</h2></Reveal>
            {real!.units[0].paras[0] && <p className="mt-3 text-center text-body">{real!.units[0].paras[0]}</p>}
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {realCards.slice(0, 8).map((c, i) => (
                <Reveal key={i} animation="fadeInUp" delay={i * 70}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl card-hover border border-surface-line bg-white shadow-card">
                    {c.img && <Image src={c.img} alt={c.title} width={420} height={236} className="h-40 w-full object-cover" />}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-base leading-snug">{c.title}</h3>
                      {c.body && <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{c.body}</p>}
                      {c.href && <Link href={c.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">Read More <span aria-hidden>→</span></Link>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ (if any) */}
      {faqItems.length > 0 && faqS && (
        <section className="bg-surface-tint py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{faqS.units[0].title}</h2></Reveal>
            <div className="mx-auto mt-10 max-w-3xl"><Accordion items={faqItems} /></div>
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
