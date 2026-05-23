import { createClient } from "@/lib/supabase/server";
import { Check, Crown, Zap, Building2, CreditCard } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    icon: Zap,
    price: "$0",
    period: "forever",
    credits: 10,
    tier: "free",
    features: ["10 generations/month", "All 6 AI tools", "Copy prompts"],
  },
  {
    name: "Pro",
    icon: Crown,
    price: "$19",
    period: "per month",
    credits: 200,
    tier: "pro",
    features: [
      "200 generations/month",
      "Save to library",
      "Brand kits",
      "Export PNG",
      "Favorites",
      "Priority AI",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "$79",
    period: "per month",
    credits: 999999,
    tier: "enterprise",
    features: [
      "Unlimited generations",
      "All Pro features",
      "White-label",
      "API access",
      "Team workspace",
      "Priority support",
    ],
  },
];

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier, credits_remaining, credits_per_month")
    .eq("id", user!.id)
    .single();

  const currentTier = profile?.subscription_tier || "free";
  const creditsUsed = (profile?.credits_per_month || 10) - (profile?.credits_remaining || 0);
  const creditsTotal = profile?.credits_per_month || 10;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Billing</h1>
        <p className="text-white/40 text-sm">Manage your subscription and credits</p>
      </div>

      {/* Current plan card */}
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-white/30 uppercase tracking-widest mb-2">Current Plan</div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Crown className="w-4.5 h-4.5 text-violet-400" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white capitalize">{currentTier}</div>
                <div className="text-xs text-white/40">
                  {currentTier === "free" ? "Free forever" : "Billed monthly"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {currentTier !== "free" && (
              <button className="px-4 py-2 text-sm border border-white/10 rounded-xl text-white/50 hover:text-white hover:border-white/20 transition-all">
                Cancel Plan
              </button>
            )}
            {currentTier === "free" && (
              <button className="btn-glow text-sm px-5 py-2.5 flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>

        {/* Credits bar */}
        <div className="mt-5 pt-5 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/50">Monthly Credits</span>
            <span className="text-white/80 font-medium">{creditsUsed} / {creditsTotal} used</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-blue-600 rounded-full transition-all"
              style={{ width: `${Math.min(100, (creditsUsed / creditsTotal) * 100)}%` }}
            />
          </div>
          <div className="text-xs text-white/30 mt-1.5">
            {profile?.credits_remaining || 0} credits remaining · Resets monthly
          </div>
        </div>
      </div>

      {/* Payment method (placeholder) */}
      {currentTier !== "free" && (
        <div className="glass rounded-2xl p-5">
          <div className="text-xs text-white/30 uppercase tracking-widest mb-4">Payment Method</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-white/10 rounded-md flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white/40" />
            </div>
            <div>
              <div className="text-sm text-white/70">•••• •••• •••• 4242</div>
              <div className="text-xs text-white/30">Expires 12/27</div>
            </div>
            <button className="ml-auto text-xs text-violet-400 hover:text-violet-300">Update</button>
          </div>
        </div>
      )}

      {/* Plan comparison */}
      <div>
        <div className="text-sm font-medium text-white/60 mb-4">All Plans</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const isActive = plan.tier === currentTier;
            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-5 border transition-all ${
                  isActive
                    ? "bg-violet-600/10 border-violet-500/30 shadow-glow"
                    : "glass border-white/[0.06]"
                }`}
              >
                {plan.popular && !isActive && (
                  <div className="text-xs text-violet-300 font-medium mb-3">✦ Most Popular</div>
                )}
                {isActive && (
                  <div className="text-xs text-violet-300 font-medium mb-3 flex items-center gap-1.5">
                    <Check className="w-3 h-3" /> Current Plan
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <plan.icon className="w-4 h-4 text-white/60" />
                  <span className="font-display font-semibold text-white">{plan.name}</span>
                </div>
                <div className="font-display text-2xl font-bold text-white mb-1">{plan.price}</div>
                <div className="text-xs text-white/30 mb-4">/{plan.period}</div>
                <div className="space-y-2 mb-5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-white/50">
                      <Check className="w-3 h-3 text-violet-400 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                {isActive ? (
                  <div className="w-full py-2.5 rounded-xl text-center text-xs font-medium text-violet-400 border border-violet-500/20 bg-violet-500/5">
                    Active
                  </div>
                ) : (
                  <button className={`w-full py-2.5 rounded-xl text-xs font-medium transition-all ${
                    plan.tier === "pro"
                      ? "btn-glow"
                      : "border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                  }`}>
                    {plan.tier === "enterprise" ? "Contact Sales" : `Switch to ${plan.name}`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs text-white/20">
        All plans include 30-day money-back guarantee · Cancel anytime
      </p>
    </div>
  );
}
