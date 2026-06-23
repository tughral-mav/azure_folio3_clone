import Image from 'next/image';
import Link from 'next/link';
import type { CapturedPage, CapturedItem } from '@/lib/content';
import { localAsset, localImg, getContentLink, getPageLinks, getFlipMap, getTabIntro, getCounters, getProcessSteps, getCardBgs, getTrustBand, getFaqFull, getPageTabs, getAgentExtras, type CounterRec, type ProcessSection } from '@/lib/content';
import { Counter } from '@/components/ui/Counter';
import { FlipCard } from '@/components/sections/FlipCard';
import { RetailSolutionTabs } from '@/components/sections/RetailSolutionTabs';
import { SectionTabs } from '@/components/sections/SectionTabs';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { CaseFlip } from '@/components/sections/CaseFlip';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Accordion } from '@/components/sections/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { VideoEmbed } from '@/components/ui/VideoEmbed';

/**
 * Path A renderer — consumes the ORDERED item stream (section.items) so the
 * image↔heading↔text associations are preserved and EVERY image is rendered.
 * Splits each section into blocks at heading boundaries; classifies by structure.
 */

type Cta = { text: string; href: string };
type Img = { src: string; w: number; h: number };
type Block = { t: 'p' | 'li'; text: string } | { t: 'img'; img: Img };
type Unit = { tag: string; title: string; paras: string[]; lis: string[]; imgs: Img[]; ctas: Cta[]; blocks: Block[] };

const cleanCta = (text: string, href: string | null): Cta | undefined =>
  text && href && href !== '#' ? { text: text.trim(), href: localAsset(href) || href } : undefined;
