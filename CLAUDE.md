# CLAUDE.md — AI-Powered Webinar Funnel (SalesGenius)

This file orients Claude Code (or any agent) working in this repository. Read it before doing anything else.

---

## Project Snapshot

**Owner:** Emma Pace (emma@salesgenius.co)
**Goal:** Launch a paid-traffic webinar funnel that sells a $97 low-ticket product, then ascends qualified buyers into a $2k/month done-with-you retainer.
**Deploy target:** Netlify (static front-end pages + serverless functions for form handlers / Stripe webhooks).
**Timeline:** 7–10 day build, launch by Day 8.

### Webinar Positioning
**Title:** *How to Run AI-Powered Paid Ad Campaigns for Real Estate Lead Gen (In a Soft Market)*
**Audience:** Realtors making $150k+ who are interested in paid ads + AI.
**Guarantee (the hook):** $40k in new GCI within 60 days.

### Webinar Content Map (60 min)
1. Pillar 1 — The AI-Powered Ad Setup (15 min)
2. Pillar 2 — The Landing Page & Lead Capture (15 min)
3. Pillar 3 — The Follow-Up System (15 min)
4. Pillar 4 — The Math & Proof (10 min)
5. Social Proof — 2–3 case studies (5 min)
6. Close — low-ticket pitch + high-ticket setup (5 min)

### Offers
- **Low-ticket ($97):** *The AI-Powered Paid Ad Lead Gen Playbook* — templates + prompts + 30-day Skool community access + 30-minute implementation review call. Target conversion: 20–25% of webinar attendees.
- **High-ticket ($2k/month retainer):** Done-with-you implementation. Sold on the review call by Chris (setter/closer).

---

## The WAT Framework (How This Repo Is Organized)

This project follows the **Workflows / Agents / Tools** pattern. Probabilistic AI handles reasoning; deterministic code handles execution.

**Workflows** — `workflows/*.md` — plain-language SOPs (what to do, inputs, expected outputs, edge cases).
**Agents** — your role. Read the relevant workflow, sequence tool calls, recover from failure, ask when ambiguous.
**Tools** — `tools/*.py` (or `tools/*.js` for Netlify functions) — deterministic execution. API calls, file writes, Stripe charges, email sends. Credentials live in `.env` — never anywhere else.

If five chained steps are each 90% accurate, you're at 59% end-to-end. Offloading execution to scripts is what keeps this reliable.

### Operating Rules
1. **Look for an existing tool first.** Check `tools/` before writing anything new.
2. **Read the workflow before calling tools.** The workflow tells you the right sequence and what counts as done.
3. **Don't overwrite workflows without asking.** These are Emma's instructions — refine them, don't replace them.
4. **Document what you learn.** If you hit a rate limit, a Stripe quirk, or a Netlify build gotcha, append it to the relevant workflow under "What this run taught us."
5. **Never commit secrets.** `.env`, `credentials.json`, `token.json` are gitignored. Don't paste keys into chat either.

---

## Directory Layout

```
ai-powered-webinar/
├── CLAUDE.md                    # This file
├── README.md                    # Human-facing project overview
├── .env.example                 # Template for required env vars
├── .gitignore
├── netlify.toml                 # Netlify build + redirect config
├── package.json
│
├── site/                        # Static front-end deployed to Netlify
│   ├── index.html               # Registration page (webinar opt-in)
│   ├── webinar.html             # Live/replay webinar room
│   ├── offer.html               # $97 low-ticket sales page
│   ├── confirmation.html        # Post-purchase: VSL + case studies + book-call CTA
│   ├── book-call.html           # Calendly embed for 30-min review call
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── img/
│   └── _redirects               # Netlify URL routing
│
├── netlify/functions/           # Serverless handlers
│   ├── register.js              # Webinar opt-in → ESP + webinar platform
│   ├── checkout.js              # Stripe checkout session for $97 offer
│   ├── stripe-webhook.js        # On payment_succeeded → trigger email seq + Skool invite
│   └── book-call.js             # Calendly webhook → CRM tag
│
├── workflows/                   # SOPs (read these before acting)
│   ├── 00_launch_checklist.md
│   ├── 01_build_registration_page.md
│   ├── 02_build_offer_page.md
│   ├── 03_build_confirmation_page.md
│   ├── 04_email_sequence.md
│   ├── 05_stripe_integration.md
│   ├── 06_netlify_deploy.md
│   ├── 07_ad_creative_brief.md
│   ├── 08_vsl_script.md
│   └── 09_setter_sop_for_chris.md
│
├── tools/                       # Deterministic scripts (Python or Node)
│   ├── deploy_netlify.sh
│   ├── send_test_email.js
│   ├── stripe_create_product.js
│   └── pull_webinar_attendees.py
│
├── content/                     # Copy, scripts, and creative source
│   ├── webinar_outline.md
│   ├── vsl_script.md
│   ├── email_sequence/
│   │   ├── email_1_qualification.md
│   │   ├── email_2_case_study.md
│   │   └── email_3_urgency.md
│   ├── ad_creative/
│   │   ├── ad_variations.md
│   │   └── creative_brief.md
│   └── case_studies/
│
└── .tmp/                        # Disposable. Anything regenerable.
```

