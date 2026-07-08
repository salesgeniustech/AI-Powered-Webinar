# Funnel Deploy Guide (GitHub → Netlify → Domain)

This funnel is a static site in `funnel-pages/` (Typeform handles opt-ins). Once it lives in the
shared GitHub repo and that repo is connected to Netlify, **every push auto-deploys** and anyone
on the team with repo access can update it.

The live site today: **https://salesgenius-masterclass.netlify.app** (deployed manually via Netlify Drop).
This guide moves it to a proper Git-based, team-editable deploy.

---

## 0. Before you start
- Never commit secrets. `.gitignore` already blocks `.env`, `credentials.json`, `token.json`, etc.
- Production secrets (Stripe keys, etc.) live in **Netlify → Site settings → Environment variables**, not in the repo.
- You need: the shared repo URL, and Owner/Admin access to the SalesGenius Netlify account.

---

## 1. Put the funnel in the shared GitHub repo

**Option A — the funnel is its OWN new repo (simplest):**
```bash
cd "AI Powered Webinar"
git init
git add .
git commit -m "Add AI Ads Masterclass funnel"
git branch -M main
git remote add origin https://github.com/SalesGenius/<REPO-NAME>.git
git push -u origin main
```

**Option B — the funnel is a SUBFOLDER of the existing shared repo (common):**
```bash
# clone the shared repo (or use your existing clone)
git clone https://github.com/SalesGenius/<SHARED-REPO>.git
# copy this whole project into a subfolder, e.g. ai-ads-webinar/
cp -R "AI Powered Webinar" <SHARED-REPO>/ai-ads-webinar
cd <SHARED-REPO>
git add ai-ads-webinar
git commit -m "Add AI Ads Masterclass funnel"
git push
```
> With Option B, remember the funnel's **base directory** in Netlify is `ai-ads-webinar` (see step 2).

---

## 2. Connect the repo to Netlify (this is what enables auto-deploy)

1. Netlify → **Add new site → Import an existing project → GitHub** → pick the repo.
2. Build settings:
   - **Base directory:** blank for Option A, or `ai-ads-webinar` for Option B.
   - **Build command:** leave blank (no build step; it's static).
   - **Publish directory:** `funnel-pages` (Option A) or `ai-ads-webinar/funnel-pages` (Option B).
   - `netlify.toml` in the repo already sets `publish = "funnel-pages"`.
3. Deploy. You get a live URL immediately, and now **every push to `main` redeploys automatically.**

> If you'd rather keep the existing `salesgenius-masterclass` site: Site → **Site configuration → Build & deploy → Link repository**, then set the same base/publish as above. This keeps the current URL.

---

## 3. How the team updates the funnel (going forward)

Two ways, both auto-deploy:
- **Edit on GitHub.com:** open the file (e.g. `funnel-pages/index.html`), click the pencil, commit. Netlify redeploys in ~30s.
- **Edit locally:** `git pull` → edit → `git add . && git commit -m "..." && git push`.

**Weekly webinar date change:** edit the two `WEBINAR` lines in `funnel-pages/index.html` and
`funnel-pages/02-confirmation.html`, commit, push. Done. (See `funnel-pages/HOW-TO-UPDATE-AND-DEPLOY.md`.)

Use a **staging branch** for bigger changes: push to `staging`, Netlify gives a deploy preview URL,
review it, then merge to `main` to go live.

---

## 4. Connect your domain

1. Decide the URL. Recommended: a subdomain like **masterclass.salesgenius.co** (keeps the main site untouched).
2. Netlify → your site → **Domain management → Add a domain** → enter it.
3. Point DNS (in whoever hosts salesgenius.co's DNS):
   - **Subdomain (masterclass.salesgenius.co):** add a **CNAME** record →
     `masterclass` → `salesgenius-masterclass.netlify.app` (Netlify shows the exact target).
   - **Root/apex domain (salesgenius.co):** use Netlify's provided **A record** (or ALIAS/ANAME), per Netlify's instructions.
4. Netlify auto-provisions **HTTPS (SSL)** once DNS resolves (a few minutes to a few hours).
5. Set it as the **primary domain** and enable "force HTTPS."

> Update the ad destination URLs and any hardcoded links to the new domain once it's live.

---

## 5. Quick sanity check after connecting
- Push a tiny change → confirm Netlify auto-deploys.
- Visit the custom domain → registration loads, Typeform popup opens, confirmation page works.
- Padlock (HTTPS) shows on the domain.
