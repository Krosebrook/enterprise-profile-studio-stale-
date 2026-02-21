import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RequestSchema = z.object({
  usagePatterns: z.object({
    primaryUseCase: z.string().min(1).max(500),
    teamSize: z.number().int().min(1).max(100000),
    budget: z.string().min(1).max(100),
    technicalLevel: z.string().min(1).max(50),
    industryFocus: z.string().min(1).max(200),
    priorityCapabilities: z.array(z.string().max(200)).max(20),
  }),
  currentPlatforms: z.array(z.string().max(200)).max(20).optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
    const { usagePatterns, currentPlatforms } = parsed.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an AI platform recommendation engine for enterprise software teams. 
Analyze usage patterns and suggest optimal AI platform configurations.
You must return recommendations using the suggest_platforms function.`;

    const userPrompt = `Based on these usage patterns, recommend the best AI platforms:

Primary Use Case: ${usagePatterns.primaryUseCase}
Team Size: ${usagePatterns.teamSize}
Budget: ${usagePatterns.budget}
Technical Level: ${usagePatterns.technicalLevel}
Industry Focus: ${usagePatterns.industryFocus}
Priority Capabilities: ${usagePatterns.priorityCapabilities.join(", ")}
${currentPlatforms?.length ? `Currently Using: ${currentPlatforms.join(", ")}` : ""}

Provide 3-5 platform recommendations with match scores and reasoning.`;

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
          { role: "user", content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_platforms",
              description: "Return AI platform recommendations with scores and reasoning",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        platformName: { type: "string" },
                        matchScore: { type: "number", minimum: 0, maximum: 100 },
                        category: { type: "string" },
                        reasoning: { type: "string" },
                        keyStrengths: { type: "array", items: { type: "string" } },
                        considerations: { type: "array", items: { type: "string" } },
                        estimatedROI: { type: "string" },
                        implementationEffort: { type: "string", enum: ["low", "medium", "high"] }
                      },
                      required: ["platformName", "matchScore", "category", "reasoning", "keyStrengths"]
                    }
                  },
                  overallStrategy: { type: "string" },
                  suggestedStack: {
                    type: "object",
                    properties: {
                      primary: { type: "string" },
                      secondary: { type: "string" },
                      specialized: { type: "array", items: { type: "string" } }
                    }
                  }
                },
                required: ["recommendations", "overallStrategy"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "suggest_platforms" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (toolCall?.function?.arguments) {
      const recommendations = JSON.parse(toolCall.function.arguments);
      console.log("Generated recommendations:", recommendations);
      return new Response(JSON.stringify(recommendations), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("No recommendations generated");
  } catch (error) {
    console.error("Recommendation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
