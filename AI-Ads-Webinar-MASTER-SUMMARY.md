# AI Ads Webinar — Master Summary (Handoff)

*Current as of July 13, 2026. This supersedes all earlier working notes — including the previous version of this file, which described a $97/mo tool front-end offer (archived in git history). The webinar now sells the 30-Day In-House AI Team Install.*

**Language source of truth:** `AI_Team_Foundational_Positioning_Doc.pdf`. Every customer-facing word comes from there. Read it before writing any copy.

---

## 1. The offer (final)

**The 30-Day In-House AI Team Install** — **$2,997 USD, one time.** No retainer.

In 30 days, we install your In-House AI Team — an **AI Executive Assistant**, an **AI Sales Manager**, and an **AI Ads Manager** — so you stop being the assistant in your own business and start closing more deals.

- **Anchor:** hired as humans, those three roles are ~$150k/yr in payroll (EA ~$50k, ads manager ~$60k, ISA ~$40k).
- **Founder's Bonus:** 12 months of the SalesGenius AI Ads tool included.
- **Scarcity (true):** 10 seats — that's how many installs we can do hands-on.
- **Guarantee #1:** end of Week 1 — not worth every penny? Full refund.
- **Guarantee #2:** attend 3 of 4 sessions + do the homework — if systems aren't installed by day 30, we work 1:1 until they are.
- **Who it's for:** Follow Up Boss and Lofty agents closing 10+ deals. kvCore/BoldTrail and others → genuine first-access waitlist.

**Ascension:** AI Conversion Pack — $2,000 (main upsell, seeded Week 3, closed Week 4) · Nurture Install — $500 (downsell). Never mentioned Weeks 1–2. Full scripts: `AI_EA_Sprint_Upsell_Ascension_Plan.pdf`.

**Math:** one sale covers a week of ad spend and then some. Warm traffic only — the sales page confirms what the webinar already taught; the VSL never introduces.

---

## 2. Funnel architecture — TWO separate Netlify sites

**Deliberately separate projects. The Sprint funnel is NOT under the aiads site.**

| Site | Folder | Pages | Deploy |
|---|---|---|---|
| **aiads.salesgenius.co** | `funnel-pages/` | Webinar funnel: registration (index), confirmation, replay, checkout, OTO, thank-you | Existing Netlify project "salesgenius-masterclass" — drag folder onto its Deploys page |
| **aiteam.salesgenius.co** | `aiteam-funnel/` | Sprint funnel: `index.html` (sales page + VSL + proof wall), `checkout.html` (Stripe), `welcome.html` (Week 0 onboarding) | **New** Netlify site + DNS CNAME `aiteam` — full steps in `aiteam-funnel/HOW-TO-DEPLOY.md` |

**The flow:** Ads/email → Registration (aiads) → Webinar (teaches the 3-employee frame + pitches) → Sales page (aiteam — VSL confirms) → Checkout → Welcome/Week 0 → 30-day install → Conversion Pack upsell.

Support layer: 7-email + 4-SMS close sequence (`emails/sprint_sales_sequence.md`, Jeremy Haynes style, real 7-day deadline) + Chris's setter calls.

Deploy zips in project root: `netlify-deploy-aiads.zip` · `netlify-deploy-aiteam.zip`. Stripe Payment Link success URL → `https://aiteam.salesgenius.co/welcome.html`.

---

## 3. Positioning (locked — do not drift)

- **Mechanism:** "Your In-House AI Team." Three employees with real job titles (the Indeed test): AI Executive Assistant, AI Sales Manager, AI Ads Manager.
- **Core narrative:** Before/Bridge/After/Truth — "you're the assistant in your own business" → the install → Monday 8am with a team → "you're down to do the work; you just shouldn't have to guess what work to do."
- **Credibility:** Emma #1 agent at her brokerage, Ryan ran a brokerage, both brokerages acquired; seven figures in a single year; onshore engineering team; trains agents across North America.
- **Proof rule:** real artifacts only — no typed/AI-written testimonials. 15 live pieces (11 videos + 4 screenshots) in the global proof-wall component (`SG-PROOF-WALL-README.md`).
- **Price discipline:** $2,997 is never spoken in the VSL (survives price changes). Charm pricing on pages. "Why USD?" FAQ: our staff bills us in USD.

---

## 4. Application (Typeform, gates the call/waitlist)

Q1. What CRM do you use? [mandatory] FUB / Lofty / kvCore–BoldTrail / Other → non-FUB/Lofty routes to waitlist ending (tag `sprint-waitlist`)
Q2. How long have you been in real estate? [mandatory]
Q3. Annual commission goal? [mandatory]
Q4. Financial capability to invest (3 options, per Emma)

---

## 5. Asset inventory (where everything lives)

1. **Strategy docs (read in order):** `AI_Team_Foundational_Positioning_Doc.pdf` → `AI_EA_Sprint_Delivery_Brief.pdf` → `AI_EA_Sprint_Upsell_Ascension_Plan.pdf` → `AI_EA_Sprint_Launch_Execution_Plan.pdf` → `AI_Ads_Webinar_Team_Handoff_Outline.pdf` (team training meeting: 60-min agenda + owner checklist)
2. **Videos (recorded, in editing):** VSL (~12 min, $500K map) + 90-sec welcome video. Scripts in `content/`; map reveal overlays in `content/vsl-map-stages/`.
3. **Proof wall:** `aiteam-funnel/assets/proof-wall.js` — canonical, reusable on any funnel with 2 lines.
4. **Emails/SMS:** `emails/sprint_sales_sequence.md`.

---

## 6. What's left before launch (owners in the Handoff Outline PDF)

- Emma/Ryan: cohort dates, 2-pay decision, approve VSL edit
- Arslan: push git commits · **new Netlify site for aiteam-funnel + CNAME** · Stripe product/link/webhook · dashboard demo video
- Azul: Sprint Typeform → config · welcome-email automation · 4 remaining proof screenshots · ESP load
- Rebecca: calendar links into welcome.html · run-of-show · tracker
- Frederick: Week 2–4 SOPs · ad build SOP
- Chris: setter cadence in foundational-doc language
- Frank & Cesar: edit VSL + welcome video → paste embeds
- Everyone: replace all [TBD] config blocks · end-to-end test purchase before ads turn on

**Still open (next working sessions):** webinar deck review (must teach the 3-employee frame) · registration page rename decision (currently "Realtor Ad Machine").
