# Deploying the Webinar Tracker to aiads.salesgenius.co/tracker

The tracker is a single self-contained page. It publishes as part of the existing
`funnel-pages` Netlify site, in a `/tracker` subfolder, so it lands at:

    https://aiads.salesgenius.co/tracker

Password: **SG123!**

---

## 1. Put the file in the funnel

Copy the tracker into the funnel's publish folder:

    funnel-pages/
      index.html
      01-registration.html
      ...
      tracker/
        index.html        ← the tracker  (this is the only required file)

That's it for the page itself. When Netlify deploys `funnel-pages`, the tracker is
live at `/tracker`. The `<meta name="robots" content="noindex">` tag keeps it out
of Google.

---

## 2. Password — pick ONE of these

### Option A — Built-in gate (already on, simplest)
The page shows a branded SalesGenius password screen. Password is `SG123!`
(defined near the top of the `<script>` as `var PW='SG123!'`).
- Pro: nothing else to set up, works on any host, matches the funnel look.
- Con: it's a client-side gate — someone technical could view source and read the
  password. Fine for keeping casual visitors out of an internal dashboard, but it
  is **not** strong security.

Nothing to do — just deploy.

### Option B — Server-side Basic Auth (recommended for real protection)
Locks `/tracker` at Netlify's edge, before the page is ever served. Password lives
in a Netlify env var, never in the page.

1. Copy the edge function into the site:

       funnel-pages/            (publish dir)
       netlify/
         edge-functions/
           tracker-auth.js      ← included in this folder

2. Add to your root `netlify.toml`:

       [[edge_functions]]
         path = "/tracker"
         function = "tracker-auth"

       [[edge_functions]]
         path = "/tracker/*"
         function = "tracker-auth"

3. In Netlify → Site settings → Environment variables, add:

       TRACKER_USER = salesgenius
       TRACKER_PASS = SG123!

4. In `funnel-pages/tracker/index.html`, set `var GATE_ENABLED=true;` to
   **false** so you don't get prompted twice (once by Netlify, once by the page).

Deploy. Visiting `/tracker` now shows the browser's native login (user
`salesgenius`, password `SG123!`); the rest of the funnel stays public.

> Netlify's own built-in "password protect this site" feature is **site-wide**
> and would also lock your public funnel, so we use the edge function to protect
> just the `/tracker` path instead.

---

## 3. Deploy

Whatever you already do for the funnel works — drag-and-drop the `funnel-pages`
folder into Netlify, or push to the connected Git repo. The tracker rides along.

---

## Heads-up: the tracker's data is per-browser

Right now the tracker saves your numbers in **your browser's local storage**. That
means:
- Your data follows the browser you enter it in — not the URL.
- Chris (or you on a different device) will start from the seeded Week 1 and won't
  see numbers you typed elsewhere, unless you use **⬇ Backup** → send him the file
  → he uses **⬆ Restore**.

If you want you and Chris to see the **same live numbers from any device**, the
tracker needs a small shared backend (a database). That's a quick add — just say
the word and I'll wire it up (e.g. Supabase), and then everyone sees one synced
copy.
