# BMAD Plan — Add a video to /about-us/

**Task slug:** about-us-video-add
**Branch:** `claude/about-us-video-add-o9rbv2` (designated; working tree clean at start)
**Status:** DONE (data-only). User decisions: (1) use the supplied video as-is; (2) embed-only
scope — lazy poster embed via the existing `VideoEmbed`, schema + transcript deferred to a follow-up.

## DECISIONS (from user) & FINAL APPROACH
- Video kept as supplied: `ihSaGAVHmvw` ("Bikie Wars", Aunty Donna) — user chose "use anyway".
- Scope = embed only. NO component code changed. NO VideoObject schema / transcript (deferred).
- Smallest change (Architect): reuse the existing `VideoEmbed` render path in `OrderedRenderer`
  (lines 425-438), triggered data-only by a matching `videoHeading` in `agent-extras.json`.

### Stories (SM) — all Dev+QA complete
- S1 `content-kit/agent-extras.json`: added `"about_us": { video:{youtube,poster}, videoHeading:
  "See Folio3 in Action" }` (surgical append, JSON validates).
- S2 `content-kit/content/about_us.json`: added a section `{items:[{t:h,tag:h2,text:"See Folio3 in
  Action"}]}` after the "Discover the essence…" section. This heading == videoHeading, so the
  renderer's gate `hnorm(videoHeading).includes(hnorm(heading).slice(0,18))` fires the video block.
- S3 Poster asset: downloaded YouTube maxresdefault (1280×720) to
  `public/wp-content/uploads/2026/07/about-us-video-poster.jpg` (remote i.ytimg not allowed by
  next.config remotePatterns, so it must be local). `VideoEmbed` renders it via `<Image fill>`.

### QA — verified on the running production build (`npm run build` + `npm start`)
- Build green; `/about-us` prerenders.
- Playwright (headless Chromium): page 200; exactly 1 "See Folio3 in Action" `<h2>`; 1 play button;
  poster visible BEFORE play; **0 iframes before click** (lazy-load proven); after click 1 iframe
  with src `https://www.youtube-nocookie.com/embed/ihSaGAVHmvw?autoplay=1&rel=0`.
- **0 console errors, 0 failed requests.** Poster returns HTTP 200 (raw + `/_next/image`).
- No section dropped/duplicated; hero illustration intact (regression check).

### NOT done (deferred by user's "embed only" choice — flag for follow-up)
- VideoObject JSON-LD schema.
- On-page transcript.
Both require component code (none exists today) + copy/assets, so they are a separate story.


---

## ANALYST — what I actually found (quoted from the real files)

### The request
Add a video to `/about-us/`. Link supplied:
`https://www.youtube.com/watch?v=ihSaGAVHmvw&list=RDihSaGAVHmvw&start_radio=1&pp=ygUKYmlrZXkgZ2FuZ...`
- Video id = `ihSaGAVHmvw`. The `list=RD...` + `start_radio=1` params mean this was a YouTube
  auto-generated "radio" mix, i.e. the address bar was copied while a mix was playing.
- **Verified via YouTube oEmbed** (`youtube.com/oembed?...`):
  `"title": "Bikie Wars"`, `"author_name": "Aunty Donna"` (an Australian comedy troupe).
  This is a **comedy video, not a Folio3 / Azure corporate video.**

### The page content file
`azure-clone-next/content-kit/content/about_us.json` — data-driven, has an `items[]` stream
(so it renders through `OrderedRenderer`, the modern path). Sections in order:
mega-menu list → hero (h1 "Transform Your Business With Azure Cloud Services") → breadcrumb →
"Discover the essence of who we are?" → "Ready to Work with The Ultimate Azure Experts?" →
"Real Results, Real Impact" case cards → "Explore Why Businesses Trust Folio3…" → contact map → footer.
No video anywhere today.

### How video is embedded on existing pages (read the real code)
There is exactly ONE video mechanism, and it is NOT a data-only item type:

1. **`src/components/ui/VideoEmbed.tsx`** — a client component: click-to-play, privacy-friendly
   `youtube-nocookie` iframe that loads **only after the user clicks** (good: lazy), with a poster
   `<Image>` overlay. **It has NO VideoObject schema and NO transcript.**
2. **`src/lib/content.ts:292`** — `AgentExtras.video = { youtube, poster }` + `videoHeading`,
   loaded from `content-kit/agent-extras.json` (keyed by underscored slug, e.g.
   `ai_powered_solutions_copilot_for_recruitment`).
3. **`src/components/OrderedRenderer.tsx:425-438`** — the ONLY place `<VideoEmbed>` is rendered.
   It is gated: it fires only when a section heading matches a **hardcoded regex**
   (`/tired of admin|recruiter take over|see your new ai/i`) OR fuzzy-matches
   `agentExtras.videoHeading`. It is bespoke to the Copilot Agent pages.

**There is no generic `{"t":"video"}` item type.** `grep` for `'video'` in the renderer/content
lib returns only the agentExtras path. So a data-only edit to `about_us.json` **cannot** place a video.

### Where JSON-LD schema is done today
`blog/[slug]/page.tsx`, `app/[...slug]/page.tsx`, `layout.tsx`, `sections/Accordion.tsx` emit
`application/ld+json`. **No `VideoObject` anywhere.** No `transcript` rendering anywhere in `src/`.

---

## PM — goal & acceptance criteria (to confirm)

Goal: embed a video on the About Us page meeting the stated VIDEO REQUIREMENTS:
lazy-load, poster with true w/h, VideoObject schema, on-page transcript, verified on preview.

**Acceptance criteria:**
- [ ] Correct, brand-appropriate video (see blocker #1).
- [ ] Embed lazy-loads (no iframe until play) — VideoEmbed already does this.
- [ ] Poster image present with TRUE pixel w/h (asset needed).
- [ ] `VideoObject` JSON-LD on the page (needs component code — none exists).
- [ ] Transcript text visible on the page (needs component code + copy — none exists).
- [ ] Verified on the Vercel preview: embed renders, poster shows before play, 0 console errors.

## BLOCKERS — why I stopped before writing code

1. **The video looks wrong.** It is Aunty Donna's "Bikie Wars" comedy sketch, not a Folio3/Azure
   video. A comedy mix on a corporate About Us page (with an SEO transcript) is almost certainly not
   intended. Need the correct video URL, or explicit confirmation to use this one.
2. **Component code MUST change** to meet the requirements. VideoObject schema + on-page transcript
   do not exist, and there is no generic video item type — the only video path is hardcoded to
   Copilot pages. Per the task ("If you believe component code must change, stop and tell me why
   first") I am stopping. Proposed smallest change (Architect, pending approval):
   - Add a generic `{"t":"video"}` item type handled in `OrderedRenderer` (renders `<VideoEmbed>` +
     a `<section>` transcript block + a `VideoObject` `ld+json` script), OR
     extend `VideoEmbed` to accept `transcript` + schema fields and add an about_us entry to
     `agent-extras.json` with a matching `videoHeading`.
3. **Assets/content needed:** a poster image (saved to `public/wp-content/uploads/...` with true
   w/h) and the transcript text. I have neither. A transcript of a comedy video is nonsensical, which
   reinforces blocker #1.

## Architect / SM / Dev / QA
Not started — gated on the answers above. Will shard into: (S1) video mechanism + schema/transcript
component, (S2) about_us.json / agent-extras wiring, (S3) poster asset, (S4) Playwright verify.
