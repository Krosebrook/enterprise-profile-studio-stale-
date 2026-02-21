import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CommunicationStyleSchema = z.object({
  formality: z.string().max(50).optional(),
  detail_level: z.string().max(50).optional(),
  examples_preference: z.string().max(50).optional(),
  technical_depth: z.string().max(50).optional(),
}).passthrough();

const WorkPreferencesSchema = z.object({
  focus_time: z.string().max(50).optional(),
  collaboration_style: z.string().max(50).optional(),
  decision_making: z.string().max(50).optional(),
  feedback_preference: z.string().max(50).optional(),
}).passthrough();

const PersonaSchema = z.object({
  name: z.string().min(1).max(200),
  job_title: z.string().max(200).optional(),
  department: z.string().max(200).optional(),
  communication_style: CommunicationStyleSchema.optional(),
  work_preferences: WorkPreferencesSchema.optional(),
  pain_points: z.array(z.string().max(500)).max(20).optional(),
  goals: z.array(z.string().max(500)).max(20).optional(),
  skills: z.array(z.string().max(200)).max(30).optional(),
  expertise_areas: z.array(z.string().max(200)).max(20).optional(),
  tools_used: z.array(z.string().max(200)).max(30).optional(),
  ai_interaction_style: z.string().max(50).optional(),
  preferred_response_length: z.string().max(50).optional(),
  preferred_tone: z.string().max(50).optional(),
});

const HatSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  responsibilities: z.array(z.string().max(500)).max(20).optional(),
  key_tasks: z.array(z.string().max(500)).max(20).optional(),
  stakeholders: z.array(z.string().max(200)).max(20).optional(),
  tools: z.array(z.string().max(200)).max(20).optional(),
  time_percentage: z.number().min(0).max(100).optional(),
});

const RequestSchema = z.object({
  type: z.enum(['claude', 'copilot', 'gemini', 'hat_suggestions']),
  persona: PersonaSchema,
  hats: z.array(HatSchema).max(20).optional(),
  hat: HatSchema.optional(),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
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
    const { type, persona, hats, hat } = parsed.data;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'hat_suggestions') {
      systemPrompt = `You are an AI productivity and role optimization expert. Analyze the employee's role/hat and provide actionable suggestions for improvement.

Return a JSON object with these fields:
- efficiency_tips: Array of 3-5 specific tips to improve efficiency in this role
- automation_opportunities: Array of 2-4 tasks that could be automated
- skill_gaps: Array of 1-3 skills that would benefit this role
- recommended_tools: Array of 2-4 tools that could help with this role
- prompt_improvements: Array of 2-3 ways to better prompt AI assistants for this role`;

      userPrompt = `Analyze this role and provide optimization suggestions:

Role: ${hat?.name}
Description: ${hat?.description || 'Not specified'}
Responsibilities: ${hat?.responsibilities?.join(', ') || 'Not specified'}
Key Tasks: ${hat?.key_tasks?.join(', ') || 'Not specified'}
Time Allocation: ${hat?.time_percentage}%
Current Tools: ${hat?.tools?.join(', ') || 'None specified'}

Employee Context:
- Name: ${persona.name}
- Title: ${persona.job_title || 'Not specified'}
- Department: ${persona.department || 'Not specified'}
- Skills: ${persona.skills?.join(', ') || 'Not specified'}
- Expertise: ${persona.expertise_areas?.join(', ') || 'Not specified'}

Provide specific, actionable suggestions in JSON format.`;
    } else {
      const hatsContext = hats?.map(h => 
        `- ${h.name} (${h.time_percentage}% of time): ${h.description || h.responsibilities?.join(', ')}`
      ).join('\n') || 'No specific roles defined';

      const personaContext = `
Employee Profile:
- Name: ${persona.name}
- Title: ${persona.job_title || 'Not specified'}
- Department: ${persona.department || 'Not specified'}

Roles/Responsibilities ("Hats"):
${hatsContext}

Communication Preferences:
- Formality: ${persona.communication_style?.formality || 'balanced'}
- Detail Level: ${persona.communication_style?.detail_level || 'balanced'}
- Examples: ${persona.communication_style?.examples_preference || 'moderate'}
- Technical Depth: ${persona.communication_style?.technical_depth || 'balanced'}

Work Style:
- Focus Time: ${persona.work_preferences?.focus_time || 'flexible'}
- Collaboration: ${persona.work_preferences?.collaboration_style || 'mixed'}
- Decision Making: ${persona.work_preferences?.decision_making || 'collaborative'}
- Feedback: ${persona.work_preferences?.feedback_preference || 'direct'}

Pain Points: ${persona.pain_points?.join(', ') || 'None specified'}
Goals: ${persona.goals?.join(', ') || 'None specified'}
Skills: ${persona.skills?.join(', ') || 'Not specified'}
Expertise: ${persona.expertise_areas?.join(', ') || 'Not specified'}
Tools Used: ${persona.tools_used?.join(', ') || 'None specified'}

AI Interaction Preferences:
- Style: ${persona.ai_interaction_style || 'balanced'}
- Response Length: ${persona.preferred_response_length || 'medium'}
- Tone: ${persona.preferred_tone || 'professional'}`;

      if (type === 'claude') {
        systemPrompt = `You are an expert at creating Claude system prompts for enterprise users. Generate a comprehensive, production-ready system prompt that will help Claude assist this employee effectively.
Format: Return ONLY the system prompt text, no explanations or metadata.`;
        userPrompt = `Create a Claude system prompt for this employee:\n${personaContext}`;
      } else if (type === 'copilot') {
        systemPrompt = `You are an expert at creating Microsoft Copilot custom instructions and context configurations. Generate a comprehensive configuration that will help Copilot assist this employee effectively within the Microsoft 365 ecosystem.
Format: Return ONLY the Copilot configuration/instructions text.`;
        userPrompt = `Create Microsoft Copilot custom instructions for this employee:\n${personaContext}`;
      } else if (type === 'gemini') {
        systemPrompt = `You are an expert at creating Google Gemini and Google Workspace AI configurations. Generate a comprehensive system prompt and configuration that will help Gemini assist this employee effectively within the Google ecosystem.
Format: Return ONLY the Gemini configuration/instructions text.`;
        userPrompt = `Create Google Gemini instructions for this employee:\n${personaContext}`;
      }
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('No content generated');

    if (type === 'hat_suggestions') {
      try {
        let jsonContent = content;
        const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) jsonContent = jsonMatch[1].trim();
        const suggestions = JSON.parse(jsonContent);
        return new Response(JSON.stringify({ suggestions }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Failed to parse suggestions:', parseError);
        return new Response(JSON.stringify({ 
          suggestions: {
            efficiency_tips: ['Review and optimize your current workflow'],
            automation_opportunities: ['Look for repetitive tasks that can be automated'],
            skill_gaps: [],
            recommended_tools: [],
            prompt_improvements: ['Be specific about your role context when prompting AI'],
          }
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating persona prompts:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});