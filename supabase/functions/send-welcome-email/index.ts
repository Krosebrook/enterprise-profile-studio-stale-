import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RequestSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(100),
  profile: z.object({
    role: z.string().min(1).max(100),
    experienceLevel: z.string().min(1).max(50),
    industries: z.array(z.string().max(100)).max(20),
    investmentRange: z.object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    }),
    riskTolerance: z.string().min(1).max(50),
    timeHorizon: z.string().min(1).max(50),
  }),
});

const formatCurrency = (value: number): string => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const formatRole = (role: string): string => {
  return role.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

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
    const { email, name, profile } = parsed.data;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log(`Sending welcome email to ${email} for ${name}`);
    const baseUrl = req.headers.get("origin") || "https://app.dealflow.com";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to DealFlow</title>
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; margin: 0; padding: 0; background: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .header { text-align: center; margin-bottom: 32px; }
    h1 { color: #1a1f36; font-size: 28px; margin: 0 0 8px; }
    .subtitle { color: #697386; font-size: 16px; margin: 0; }
    .section { margin: 24px 0; padding: 20px; background: #f8fafc; border-radius: 12px; }
    .section-title { color: #1a1f36; font-size: 14px; font-weight: 600; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .profile-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
    .profile-item:last-child { border-bottom: none; }
    .profile-label { color: #697386; font-size: 14px; }
    .profile-value { color: #1a1f36; font-size: 14px; font-weight: 500; }
    .industries { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .industry-tag { background: #e0f2fe; color: #0066cc; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; display: inline-block; }
    .cta { text-align: center; margin-top: 32px; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #0066cc, #0088ff); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; }
    .footer { text-align: center; margin-top: 32px; color: #697386; font-size: 12px; }
    .tips { margin: 24px 0; }
    .tip { display: flex; gap: 12px; padding: 12px 0; }
    .tip-icon { width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; }
    .tip-text { color: #374151; font-size: 14px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <table align="center" style="margin: 0 auto 16px;">
          <tr>
            <td style="width: 48px; height: 48px; background: linear-gradient(135deg, #0066cc, #0088ff); border-radius: 12px; text-align: center; vertical-align: middle;">
              <span style="color: white; font-weight: bold; font-size: 24px;">D</span>
            </td>
          </tr>
        </table>
        <h1>Welcome aboard, ${name}! 🎉</h1>
        <p class="subtitle">Your personalized deal sourcing experience is ready</p>
      </div>

      <div class="section">
        <p class="section-title">Your Investment Profile</p>
        <div class="profile-item">
          <span class="profile-label">Role</span>
          <span class="profile-value">${formatRole(profile.role)}</span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Experience</span>
          <span class="profile-value" style="text-transform: capitalize;">${profile.experienceLevel}</span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Investment Range</span>
          <span class="profile-value">${formatCurrency(profile.investmentRange.min)} – ${formatCurrency(profile.investmentRange.max)}</span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Risk Tolerance</span>
          <span class="profile-value" style="text-transform: capitalize;">${profile.riskTolerance.replace(/_/g, ' ')}</span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Time Horizon</span>
          <span class="profile-value" style="text-transform: capitalize;">${profile.timeHorizon.replace(/_/g, ' ')}</span>
        </div>
        ${profile.industries.length > 0 ? `
        <div style="margin-top: 12px;">
          <span class="profile-label">Target Industries</span>
          <div class="industries">
            ${profile.industries.map(i => `<span class="industry-tag">${i}</span>`).join(' ')}
          </div>
        </div>
        ` : ''}
      </div>

      <div class="tips">
        <p class="section-title">Quick Start Tips</p>
        <div class="tip">
          <div class="tip-icon">📊</div>
          <div class="tip-text">Check your personalized dashboard for deal recommendations tailored to your preferences.</div>
        </div>
        <div class="tip">
          <div class="tip-icon">🔔</div>
          <div class="tip-text">Set up alerts to get notified when deals matching your criteria become available.</div>
        </div>
        <div class="tip">
          <div class="tip-icon">🤝</div>
          <div class="tip-text">Connect with peers in your network to discover co-investment opportunities.</div>
        </div>
      </div>

      <div class="cta">
        <a href="${baseUrl}/dashboard" class="cta-button">
          Go to Dashboard →
        </a>
      </div>

      <div class="footer">
        <p>You're receiving this email because you signed up for DealFlow.</p>
        <p>© ${new Date().getFullYear()} DealFlow. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DealFlow <onboarding@resend.dev>",
        to: [email],
        subject: `Welcome to DealFlow, ${name}! 🚀`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${emailResponse.status}`);
    }

    const emailData = await emailResponse.json();
    console.log("Welcome email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, ...emailData }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
