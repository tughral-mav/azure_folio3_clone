# How to change the website (no coding needed)

You can change the site just by writing what you want in plain English — an AI
assistant (Claude) makes the change for you. Every change is shown to you on a
private **preview link before it goes live**, and nothing you do can break the
real website. Here's the whole process.

---

## 1. Ask for a change

1. Open the project's **Issues** page:
   https://github.com/tughral-mav/azure_folio3_clone/issues
2. Click the green **New issue** button.
3. Type **`@claude`** followed by what you want. Be specific — say **which
   page** and **exactly what** to change. Example:

   > @claude On the IT Asset Management page, change the big headline to
   > "Automate Your IT Assets with AI".

4. Click **Submit new issue**.

That's all. Within a few minutes the assistant replies and opens a **Pull
Request** — think of it as a proposed change waiting for your approval.

---

## 2. Preview the change before it's public

1. Open the Pull Request the assistant created (it will link you to it).
2. Wait ~1–2 minutes for a comment from **Vercel** with a **"Visit Preview"**
   button, and click it.
3. The preview shows the website **with your change applied** — only people with
   the link can see it. The real site is still untouched.

---

## 3. Publish it — or throw it away

- **Happy with it?** Click the green **Merge** button on the Pull Request.
  Your change goes live in a couple of minutes.
- **Want a tweak?** Add a comment on the Pull Request starting with `@claude`
  (e.g. *"@claude make the headline shorter"*) and it updates the same preview.
- **Don't want it?** Click **Close** — the change disappears as if it never
  happened.

---

## Tips for good requests
- Name the **exact page** ("the KubeMonitor page", "the contact page").
- Quote the **exact words** to change, and the new words you want.
- For an image, describe what to replace and attach the new image to the issue.
- Keep it to **one change per request** — easier to preview and approve.

## Good to know
- The real website **cannot break** — changes only go live when you click
  **Merge**, and a broken change is automatically blocked from publishing.
- Every change is saved and can be undone later.
- Each request uses a small amount of AI credits from the project's Anthropic
  account.
