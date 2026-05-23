"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Props {
  user: SupabaseUser;
  profile: { full_name?: string; avatar_url?: string } | null;
}

export default function DashboardTopbar({ user, profile }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const displayName = profile?.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-20 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
      {/* Mobile logo */}
      <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-display font-bold text-sm text-white">BrandForge</span>
      </Link>

      {/* Search bar (desktop) */}
      <div className="hidden sm:flex flex-1 max-w-md">
        {searchOpen ? (
          <div className="w-full flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus-within:border-violet-500/50">
            <Search className="w-4 h-4 text-white/30 shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search your logos, brand kits..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2.5 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/30 hover:text-white/50 transition-colors"
          >
            <Search className="w-4 h-4" />
            Search...
            <kbd className="ml-auto text-xs px-1.5 py-0.5 rounded-md bg-white/5 text-white/20">⌘K</kbd>
          </button>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        <Link
          href="/dashboard/generate"
          className="hidden sm:flex items-center gap-1.5 btn-glow text-xs px-4 py-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Generate
        </Link>

        <button className="relative p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
        </button>

        <Link href="/dashboard/profile">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:ring-2 ring-violet-500/30 transition-all">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
            ) : initials}
          </div>
        </Link>
      </div>
    </header>
  );
}
