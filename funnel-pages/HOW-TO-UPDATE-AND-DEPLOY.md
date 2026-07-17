# Weekly update + deploy

**Live site:** https://salesgenius-masterclass.netlify.app
**Netlify project:** `salesgenius-masterclass` (in your SalesGenius account)

## 1. Change the date (TWO files, two lines each)

The date lives in a single config block near the bottom of two files. Edit both so the whole funnel matches.

**a) `index.html`** (the registration page / homepage):
```js
var WEBINAR = {
  dateText:  "July 22 at 12 PM EDT",         // the words shown everywhere on the page
  targetISO: "2026-07-22T12:00:00-04:00"      // the countdown target
};
```

**b) `02-confirmation.html`** — same two lines, keep them identical.

- **dateText** auto-fills every spot on each page (banner, button, FAQ, calendar links). You do NOT edit those individually.
- **targetISO** drives the countdown. Timezone offset:
  - `-04:00` = EDT (roughly Mar to Nov)
  - `-05:00` = EST (roughly Nov to Mar)

Save. That's the whole weekly change.

## 2. Redeploy (to the SAME project, so the URL stays the same)

- Go to https://app.netlify.com/projects/salesgenius-masterclass/deploys
- Drag the whole **`funnel-pages`** folder onto the "Drag and drop your project folder here to deploy new changes" area.
- Live in a few seconds, same URL.

Or just tell me "update the masterclass to [date/time] and redeploy" and I'll do it.

## Notes
- **The registration page is `index.html`.** The old `01-registration.html` is no longer used (it's excluded from deploys). Edit `index.html`, not the old file.
- Every "Claim Your Free Seat" button opens the same Typeform popup. If the Typeform script is ever blocked, the button falls back to opening the form in a new tab.
- `Lead` pixel fires on Typeform submit; `Schedule` (primary) fires on the confirmation page load.
- These pages only work on the live URL, not by double-clicking the .html files (the video, popup, and booking widget need a real web address).

## One-time Typeform setup (so the popup captures + tracks properly)
- In the Typeform (`IjOr8yfc`), add **hidden fields**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`. The page passes ad UTMs into these automatically.
- Optional: set the Typeform ending to redirect to the confirmation URL. (The page also redirects to `02-confirmation.html` on submit, so this is belt-and-suspenders.)
