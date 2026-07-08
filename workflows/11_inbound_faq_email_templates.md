# Workflow 11 — Inbound FAQ Email Templates (Admin Inbox)

> **Purpose.** Last round, the same questions hit the admin inbox over and over and each response was custom-written. This doc gives ops a copy-paste library so they're answering at scale by the second webinar.

> **Audience.** Ops / admin team handling `admin@salesgenius.co` (or wherever inbound lands).

> **Status:** Draft v1 — built against the offer in `workflows/02_low_ticket_offer.md` and standard pre-webinar / post-purchase patterns. Add real ones as they come in.

---

## How To Use This Doc

1. Inbound email comes in → find the closest template below.
2. Paste the template into the reply.
3. Edit the **[bracketed fields]** with the actual buyer's info.
4. Read it through once in your own voice before sending — these are starting points, not robots reading scripts.
5. If the email doesn't match any template, write a new response and add it to this doc at the bottom under "New patterns" so the next round has it.

### House rules
- Reply within 4 business hours during the pre-webinar week. Within 24 hours otherwise.
- Always sign off with the same name the buyer would see in our other comms (consistency = trust).
- Never extend the **$40k / 60-day guarantee** to the $147 buyer (see `workflows/02_low_ticket_offer.md` §1). It's the most expensive thing we could get wrong.
- If you're not sure, flag Emma before replying. A 6-hour delay is cheaper than a wrong promise.

---

## Category A — Pre-Webinar (Registration, Access, Timing)

### A1. "Where's my webinar link?"
> *Triggered by:* registrant signed up but says they don't have a link, OR is checking the day-of.

**Subject:** Re: Your webinar link is on the way

```
Hi [Name],

Welcome — and thanks for registering.

Your unique join link was sent to [email] right after you signed up.
Couple of things to check:

1. Search your inbox for "[Sender Name]" or "AI-Powered Paid Ad" —
   sometimes the welcome email lands under Promotions or Updates.
2. The link also comes again in the reminder email 1 hour before we
   go live, so if you can't find it now, watch for that one.
3. If neither shows up by 30 minutes before we start, reply to this
   email and I'll send the link manually.

We're live [auto-pull: data-webinar-date long] — see you then.

[Sender Name]
```

**Internal:** If the registrant isn't in the ESP, they didn't complete registration. Send them back to the registration page.

---

### A2. "What time is the webinar in my time zone?"
**Subject:** Re: Webinar time in your time zone

```
Hi [Name],

We go live [auto-pull: data-webinar-date long]. That's:

  • [11:00 AM ET]
  • [10:00 AM CT]
  • [9:00 AM MT]
  • [8:00 AM PT]

If you're outside North America, [link to the day-of countdown
page or a timezone tool] will show your local time.

Reminder emails go out 24 hours and 1 hour before. See you then.

[Sender Name]
```

**Internal:** Confirm the ET → other-zone conversion is correct for that specific date (DST shifts twice a year).

---

### A3. "Can I get the replay if I can't make it live?"
**Subject:** Re: Replay access

```
Hi [Name],

Yes — register anyway and we'll send you the replay link within 24
hours of the live show. The $147 Playbook offer is also available
to replay viewers for 48 hours after we go live, so if you watch
the recording you'll still see the offer.

If you'd rather hop on the next live one instead, we run every
Wednesday at 11 AM ET — the registration page always shows the next
date.

[Sender Name]
```

**Internal:** Confirm the 48-hour offer window with Emma before sending. This may be 24 or 72 depending on how she's running it.

---

### A4. "Is this just for U.S. realtors? I'm in Canada / Australia / UK."
**Subject:** Re: Does this work in [country]?

```
Hi [Name],

The system works in any market where the average home price is
USD $600k+ (CAD $800k+ roughly). Most of our Canadian buyers are
in the GTA, Vancouver, Calgary, or Ottawa — markets where the
unit economics work.

If your average is under that, the math gets tight and we'll be
honest with you on the review call. The webinar itself is free,
so come watch and see if it fits your market — there's no penalty
either way.

[Sender Name]
```

**Internal:** Don't promise it works in sub-$400k markets. Disqualify gently up front.

---

## Category B — Live Day / Tech Issues

### B1. "I can't log in / the link isn't working / Zoom won't load"
> *Highest urgency. Reply within 15 minutes during the live show window.*