---

## Required Environment Variables

Copy `.env.example` → `.env` and fill these in before running anything that hits a paid API.

```
# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_97=

# Email service provider (pick one: ConvertKit / ActiveCampaign / Klaviyo)
ESP_API_KEY=
ESP_LIST_ID_WEBINAR_REGISTRANTS=
ESP_LIST_ID_BUYERS=

# Webinar platform (WebinarJam / Demio / Zoom Webinars)
WEBINAR_API_KEY=
WEBINAR_EVENT_ID=

# Skool community
SKOOL_INVITE_LINK=

# Calendly (Chris's 30-min review call)
CALENDLY_LINK=
CALENDLY_WEBHOOK_SECRET=

# Netlify
NETLIFY_AUTH_TOKEN=
NETLIFY_SITE_ID=
```

---

## Build Order (7–10 Day Plan)

Treat this as the master sequence. Each item maps to a workflow in `workflows/`.

**Days 1–3 — Define & Write**
- [ ] Confirm webinar title, guarantee, and offer language (`content/webinar_outline.md`)
- [ ] Write 3-email post-purchase sequence (`content/email_sequence/`)
- [ ] Draft Setter SOP for Chris (`workflows/09_setter_sop_for_chris.md`)
- [ ] Stripe product + price live in test mode

**Days 4–7 — Build & Produce**
- [ ] Registration page (`site/index.html`) — headline = the $40k/60-day guarantee
- [ ] Low-ticket sales page (`site/offer.html`) — headline, benefits, $97 CTA
- [ ] Confirmation page (`site/confirmation.html`) — 90-sec Emma VSL + 1–2 case study videos + book-call CTA
- [ ] Email automation wired (Stripe webhook → ESP tag → 3-email drip)
- [ ] Ad creative produced — 3–5 variations, guarantee-led
- [ ] VSL recorded (or webinar recorded live and repurposed)

**Day 8 — Launch**
- [ ] Switch Stripe to live mode
- [ ] Deploy to Netlify production
- [ ] Smoke test: end-to-end purchase, confirm email sequence fires, confirm Skool invite delivered
- [ ] Turn on ads

**Days 9–30 — Optimize**
- [ ] Daily: check ad spend, CPL, opt-in rate, attendance rate, $97 conversion, $2k call book rate
- [ ] Iterate creative against winners
- [ ] Run second webinar

---

## Who Does What

- **Emma:** Webinar content, low-ticket offer design, VSL script, Setter SOP for Chris
- **Team:** Registration page build, low-ticket sales page, confirmation page, email automation setup, ad creative production
- **Chris:** 30-minute implementation review calls (after Setter SOP training)
- **Claude Code:** Scaffold pages, wire Stripe + ESP + Netlify, write/refactor functions, deploy

---

## Voice & Copy Guidelines

- Lead with the **guarantee** ($40k in 60 days) on every page above the fold.
- Audience is realtors making $150k+ — they're skeptical of "gurus." Specifics beat hype. Use real numbers, real names (with permission), real screenshots.
- Avoid overused real estate clichés ("unlock your dream home," "premier service," etc.).
- Fair Housing compliance applies to any copy referencing buyers/sellers or neighborhoods — no protected-class language.
- When in doubt, run copy through the `anthropic-skills:humanizer` and `marketing:brand-review` skills before shipping.

---

## Deployment Notes (Netlify)

- `netlify.toml` defines build command (`npm run build` if a build step exists, otherwise publish `site/` directly).
- Serverless functions live in `netlify/functions/` — Netlify auto-detects.
- Stripe webhook endpoint: `https://<site>.netlify.app/.netlify/functions/stripe-webhook` — register this URL in the Stripe dashboard and copy the signing secret into `.env`.
- Use Netlify environment variables (not committed `.env`) for production secrets. `.env` is local-dev only.
- Set up a `staging` branch deploy for testing before promoting to production.

---

## Quality Bar Before Launch

Don't ship until all of these are true:
1. End-to-end purchase tested with a real card in test mode → real card in live mode
2. Stripe webhook reliably fires on `checkout.session.completed`
3. All 3 emails delivered to a test inbox, links work, Skool invite is in Email 1
4. Confirmation page video plays on mobile and desktop
5. Calendly link books a real slot on Chris's calendar
6. All pages pass Lighthouse mobile performance ≥ 80
7. No console errors on any page
8. Privacy policy + terms linked in the footer
9. Stripe dashboard shows the $97 product with correct tax + receipt settings

---

## What This Run Taught Us

> Append insights here as you go. Rate limits, build quirks, copy that converted, copy that flopped, anything a future agent or human reviewer should know before touching this project again.

- (empty — first build)
