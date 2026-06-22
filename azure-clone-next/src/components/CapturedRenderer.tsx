import Image from 'next/image';
import Link from 'next/link';
import type { CapturedPage, CapturedSection } from '@/lib/content';
import { localAsset } from '@/lib/content';
import { HERO_FG } from '@/lib/hero-fg';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { Accordion } from '@/components/sections/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { OrderedRenderer } from '@/components/OrderedRenderer';

/**
 * Data-driven template for service / industry / solution marketing pages.
 * Renders the captured JSON faithfully: real hero, alternating text+image
 * feature sections (ALL captured images), card grids, the live's case-study and
 * "Schedule a 1:1 Call" lead-form bands, using the CAPTURED CTA hrefs (so CTAs
 * scroll to #pgForm exactly like the live).
 */

type Cta = { text: string; href: string };
type Feat = { title: string; body: string; icon?: string };
type Block =
  | { kind: 'caseStudies' }
  | { kind: 'leadForm' }
  | { kind: 'sectionHeader'; heading: string; subtitle?: string }
  | { kind: 'ctaBand'; heading: string; subtitle?: string; cta?: Cta }
  | { kind: 'faq'; heading: string; subtitle?: string; items: { q: string; a: string }[] }
  | { kind: 'awards'; badges: string[] }
  | { kind: 'featureList'; heading?: string; intro?: string; features: Feat[]; img?: string; imgRight: boolean; cta?: Cta }
  | { kind: 'cards'; heading?: string; subtitle?: string; cards: { title: string; body: string; img?: string }[]; cta?: Cta }
  | { kind: 'feature'; heading?: string; paragraphs: string[]; listItems: string[]; imgs: string[]; cta?: Cta }
  | { kind: 'text'; heading?: string; paragraphs: string[]; listItems: string[]; cta?: Cta };

function splitHighlight(text: string) {
  const words = text.split(' ');
  if (words.length < 3) return { head: text, tail: '' };
  const cut = Math.ceil(words.length * 0.6);
  return { head: words.slice(0, cut).join(' ') + ' ', tail: words.slice(cut).join(' ') };
}

// header logo / Folio3 wordmark only — keep real content svgs/icons (cert badges, feature icons)
const isChromeImg = (src: string) => /folio3_by_azure|azure-logo|\/logo[-.]/i.test(src);
const FOOTER_WORDS = ['US Office', 'Privacy Policy', 'All rights reserved', 'Bulgaria Office', 'Pakistan Office', 'UAE Office', 'UK Office'];
const NAV_WORDS = ['Zammad', 'Copilot Agent', 'SmartExpense', 'KubeMonitor', 'Microsoft Fabric Services', 'Azure Managed Services'];
function isChromeSection(s: CapturedSection) {
  const text = [...s.paragraphs, ...s.listItems, ...s.headings.map((h) => h.text)].join(' ');
  if (/all rights reserved|privacy policy ?(&|&amp;)? ?terms/i.test(text)) return true;
  if (FOOTER_WORDS.filter((w) => text.includes(w)).length >= 2) return true;
  // footer office directory: several phone / street-address list items
  const addrLike = s.listItems.filter((l) => /\btel:|\bsupport:|\bsuite\b|\broad\b|\bstreet\b|\bcalifornia\b|\boffice\b/i.test(l)).length;
  if (addrLike >= 3) return true;
  // mega-menu dump: many nav-only list items
  if (s.listItems.length > 8 && NAV_WORDS.filter((w) => text.includes(w)).length >= 2) return true;
  return false;
}
const localImgs = (imgs: { src: string }[], used: Set<string>) =>
  imgs
    .map((i) => localAsset(i.src))
    .filter((s) => s && !s.startsWith('data:') && !isChromeImg(s) && (used.has(s) ? false : (used.add(s), true)));

const cleanCta = (c: { text: string; href: string | null }): Cta | undefined =>
  c && c.text && c.href && c.href !== '#' ? { text: c.text.trim(), href: localAsset(c.href) || c.href } : undefined;

