import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCaptured, getFaq, localAsset, localImg, getContentLink } from '@/lib/content';
import type { CapturedItem } from '@/lib/content';
import { FeatureGroups, type FeatureGroup } from '@/components/sections/FeatureGroups';
import { CaseFlip } from '@/components/sections/CaseFlip';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Accordion } from '@/components/sections/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const SLUG = 'azure-managed-services';
const FORM = '#pgForm';

export const metadata: Metadata = {
  title: 'Azure Managed Services — Seamless, Worry-Free Cloud Management | Folio3',
  description: 'Seamless Azure management for worry-free cloud operations — holistic support, monitoring, backup, disaster recovery, advanced security and CSP expertise.',
  alternates: { canonical: `/${SLUG}/` },
};

type Unit = { tag: string; title: string; paras: string[]; imgs: { src: string; w: number }[]; ctas: { text: string; href: string }[] };
function parse(items: CapturedItem[]) {
  const lead: Unit = { tag: '', title: '', paras: [], imgs: [], ctas: [] };
  const units: Unit[] = [];
  let cur: Unit | null = null;
  for (const it of items) {
    if (it.t === 'h') { cur = { tag: it.tag, title: it.text, paras: [], imgs: [], ctas: [] }; units.push(cur); continue; }
    const b = cur ?? lead;
    if (it.t === 'p' || it.t === 'li') { if (it.text.trim()) b.paras.push(it.text.trim()); }
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

// generic image-precedes-heading card extractor (industries / blog cards / case cards)
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

export default function AzureManagedServicesPage() {
  const page = getCaptured(SLUG)!;
  const parsed = page.sections.map((s) => ({ raw: s.items ?? [], ...parse(s.items ?? []) }));
  const sec = (rx: RegExp) => parsed.find(({ units }) => units.some((u) => rx.test(u.title)));

  const hero = sec(/seamless azure management/i)!;
  const h1u = hero.units.find((u) => u.tag === 'h1')!;
  const heroCtas = (h1u.ctas.length ? h1u.ctas : hero.lead.ctas).slice(0, 2);
  const heroImg = [...hero.lead.imgs, ...hero.units.flatMap((u) => u.imgs)].find((i) => i.w >= 200)?.src;
  // Don't show the hero background when it's the SAME image set as the foreground illustration
  // (…-1.webp bg + …-2.webp illo) — otherwise the scene renders twice (a faint full-cover copy
  // behind the crisp one). The live shows only the foreground illustration.
  const heroBgRaw = localAsset((page.bgImages ?? [])[0]);
  const heroStem = (u?: string) => (u?.split('/').pop() ?? '').replace(/\.\w+$/, '').replace(/-\d+(x\d+)?$/, '').toLowerCase();
  const heroBgUrl = heroImg && heroBgRaw && heroStem(heroBgRaw) === heroStem(heroImg) ? '' : heroBgRaw;

  const ov = sec(/^overview$/i)!;
  const ovIcons = ov.raw.filter((x) => x.t === 'img');
  const ovCards = ov.units.filter((u) => u.tag === 'h3').map((u, i) => ({ title: u.title, body: u.paras[0] ?? '', icon: localAsset(ovIcons[i]?.t === 'img' ? ovIcons[i].src : '') }));

  const dive = sec(/here.?s what we have got/i)!;
  const diveHead = dive.units.find((u) => u.tag === 'h2')!;
  const diveGroups = groupByImage(dive.raw, true);

  const ride = sec(/ready to work with the ultimate/i)!;
  const rideU = ride.units[0];
  const rideImg = [...ride.lead.imgs, ...ride.units.flatMap((u) => u.imgs)].find((i) => i.src)?.src;

  const adv = sec(/application performance monitoring/i)!; // §6-unique
  const advGroups = groupByImage(adv.raw, false);

  // §7 CSP experts band
  const csp = sec(/work with top microsoft csp/i)!;
  const cspHeads = csp.units.filter((u) => u.tag === 'h2');
  const cspLogo = [...csp.lead.imgs, ...csp.units.flatMap((u) => u.imgs)].find((i) => i.src)?.src;
  const cspCtas = csp.units.flatMap((u) => u.ctas);

  const benefit = sec(/who can benefit/i)!;
  const benIndustries = imgHeadCards(benefit.raw);
  const benIntro = benefit.units[0].paras[0];

  const real = sec(/real results/i);
  const realCards = real ? imgHeadCards(real.raw) : [];

  const learn = sec(/learn more about our services/i);
  const learnCards = learn ? imgHeadCards(learn.raw) : [];

  const faqS = sec(/common queries are resolved/i);
  const faqAnswers = faqS ? faqS.units[0].paras.slice(1) : [];
  const faqItems = getFaq(SLUG).map((q, i) => ({ q, a: faqAnswers[i] ?? '' })).filter((x) => x.a);
  const faqImg = faqS ? [...faqS.lead.imgs, ...faqS.units.flatMap((u) => u.imgs)].find((i) => i.src)?.src : undefined;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        {heroBgUrl && <Image src={heroBgUrl} alt="" fill priority sizes="100vw" className="object-cover object-right" />}
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Azure Managed Services</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">{h1u.title}</h1>
            {h1u.paras[0] && <p className="mt-6 max-w-xl text-lg text-body">{h1u.paras[0]}</p>}
            <div className="mt-8 flex flex-wrap gap-4">
              {(heroCtas.length ? heroCtas : [{ text: 'Speak to Our Azure Experts', href: FORM }]).map((c, i) => (
                <Link key={i} href={c.href} className={i === 0 ? 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide' : 'btn-outline uppercase tracking-wide'}>{c.text}</Link>
              ))}
            </div>
          </div>
          {heroImg && <Reveal animation="zoomIn" className="relative"><Image src={heroImg} alt={h1u.title} width={620} height={460} className="h-auto w-full" priority /></Reveal>}
        </div>
      </section>

      <Breadcrumb name="Azure Managed Services" />

      {/* OVERVIEW */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center"><Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{ov.units[0].title}</h2></Reveal>{ov.units[0].paras[0] && <p className="mt-4 text-body">{ov.units[0].paras[0]}</p>}</div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ovCards.map((c, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  {c.icon ? <Image src={c.icon} alt="" width={56} height={56} className="mb-4 h-14 w-14 object-contain" /> : <div className="mb-4 h-12 w-12 rounded-lg bg-surface-chip" />}
                  <h3 className="text-lg">{c.title}</h3>{c.body && <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HERE'S WHAT WE HAVE GOT — feature groups */}
      <FeatureGroups slug={SLUG} heading={diveHead.title} subtitle={diveHead.paras[0]} groups={diveGroups} tone="bg-surface-tint" />

      {/* READY TO WORK — blue band */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_75%_30%,rgba(255,255,255,0.16)_0%,transparent_60%)]" />
        <div className="container-x relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white lg:text-4xl">{rideU.title}</h2>
            {rideU.paras[0] && <p className="mt-4 max-w-xl text-white/85">{rideU.paras[0]}</p>}
            {rideU.ctas[0] && <Link href={rideU.ctas[0].href} className="btn mt-7 bg-brand-navy text-white hover:bg-white hover:text-brand-navy uppercase tracking-wide">{rideU.ctas[0].text}</Link>}
          </div>
          {rideImg && <Reveal animation="zoomIn" className="hidden lg:block"><Image src={rideImg} alt="" width={300} height={220} className="h-auto w-full max-w-xs" /></Reveal>}
        </div>
      </section>

      {/* ADVANCED SUPPORT — feature groups */}
      <FeatureGroups slug={SLUG} groups={advGroups} />

      {/* CSP EXPERTS */}
      <section className="bg-surface-tint py-16 lg:py-20">
        <div className="container-x text-center">
          <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{cspHeads[0]?.title}</h2></Reveal>
          {cspHeads[1] && <p className="mx-auto mt-4 max-w-3xl text-body">{cspHeads[1].title}</p>}
          {cspLogo && <Image src={cspLogo} alt="Microsoft CSP" width={300} height={120} className="mx-auto mt-8 h-auto w-auto max-w-[260px]" />}
          {cspHeads[2] && <p className="mx-auto mt-8 max-w-3xl text-body">{cspHeads[2].title}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {cspCtas.slice(0, 2).map((c, i) => (<Link key={i} href={c.href} className={i === 0 ? 'btn-primary uppercase tracking-wide' : 'btn-outline uppercase tracking-wide'}>{c.text}</Link>))}
          </div>
        </div>
      </section>

      {/* WHO CAN BENEFIT — industries as alternating image+text blocks (the live shows them prominently) */}
      <FeatureGroups slug={SLUG}
        heading={benefit.units[0].title}
        subtitle={benIntro}
        tone="bg-[linear-gradient(180deg,#eef5fc_0%,#dbeafa_100%)]"
        groups={benIndustries.map((ind) => ({ subheading: ind.title, intro: ind.body, rows: [], img: ind.img, cta: ind.href ? { text: 'Click Here', href: ind.href } : undefined }))}
      />

      {/* REAL RESULTS */}
      {realCards.length >= 2 && (
        <section className="py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{real!.units[0].title}</h2></Reveal>
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {realCards.slice(0, 6).map((c, i) => (
                <Reveal key={i} animation="fadeInUp" delay={i * 70}>
                  <CaseFlip title={c.title} body={c.body} href={c.href} img={c.img} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LEARN MORE */}
      {learnCards.length >= 2 && (
        <section className="bg-surface-tint py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{learn!.units[0].title}</h2></Reveal>
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {learnCards.slice(0, 6).map((c, i) => {
                const href = c.href || getContentLink(c.title);
                const inner = (
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl card-hover border border-surface-line bg-white shadow-card">
                    {c.img && <Image src={c.img} alt={c.title} width={420} height={236} className="h-44 w-full object-cover" />}
                    <div className="flex flex-1 flex-col p-6"><h3 className="text-base leading-snug">{c.title}</h3>{c.body && <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{c.body}</p>}</div>
                  </div>
                );
                return <Reveal key={i} animation="fadeInUp" delay={i * 70}>{href ? <Link href={href} className="block h-full">{inner}</Link> : inner}</Reveal>;
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && faqS && (
        <section className="py-16 lg:py-24">
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
    </>
  );
}
