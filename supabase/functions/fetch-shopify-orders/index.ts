import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SHOPIFY_SHOP_DOMAIN = "jtv22j-ew.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user via JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userEmail = claimsData.claims.email as string;
    if (!userEmail) {
      return new Response(JSON.stringify({ error: "No email found for user" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch orders from Shopify Admin API
    const shopifyAccessToken = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!shopifyAccessToken) {
      return new Response(JSON.stringify({ error: "Shopify not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const shopifyUrl = `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/orders.json?email=${encodeURIComponent(userEmail)}&status=any&fields=id,name,created_at,total_price,currency,financial_status,fulfillment_status,fulfillments,line_items,order_status_url`;

    const shopifyRes = await fetch(shopifyUrl, {
      headers: {
        "X-Shopify-Access-Token": shopifyAccessToken,
        "Content-Type": "application/json",
      },
    });

    if (!shopifyRes.ok) {
      const errorText = await shopifyRes.text();
      console.error("Shopify API error:", shopifyRes.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch orders from Shopify" }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const shopifyData = await shopifyRes.json();
    const orders = shopifyData.orders || [];

    // Transform orders for the frontend
    const transformedOrders = orders.map((order: any) => ({
      id: order.id,
      name: order.name, // e.g. "#1001"
      created_at: order.created_at,
      total_price: order.total_price,
      currency: order.currency,
      financial_status: order.financial_status,
      fulfillment_status: order.fulfillment_status || "unfulfilled",
      order_status_url: order.order_status_url,
      line_items: (order.line_items || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        variant_title: item.variant_title,
        quantity: item.quantity,
        price: item.price,
        image_url: item.image?.src || null,
      })),
      fulfillments: (order.fulfillments || []).map((f: any) => ({
        id: f.id,
        status: f.status,
        tracking_number: f.tracking_number,
        tracking_url: f.tracking_url,
        tracking_company: f.tracking_company,
        created_at: f.created_at,
      })),
    }));

    return new Response(JSON.stringify({ orders: transformedOrders }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
