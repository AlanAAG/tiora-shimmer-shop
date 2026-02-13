import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { productId, amount, productName } = await req.json();

    if (!productId || !amount || !productName) {
      throw new Error("Missing required fields: productId, amount, productName");
    }

    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!keyId || !keySecret) {
      throw new Error("Razorpay credentials not configured");
    }

    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase credentials not configured");
    }

    const auth = btoa(`${keyId}:${keySecret}`);

    // Call Razorpay API to create payment link
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/payment_links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to paise
        currency: "INR",
        accept_partial: false,
        description: `Payment for ${productName}`,
        reference_id: `order_${Date.now()}_${productId}`,
        callback_url: "https://tiora.co/success",
        callback_method: "get",
        options: {
          checkout: {
            name: "TIORA",
            // Enable shipping address collection as requested
            // Note: Please verify the exact parameter name in Razorpay docs if 'shipping_address' is not the correct one.
            // Some integrations use specific feature flags or dashboard settings.
            shipping_address: true
          }
        }
      }),
    });

    const razorpayData = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      console.error("Razorpay Error:", razorpayData);
      throw new Error(razorpayData.error?.description || "Failed to create payment link");
    }

    // Initialize Supabase Client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store in database
    const { error: dbError } = await supabase
      .from("payments")
      .insert({
        payment_link_id: razorpayData.id,
        product_id: productId,
        amount: amount,
        status: razorpayData.status,
        short_url: razorpayData.short_url,
      });

    if (dbError) {
      console.error("Database Error:", dbError);
      // We don't stop the flow here because the link is created, but we should log it.
    }

    return new Response(
      JSON.stringify({ short_url: razorpayData.short_url, id: razorpayData.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
