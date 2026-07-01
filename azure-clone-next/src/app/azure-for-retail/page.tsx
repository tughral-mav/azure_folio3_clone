import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCaptured, getFaq, getCardIcon, localAsset, localImg, getRetailTabIcons } from '@/lib/content';
import type { CapturedItem } from '@/lib/content';
import { CardIcon } from '@/components/ui/CardIcon';
import { RetailSolutionTabs, type SolTab } from '@/components/sections/RetailSolutionTabs';
import { FlipCard } from '@/components/sections/FlipCard';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { AwardsBand } from '@/components/sections/AwardsBand';
import { Accordion } from '@/components/sections/Accordion';
import { Reveal } from '@/components/ui/Reveal';

const SLUG = 'azure-for-retail';
const FORM = '#pgForm';

export const metadata: Metadata = {
  title: 'Azure for Retail — Microsoft Azure Retail Solutions | Folio3',
  description: 'Re-imagine the customer journey with Microsoft Azure for retail — personalized interactions, supply-chain efficiency and multi-channel retail operations.',
  alternates: { canonical: `/${SLUG}/` },
};

// ---- parse the ordered captured items into heading-keyed units ----
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

// challenge titles aren't captured (CSS icons on the live) — supplied from the live, paired in order with the captured descriptions
const CHALLENGE_TITLES = ['Fragmented Data', 'Omnichannel Complexity', 'Inventory Management', 'Evolving Technology', 'Customer Expectations'];

// "Why leverage" flip-box BACK descriptions (the capture only got the front titles; these
// are the back-layer text revealed on hover, taken verbatim from the live).
const WHY_BACK = [
  'Identify, Adapt, and fulfill changing customer needs to foster enhanced interaction across platforms.',
  'Gain valuable real-time insights from customer behavior, inventory levels, and market trends allowing for more informed decisions and agile strategies.',
  'Offer personalized shopping journeys, leading to increased customer satisfaction and loyalty through tailored recommendations, convenient omnichannel experiences, and seamless interactions.',
  'Create more agile, responsive supply chains to meet customer demand at scale.',
];

