# Sprint Onboarding Email Sequence — Post-Purchase (Week 0)

**Fires on:** Stripe `checkout.session.completed` → ESP tag `sprint-buyer` → this automation.
**Owner:** Azul (build in ESP) · Rebecca (calendar links) · Emma approves copy.
**Goal:** every buyer completes the 3 Week-0 steps before Session 1 — intake done, 4 sessions on their calendar, logged into community + tools.
**Merge before activating:** [WELCOME PAGE] = https://aiteam.salesgenius.co/welcome.html · [INTAKE], [CAL WK1–4], [COMMUNITY], [TOOL LOGIN], [ZOOM], dates.

---

## Email 0 — Instant (automated, fires on purchase)
**Subject:** You're in. Your AI team install starts now.
**Preview:** 3 quick steps before Session 1 — takes 15 minutes total.

Welcome to the Founder's Cohort.

You just did what most agents talk about for years: you hired your team. In 30 days you'll have an AI Executive Assistant, an AI Sales Manager, and an AI Ads Manager installed and working — with us on your payroll the whole way.

Before Session 1, three steps. Fifteen minutes total:

**Step 1 — Intake form (5–10 min):** [INTAKE]
This is how we customize the install around YOUR database, YOUR market, YOUR deal flow. Do this one today.

**Step 2 — Put all 4 sessions in your calendar:**
Week 1: [CAL WK1] · Week 2: [CAL WK2] · Week 3: [CAL WK3] · Week 4: [CAL WK4]
Reminder: your install guarantee is tied to attending 3 of 4. Book them now so life can't steal them.

**Step 3 — Watch your inbox.** Within a few hours our team sends your community invite and tool access. (Check spam/promotions if it's not there — and if 15 minutes pass after that with nothing, reply to this email.)

Everything above also lives on your welcome page: **[WELCOME PAGE]**

See you at Session 1.

— Emma

P.S. Your Week 1 guarantee is live from today: if by the end of Week 1 this isn't worth every penny, you get every penny back.

---

## Email 1 — Within a few hours (team/automation: ACCESS)
**Subject:** Your access: community + AI tools inside
**Preview:** Log in, say hi, and you're set for Session 1.

Your keys:

1. **Community:** [COMMUNITY] — join today and post a quick intro (name, market, CRM). This is where session recordings, homework, and our team live for the next 30 days.
2. **AI Ads tool (your Founder's Bonus — 12 months included):** [TOOL LOGIN]
3. **Session link (same for all 4 weeks):** [ZOOM]

Haven't done your intake yet? That's the one thing we need before we can prep your install: [INTAKE]

Stuck on any login? Reply here — a human answers.

— The SalesGenius Team

---

## Email 2 — Day 1 (ONLY if intake not completed — conditional branch)
**Subject:** quick one — we can't prep your install without this
**Preview:** 5 minutes, then we take it from here.

Your intake form is still empty, and here's why that matters:

Before Session 1, our team builds your install plan from it — your CRM, your database size, your listing flow. No intake = a generic plan, and you didn't pay for generic.

Five minutes: **[INTAKE]**

Do it now and you're done — we take it from there.

— Emma

*(Repeat at Day 3 with subject: "your Session 1 prep is waiting on one thing" if still incomplete. If still empty by Day 5, Rebecca calls/texts personally.)*

---

## Email 3 — 48 hours before Session 1
**Subject:** Session 1 is [DAY] — here's how to show up ready
**Preview:** 60 seconds of prep. Then we build.

Session 1 — [DATE, TIME]: **[ZOOM]**

How to arrive ready:

- Be at a computer (not a phone) — this is click-along, live. You follow on screen while we set it up WITH you.
- Have your CRM login handy (Follow Up Boss or Lofty).
- That's it. No homework before Session 1 — the homework comes after, and it's simple.

Can't make it live? The recording lands in the community same day — but remember, the install guarantee is tied to attending 3 of 4 live. Protect the slot if you can.

— Emma

---

## Email 4 — Morning of Session 1
**Subject:** today: your AI Executive Assistant gets hired
**Preview:** [TIME]. Computer. CRM login. Let's build.

Today at [TIME] we install employee #1 — your AI Executive Assistant.

By the end of the call it'll be writing listing descriptions and follow-up in YOUR voice, on command. That 9pm-in-the-car writing session? Today's the last one.

**[ZOOM]**

See you there.

— Emma

---

## SMS companions

- **On purchase (instant):** "Emma here — welcome to the Founder's Cohort! 3 quick steps before Session 1, all in your email + here: [WELCOME PAGE]"
- **48h before Session 1:** "Session 1 is [DAY] at [TIME]. Be at a computer with your CRM login. Link: [ZOOM]"
- **1 hour before each session:** "We're live in 1 hour — [ZOOM]"

---

## Automation logic (Azul)

1. Stripe webhook `checkout.session.completed` → tag `sprint-buyer`, remove from the 7-day sales sequence immediately (a buyer must never get another close email).
2. Email 0 instant · Email 1 within a few hours (manual send by team is fine for cohort 1 — 10 people).
3. Email 2 is conditional on intake NOT submitted (Typeform → ESP field `intake_done`).
4. Emails 3–4 are date-based (attach to Session 1 date).
5. Session reminders for Weeks 2–4: reuse Email 3/4 skeletons — Rebecca schedules.
