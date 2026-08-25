# Weekly update + deploy

**Live site:** https://salesgenius-masterclass.netlify.app
**Netlify project:** `salesgenius-masterclass` (in your SalesGenius account)

## 1. Change the date (ONE http request — no deploy needed)

The date lives in Netlify Blobs and both pages fetch it on load from `/api/webinar-date`.
To change it, send a single request (from n8n, curl, anywhere):

```bash
curl -X POST https://salesgenius-masterclass.netlify.app/api/webinar-date \
  -H "Authorization: Bearer $WEBINAR_UPDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"date": "2026-08-04 12:00"}'
```

- One field only. `"2026-08-04 12:00"` is assumed **Eastern time**; the EDT/EST offset and the display text ("August 4 at 12 PM EDT") are generated automatically. A full ISO string with offset also works.
- The change is live within ~60 seconds (pages cache the GET for 60s). No redeploy.
- The secret is the `WEBINAR_UPDATE_SECRET` env var in Netlify (Site settings → Environment variables). Same value goes in the n8n HTTP node's credential.
- The `var WEBINAR = {...}` block still in `index.html` / `02-confirmation.html` is only a **fallback** if the API is unreachable — update it occasionally so the fallback isn't ancient, but it's not the weekly workflow.

Check what's currently set: `GET https://salesgenius-masterclass.netlify.app/api/webinar-date`

## 2. Change the replay video (also one http request)

The replay video on `03-replay.html` works the same way, at `/api/replay-video`:

```bash
curl -X POST https://salesgenius-masterclass.netlify.app/api/replay-video \
  -H "Authorization: Bearer $WEBINAR_UPDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://grain.com/share/highlight/AbC123"}'
```

- Paste the **normal share link** — the embed URL is derived for you. Works with Grain, Vimeo, YouTube, Loom, and Wistia; anything else is rejected (that allowlist is deliberate, so a leaked secret can't put arbitrary content in the iframe).
- Optional second field: `"caption": "▶ Watch the August 4 replay."` to change the line under the video.
- Same secret as the date endpoint. Live within ~60 seconds, no redeploy.
- Check what's set: `GET https://salesgenius-masterclass.netlify.app/api/replay-video`
- The `src` on the iframe in `03-replay.html` is only the fallback if the API is unreachable.

## 3. Deploying page/code changes (only when you edit the pages themselves)

Deploy via Netlify CLI from the repo root (`netlify deploy --prod`) or link the repo in Netlify.
**Drag-and-drop no longer works** — it skips `netlify/functions/`, which the date API needs.

## Notes
- **The registration page is `index.html`.** The old `01-registration.html` is no longer used (it's excluded from deploys). Edit `index.html`, not the old file.
- Every "Claim Your Free Seat" button opens the same Typeform popup. If the Typeform script is ever blocked, the button falls back to opening the form in a new tab.
- `Lead` pixel fires on Typeform submit; `Schedule` (primary) fires on the confirmation page load.
- These pages only work on the live URL, not by double-clicking the .html files (the video, popup, and booking widget need a real web address).

## One-time Typeform setup (so the popup captures + tracks properly)
- In the Typeform (`IjOr8yfc`), add **hidden fields**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`. The page passes ad UTMs into these automatically.
- Optional: set the Typeform ending to redirect to the confirmation URL. (The page also redirects to `02-confirmation.html` on submit, so this is belt-and-suspenders.)
