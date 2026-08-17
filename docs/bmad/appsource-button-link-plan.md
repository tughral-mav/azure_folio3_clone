# Plan: "View On AppSource" hero button → Microsoft Marketplace link

**Task slug:** `appsource-button-link`
**Branch:** `claude/appource-button-link-b694a0` (cut for this task; working tree was clean)
**Status:** Dev complete — stories 1 & 2 implemented. Awaiting Vercel preview for QA (story 3).

**User decisions (recorded):**
- Approval for the renderer change: *"No preference"* — proceeded with the recommended 2-line
  fix, since without it the task cannot be delivered at all and the user confirmed both
  downstream details (new tab, URL), which only make sense if we ship.
- Open in a new tab: **yes** (`target="_blank" rel="noopener noreferrer"`).
- The marketplace URL points at the *HR Management with Microsoft Copilot* listing while this
  is the SmartExpense (finance) page. User confirmed: **use the URL exactly as given.** Noted
  in the PR description.

---

## Goal (PM)

On https://azure.folio3.com/ai-agents/smartexpense-agent/ the hero banner button
**"View On AppSource"** currently points at `#pgForm` (the on-page contact form).
Change it to link to:

```
https://marketplace.microsoft.com/en-us/product/saas/folio3software.ai-powered-hr-management-with-microsoft-copilot?tab=Overview
```

### Acceptance criteria
1. The hero button labelled "View On AppSource" has `href` = the marketplace URL **exactly**, including the `?tab=Overview` query string.
2. The other two hero buttons ("Request a Callback" → `#pgForm`, "Video Demo" → `#vidDemo`) are unchanged.
3. Hero image + zoomIn/float animation still render (render contract #1).
4. No other page is affected.

---

## Analyst — what is actually in the files

### The page content file
`azure-clone-next/content-kit/content/ai_agents_smartexpense_agent.json`

There is **no bespoke route** (`find src/app -ipath "*smartexpense*"` → no results), so the
page renders through the generic catch-all route → `CapturedRenderer` → and because the
section has a non-empty `items[]`, → `OrderedRenderer` (CapturedRenderer.tsx:66).

The hero is section index 1. `"View On AppSource"` appears **twice** in the file:

- **line 287–291** — inside the live `items[]` stream:
  ```json
  { "t": "cta", "text": "View On AppSource", "href": "#pgForm" }
  ```
- **line 324–327** — inside the legacy `ctas[]` duplicate (ignored while `items[]` exists,
  per render contract #2, but kept in sync by convention).

### THE BLOCKER — external hrefs are silently rewritten into internal ones

`OrderedRenderer.tsx:27-28`:
```ts
const cleanCta = (text: string, href: string | null): Cta | undefined =>
  text && href && href !== '#' ? { text: text.trim(), href: localAsset(href) || href } : undefined;
```

`src/lib/content.ts:91-98`:
```ts
const ORIGIN = 'https://azure.folio3.com';

export function localAsset(src: string | null | undefined): string {
  if (!src) return '';
  if (src.startsWith('data:')) return '';
  return src.replace(ORIGIN, '').replace(/^https?:\/\/[^/]+/, '');
}
```

That second `.replace()` strips **any** scheme+host, not just the site's own. So:

```
localAsset("https://marketplace.microsoft.com/en-us/product/saas/folio3software...?tab=Overview")
  → "/en-us/product/saas/folio3software...?tab=Overview"     // non-empty
```

and because `cleanCta` uses `localAsset(href) || href`, the non-empty stripped value **wins**.
The button would render as `<Link href="/en-us/product/saas/...">` — a link to
`azure.folio3.com/en-us/product/...`, i.e. a **404 on our own site**.

This fails silently: the build is green, the button is visible, the label is right, and only
clicking it reveals the 404.

### Confirmation that this is by design, not an accident
Every absolute href currently in the whole `content-kit/` is our own origin:
```
47  "href": "https://azure.folio3.com/microsoft-fabric-services/"
 4  "href": "https://azure.folio3.com/microsoft-licensing-process/"
 2  ... data-science-ai / case-studies / azure-for-retail / -manufacturing / -healthcare / "/"
 2  "href": "http://pgForm"
```
`grep -rn "marketplace.microsoft|appsource.microsoft|azuremarketplace"` over
`azure-clone-next/` → **no matches**. There is no third-party outbound link anywhere in this
codebase yet. `localAsset` was written for the site capture, where every absolute URL was our
own host, so "strip any host" was safe. It is not safe for a genuine external link.

### Second, smaller issue
Hero CTAs render through next/link `<Link>` (OrderedRenderer.tsx:160) with no
`target`/`rel`. An external link will open in the same tab.

---

## Architect — smallest change that satisfies the goal

A JSON-only edit **cannot** work: whatever external URL is put in the JSON, `cleanCta`
truncates it to a same-site path. Component code must change.

**Proposed minimal fix — 2 lines, one file** (`src/components/OrderedRenderer.tsx:27-28`):

```ts
// Absolute URLs to OTHER hosts are genuine outbound links — localAsset() would strip
// the host and turn them into same-site 404s. Only our own origin gets localised.
const isExternalHref = (h: string) => /^https?:\/\//i.test(h) && !h.startsWith(ORIGIN);
const cleanCta = (text: string, href: string | null): Cta | undefined =>
  text && href && href !== '#'
    ? { text: text.trim(), href: isExternalHref(href) ? href : (localAsset(href) || href) }
    : undefined;
```

Why this is safe:
- Relative hrefs (`#pgForm`, `/contact-us/`) — untouched, `isExternalHref` is false.
- Our own absolute hrefs (all 61 in content-kit) — untouched, still localised.
- Third-party absolute hrefs — the only changed behaviour, and today they are 100% broken,
  so there is nothing that can regress.

Open question for the user: also add `target="_blank" rel="noopener noreferrer"` for external
hero CTAs? (one more line at OrderedRenderer.tsx:160). Marketing convention is yes.

Not proposed: changing `localAsset` itself — it is used repo-wide for images (`localImg`
builds on it) and widening its blast radius for one link is the wrong trade.

---

## SM — stories

| # | Story | File | Status |
|---|-------|------|--------|
| 0 | Get approval for the component change | — | **awaiting user** |
| 1 | Preserve external hrefs in `cleanCta` | `src/components/OrderedRenderer.tsx` | blocked on #0 |
| 2 | Point the hero CTA at the marketplace URL (`items[]` + legacy `ctas[]`) | `content-kit/content/ai_agents_smartexpense_agent.json` | blocked on #1 |
| 3 | Build + Playwright verify, open PR, load preview | — | blocked on #2 |

## QA checklist for story 3
- rendered hero `<a>` for "View On AppSource" has the full marketplace URL incl. `?tab=Overview`
- "Request a Callback" → `#pgForm`, "Video Demo" → `#vidDemo` unchanged
- hero image present, Reveal wrapper present, image HTTP 200
- every heading/paragraph in the JSON present in the rendered HTML
- 0 fallback checkmarks, 0 console errors, no duplicated CTA band
- other pages' CTAs spot-checked (regression check on the shared renderer)

## Environment note
Node/npm and Python are **not installed** on this machine (`node: command not found`,
`Python was not found`). Local `npm run build` / Playwright cannot run here. Verification
must happen on the Vercel preview build from the PR. See memory `node-not-installed-locally`.