export default function AzureForRetailPage() {
  const page = getCaptured(SLUG)!;
  const sec = (rx: RegExp) => page.sections.map((s) => parse(s.items ?? [])).find(({ units }) => units.some((u) => rx.test(u.title)));

  const hero = sec(/re-?imagining the customer/i)!;
  const h1u = hero.units.find((u) => u.tag === 'h1')!;
  const heroCtas = h1u.ctas.slice(0, 2);
  const heroImg = [...hero.lead.imgs, ...hero.units.flatMap((u) => u.imgs)].find((i) => i.w >= 200)?.src;
  const heroBgUrl = localAsset((page.bgImages ?? [])[0]);

  const why = sec(/why leverage azure/i)!;
  const whyCards = why.units.filter((u) => u.tag === 'h3').map((u) => u.title);
  const whyCta = why.units.flatMap((u) => u.ctas)[0];

  const chal = sec(/major challenges faced/i)!;
  const chalU = chal.units[0];
  const chalDesc = chalU.paras.slice(1); // [0] is the subtitle
  const chalImg = [...chal.lead.imgs, ...chal.units.flatMap((u) => u.imgs)].find((i) => i.w >= 300)?.src;

  // 8-tab "Powerful Solutions": split units into tabs at each image boundary
  const solS = page.sections.map((s) => parse(s.items ?? [])).find(({ units }) => units.some((u) => /powerful solutions to meet/i.test(u.title)))!;
  const solHead = solS.units.find((u) => u.tag === 'h2')!.title;
  const tabUnits = solS.units.filter((u) => u.tag === 'h3');
  const retailIcon = getRetailTabIcons(); // per-feature inline SVG icons extracted from the live
  const tabs: SolTab[] = [];
  let bucket: Unit[] = [];
  for (const u of tabUnits) {
    bucket.push(u);
    if (u.imgs.length) {
      const label = bucket[0];
      const img = u.imgs[0].src;
      const cta = bucket.flatMap((b) => b.ctas)[0] ?? { text: 'Find Out More', href: FORM };
      tabs.push({ label: label.title, body: label.paras[0] ?? '', img, cta: { label: cta.text, href: cta.href }, features: bucket.slice(1).map((f) => ({ title: f.title, body: f.paras[0] ?? '', icon: retailIcon(f.title) })) });
      bucket = [];
    }
  }

  const cta1 = sec(/redefine customer journeys/i)!;
  const ctaBand = cta1.units[0];

  const appr = sec(/folio3 approach to azure/i)!;
  const apprU = appr.units.find((u) => u.tag === 'h2')!;
  const apprCards = appr.units.filter((u) => u.tag === 'h3').map((u) => ({ title: u.title, body: u.paras[0] ?? '' }));

  const wc = sec(/why choose folio3/i)!;
  const wcU = wc.units[0];
  const wcList = wcU.paras.slice(1);
  const wcImg = [...wc.lead.imgs, ...wc.units.flatMap((u) => u.imgs)].find((i) => i.src)?.src;

  const faqS = sec(/streamline your healthcare/i)!;
  const faqU = faqS.units[0];
  const faqAnswers = faqU.paras.slice(1);
  const faqImg = [...faqS.lead.imgs, ...faqS.units.flatMap((u) => u.imgs)].find((i) => i.src)?.src;
  const faqQ = getFaq(SLUG);
  const faqItems = faqQ.map((q, i) => ({ q, a: faqAnswers[i] ?? '' })).filter((x) => x.a);

  const awS = page.sections.map((s) => parse(s.items ?? [])).find(({ units, lead }) => [...lead.imgs, ...units.flatMap((u) => u.imgs)].some((i) => /\.svg$/i.test(i.src)) && units.some((u) => /awards|recogni/i.test(u.title)));
  const awBadges = awS ? [...awS.lead.imgs, ...awS.units.flatMap((u) => u.imgs)].map((i) => i.src).filter((s) => /\.svg$/i.test(s)) : [];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        {heroBgUrl && <Image src={heroBgUrl} alt="" fill priority sizes="100vw" className="object-cover object-right" />}
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Azure for Retail</p>
            <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">{h1u.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-body">{h1u.paras[0]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {heroCtas.map((c, i) => (
                <Link key={i} href={c.href} className={i === 0 ? 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide' : 'btn-outline uppercase tracking-wide'}>{c.text}</Link>
              ))}
            </div>
          </div>
          {heroImg && <Reveal animation="zoomIn" className="relative"><Image src={heroImg} alt={h1u.title} width={627} height={546} className="mx-auto h-auto w-full" priority /></Reveal>}
        </div>
      </section>
      <div className="bg-brand"><div className="container-x py-3 text-sm text-white/90"><Link href="/" className="hover:underline">Home</Link><span className="px-2">»</span><span>Azure for Retail</span></div></div>

      {/* WHY LEVERAGE — borderless centred icon cards with dividers */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center"><Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{why.units[0].title}</h2></Reveal><p className="mt-4 text-body">{why.units[0].paras[0]}</p></div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyCards.map((c, i) => (
              <Reveal key={c} animation="fadeInUp" delay={i * 80} className="h-full">
                <FlipCard icon={<CardIcon src={getCardIcon(SLUG, c)} />} title={c} back={WHY_BACK[i] ?? ''} />
              </Reveal>
            ))}
          </div>
          {whyCta && <div className="mt-10 text-center"><Link href={whyCta.href} className="btn-primary uppercase tracking-wide">{whyCta.text}</Link></div>}
        </div>
      </section>

      {/* MAJOR CHALLENGES — centred heading + arrow list + image */}
      <section className="section bg-surface-tint">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center"><Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{chalU.title}</h2></Reveal><p className="mt-4 text-body">{chalU.paras[0]}</p></div>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              {CHALLENGE_TITLES.map((t, i) => (
                <Reveal key={t} animation="fadeInUp" delay={i * 70} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand text-brand">→</span>
                  <div><h3 className="font-semibold text-ink">{t}</h3>{chalDesc[i] && <p className="mt-1 text-sm leading-relaxed text-body">{chalDesc[i]}</p>}</div>
                </Reveal>
              ))}
            </div>
            {chalImg && <Reveal animation="zoomIn"><Image src={chalImg} alt="Retail challenges" width={697} height={786} className="mx-auto h-auto w-full rounded-2xl" /></Reveal>}
          </div>
          {chalU.ctas[0] && <div className="mt-10 text-center"><Link href={chalU.ctas[0].href} className="btn-primary uppercase tracking-wide">{chalU.ctas[0].text}</Link></div>}
        </div>
      </section>

      {/* POWERFUL SOLUTIONS — 8-tab interface */}
      <RetailSolutionTabs heading={solHead} eyebrow="Azure Solutions for Retail" tabs={tabs} />

      {/* BLUE CTA BAND — heading + button left, illustration right */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_80%_30%,rgba(255,255,255,0.16)_0%,transparent_60%)]" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white lg:text-4xl">{ctaBand.title}</h2>
            {ctaBand.ctas[0] && <Link href={ctaBand.ctas[0].href} className="btn mt-7 bg-brand-navy text-white hover:bg-white hover:text-brand-navy uppercase tracking-wide">{ctaBand.ctas[0].text}</Link>}
          </div>
          {ctaBand.imgs[0] && <Image src={ctaBand.imgs[0].src} alt="" width={571} height={494} className="mx-auto h-auto w-full max-w-md" />}
        </div>
      </section>

      {/* FOLIO3 APPROACH — 4 cards */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center"><Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{apprU.title}</h2></Reveal><p className="mt-4 text-body">{apprU.paras[0]}</p></div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {apprCards.map((c, i) => (
              <Reveal key={c.title} animation="fadeInUp" delay={i * 80}><div className="card-hover h-full rounded-xl border border-transparent bg-surface-tint p-7"><CardIcon src={getCardIcon(SLUG, c.title)} /><h3 className="mt-4 text-xl">{c.title}</h3><p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p><Link href={FORM} className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">Learn More →</Link></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION — the live's actual certification badges */}
      {awBadges.length >= 3 ? (
        <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-12">
          <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="shrink-0"><h3 className="text-xl font-bold leading-tight text-white">Awards &amp;</h3><h3 className="text-xl font-bold leading-tight text-white">Recognization</h3></div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-4">
              {awBadges.map((src, j) => (<div key={j} className="flex items-center justify-center rounded-lg bg-white/10 p-3 ring-1 ring-white/20"><Image src={src} alt="Microsoft certification" width={90} height={90} className="h-16 w-auto object-contain lg:h-20" /></div>))}
            </div>
          </div>
        </section>
      ) : <AwardsBand />}

      {/* WHY CHOOSE FOLIO3 — list + image */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center"><Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{wcU.title}</h2></Reveal><p className="mt-4 text-body">{wcU.paras[0]}</p></div>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              {wcList.map((li, i) => (<Reveal key={i} animation="fadeInUp" delay={i * 60} className="flex gap-3 text-body"><span className="mt-1 text-brand">✓</span><span>{li}</span></Reveal>))}
            </div>
            {wcImg && <Reveal animation="zoomIn"><Image src={wcImg} alt="Why choose Folio3" width={560} height={420} className="mx-auto h-auto w-full rounded-2xl" /></Reveal>}
          </div>
        </div>
      </section>

      <CaseStudies />

      {/* FAQ — accordion + image */}
      <section className="section bg-surface-tint">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center"><Reveal animation="fadeInUp"><h2 className="text-2xl lg:text-3xl">{faqU.title}</h2></Reveal><p className="mt-4 text-body">{faqU.paras[0]}</p></div>
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,420px)]">
            <Accordion items={faqItems} />
            {faqImg && <div className="relative hidden lg:block"><Image src={faqImg} alt="" width={420} height={520} className="h-auto w-full rounded-2xl" /></div>}
          </div>
        </div>
      </section>

      <OneToOneCTA tone="light" />
    </>
  );
}
