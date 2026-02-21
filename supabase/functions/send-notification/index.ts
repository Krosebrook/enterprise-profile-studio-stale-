import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'profile_published' | 'significant_views';
  profileId: string;
  profileName: string;
  recipientEmail: string;
  viewCount?: number;
  profileSlug?: string;
}

const handler = async (req: Request): Promise<Response> => {
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

    const { type, profileId, profileName, recipientEmail, viewCount, profileSlug }: NotificationRequest = await req.json();
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    let subject = "";
    let html = "";

    const baseUrl = req.headers.get("origin") || "https://lovable.app";

    if (type === 'profile_published') {
      subject = `🎉 Your profile "${profileName}" is now live!`;
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 30px; border-radius: 12px; text-align: center; }
            .content { padding: 30px 0; }
            .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { border-top: 1px solid #e0e0e0; padding-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎉 Congratulations!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your profile is now published</p>
            </div>
            <div class="content">
              <h2>Your profile "${profileName}" is live!</h2>
              <p>Great news! Your enterprise profile has been successfully published and is now visible to the world.</p>
              <p>Share your profile with clients, partners, and stakeholders to showcase your company's capabilities.</p>
              ${profileSlug ? `
                <p style="margin: 30px 0;">
                  <a href="${baseUrl}/p/${profileSlug}" class="button">View Your Profile</a>
                </p>
                <p style="font-size: 14px; color: #666;">
                  Your public profile URL: <br>
                  <a href="${baseUrl}/p/${profileSlug}">${baseUrl}/p/${profileSlug}</a>
                </p>
              ` : ''}
            </div>
            <div class="footer">
              <p>This email was sent by Enterprise Profile Builder.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'significant_views') {
      subject = `📈 Your profile "${profileName}" is getting attention!`;
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { background: linear-gradient(135deg, #10B981, #3B82F6); color: white; padding: 30px; border-radius: 12px; text-align: center; }
            .stats { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .stat-number { font-size: 48px; font-weight: bold; color: #3B82F6; }
            .content { padding: 30px 0; }
            .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { border-top: 1px solid #e0e0e0; padding-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📈 Milestone Reached!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your profile is gaining traction</p>
            </div>
            <div class="content">
              <h2>Great news about "${profileName}"!</h2>
              <div class="stats">
                <div class="stat-number">${viewCount || 0}</div>
                <div>Total Profile Views</div>
              </div>
              <p>Your enterprise profile is gaining visibility! People are interested in what your company has to offer.</p>
              <p>Consider updating your profile with fresh content to keep visitors engaged.</p>
              <p style="margin: 30px 0;">
                <a href="${baseUrl}/dashboard" class="button">View Analytics Dashboard</a>
              </p>
            </div>
            <div class="footer">
              <p>This email was sent by Enterprise Profile Builder.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      throw new Error("Invalid notification type");
    }

    // Send email using Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Enterprise Profile Builder <onboarding@resend.dev>",
        to: [recipientEmail],
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
    console.log("Notification email sent:", emailData);

    return new Response(JSON.stringify({ success: true, ...emailData }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
