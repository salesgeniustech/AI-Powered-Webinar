// Webinar date endpoint — one URL, two jobs:
//   GET  /api/webinar-date  -> { dateText, targetISO }  (pages read this on load)
//   POST /api/webinar-date  -> set the date. Auth: "Authorization: Bearer <WEBINAR_UPDATE_SECRET>"
//        Body: { "date": "2026-08-04 12:00" }  — offset optional; Eastern assumed if missing.
// Stored in Netlify Blobs, so updates are live instantly with no redeploy.

import { getStore } from "@netlify/blobs";

const STORE = "webinar";
const KEY = "date";

// "August 4 at 12 PM EDT" (minutes shown only when non-zero)
function formatDateText(d) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "long", day: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
    timeZoneName: "short",
  }).formatToParts(d);
  const get = (t) => (parts.find((p) => p.type === t) || {}).value || "";
  const time = get("minute") === "00" ? get("hour") : get("hour") + ":" + get("minute");
  return `${get("month")} ${get("day")} at ${time} ${get("dayPeriod")} ${get("timeZoneName")}`;
}

// "-04:00" or "-05:00" for the given instant, per America/New_York DST rules
function easternOffset(d) {
  const tz = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "longOffset",
  }).formatToParts(d).find((p) => p.type === "timeZoneName").value; // e.g. "GMT-04:00"
  return tz.replace("GMT", "") || "+00:00";
}

function parseInput(raw) {
  const s = String(raw || "").trim().replace(" ", "T");
  if (/([+-]\d{2}:?\d{2}|Z)$/i.test(s)) {
    const d = new Date(s);
    return isNaN(d) ? null : { iso: s, date: d };
  }
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(s);
  if (!m) return null;
  const offset = easternOffset(new Date(`${m[1]}-${m[2]}-${m[3]}T12:00:00Z`));
  const iso = `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:00${offset}`;
  const d = new Date(iso);
  return isNaN(d) ? null : { iso, date: d };
}

export default async (req) => {
  const store = getStore(STORE);

  if (req.method === "GET") {
    const saved = await store.get(KEY, { type: "json" });
    if (!saved) return Response.json({ error: "no date set yet" }, { status: 404 });
    return Response.json(saved, {
      headers: { "cache-control": "public, max-age=60" },
    });
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
    const parsed = parseInput(body.date);
    if (!parsed) {
      return Response.json({
        error: 'invalid date — send { "date": "2026-08-04 12:00" } (Eastern assumed) or a full ISO string with offset',
      }, { status: 400 });
    }
    const payload = {
      dateText: formatDateText(parsed.date),
      targetISO: parsed.iso,
      updatedAt: new Date().toISOString(),
    };
    await store.setJSON(KEY, payload);
    return Response.json({ ok: true, ...payload });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = { path: "/api/webinar-date" };
