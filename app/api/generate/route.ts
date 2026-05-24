import { createClient } from "@/lib/supabase/server";
import { generateBrandAssets } from "@/services/groq";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check credits
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits_remaining, credits_per_month")
      .eq("id", user.id)
      .single();

    if (!profile || profile.credits_remaining <= 0) {
      return NextResponse.json(
        { error: "No credits remaining. Upgrade your plan to continue generating." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { brandName, industry, style, description } = body;

    if (!brandName?.trim() || !industry || !style) {
      return NextResponse.json(
        { error: "Missing required fields: brandName, industry, style" },
        { status: 400 }
      );
    }

    // Generate brand assets via Groq
    const result = await generateBrandAssets({ brandName: brandName.trim(), industry, style, description });

    // Save to database
    const { data: savedGeneration, error: saveError } = await supabase
      .from("logo_generations")
      .insert({
        user_id: user.id,
        brand_name: brandName.trim(),
        industry,
        style,
        description: description || null,
        logo_prompt: result.logo_prompt,
        slogans: result.slogans,
        color_palettes: result.color_palettes,
        typography: result.typography,
        brand_names: result.brand_names,
        social_ideas: result.social_ideas,
      })
      .select()
      .single();

    if (saveError) {
      console.error("DB save error:", saveError);
    }

    // Decrement credits
    await supabase
      .from("profiles")
      .update({ credits_remaining: Math.max(0, profile.credits_remaining - 1) })
      .eq("id", user.id);

    // Send email notification (fire and forget — don't block the response)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://logo-ai-generator-two.vercel.app";
    const shareUrl = savedGeneration?.id ? `${appUrl}/share/${savedGeneration.id}` : null;

    fetch(`${appUrl}/api/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Cookie": request.headers.get("cookie") || "" },
      body: JSON.stringify({ brandName: brandName.trim(), industry, style, shareUrl }),
    }).catch(() => {/* Email is best-effort */});

    return NextResponse.json({
      result: {
        ...result,
        id: savedGeneration?.id || null,
      },
      creditsRemaining: Math.max(0, profile.credits_remaining - 1),
    });

  } catch (err) {
    console.error("Generation error:", err);
    const message = err instanceof Error ? err.message : "Failed to generate brand assets";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
