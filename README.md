# Azure Marketing Site (Next.js)

A modern rebuild of **[azure.folio3.com](https://azure.folio3.com)** — migrated from WordPress to Next.js — that you can edit **by chatting with Claude in plain English**. No coding knowledge required.

| | |
|---|---|
| 🌐 **Live site** | https://azure-folio3-clone.vercel.app |
| 🏠 **Hosting** | Vercel (auto-deploys from this repository) |
| ⚙️ **Framework** | Next.js 15 · TypeScript · Tailwind CSS |
| 🧪 **Status** | Test mode — forms & analytics are NOT connected to the real CRM/reports, so test freely |
| 👤 **Owner / reviewer** | [@tughral-mav](https://github.com/tughral-mav) — every change needs his approval before going live |

---

## How editing works (the big picture)

You never edit the live site directly. Every change follows one safe loop:

```
You describe the change to Claude (plain English)
        │
        ▼
Claude edits the files on your computer
        │
        ▼
You say: "push this as a pull request"
        │
        ▼
A Pull Request appears on GitHub  ──►  Vercel builds a PREVIEW LINK
        │                              (a full working copy of the site
        ▼                               with your change applied)
Tughral reviews the preview
        │
        ▼
Approved? ──► Merged ──► live on the site in ~2 minutes
Not right? ──► he comments, you adjust, nothing is lost
```

**Nothing ever publishes directly** — the `master` branch is protected, so the live site cannot break unexpectedly.

---

## Part 1 — First-time setup: connect Claude to this repo

Do this **once**. Afterwards, making a change takes a couple of minutes (see Part 2).

### Step 0 — Get access
1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Send your **GitHub username** to Tughral.
3. He adds you as a collaborator — you'll receive an **email invitation from GitHub**. Click **Accept invitation**. (Until you accept, you can't submit changes.)

### Step 1 — Install Git
Git is the free tool that syncs the project between your computer and GitHub.

- Download: https://git-scm.com/downloads
- Run the installer and accept all the default options.

### Step 2 — Install the Claude desktop app
- Download: https://claude.ai/download
- Install it and **sign in with your own Claude account**.

### Step 3 — Download the project to your computer ("clone the repository")

**Easiest way — GitHub Desktop (recommended):**
1. Install **GitHub Desktop**: https://desktop.github.com
2. Open it and **sign in** with the GitHub account from Step 0.
3. Click **File → Clone repository**.
4. Select **`tughral-mav/azure_folio3_clone`** from the list (it appears because you're a collaborator).
5. Note the **Local path** shown (e.g. `Documents\GitHub\azure_folio3_clone`) and click **Clone**.

The project is now a normal folder on your computer.

**Alternative — terminal (if you prefer):**
```bash
git clone https://github.com/tughral-mav/azure_folio3_clone.git
```

### Step 4 — Open the project in Claude
1. Open the **Claude desktop app**.
2. Choose **Open project / Open folder** and select the `azure_folio3_clone` folder you just cloned.
3. That's the connection — Claude can now see and edit the site's files.

### Step 5 — Test the connection
In Claude, type:

> *"What is this project? Which page does the file for the Retail page live in?"*

If Claude answers with details about this site, you're fully connected. ✅

> **Note:** the first time you push a change, GitHub may ask you to sign in — use the same account from Step 0.

---

## Part 2 — Making changes (the everyday loop)

### 1. Open the project in Claude
Open the Claude desktop app → open the `azure_folio3_clone` folder.

### 2. Describe your change in plain English
Be specific: name the **page** and the **exact text/number/image**. Real examples:

> *"On the Healthcare page, change the stat '200+ projects' to '250+ projects'."*

> *"Change the headline on the Retail page to 'Smarter Retail on Azure' and mention real-time inventory in the first paragraph."*

> *"Swap the hero image on the Manufacturing page for the file I've put on my desktop called factory.webp."*

> *"Fix the typo 'anaytics' on the Microsoft Fabric services page."*

Claude finds the right file and makes the edit. You can go back and forth until it's right — nothing is published during this.

### 3. Ask Claude to verify (recommended)
> *"Run the build and confirm nothing is broken."*

### 4. Push it as a Pull Request
> *"Push this as a pull request."*

Claude packages your change and sends it to GitHub as a **proposal**. If Claude says it pushed a branch but couldn't open the PR, just open the repo on GitHub — a green **"Compare & pull request"** button will be waiting; click it once.

### 5. Check your preview
Within ~2 minutes, the Pull Request gets a **Vercel preview link** — a full working copy of the site *with your change applied*. Click it and check your change exactly as visitors would see it.

### 6. Review & go live
Tughral is automatically requested as the reviewer. If the preview looks right he merges it, and the change is **live minutes later**. If not, he'll comment on the PR — reply or ask Claude to adjust, and the same PR updates.

### Tips for smooth changes
- **One focused change per request** — small edits get previewed and approved much faster than big batches.
- **Name the page** ("on the Construction page…") so Claude doesn't have to guess.
- **Pull the latest before starting**: in GitHub Desktop click **Fetch origin → Pull**, or ask Claude to *"pull the latest master first."* This avoids editing an outdated copy.

---

## Ground rules

1. 🚫 **Don't change the home page** — it's approved and signed off. Only touch it if a change is explicitly requested for it.
2. 🚫 **Don't touch deployment config or the lead pipeline** (`vercel.json`, environment variables, `azure-clone-next/src/app/api/lead/`) — production-sensitive.
3. ✅ **Text / number / image changes are the sweet spot** — they live in simple content files (see below) and are low-risk.
4. ✅ **Everything goes through a Pull Request** — never push straight to `master` (it's blocked anyway).
5. 🧪 **The contact form is safe to test** — it's in test mode and doesn't reach the real CRM.

---

## Where things live (repo map)

```
azure_folio3_clone/
├── azure-clone-next/          ← the actual website (Next.js app)
│   ├── content-kit/           ← ★ page CONTENT: headings, paragraphs, stats,
│   │                              tab labels, image references (JSON files).
│   │                              Most text/number changes happen here.
│   ├── src/components/        ← shared page components (cards, tabs, forms…)
│   ├── src/app/               ← pages & routing
│   └── public/wp-content/     ← all images
├── clone-kit/                 ← captured content from the original WordPress site (dev reference)
├── scripts/                   ← dev/audit tooling (image & link audits, capture scripts)
├── verify/                    ← Playwright verification scripts (live-vs-clone comparisons)
├── docs/                      ← project documentation & comparison screenshots
├── archive/                   ← old scratch files (safe to ignore)
└── CLAUDE.md                  ← instructions Claude follows when editing this repo
```

You rarely need to know any of this — Claude navigates it for you. It's here for the curious.

---

## For developers

```bash
cd azure-clone-next
npm ci            # install dependencies
npm run dev       # local dev server → http://localhost:3000
npm run build     # production build — must pass before any PR
```

- Content is data-driven: prefer editing `content-kit/` JSON over component code for text/number/image changes.
- Playwright verification tooling lives in `verify/` (compares clone vs. live site).
- Every PR triggers an automatic **Vercel preview deployment**; `master` auto-deploys to production.
- Branch protection: PRs require approval from the code owner ([`.github/CODEOWNERS`](.github/CODEOWNERS)).

---

## Troubleshooting

| Problem | Fix |
|---|---|
| **"Permission denied" when pushing** | You haven't accepted the GitHub invite (check email), or you're signed into the wrong GitHub account. |
| **Claude edited files but no PR appeared** | Tell Claude: *"push this as a pull request."* If it pushed only a branch, open the repo on GitHub and click **Compare & pull request**. |
| **Preview link asks for a login** | Ask Tughral to disable *Deployment Protection* for previews in Vercel settings. |
| **My edits target old content** | Pull the latest first: GitHub Desktop → **Fetch origin → Pull**, or ask Claude to *"pull latest master."* |
| **I can't approve my own PR** | Correct — GitHub never lets a PR's author review it. Another reviewer (Tughral) approves it. |
| **Build fails after my change** | Ask Claude: *"the build failed — investigate and fix it."* Never merge a red build. |

---

## Going live for real

The site currently runs in **test mode**. At go-live, the production connections get switched on via environment variables in Vercel — Google Tag Manager (`GTM-KDPJWMXH`), HubSpot (portal `5888346`), and spam protection. That swap is a 5-minute, owner-only task and needs nothing from content editors.
