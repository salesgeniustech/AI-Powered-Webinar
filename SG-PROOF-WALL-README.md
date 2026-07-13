# SalesGenius Proof Wall — Global Testimonial Component

A single JS file that renders the full SalesGenius social-proof grid (videos + screenshots) on any funnel page. Edit the proof in ONE place; every funnel that loads it updates automatically.

**Canonical copy:** `inhouseteam-funnel/assets/proof-wall.js` in the AI Powered Webinar project → live at `https://inhouseteam.salesgenius.co/assets/proof-wall.js` once the site is deployed.

## Install on any funnel (2 lines)

```html
<div class="sg-proof-wall"></div>
<script src="https://inhouseteam.salesgenius.co/assets/proof-wall.js"></script>
```

On any domain OTHER than inhouseteam.salesgenius.co, add `data-base` so self-hosted videos/images resolve:

```html
<div class="sg-proof-wall" data-base="https://inhouseteam.salesgenius.co"></div>
```

## Options (attributes on the div)

| Attribute | Effect |
|---|---|
| `data-base="https://…"` | Prefix for relative video/image paths. Required off-domain. |
| `data-max="6"` | Show only the first N items (e.g. a shorter wall on a squeeze page). |
| `data-disclaimer="off"` | Hide the results disclaimer line. |

## Editing the proof

Open `proof-wall.js`, edit the `ITEMS` array at the top. Order = display order (videos first, then screenshots — Emma's rule). Item shapes:

```js
{type:'vimeo', id:'1181221035', h:'5b16d8c67c', cap:'Caption'}   // Vimeo (id + hash from the share link)
{type:'grain', id:'full-40-char-share-id',      cap:'Caption'}   // Grain highlight
{type:'mp4',   src:'assets/video/x.mp4', cap:'Caption', vertical:true}  // self-hosted
{type:'img',   src:'assets/img/proof/x.png', alt:'What it shows'}       // screenshot
```

## Current inventory (15 live + 4 pending)

**Videos (11):** Joe & Kyle (Grain), Clair $20K→$115K, Amir 3 appointments, Nicole 5 deals, $11 leads, Oudi, Myles $350K→$725K, Dorian (why he trusts SG — not a client), Peter, James (vertical), Shar.
**Screenshots (4):** first-deal SMS, Lofty record Q1 email, live-training chat, Steph Cadmus.
**Pending (auto-hidden until the file exists):** chat-wall-1, Charlotte email, Eric email, Zoom room — drop the PNGs into `assets/img/proof/` with those exact names and they appear.

## Rules & gotchas

- **Real proof only.** Never typed/AI-fabricated testimonials. Dorian is NOT a client — his caption must stay "why he trusts SG."
- Vimeo videos must have **link sharing on** (the `h=` hash embed); Grain highlights need link sharing enabled too. If someone toggles privacy, tiles go black.
- Missing images hide themselves (onerror) — a bad filename fails silently, so check the page after edits.
- Self-hosted videos are compressed to 720p (ffmpeg crf 26) to keep the deploy under Netlify Drop limits.
- The disclaimer line is legally deliberate — leave it on for sales pages.
