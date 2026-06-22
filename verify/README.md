# Verification Harness (Phase 1)

The automated fidelity gate. The frozen `clone-kit/` capture is the **golden master**;
this harness proves the clone matches it, so "done" is a measured number, not an opinion.

## Run
```bash
# 1) start the clone
cd azure-clone-next && npm run build && npm start    # http://localhost:3000
# 2) in another shell, from repo root:
PLAYWRIGHT_BROWSERS_PATH=d:/AzureClone/.ms-playwright node verify/run.mjs
```
Exit code 0 = all gates green (CI-ready); 1 = a gate failed; 2 = clone not reachable.

## Gates
| Gate | What it checks | Pass threshold |
|---|---|---|
| **visual** (`visual.mjs`) | Screenshots clone, pixel-diffs vs `clone-kit/screenshots/desktop/<slug>.png` | ≥ 98% match |
| **content** (`content.mjs`) | 200, `<title>`, single H1, canonical, meta description, OpenGraph | 6/6 checks |
| **perf** (`perf.mjs`) | JS<150KB, HTML<250KB, no img missing dims (CLS), load<3s | 4/4 checks |
| **links** (`links.mjs`) | Crawls clone, asserts 0 broken internal links + 0 `<a>` leaks to azure.folio3.com | 0 / 0 |

Diff images for failing visual checks are written to `verify/diffs/<slug>.diff.png`.
Full machine-readable results → `verify/report.json`.

## Interpreting current state
Visual gates are **red by design** until Phases 2–3 build pixel-perfect templates — the
harness is correctly reporting that the current scaffold is an on-brand reskin (~64% avg),
not yet a pixel clone. Content failures still open are genuine SEO gaps handled in Phase 6
(home canonical; meta descriptions absent on some pages — missing on the live site too).
