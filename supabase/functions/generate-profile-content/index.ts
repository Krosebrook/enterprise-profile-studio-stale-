import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RequestSchema = z.object({
  type: z.enum(['description', 'tagline', 'service']),
  context: z.object({
    companyName: z.string().max(200).optional(),
    industry: z.string().max(200).optional(),
    serviceName: z.string().max(200).optional(),
    description: z.string().max(2000).optional(),
    tagline: z.string().max(200).optional(),
    keywords: z.array(z.string().max(100)).max(20).optional(),
  }),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const _supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!);
    const { data: { user: _user }, error: _authError } = await _supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (_authError || !_user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const parsed = RequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const { type, context } = parsed.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case 'description':
        systemPrompt = `You are a professional business copywriter specializing in enterprise company descriptions. 
Write compelling, professional descriptions that highlight value propositions and establish credibility.
Keep descriptions between 100-200 words. Use professional business language.
Do not use overly promotional or salesy language. Focus on value and expertise.`;
        userPrompt = `Write a professional company description for ${context.companyName || 'a company'} in the ${context.industry || 'technology'} industry.
${context.tagline ? `Company tagline: ${context.tagline}` : ''}
${context.keywords?.length ? `Key themes to incorporate: ${context.keywords.join(', ')}` : ''}`;
        break;

      case 'tagline':
        systemPrompt = `You are an expert brand strategist specializing in creating memorable company taglines.
Create concise, impactful taglines that capture the essence of a company's value proposition.
Keep taglines under 10 words. Make them memorable and distinctive.
Avoid clichés and overused phrases.`;
        userPrompt = `Create a compelling tagline for ${context.companyName || 'a company'} in the ${context.industry || 'technology'} industry.
${context.description ? `Company context: ${context.description.substring(0, 200)}` : ''}
Provide just the tagline, nothing else.`;
        break;

      case 'service':
        systemPrompt = `You are a professional services copywriter.
Write clear, compelling service descriptions that explain value to potential clients.
Keep descriptions between 50-100 words. Focus on benefits and outcomes.
Use professional but accessible language.`;
        userPrompt = `Write a professional description for the service: "${context.serviceName || 'Consulting Services'}"
${context.companyName ? `Company: ${context.companyName}` : ''}
${context.industry ? `Industry: ${context.industry}` : ''}
Provide just the description, nothing else.`;
        break;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate content");
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content?.trim() || "";

    return new Response(
      JSON.stringify({ content: generatedContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Generation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});