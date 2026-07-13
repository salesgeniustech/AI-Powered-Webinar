# In-House AI Team Funnel — aiteam.salesgenius.co

Standalone funnel for the **30-Day In-House AI Team Install** ($2,997). Separate Netlify site from the webinar funnel (aiads.salesgenius.co).

## Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | aiteam.salesgenius.co | Sales page (VSL + offer + proof wall) |
| `checkout.html` | /checkout.html | Purchase page (Stripe Payment Link) |
| `welcome.html` | /welcome.html | Post-purchase onboarding (Week 0) |

## First-time setup (Arslan)

1. **New Netlify site:** app.netlify.com → Add new project → deploy manually → drag this `aiteam-funnel` folder onto the drop zone.
2. **Custom domain:** Site settings → Domain management → add `aiteam.salesgenius.co`. Then in the salesgenius.co DNS, add a CNAME record: `aiteam` → `<sitename>.netlify.app`. Netlify provisions SSL automatically.
3. **Stripe:** create the $2,997 product + Payment Link. Set the Payment Link's success URL to `https://aiteam.salesgenius.co/welcome.html`. Paste the link into `checkout.html` (search `STRIPE_PAYMENT_LINK`).

## Before launch (config swaps)

- `index.html`: VSL embed (search `VSL-EMBED`), Typeform ID (`REPLACE_WITH_SPRINT_TF_ID`), cohort date + seats in the `SPRINT` config block at the bottom.
- `checkout.html`: Stripe link, date/seats config.
- `welcome.html`: welcome video embed, `INTAKE_TYPEFORM_URL`, `CAL_LINK_WEEK1–4`, date config.

## Updating after launch

Edit the file → drag the whole folder onto the site's Deploys page again. Netlify Drop replaces everything atomically.

## Proof wall

`assets/proof-wall.js` is the canonical copy of the global testimonial component (see `SG-PROOF-WALL-README.md` in the project root). To reuse it on other funnels, point them at `https://aiteam.salesgenius.co/assets/proof-wall.js` with `data-base="https://aiteam.salesgenius.co"`.