**Subject:** Re: Trouble joining — try this

```
Hi [Name],

Sorry about that. Quick checklist:

1. Open the join link in an incognito / private window.
2. If you're on mobile and Zoom is asking for the app, install it —
   browser-only Zoom is finicky.
3. If you're still locked out, here's the direct backup link:
   [BACKUP LINK]

If none of those work, we're recording — you'll get the replay
within 24 hours and the offer is still good for [48 hours] after
the live show.

[Sender Name]
```

**Internal:** Update `[BACKUP LINK]` each Wednesday morning before the show. Stale link = furious buyer.

---

### B2. "I joined late — what did I miss / can I still buy?"
**Subject:** Re: Joining late + the offer

```
Hi [Name],

You can absolutely still buy the Playbook — the offer link is in
the chat and stays open through the end of the session plus
[48 hours] after. Here it is again: [OFFER URL]

If you missed the opening, the replay will be sent within 24 hours
so you can catch the parts you missed.

[Sender Name]
```

---

## Category C — Post-Purchase $147 Playbook

### C1. "I bought but didn't get an email / no access link"
> *Critical. Reply same day. This is the #1 refund-trigger email.*

**Subject:** Re: Your Playbook access — let me sort this

```
Hi [Name],

Sorry for the delay. I just confirmed your purchase on our end —
here's everything you need:

  • Skool community invite: [SKOOL INVITE LINK]
  • Playbook dashboard: [PLAYBOOK URL]
  • Your receipt: [STRIPE RECEIPT URL if available]

A reminder of what's coming:
  • You're inside Skool today — that's where Q&A and updates happen.
  • Your 30-minute review call gets booked on Day 28 (we'll email
    you the Calendly link automatically).

If anything still isn't working, reply here and I'll personally
make sure it's resolved.

[Sender Name]
```

**Internal:** Before sending, verify in Stripe that the charge succeeded. If it didn't, route to C5 (failed payment).

---

### C2. "When does my review call get booked?"
> *This was the biggest source of last round's inbox flood. Set the Day 28 expectation everywhere.*

**Subject:** Re: Your 30-minute review call — Day 28

```
Hi [Name],

Great question — and totally fair to ask.

Your 30-minute implementation review call gets booked on **Day 28**
after your purchase. The reason: we want you to have actually run
the playbook for a few weeks first so the call is useful, not
hypothetical. We've found that calls before Day 21 are mostly
"what does this prompt mean?" — and we'd rather solve those inside
Skool, where you also get answers from people running the system.

You bought on [PURCHASE DATE], so your call link will arrive on
[PURCHASE DATE + 28]. In the meantime, Skool is open — that's
where most of the wins happen anyway.

[Sender Name]
```

**Internal:** If they're insistent and clearly ready *now* — flag to Chris. A hot retainer buyer should not be slowed by our funnel (see `workflows/02_low_ticket_offer.md` §3 Objection 4).

---

### C3. "Where do I download the Playbook? / How do I access Skool?"
**Subject:** Re: Playbook + Skool access

```
Hi [Name],

Here you go:

  • Playbook dashboard / download: [PLAYBOOK URL]
  • Skool community: [SKOOL INVITE LINK]

If the Skool invite link doesn't work (sometimes single-use links
expire), reply here and I'll send a fresh one in under an hour.

[Sender Name]
```

---

### C4. "I want a refund."
> *No friction inside 14 days. Process same day.*

**Subject:** Re: Your refund — done

```
Hi [Name],

Got it — refund is processed. You'll see it back on your card
within 5–7 business days (Stripe's window, not ours).

Quick favour, no pressure: if you have 30 seconds, what didn't
work? We use feedback like this to fix the playbook for the next
group. One sentence is plenty.

Either way, your access has been removed and nothing else will
hit your card.

[Sender Name]
```

