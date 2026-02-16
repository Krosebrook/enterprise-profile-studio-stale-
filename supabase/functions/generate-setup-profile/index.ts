import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { full_name, job_title, department, company_name, industry } = await req.json();

    if (!job_title || !department) {
      return new Response(
        JSON.stringify({ error: "job_title and department are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are an enterprise AI configuration assistant. Given a person's details, generate a comprehensive profile covering both their company/org setup and their individual AI persona. Return ONLY valid JSON matching the exact schema provided.

Rules:
- Only include realistic, plausible data based on the role and industry
- Leave fields as null if they cannot be reasonably inferred
- Skills, tools, and expertise should be specific to the role
- Communication style should match the seniority/department
- Company info should be generic but realistic for the industry`;

    const userPrompt = `Generate a full setup profile for:
- Name: ${full_name || "Unknown"}
- Job Title: ${job_title}
- Department: ${department}
${company_name ? `- Company: ${company_name}` : ""}
${industry ? `- Industry: ${industry}` : ""}

Return JSON with this exact structure:
{
  "persona": {
    "name": "${full_name || ""}",
    "job_title": "${job_title}",
    "department": "${department}",
    "email": null,
    "skills": ["skill1", "skill2", ...],
    "expertise_areas": ["area1", "area2", ...],
    "tools_used": ["tool1", "tool2", ...],
    "goals": ["goal1", "goal2", ...],
    "pain_points": ["pain1", "pain2", ...],
    "communication_style": {
      "formality": "casual"|"balanced"|"formal",
      "detail_level": "concise"|"balanced"|"detailed",
      "technical_depth": "simplified"|"balanced"|"technical",
      "examples_preference": "minimal"|"moderate"|"extensive"
    },
    "work_preferences": {
      "focus_time": "morning"|"afternoon"|"evening"|"flexible",
      "collaboration_style": "async"|"realtime"|"mixed",
      "decision_making": "data_driven"|"intuitive"|"collaborative",
      "feedback_preference": "direct"|"diplomatic"|"coaching"
    },
    "ai_interaction_style": "concise"|"balanced"|"comprehensive",
    "preferred_tone": "casual"|"professional"|"formal",
    "preferred_response_length": "brief"|"moderate"|"detailed"
  },
  "company": {
    "name": "${company_name || ""}",
    "tagline": "short tagline",
    "industry": "${industry || ""}",
    "size": "startup"|"small"|"medium"|"large"|"enterprise",
    "description": "brief company description"
  },
  "ai_ecosystems": ["openai", "gemini", "copilot", "claude"],
  "recommended_hats": [
    {
      "name": "hat name",
      "description": "brief description",
      "responsibilities": ["resp1", "resp2"],
      "time_percentage": 30,
      "tools": ["tool1"]
    }
  ]
}`;

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
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");

    const parsed = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("generate-setup-profile error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
