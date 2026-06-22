# Mistakes Log — patterns to avoid repeating

A candid record of mistakes made building the clone, and the rule each one taught.

## Build & process

1. **Tested against a stale build.** Next.js caches prerenders; editing a component and re-checking without a fresh build showed old output and sent me chasing phantom bugs.
   → **Rule:** before gating any change, `Stop node` → `rm -rf .next` → `npm run build` → fresh `npm start`. Never trust an in-place result.

2. **Overlapping background commands corrupted a build.** A `Stop-Process node` from one command killed another command's build mid-static-generation, leaving no `prerender-manifest.json` and a broken server.
   → **Rule:** never run `Stop-Process node` while a build is in flight. Run builds to completion synchronously; don't fire concurrent commands that touch the same `.next` or kill node.

3. **Used image paths without checking the disk.** Wrote `2024/01/our-blog-banner.webp` when the file was at `2023/06/`. Assumed the year folder.
   → **Rule:** always `find … -iname` the exact on-disk path before referencing an asset; never guess the `uploads/YYYY/MM/` folder.

## Verification

4. **Trusted a timing-sensitive count over the source of truth.** My `dvcheck` (Playwright `naturalWidth` count) under-reported images due to lazy-load timing, making me think the card-icon fix had failed — when the HTML already contained the icons.
   → **Rule:** confirm "is it rendered?" by grepping the served HTML, not only a timing-sensitive headless count. Use the count for trends, the HTML for truth.

5. **Tested the image optimizer with the wrong tool.** `curl -o /dev/null -w %{size_download}` returned 0 for both working and broken images, giving a false signal.
   → **Rule:** pick a verification method that actually exercises the thing (load it in the browser / check the real response), and sanity-check the tool against a known-good case first.

## Heuristics & data

6. **Shipped (nearly) an unreliable extraction.** The general span/div sub-heading capture grabbed footer copyright and cross-section text. I almost wired it into the renderer, which would have *added wrong headings* to many pages.
   → **Rule:** never apply re-captured data without eyeballing it for noise first. Adding wrong content is worse than leaving a small gap. (I left `subheads.json` unused on purpose.)

7. **Wrote heuristics that were too broad.** The first n-tabs detector and the "redirect shadows a real page" check both produced false positives (matched normal feature lists / all 62 redirects).
   → **Rule:** start tight, widen only with evidence. A detector that fires on the wrong sections is a regression generator. Verify a heuristic against a sample before relying on its output.

8. **Over-aggressive image suppression caused a regression.** Fixing the why-choose stray photo, I suppressed *all* small images in text sections — which hid a legit illustration on `data-integration`'s "Learn More".
   → **Rule:** scope a fix to the exact condition that needs it (here: gate on `bullets.length`), then re-run the broad audit to catch collateral damage before moving on.

## Tooling specifics

9. **Misused a script's argument convention.** Passed `"design"` to `extract-flips` as if it meant "all design pages" — but that script treats arg[2] as a single route, so it tried to load `…comdesign` and returned 0.
   → **Rule:** know each script's arg contract (single-route vs no-arg-means-all) before invoking; a "0 results" run usually means I called it wrong, not that the data is absent.

10. **Parsed a field without inspecting its real shape.** The slides "heading" had the icon embedded as *escaped `<img>` HTML text*, so `textContent` returned the raw tag — and the first render printed `<img …>Discovery and Assessment` on the page.
    → **Rule:** print one raw sample of any re-captured field before rendering it; don't assume `textContent` is clean.

11. **Assumed a page's render path without checking routing.** Spent time inspecting `testimonials.json` when the page was actually a hardcoded *redirect* to `/about-us/`.
    → **Rule:** when rendered content doesn't match the capture, check redirects/routing first (`curl -I`, the redirect map) before debugging the data.

## Cross-cutting lessons

- **Re-run the full 60-page audit after every change to a shared file** (`OrderedRenderer`, `parse`, `content.ts`). Several regressions were only caught because the full audit ran, not the spot-check.
- **The live has non-determinism** (lazy-loaded sliders). Don't chase a 100% match on a value the live itself renders inconsistently; add the verified target directly instead.
- **"Approved" ≠ "complete".** The home was visually approved but still had real DOM-level gaps (hidden-tab icons/links). Re-check even approved pages against the checker.