**Internal:**
- Inside 14 days → process immediately, no friction.
- 14–30 days → process if the request is tied to a delivery issue (couldn't access, missing piece, broken link).
- 30+ days → escalate to Emma.
- After processing, remove from Skool and the buyer ESP segment.

---

### C5. "My payment failed / got declined / weird charge on my card"
**Subject:** Re: Payment issue — let's get this sorted

```
Hi [Name],

Thanks for flagging — I want to get you sorted today.

On our end I'm seeing [pull from Stripe: charge succeeded /
charge declined / no record]. A few common causes:

  • Some banks block first-time charges from new merchants —
    a quick call to your bank usually clears it.
  • If the card has a daily limit, you may have hit it.
  • If you have two charges showing, one is likely an
    authorization that will drop off in 1–3 business days.

Easiest path: try again here → [OFFER URL]

If it still doesn't go through, reply with the last 4 digits of
the card and I'll dig into Stripe for you.

[Sender Name]
```

**Internal:** Never ask for full card numbers over email. Last 4 only, and only to identify the charge in Stripe.

---

## Category D — Sales / Offer Questions

### D1. "Does the $147 Playbook include the $40k guarantee?"
> *Get this exactly right. The wrong answer = a refund we can't defend.*

**Subject:** Re: The guarantee — clarifying

```
Hi [Name],

Great question. The $40k-in-60-days guarantee is on our
done-with-you retainer (where we run the ads ourselves for you).
The $147 Playbook gives you the *system* — every template, prompt,
landing page, and sequence we use to hit that number for clients.

The reason the guarantee lives at the retainer level is that we
can only guarantee outcomes we control. Your execution speed,
market, and lead handling are yours to drive at the Playbook tier.

If having us run the whole thing for you sounds better — that's
what the 30-minute review call is for. We'll talk about whether
the retainer is a fit for your market and goals.

[Sender Name]
```

---

### D2. "I'd rather skip the playbook and book a retainer call directly."
**Subject:** Re: Talking about the retainer directly

```
Hi [Name],

Totally fair. The Playbook exists to make the review call useful —
we want you to have run something before we talk so we're solving
real problems, not hypotheticals. But if you're already running
ads and ready to discuss having us run them for you, I can route
you straight to Chris.

Couple of quick questions before I send the link:

1. What's your average home price in your market?
2. How much are you currently spending on ads per month?
3. What's stopping you from scaling that spend right now?

Reply with those and I'll get you booked.

[Sender Name]
```

**Internal:** Hot retainer leads should never be slowed by our funnel. Flag to Chris immediately on reply.

---

### D3. "Is this for me if I'm new / haven't done ads before?"
**Subject:** Re: Is this right for you?

```
Hi [Name],

Honest answer: yes, if you're willing to follow a system; no,
if you're looking for someone to do it for you at the $147 tier.

The Playbook is built for realtors making $150k+ who haven't yet
cracked paid ads — most of our buyers have tried Facebook ads
once or twice, got mixed results, and want a system that works.
If that's you, the templates make it possible to launch in a
weekend.

The market you're in matters more than your experience. The
system needs an average home price of USD $600k+ to hit the
unit economics we promise.

The webinar's free — come watch and decide.

[Sender Name]
```

---

## Category E — General / Catch-All

### E1. "Who is this company / can I see results / proof?"
**Subject:** Re: A few proof points

```
Hi [Name],

Smart to ask. Here's what we've got:

  • [LINK to case studies page / 2–3 client results]
  • The webinar itself walks through 2–3 specific clients with
    real numbers (ad spend, leads generated, deals closed).
  • Skool community is full of buyers running the system right
    now — you'll see their posts the moment you join.

If you want to chat with a current client before buying, reply
here and I'll see who's open to a quick call.

[Sender Name]
```

---

### E2. The catch-all "I don't know what to say" template
**Subject:** Re: [their subject]

```
Hi [Name],

Great question — let me get you a proper answer. I'm looping in
[Emma / Chris / whoever] who can give you the full picture, and
you should have a reply by [end of day / tomorrow].

Anything else in the meantime, just reply here.

[Sender Name]
```

**Internal:** Use this whenever you're tempted to make something up. A 12-hour delay is cheaper than a wrong promise.

---

## New Patterns (Add Here After Webinar 1)

> When a question comes in that doesn't match any template above, write a fresh response, send it, then paste a clean version here so we have it for next week.

- (empty — first run)

---

## What This Run Taught Us

> Append after first webinar:
- Which templates got used the most?
- Which questions came in that we *didn't* anticipate?
- Did the C2 (Day 28) template actually reduce the "where's my call?" flood?
- Any objection or refund pattern we should fold back into `workflows/02_low_ticket_offer.md`?
