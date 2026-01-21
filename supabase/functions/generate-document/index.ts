import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GenerationRequest {
  templateType: string;
  prompt: string;
  context: {
    companyName?: string;
    industry?: string;
    audience?: string;
    tone?: 'formal' | 'professional' | 'casual';
    length?: 'short' | 'medium' | 'long';
  };
}

const TEMPLATE_PROMPTS: Record<string, string> = {
  proposal: `Generate a business proposal document with the following sections:
- Executive Summary
- Background & Objectives
- Proposed Solution
- Scope of Work
- Timeline & Milestones
- Budget & Investment
- Expected ROI
- Next Steps`,

  report: `Generate an analysis report with the following sections:
- Executive Summary
- Methodology
- Key Findings
- Detailed Analysis
- Insights & Implications
- Recommendations
- Conclusion`,

  policy: `Generate a company policy document with the following sections:
- Policy Statement
- Purpose & Scope
- Definitions
- Policy Details
- Roles & Responsibilities
- Procedures
- Compliance & Enforcement
- Review & Updates`,

  guide: `Generate a comprehensive how-to guide with the following sections:
- Introduction & Overview
- Prerequisites
- Step-by-Step Instructions
- Tips & Best Practices
- Common Issues & Troubleshooting
- Additional Resources
- Frequently Asked Questions`,

  sop: `Generate a Standard Operating Procedure with the following sections:
- Purpose
- Scope
- Responsibilities
- Equipment & Resources
- Procedure Steps
- Quality Checks
- Documentation Requirements
- Revision History`,

  'meeting-notes': `Generate meeting notes with the following sections:
- Meeting Information (Date, Attendees)
- Agenda Items
- Discussion Summary
- Key Decisions Made
- Action Items (with owners and deadlines)
- Next Steps
- Next Meeting Date`,

  analysis: `Generate a market/competitive analysis with the following sections:
- Executive Summary
- Market Overview
- Key Players & Competitors
- SWOT Analysis
- Market Trends
- Opportunities & Threats
- Strategic Recommendations
- Conclusion`,

  memo: `Generate an internal memo with the following sections:
- Subject Line
- Purpose
- Background
- Key Points
- Recommendations/Actions Required
- Timeline
- Contact Information`,
};

const CATEGORY_MAP: Record<string, string> = {
  proposal: 'Proposals',
  report: 'Reports',
  policy: 'Policies',
  guide: 'Guides',
  sop: 'Procedures',
  'meeting-notes': 'Meetings',
  analysis: 'Analysis',
  memo: 'Communications',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { templateType, prompt, context } = await req.json() as GenerationRequest;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const templatePrompt = TEMPLATE_PROMPTS[templateType] || TEMPLATE_PROMPTS.report;
    const toneInstructions = {
      formal: 'Use formal, professional language with proper business terminology.',
      professional: 'Use clear, professional language that is accessible but authoritative.',
      casual: 'Use friendly, approachable language while maintaining clarity.',
    };
    const lengthInstructions = {
      short: 'Keep the document concise, around 500-800 words.',
      medium: 'Create a moderately detailed document, around 1000-1500 words.',
      long: 'Create a comprehensive, detailed document, around 2000-3000 words.',
    };

    const systemPrompt = `You are a professional document writer specializing in creating well-structured business documents. 
Your output should be in Markdown format with proper headings, bullet points, and formatting.
${context.companyName ? `The document is for: ${context.companyName}` : ''}
${context.industry ? `Industry context: ${context.industry}` : ''}
${context.audience ? `Target audience: ${context.audience}` : ''}
${toneInstructions[context.tone || 'professional']}
${lengthInstructions[context.length || 'medium']}

IMPORTANT: You must respond with a valid JSON object in this exact format:
{
  "title": "Document title (concise, descriptive)",
  "description": "Brief one-sentence description of the document",
  "content": "Full markdown content of the document",
  "tags": ["tag1", "tag2", "tag3"]
}

Do not include any text before or after the JSON object.`;

    const userPrompt = `Create a ${templateType.replace('-', ' ')} document about: ${prompt}

${templatePrompt}

Remember to output ONLY a valid JSON object with title, description, content, and tags fields.`;

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
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content generated");
    }

    // Parse the JSON response
    let parsedContent;
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      // Fallback: create a basic structure from the raw content
      parsedContent = {
        title: `${templateType.charAt(0).toUpperCase() + templateType.slice(1).replace('-', ' ')} - ${prompt.slice(0, 50)}`,
        description: `Generated ${templateType.replace('-', ' ')} document`,
        content: content,
        tags: [templateType, 'generated'],
      };
    }

    const result = {
      title: parsedContent.title || `Generated ${templateType}`,
      content: parsedContent.content || content,
      description: parsedContent.description || '',
      category: CATEGORY_MAP[templateType] || 'General',
      tags: Array.isArray(parsedContent.tags) ? parsedContent.tags : [templateType, 'generated'],
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Document generation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Generation failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
