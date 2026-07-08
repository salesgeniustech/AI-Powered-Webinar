# AD STRATEGY, AI Ads Webinar

*The campaign plan behind the recordings. Built to `webinar-ads-promo-sop.md`. Voice: SalesGenius, capability-first, AI-led, honest proof, exclusive agency. No em-dashes. Reverse-engineered from `content/THE_OFFER.md`, `content/WEBINAR_STRUCTURE.md`, and the funnel pages.*

## The plan in one line
Webinar #1 runs to our **email list only** (warm, no ad spend). Starting webinar #2, we drive cold + warm traffic on **Meta** with a heavy retargeting (Hammer Them) layer, then re-target no-shows and non-buyers after.

## Production timeline (the deadline)
- **This week:** record every ad on the shot list (`01-RECORDING-SHOTLIST.md`).
- **Next week:** edit, caption, cut to format (square + vertical).
- **Then:** load into Meta and launch **10 to 14 days before webinar #2.** (The SOP is firm on this: starting ads 2 days out means the algorithm never calibrates and show rate tanks. Our 7-day email show-up sequence still works fine anchored to the event date; late registrants just drop into the stream.)

## Platform
**Meta (Facebook/Instagram) is primary.** Get it working there first. Google Search + YouTube are a later supplemental layer (same scripts work as YouTube ads); TikTok only if we have creative to spare. v1 = Meta only.

## Format mix
**80% video, 20% image.** Video pulls higher-intent registrants. Images are for retargeting people who already know us.

## Layer 1, Warm audiences (build before spending a dollar)
- **Email + phone list** uploaded as custom audiences (our warmest cold-traffic substitute and our lookalike seed).
- **Website visitors, 180 days** from the Meta pixel (`1057475448873422`), segmented by page (registration, confirmation, checkout).
- **Social engagers, 365 days** (IG + FB), and **video viewers** segmented by watch time (keep 75%+ separate from 3-second viewers).
- **Lookalikes (1%)** from: the email list, highest watch-time video viewers, and (after webinar #1) people who actually showed up. Expand to 3% only for scale.

## Layer 2, Cold audiences + exclusions
- Start with **Advantage+ / broad**, let the creative self-select, plus a couple of 1% lookalikes. Realtor interest stacks (real estate, Realtor.com, brokerages, Tom Ferry, etc.) as a backup tight audience.
- **Exclude on every cold ad set (zero warm contamination):** email list, phone list, 180-day site visitors, 365-day social engagers, 365-day video viewers, past registrants, and existing customers. Skipping this makes cold metrics lie, then CPL doubles when you scale.

## Layer 4, Hammer Them (retargeting registrants)
The moment someone registers, they get hit by every competitor's ads. We own that window. Audience = registered-but-not-attended (reg + confirmation page visitors / form submitters), excluding attendees and buyers. Three ad sets: Video Views, Engagement, and Conversions (urgency). Content = the four retargeting types on the shot list (framing, objection, get-to-know-you, belief). 8 to 15 distinct retargeting ads.

## Budget (built around your ~$1,750 CAD plan)
You collect USD, spend CAD, so don't treat front-end break-even as the bar. Stay above the randomness threshold (min 3 to 5 registrations/day). Two ways to run it:
- **Recommended:** ~$150/day x ~12 days = ~$1,800 CAD, started 12 days out.
- **Or your original:** $250/day x 7 days. Above threshold, but less algorithm runway. Prefer the longer runway if you can.

| Phase | Days | Split | Goal |
|---|---|---|---|
| Testing | 1-5 | 60-70% cold / 20-25% retarget / 10-15% creative test | Find winning hooks + audiences, kill losers |
| Optimization | 5-10 | 50-55% cold (winners) / 30-35% Hammer Them / 10-15% test | Stabilize CPL, build retargeting engine |
| Scale | 10-14+ | Scale winners +20% every 48-72h, retarget 30-35% | Volume while holding CPL + show rate |

## Benchmarks (kill/scale rules)
- **CPL target $5 to $12.** Above $20 = fix creative or audience. Below $5 = great, verify lead quality.
- **Show rate 20 to 40%** (10-15% floor). Below 10%, do not run; fix topic / confirmation page / emails first.
- **Frequency:** refresh creative before it passes 2.0 with declining performance. Don't wait for the dip.
- Model conservatively: at $5-12 CPL, ~$1,750 buys roughly 145-350 registrations, 30-140 attendees, a handful of founding sales plus the OTO.

## Pixel + tracking
Already specced in `content/PIXEL_TRACKING.md`. The ad-relevant musts: fire **Lead** on reg submit and **Schedule** on confirmation load (Schedule is the optimization event), Conversions API on for server-side, and UTMs on every ad URL so we can read true CPL by creative.

## Congruency rule
Every ad hook must match the registration headline and VSL promise: *your own buyer and seller leads, without being techy, because AI builds the ads.* Differentiate from the big spenders by being specific (AI + realtors + your own leads), not generic ("learn Facebook ads").
