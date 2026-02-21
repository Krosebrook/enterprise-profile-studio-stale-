import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "https://esm.sh/zod@3.25.76";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const escapeHtml = (str: string): string =>
  str.replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char)
  );

const RequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().max(200).optional(),
  phone: z.string().max(30).optional(),
  interest: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
});

const RATE_LIMIT_WINDOW_MINUTES = 15;
const RATE_LIMIT_MAX_REQUESTS = 3;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const parsed = RequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }), 
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    const lead = parsed.data;

    // Rate limiting
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("email", lead.email.trim().toLowerCase())
      .gte("created_at", windowStart);

    if (!countError && count !== null && count >= RATE_LIMIT_MAX_REQUESTS) {
      console.warn("Rate limit exceeded for email:", lead.email.substring(0, 5) + "...");
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Received lead notification request:", {
      name: lead.name.substring(0, 20),
      email: lead.email.substring(0, 5) + "...",
      company: lead.company?.substring(0, 20),
      interest: lead.interest
    });

    // Send notification to INT Inc team
    const teamEmailResponse = await resend.emails.send({
      from: "INT Inc. <onboarding@resend.dev>",
      to: ["karosebrook@intinc.com"],
      subject: `New Lead: ${lead.name} from ${lead.company || 'Unknown Company'}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Lead Captured</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <h2 style="color: #1f2937; margin-top: 0;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(lead.name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
                  <a href="mailto:${escapeHtml(lead.email)}" style="color: #6366f1;">${escapeHtml(lead.email)}</a>
                </td>
              </tr>
              ${lead.company ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(lead.company)}</td></tr>` : ''}
              ${lead.phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(lead.phone)}</td></tr>` : ''}
              ${lead.interest ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #6b7280;">Interest</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(lead.interest)}</td></tr>` : ''}
            </table>
            ${lead.message ? `<h3 style="color: #1f2937; margin-top: 24px;">Message</h3><div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;"><p style="margin: 0; color: #4b5563; line-height: 1.6;">${escapeHtml(lead.message)}</p></div>` : ''}
            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">This lead was captured from the INT Inc. profile page at ${new Date().toLocaleString()}.</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Team notification sent:", teamEmailResponse);

    // Send confirmation to the lead
    const leadEmailResponse = await resend.emails.send({
      from: "INT Inc. <onboarding@resend.dev>",
      to: [lead.email],
      subject: "Thank you for your interest in INT Inc.",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You, ${escapeHtml(lead.name)}!</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">We've received your inquiry about our Enterprise AI Enablement Platform. Our team is excited to learn more about your organization's AI transformation goals.</p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">A member of our team will reach out within <strong>24 business hours</strong> to discuss how INT Inc. can help you:</p>
            <ul style="color: #4b5563; font-size: 16px; line-height: 1.8;">
              <li>Create personalized AI personas for your team</li>
              <li>Deploy across Claude, Microsoft Copilot, and Google Gemini</li>
              <li>Achieve 15-22% productivity gains through AI enablement</li>
            </ul>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://stellar-biz-story.lovable.app/intinc" style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Explore Our Platform</a>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 14px;">INT Inc. | Enterprise AI Enablement Platform</p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">AI-as-a-Service for the Modern Enterprise</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Lead confirmation sent:", leadEmailResponse);

    return new Response(
      JSON.stringify({ success: true, teamEmail: teamEmailResponse, leadEmail: leadEmailResponse }), 
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-lead-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
