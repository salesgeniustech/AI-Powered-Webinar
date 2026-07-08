# Pixel & Tracking Setup, AI Ads Webinar Funnel

*Built to the SOP's tracking section. Goal: every page fires the right event, client-side **and** server-side, with UTM attribution so you can calculate true cost-per-lead by ad creative.*

**Your live Meta Pixel ID:** `1057475448873422` (already pulled from salesgenius.co and embedded in `index.html`).

---

## The event map (this is the whole system)

| Page | On load | Primary optimization event |
|---|---|---|
| Registration (`index.html`) | `PageView` |  |
| Confirmation (`02-confirmation.html`) | `PageView` + **`Lead`** | ✅ **`Lead`**, optimize registration ads to this |
| Replay (`03-replay.html`) | `PageView` + `ViewContent` |  |
| Checkout (`04-checkout.html`) | `PageView` + **`InitiateCheckout`** |  |
| OTO (`05-oto-voice-caller.html`) | `PageView` + `Purchase` (value 197) on accept |  |
| Thank-you (`06-thank-you.html`) | `PageView` + **`Purchase`** (value 97) | ✅ **`Purchase`**, optimize purchase ads to this |

**Why Lead fires on the confirmation page (not the form submit):** landing on the confirmation page means they completed the opt-in, a cleaner, single signal per registrant. It fires once on load, so no double-counting. Set `Lead` as the optimization event for the registration campaign. The `$97 Purchase` fires on the thank-you page, after payment.

---

## 1. Meta Pixel, already installed on the registration page

The base code + `PageView` is on all six pages. Each page's specific event (already installed):

- **02-confirmation.html**, on load: `fbq('track','Lead',{content_name:'Masterclass Registration'});`
- **04-checkout.html**, on load: `fbq('track','InitiateCheckout',{value:97,currency:'USD'});`
- **06-thank-you.html**, on load: `fbq('track','Purchase',{value:97,currency:'USD',content_name:'AI Ad Machine'});`
- **05-oto-voice-caller.html**, on accept: `fbq('track','Purchase',{value:197,currency:'USD'});`
- **03-replay.html**, on load: `fbq('track','ViewContent',{content_name:'Webinar Replay'});`

---

## 2. Meta Conversions API (server-side), do NOT skip

iOS + ad blockers eat 20-40% of browser-side events. Send the same events server-side so Meta still sees them.

Easiest path (no code): in your funnel/checkout platform, turn on the native **Conversions API** integration and point it at this pixel ID. If you're self-hosting on Netlify, send events from the functions:
- `register.js` already receives the lead → also POST a `Lead` event to the CAPI Graph endpoint.
- Add a `stripe-webhook.js` (per CLAUDE.md) → on `checkout.session.completed`, POST a `Purchase` event server-side. This is the most important server event because it's money and the most blocked client-side.

Set **`action_source: "website"`**, hash email/phone (SHA-256), and pass the **`event_id`** matching the browser event so Meta dedupes. (Without a matching `event_id`, you'll double-count.)

---

## 3. GA4

Add your gtag snippet to every page `<head>` (placeholder comment is already in `index.html`). Recommended events: `generate_lead` (reg submit), `webinar_confirmed` (confirmation load), `begin_checkout`, `purchase` (with value + currency). Mark `purchase` and `webinar_confirmed` as conversions in GA4.

---

## 4. UTM capture (attribution)

`index.html` already grabs `utm_source/medium/campaign/content/term` from the URL and sends them to `register.js`. Before launch:
- Store those UTMs on the contact in your ESP/CRM (the TODO is flagged in `register.js`).
- That's how you get true **cost-per-lead by creative and audience**, the SOP's whole point. Tag every ad's destination URL with UTMs.

---

## 5. Retargeting audiences ("Hammer Them", Phase 2)

- **Registrants who didn't attend** → custom audience from `Lead`/`Schedule`, exclude `Purchase`. Run replay ads.
- **Attendees who didn't buy** → audience from webinar-room `ViewContent`, exclude `Purchase`. Run offer/urgency ads.
- **Buyers** → exclude from all prospecting; seed a lookalike for cold targeting.

---

## Pre-launch tracking checklist

- [ ] Base pixel on all 6 pages, `PageView` firing (verify with Meta Pixel Helper).
- [ ] `Lead` fires on reg submit; `Schedule` fires on confirmation load.
- [ ] `Schedule` set as the ad-set optimization event (custom conversion).
- [ ] Conversions API live for `Lead` + `Purchase`, with `event_id` dedup.
- [ ] GA4 conversions marked.
- [ ] UTMs landing on the contact record in the ESP/CRM.
- [ ] Test purchase fires `Purchase` once (not twice) across pixel + CAPI.
