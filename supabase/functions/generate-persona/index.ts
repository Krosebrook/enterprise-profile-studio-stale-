import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PersonaGenerationRequest {
  job_title: string;
  department: string;
  additional_context?: string;
}

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

    const { job_title, department, additional_context } = await req.json() as PersonaGenerationRequest;

    if (!job_title || !department) {
      return new Response(
        JSON.stringify({ error: "job_title and department are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Input length limits to prevent excessive token usage
    if (job_title.length > 200 || department.length > 200) {
      return new Response(
        JSON.stringify({ error: "job_title and department must be under 200 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (additional_context && additional_context.length > 2000) {
      return new Response(
        JSON.stringify({ error: "additional_context must be under 2000 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert HR and organizational psychologist specializing in creating detailed employee personas for AI-assisted workplace optimization.

Your task is to generate a comprehensive persona profile based on a job title and department. The persona should be realistic, nuanced, and useful for configuring AI assistants to better serve this employee type.

CRITICAL: You must return a valid JSON object with EXACTLY these values (no variations):

{
  "communication_style": {
    "formality": "casual" | "balanced" | "formal",
    "detail_level": "concise" | "balanced" | "detailed",
    "examples_preference": "minimal" | "moderate" | "extensive",
    "technical_depth": "simplified" | "balanced" | "technical"
  },
  "work_preferences": {
    "focus_time": "morning" | "afternoon" | "evening" | "flexible",
    "collaboration_style": "async" | "realtime" | "mixed",
    "decision_making": "data_driven" | "intuitive" | "collaborative",
    "feedback_preference": "direct" | "diplomatic" | "coaching"
  },
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "expertise_areas": ["area1", "area2", "area3"],
  "tools_used": ["tool1", "tool2", "tool3", "tool4"],
  "pain_points": ["pain point 1", "pain point 2", "pain point 3"],
  "goals": ["goal 1", "goal 2", "goal 3"],
  "ai_interaction_style": "concise" | "balanced" | "comprehensive",
  "preferred_response_length": "short" | "medium" | "long",
  "preferred_tone": "casual" | "professional" | "formal"
}

IMPORTANT: Use ONLY the exact values shown above (e.g., "balanced" not "Balanced", "mixed" not "highly_collaborative").

Make the persona specific and realistic for the given job title and department. Consider:
- Typical daily challenges and workflows
- Common tools and technologies used in this role
- Career goals and professional development needs
- Communication patterns with different stakeholders
- Technical literacy and preferred learning styles`;

    const userPrompt = `Generate a detailed persona profile for:

Job Title: ${job_title}
Department: ${department}
${additional_context ? `Additional Context: ${additional_context}` : ''}

Create a realistic and useful persona that would help AI assistants better serve someone in this role.`;

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
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the response
    let personaData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        personaData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    return new Response(
      JSON.stringify({
        success: true,
        persona: personaData,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating persona:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
