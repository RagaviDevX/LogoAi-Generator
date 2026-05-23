"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles, LayoutDashboard, Wand2, BookmarkCheck, Package,
  Settings, CreditCard, User, LogOut, Crown,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Generate", icon: Wand2, href: "/dashboard/generate", highlight: true },
  { label: "Saved Logos", icon: BookmarkCheck, href: "/dashboard/saved" },
  { label: "Brand Kits", icon: Package, href: "/dashboard/brand-kits" },
];

const BOTTOM_NAV = [
  { label: "Profile", icon: User, href: "/dashboard/profile" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
];

interface Props {
  user: SupabaseUser;
  profile: { full_name?: string; avatar_url?: string; subscription_tier?: string } | null;
}

export default function DashboardSidebar({ user, profile }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    router.push("/");
    router.refresh();
  };

  const displayName = profile?.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();
  const isPro = profile?.subscription_tier !== "free";

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 xl:w-72 flex-col bg-[#060606] border-r border-white/[0.06] z-30">
      {/* Logo */}
      <div className="p-6 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-glow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-white">BrandForge</span>
          <span className="text-xs px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 font-medium">AI</span>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                active
                  ? "bg-violet-600/15 text-white border border-violet-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              } ${item.highlight && !active ? "text-violet-300 hover:text-violet-200" : ""}`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-violet-600/15 border border-violet-500/20"
                />
              )}
              <item.icon className={`w-4 h-4 relative z-10 ${active ? "text-violet-400" : ""}`} />
              <span className="relative z-10">{item.label}</span>
              {item.highlight && (
                <span className="ml-auto relative z-10 w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="py-3">
          <div className="border-t border-white/[0.06]" />
        </div>

        {BOTTOM_NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active ? "text-white bg-white/5" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade banner (free users) */}
      {!isPro && (
        <div className="px-4 pb-4">
          <div className="gradient-border p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-white">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-white/40 mb-3">
              200 generations/month + save, export & brand kits
            </p>
            <Link
              href="/dashboard/billing"
              className="block text-center btn-glow py-2 text-xs"
            >
              Upgrade — $19/mo
            </Link>
          </div>
        </div>
      )}

      {/* User card */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
            ) : initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{displayName}</div>
            <div className="text-xs text-white/30 truncate">{user.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
