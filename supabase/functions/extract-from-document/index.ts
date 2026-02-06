import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Schema definitions for structured extraction
const PERSONA_EXTRACTION_SCHEMA = {
  name: "extract_persona_data",
  description: "Extract employee persona information from document text. Only extract data that is explicitly present. Leave fields as null if information is not found.",
  parameters: {
    type: "object",
    properties: {
      name: { type: "string", description: "Full name of the person. Set to null if not explicitly found." },
      email: { type: "string", description: "Email address. Set to null if not found." },
      job_title: { type: "string", description: "Job title or role. Set to null if not found." },
      department: { type: "string", description: "Department or team. Set to null if not found." },
      skills: { 
        type: "array", 
        items: { type: "string" },
        description: "List of skills mentioned. Empty array if none found."
      },
      expertise_areas: { 
        type: "array", 
        items: { type: "string" },
        description: "Areas of expertise or specialization. Empty array if none found."
      },
      tools_used: { 
        type: "array", 
        items: { type: "string" },
        description: "Software, tools, or platforms mentioned. Empty array if none found."
      },
      goals: { 
        type: "array", 
        items: { type: "string" },
        description: "Professional goals or objectives. Empty array if none found."
      },
      pain_points: { 
        type: "array", 
        items: { type: "string" },
        description: "Challenges or pain points mentioned. Empty array if none found."
      },
      communication_style: {
        type: "object",
        properties: {
          formality: { type: "string", enum: ["casual", "balanced", "formal"], description: "Communication formality. null if not determinable." },
          detail_level: { type: "string", enum: ["concise", "balanced", "detailed"], description: "Detail preference. null if not determinable." },
          technical_depth: { type: "string", enum: ["simplified", "balanced", "technical"], description: "Technical language preference. null if not determinable." },
          examples_preference: { type: "string", enum: ["minimal", "moderate", "extensive"], description: "Examples preference. null if not determinable." }
        }
      },
      work_preferences: {
        type: "object",
        properties: {
          focus_time: { type: "string", enum: ["morning", "afternoon", "evening", "flexible"], description: "Preferred focus time. null if not determinable." },
          collaboration_style: { type: "string", enum: ["async", "realtime", "mixed"], description: "Collaboration preference. null if not determinable." },
          decision_making: { type: "string", enum: ["data_driven", "intuitive", "collaborative"], description: "Decision making style. null if not determinable." },
          feedback_preference: { type: "string", enum: ["direct", "diplomatic", "coaching"], description: "Feedback style preference. null if not determinable." }
        }
      },
      ai_interaction_style: { type: "string", enum: ["concise", "balanced", "comprehensive"], description: "How they prefer AI to respond. null if not determinable." },
      preferred_tone: { type: "string", enum: ["casual", "professional", "formal"], description: "Preferred communication tone. null if not determinable." },
      extraction_confidence: { 
        type: "object",
        properties: {
          overall: { type: "number", description: "Overall confidence 0-100" },
          fields_found: { type: "number", description: "Count of fields with data" },
          fields_inferred: { type: "number", description: "Count of fields that were inferred vs explicit" }
        }
      }
    },
    required: ["extraction_confidence"]
  }
};

