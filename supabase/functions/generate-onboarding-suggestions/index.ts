import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SuggestRequest {
  role: string;
  experienceLevel: string;
  existingPreferences?: {
    targetIndustries?: string[];
    riskTolerance?: string;
  };
}

interface RoleProfile {
  industries: string[];
  dealStructures: string[];
  stages: string[];
  riskProfile: string;
  investmentRange: { min: number; max: number };
}

const roleProfiles: Record<string, RoleProfile> = {
  individual_investor: {
    industries: ["Technology", "Healthcare & Life Sciences", "Consumer & Retail"],
    dealStructures: ["Equity", "SAFE", "Convertible Notes"],
    stages: ["Seed", "Series A", "Series B"],
    riskProfile: "moderate",
    investmentRange: { min: 25000, max: 250000 },
  },
  fund_manager: {
    industries: ["Technology", "Financial Services", "Healthcare & Life Sciences", "Industrial & Manufacturing"],
    dealStructures: ["Equity", "Preferred Equity", "Mezzanine"],
    stages: ["Series B", "Series C+", "Growth Equity"],
    riskProfile: "moderate",
    investmentRange: { min: 1000000, max: 25000000 },
  },
  family_office: {
    industries: ["Real Estate", "Energy & Utilities", "Financial Services", "Technology"],
    dealStructures: ["Equity", "Debt", "Joint Venture", "Preferred Equity"],
    stages: ["Growth Equity", "Buyout", "Secondary"],
    riskProfile: "conservative",
    investmentRange: { min: 500000, max: 10000000 },
  },
  institutional: {
    industries: ["Financial Services", "Industrial & Manufacturing", "Energy & Utilities", "Technology"],
    dealStructures: ["Equity", "Debt", "Mezzanine", "Preferred Equity"],
    stages: ["Series C+", "Growth Equity", "Buyout"],
    riskProfile: "conservative",
    investmentRange: { min: 5000000, max: 100000000 },
  },
  advisor: {
    industries: ["Technology", "Healthcare & Life Sciences", "Financial Services"],
    dealStructures: ["Equity", "Convertible Notes", "SAFE"],
    stages: ["Seed", "Series A", "Series B", "Series C+"],
    riskProfile: "moderate",
    investmentRange: { min: 50000, max: 500000 },
  },
};

interface ExperienceModifier {
  riskAdjustment: number;
  stagePreference: string[] | null;
  diversificationAdvice: string;
}

const experienceModifiers: Record<string, ExperienceModifier> = {
  novice: {
    riskAdjustment: -1, // More conservative
    stagePreference: ["Seed", "Series A"],
    diversificationAdvice: "higher",
  },
  intermediate: {
    riskAdjustment: 0,
    stagePreference: null,
    diversificationAdvice: "balanced",
  },
  experienced: {
    riskAdjustment: 0,
    stagePreference: null,
    diversificationAdvice: "balanced",
  },
  expert: {
    riskAdjustment: 1, // Can handle more risk
    stagePreference: null,
    diversificationAdvice: "flexible",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { role, experienceLevel, existingPreferences }: SuggestRequest = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Generating suggestions for role: ${role}, experience: ${experienceLevel}`);

    // Get base profile for role
    const baseProfile = roleProfiles[role] || roleProfiles.individual_investor;
    const expMod = experienceModifiers[experienceLevel] || experienceModifiers.intermediate;

    // Build AI prompt for personalized suggestions
    const systemPrompt = `You are an expert investment advisor helping personalize deal sourcing criteria.
Based on the investor profile, provide specific, actionable suggestions.
Return a JSON object with the following structure:
{
  "industries": ["array of 3-5 recommended industries"],
  "dealStructures": ["array of 2-4 recommended deal structures"],
  "stages": ["array of 2-4 recommended deal stages"],
  "regions": ["array of 2-3 recommended geographic regions"],
  "riskTolerance": "one of: conservative, moderate, aggressive, very_aggressive",
  "investmentRange": { "min": number, "max": number },
  "reasoning": "Brief 2-3 sentence explanation of why these recommendations fit the profile",
  "tips": ["array of 2-3 personalized tips for this investor type"]
}`;

    const userPrompt = `Generate personalized deal sourcing recommendations for:
- Role: ${role.replace(/_/g, ' ')}
- Experience Level: ${experienceLevel}
- Base suggestions: Industries (${baseProfile.industries.join(', ')}), Stages (${baseProfile.stages.join(', ')})
${existingPreferences?.targetIndustries?.length ? `- Already interested in: ${existingPreferences.targetIndustries.join(', ')}` : ''}
${existingPreferences?.riskTolerance ? `- Current risk tolerance: ${existingPreferences.riskTolerance}` : ''}

Tailor the recommendations to be specific and actionable for this investor profile.`;

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
        tools: [
          {
            type: "function",
            function: {
              name: "provide_suggestions",
              description: "Return personalized deal sourcing suggestions",
              parameters: {
                type: "object",
                properties: {
                  industries: {
                    type: "array",
                    items: { type: "string" },
                    description: "Recommended target industries"
                  },
                  dealStructures: {
                    type: "array",
                    items: { type: "string" },
                    description: "Recommended deal structures"
                  },
                  stages: {
                    type: "array",
                    items: { type: "string" },
                    description: "Recommended deal stages"
                  },
                  regions: {
                    type: "array",
                    items: { type: "string" },
                    description: "Recommended geographic regions"
                  },
                  riskTolerance: {
                    type: "string",
                    enum: ["conservative", "moderate", "aggressive", "very_aggressive"]
                  },
                  investmentRange: {
                    type: "object",
                    properties: {
                      min: { type: "number" },
                      max: { type: "number" }
                    },
                    required: ["min", "max"]
                  },
                  reasoning: { type: "string" },
                  tips: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["industries", "dealStructures", "stages", "regions", "riskTolerance", "investmentRange", "reasoning", "tips"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "provide_suggestions" } },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        // Return fallback based on role profile
        console.log("Rate limited, returning fallback suggestions");
        return new Response(
          JSON.stringify({
            suggestions: {
              ...baseProfile,
              regions: ["North America", "Europe"],
              reasoning: "Based on your role and experience level.",
              tips: ["Start with familiar industries", "Consider diversification"],
            },
            source: "fallback"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
      throw new Error("Failed to generate suggestions");
    }

    const data = await response.json();
    
    // Extract tool call result
    let suggestions;
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      suggestions = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback to base profile if AI doesn't return tool call
      suggestions = {
        ...baseProfile,
        regions: ["North America", "Europe"],
        reasoning: "Based on your role and experience level.",
        tips: ["Start with familiar industries", "Consider diversification"],
      };
    }

    console.log("Generated suggestions:", JSON.stringify(suggestions));

    return new Response(
      JSON.stringify({ suggestions, source: "ai" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Suggestion generation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
