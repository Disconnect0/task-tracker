# Class Tracker Template

A single-page class schedule, academic year calendar, and assignment/quiz/project
tracker. No build step, no framework — just static files you can host anywhere.
Cross-device sync is optional and, if you want it, runs on Cloudflare's free tier.

## Features

- Weekly class schedule with a live "which class am I in right now" highlight
- Year-long academic calendar with an upcoming-events list
- Task/quiz/project tracker with due-date badges, status, search, and filtering
- JSON export/import for manual backups
- Light/dark theme
- Optional cross-device sync via a small Cloudflare Worker (everything still
  works with this switched off — it just stays local to each browser)

## Quick start

1. **Use this template.** Click "Use this template" on GitHub (or fork the repo).
2. **Edit `config.js`.** This is the only file you need to touch for basic
   setup — your site title, courses, weekly schedule, academic calendar, and
   starting tracker data all live there, each with comments explaining the
   expected format.
3. **Open `index.html`.** That's it — it runs entirely in the browser. Double-click
   it locally, or see "Hosting" below to put it online.

By default `WORKER_URL` in `config.js` is left as a placeholder, so the tracker
runs in **local-only mode**: everything is saved in that one browser, nothing
is shared between devices. That's a completely valid way to use this — skip
straight to "Hosting" if you don't need sync.

## Optional: cross-device sync

To share one tracker across your own devices (or with classmates), deploy
`worker.js` to Cloudflare Workers:

1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), create a
   **KV namespace** (Workers & Pages → KV) — call it whatever you like.
2. Create a new **Worker**, paste in the contents of `worker.js`, and bind
   your KV namespace to it under **Settings → Variables → KV Namespace
   Bindings**, with the variable name `TRACKER_KV`.
3. Under **Settings → Variables**, add an **encrypted** variable named
   `API_TOKEN` and set it to a password of your choosing. This is the
   password the app will ask for before saving changes — don't skip this
   step, since the worker refuses to accept any writes at all until it's set.
4. Deploy, and copy the Worker's URL (something like
   `https://your-worker-name.your-subdomain.workers.dev/`).
5. Paste that URL into `WORKER_URL` in `config.js`.

If you'd rather use the `wrangler` CLI instead of the dashboard, a minimal
`wrangler.toml` looks like:

```toml
name = "class-tracker-api"
main = "worker.js"
compatibility_date = "2024-01-01"

kv_namespaces = [
  { binding = "TRACKER_KV", id = "<your-kv-namespace-id>" }
]
```
Then set the secret with `wrangler secret put API_TOKEN` and deploy with
`wrangler deploy`.

## Hosting the site itself

`index.html` and `config.js` are static files — any static host works
(GitHub Pages, Netlify, Vercel, Cloudflare Pages). For GitHub Pages:

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**, pick your
   default branch and `/ (root)`, and save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## File overview

| File          | What it's for                                                   |
|---------------|------------------------------------------------------------------|
| `index.html`  | The app itself — layout, styling, and all logic. Shouldn't need editing for normal use. |
| `config.js`   | Everything you'd actually want to customize. Start here.        |
| `worker.js`   | Optional Cloudflare Worker for cross-device sync. Only needed if you want that. |

## License

MIT — see [LICENSE](LICENSE) for details.
