# Workflow 12 — Post-Webinar Post-Mortem (60-Minute Flight Checklist)

> **Purpose.** The hour right after the webinar is when we either lock the data and act on it, or lose it. This is the post-flight checklist for shutting down the plane: numbers in, delivery confirmed, debrief logged, next-week prep teed up.

> **Cadence.** Every Wednesday, 12:00 PM – 1:00 PM ET (immediately after the 11 AM webinar ends).

> **Attendees.** Emma, Chris, Ops lead, anyone who ran ads / handled live tech.

---

## Why This Exists

Last round, the data got captured *eventually* — but not in one place, not the same day, and not with consequences. By Friday, no one remembered the peak attendance number with confidence, and the team couldn't tell whether the show rate was up or down vs. expectation.

The post-mortem fixes that. One hour, three deliverables: **numbers logged, delivery verified, next week teed up.**

---

## The 60-Minute Run-Sheet

> **Rule of the room:** No tangents until minute 45. Capture numbers first, debate later. The form below gets filled out in real time — one person drives the screen, everyone else calls out numbers.

### 12:00 – 12:15 — Numbers Capture (15 min)

Fill in the scorecard at the bottom of this doc. No analysis yet — just data.

Sources:
- **Webinar platform** (Zoom / WebinarJam / Demio) → attendance, peak, at-pitch
- **ESP** → registrants, replay-watchers (first hour)
- **Stripe dashboard** → LTO sales count, gross revenue, refunds-so-far
- **Calendly** → calls booked off the back of today's webinar
- **Ad platform** (Meta / Google) → week-to-date spend, CPL

If a number isn't ready (e.g., Stripe takes 5–10 min to settle), mark `pending` and pick it up at 12:30.

### 12:15 – 12:30 — Delivery Verification (15 min)

The post-purchase machinery has to fire. Confirm each link in the chain *manually* by checking the actual systems — not by assuming they worked.

Use the **Delivery Verification Checklist** below. Anything not confirmed by 12:30 becomes a hot ticket assigned to a single owner with a name and a deadline.

### 12:30 – 12:45 — Debrief: What Worked, What Didn't (15 min)

Three questions, in order, time-boxed to 5 minutes each:

1. **What pulled people in?** (creative, hook, audience) — anything we should *do more of*
2. **Where did we lose them?** (drop-off in the funnel, in the show, at pitch) — anything we should *fix*
3. **What surprised us?** (good or bad) — anything that changes our model of how this works

One sentence each. We're not solving anything in this block — we're capturing signal.

### 12:45 – 1:00 — Action Items + Handoff (15 min)

Convert today's findings into a list of named actions for the week ahead. Use the **Action Tracker** at the bottom — each row has an owner, a due date, and a one-line desired outcome.

By 1:00 PM, the meeting is over and:
- The scorecard is filled in.
- Every delivery checkbox is either green or has a named owner.
- The debrief has 3 sentences logged.
- The action tracker has the week's commitments.

---

## Scorecard — Webinar [DATE]

> Fill in live. One row per webinar. Keep these in a shared spreadsheet (the `Complete_KPI_Model.xlsx` in the project root) so trends are visible week-over-week.

### Top of funnel (set before the show)
| Metric | Number | Target | Notes |
|---|---|---|---|
| Ad spend (week-to-date) | $___ | $___ | |
| Impressions | ___ | ___ | |
| Clicks | ___ | ___ | |
| Cost per click | $___ | $___ | |
| Registrants (total) | ___ | ___ | |
| Cost per registrant (CPL) | $___ | $___ | |

### Show day
| Metric | Number | Target | Notes |
|---|---|---|---|
| Showed up live | ___ | ___ % of registrants | |
| **Show rate %** | ___ % | 35–45% | |
| Peak concurrent attendance | ___ | ___ | |
| Still on at pitch (minute 55) | ___ | ___ | |
| **Hold rate %** (at-pitch / peak) | ___ % | 60%+ | |
| Average watch time | ___ min | 40+ min | |
| Chat engagement (msgs sent) | ___ | ___ | |

### The close
| Metric | Number | Target | Notes |
|---|---|---|---|
| LTO sales (Stripe) | ___ | ___ | |
| **LTO conversion %** (sales / at-pitch) | ___ % | 15–25% | |
| LTO gross revenue | $___ | $___ | |
| Refunds (first 24h) | ___ | 0–1 | |
| Calls booked (Calendly) | ___ | ___ | |
| **Booked-rate %** (calls / LTO buyers) | ___ % | 60%+ | |

