# Sprint Launch — Team Setup Checklist

**The order matters.** Each phase unblocks the next. Live URL when done: **aiteam.salesgenius.co** (its own Netlify site — completely separate from aiads.salesgenius.co).

---

## Phase 1 — Site & domain (today) — Emma + Arslan

- [ ] **Emma:** drag the `aiteam-funnel` folder onto https://app.netlify.com/drop → Netlify creates a NEW site (random name, e.g. `random-words-123.netlify.app`)
- [ ] **Arslan:** rename the site to `salesgenius-aiteam` (Site settings → Site details)
- [ ] **Arslan:** add custom domain `aiteam.salesgenius.co` (Domain management) + in salesgenius.co DNS add CNAME: `aiteam` → `<sitename>.netlify.app` · confirm SSL provisions (auto, ~minutes after DNS propagates)
- [ ] **Arslan:** push the local git commits to github.com/salesgeniustech/AI-Powered-Webinar (repo is source of truth; Netlify Drop is the deploy mechanism)

**Redeploys after any page edit:** drag the folder onto the site's own Deploys page. Never onto the aiads site.

---

## Phase 2 — Stripe (Arslan) — blocks checkout going live

- [ ] **Product:** "The 30-Day In-House AI Team Install" — **$2,997 USD, one-time** (start in test mode)
- [ ] **Payment Link:** collect name, email, phone · quantity locked to 1 · promo codes OFF
- [ ] **Success URL:** `https://aiteam.salesgenius.co/welcome.html` (this is the whole onboarding trigger — don't skip)
- [ ] **Receipts:** email receipts ON · statement descriptor "SALESGENIUS" · correct tax settings
- [ ] **Webhook:** `checkout.session.completed` → ESP (tag `sprint-buyer`) — powers the onboarding emails and kills the sales sequence for buyers
- [ ] **Paste the Payment Link** into `aiteam-funnel/checkout.html` — search `STRIPE_PAYMENT_LINK` (Meta InitiateCheckout event is already wired to the button)
- [ ] **Test mode end-to-end:** test card → lands on welcome.html → tag applied → Email 0 fires
- [ ] **Live mode + one real-card purchase** (refund it) before ads turn on
- [ ] ⏳ **Pending Emma/Ryan:** 2-pay option (e.g. 2 × $1,600)? If yes → second Payment Link, same success URL, secondary button on checkout page

---

## Phase 3 — Post-purchase automation (Azul + Rebecca)

Full email copy: **`emails/sprint_onboarding_sequence.md`** (5 emails + 3 SMS + automation logic).

- [ ] **Azul:** build the automation in the ESP — Email 0 instant · Email 1 access (manual OK for 10 people) · Email 2 conditional on intake incomplete · Emails 3–4 date-based
- [ ] **Azul:** buyer tag removes them from the 7-day SALES sequence instantly (a buyer must never get another close email)
- [ ] **Azul:** intake Typeform → ESP field `intake_done` (drives the conditional nudge)
- [ ] **Rebecca:** create the 4 session calendar links → paste into `welcome.html` (`CAL_LINK_WEEK1–4`) and the email merge fields
- [ ] **Rebecca:** community invite link + tool login instructions into Email 1
- [ ] **Azul:** load the 7-day sales sequence (`emails/sprint_sales_sequence.md`) with links pointed at aiteam.salesgenius.co

---

## Phase 4 — Content into pages (Azul + Frank & Cesar)

- [ ] **Azul:** build the Sprint application Typeform (Q1 CRM w/ waitlist branch → tag `sprint-waitlist`, Q2 years, Q3 commission goal, Q4 financial capability) → ID into the config block in `index.html`
- [ ] **Frank & Cesar:** finish VSL edit → embed into `index.html` (search `VSL-EMBED`)
- [ ] **Frank & Cesar:** finish 90-sec welcome video → embed into `welcome.html`
- [ ] **Azul:** drop the 4 remaining Drive screenshots into `aiteam-funnel/assets/img/proof/` (exact filenames in `SG-PROOF-WALL-README.md` — they auto-appear)
- [ ] **Emma/Ryan:** set cohort start date + session dates → update every `[TBD]` in the `SPRINT` config blocks (all 3 pages) and email merge fields
- [ ] **Arslan:** record the dashboard demo (60–90 sec, cropped, watermarked, Vimeo domain-locked)

---

## Phase 5 — Pre-flight (everyone, before ads/emails turn on)

- [ ] End-to-end test as a stranger: sales page → checkout → real purchase → welcome page → all 3 steps work → Email 0 + access email received
- [ ] Every video on the proof wall plays (Vimeo/Grain link-sharing still ON)
- [ ] All pages checked on mobile
- [ ] Chris briefed: setter cadence, foundational-doc language, 7-day close window
- [ ] Emma final read of every page against `AI_Team_Foundational_Positioning_Doc.pdf`

**Operating principle:** Emma doesn't touch ops. She sells, she teaches, she pitches. The team runs the machine.