export function CapturedRenderer({ page, title, slug, faq = [] }: { page: CapturedPage; title: string; slug?: string; faq?: string[] }) {
  // Path A: if the page was re-captured with the ordered item model, render faithfully from it.
  if (page.sections?.some((s) => s.items && s.items.length)) {
    return <OrderedRenderer page={page} title={title} slug={slug} faq={faq} />;
  }
  const heroFg = slug ? HERO_FG[slug] : undefined;
  const contentSections = page.sections.filter((s) => !isChromeSection(s));
  const allHeadings = contentSections.flatMap((s) => s.headings);
  const h1 = allHeadings.find((h) => h.tag === 'h1')?.text ?? page.meta.title;
  const { head, tail } = splitHighlight(h1);

  const used = new Set<string>();
  const heroBg = (page.bgImages ?? []).map(localAsset).find((b) => b && !isChromeImg(b)) ?? '';
  // hero subtitle = the h2 that sits in the same section as the h1 (the live's hero sub-line)
  const heroH2 = page.sections.find((s) => s.headings.some((h) => h.tag === 'h1'))?.headings.find((h) => h.tag === 'h2')?.text;
  const heroSub = heroH2 ?? page.meta.description ?? contentSections.flatMap((s) => s.paragraphs).find((p) => p.length > 40);
  // breadcrumb: the live renders "Home » <Title>" on most marketing pages (captured as a paragraph)
  const isCrumb = (p: string) => /^home\s*[»>]/i.test(p.trim());
  const hasCrumb = page.sections.some((s) => s.paragraphs.some(isCrumb));
  // hero CTA: prefer a captured #pgForm cta, else first real cta, else default to the lead form
  const allCtas = page.sections.flatMap((s) => s.ctas.map(cleanCta).filter(Boolean) as Cta[]);
  const heroCta = allCtas.find((c) => c.href.includes('#pgForm')) ?? { text: 'Speak to Our Azure Experts', href: '#pgForm' };

  // ── classify sections into faithful blocks ──
  const seenHeads = new Set<string>();
  let leadFormDone = false;
  const blocks: Block[] = [];
  for (const s of contentSections) {
    if (s.headings.some((h) => h.tag === 'h1')) continue;
    const h2 = s.headings.find((h) => h.tag === 'h2')?.text;
    const allSub = [...new Set(s.headings.filter((h) => h.tag === 'h3' || h.tag === 'h4').map((h) => h.text))];
    const heading = h2 ?? allSub[0];
    const subs = h2 ? allSub : allSub.slice(1);
    // drop breadcrumb-only sections; extract images embedded as raw <img> HTML inside paragraphs
    // (e.g. tech-logo grids) and strip remaining tags so markup never renders as literal text
    const rawParas = s.paragraphs.filter((p) => !isCrumb(p));
    const htmlImgs = rawParas
      .flatMap((p) => [...p.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]))
      .filter((u) => u && !u.startsWith('data:'));
    const paras = rawParas.map((p) => p.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
    if (!heading && !paras.length && !s.listItems.length && !s.images.length && !htmlImgs.length) continue;

    // dedupe by PRIMARY heading only (so an aggregate intro + its individual child sections can both render)
    if (heading && seenHeads.has(heading)) continue;
    if (heading) seenHeads.add(heading);

    // the live's "Schedule a 1:1 Call Today" lead-form band → shared component (id="pgForm")
    if (heading && /schedule a 1:1 call|book a free|get in touch with our team/i.test(heading)) {
      if (!leadFormDone) { blocks.push({ kind: 'leadForm' }); leadFormDone = true; }
      continue;
    }
    // case studies
    if (heading && /real results|success stories|client success/i.test(heading)) {
      blocks.push({ kind: 'caseStudies' });
      continue;
    }
    // Awards & Recognition cert-badge band (blue strip of Microsoft certification SVGs)
    if (heading && /awards\s*(&|&amp;)?\s*recogni/i.test(heading)) {
      const badges = s.images.map((im) => localAsset(im.src)).filter((x) => x && /\.svg$/i.test(x) && !isChromeImg(x));
      if (badges.length >= 3) { badges.forEach((bb) => used.add(bb)); blocks.push({ kind: 'awards', badges }); continue; }
    }
    // FAQ accordion: pair the live's question toggles (extracted) with the captured answers
    if (heading && /common queries|frequently asked|^faqs?\b/i.test(heading) && faq.length) {
      const answers = paras.slice(1); // paras[0] = the section subtitle
      const items = faq.map((q, k) => ({ q, a: answers[k] ?? '' })).filter((x) => x.a);
      if (items.length) { blocks.push({ kind: 'faq', heading, subtitle: paras[0], items }); continue; }
    }
    // "Learn More About Our Services" / related posts: a section captured as several h2 headings → card grid
    const h2s = s.headings.filter((h) => h.tag === 'h2').map((h) => h.text);
    if (h2s.length >= 3 && subs.length === 0) {
      const cardImgs = localImgs(s.images, used);
      const cards = h2s.slice(1, 4).map((t, k) => ({ title: t, body: paras[k] ?? '', img: cardImgs[k] }));
      blocks.push({ kind: 'cards', heading: h2s[0], cards });
      continue;
    }

    const cta = (s.ctas.map(cleanCta).find(Boolean) as Cta | undefined);
    // sized images: large (≥300px) = feature photo; small = icon. include raw-HTML-embedded logos.
    const sized = [
      ...s.images.map((im) => ({ src: localAsset(im.src), w: im.w || 0, h: im.h || 0 })),
      ...htmlImgs.map((src) => ({ src: localAsset(src), w: 200, h: 120 })),
    ].filter((x) => x.src && !x.src.startsWith('data:') && !isChromeImg(x.src) && !used.has(x.src));
    const bigImg = sized.find((x) => x.w >= 300);
    const iconImgs = sized.filter((x) => x.w > 0 && x.w < 300);

    // aggregate / section intro (e.g. "Let's Dive Into Our Azure Cloud Professional Services") → header band; children render below
    if (heading && (subs.length >= 7 || /let.?s dive|^our .+ (services|solutions)$/i.test(heading))) {
      blocks.push({ kind: 'sectionHeader', heading, subtitle: paras[0] });
      continue;
    }
    // full-width blue CTA band: heading + (≤1 short subtitle) + a CTA, no sub-features (e.g. "Take A Seamless Cloud Ride With Us!")
    if (heading && cta && subs.length === 0 && paras.length <= 1) {
      sized.forEach((x) => used.add(x.src)); // consume any decorative image so it doesn't leak elsewhere
      blocks.push({ kind: 'ctaBand', heading, subtitle: paras[0], cta });
      continue;
    }
    // card row: N sub-headings each paired with a small icon (no large feature image) → horizontal card grid
    if (subs.length >= 2 && subs.length <= 9 && !bigImg && iconImgs.length >= Math.min(subs.length, 2)) {
      iconImgs.forEach((ic) => used.add(ic.src));
      const hasSub = paras.length === subs.length + 1;
      const subtitle = hasSub ? paras[0] : undefined;
      const bodies = hasSub ? paras.slice(1) : paras;
      const cards = subs.slice(0, 9).map((t, k) => ({ title: t, body: bodies[k] ?? '', img: iconImgs[k]?.src }));
      blocks.push({ kind: 'cards', heading: h2 ?? heading, subtitle, cards, cta });
      continue;
    }
    // explicit card-grid sections (a heading-only intro to N equal cards)
    const isGridHeading = !!heading && /^(overview|why .*(folio3|choose|us)|key (features|benefits)|benefits|what (we offer|you get)|how it works)/i.test(heading);
    // feature with vertical sub-list: heading + 2–6 sub-features (with descriptions) + optional large image
    // → 2-col (list one side, photo the other, alternating). Matches the live's service blocks.
    if (!isGridHeading && subs.length >= 2 && subs.length <= 6 && (bigImg || paras.length >= subs.length)) {
      if (bigImg) used.add(bigImg.src);
      iconImgs.forEach((ic) => used.add(ic.src));
      const intro = paras.length > subs.length ? paras[0] : undefined;
      const bodies = intro ? paras.slice(1) : paras;
      const features = subs.slice(0, 6).map((t, k) => ({ title: t, body: bodies[k] ?? '', icon: iconImgs[k]?.src }));
      blocks.push({ kind: 'featureList', heading, intro, features, img: bigImg?.src, imgRight: blocks.length % 2 === 0, cta });
      continue;
    }
    // card grid: h2 + ≥3 sub-headings with small icons (e.g. Overview)
    if (subs.length >= 3) {
      const cardImgs = (iconImgs.length ? iconImgs.map((x) => x.src) : localImgs(s.images, used));
      cardImgs.forEach((c) => used.add(c));
      const hasSub = paras.length === subs.length + 1;
      const subtitle = hasSub ? paras[0] : undefined;
      const bodies = hasSub ? paras.slice(1) : paras;
      const cards = subs.slice(0, 9).map((t, i) => ({ title: t, body: bodies[i] ?? '', img: cardImgs[i] }));
      blocks.push({ kind: 'cards', heading: h2 ?? heading, subtitle, cards, cta });
      continue;
    }
    const imgs = sized.map((x) => x.src);
    imgs.forEach((x) => used.add(x));
    if (imgs.length) {
      blocks.push({ kind: 'feature', heading, paragraphs: paras.slice(0, 6), listItems: s.listItems.slice(0, 10), imgs, cta });
    } else if (heading || paras.length || s.listItems.length) {
      blocks.push({ kind: 'text', heading, paragraphs: paras.slice(0, 6), listItems: s.listItems.slice(0, 12), cta });
    }
  }
  // guarantee the lead form exists (so #pgForm anchors always resolve) — the live has it on every marketing page
  if (!leadFormDone) blocks.push({ kind: 'leadForm' });

  const CtaBtn = ({ cta, navy }: { cta?: Cta; navy?: boolean }) =>
    cta ? (
      <Link href={cta.href} className={`btn mt-6 uppercase tracking-wide ${navy ? 'bg-brand-navy text-white hover:bg-brand' : 'btn-primary'}`}>{cta.text}</Link>
    ) : null;

  const heroCopy = (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand sm:text-sm">{title}</p>
      <h1 className="text-2xl font-bold leading-[1.12] text-ink sm:text-3xl lg:text-4xl xl:text-5xl">
        {head}
        {tail && <span className="text-brand">{tail}</span>}
      </h1>
      {heroSub && <p className="mt-3 max-w-xl text-sm text-body sm:mt-5 lg:text-base">{heroSub}</p>}
      <Link href={heroCta.href} className="btn mt-5 bg-brand-navy text-white hover:bg-brand uppercase tracking-wide sm:mt-7">{heroCta.text}</Link>
    </div>
  );

  return (
    <>
      {/* hero */}
      {heroBg && !heroFg ? (
        // full-width captured banner (illustration baked in on the right). Rendered
        // w-full/h-auto so it scales proportionally with the viewport — like the live —
        // with the hero copy overlaid on the banner's empty left space.
        <section className="relative bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
          {/* copy rendered ONCE (single h1): normal flow above the banner on narrow screens,
              absolutely overlaid on the banner's empty left space on wide screens */}
          <div className="container-x py-10 xl:absolute xl:inset-0 xl:z-10 xl:py-0">
            <div className="xl:grid xl:h-full xl:grid-cols-2 xl:items-center">
              {heroCopy}
            </div>
          </div>
          {/* full-width banner — scales proportionally with the viewport (no distortion) */}
          <Image src={heroBg} alt="" width={1920} height={720} priority sizes="100vw" className="mt-6 block h-auto w-full xl:mt-0" />
        </section>
      ) : (
        <section className="relative overflow-hidden bg-[linear-gradient(110deg,#eef3f8_0%,#dfeaf5_100%)]">
          <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">{title}</p>
              <h1 className="text-4xl font-bold leading-[1.15] text-ink lg:text-5xl">
                {head}
                {tail && <span className="text-brand">{tail}</span>}
              </h1>
              {heroSub && <p className="mt-6 max-w-xl text-lg text-body">{heroSub}</p>}
              <Link href={heroCta.href} className="btn mt-8 bg-brand-navy text-white hover:bg-brand uppercase tracking-wide">{heroCta.text}</Link>
            </div>
            {heroFg && (
              <Reveal animation="zoomIn" className="relative">
                <Image src={heroFg} alt={h1} width={620} height={460} className="float-anim h-auto w-full" priority />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* breadcrumb — the live shows it on marketing pages */}
      {hasCrumb && (
        <div className="bg-brand">
          <div className="container-x py-3 text-sm text-white/90">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="px-2">»</span>
            <span>{title}</span>
          </div>
        </div>
      )}

      {blocks.map((b, i) => {
        const tone = i % 2 === 0 ? 'bg-white' : 'bg-surface-tint';
        if (b.kind === 'caseStudies') return <CaseStudies key={i} />;
        if (b.kind === 'leadForm') return <OneToOneCTA key={i} tone="light" />;

        if (b.kind === 'awards') {
          return (
            <section key={i} className="bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_60%,#2F69F2_100%)] py-12">
              <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center">
                <div className="shrink-0">
                  <h3 className="text-xl font-bold leading-tight text-white">Awards &amp;</h3>
                  <h3 className="text-xl font-bold leading-tight text-white">Recognization</h3>
                </div>
                <div className="flex flex-1 flex-wrap items-center justify-center gap-4">
                  {b.badges.slice(0, 16).map((src, j) => (
                    <div key={j} className="flex items-center justify-center rounded-lg bg-white/10 p-3 ring-1 ring-white/20">
                      <Image src={src} alt="Microsoft certification" width={90} height={90} className="h-16 w-auto object-contain lg:h-20" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (b.kind === 'faq') {
          return (
            <section key={i} className={`section ${tone}`}>
              <div className="container-x">
                <Reveal animation="fadeInUp"><h2 className="text-center text-2xl lg:text-3xl">{b.heading}</h2></Reveal>
                {b.subtitle && <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-body">{b.subtitle}</p>}
                <div className="mx-auto max-w-3xl">
                  <Accordion items={b.items} />
                </div>
              </div>
            </section>
          );
        }

        if (b.kind === 'sectionHeader') {
          return (
            <section key={i} className={`section ${tone} pb-0`}>
              <div className="container-x text-center">
                <Reveal animation="fadeInUp"><h2 className="text-3xl lg:text-4xl">{b.heading}</h2></Reveal>
                {b.subtitle && <p className="mx-auto mt-4 max-w-2xl text-body">{b.subtitle}</p>}
              </div>
            </section>
          );
        }

        if (b.kind === 'ctaBand') {
          return (
            <section key={i} className="relative overflow-hidden bg-[linear-gradient(120deg,#143CD5_0%,#1742E7_55%,#2F69F2_100%)] py-16 lg:py-20">
              <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_120%_at_75%_30%,rgba(255,255,255,0.16)_0%,transparent_60%)]" />
              <div className="container-x relative">
                <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white lg:text-4xl">{b.heading}</h2>
                {b.subtitle && <p className="mt-4 max-w-xl text-white/85">{b.subtitle}</p>}
                {b.cta && <Link href={b.cta.href} className="btn mt-7 bg-brand-navy text-white hover:bg-white hover:text-brand-navy uppercase tracking-wide">{b.cta.text}</Link>}
              </div>
            </section>
          );
        }

        if (b.kind === 'featureList') {
          return (
            <section key={i} className={`section ${tone}`}>
              <div className="container-x grid items-center gap-10 lg:grid-cols-2">
                <Reveal animation="fadeInUp" className={b.imgRight ? 'lg:order-1' : 'lg:order-2'}>
                  {b.heading && <h2 className="text-2xl lg:text-3xl">{b.heading}</h2>}
                  {b.intro && <p className="mt-4 text-body">{b.intro}</p>}
                  <div className="mt-6 space-y-5">
                    {b.features.map((f, j) => (
                      <div key={j} className="flex gap-4">
                        {f.icon ? (
                          <Image src={f.icon} alt="" width={40} height={40} className="mt-1 h-10 w-10 shrink-0 object-contain" />
                        ) : (
                          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-chip text-brand">✓</span>
                        )}
                        <div>
                          <h3 className="text-base font-semibold text-ink">{f.title}</h3>
                          {f.body && <p className="mt-1 text-sm leading-relaxed text-body">{f.body}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <CtaBtn cta={b.cta} navy />
                </Reveal>
                <div className={b.imgRight ? 'lg:order-2' : 'lg:order-1'}>
                  {b.img && (
                    <Reveal animation={b.imgRight ? 'fadeInRight' : 'fadeInLeft'}>
                      <Image src={b.img} alt={b.heading ?? title} width={560} height={620} className="mx-auto h-auto w-full rounded-2xl" />
                    </Reveal>
                  )}
                </div>
              </div>
            </section>
          );
        }

        if (b.kind === 'cards') {
          const cols = b.cards.length % 3 === 0 || b.cards.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
          return (
            <section key={i} className={`section ${tone}`}>
              <div className="container-x">
                {b.heading && <Reveal animation="fadeInUp"><h2 className="text-center text-2xl lg:text-3xl">{b.heading}</h2></Reveal>}
                {b.subtitle && <p className="mx-auto mb-10 mt-3 max-w-2xl text-center text-body">{b.subtitle}</p>}
                {!b.subtitle && b.heading && <div className="mb-10" />}
                <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${cols}`}>
                  {b.cards.map((c, j) => (
                    <Reveal key={j} animation="fadeInUp" delay={j * 100}>
                      <div className="h-full rounded-xl border border-surface-line bg-white p-6 shadow-card">
                        {c.img ? (
                          <Image src={c.img} alt="" width={48} height={48} className="mb-4 h-12 w-12 object-contain" />
                        ) : (
                          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-surface-chip text-brand">◆</div>
                        )}
                        <h3 className="text-lg">{c.title}</h3>
                        {c.body && <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>}
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div className="text-center"><CtaBtn cta={b.cta} /></div>
              </div>
            </section>
          );
        }

        if (b.kind === 'feature') {
          // 1 image → alternating text+image; multiple → text then image grid
          if (b.imgs.length === 1) {
            const imgRight = i % 2 === 0;
            return (
              <section key={i} className={`section ${tone}`}>
                <div className="container-x grid items-center gap-10 lg:grid-cols-2">
                  <Reveal animation="fadeInUp" className={imgRight ? 'lg:order-1' : 'lg:order-2'}>
                    {b.heading && <h2 className="text-2xl lg:text-3xl">{b.heading}</h2>}
                    {b.paragraphs.map((p, j) => <p key={j} className="mt-4 text-body">{p}</p>)}
                    {b.listItems.length > 0 && (
                      <ul className="mt-5 space-y-2">{b.listItems.map((li, j) => <li key={j} className="flex gap-3 text-sm text-body"><span className="mt-1 text-brand">✓</span>{li}</li>)}</ul>
                    )}
                    <CtaBtn cta={b.cta} navy />
                  </Reveal>
                  <Reveal animation={imgRight ? 'fadeInRight' : 'fadeInLeft'} className={imgRight ? 'lg:order-2' : 'lg:order-1'}>
                    <Image src={b.imgs[0]} alt={b.heading ?? title} width={560} height={400} className="h-auto w-full rounded-xl" />
                  </Reveal>
                </div>
              </section>
            );
          }
          return (
            <section key={i} className={`section ${tone}`}>
              <div className="container-x">
                {b.heading && <Reveal animation="fadeInUp"><h2 className="mb-4 text-center text-2xl lg:text-3xl">{b.heading}</h2></Reveal>}
                {b.paragraphs[0] && <p className="mx-auto mb-10 max-w-2xl text-center text-body">{b.paragraphs[0]}</p>}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                  {b.imgs.slice(0, 12).map((src, j) => (
                    <Reveal key={j} animation="fadeInUp" delay={j * 60} className="flex items-center justify-center rounded-xl border border-surface-line bg-white p-5 shadow-card">
                      <Image src={src} alt="" width={140} height={90} className="h-auto max-h-20 w-auto object-contain" />
                    </Reveal>
                  ))}
                </div>
                <div className="text-center"><CtaBtn cta={b.cta} /></div>
              </div>
            </section>
          );
        }

        return (
          <section key={i} className={`section ${tone}`}>
            <div className="container-x max-w-4xl">
              {b.heading && <h2 className="text-2xl lg:text-3xl">{b.heading}</h2>}
              {b.paragraphs.map((p, j) => <p key={j} className="mt-4 text-body">{p}</p>)}
              {b.listItems.length > 0 && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">{b.listItems.map((li, j) => <li key={j} className="flex gap-3 text-sm text-body"><span className="mt-1 text-brand">✓</span>{li}</li>)}</ul>
              )}
              <CtaBtn cta={b.cta} />
            </div>
          </section>
        );
      })}
    </>
  );
}
