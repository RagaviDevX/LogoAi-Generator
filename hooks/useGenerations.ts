"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GenerationResult } from "@/types";
import toast from "react-hot-toast";

export function useGenerations() {
  const [generations, setGenerations] = useState<GenerationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchGenerations = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data, error } = await supabase
      .from("logo_generations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setGenerations(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchGenerations();
  }, [fetchGenerations]);

  const toggleFavorite = async (id: string, currentValue: boolean) => {
    const { error } = await supabase
      .from("logo_generations")
      .update({ is_favorite: !currentValue })
      .eq("id", id);

    if (!error) {
      setGenerations((prev) =>
        prev.map((g) => g.id === id ? { ...g, is_favorite: !currentValue } : g)
      );
      toast.success(!currentValue ? "Added to favorites" : "Removed from favorites");
    }
  };

  const deleteGeneration = async (id: string) => {
    const { error } = await supabase.from("logo_generations").delete().eq("id", id);
    if (!error) {
      setGenerations((prev) => prev.filter((g) => g.id !== id));
      toast.success("Deleted");
    }
  };

  return { generations, loading, toggleFavorite, deleteGeneration, refetch: fetchGenerations };
}
