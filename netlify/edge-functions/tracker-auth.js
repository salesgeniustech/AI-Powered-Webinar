// Server-side password for /tracker only. The rest of the funnel stays public.
// Password is read from Netlify env vars (Site settings → Environment variables),
// falling back to the shared default. This runs at Netlify's edge, so the
// password is never shipped to the browser.
//
// Set these in Netlify for production:
//   TRACKER_USER = salesgenius
//   TRACKER_PASS = SG123!

export default async (request, context) => {
  const USER = Netlify.env.get("TRACKER_USER") || "salesgenius";
  const PASS = Netlify.env.get("TRACKER_PASS") || "SG123!";

  const header = request.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");

  if (scheme === "Basic" && encoded) {
    let decoded = "";
    try { decoded = atob(encoded); } catch (_) { decoded = ""; }
    const sep = decoded.indexOf(":");
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    if (user === USER && pass === PASS) {
      return context.next(); // authenticated → serve /tracker
    }
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="SalesGenius Webinar Tracker", charset="UTF-8"',
    },
  });
};

export const config = { path: ["/tracker", "/tracker/*"] };
