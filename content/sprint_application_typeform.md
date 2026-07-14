# Sprint Application Typeform — Build Spec (End-of-Webinar QR)

**Flow:** QR on the final webinar slide → Typeform (6 questions) → qualified = calendar opens to book the call → call explains the offer → THEN the sales page.
**Owners:** Rebecca + Azul build · Matyas wires tags to ESP.
**Language source of truth:** AI_Team_Foundational_Positioning_Doc.pdf.

---

## Welcome screen

**Headline:** Let's see if the In-House AI Team is a fit for your business.
**Sub:** 6 quick questions — takes about 60 seconds. If it's a fit, you'll book a 15-minute call with us on the next screen.
**Button:** Start →

*(Collect name, email, phone as contact fields here or as the first block — required. Pass UTM/webinar hidden fields.)*

---

## The 6 questions

### Q1 — What CRM do you run your business on? *(required — THE gate)*
- Follow Up Boss
- Lofty (Chime)
- GoHighLevel (GHL)
- kvCore / BoldTrail
- Other / I don't really use one

*Logic: FUB, Lofty, or GHL → continue. kvCore/BoldTrail or Other → jump to Waitlist ending after Q6 (let them finish — the data is useful and the ending feels earned, not rejected).*

### Q2 — How long have you been in real estate? *(required)*
- Less than 2 years
- 2–5 years
- 5–10 years
- 10+ years

### Q3 — How many deals did you close in the last 12 months? *(required)*
- 0–4
- 5–9
- 10–24
- 25+

*Why: the offer qualifier is "closing 10+ deals with a 500+ contact database." Deals closed is a fact; a goal is a wish. This is the honesty check for Q4.*

### Q4 — What's your annual commission goal for the next 12 months? *(required)*
- Under $150K
- $150K–$300K
- $300K–$500K
- $500K+

*Why: the gap between Q3 and Q4 IS the sales call. "You closed 12 deals and want $500K — here's what has to change." Chris opens with this.*

### Q5 — If this is a fit, do you have the financial capability to invest in your business right now? *(required)*
- Yes — I have money set aside to invest in growth
- I could make it work for the right opportunity
- No — money is too tight right now

*Logic: options 1–2 → continue to calendar. Option 3 → Not-Yet ending (no calendar — protects Chris's calendar from unbookable calls).*

### Q6 — Have you used AI in your business before? *(required)*
- Yes — I use it regularly (ChatGPT, etc.)
- I've dabbled, but nothing stuck
- No — this is new to me

*Why: not a gate — call prep. "Dabbled but nothing stuck" is the money answer; it's the exact avatar pain ("tools don't stick — employees do"). Chris tailors the call to this.*

---

## Endings (3)

### A. QUALIFIED → Calendar
*(Q1 = FUB/Lofty/GHL AND Q5 ≠ "too tight")*

**Headline:** You're a fit. Let's talk.
**Body:** Book your 15-minute call below — we'll walk you through exactly how the 30-day install would work in YOUR business, with your CRM and your database. No pressure, no pitch-a-thon. Founder's Cohort is capped at 10 agents, so grab a time while seats are open.
**Action:** Calendly embed / redirect (Chris + Emma/Ryan's booking link).
**Tag:** `sprint-qualified` → ESP (enters the 7-day close sequence if they don't book/buy).

### B. WAITLIST → wrong CRM
*(Q1 = kvCore/BoldTrail or Other)*

**Headline:** You're on the priority waitlist.
**Body:** This first cohort is built specifically for Follow Up Boss, Lofty, and GoHighLevel — that's how we can promise a working install in 30 days. You're now first in line: when we open a cohort for your CRM, waitlist members get access before anyone else.
**Tag:** `sprint-waitlist`.

### C. NOT YET → money too tight
*(Q5 = "too tight")*

**Headline:** Thanks for being straight with us.
**Body:** The install is a real investment, and we'd rather you join when it won't strain you. Start with what you learned on the webinar today — it works. We'll stay in touch, and when you're ready, the door's open.
**Tag:** `sprint-nurture` (long-term nurture list — NOT the 7-day close sequence).

---

## Build notes

- **Accepted CRMs (per Emma, July 14): Follow Up Boss, Lofty, GHL.** Everything else → waitlist.
- **Question order matters:** CRM first (fastest gate), money question 5th (they're invested by then, more honest), AI question last (ends on curiosity, not money).
- One question per screen, big tap targets — most will fill this on their **phone from a QR code**.
- Hidden fields: `utm_source`, `utm_campaign`, `webinar_date`.
- After publishing: put the Typeform ID in the sales-page config (`REPLACE_WITH_SPRINT_TF_ID` in `aiteam-funnel/index.html`) — same form serves the "Apply here" links on the page.
- QR slide: generate the QR from the Typeform link WITH UTM params baked in (e.g. `?utm_source=webinar&utm_campaign=founders-cohort`).
- Booking tool: Calendly assumed (matches the rest of the stack) — swap if the team uses something else.
