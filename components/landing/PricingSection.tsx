"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    icon: Zap,
    price: "$0",
    period: "forever",
    description: "Perfect to get started and explore AI branding.",
    credits: "10 generations/month",
    color: "from-white/10 to-white/5",
    border: "border-white/10",
    cta: "Start Free",
    ctaStyle: "border border-white/20 hover:border-white/40 text-white",
    features: [
      "10 brand generations/month",
      "All 6 AI tools",
      "Color palette generator",
      "Slogan generator",
      "Typography suggestions",
      "Copy AI prompts",
    ],
    missing: ["Save to library", "Brand kits", "Export PNG", "Priority generation"],
  },
  {
    name: "Pro",
    icon: Crown,
    price: "$19",
    period: "per month",
    description: "For founders and designers who build brands daily.",
    credits: "200 generations/month",
    color: "from-violet-600/20 to-blue-600/10",
    border: "border-violet-500/30",
    cta: "Get Pro",
    ctaStyle: "btn-glow",
    popular: true,
    features: [
      "200 brand generations/month",
      "All 6 AI tools",
      "Save to library (unlimited)",
      "Brand kits",
      "Export PNG logos",
      "Priority AI generation",
      "Favorite designs",
      "Download history",
    ],
    missing: ["White-label exports", "API access"],
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "$79",
    period: "per month",
    description: "For agencies and teams scaling brand production.",
    credits: "Unlimited generations",
    color: "from-amber-600/10 to-orange-600/5",
    border: "border-amber-500/20",
    cta: "Contact Sales",
    ctaStyle: "border border-amber-500/30 hover:border-amber-500/60 text-amber-300",
    features: [
      "Unlimited generations",
      "All Pro features",
      "White-label exports",
      "API access",
      "Team workspace",
      "Custom brand guidelines",
      "Priority support",
      "Custom integrations",
    ],
    missing: [],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Simple Pricing</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5">
            Start free, scale as you{" "}
            <span className="gradient-text">grow</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            No hidden fees. No credit card required to start. Upgrade anytime.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border ${plan.border} bg-gradient-to-b ${plan.color} p-6 ${
                plan.popular ? "ring-1 ring-violet-500/50 shadow-glow" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <plan.icon className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <div className="font-display font-semibold text-white">{plan.name}</div>
                  <div className="text-xs text-white/40">{plan.credits}</div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">/{plan.period}</span>
                </div>
                <p className="text-white/40 text-sm mt-1">{plan.description}</p>
              </div>

              {/* CTA */}
              <Link
                href="/auth/signup"
                className={`w-full flex items-center justify-center py-3 px-5 rounded-xl text-sm font-medium transition-all duration-300 mb-6 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>

              {/* Features */}
              <div className="space-y-2.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                    <span className="text-white/70">{f}</span>
                  </div>
                ))}
                {plan.missing.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm opacity-30">
                    <div className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                      <div className="w-3 h-px bg-white/40" />
                    </div>
                    <span className="text-white/40">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money back */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-10"
        >
          30-day money-back guarantee · Cancel anytime · No credit card required for free tier
        </motion.p>
      </div>
    </section>
  );
}