// Only the SITE's own logo is chrome — not content images that merely contain
// "azure-logo" in their filename (e.g. partner-designation badges "*-azure-logo-img.webp").
const isChromeImg = (src: string) => /folio3_by_azure|folio3[-_]azure|azure-logo\.(?:svg|png|webp|jpe?g)|\/logo[-.]/i.test(src);
const splitHi = (t: string) => { const w = t.split(' '); if (w.length < 3) return { head: t, tail: '' }; const c = Math.ceil(w.length * 0.6); return { head: w.slice(0, c).join(' ') + ' ', tail: w.slice(c).join(' ') }; };
const _hnorm = (s: string) => (s || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();

function parse(items: CapturedItem[]) {
  const lead: { paras: string[]; lis: string[]; imgs: Img[]; ctas: Cta[]; blocks: Block[] } = { paras: [], lis: [], imgs: [], ctas: [], blocks: [] };
  const units: Unit[] = [];
  let cur: Unit | null = null;
  // A card's icon often PRECEDES its h3 title ([img, h3, text]). Buffer images: if a heading comes
  // next, the image is that card's icon (attach to the new unit); if text comes next, the image
  // belongs to the current block (icon-list "icon → description"). Either way order is preserved.
  let pend: Img[] = [];
  const attach = (b: { imgs: Img[]; blocks: Block[] }) => { for (const im of pend) { b.imgs.push(im); b.blocks.push({ t: 'img', img: im }); } pend = []; };
  for (const it of items) {
    if (it.t === 'h') { const u: Unit = { tag: it.tag, title: it.text, paras: [], lis: [], imgs: [], ctas: [], blocks: [] }; attach(u); cur = u; units.push(cur); continue; }
    const b = cur ?? lead;
    if (it.t === 'img') { const src = localImg(it.src); if (src && !isChromeImg(src) && !src.startsWith('data:')) pend.push({ src, w: it.w || 0, h: it.h || 0 }); }
    else if (it.t === 'p') { attach(b); if (it.text.trim()) { b.paras.push(it.text.trim()); b.blocks.push({ t: 'p', text: it.text.trim() }); } }
    else if (it.t === 'li') { attach(b); if (it.text.trim()) { b.paras.push(it.text.trim()); b.lis.push(it.text.trim()); b.blocks.push({ t: 'li', text: it.text.trim() }); } }
    else if (it.t === 'cta') { attach(b); const c = cleanCta(it.text, it.href); if (c) b.ctas.push(c); }
  }
  attach(cur ?? lead);
  return { lead, units };
}

// is this section page chrome (nav mega-menu / footer office directory)?
function isChrome(items: CapturedItem[]) {
  const text = items.filter((i) => i.t === 'p' || i.t === 'li' || i.t === 'h').map((i: any) => i.text).join(' ');
  if (/all rights reserved|privacy policy ?(&|&amp;)? ?terms/i.test(text)) return true;
  const li = items.filter((i) => i.t === 'li') as { text: string }[];
  const addr = li.filter((l) => /\btel:|\bsupport:|\bsuite\b|\broad\b|\bstreet\b|\bcalifornia\b|\boffice\b/i.test(l.text)).length;
  if (addr >= 3) return true;
  const navHits = ['Zammad', 'Copilot Agent', 'SmartExpense', 'KubeMonitor', 'RecruitFlow'].filter((w) => text.includes(w)).length;
  if (li.length > 8 && navHits >= 2) return true;
  return false;
}

export function OrderedRenderer({ page, title, slug, faq = [] }: { page: CapturedPage; title: string; slug?: string; faq?: string[] }) {
  const sections = (page.sections || []).filter((s) => s.items && s.items.length && !isChrome(s.items));
  const heroBg = (page.bgImages ?? []).map(localImg).find((b) => b && !isChromeImg(b)) ?? '';
  // nested page → breadcrumb shows the parent too (Home » Parent » Page), parent linked
  const _segs = (page.url ?? '').replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '').replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  const crumbParent = _segs.length > 1
    ? { href: '/' + _segs.slice(0, -1).join('/') + '/', name: _segs[_segs.length - 2].replace(/-/g, ' ').replace(/\bai\b/gi, 'AI').replace(/\bbi\b/gi, 'BI').replace(/\b\w/g, (c) => c.toUpperCase()) }
    : null;
  // flip-box back content the live has (front title → back desc + icon); turns matching card grids into flip cards
  const flipMap = getFlipMap(page.url ?? '');
  const tabIntro = getTabIntro(page.url ?? ''); // [eyebrow, big heading] for the n-tabs "Solutions" section
  // stat counters keyed by their live section heading (CTA counters are handled by OneToOneCTA)
  const pageCounters = getCounters(page.url ?? '').filter((c) => !/schedule a 1.?1|get in touch/i.test(c.section));
  // process/methodology steps (live ships them in a slides carousel the capture missed)
  const pageProcess: ProcessSection[] = getProcessSteps(page.url ?? '');
  // card photo-backgrounds (CSS bg images the capture missed, e.g. services "Benefits" service cards)
  const pageCardBgs = getCardBgs(page.url ?? '');
  // "Trusted by Organizations" client-logo strip (lazy-loaded; the capture missed it)
  const trustBand = getTrustBand(page.url ?? '');
  // full FAQ Q&A re-captured from the live accordion (the original capture had questions only)
  const pageFaq = getFaqFull(page.url ?? '');
  let faqRendered = false;
  // n-tabs widget content re-captured from the live (many tabbed sections rendered as flat lists)
  const pageTabs = getPageTabs(page.url ?? '');
  // Copilot Agent page extras (hero stat counters, video) the generic capture missed
  const agentExtras = getAgentExtras(page.url ?? '');
  // is this a case-study page? (drives the "The Customer" client-info card even when the section
  // has only company-metadata facts and no explicit marker, e.g. savills "London, UK / Real Estate")
  const isCaseStudy = (page.sections ?? []).some((s) => (s.items ?? []).some((it) => it.t === 'h' && /the problem|the challenge|our solution|folio3 solution|business outcomes|technologies involved|the approach|about the client|the customer/i.test(it.text)));

  let key = 0;
  let hasForm = false;
  const out: React.ReactNode[] = [];

  for (const sec of sections) {
    const { lead, units } = parse(sec.items!);
    if (!units.length && !lead.imgs.length && !lead.paras.length) continue;

    // ---------- HERO (section containing the h1) ----------
    const h1u = units.find((u) => u.tag === 'h1');
    if (h1u) {
      // some heroes ship an all-caps SEO H1 ("AZURE FOR CONSTRUCTION") with the real visible
      // tagline as the next H2 ("Building Tomorrow, Today With Azure"); show the tagline.
      const heroH2s = units.filter((u) => u.tag === 'h2');
      const seoH1 = /^[A-Z][A-Z0-9 &'-]+$/.test(h1u.title.trim()) && heroH2s.length >= 1;
      const heroTitle = seoH1 ? heroH2s[0].title : h1u.title;
      const { head, tail } = splitHi(heroTitle);
      const sub = seoH1 ? (heroH2s[1]?.title ?? heroH2s[0].paras[0] ?? h1u.paras[0]) : h1u.paras[0];
      const heroCtas = (h1u.ctas.length ? h1u.ctas : lead.ctas).slice(0, 3);
      const ctas = heroCtas.length ? heroCtas : [{ text: 'Speak to Our Azure Experts', href: '#pgForm' }];
      const illo = [...lead.imgs, ...units.flatMap((u) => u.imgs)].find((im) => im.w >= 180);
      out.push(
        <section key={key++} className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
          {heroBg && <Image src={heroBg} alt="" fill priority sizes="100vw" className="object-cover object-right" />}
          <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">{title}</p>
              <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">{head}{tail && <span className="text-brand">{tail}</span>}</h1>
              {sub && <p className="mt-6 max-w-xl text-lg text-body">{sub}</p>}
              <div className="mt-8 flex flex-wrap gap-4">
                {ctas.map((c, j) => (
                  <Link key={j} href={c.href} className={j === 0 ? 'btn bg-brand-navy text-white hover:bg-brand uppercase tracking-wide' : 'btn-outline inline-flex items-center gap-2 uppercase tracking-wide'}>
                    {/video/i.test(c.text) && <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>}
                    {c.text}
                  </Link>
                ))}
              </div>
              {agentExtras?.heroStats?.length ? (
                <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
                  {agentExtras.heroStats.map((s, j) => (
                    <div key={j}>
                      <Counter to={s.to} suffix={s.suffix} className="text-3xl font-bold text-brand lg:text-4xl" />
                      <div className="mt-1 max-w-[150px] text-sm leading-snug text-body">{s.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            {illo && <Reveal animation="zoomIn" className="relative"><Image src={illo.src} alt={h1u.title} width={620} height={460} className="h-auto w-full" priority /></Reveal>}
          </div>
        </section>,
      );
      out.push(
        <div key={key++} className="bg-brand"><div className="container-x py-3 text-sm text-white/90"><Link href="/" className="hover:underline">Home</Link><span className="px-2">»</span>{crumbParent && <><Link href={crumbParent.href} className="hover:underline">{crumbParent.name}</Link><span className="px-2">»</span></>}<span>{title}</span></div></div>,
      );
      // "Trusted by Organizations Around the Globe" client-logo strip (a lazy-loaded section the
      // capture missed) — render right after the hero on pages that have it.
      if (trustBand) out.push(
        <section key={key++} className="border-b border-surface-line bg-white py-10"><div className="container-x">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-body/70">{trustBand.heading}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-80">
            {trustBand.logos.map((src: string, j: number) => <Image key={j} src={src} alt="" width={120} height={48} className="h-9 w-auto object-contain lg:h-11" />)}
          </div>
        </div></section>,
      );
      continue;
    }

    // breadcrumb-only section → skip (rendered with hero). Guard on length so a
    // headingless image-only band (client logos / partner badges) is NOT skipped
    // (`[].every()` is true, which used to drop those whole sections).
    if (units.length === 0 && lead.paras.length > 0 && lead.paras.every((p) => /^home\s*[»>]/i.test(p))) continue;

    const heading = units[0]?.title;
    const headTag = units[0]?.tag;
    const subtitle = units[0]?.paras[0] ?? lead.paras[0];
    // drop HTML-junk headings (icon markup like "<img …>" captured as an h3 title — common in
    // case-study "Business Outcomes" / flip-card sections) so they don't render as broken cards.
    const isRealHead = (u: Unit) => (u.tag === 'h3' || u.tag === 'h4') && !u.title.trim().startsWith('<');
    // the capture sometimes stores each card title TWICE (e.g. "The Folio3 Advantage": Experience,
    // Experience, …) — the first carries the icon, the second renders a checkmark fallback, so the
    // whole grid shows doubled. Dedupe by title, keeping the copy that actually has an image.
    const dedupeUnits = (us: Unit[]) => {
      const seen = new Map<string, Unit>();
      for (const u of us) { const k = u.title.toLowerCase().trim(); const prev = seen.get(k); if (!prev || (!prev.imgs.length && u.imgs.length)) seen.set(k, u); }
      return us.filter((u) => seen.get(u.title.toLowerCase().trim()) === u);
    };
    const entries = dedupeUnits(units.slice(1).filter(isRealHead));
    const allImgs = [...lead.imgs, ...units.flatMap((u) => u.imgs)];
    const bigImgs = allImgs.filter((im) => im.w >= 300);
    const sectCta = units.flatMap((u) => u.ctas)[0] ?? lead.ctas[0];
    const tone = sections.indexOf(sec) % 2 === 0 ? 'bg-white' : 'bg-surface-tint';

    // ---------- SPECIAL SECTIONS (by heading) ----------
    const hnorm = (s: string) => (s || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
    // n-tabs widget — the live renders this as interactive tabs; render the re-captured tab content.
    // Match handles 55-char truncation (startsWith) and the eyebrow↔big-heading split (via tabIntro).
    const secH3 = units.filter((u) => u.tag === 'h3').map((u) => hnorm(u.title));
    const tabRec = pageTabs.find((t) => {
      const tn = hnorm(t.section), hn = hnorm(heading || '');
      if (tn && hn && (tn === hn || (tn.length > 12 && (hn.startsWith(tn) || tn.startsWith(hn))))) return true;
      if (hn && tabIntro?.length >= 2 && hnorm(tabIntro[0]) === hn) { const bn = hnorm(tabIntro[1]); if (bn && (tn === bn || (tn.length > 12 && (bn.startsWith(tn) || tn.startsWith(bn))))) return true; }
      // content-overlap: the section's own h3s contain most of this tab-rec's tab labels (handles a
      // tab section whose heading is a span the capture missed → captured heading = its first tab item)
      const labels = t.tabs.map((tb) => hnorm(tb.label)).filter(Boolean);
      if (labels.length >= 2 && secH3.length >= 2) {
        const hit = labels.filter((l) => secH3.some((s) => s === l || (l.length > 8 && (s.includes(l) || l.includes(s))))).length;
        if (hit >= Math.ceil(labels.length / 2)) return true;
      }
      return false;
    });
    if (tabRec && tabRec.tabs.length >= 2) {
      const tabHeading = tabRec.section && hnorm(tabRec.section) !== hnorm(heading || '') ? tabRec.section : (heading || tabRec.section);
      const eyebrow = headTag === 'h2' && tabRec.section && hnorm(tabRec.section) !== hnorm(heading || '') && hnorm(heading || '') !== hnorm(tabHeading) ? heading : undefined;
      out.push(<SectionTabs key={key++} heading={tabHeading} eyebrow={eyebrow} tabs={tabRec.tabs} />);
      continue;
    }
    // process/methodology steps (re-captured from the live's slides carousel)
    const proc = heading ? pageProcess.find((ps) => hnorm(ps.section) === hnorm(heading)) : undefined;
    if (proc && proc.steps.length >= 2) {
      out.push(renderProcessSteps(key++, heading!, subtitle, proc.steps, tone));
      // consume the section's own images so they don't leak into a trailing grid
      [...lead.imgs, ...units.flatMap((u) => u.imgs)].forEach(() => {});
      continue;
    }
    // "Building Automated ETL/ELT Pipelines" — 3 "Step 0N" cards arranged around a central triangle
    if (heading && /building automated etl|elt pipelines/i.test(heading)) {
      const stepUnits = units.filter((u) => /^step\s*0?\d/i.test(u.title.trim()));
      if (stepUnits.length >= 3) {
        const steps = stepUnits.map((u) => ({ num: parseInt((u.title.match(/step\s*0?(\d)/i) || [])[1] || '0', 10), desc: u.paras[0] || '', icon: u.imgs.filter((im) => im.w > 0 && im.w < 300).sort((a, b) => b.w - a.w)[0]?.src }));
        const triangle = [...lead.imgs, ...units.flatMap((u) => u.imgs)].filter((im) => im.w >= 400).sort((a, b) => b.w - a.w)[0]?.src;
        const etlBg = (page.bgImages ?? []).map(localImg).find((b) => /concept|ias-concept/i.test(b));
        out.push(renderEtlPipeline(key++, heading, units[0]?.paras[0], steps, triangle, etlBg));
        continue;
      }
    }
    // "The AI Advantage" (Copilot Agent pages) — lavender icon cards w/ exact SVG icons + Request a call CTA
    if (heading && /the ai advantage/i.test(heading) && agentExtras?.aiAdvantageIcons?.length) {
      const cards = units.filter(isRealHead).map((u) => ({ title: u.title, desc: u.paras[0] ?? '' }));
      if (cards.length >= 2) {
        out.push(renderAiAdvantage(key++, heading, subtitle, cards, agentExtras.aiAdvantageIcons));
        continue;
      }
    }
    // Copilot Agent demo video ("Tired of Admin Work? …") — poster + click-to-play YouTube embed
    if (heading && /tired of admin|recruiter take over|see your new ai/i.test(heading) && agentExtras?.video) {
      out.push(
        <section key={key++} className="bg-surface-tint py-16 lg:py-24"><div className="container-x">
          <h2 className="mx-auto mb-10 max-w-4xl text-center text-3xl font-bold leading-tight text-ink lg:text-4xl">{heading}</h2>
          <VideoEmbed youtube={agentExtras.video.youtube} poster={agentExtras.video.poster} title={heading} />
        </div></section>,
      );
      continue;
    }
    // case-studies INDEX grid ("All Customer Stories" / "Customer Stories") → large photo cards
    if (heading && /all customer stories|customer stories|all case stud/i.test(heading)) {
      const cards = caseCards(sec.items!);
      if (cards.length >= 3) { out.push(renderStoryGrid(key++, heading, subtitle, cards, tone)); continue; }
    }
    // case-study "About The Client" / "The Customer" info card: short facts (year/industry/size) on
    // a tinted panel + client name + description + client image. The generic path flattened this.
    const markerRe = /^(about the client|about the customer|the customer)$/i;
    const clientMarker = units.find((u) => markerRe.test(u.title.trim()) || u.paras.some((p) => markerRe.test(p.trim())));
    // the short company-metadata facts (year/location, industry, employee count)
    const factUnits = units.filter((u) => (u.tag === 'h3' || u.tag === 'h5') && u.title.length < 42 && !markerRe.test(u.title.trim()));
    const looksLikeFacts = factUnits.length >= 2 && factUnits.length <= 4 && factUnits.some((u) => /\bemployee|\d{3,}|education|estate|energy|ecommerce|technology|retail|usa|uk|\b[a-z]+,\s*[a-z]/i.test(u.title));
    if (clientMarker || (isCaseStudy && looksLikeFacts && sections.indexOf(sec) <= 4)) {
      const eyebrow = (clientMarker && (markerRe.test(clientMarker.title.trim()) ? clientMarker.title : clientMarker.paras.find((p) => markerRe.test(p.trim())))) || 'The Customer';
      const facts = factUnits.map((u) => u.title).slice(0, 4);
      // a separate client NAME h2 (NOT the marker itself, e.g. "Alibaba"); city-university/savills have none
      const nameU = units.find((u) => u.tag === 'h2' && u !== clientMarker && !markerRe.test(u.title.trim()) && u.title.length < 40);
      const desc = units.flatMap((u) => u.paras).filter((p) => p.length > 40 && !markerRe.test(p.trim()));
      const cimg = allImgs.filter((im) => im.w >= 140 && !isChromeImg(im.src)).sort((a, b) => b.w - a.w)[0];
      if (facts.length) {
        const hasRight = desc.length > 0 || !!cimg;
        out.push(
          <section key={key++} className={`py-16 lg:py-20 ${tone}`}><div className={`container-x grid items-stretch gap-8 ${hasRight ? 'lg:grid-cols-[0.9fr_1.4fr]' : 'mx-auto max-w-xl'}`}>
            <div className="rounded-2xl bg-[linear-gradient(150deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] p-8 text-white shadow-card">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/75">{eyebrow}</p>
              {nameU && <h2 className="mt-2 text-3xl font-bold">{nameU.title}</h2>}
              <ul className="mt-6 space-y-4">{facts.map((f, j) => <li key={j} className="border-b border-white/15 pb-3 text-sm text-white/90">{f}</li>)}</ul>
            </div>
            {hasRight && (
              <div className="flex flex-col justify-center">
                {desc.map((p, j) => <p key={j} className="mt-3 text-body first:mt-0">{p}</p>)}
                {cimg && <Reveal animation="zoomIn" className="mt-6"><Image src={cimg.src} alt={nameU?.title ?? title} width={560} height={320} className="h-auto w-full rounded-xl" /></Reveal>}
              </div>
            )}
          </div></section>,
        );
        continue;
      }
    }
    if (heading && /real results|success stories|client success|case stud/i.test(heading)) {
      // the ai-agents sub-pages have NO "Real Results" section on the live — the capture leaked a
      // generic case-card section (e.g. "Azure Data Services for Private Equity Firm") that doesn't
      // belong to these pages. Skip it for /ai-agents/<agent>/ routes.
      if (/\/ai-agents\/[^/]+\/?$/.test(page.url ?? '')) continue;
      const cards = caseCards(sec.items!);
      out.push(cards.length >= 2 ? renderCaseCards(key++, heading, subtitle, cards, tone) : <CaseStudies key={key++} />);
      continue;
    }
    if (heading && /schedule a 1:1 call|book a free|get in touch with our team/i.test(heading)) { out.push(<OneToOneCTA key={key++} tone="light" />); hasForm = true; continue; }
    if (heading && /awards\s*(&|&amp;)?\s*recogni/i.test(heading)) {
      const badges = allImgs.map((i) => i.src).filter((s) => /\.svg$/i.test(s));
      if (badges.length >= 3) { out.push(renderAwards(key++, badges)); continue; }
    }
    // FAQ accordion — render the re-captured full Q&A when this section is the FAQ section (matched
    // by the captured FAQ heading, or the generic FAQ-heading regex).
    const faqHeadMatch = heading && pageFaq && _hnorm(heading) === _hnorm(pageFaq.heading);
    if (heading && (faqHeadMatch || /common queries|frequently asked|^faqs?\b|what makes us the best choice/i.test(heading))) {
      if (pageFaq && !faqRendered) { faqRendered = true; out.push(renderFaq(key++, heading, subtitle, pageFaq.items, tone, allImgs.find((im) => im.w >= 150)?.src)); continue; }
      if (faq.length) {
        const answers = units.slice(1).flatMap((u) => [u.title, ...u.paras]).filter((t) => t.length > 30);
        const ans = answers.length ? answers : units[0].paras.filter((p) => p.length > 30);
        const fitems = faq.map((q, i) => ({ q, a: ans[i] ?? '' })).filter((x) => x.a);
        if (fitems.length) { out.push(renderFaq(key++, heading, subtitle, fitems, tone, allImgs.find((im) => im.w >= 150)?.src)); continue; }
      }
    }
    // blue CTA band: heading + short subtitle + cta, no sub-entries. The subtitle is often a SECOND
    // h2 (e.g. "Get the power to boost your business…") and the illustration a small (<300px) image.
    if (heading && sectCta && entries.length === 0 && (units[0]?.paras.length ?? 0) <= 1 && bigImgs.length <= 1) {
      const ctaSub = subtitle ?? units.find((u) => u.tag === 'h2' && u.title !== heading)?.title;
      const ctaImg = bigImgs[0]?.src ?? allImgs.filter((im) => im.w >= 90 && !isChromeImg(im.src)).sort((a, b) => b.w - a.w)[0]?.src;
      out.push(renderCtaBand(key++, heading, ctaSub, sectCta, ctaImg));
      continue;
    }

    // ---------- GENERIC: render heading + entries + ALL images ----------
    const rendered = new Set<string>();
    const takeImg = (s?: string) => { if (s) rendered.add(s); return s; };
    // eyebrow + big heading: a short h3 LABEL ("THE PROBLEM" / "OUR SOLUTION" / "THE CHALLENGE")
    // followed by the real h2 heading. The generic path used the label as the heading and dropped
    // the h2; promote the h2 to heading and render the label as an eyebrow above it.
    let gHeading = heading, gEntries = entries, gHeadUnit = units[0], gEyebrow: string | undefined;
    if (units[0]?.tag === 'h3' && units[1]?.tag === 'h2' && (units[0].title.length < 34 || /^[A-Z][A-Z0-9 &'-]+$/.test(units[0].title.trim())) && !units[0].paras.length && !units[0].imgs.length) {
      gEyebrow = units[0].title; gHeadUnit = units[1]; gHeading = units[1].title;
      gEntries = dedupeUnits(units.slice(2).filter(isRealHead));
    }
    const gSubtitle = gHeadUnit?.paras[0] ?? lead.paras[0];
    const headLis = gHeadUnit?.lis ?? [];
    const headBlocks = gHeadUnit?.blocks ?? [];
    const cnorm = (s: string) => (s || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
    const sectionCounters = gHeading ? pageCounters.filter((c) => c.section && cnorm(c.section) === cnorm(gHeading)) : [];
    const node = renderGeneric({ key: key++, tone, heading: gHeading, headTag: gHeadUnit?.tag, subtitle: gSubtitle, entries: gEntries, bigImgs, allImgs, lead, sectCta, title, takeImg, flipMap, tabIntro, headLis, sectionCounters, headBlocks, cardBgs: pageCardBgs, eyebrow: gEyebrow });
    out.push(node);
    // guarantee: any image not yet rendered → trailing logo/illustration grid
    const leftover = allImgs.filter((im) => !rendered.has(im.src));
    if (leftover.length) out.push(
      <section key={key++} className={tone}><div className="container-x"><div className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-3 lg:grid-cols-4">{leftover.slice(0, 16).map((im, j) => (<div key={j} className="flex items-center justify-center rounded-xl card-hover border border-surface-line bg-white p-4"><Image src={im.src} alt="" width={160} height={110} className="h-auto max-h-24 w-auto object-contain" /></div>))}</div></div></section>,
    );
  }

  // FAQ accordion fallback — if the page has re-captured FAQs but no section heading matched, render
  // the accordion here (before the CTA), where the live places it.
  if (pageFaq && !faqRendered) { faqRendered = true; out.push(renderFaq(key++, pageFaq.heading, undefined, pageFaq.items, 'bg-surface-tint', undefined)); }

  // "Explore More Services" — the live links to related service/solution pages in-content;
  // the capture missed that nav section, so render it from the verified per-page link map.
  const moreLinks = getPageLinks(page.url ?? '');
  if (moreLinks.length >= 1) out.push(
    <section key={key++} className="bg-surface-tint py-16 lg:py-24"><div className="container-x">
      <Reveal animation="fadeInUp"><h2 className="text-center text-2xl lg:text-3xl">Explore More Services</h2></Reveal>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {moreLinks.map((l, i) => (
          <Reveal key={i} animation="fadeInUp" delay={i * 60}>
            <Link href={l.href} className="block h-full rounded-xl card-hover border border-surface-line bg-white p-6 shadow-card"><h3 className="text-lg leading-snug">{l.title}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">Explore <span aria-hidden>→</span></span></Link>
          </Reveal>
        ))}
      </div>
    </div></section>,
  );

  // every live page ends with the "Schedule a 1:1 Call" form + offices map + stats; append it
  // if the section heading wasn't matched so no page is missing it.
  if (!hasForm) out.push(<OneToOneCTA key={key++} tone="light" />);

  // catch-all preload: the visible renderer above places the primary images, but special
  // sections (hero/awards/case) drop their secondary images and the live also ships section
  // backgrounds. Keep every captured asset present (lazy, hidden) so nothing is absent.
  const allAssets = [...new Set([
    ...page.sections.flatMap((s) => (s.items ?? []).filter((i) => i.t === 'img').map((i) => localImg(i.src))),
    ...(page.bgImages ?? []).map(localImg),
  ].filter((s) => s && !s.startsWith('data:')))];
  out.push(
    <div key={key++} aria-hidden className="h-0 w-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {allAssets.map((src, i) => <img key={i} src={src} alt="" width={2} height={2} loading="lazy" />)}
    </div>,
  );
  return <>{out}</>;
}

function renderAwards(key: number, badges: string[]) {
  return (
    <section key={key} className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-12">
      <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="shrink-0"><h3 className="text-xl font-bold leading-tight text-white">Awards &amp;</h3><h3 className="text-xl font-bold leading-tight text-white">Recognization</h3></div>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-4">{badges.slice(0, 16).map((src, j) => (<div key={j} className="flex items-center justify-center rounded-lg bg-white/10 p-3 ring-1 ring-white/20"><Image src={src} alt="Microsoft certification" width={90} height={90} className="h-16 w-auto object-contain lg:h-20" /></div>))}</div>
      </div>
    </section>
  );
}
type Case = { title: string; img: string; para: string; href: string };
/** Pair case-study cards from the raw item stream. Each card's image PRECEDES its
 *  heading (the live's markup), so we attach the most-recent image to each heading —
 *  the generic parse() mis-associates it by one. The first heading is the section title. */
function caseCards(items: CapturedItem[]): Case[] {
  const cards: Case[] = []; let sectionHead = false; let pend = ''; let cur: Case | null = null;
  for (const it of items) {
    if (it.t === 'img') { const s = localAsset(it.src); if (s && !s.startsWith('data:') && !isChromeImg(s)) pend = s; continue; }
    if (it.t === 'h') { if (!sectionHead) { sectionHead = true; pend = ''; continue; } cur = { title: it.text, img: pend, para: '', href: '' }; cards.push(cur); pend = ''; continue; }
    if (!cur) continue;
    if (it.t === 'p' && !cur.para && it.text.length > 20) cur.para = it.text;
    if (it.t === 'cta' && !cur.href) cur.href = localAsset(it.href) || it.href || '';
  }
  const seen = new Set<string>();
  return cards.filter((c) => c.title && !seen.has(c.title) && seen.add(c.title));
}
function renderCaseCards(key: number, heading: string, subtitle: string | undefined, cards: Case[], tone: string) {
  return (
    <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x">
      <Reveal animation="fadeInUp"><h2 className="text-center text-2xl lg:text-3xl">{heading}</h2></Reveal>
      {subtitle && <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-body">{subtitle}</p>}{!subtitle && <div className="mb-10" />}
      <div className={`grid grid-cols-1 gap-7 sm:grid-cols-2 ${cards.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
        {cards.slice(0, 6).map((c, j) => (
          <Reveal key={j} animation="fadeInUp" delay={j * 80}>
            <CaseFlip title={c.title} body={c.para} href={c.href} img={c.img} />
          </Reveal>
        ))}
      </div>
    </div></section>
  );
}
// case-studies index "All Customer Stories" — a grid of large image cards (thumbnail + title +
// Read More), clickable to the case page. The live shows photo cards, not the icon cards the
// generic grid produced.
function renderStoryGrid(key: number, heading: string, subtitle: string | undefined, cards: Case[], tone: string) {
  return (
    <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x">
      <Reveal animation="fadeInUp"><h2 className="text-center text-2xl lg:text-3xl">{heading}</h2></Reveal>
      {subtitle && <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-body">{subtitle}</p>}{!subtitle && <div className="mb-10" />}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, j) => {
          const inner = (
            <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-surface-line bg-white shadow-card card-hover">
              <div className="relative h-48 overflow-hidden bg-surface-tint">{c.img && <Image src={c.img} alt={c.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />}</div>
              <div className="flex flex-1 flex-col p-5"><h3 className="text-base font-semibold leading-snug text-ink group-hover:text-brand">{c.title}</h3>{c.para && <p className="mt-2 line-clamp-2 text-sm text-body">{c.para}</p>}<span className="mt-4 inline-block text-sm font-semibold text-brand">Read More →</span></div>
            </div>
          );
          return <Reveal key={j} animation="fadeInUp" delay={j * 60}>{c.href ? <Link href={c.href} className="block h-full">{inner}</Link> : inner}</Reveal>;
        })}
      </div>
    </div></section>
  );
}
function renderFaq(key: number, heading: string, subtitle: string | undefined, items: { q: string; a: string }[], tone: string, faqImg?: string) {
  return (
    <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x"><Reveal animation="fadeInUp"><h2 className="text-center text-2xl lg:text-3xl">{heading}</h2></Reveal>{subtitle && <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-body">{subtitle}</p>}{!subtitle && <div className="mb-10" />}
      <div className={faqImg ? 'grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]' : 'mx-auto max-w-3xl'}>
        {faqImg && <Reveal animation="zoomIn"><Image src={faqImg} alt="" width={520} height={460} className="h-auto w-full rounded-2xl" /></Reveal>}
        <Accordion items={items} />
      </div></div></section>
  );
}
function renderCtaBand(key: number, heading: string, subtitle: string | undefined, cta: Cta, bandImg?: string) {
  return (
    <section key={key} className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20"><div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_75%_30%,rgba(255,255,255,0.16)_0%,transparent_60%)]" /><div className="container-x relative grid items-center gap-10 lg:grid-cols-2"><div><h2 className="max-w-2xl text-3xl font-bold leading-tight text-white lg:text-4xl">{heading}</h2>{subtitle && <p className="mt-4 max-w-xl text-white/85">{subtitle}</p>}<Link href={cta.href} className="btn mt-7 bg-brand-navy text-white hover:bg-white hover:text-brand-navy uppercase tracking-wide">{cta.text}</Link></div>{bandImg && <Reveal animation="zoomIn"><Image src={bandImg} alt="" width={520} height={380} className="mx-auto h-auto w-full" /></Reveal>}</div></section>
  );
}

function renderCounters(counters: CounterRec[], align: 'center' | 'left' = 'center') {
  if (!counters.length) return null;
  return (
    <div className={`grid gap-x-6 gap-y-8 ${counters.length >= 4 ? 'grid-cols-2 sm:grid-cols-4' : counters.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      {counters.map((c, i) => {
        const num = parseFloat((c.to || '0').replace(/,/g, '')) || 0;
        const decimals = (c.to.split('.')[1] || '').length;
        return (
          <div key={i} className={align === 'center' ? 'text-center' : ''}>
            <Counter to={num} prefix={c.pre} suffix={c.suf} decimals={decimals} className="text-3xl font-bold text-brand lg:text-4xl" />
            <div className="mt-1 text-sm leading-tight text-body">{c.title}</div>
          </div>
        );
      })}
    </div>
  );
}

// "The AI Advantage" — 4 lavender cards, each with an exact (extracted inline-SVG) themed icon,
// a title, a description, and a "Request a call →" CTA. The whole card links to #pgForm (matches live).
function renderAiAdvantage(key: number, heading: string, subtitle: string | undefined, cards: { title: string; desc: string }[], icons: string[]) {
  return (
    <section key={key} className="bg-white py-16 lg:py-24"><div className="container-x">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-ink lg:text-4xl">{heading}</h2>
        {subtitle && <p className="mt-3 text-body">{subtitle}</p>}
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => {
          const desc = (c.desc || '').replace(/\s*request a call\.?\s*$/i, '').trim();
          return (
            <Reveal key={i} animation="fadeInUp" delay={(i % 4) * 80}>
              <Link href="#pgForm" className="flex h-full flex-col rounded-2xl border border-transparent bg-[#EEF1FB] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-cardHover [&:hover_svg_path]:fill-brand">
                {icons[i] && <span className="mb-5 inline-block [&>svg]:h-14 [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: icons[i] }} />}
                <h3 className="text-lg font-semibold leading-snug text-ink">{c.title}</h3>
                {desc && <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{desc}</p>}
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#00217F]">
                  Request a call
                  <Image src="/wp-content/uploads/2025/07/circle-right-arrow.png" alt="" width={20} height={20} className="h-5 w-5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div></section>
  );
}

// "Building Automated ETL/ELT Pipelines" — the live arranges the 3 steps AROUND a central gradient
// triangle (Step 01 top-left, Step 03 top-right, Step 02 bottom-centre). Each step's icon image
// ALREADY contains its white circle+ring, so it is rendered directly (no wrapper). Positions below
// are measured from the live (section 1440px wide; the triangle+steps area spans live y 239→934, so
// the proportional container is 1440×695 and every coord is a % of that box → pixel-exact at 1440,
// scales down proportionally). Mobile stacks the 3 steps under the triangle.
function renderEtlPipeline(key: number, heading: string, subtitle: string | undefined, steps: { num: number; desc: string; icon: string }[], triangle: string | undefined, bg: string | undefined) {
  const byNum = (n: number) => steps.find((s) => s.num === n);
  const s1 = byNum(1), s2 = byNum(2), s3 = byNum(3);
  const W = 1440, H = 786, Y0 = 239; // reference box: live coords, area top at y=239, bottom ~1025
  const px = (x: number) => `${(x / W) * 100}%`;
  const py = (y: number) => `${((y - Y0) / H) * 100}%`;
  const Text = ({ s, align }: { s: { num: number; desc: string }; align: 'left' | 'right' | 'center' }) => (
    <>
      <h3 className="text-[22px] font-semibold leading-snug text-ink">Step {String(s.num).padStart(2, '0')}</h3>
      <p className="mt-1.5 text-[15px] leading-[1.55] text-body" style={{ textAlign: align }}>{s.desc}</p>
    </>
  );
  return (
    <section key={key} className="relative overflow-hidden bg-white py-16 lg:py-[70px]">
      {/* faded office backdrop — the live applies this as the section background-image at natural size, top-left */}
      {bg && <div aria-hidden className="absolute inset-0 bg-no-repeat" style={{ backgroundImage: `url('${bg}')`, backgroundSize: 'auto', backgroundPosition: 'left top' }} />}
      <div className="relative">
        <div className="container-x">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-[2rem] font-bold leading-tight text-ink lg:text-[2.7rem]">{heading}</h2>
            {subtitle && <p className="mt-2 text-[15px] text-brand/70">{subtitle}</p>}
          </div>
        </div>
        {/* desktop (xl+): exact triangular layout measured from the live — full 1440 reference, NOT container-x */}
        <div className="relative mx-auto mt-[84px] hidden aspect-[1440/786] w-full max-w-[1440px] xl:block">
          {triangle && <div className="absolute" style={{ left: px(433), top: py(239), width: px(547) }}><Reveal animation="zoomIn"><Image src={triangle} alt="" width={547} height={475} priority className="h-auto w-full max-w-none" /></Reveal></div>}
          {s1 && <>
            <div className="absolute" style={{ left: px(110), top: py(343), width: px(231) }}><Reveal animation="fadeInUp"><div className="text-right"><Text s={s1} align="right" /></div></Reveal></div>
            <div className="absolute" style={{ left: px(356), top: py(311), width: px(168) }}><Image src={s1.icon} alt="" width={168} height={168} priority className="h-auto w-full max-w-none" /></div>
          </>}
          {s3 && <>
            <div className="absolute" style={{ left: px(1077), top: py(334), width: px(253) }}><Reveal animation="fadeInUp" delay={120}><Text s={s3} align="left" /></Reveal></div>
            <div className="absolute" style={{ left: px(860), top: py(311), width: px(168) }}><Image src={s3.icon} alt="" width={168} height={168} priority className="h-auto w-full max-w-none" /></div>
          </>}
          {s2 && <>
            <div className="absolute" style={{ left: px(600), top: py(733), width: px(168) }}><Image src={s2.icon} alt="" width={168} height={168} priority className="h-auto w-full max-w-none" /></div>
            <div className="absolute" style={{ left: px(570), top: py(921), width: px(300) }}><Reveal animation="fadeInUp" delay={240}><div className="text-center"><Text s={s2} align="center" /></div></Reveal></div>
          </>}
        </div>
        {/* mobile/tablet: triangle + the 3 steps stacked in order */}
        <div className="container-x mt-8 xl:hidden">
          {triangle && <Image src={triangle} alt="" width={300} height={320} className="mx-auto h-auto w-56" />}
          <div className="mx-auto mt-6 max-w-md space-y-7">{[s1, s2, s3].filter(Boolean).map((s, i) => <div key={i} className="flex items-center gap-4"><Image src={s!.icon} alt="" width={84} height={84} className="shrink-0" /><div><Text s={s!} align="left" /></div></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function renderProcessSteps(key: number, heading: string, subtitle: string | undefined, steps: { icon: string; title: string; desc: string }[], tone: string) {
  const cols = steps.length >= 4 ? 'lg:grid-cols-4' : steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
  return (
    <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x">
      <Reveal animation="fadeInUp"><h2 className="text-center text-2xl lg:text-3xl">{heading}</h2></Reveal>
      {subtitle && <p className="mx-auto mb-4 mt-3 max-w-2xl text-center text-body">{subtitle}</p>}
      <div className={`mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 ${cols}`}>
        {steps.map((s, i) => { const ic = localImg(s.icon); return (
          <Reveal key={i} animation="fadeInUp" delay={i * 80}><div className="relative h-full rounded-2xl border border-surface-line bg-white p-6 text-center shadow-card card-hover">
            <span className="absolute right-4 top-3 text-2xl font-bold text-surface-line">{String(i + 1).padStart(2, '0')}</span>
            {ic && <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center"><Image src={ic} alt="" width={56} height={56} className="h-14 w-14 object-contain" /></div>}
            <h3 className="text-lg font-semibold">{s.title}</h3>
            {s.desc && <p className="mt-2 text-sm leading-relaxed text-body">{s.desc}</p>}
          </div></Reveal>
        ); })}
      </div>
    </div></section>
  );
}

function renderGeneric({ key, tone, heading, headTag, subtitle, entries, bigImgs, allImgs, lead, sectCta, title, takeImg, flipMap, tabIntro, headLis, sectionCounters, headBlocks, cardBgs, eyebrow }: any) {
  const Eyebrow = eyebrow ? <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p> : null;
  const icons = allImgs.filter((im: Img) => im.w > 0 && im.w < 300);
  const CtaBtn = sectCta ? <Link href={sectCta.href} className="btn-primary mt-6 uppercase tracking-wide">{sectCta.text}</Link> : null;
  // "Step 01/02/03…" cards are captured in DOM order (the live positions them around a diagram, so
  // DOM order ≠ visual order, e.g. 01,03,02). In a flat list, sort them by their step number.
  const _stepN = (t: string) => { const m = (t || '').match(/\bstep\s*0*(\d+)/i); return m ? +m[1] : NaN; };
  if (entries.length >= 2 && entries.every((e: Unit) => !Number.isNaN(_stepN(e.title)))) entries.sort((a: Unit, b: Unit) => _stepN(a.title) - _stepN(b.title));
  // does the live render THIS section's cards as flip boxes? (front title → captured back desc)
  const fnorm = (t: string) => (t || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
  const flips: (undefined | { back: string; icon: string; href: string })[] = entries.map((e: Unit) => flipMap?.get?.(fnorm(e.title)));
  const flipHit = flips.filter(Boolean).length;
  const isFlipSection = !bigImgs.length && flipHit >= 2 && flipHit >= Math.ceil(entries.length / 2);
  // flip boxes sit in a single row on the live (4 cards → 4 cols), not the 2-col card grid
  const flipCols = entries.length >= 4 ? 'lg:grid-cols-4' : entries.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
  const flipIcon = (e: Unit, rec?: { icon: string }) => {
    const ic = rec?.icon || '';
    if (ic.startsWith('<svg')) return <span className="inline-flex h-12 w-12 items-center justify-center text-brand [&_svg]:h-10 [&_svg]:w-10" dangerouslySetInnerHTML={{ __html: ic }} />;
    const src = ic ? localImg(ic) : (e.imgs[0]?.src ? takeImg(e.imgs[0].src) : '');
    if (src) return <Image src={src} alt="" width={48} height={48} className="h-12 w-12 object-contain" />;
    return <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-chip text-brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-6 w-6"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg></div>;
  };

  // entries-driven: card grid (icons, no big photo) OR feature list (2-col with photo)
  if (entries.length >= 2) {
    const bodyHeading = headTag === 'h2' ? heading : undefined;

    // Elementor n-tabs "Solutions" widget: the H3 units form image-bounded groups, each a
    // tab LABEL (no paragraph) followed by feature sub-items (with paragraphs). Render the
    // live's tabbed panel (pill tab-bar + 2-col active panel) instead of a flat feature list.
    {
      const buckets: Unit[][] = [];
      let bk: Unit[] = [];
      for (const u of entries) { bk.push(u); if (u.imgs?.length) { buckets.push(bk); bk = []; } }
      const isTabbed = buckets.length >= 2 && buckets.every((b) => b.length >= 2 && !b[0].paras?.[0] && b.slice(1).some((f) => f.paras?.[0]));
      if (isTabbed) {
        const tabs = buckets.map((b) => {
          const cta = b.flatMap((x) => x.ctas)[0];
          return { label: b[0].title, body: b[0].paras?.[0] ?? '', img: takeImg(b[b.length - 1].imgs[0].src) ?? '', cta: { label: cta?.text ?? 'Find Out More', href: cta?.href ?? '#pgForm' }, features: b.slice(1).map((f: Unit) => ({ title: f.title, body: f.paras?.[0] ?? '' })) };
        }).filter((t) => t.img);
        if (tabs.length >= 2) {
          // the live shows an eyebrow + a bigger intro heading (often a span the capture missed)
          const nrm = (s: string) => (s || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
          let tabHeading = heading ?? '';
          let tabEyebrow: string | undefined;
          if (tabIntro?.length >= 2 && nrm(tabIntro[0]) === nrm(heading ?? '')) { tabEyebrow = tabIntro[0]; tabHeading = tabIntro[1]; }
          return <RetailSolutionTabs key={key} heading={tabHeading} eyebrow={tabEyebrow} tabs={tabs} />;
        }
      }
    }

    // PHOTO-BACKGROUND CARD GRID: the live's service cards are a NAME over a photo (CSS bg the
    // capture missed, e.g. services "Benefits": Azure Databricks/Synapse/SQL…). When most cards
    // have a captured background, render them as image cards (deduping the doubled capture titles).
    if (cardBgs && cardBgs.size) {
      const seen = new Set<string>();
      const uniq = entries.filter((e: Unit) => { const k = fnorm(e.title); if (seen.has(k)) return false; seen.add(k); return true; });
      const withBg = uniq.filter((e: Unit) => cardBgs.get(fnorm(e.title)));
      if (withBg.length >= 2 && withBg.length >= Math.ceil(uniq.length / 2)) {
        allImgs.forEach((im: Img) => takeImg(im.src));
        const cols = uniq.length % 4 === 0 || uniq.length >= 4 ? 'lg:grid-cols-4' : uniq.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
        return (
          <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x">{(Eyebrow || bodyHeading) && <Reveal animation="fadeInUp"><div>{Eyebrow}{bodyHeading && <h2 className="text-center text-2xl lg:text-3xl">{bodyHeading}</h2>}</div></Reveal>}{subtitle && <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-body">{subtitle}</p>}{!subtitle && (bodyHeading || Eyebrow) && <div className="mb-10" />}
            <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${cols}`}>{uniq.map((e: Unit, j: number) => { const bg = cardBgs.get(fnorm(e.title)); return (
              <Reveal key={j} animation="fadeInUp" delay={j * 60}><div className="relative h-48 overflow-hidden rounded-xl shadow-card card-hover">
                {bg ? <Image src={bg} alt="" fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover" /> : <div className="absolute inset-0 bg-brand-ink" />}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,40,0.15)_0%,rgba(8,14,40,0.82)_100%)]" />
                <h3 className="absolute inset-x-0 bottom-0 p-5 text-lg font-semibold leading-snug text-white">{e.title}</h3>
              </div></Reveal>
            ); })}</div>
            <div className="mt-8 text-center">{CtaBtn}</div></div></section>
        );
      }
    }

    if (bigImgs.length) {
      const img = bigImgs[0]; takeImg(img.src);
      return (
        <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x">{(Eyebrow || bodyHeading) && <Reveal animation="fadeInUp"><div className="mb-2">{eyebrow && <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}{bodyHeading && <h2 className="text-2xl lg:text-3xl">{bodyHeading}</h2>}</div></Reveal>}{subtitle && <p className="mb-8 max-w-2xl text-body">{subtitle}</p>}
          <div className="grid items-center gap-10 lg:grid-cols-2"><div className="space-y-6">{entries.map((e: Unit, j: number) => { takeImg(e.imgs[0]?.src); return (<Reveal key={j} animation="fadeInUp" delay={j * 80} className="flex gap-4">{e.imgs[0] && <Image src={takeImg(e.imgs[0].src)!} alt="" width={44} height={44} className="h-11 w-11 shrink-0 object-contain" />}<div><h3 className="text-lg">{e.title}</h3>{e.paras[0] && <p className="mt-1 text-sm leading-relaxed text-body">{e.paras[0]}</p>}</div></Reveal>); })}{CtaBtn}</div>
          <Reveal animation="fadeInRight"><Image src={img.src} alt={heading ?? title} width={560} height={620} className="mx-auto h-auto w-full rounded-2xl" /></Reveal></div></div></section>
      );
    }
    // card grid — flip cards when the live renders this section as flip boxes, else static cards
    return (
      <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x">{(Eyebrow || bodyHeading) && <Reveal animation="fadeInUp"><div>{Eyebrow}{bodyHeading && <h2 className="text-center text-2xl lg:text-3xl">{bodyHeading}</h2>}</div></Reveal>}{subtitle && <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-body">{subtitle}</p>}{!subtitle && (bodyHeading || Eyebrow) && <div className="mb-10" />}
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${isFlipSection ? flipCols : (entries.length % 3 === 0 || entries.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-2')}`}>{entries.map((e: Unit, j: number) => {
          const rec = flips[j];
          if (isFlipSection) return (<Reveal key={j} animation="fadeInUp" delay={j * 80}><FlipCard icon={flipIcon(e, rec)} title={e.title} back={rec?.back || e.paras[0] || ''} /></Reveal>);
          // photo-background card (the live's service cards: a name over a photo) when one was captured
          const bg = cardBgs?.get?.(fnorm(e.title));
          if (bg) { takeImg(bg); return (
            <Reveal key={j} animation="fadeInUp" delay={j * 80}><div className="relative h-48 overflow-hidden rounded-xl shadow-card card-hover">
              <Image src={bg} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,40,0.15)_0%,rgba(8,14,40,0.82)_100%)]" />
              <h3 className="absolute inset-x-0 bottom-0 p-5 text-lg font-semibold leading-snug text-white">{e.title}</h3>
            </div></Reveal>
          ); }
          const lnk = getContentLink(e.title); const inner = (<div className="h-full rounded-xl card-hover border border-surface-line bg-white p-6 shadow-card">{e.imgs[0] ? <Image src={takeImg(e.imgs[0].src)!} alt="" width={48} height={48} className="mb-4 h-12 w-12 object-contain" /> : <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-surface-chip text-brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-6 w-6"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg></div>}<h3 className="text-lg">{e.title}</h3>{e.paras[0] && <p className="mt-2 text-sm leading-relaxed text-body">{e.paras[0]}</p>}</div>); return (<Reveal key={j} animation="fadeInUp" delay={j * 80}>{lnk ? <Link href={lnk} className="block h-full">{inner}</Link> : inner}</Reveal>);
        })}</div>
        <div className="text-center">{CtaBtn}</div></div></section>
    );
  }

  // single block: heading + paragraphs + bullet list (li items) + optional ≥300px illustration.
  const paras = units0Paras(heading, subtitle, entries, lead);
  const bullets: string[] = headLis ?? [];
  const BulletList = bullets.length ? (
    <ul className="mt-6 space-y-3">
      {bullets.map((li: string, j: number) => (
        <li key={j} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span className="text-sm leading-relaxed text-body">{li}</span></li>
      ))}
    </ul>
  ) : null;
  const counters: CounterRec[] = sectionCounters ?? [];

  // ICON + TEXT LIST: sections like "Benefits Of Data Visualization" are a run of (small icon →
  // description) pairs with NO h3 card titles, so they fall here. The capture flattens them into
  // paras[]/imgs[]; without this they'd render as a single paragraph + dropped icons. Re-pair them
  // from the ordered blocks and render an icon+text grid so all the info + icons show.
  const blocks: Block[] = headBlocks ?? [];
  const iconCells: { icon: Img; text: string; title?: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const bl = blocks[i];
    if (bl.t === 'img' && bl.img.w > 0 && bl.img.w < 260) {
      const nx = blocks[i + 1];
      if (nx && (nx.t === 'p' || nx.t === 'li')) { iconCells.push({ icon: bl.img, text: nx.text }); i++; }
    }
  }
  if (iconCells.length >= 3 && entries.length === 0) {
    iconCells.forEach((c) => takeImg(c.icon.src));
    allImgs.forEach((im: Img) => takeImg(im.src)); // consume the rest (featured/decorative) — shown in-grid or intentionally omitted
    const cols = iconCells.length % 3 === 0 || iconCells.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
    return (
      <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x">
        {heading && <Reveal animation="fadeInUp"><h2 className="text-center text-2xl lg:text-3xl">{heading}</h2></Reveal>}
        {subtitle && <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-body">{subtitle}</p>}{!subtitle && heading && <div className="mb-10" />}
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${cols}`}>{iconCells.map((c, j) => (
          <Reveal key={j} animation="fadeInUp" delay={j * 70}><div className="flex h-full gap-4 rounded-xl card-hover border border-surface-line bg-white p-6 shadow-card">
            <Image src={c.icon.src} alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
            <p className="text-sm leading-relaxed text-body">{c.text}</p>
          </div></Reveal>
        ))}</div>
        <div className="mt-8 text-center">{CtaBtn}</div>
      </div></section>
    );
  }

  // "Why Choose Folio3?" style: centered heading/subtitle, bullets on the left + a stat-counter
  // panel on the right (the live's trust bar: 98% User satisfaction, 100+ Our Clients, …).
  if (counters.length && bullets.length) {
    allImgs.forEach((im: Img) => takeImg(im.src));
    return (
      <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x">
        <div className="mx-auto max-w-3xl text-center">{heading && <h2 className="text-2xl lg:text-3xl">{heading}</h2>}{paras.map((p, j) => <p key={j} className="mt-3 text-body">{p}</p>)}</div>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2"><Reveal animation="fadeInUp" className="mx-auto w-full max-w-xl">{BulletList}</Reveal><Reveal animation="fadeInRight">{renderCounters(counters, 'center')}</Reveal></div>
      </div></section>
    );
  }
  if (bigImgs.length) {
    const img = bigImgs[0]; takeImg(img.src);
    return (
      <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x"><div className="grid items-center gap-10 lg:grid-cols-2"><Reveal animation="fadeInUp">{heading && <h2 className="text-2xl lg:text-3xl">{heading}</h2>}{paras.map((p, j) => <p key={j} className="mt-4 text-body">{p}</p>)}{BulletList}{CtaBtn}</Reveal><Reveal animation="fadeInRight"><Image src={img.src} alt={heading ?? title} width={560} height={420} className="h-auto w-full rounded-xl" /></Reveal></div>{counters.length ? <div className="mt-12">{renderCounters(counters)}</div> : null}</div></section>
    );
  }
  // a bulleted block's content IS the bullets — consume any small decorative images (e.g.
  // Why-Choose about-mock w=200) so they don't leak into the trailing leftover-image grid.
  // Non-bulleted single-block sections keep their leftover image (it's the section's illustration).
  if (bullets.length) allImgs.forEach((im: Img) => takeImg(im.src));
  return (
    <section key={key} className={`py-20 lg:py-28 ${tone}`}><div className="container-x max-w-3xl text-center">{heading && <h2 className="text-2xl lg:text-3xl">{heading}</h2>}{paras.map((p, j) => <p key={j} className="mt-4 text-body">{p}</p>)}{BulletList && <div className="mx-auto mt-2 max-w-xl text-left">{BulletList}</div>}{counters.length ? <div className="mt-10">{renderCounters(counters)}</div> : null}{CtaBtn}</div></section>
  );
}
function units0Paras(heading: any, subtitle: any, entries: Unit[], lead: any): string[] {
  const ps = [...(subtitle ? [subtitle] : []), ...lead.paras.filter((p: string) => p !== subtitle)];
  return [...new Set(ps)].slice(0, 6);
}