### Replay (capture 24h later, log here)
| Metric | Number | Notes |
|---|---|---|
| Replay opens | ___ | |
| Replay-driven LTO sales | ___ | |
| Replay-driven calls booked | ___ | |

### Unit economics
| Metric | Calculation | This week |
|---|---|---|
| Cost per LTO buyer | Ad spend / LTO sales | $___ |
| LTO ROAS | LTO revenue / ad spend | ___ × |
| Cost per call booked | Ad spend / calls booked | $___ |

---

## Delivery Verification Checklist

> Every box must be either checked or assigned to a named owner by 12:30 PM. No box stays unchecked overnight.

### The buyer experience
- [ ] Stripe webhook fired on `checkout.session.completed` for every buyer (check Netlify function logs)
- [ ] Welcome / access email sent to every buyer (check ESP send log)
- [ ] Skool invite link delivered + working (test 1 random buyer's invite)
- [ ] Receipt email arrived from Stripe (spot-check 1 buyer's inbox if accessible)
- [ ] Buyers tagged `lto-buyer` in the ESP with today's date
- [ ] Buyers added to the post-purchase 3-email drip
- [ ] Day 28 reminder scheduled for each buyer (Calendly link send)

### The no-show experience
- [ ] Replay email sent to no-shows within 4 hours of webinar end
- [ ] No-show ESP segment correctly populated (registered, didn't attend)
- [ ] Replay link works (open it from an incognito window — actually test it)

### The attendee-no-buyer experience
- [ ] Attended-no-buyer ESP segment correctly populated
- [ ] Nurture sequence enrolled (if running one this round)

### Infrastructure
- [ ] No 500 errors in Netlify function logs from the last 4 hours
- [ ] Stripe dashboard shows clean payments (no `requires_action` stuck)
- [ ] Calendly is open for the next 14 days (no accidental block from Chris)
- [ ] Ad platforms still spending normally (no pauses, no spend cliffs)

### Page accuracy
- [ ] `data-webinar-date` rolled forward correctly on `index.html`, `webinar.html`, `offer.html`
- [ ] Page loads cleanly (no console errors)
- [ ] Mobile load test passed (open one of the three pages on a phone)

---

## Debrief Capture

> 3 sentences. Logged here. No edit-by-committee — the person typing makes the call.

**What pulled people in this week:**
> ___

**Where we lost them:**
> ___

**What surprised us:**
> ___

---

## Action Tracker — Week of [DATE]

| # | Action | Owner | Due | Outcome we want |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

### Standing commitments (always on the list)
- [ ] Refresh any ad creative scoring below CTR target by Friday (Ops + Emma)
- [ ] Confirm next Wednesday's webinar room is set + Zoom link tested by Tuesday EOD (Ops)
- [ ] Confirm Chris's calendar is open Thursday & Friday for review calls (Chris)
- [ ] Send Tuesday team-prep brief (auto-fires per `workflows/10_date_rotation.md` §6)

---

## Red Flag Triggers — Escalate Same Day

Some numbers don't wait for next week's meeting. If any of these hit, the meeting *stops*, the team escalates, and the rest of the agenda gets pushed:

- **Show rate < 25%** → reminder sequence is broken or the day-of email didn't fire. Check ESP send logs immediately.
- **LTO conversion < 5%** (against at-pitch) → the close failed or the price didn't land. Emma reviews the recording before Friday.
- **Refunds > 10% within 24 hours** → fulfillment failure. Stop all ad spend until resolved.
- **Stripe webhook silent** → buyers are paying and not getting anything. Hottest possible fire. Pause Stripe + ads, fix, replay missed webhooks, then resume.
- **Skool invite link broken** → mass-resend within 2 hours of detection.

---

## What "Done" Looks Like at 1:00 PM

- [ ] Scorecard is filled in (or numbers marked `pending` with a name beside them)
- [ ] Delivery checklist is all green OR has named owners with deadlines
- [ ] Debrief has 3 sentences captured
- [ ] Action tracker has the week's commitments with owners + due dates
- [ ] No red-flag triggers active (or, if any are, escalation is already in motion)
- [ ] Emma confirms the plane is on the ground

---

## What This Run Taught Us

> Append after first run of this workflow:
- Did 60 minutes feel like enough? (If we ran over, what blew the budget?)
- Which checklist items kept slipping? (Those need to move earlier in the run-sheet next time.)
- Anything we didn't know we needed to track? (Add to the scorecard.)
- Any red-flag triggers we hit that we should have caught earlier?
