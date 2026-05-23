"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  company?: string;
  website?: string;
  bio?: string;
  subscription_tier: "free" | "pro" | "enterprise";
  credits_remaining: number;
  credits_per_month: number;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };
    load();
  }, [supabase]);

  const updateProfile = async (updates: Partial<Profile>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (!error) {
      setProfile((prev) => prev ? { ...prev, ...updates } : null);
      return true;
    }
    return false;
  };

  return { profile, loading, updateProfile };
}
