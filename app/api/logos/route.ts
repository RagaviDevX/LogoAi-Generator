import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET all logos for current user
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const favoritesOnly = searchParams.get("favorites") === "true";

  let query = supabase
    .from("logo_generations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (favoritesOnly) query = query.eq("is_favorite", true);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ logos: data });
}

// PATCH toggle favorite
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, is_favorite } = await request.json();

  const { error } = await supabase
    .from("logo_generations")
    .update({ is_favorite })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE a logo
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase
    .from("logo_generations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
