"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Founder, NovaTech",
    avatar: "SC",
    color: "from-violet-500 to-purple-600",
    content:
      "BrandForge generated a complete brand identity for my startup in under 10 seconds. The color palettes and slogan ideas were genuinely better than what a freelancer quoted me $800 for.",
    stars: 5,
  },
  {
    name: "Marcus Williams",
    role: "Creative Director, Apex Agency",
    avatar: "MW",
    color: "from-blue-500 to-cyan-600",
    content:
      "We use BrandForge as the starting point for every client project. The logo prompts are incredibly detailed — we feed them straight into Midjourney and get usable concepts immediately.",
    stars: 5,
  },
  {
    name: "Priya Patel",
    role: "Product Designer",
    avatar: "PP",
    color: "from-pink-500 to-rose-600",
    content:
      "The typography pairings feature alone is worth it. I used to spend hours on Google Fonts. Now I get 2 perfect pairings with explanations in seconds.",
    stars: 5,
  },
  {
    name: "James O'Brien",
    role: "Marketing Lead, Stripe",
    avatar: "JO",
    color: "from-emerald-500 to-teal-600",
    content:
      "I launched 3 side projects this year. BrandForge handled the branding for all of them. The brand name ideas are legitimately creative — not the generic stuff you get from other tools.",
    stars: 5,
  },
  {
    name: "Luna Rodriguez",
    role: "UI/UX Freelancer",
    avatar: "LR",
    color: "from-amber-500 to-orange-600",
    content:
      "My clients love when I show them 3 color palette options in the first meeting. BrandForge makes me look like I spent hours on research when it took 5 seconds.",
    stars: 5,
  },
  {
    name: "David Kim",
    role: "Serial Entrepreneur",
    avatar: "DK",
    color: "from-indigo-500 to-violet-600",
    content:
      "The Pro plan is a steal. I generate brand kits for my portfolio companies and the quality is consistently high. The AI actually understands industry-specific aesthetics.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">Loved by Builders</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5">
            Trusted by <span className="gradient-text">50,000+ brands</span>
          </h2>
          <div className="flex items-center justify-center gap-1 text-amber-400 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="ml-2 text-white/50 text-sm">4.9/5 from 2,400+ reviews</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="break-inside-avoid glass rounded-2xl p-5 hover:border-white/10 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
