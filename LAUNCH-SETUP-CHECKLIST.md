# Sprint Launch — Team Setup Checklist

**The order matters.** Each phase unblocks the next. Live URL when done: **aiteam.salesgenius.co** (its own Netlify site — completely separate from aiads.salesgenius.co).

---

## Phase 1 — Site & domain — Arslan

- [x] **DONE (July 13):** site deployed to its own new Netlify project **`ai-in-house-team`**, live at https://ai-in-house-team.netlify.app (all 3 pages verified; pretty URLs /checkout and /welcome work)
- [x] **DONE (July 14):** custom domain live — https://aiteam.salesgenius.co (SSL active)
- [ ] **Arslan:** push the local git commits to github.com/salesgeniustech/AI-Powered-Webinar (repo is source of truth; Netlify Drop is the deploy mechanism)

**Redeploys after any page edit:** drag the `aiteam-funnel` folder onto THIS site's Deploys page. Never onto the aiads site.
**Note:** self-hosted testimonial videos are compressed for deploy; originals are in git history if higher quality is ever wanted.

---

## Phase 2 — Stripe (Rebecca) — blocks checkout going live

- [ ] **Product:** "The 30-Day In-House AI Team Install" — **$2,997 USD, one-time** (start in test mode)
- [ ] **Payment Link:** collect name, email, phone · quantity locked to 1 · promo codes OFF
- [ ] **Success URL:** `https://aiteam.salesgenius.co/welcome.html` (this is the whole onboarding trigger — don't skip)
- [ ] **Receipts ON:** email receipts · statement descriptor "SALESGENIUS" · correct tax settings
- [ ] **Hand off to Matyas:** the Payment Link + a webhook signing secret for `checkout.session.completed` — he wires the emails from there
- [ ] **Paste the Payment Link** into `aiteam-funnel/checkout.html` — search `STRIPE_PAYMENT_LINK` (Meta InitiateCheckout event is already wired to the button) → redeploy
- [ ] **Test mode end-to-end:** test card → lands on welcome.html → tag applied → Email 0 fires
- [ ] **Live mode + one real-card purchase** (refund it) before ads turn on
- [ ] ⏳ **Pending Emma/Ryan:** 2-pay option (e.g. 2 × $1,600)? If yes → second Payment Link, same success URL, secondary button on checkout page

---

## Phase 3 — Post-purchase automation (Matyas + Rebecca)

Full email copy: **`emails/sprint_onboarding_sequence.md`** (5 emails + 3 SMS + automation logic).

- [ ] **Matyas:** wire the Stripe webhook `checkout.session.completed` → ESP tag `sprint-buyer`
- [ ] **Matyas:** build the automation — Email 0 instant · Email 1 access (manual OK for 10 people) · Email 2 conditional on intake incomplete · Emails 3–4 date-based
- [ ] **Matyas:** buyer tag removes them from the 7-day SALES sequence instantly (a buyer must never get another close email)
- [ ] **Matyas:** intake Typeform → ESP field `intake_done` (drives the conditional nudge)
- [ ] **Matyas:** load the 7-day sales sequence (`emails/sprint_sales_sequence.md`) into the ESP with links pointed at aiteam.salesgenius.co
- [ ] **Rebecca:** create the 4 session calendar links → paste into `welcome.html` (`CAL_LINK_WEEK1–4`) and the email merge fields
- [ ] **Rebecca:** community invite link + tool login instructions into Email 1

---

## Phase 4 — Content into pages (Rebecca + Azul + Frank)

- [ ] **Rebecca + Azul:** build the Sprint application Typeform (Q1 CRM w/ waitlist branch → tag `sprint-waitlist`, Q2 years, Q3 commission goal, Q4 financial capability) → ID into the config block in `index.html`
- [x] **DONE (July 14):** VSL embedded + live on the sales page (Vimeo 1209965018 'In House AI Team Breakdown')
- [x] **DONE (July 14):** welcome video embedded + live on /welcome (Vimeo 1209965045 'In House AI Team Confirmation')
- [ ] **Emma + Ryan:** ⭐ **SET THE LAUNCH DATE** — cohort start + 4 session dates → update every `[TBD]` in the `SPRINT` config blocks (all 3 pages) and email merge fields. This unblocks Rebecca's calendars, Matyas's date-based emails, and the countdown copy.
- [ ] **Arslan:** record the dashboard demo (60–90 sec, cropped, watermarked, Vimeo domain-locked)

*(Proof screenshots: already in — done.)*

---

## Phase 5 — Pre-flight (everyone, before ads/emails turn on)

- [ ] End-to-end test as a stranger: sales page → checkout → real purchase → welcome page → all 3 steps work → Email 0 + access email received
- [ ] Every video on the proof wall plays (Vimeo/Grain link-sharing still ON)
- [ ] All pages checked on mobile
- [ ] Chris briefed: setter cadence, foundational-doc language, 7-day close window
- [ ] Emma final read of every page against `AI_Team_Foundational_Positioning_Doc.pdf`

**Operating principle:** Emma doesn't touch ops. She sells, she teaches, she pitches. The team runs the machine.
