# Plan: change internal link to google.com on real-time data streams blog

Task slug: blog-fabric-realtime-link-google
Branch: claude/blog-link-google-update-pxbxg2

## Analyst — what I found (quoted from the real files)
- Page URL: /blog/managing-real-time-data-streams-efficiently-with-microsoft-fabric/
- Content file: content-kit/content/blog_managing_real_time_data_streams_efficiently_with_microsoft_fabric.json
- Rendered via `bodyHtml` + dangerouslySetInnerHTML (src/app/blog/[slug]/page.tsx:71).
  Blog pages do NOT use the items[]/OrderedRenderer path, so the render contract
  about items[]/hero/cards does not apply here.
- content.ts:430 strips `https://azure.folio3.com` from bodyHtml, so the link is
  stored as the relative path `/blog/components-of-microsoft-fabric-architecture/`.
- The target link appears twice on one line, both in the "Microsoft Fabric's
  architecture" sentence:
  1. `<a href="/blog/components-of-microsoft-fabric-architecture/"></a>` (empty, WP export artifact)
  2. `<a href="/blog/components-of-microsoft-fabric-architecture/" target="_blank" rel="noreferrer noopener">Microsoft Fabric's architecture</a>` (the visible link)

## PM — goal & acceptance criteria
- Goal: the "Microsoft Fabric's architecture" link points to google.com instead of
  the internal /blog/components-of-microsoft-fabric-architecture/ page.
- Acceptance: rendered HTML for the page contains an anchor to google.com and no
  longer references components-of-microsoft-fabric-architecture; build passes.

## Architect — smallest change
- Replace both occurrences of the relative URL with `https://www.google.com/`
  as a surgical text replace (no JSON reformat). External URL is not stripped by
  content.ts. Keep existing target/rel attributes.

## SM/Dev/QA
- Story 1: edit the JSON (surgical). 
- QA: rebuild, confirm rendered page links to google.com, 0 refs to old path.
