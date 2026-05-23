"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "How does BrandForge AI work?",
    a: "You enter your brand name, industry, and style preference. Our AI (powered by Llama 3.3 70B via Groq) generates a complete brand identity including logo prompts, slogans, color palettes, typography suggestions, alternative brand names, and social media ideas — all in under 5 seconds.",
  },
  {
    q: "What can I do with the generated logo prompts?",
    a: "The logo prompts are highly detailed, ready-to-use prompts you can paste directly into Midjourney, DALL-E 3, Stable Diffusion, or any AI image generator. They specify style, colors, composition, typography direction, and mood — everything you need to get professional logo concepts.",
  },
  {
    q: "Do I need design skills to use BrandForge?",
    a: "Not at all. BrandForge is designed for founders, marketers, and entrepreneurs with zero design background. We generate everything — you just provide your brand's basic details. Designers also love it as a rapid ideation and research tool.",
  },
  {
    q: "Is the free plan actually free?",
    a: "Yes, completely free. No credit card required. The free plan gives you 10 generations per month with access to all 6 AI tools. Upgrade to Pro for 200 generations/month plus save, export, and brand kit features.",
  },
  {
    q: "Can I save my generated brands?",
    a: "Pro and Enterprise plans can save unlimited generations to your personal library, create brand kits, mark favorites, and download your generation history. Free users can copy and use results but cannot save them to the platform.",
  },
  {
    q: "What is a 'generation'?",
    a: "One generation = one complete brand identity output (logo prompt + slogans + color palettes + typography + brand names + social ideas). Each time you click 'Generate Brand', that's one generation from your monthly credit.",
  },
  {
    q: "How do I export my brand kit?",
    a: "Pro users can export brand kits as organized packages containing color codes (HEX/RGB/HSL), font recommendations, slogans, and logo prompts. Export as a shareable PDF brief or copy individual elements to your clipboard.",
  },
  {
    q: "Can I use BrandForge for client projects?",
    a: "Absolutely. Many freelancers and agencies use BrandForge to accelerate their branding workflow. The Enterprise plan includes white-label exports and team workspaces perfect for agency use.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="tag mb-4 inline-block">FAQ</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5">
            Questions? <span className="gradient-text">Answered.</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                open === i ? "border-violet-500/20 shadow-glow" : "hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-white/90 pr-4 text-sm sm:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180 text-violet-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-5 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
