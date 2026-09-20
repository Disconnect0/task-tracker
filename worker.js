export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-API-KEY",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Where the tracker's JSON blob lives in KV. Change this if you're
    // reusing one KV namespace for more than one deployment of this
    // template and need to keep their data apart.
    const key = "tracker_data";

    // No default/fallback value on purpose: this MUST be set as a secret
    // (wrangler secret put API_TOKEN, or Settings -> Variables in the
    // dashboard) before this worker can accept writes. Shipping a
    // hardcoded fallback in a public template means every fork shares
    // the same "secret" until someone remembers to change it.
    const EXPECTED_TOKEN = env.API_TOKEN;

    if (request.method === "GET") {
      const data = await env.TRACKER_KV.get(key);
      return new Response(data || "null", {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (request.method === "POST") {
      if (!EXPECTED_TOKEN) {
        // Fail closed: refuse writes rather than silently accepting any
        // password because the secret was never configured.
        return new Response(JSON.stringify({ error: "Server misconfigured: API_TOKEN secret is not set" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const clientToken = request.headers.get("X-API-KEY");
      if (clientToken !== EXPECTED_TOKEN) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const body = await request.text();
      await env.TRACKER_KV.put(key, body);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  },
};
