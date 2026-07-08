# Workflow 10 — Automated Date Rotation for Landing Pages

> **Purpose.** The landing page, the registration page, and any sales page that says "Join us this Wednesday at 11 AM" should rotate to the next webinar automatically. No human edits the HTML between webinars. Emma can be on a plane and the site is still correct.

> **Cadence.** Weekly, every Wednesday at 11:00 AM Eastern (America/Toronto), starting June 10, 2026. 60-minute show.

---

## 1. Two Layers, Not One

We solved this last round by promising "we'll set up a cron job." The real architecture is two pieces working together:

### Layer 1 — Page-load auto-rotation (the always-on layer)
A small JavaScript file (`site/assets/js/webinar-date.js`) computes the next upcoming Wednesday 11 AM ET on *every page load* and paints it into the HTML. This means:

- Nothing has to "fire" at 12:01 PM on a Wednesday for the date to roll forward — it rolls forward the moment someone loads the page.
- No deploy is required.
- No build step is required.
- It works on Netlify static hosting with zero serverless cost.
- If we deploy a static export and forget about it for a year, the date is *still* correct.

This is the layer that does the actual work. It replaces the "cron job" most teams build.

### Layer 2 — Weekly team prep ping (the human layer)
A scheduled Claude task that fires every **Tuesday at 9 AM ET** — 26 hours before each webinar — to:
- Confirm the upcoming Wednesday is *actually* on (no skip)
- Surface the registration count and any ops issues
- Hand the team a pre-flight brief

This isn't what's keeping the page correct. The page is correct on its own. This is what keeps *humans* synced.

---

## 2. How To Use The Page Script

### Include it once per page

```html
<!-- Add to <head> with defer, or to the bottom of <body> -->
<script src="/assets/js/webinar-date.js" defer></script>
```

### Drop these into your HTML wherever a date appears

| Markup | What renders |
|---|---|
| `<span data-webinar-date></span>` | `Wednesday, June 10, 2026` |
| `<span data-webinar-date="long"></span>` | `Wednesday, June 10 at 11:00 AM ET` |
| `<span data-webinar-date="short"></span>` | `Jun 10` |
| `<span data-webinar-date="iso"></span>` | `2026-06-10T15:00:00Z` (for `datetime=` attrs) |
| `<span data-webinar-day-of-week></span>` | `Wednesday` |
| `<span data-webinar-time></span>` | `11:00 AM ET` |
| `<span data-webinar-countdown></span>` | `3 days from now`, `tomorrow`, `live now`, etc. |

### Example registration page snippet

```html
<h1>Join us live this <span data-webinar-day-of-week></span>
    at <span data-webinar-time></span></h1>
<p>The next workshop is <strong><span data-webinar-date="long"></span></strong>
   — that's <span data-webinar-countdown></span>.</p>
```

---

## 3. Behaviour Rules

These are the rules baked into the script. Knowing them matters if anyone goes to debug it.

1. **"Next webinar"** = the next Wednesday 11:00 AM ET that has not yet *started*.
2. The current week's webinar stays displayed until 11:00 AM ET on its Wednesday — then it rolls forward to the following Wednesday immediately. So if someone lands on the page at 11:30 AM ET on June 10 during the live show, they see *June 17*. (Intentional: anyone landing during the live show is too late to register; we want them queued for the next one.)
3. If a Wednesday is in `SKIP_DATES` inside the script, the script rolls past it. Use this for holidays.
4. Times are in `America/Toronto` and are DST-aware (the script uses `Intl.DateTimeFormat` with the IANA timezone, so EDT vs. EST is handled correctly).
5. The script does not depend on the user's clock being correct — it uses their browser clock as a reference but the displayed time is always the venue's local time (ET).

---

## 4. Skipping A Week

Open `site/assets/js/webinar-date.js`, find `SKIP_DATES`, and add the Wednesday you want to skip:

```js
const SKIP_DATES = [
  '2026-12-23', // Christmas week — no webinar
];
```

Commit, push to Netlify. Done. The page now rolls past that Wednesday.

> If you need to skip the *current week's* webinar after it has already shown on the page, add it to `SKIP_DATES` and redeploy. The page will switch immediately.

---

## 5. Adding A One-Off Webinar (Off Cadence)

The current script only knows "every Wednesday." If we add a Tuesday special, a holiday encore, or anything off-cadence, two options:

**Option A — Simple:** override the next date manually for that week. Add a `OVERRIDE_DATES` array (todo, not implemented yet) and the script returns that specific timestamp.

**Option B — Cleaner long-term:** switch from "compute the cadence" to "read from a JSON schedule file." When we hit our second off-cadence event, do this. Until then, Option A is fine.

---

## 6. The Weekly Team Prep Ping (Layer 2)

> **Status:** This is set up via Claude scheduled tasks — see "Setup instructions" below. Emma can approve creation when ready.

**Trigger:** Every Tuesday at 9:00 AM ET, starting Tuesday June 9, 2026.

**What it produces** (a Claude conversation that delivers a brief):
1. Confirms the upcoming Wednesday is *on* (not in `SKIP_DATES`)
2. Pulls registration count from the ESP if connected — flags if below threshold
3. Reminds the team to:
   - Check the Stripe dashboard for the LTO product is live
   - Smoke-test the registration form
   - Verify the Skool invite link still works
   - Confirm Chris's Calendly is open for next Thursday/Friday
4. Lists any open inbound emails in the admin inbox that need response before show day

**Setup instructions** (when Emma approves):
> Tell me "set up the Tuesday team-prep ping" and I'll create the scheduled task with a cron expression of `0 9 * * 2` (every Tuesday 9 AM) and the prompt template above.

---

## 7. Failure Modes & Fallback

### "The page is showing the wrong date"
- Open the page in an incognito window and check again (some browsers cache JS aggressively).
- If still wrong, open browser DevTools → Console. Look for `NEXT_WEBINAR` — that's the resolved object the script computed. If it's empty, the script didn't load (404, syntax error, CSP block).
- If the script loaded but the date is wrong, check `SKIP_DATES` for accidental entries.

### "The script broke and the page shows nothing"
The script paints text *into* `<span>` elements. If the script doesn't run, those spans stay empty and the page reads "Join us live this   at  ." This is jarring. Mitigation: put a *fallback* date inside each span:

```html
<span data-webinar-date>Wednesday, June 10, 2026</span>
```

The script overwrites the contents on load. If the script fails to load, the fallback stays. **All landing pages should ship with a fallback inside every data-webinar-* span.**

### "I'm not technical and I need to change the date right now"
Manual override path:
1. Open `site/assets/js/webinar-date.js`.
2. Find `SERIES_START_ISO`.
3. Replace the date with the Wednesday you want to be next.
4. Commit, push. Netlify redeploys in ~60 seconds.

---

## 8. What "Done" Looks Like

- [x] `site/assets/js/webinar-date.js` exists and is referenced in `index.html`, `webinar.html`, and `offer.html`.
- [ ] Every dynamic date span has a fallback inside it (see section 7).
- [ ] Smoke test: load each page on June 8 and confirm "June 10" displays; load again on June 11 and confirm "June 17" displays.
- [ ] Scheduled team-prep ping is set up (Emma approval pending).

---

## What This Run Taught Us

> Append after first webinar:
- Did the date roll forward at the right time? (i.e. did anyone land on the page at 11:30 AM ET on June 10 and see *June 10* when we wanted them to see *June 17*?)
- Any timezone confusion from non-Eastern visitors?
- Did the fallback render correctly when JS was blocked?
