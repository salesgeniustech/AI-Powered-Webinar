// Webinar registration handler (STUB).
// Receives the opt-in, captures UTMs, and (TODO) forwards to your ESP +
// webinar platform. Returns JSON so the page can fire the Lead pixel and
// redirect to /confirmation.
//
// Wire up before launch (see CLAUDE.md env vars):
//   ESP_API_KEY, ESP_LIST_ID_WEBINAR_REGISTRANTS, WEBINAR_API_KEY, WEBINAR_EVENT_ID

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data = {};
  try { data = JSON.parse(event.body || "{}"); }
  catch (e) { return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Bad JSON" }) }; }

  const { firstName, email, phone, utm } = data;
  if (!firstName || !email) {
    return { statusCode: 422, body: JSON.stringify({ ok: false, error: "Name and email required" }) };
  }

  // --- TODO: forward to ESP (ConvertKit/ActiveCampaign/Klaviyo) ---
  // await fetch(`https://api.your-esp.com/subscribers`, { method:"POST", headers:{Authorization:`Bearer ${process.env.ESP_API_KEY}`}, body: JSON.stringify({ email, first_name:firstName, phone, list:process.env.ESP_LIST_ID_WEBINAR_REGISTRANTS, fields:{ ...utm } }) });
  // --- TODO: register on webinar platform (WebinarJam/Demio/Zoom) to get the unique join link ---

  console.log("New registrant:", { firstName, email, phone, utm });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true, redirect: "02-confirmation.html" })
  };
};
