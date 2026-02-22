import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, persona_context } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build system prompt from persona context
    let systemPrompt = "You are INT OS AI Assistant — a helpful, knowledgeable AI strategy advisor. You help enterprise teams with AI adoption, platform evaluation, persona management, and implementation planning. Be concise, actionable, and professional.";
    
    if (persona_context) {
      const { name, job_title, department, communication_style, work_preferences, skills, goals, preferred_tone } = persona_context;
      systemPrompt = `You are INT OS AI Assistant, personalized for ${name}${job_title ? `, ${job_title}` : ''}${department ? ` in ${department}` : ''}.

Communication style: ${preferred_tone || 'professional'}. ${communication_style?.detail_level === 'concise' ? 'Keep responses brief.' : communication_style?.detail_level === 'detailed' ? 'Provide comprehensive detail.' : 'Balance detail appropriately.'}
${communication_style?.technical_depth === 'technical' ? 'Use full technical depth.' : communication_style?.technical_depth === 'simplified' ? 'Use simple, non-technical language.' : ''}
${skills?.length ? `Their skills: ${skills.join(', ')}.` : ''}
${goals?.length ? `Their goals: ${goals.join(', ')}.` : ''}

Help them with AI strategy, platform evaluation, implementation planning, and persona optimization. Be actionable and relevant to their role.`;
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
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
