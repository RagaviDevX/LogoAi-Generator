import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Wand2, BookmarkCheck, Package, TrendingUp, ArrowRight, Sparkles, Clock } from "lucide-react";
import { formatRelativeTime } from "@/utils";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: profile }, { data: recentGenerations, count: totalGenerations }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user!.id).single(),
    supabase
      .from("logo_generations")
      .select("*", { count: "exact" })
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  const { count: savedCount } = await supabase
    .from("logo_generations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .eq("is_favorite", true);

  const { count: brandKitsCount } = await supabase
    .from("brand_kits")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "there";
  const creditsUsed = (profile?.credits_per_month || 10) - (profile?.credits_remaining || 0);
  const creditsTotal = profile?.credits_per_month || 10;
  const creditsPercent = Math.min(100, (creditsUsed / creditsTotal) * 100);

  const STATS = [
    { label: "Total Generations", value: totalGenerations || 0, icon: TrendingUp, color: "text-violet-400" },
    { label: "Saved Logos", value: savedCount || 0, icon: BookmarkCheck, color: "text-blue-400" },
    { label: "Brand Kits", value: brandKitsCount || 0, icon: Package, color: "text-pink-400" },
    { label: "Credits Left", value: profile?.credits_remaining || 0, icon: Sparkles, color: "text-amber-400" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Good morning, {displayName} 👋
          </h1>
          <p className="text-white/40 mt-1 text-sm">
            Ready to build your next brand? Let's create something remarkable.
          </p>
        </div>
        <Link
          href="/dashboard/generate"
          className="btn-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Wand2 className="w-4 h-4" />
          New Generation
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-white/40">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Credits bar */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-medium text-white">Monthly Credits</div>
            <div className="text-xs text-white/40 mt-0.5">{creditsUsed} of {creditsTotal} used</div>
          </div>
          <Link href="/dashboard/billing" className="text-xs text-violet-400 hover:text-violet-300">
            Upgrade →
          </Link>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${creditsPercent}%` }}
          />
        </div>
        <div className="text-xs text-white/30 mt-2">{profile?.credits_remaining || 0} credits remaining this month</div>
      </div>

      {/* Recent generations */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-semibold text-white">Recent Generations</h2>
          <Link href="/dashboard/saved" className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentGenerations && recentGenerations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentGenerations.map((gen) => {
              const palettes = Array.isArray(gen.color_palettes) ? gen.color_palettes : [];
              const firstPalette = palettes[0] as { primary?: string; secondary?: string; accent?: string } | undefined;
              return (
                <div key={gen.id} className="glass-hover rounded-2xl p-4 group">
                  {/* Color preview */}
                  <div className="flex gap-1.5 mb-4">
                    {firstPalette ? (
                      <>
                        <div className="flex-1 h-10 rounded-xl" style={{ background: firstPalette.primary || "#7C3AED" }} />
                        <div className="flex-1 h-10 rounded-xl" style={{ background: firstPalette.secondary || "#2563EB" }} />
                        <div className="flex-1 h-10 rounded-xl" style={{ background: firstPalette.accent || "#EC4899" }} />
                      </>
                    ) : (
                      <div className="flex-1 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600" />
                    )}
                  </div>
                  <div className="font-medium text-sm text-white truncate">{gen.brand_name}</div>
                  <div className="text-xs text-white/40 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(gen.created_at)}
                  </div>
                  <Link
                    href={`/dashboard/saved`}
                    className="mt-3 flex items-center gap-1 text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-7 h-7 text-violet-400" />
            </div>
            <div className="font-medium text-white mb-2">No generations yet</div>
            <p className="text-white/40 text-sm mb-5">
              Create your first AI brand identity in seconds
            </p>
            <Link href="/dashboard/generate" className="btn-glow inline-flex items-center gap-2 text-sm px-5 py-2.5">
              <Sparkles className="w-4 h-4" />
              Start Generating
            </Link>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-display text-lg font-semibold text-white mb-5">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Generate Logo Prompts", desc: "Create AI-ready logo prompts", href: "/dashboard/generate", icon: Wand2, color: "from-violet-600 to-blue-600" },
            { label: "Build a Brand Kit", desc: "Organize your brand assets", href: "/dashboard/brand-kits", icon: Package, color: "from-blue-600 to-cyan-600" },
            { label: "View Saved Logos", desc: "Browse your design library", href: "/dashboard/saved", icon: BookmarkCheck, color: "from-pink-600 to-rose-600" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="glass-hover rounded-2xl p-5 flex items-center gap-4 group"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm text-white">{action.label}</div>
                <div className="text-xs text-white/40 mt-0.5">{action.desc}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
