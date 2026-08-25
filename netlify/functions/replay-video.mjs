// Replay video endpoint — same pattern as webinar-date:
//   GET  /api/replay-video  -> { embedUrl, sourceUrl }  (03-replay.html reads this on load)
//   POST /api/replay-video  -> set the video. Auth: "Authorization: Bearer <WEBINAR_UPDATE_SECRET>"
//        Body: { "url": "https://grain.com/share/highlight/AbC123" }
// Paste the normal share link; the embed URL is derived. Stored in Netlify Blobs, live instantly.

import { getStore } from "@netlify/blobs";

const STORE = "webinar";
const KEY = "replay-video";

// Only these hosts can ever end up in the iframe src.
const PROVIDERS = [
  {
    name: "grain",
    match: /^(?:www\.)?grain\.com$/i,
    embed: (u) => {
      const id = (u.pathname.match(/\/(?:_\/embed\/)?(?:share\/)?highlight\/([A-Za-z0-9_-]+)/) || [])[1];
      if (!id) return null;
      return `https://grain.com/_/embed/highlight/${id}?show_engagement=true&autoplay=false&origin=user_iframe`;
    },
  },
  {
    name: "vimeo",
    match: /^(?:www\.|player\.)?vimeo\.com$/i,
    embed: (u) => {
      const parts = u.pathname.split("/").filter(Boolean);
      const id = parts.find((p) => /^\d+$/.test(p));
      if (!id) return null;
      // Unlisted videos carry a hash: vimeo.com/<id>/<hash> or ?h=<hash>
      const after = parts[parts.indexOf(id) + 1];
      const hash = u.searchParams.get("h") || (/^[a-f0-9]{6,}$/i.test(after || "") ? after : null);
      return `https://player.vimeo.com/video/${id}?${hash ? `h=${hash}&` : ""}title=0&byline=0&portrait=0`;
    },
  },
  {
    name: "youtube",
    match: /^(?:www\.|m\.)?(?:youtube\.com|youtu\.be)$/i,
    embed: (u) => {
      const id = /youtu\.be$/i.test(u.hostname)
        ? u.pathname.slice(1)
        : u.searchParams.get("v") || (u.pathname.match(/\/(?:embed|live|shorts)\/([A-Za-z0-9_-]+)/) || [])[1];
      if (!id) return null;
      return `https://www.youtube.com/embed/${id}?rel=0`;
    },
  },
  {
    name: "loom",
    match: /^(?:www\.)?loom\.com$/i,
    embed: (u) => {
      const id = (u.pathname.match(/\/(?:share|embed)\/([A-Za-z0-9]+)/) || [])[1];
      return id ? `https://www.loom.com/embed/${id}` : null;
    },
  },
  {
    name: "wistia",
    match: /^(?:.+\.)?wistia\.(?:com|net)$/i,
    embed: (u) => {
      const id = (u.pathname.match(/\/(?:medias|embed\/iframe)\/([A-Za-z0-9]+)/) || [])[1];
      return id ? `https://fast.wistia.net/embed/iframe/${id}` : null;
    },
  },
];

function toEmbedUrl(raw) {
  let u;
  try { u = new URL(String(raw || "").trim()); } catch { return null; }
  if (u.protocol !== "https:") return null;
  const provider = PROVIDERS.find((p) => p.match.test(u.hostname));
  if (!provider) return null;
  const embedUrl = provider.embed(u);
  return embedUrl ? { embedUrl, provider: provider.name } : null;
}

export default async (req) => {
  const store = getStore(STORE);

  if (req.method === "GET") {
    const saved = await store.get(KEY, { type: "json" });
    if (!saved) return Response.json({ error: "no replay video set yet" }, { status: 404 });
    return Response.json(saved, { headers: { "cache-control": "public, max-age=60" } });
  }

  if (req.method === "POST") {
    const secret = process.env.WEBINAR_UPDATE_SECRET;
    const auth = req.headers.get("authorization") || "";
    if (!secret || auth !== `Bearer ${secret}`) {
      return new Response("Unauthorized", { status: 401 });
    }
    let body;
    try { body = await req.json(); } catch {
      return Response.json({ error: "invalid JSON body" }, { status: 400 });
    }
    const parsed = toEmbedUrl(body.url);
    if (!parsed) {
      return Response.json({
        error: "invalid or unsupported video url — paste an https share link from Grain, Vimeo, YouTube, Loom, or Wistia",
      }, { status: 400 });
    }
    const payload = {
      embedUrl: parsed.embedUrl,
      provider: parsed.provider,
      sourceUrl: String(body.url).trim(),
      caption: typeof body.caption === "string" ? body.caption.slice(0, 200) : undefined,
      updatedAt: new Date().toISOString(),
    };
    await store.setJSON(KEY, payload);
    return Response.json({ ok: true, ...payload });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = { path: "/api/replay-video" };
