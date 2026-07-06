# How to change the website (no coding needed)

You change the site by describing what you want in plain English to **Claude
Code**, which makes the change as a *draft* you preview before it goes live.
Nothing you do can break the real website — `master` (the live site) is locked,
so nothing publishes without your approval.

---

## 1. Open Claude Code and pick the site
1. Go to **https://claude.ai/code** and sign in.
2. Above the message box, make sure the repository is set to
   **`azure_folio3_clone`**. (The branch may say **master** — that's just the
   *starting point* it reads from. Leave it; it does **not** mean it edits the
   live site.)

## 2. Ask for the change
Type what you want in plain English. Be specific — say **which page** and
**exactly what** to change. Example:

> On the IT Asset Management page, change the headline to
> "Automate Your IT Assets with AI".

Press Enter. Claude makes the change in its own cloud workspace — the live site
is untouched.

## 3. Turn it into a preview
1. When it's done, click **Create PR** (Pull Request).
2. Open that Pull Request on GitHub.
3. Wait ~1–3 minutes for a **Vercel** comment with a **"Visit Preview"** button,
   and click it.
4. That shows the website **with your change** on a private link — the real site
   is still untouched.

## 4. Publish it — or throw it away
- 👍 Happy? Click the green **Merge** button on the Pull Request → it goes live in
  a couple of minutes.
- ✏️ Want a tweak? Go back to Claude Code, say what to change, and create the PR
  again.
- 🗑️ Don't want it? Click **Close** on the Pull Request → it disappears.

---

## Tips for good requests
- Name the **exact page** and quote the **exact words** to change.
- **One change per request** is easiest to preview.
- For an image, describe what to replace (and attach the new image if you have one).

## Why it's safe
- **`master` (the live site) is locked** — nothing can publish without going
  through a Pull Request you approve.
- A broken change is automatically **blocked from going live**.
- Every change is saved and can be **undone** later.
