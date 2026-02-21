import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RequestSchema = z.object({
  provider: z.enum(['openai', 'anthropic', 'gemini']),
  apiKey: z.string().min(1).max(500),
});

interface ValidationResponse {
  valid: boolean;
  provider: string;
  error?: string;
  details?: {
    model?: string;
    organization?: string;
  };
}

async function validateOpenAI(apiKey: string): Promise<ValidationResponse> {
  try {
    console.log('Validating OpenAI API key...');
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      return { valid: true, provider: 'openai', details: { model: data.data?.[0]?.id || 'gpt-4' } };
    } else {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      return { valid: false, provider: 'openai', error: error.error?.message || 'Invalid API key' };
    }
  } catch (error) {
    return { valid: false, provider: 'openai', error: error instanceof Error ? error.message : 'Connection failed' };
  }
}

async function validateAnthropic(apiKey: string): Promise<ValidationResponse> {
  try {
    console.log('Validating Anthropic API key...');
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-3-haiku-20240307', max_tokens: 1, messages: [{ role: 'user', content: 'Hi' }] }),
    });

    if (response.ok || response.status === 200) {
      return { valid: true, provider: 'anthropic', details: { model: 'claude-3' } };
    } else {
      if (response.status === 401) return { valid: false, provider: 'anthropic', error: 'Invalid API key' };
      if (response.status === 429) return { valid: true, provider: 'anthropic', details: { model: 'claude-3' } };
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      return { valid: false, provider: 'anthropic', error: error.error?.message || 'Validation failed' };
    }
  } catch (error) {
    return { valid: false, provider: 'anthropic', error: error instanceof Error ? error.message : 'Connection failed' };
  }
}

async function validateGemini(apiKey: string): Promise<ValidationResponse> {
  try {
    console.log('Validating Google Gemini API key...');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      return { valid: true, provider: 'gemini', details: { model: data.models?.[0]?.name || 'gemini-pro' } };
    } else {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      return { valid: false, provider: 'gemini', error: error.error?.message || 'Invalid API key' };
    }
  } catch (error) {
    return { valid: false, provider: 'gemini', error: error instanceof Error ? error.message : 'Connection failed' };
  }
}

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
    const { provider, apiKey } = parsed.data;

    console.log(`Validating ${provider} API key...`);

    let result: ValidationResponse;
    switch (provider) {
      case 'openai': result = await validateOpenAI(apiKey); break;
      case 'anthropic': result = await validateAnthropic(apiKey); break;
      case 'gemini': result = await validateGemini(apiKey); break;
    }

    console.log(`Validation result for ${provider}:`, result);

    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Validation error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});