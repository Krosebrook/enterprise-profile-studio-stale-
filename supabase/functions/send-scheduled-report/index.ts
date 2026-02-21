import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RequestSchema = z.object({
  reportType: z.enum(['usage_summary', 'anomaly_alert', 'weekly_digest', 'custom']),
  recipients: z.array(z.string().email().max(255)).min(1).max(50),
  reportData: z.object({
    title: z.string().min(1).max(200),
    summary: z.string().max(2000).optional(),
    metrics: z.record(z.union([z.number(), z.string()])).optional(),
    alerts: z.array(z.object({
      type: z.string().max(100),
      message: z.string().max(500),
      severity: z.string().max(20),
    })).max(50).optional(),
    insights: z.array(z.string().max(500)).max(20).optional(),
    period: z.string().max(100).optional(),
  }),
  userId: z.string().uuid().optional(),
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
    const _authClient = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!);
    const { data: { user: _user }, error: _authError } = await _authClient.auth.getUser(authHeader.replace('Bearer ', ''));
    if (_authError || !_user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const parsed = RequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const { reportType, recipients, reportData, userId } = parsed.data;

    const baseUrl = req.headers.get("origin") || "https://lovable.app";
    let subject = "";

    const headerGradient = reportType === 'anomaly_alert' 
      ? 'linear-gradient(135deg, #EF4444, #F97316)' 
      : 'linear-gradient(135deg, #3B82F6, #8B5CF6)';
    const headerEmoji = reportType === 'anomaly_alert' ? '⚠️' : '📊';

    switch (reportType) {
      case 'usage_summary': subject = `📊 AI Platform Usage Summary - ${reportData.period || 'This Week'}`; break;
      case 'anomaly_alert': subject = `⚠️ Anomaly Alert: ${reportData.title}`; break;
      case 'weekly_digest': subject = `📈 Weekly AI Platform Digest - ${new Date().toLocaleDateString()}`; break;
      default: subject = `📋 ${reportData.title}`;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { background: ${headerGradient}; color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .metrics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
          .metric-card { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }
          .metric-value { font-size: 24px; font-weight: bold; color: #3B82F6; }
          .metric-label { font-size: 12px; color: #666; text-transform: uppercase; }
          .alert-item { padding: 12px; border-left: 4px solid; margin: 10px 0; border-radius: 4px; background: #f8f9fa; }
          .alert-critical { border-color: #EF4444; }
          .alert-high { border-color: #F97316; }
          .alert-medium { border-color: #F59E0B; }
          .alert-low { border-color: #3B82F6; }
          .insight { padding: 10px 15px; background: #EBF5FF; border-radius: 6px; margin: 8px 0; }
          .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">${headerEmoji} ${reportData.title}</h1>
            ${reportData.period ? `<p style="margin: 10px 0 0 0; opacity: 0.9;">${reportData.period}</p>` : ''}
          </div>
          <div class="content">
            ${reportData.summary ? `<p style="font-size: 16px; color: #444;">${reportData.summary}</p>` : ''}
            ${reportData.metrics ? `
              <h3>📈 Key Metrics</h3>
              <div class="metrics-grid">
                ${Object.entries(reportData.metrics).map(([key, value]) => `
                  <div class="metric-card">
                    <div class="metric-value">${value}</div>
                    <div class="metric-label">${key.replace(/_/g, ' ')}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${reportData.alerts?.length ? `
              <h3>⚠️ Alerts</h3>
              ${reportData.alerts.map(alert => `
                <div class="alert-item alert-${alert.severity}">
                  <strong>${alert.type}</strong>: ${alert.message}
                </div>
              `).join('')}
            ` : ''}
            ${reportData.insights?.length ? `
              <h3>💡 Insights</h3>
              ${reportData.insights.map(insight => `
                <div class="insight">${insight}</div>
              `).join('')}
            ` : ''}
            <div style="text-align: center; margin-top: 30px;">
              <a href="${baseUrl}/ai-explorer" class="button">View Full Dashboard</a>
            </div>
          </div>
          <div class="footer">
            <p>This report was generated by INT OS AI Platform Explorer</p>
            <p>To manage your notification preferences, visit your dashboard settings.</p>
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
        from: "INT OS Reports <onboarding@resend.dev>",
        to: recipients,
        subject,
        html,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${emailResponse.status}`);
    }

    const emailData = await emailResponse.json();
    console.log("Report email sent:", emailResponse);

    if (userId) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      await supabase
        .from('scheduled_reports')
        .update({ last_sent_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('report_type', reportType);
    }

    return new Response(JSON.stringify({ success: true, ...emailData }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending report:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});