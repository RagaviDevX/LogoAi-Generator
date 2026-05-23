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
      .select("credits_remaining")
      .eq("id", user.id)
      .single();

    if (!profile || profile.credits_remaining <= 0) {
      return NextResponse.json(
        { error: "No credits remaining. Upgrade your plan to continue." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { brandName, industry, style, description } = body;

    if (!brandName || !industry || !style) {
      return NextResponse.json(
        { error: "Missing required fields: brandName, industry, style" },
        { status: 400 }
      );
    }

    // Generate brand assets
    const result = await generateBrandAssets({ brandName, industry, style, description });

    // Save to database
    const { data: savedGeneration } = await supabase
      .from("logo_generations")
      .insert({
        user_id: user.id,
        brand_name: brandName,
        industry,
        style,
        description,
        logo_prompt: result.logo_prompt,
        slogans: result.slogans,
        color_palettes: result.color_palettes,
        typography: result.typography,
        brand_names: result.brand_names,
        social_ideas: result.social_ideas,
      })
      .select()
      .single();

    // Decrement credits
    await supabase
      .from("profiles")
      .update({ credits_remaining: profile.credits_remaining - 1 })
      .eq("id", user.id);

    return NextResponse.json({
      result: {
        ...result,
        id: savedGeneration?.id,
      },
    });
  } catch (err) {
    console.error("Generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate brand assets. Please try again." },
      { status: 500 }
    );
  }
}