const PROFILE_EXTRACTION_SCHEMA = {
  name: "extract_profile_data",
  description: "Extract enterprise profile information from document text. Only extract data that is explicitly present. Leave fields as null if information is not found.",
  parameters: {
    type: "object",
    properties: {
      company_info: {
        type: "object",
        properties: {
          name: { type: "string", description: "Company name. null if not found." },
          tagline: { type: "string", description: "Company tagline or slogan. null if not found." },
          description: { type: "string", description: "Company description. null if not found." },
          industry: { type: "string", description: "Industry or sector. null if not found." },
          size: { type: "string", description: "Company size or employee count. null if not found." },
          founded: { type: "string", description: "Year founded. null if not found." },
          headquarters: { type: "string", description: "HQ location. null if not found." },
          website: { type: "string", description: "Website URL. null if not found." },
          email: { type: "string", description: "Contact email. null if not found." },
          phone: { type: "string", description: "Contact phone. null if not found." }
        }
      },
      branding: {
        type: "object",
        properties: {
          primary_color: { type: "string", description: "Primary brand color if mentioned. null if not found." },
          secondary_color: { type: "string", description: "Secondary brand color if mentioned. null if not found." }
        }
      },
      services: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" }
          }
        },
        description: "List of services or offerings. Empty array if none found."
      },
      team_members: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            role: { type: "string" },
            bio: { type: "string" }
          }
        },
        description: "Team members mentioned. Empty array if none found."
      },
      compliance: {
        type: "object",
        properties: {
          certifications: { type: "array", items: { type: "string" }, description: "Certifications mentioned. Empty array if none." },
          regulations: { type: "array", items: { type: "string" }, description: "Regulatory compliance mentioned. Empty array if none." }
        }
      },
      extraction_confidence: { 
        type: "object",
        properties: {
          overall: { type: "number", description: "Overall confidence 0-100" },
          fields_found: { type: "number", description: "Count of fields with data" },
          sections_populated: { type: "array", items: { type: "string" }, description: "Which major sections have data" }
        }
      }
    },
    required: ["extraction_confidence"]
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { document_text, extraction_type, max_length = 15000 } = await req.json();

    if (!document_text) {
      return new Response(
        JSON.stringify({ error: "document_text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!extraction_type || !["persona", "profile"].includes(extraction_type)) {
      return new Response(
        JSON.stringify({ error: "extraction_type must be 'persona' or 'profile'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Truncate document if too long
    const truncatedText = document_text.length > max_length 
      ? document_text.substring(0, max_length) + "\n\n[Document truncated for processing]"
      : document_text;

    const schema = extraction_type === "persona" ? PERSONA_EXTRACTION_SCHEMA : PROFILE_EXTRACTION_SCHEMA;

    const systemPrompt = `You are a precise data extraction assistant. Your task is to extract structured information from documents.

CRITICAL RULES:
1. ONLY extract information that is EXPLICITLY stated in the document
2. NEVER infer, assume, or hallucinate data that is not present
3. If a field's information is not found, set it to null (for strings/objects) or empty array (for arrays)
4. Do not fill in common defaults or typical values - if it's not in the document, leave it blank
5. The extraction_confidence.overall should reflect how much relevant data was actually found (0-100)
6. Be conservative - it's better to leave fields empty than to guess

Document type context for ${extraction_type === "persona" ? "Employee Persona" : "Enterprise Profile"}:
- Look for: ${extraction_type === "persona" 
  ? "names, titles, skills, experience, goals, work style preferences" 
  : "company names, descriptions, services, team info, certifications"}
- Common document sources: ${extraction_type === "persona"
  ? "resumes, CVs, LinkedIn profiles, job descriptions, self-introductions"
  : "company websites, about pages, pitch decks, capability statements"}`;

    console.log(`Extracting ${extraction_type} data from document (${truncatedText.length} chars)`);

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
          { role: "user", content: `Extract ${extraction_type} information from the following document:\n\n---\n${truncatedText}\n---\n\nRemember: Only extract explicitly stated information. Leave fields null/empty if not found.` }
        ],
        tools: [{ type: "function", function: schema }],
        tool_choice: { type: "function", function: { name: schema.name } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const result = await response.json();
    
    // Extract the function call arguments
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== schema.name) {
      throw new Error("Invalid response format from AI");
    }

    const extractedData = JSON.parse(toolCall.function.arguments);
    
    console.log(`Extraction complete. Confidence: ${extractedData.extraction_confidence?.overall || 'N/A'}%`);

    return new Response(
      JSON.stringify({
        success: true,
        extraction_type,
        data: extractedData,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Extraction error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
