import { createClient } from "@/lib/supabase/server";
import SavedLogosClient from "./SavedLogosClient";

export default async function SavedLogosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: generations } = await supabase
    .from("logo_generations")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return <SavedLogosClient initialGenerations={generations || []} />;
}
