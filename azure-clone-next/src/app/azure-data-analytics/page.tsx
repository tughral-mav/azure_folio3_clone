import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCaptured, getFaq, localAsset, localImg } from '@/lib/content';
import type { CapturedItem } from '@/lib/content';
import { RetailSolutionTabs, type SolTab } from '@/components/sections/RetailSolutionTabs';
import { TechTabs } from '@/components/sections/TechTabs';
import { IndustriesShowcase } from '@/components/sections/IndustriesShowcase';
import { CaseFlip } from '@/components/sections/CaseFlip';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Accordion } from '@/components/sections/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const SLUG = 'azure-data-analytics';
const FORM = '#pgForm';

export const metadata: Metadata = {
  title: 'Azure Data Analytics Services — End-to-End Data & BI | Folio3',
  description: 'End-to-end data analytics services on Azure — automated ETL/ELT pipelines, data warehousing, visualization, predictive analytics and BI solutions for every domain.',
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

export default function AzureDataAnalyticsPage() {
  const page = getCaptured(SLUG)!;
  const parsed = page.sections.map((s) => ({ raw: s.items ?? [], ...parse(s.items ?? []) }));
  const sec = (rx: RegExp) => parsed.find(({ units }) => units.some((u) => rx.test(u.title)));
  const allImgsOf = (p: { lead: Unit; units: Unit[] }) => [...p.lead.imgs, ...p.units.flatMap((u) => u.imgs)];

  const hero = sec(/end-to-end data analytics services/i)!;
  const h1u = hero.units.find((u) => u.tag === 'h1')!;
  const heroCtas = (h1u.ctas.length ? h1u.ctas : hero.lead.ctas).slice(0, 2);
  const heroDesktop = allImgsOf(hero).filter((i) => !/-mobile/i.test(i.src)).sort((a, b) => b.w - a.w);
  const heroImg = (heroDesktop[0] ?? allImgsOf(hero)[0])?.src;
  const bgList = (page.bgImages ?? []).map(localImg);
  const heroBgUrl = bgList.find((b) => /services_bg|header|hero/i.test(b)) ?? bgList[0];

  // §3 "Your Path to Achieve Business Growth & Innovation" — 2-col intro
  const path = sec(/your path to achieve business growth/i)!;
  const pathU = path.units[0];
  const pathImg = allImgsOf(path).find((i) => i.src)?.src;

  // §4 ETL pipelines diagram (+ its captured section background)
  const etl = sec(/building automated etl/i)!;
  const etlImg = allImgsOf(etl).find((i) => i.w >= 400)?.src;
  const etlBg = bgList.find((b) => /etl-elt-pipelines/i.test(b));

  // §5 Our Services — icon cards (each card's arrow links to its service page on the live)
  const SVC_LINKS: Record<string, string> = {
    'Data Integration as a Service': '/data-integration-as-a-service/',
    'Data Warehousing as a Service': '/data-warehousing-as-a-service/',
    'Data Visualization as a Service': '/azure-data-analytics/data-visualization-as-a-service/',
  };
  const svc = sec(/our services - from automation/i)!;
  const svcIcons = svc.raw.filter((x) => x.t === 'img');
  const svcCards = svc.units.filter((u) => u.tag === 'h3').map((u, i) => ({ title: u.title, body: u.paras[0] ?? '', icon: localImg(svcIcons[i]?.t === 'img' ? svcIcons[i].src : ''), href: SVC_LINKS[u.title] }));
  const svcCta = svc.units.flatMap((u) => u.ctas)[0];

  // §6 Key Benefits — big image + icon/text list
  const kb = sec(/key benefits of our data services/i)!;
  const kbImg = allImgsOf(kb).find((i) => i.w >= 300)?.src;
  const kbItems = (() => {
    const out: { icon: string; body: string }[] = [];
    let pend = '';
    for (const it of kb.raw) {
      if (it.t === 'img') { const s = localImg(it.src); if (/\.svg$/i.test(s)) pend = s; continue; }
      if (it.t === 'p' && pend) { out.push({ icon: pend, body: it.text }); pend = ''; }
    }
    return out;
  })();

  // §7 BI Solutions tabs (image precedes domain h3; li = bullets)
  const bi = sec(/building bi solutions for different/i)!;
  const biTabs: SolTab[] = (() => {
    const tabs: SolTab[] = []; let pend = ''; let started = false; let cur: SolTab | null = null;
    for (const it of bi.raw) {
      if (it.t === 'img') { const s = localImg(it.src); if (s) pend = s; continue; }
      if (it.t === 'h') { if (!started) { started = true; continue; } cur = { label: it.text, body: '', img: pend, cta: { label: 'Explore Here', href: FORM }, features: [] }; tabs.push(cur); pend = ''; continue; }
      if (!cur) continue;
      if (it.t === 'li') cur.features.push({ title: it.text, body: '' });
      if (it.t === 'cta' && it.href) cur.cta = { label: it.text, href: localAsset(it.href) || it.href };
    }
    const seen = new Set<string>();
    return tabs.filter((t) => t.label && t.features.length && !seen.has(t.img) && seen.add(t.img));
  })();
  const biHead = bi.units[0];

  // responsive (-mobile) + decorative extras the live ships in the DOM — preload so they're present
  const extraImgs = [...new Set(page.sections.flatMap((s) => (s.items ?? []).filter((x) => x.t === 'img').map((x: { src?: string }) => localImg(x.src))).filter((s) => /-mobile|arrow_bottom/i.test(s)))];

  // §8 Empowering insights — steps (h3 + bullets)
  const emp = sec(/get empowering insights/i)!;
  const empSteps = emp.units.filter((u) => u.tag === 'h3').map((u) => ({ title: u.title, bullets: u.lis }));

  // §9 BI for industries — alternating blocks
  const ind = sec(/business intelligence services for indus/i)!;
  const industries = imgHeadCards(ind.raw);

  // §10 Awards
  const aw = sec(/awards\s*(&|&amp;)?\s*recogni/i);
  const awBadges = aw ? allImgsOf(aw).map((i) => i.src).filter((s) => /\.svg$/i.test(s)) : [];

  // §11 Technologies — logo-strip grid
  const tech = sec(/technologies we work with/i)!;
  const techTabs = [
    { label: 'Data Integration', re: /data-integration-logos/i },
    { label: 'Data Warehouses', re: /warehous.*-logos/i },
    { label: 'Data Visualization', re: /data-visualization-logos/i },
    { label: 'Cloud Services', re: /cloud-services-logos/i },
  ].map((c) => ({ label: c.label, logos: allImgsOf(tech).map((i) => i.src).filter((s) => c.re.test(s)) })).filter((t) => t.logos.length);

  // §12/13 case + blog cards
  const real = sec(/real results/i);
  const realCards = real ? imgHeadCards(real.raw) : [];
  const learn = sec(/learn more about our services/i);
  const learnCards = learn ? imgHeadCards(learn.raw) : [];

  // §14 why-choose
  const wc = sec(/what makes us the best choice/i)!;
  const wcImg = allImgsOf(wc).find((i) => i.src)?.src;
  const wcParas = wc.units[0].paras;

  // FAQ — pull answers from any FAQ-ish section (none explicit here) → use why-choose paras fallback handled by getFaq emptiness
  const faqS = sec(/common queries|frequently asked/i);
  const faqAnswers = faqS ? faqS.units[0].paras.slice(1) : [];
  const faqItems = getFaq(SLUG).map((q, i) => ({ q, a: faqAnswers[i] ?? '' })).filter((x) => x.a);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
        {heroBgUrl && <Image src={heroBgUrl} alt="" fill priority sizes="100vw" className="object-cover object-right" />}
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Azure Data Analytics</p>
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

      <Breadcrumb name="Azure Data Analytics" />

      {/* YOUR PATH — 2-col intro */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{pathU.title}</h2>{pathU.paras.map((p, i) => <p key={i} className="mt-4 text-body">{p}</p>)}{path.units.flatMap((u) => u.ctas)[0] && <Link href={path.units.flatMap((u) => u.ctas)[0].href} className="btn-primary mt-7 uppercase tracking-wide">{path.units.flatMap((u) => u.ctas)[0].text}</Link>}</Reveal>
          {pathImg && <Reveal animation="zoomIn"><Image src={pathImg} alt="" width={575} height={460} className="mx-auto h-auto w-full rounded-2xl" /></Reveal>}
        </div>
      </section>

      {/* ETL/ELT PIPELINES diagram */}
      <section className="relative overflow-hidden bg-surface-tint py-16 lg:py-24">
        {etlBg && <Image src={etlBg} alt="" fill priority sizes="100vw" className="object-cover" />}
        <div className="container-x relative text-center">
          <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{etl.units[0].title}</h2></Reveal>
          {etl.units[0].paras[0] && <p className="mx-auto mt-4 max-w-2xl text-body">{etl.units[0].paras[0]}</p>}
          {etlImg && <Reveal animation="fadeInUp"><Image src={etlImg} alt="ETL/ELT pipeline" width={1280} height={560} className="mx-auto mt-10 h-auto w-full max-w-5xl" /></Reveal>}
        </div>
      </section>

      {/* OUR SERVICES — icon cards */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center"><Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{svc.units[0].title}</h2></Reveal></div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {svcCards.map((c, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl card-hover border border-surface-line bg-white p-6 shadow-card">
                  {c.icon ? <Image src={c.icon} alt="" width={56} height={56} className="mb-4 h-14 w-14 object-contain" /> : <div className="mb-4 h-12 w-12 rounded-lg bg-surface-chip" />}
                  <h3 className="text-lg">{c.title}</h3>{c.body && <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>}
                  <Link href={c.href ?? svcCta?.href ?? '#pgForm'} aria-label={c.title} className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-ink/30 text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          {svcCta && <div className="mt-10 text-center"><Link href={svcCta.href} className="btn-primary uppercase tracking-wide">{svcCta.text}</Link></div>}
        </div>
      </section>

      {/* KEY BENEFITS — image + icon/text list */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center"><Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{kb.units[0].title}</h2></Reveal></div>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            {kbImg && <Reveal animation="zoomIn"><Image src={kbImg} alt="" width={620} height={520} className="h-auto w-full rounded-2xl" /></Reveal>}
            <div className="space-y-6">
              {kbItems.map((it, i) => (
                <Reveal key={i} animation="fadeInUp" delay={i * 60} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-chip"><Image src={it.icon} alt="" width={26} height={26} className="h-6 w-6 object-contain" /></span>
                  <p className="text-sm leading-relaxed text-body">{it.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BI SOLUTIONS — tabs */}
      {biTabs.length >= 2 && <RetailSolutionTabs heading={biHead.title} eyebrow={biHead.paras[0]} tabs={biTabs} />}

      {/* EMPOWERING INSIGHTS — steps */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center"><Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{emp.units[0].title}</h2></Reveal>{emp.units[0].paras[0] && <p className="mt-4 text-body">{emp.units[0].paras[0]}</p>}</div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {empSteps.map((s, i) => (
              <Reveal key={i} animation="fadeInUp" delay={i * 80}>
                <div className="h-full rounded-2xl card-hover border border-surface-line bg-white p-7 shadow-card">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{i + 1}</div>
                  <h3 className="text-lg">{s.title}</h3>
                  <ul className="mt-4 space-y-2">{s.bullets.map((b, j) => (<li key={j} className="flex gap-2 text-sm leading-relaxed text-body"><span className="mt-1 text-brand">✓</span><span>{b}</span></li>))}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BI FOR INDUSTRIES — the live's slick-style carousel of portrait industry cards */}
      <IndustriesShowcase
        heading={ind.units[0].title}
        subtitle={ind.units[0].paras[0]}
        items={industries.map((x) => ({ title: x.title, body: x.body, img: x.img, href: x.href }))}
      />

      {/* AWARDS */}
      {awBadges.length >= 3 && (
        <section className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-12">
          <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="shrink-0"><h3 className="text-xl font-bold leading-tight text-white">Awards &amp;</h3><h3 className="text-xl font-bold leading-tight text-white">Recognization</h3></div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-4">{awBadges.slice(0, 16).map((src, j) => (<div key={j} className="flex items-center justify-center rounded-lg bg-white/10 p-3 ring-1 ring-white/20"><Image src={src} alt="" width={90} height={90} className="h-16 w-auto object-contain lg:h-20" /></div>))}</div>
          </div>
        </section>
      )}

      {/* TECHNOLOGIES — the live's tabbed logo interface */}
      <TechTabs heading={tech.units[0].title} subtitle={tech.units[0].paras[0]} tabs={techTabs} />

      {/* REAL RESULTS */}
      {realCards.length >= 2 && (
        <section className="bg-surface-tint py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{real!.units[0].title}</h2></Reveal>
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {realCards.slice(0, 6).map((c, i) => (
                <Reveal key={i} animation="fadeInUp" delay={i * 70}><CaseFlip title={c.title} body={c.body} href={c.href} img={c.img} /></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LEARN MORE */}
      {learnCards.length >= 2 && (
        <section className="py-16 lg:py-24">
          <div className="container-x">
            <Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{learn!.units[0].title}</h2></Reveal>
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {learnCards.slice(0, 6).map((c, i) => (
                <Reveal key={i} animation="fadeInUp" delay={i * 70}><div className="flex h-full flex-col overflow-hidden rounded-2xl card-hover border border-surface-line bg-white shadow-card">{c.img && <Image src={c.img} alt={c.title} width={420} height={236} className="h-44 w-full object-cover" />}<div className="flex flex-1 flex-col p-6"><h3 className="text-base leading-snug">{c.title}</h3>{c.body && <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{c.body}</p>}</div></div></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE */}
      <section className="bg-surface-tint py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{wc.units[0].title}</h2>{wcParas.map((p, i) => <p key={i} className="mt-4 text-body">{p}</p>)}</Reveal>
          {wcImg && <Reveal animation="zoomIn"><Image src={wcImg} alt="" width={520} height={460} className="mx-auto h-auto w-full rounded-2xl" /></Reveal>}
        </div>
      </section>

      {/* FAQ (if any) */}
      {faqItems.length > 0 && faqS && (
        <section className="py-16 lg:py-24"><div className="container-x"><Reveal animation="fadeInUp"><h2 className="text-center text-3xl lg:text-4xl">{faqS.units[0].title}</h2></Reveal><div className="mx-auto mt-10 max-w-3xl"><Accordion items={faqItems} /></div></div></section>
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
