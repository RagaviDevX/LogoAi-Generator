import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Simple email via Resend (free tier: 3000 emails/month)
// Add RESEND_API_KEY to your env variables
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { brandName, industry, style, shareUrl } = await request.json();

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  // If no Resend key, just return success (email skipped gracefully)
  if (!RESEND_API_KEY) {
    console.log(`[Email skipped] No RESEND_API_KEY. Would send to ${user.email} for brand: ${brandName}`);
    return NextResponse.json({ success: true, skipped: true });
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="font-family:system-ui,sans-serif;background:#030303;color:#fff;padding:40px 20px;max-width:600px;margin:0 auto">
  <div style="text-align:center;margin-bottom:32px">
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);border-radius:999px;padding:6px 16px;color:#a78bfa;font-size:12px;margin-bottom:16px">
      ✦ BrandForge AI
    </div>
    <h1 style="font-size:28px;font-weight:800;margin:0 0 8px;background:linear-gradient(135deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
      Your Brand Kit is Ready!
    </h1>
    <p style="color:rgba(255,255,255,0.5);margin:0">AI-generated brand identity for <strong style="color:#fff">${brandName}</strong></p>
  </div>

  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;margin-bottom:24px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
      <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px">
        <div style="font-size:10px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:2px;margin-bottom:4px">Industry</div>
        <div style="font-size:14px;color:#fff;text-transform:capitalize">${industry}</div>
      </div>
      <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px">
        <div style="font-size:10px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:2px;margin-bottom:4px">Style</div>
        <div style="font-size:14px;color:#fff;text-transform:capitalize">${style}</div>
      </div>
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,0.5);margin:0;line-height:1.6">
      Your complete brand kit includes: logo prompts, slogans, color palettes, typography suggestions, alternative brand names, and social media ideas.
    </p>
  </div>

  <div style="text-align:center;margin-bottom:32px">
    ${shareUrl ? `
    <a href="${shareUrl}" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:600;margin-bottom:12px">
      View Brand Kit →
    </a>
    <br/>
    <a href="${shareUrl}" style="font-size:12px;color:rgba(255,255,255,0.3)">${shareUrl}</a>
    ` : `
    <a href="https://logo-ai-generator-two.vercel.app/dashboard/saved" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:600">
      View in Dashboard →
    </a>
    `}
  </div>

  <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;text-align:center">
    <p style="font-size:12px;color:rgba(255,255,255,0.2);margin:0">
      BrandForge AI · <a href="https://logo-ai-generator-two.vercel.app" style="color:rgba(124,58,237,0.8)">logo-ai-generator-two.vercel.app</a>
    </p>
  </div>
</body>
</html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BrandForge AI <onboarding@resend.dev>",
        to: [user.email!],
        subject: `✦ Your ${brandName} brand kit is ready!`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Email failed");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
