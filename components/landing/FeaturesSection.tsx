"use client";

import { motion } from "framer-motion";
import {
  Sparkles, Palette, Type, MessageSquare, Image, Wand2, ArrowRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: Image,
    title: "AI Logo Generator",
    description:
      "Generate professional logo concepts with detailed AI prompts ready for any image generator. Get multiple concepts per brand.",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.3)",
    tag: "Most Popular",
  },
  {
    icon: MessageSquare,
    title: "AI Slogan Generator",
    description:
      "Create 8+ memorable, brand-appropriate slogans in seconds. Perfect taglines that capture your brand essence.",
    color: "from-blue-500 to-cyan-600",
    glow: "rgba(37,99,235,0.3)",
  },
  {
    icon: Palette,
    title: "Color Palette Generator",
    description:
      "Get 3 complete color palettes with hex codes, names, and explanations tailored to your brand personality.",
    color: "from-pink-500 to-rose-600",
    glow: "rgba(236,72,153,0.3)",
  },
  {
    icon: Type,
    title: "Typography Suggestions",
    description:
      "Receive curated font pairings with heading, body, and accent fonts. Each with mood descriptions and pairing rationale.",
    color: "from-amber-500 to-orange-600",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Sparkles,
    title: "Brand Name Ideas",
    description:
      "Generate 10 creative, domain-friendly brand name alternatives. Unique, catchy, and industry-appropriate.",
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: Wand2,
    title: "Logo Prompt Generator",
    description:
      "Get detailed, ready-to-use prompts for Midjourney, DALL-E, and Stable Diffusion with style and composition guidance.",
    color: "from-indigo-500 to-violet-600",
    glow: "rgba(99,102,241,0.3)",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="tag mb-4 inline-block">6 Powerful AI Tools</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Everything your brand{" "}
            <span className="gradient-text">needs to launch</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            One prompt. Six AI-powered outputs. Get a complete brand identity kit
            generated in under 5 seconds.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-hover p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.glow} 0%, transparent 60%)`,
                }}
              />

              {/* Tag */}
              {feature.tag && (
                <span className="absolute top-4 right-4 tag text-xs">{feature.tag}</span>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-semibold mb-3 text-white group-hover:text-violet-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>

              {/* Arrow */}
              <div className="mt-5 flex items-center gap-1.5 text-violet-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Try it now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
