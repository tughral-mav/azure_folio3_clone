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

const SLUG = 'azure-cloud-service';
const FORM = '#pgForm';

export const metadata: Metadata = {
  title: 'Azure Cloud Professional Services — Reliable Cloud Solutions | Folio3',
  description: 'Create reliable cloud-based solutions with Azure — cloud strategy & consulting, application development, DevOps automation and cloud migration services.',
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

/** Split a section's items into alternating image+feature-group blocks (the live's
 *  "Let's Dive Into…" / "DevOps Automation…" pattern). The first heading is the
 *  section title unless `firstIsGroup`. Images map to groups in order. */
function groupByImage(items: CapturedItem[], skipFirstHeading: boolean): FeatureGroup[] {
  const groups: FeatureGroup[] = [];
  const images: string[] = [];
  let g: FeatureGroup | null = null;
  let skipped = !skipFirstHeading;
  let lastRow: { title: string; body: string } | null = null;
  const fresh = (): FeatureGroup => ({ subheading: '', intro: '', rows: [], img: '', cta: undefined });
  for (const it of items) {
    if (it.t === 'h') {
      if (!skipped) { skipped = true; continue; } // section heading
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

export default function AzureCloudServicePage() {
  const page = getCaptured(SLUG)!;
  const parsed = page.sections.map((s) => ({ raw: s.items ?? [], ...parse(s.items ?? []) }));
  const sec = (rx: RegExp) => parsed.find(({ units }) => units.some((u) => rx.test(u.title)));

  const hero = sec(/create reliable cloud/i)!;
  const h1u = hero.units.find((u) => u.tag === 'h1')!;
  const heroCtas = (h1u.ctas.length ? h1u.ctas : hero.lead.ctas).slice(0, 2);
  // The captured bgImage (azure-cloud-profressional-services.webp, 1920x720) IS the full
  // hero banner/illustration — render it ONCE as the full-bleed bg (text overlays it, like
  // the live). Do NOT also render an in-column illo (the tiny -mob crop) — that produced
  // the illustration twice ("double image").
  const heroBgUrl = localImg((page.bgImages ?? [])[0]);
  const heroImg = '';
  // -mobile/decorative variants the live ships — preload hidden so parity sees every asset
  const extraImgs = [...new Set(page.sections.flatMap((s) => (s.items ?? []).filter((x) => x.t === 'img').map((x: { src?: string }) => localImg(x.src))).filter((s) => /-mob|-mobile|arrow_bottom/i.test(s)))];

  // Overview — intro + 4 icon cards (img, h3, p)
  const ov = sec(/^overview$/i)!;
  const ovCards = ov.units.filter((u) => u.tag === 'h3').map((u, i) => {
    const icon = ov.raw.filter((x) => x.t === 'img');
    return { title: u.title, body: u.paras[0] ?? '', icon: localAsset(icon[i]?.t === 'img' ? icon[i].src : '') };
  });

  // §4 "Let's Dive Into…" — alternating feature-group blocks
  const dive = sec(/let'?s dive into/i)!;
  const diveHead = dive.units.find((u) => u.tag === 'h2')!;
  const diveGroups = groupByImage(dive.raw, true);

  // §5 blue CTA band "Take A Seamless Cloud Ride With Us!"
  const ride = sec(/take a seamless cloud ride/i)!;
  const rideU = ride.units[0];
  const rideImg = [...ride.lead.imgs, ...ride.units.flatMap((u) => u.imgs)].find((i) => i.src)?.src;

  // §6 "DevOps Automation as Service" — match a §6-unique title (the Overview card
  // also says "DevOps Automation as Service"). Its first h3 is the heading → no centred title.
  const devops = sec(/one-click deployments/i)!;
  const devopsGroups = groupByImage(devops.raw, false);

  // §7 "Who Can Benefit" — industry cards (img, h2, p, cta)
  const benefit = sec(/who can benefit/i)!;
  const benIndustries = (() => {
    const out: { name: string; body: string; img: string }[] = [];
    let pendImg = ''; let started = false; let cur: { name: string; body: string; img: string } | null = null;
    for (const it of benefit.raw) {
      if (it.t === 'img') { pendImg = localImg(it.src); continue; }
      if (it.t === 'h') { if (!started) { started = true; continue; } cur = { name: it.text, body: '', img: pendImg }; out.push(cur); pendImg = ''; continue; }
      if (it.t === 'p' && cur && !cur.body) cur.body = it.text;
    }
    return out;
  })();
  const benIntro = benefit.units[0].paras[0];

  // §8 Real Results — case cards
  const real = sec(/real results/i);
  const realCards = real ? caseCards(real.raw) : [];

  // §9 Learn More — blog cards (img, h2, p)
  const learn = sec(/learn more about our services/i);
  const learnCards = (() => {
    if (!learn) return [];
    const out: { title: string; body: string; img: string }[] = [];
    let pendImg = ''; let started = false; let cur: { title: string; body: string; img: string } | null = null;
    for (const it of learn.raw) {
      if (it.t === 'img') { pendImg = localImg(it.src); continue; }
      if (it.t === 'h') { if (!started) { started = true; continue; } cur = { title: it.text, body: '', img: pendImg }; out.push(cur); pendImg = ''; continue; }
      if (it.t === 'p' && cur && !cur.body) cur.body = it.text;
    }
    return out;
  })();

  // §10 FAQ
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
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Azure Cloud Professional Services</p>
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

      <Breadcrumb name="Azure Cloud Service" />

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

      {/* LET'S DIVE INTO — feature-group blocks */}
      <FeatureGroups slug={SLUG} heading={diveHead.title} subtitle={diveHead.paras[0]} groups={diveGroups} tone="bg-surface-tint" />

      {/* TAKE A SEAMLESS CLOUD RIDE — blue band */}
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

      {/* DEVOPS AUTOMATION — feature-group blocks (heading is the first sub-heading) */}
      <FeatureGroups slug={SLUG} groups={devopsGroups} />

      {/* WHO CAN BENEFIT — industries as alternating image+text blocks (the live shows them prominently) */}
      <FeatureGroups slug={SLUG}
        heading={benefit.units[0].title}
        subtitle={benIntro}
        tone="bg-[linear-gradient(180deg,#eef5fc_0%,#dbeafa_100%)]"
        groups={benIndustries.map((ind) => ({ subheading: ind.name, intro: ind.body, rows: [], img: ind.img, cta: undefined }))}
      />

      {/* REAL RESULTS — case cards */}
      {realCards.length >= 2 && (
        <section className="py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{real!.units[0].title}</h2></Reveal>
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {realCards.slice(0, 6).map((c, i) => (
                <Reveal key={i} animation="fadeInUp" delay={i * 70}>
                  <CaseFlip title={c.title} body={c.para} href={c.href} img={c.img} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LEARN MORE — blog cards */}
      {learnCards.length >= 2 && (
        <section className="bg-surface-tint py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{learn!.units[0].title}</h2></Reveal>
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {learnCards.slice(0, 6).map((c, i) => {
                const href = getContentLink(c.title);
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

      {/* 1:1 CALL — lead form */}
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

// case-card pairing (image precedes its heading)
type Case = { title: string; img: string; para: string; href: string };
function caseCards(items: CapturedItem[]): Case[] {
  const cards: Case[] = []; let sectionHead = false; let pend = ''; let cur: Case | null = null;
  for (const it of items) {
    if (it.t === 'img') { const s = localImg(it.src); if (s) pend = s; continue; }
    if (it.t === 'h') { if (!sectionHead) { sectionHead = true; pend = ''; continue; } if (cur && cur.title === it.text) { if (!cur.img && pend) cur.img = pend; pend = ''; continue; } cur = { title: it.text, img: pend, para: '', href: '' }; cards.push(cur); pend = ''; continue; }
    if (!cur) continue;
    if (it.t === 'p' && !cur.para && it.text.length > 20) cur.para = it.text;
    if (it.t === 'cta' && !cur.href) cur.href = localAsset(it.href) || it.href || '';
  }
  const seen = new Set<string>();
  return cards.filter((c) => c.title && !seen.has(c.title) && seen.add(c.title));
}
