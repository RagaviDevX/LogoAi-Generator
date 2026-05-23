"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const ROTATING_WORDS = ["Logos", "Brands", "Slogans", "Identities", "Palettes"];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = ROTATING_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background mesh */}
      <div className="absolute inset-0 mesh-gradient" />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Llama 3.3 70B + Groq
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          Generate AI{" "}
          <span className="relative inline-block">
            <span className="gradient-text text-glow">{displayed}</span>
            <span className="gradient-text text-glow">|</span>
          </span>
          <br />
          <span className="text-white/90">in Seconds</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          BrandForge AI creates complete brand identities — logos, slogans, color palettes,
          typography, and more. The most powerful AI branding suite for modern founders.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/auth/signup"
            className="group flex items-center gap-2 btn-glow text-base px-8 py-4"
          >
            <Zap className="w-4 h-4" />
            Start for Free
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 text-base font-medium"
          >
            See how it works
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/40"
        >
          {[
            { value: "50K+", label: "Brands Created" },
            { value: "< 5s", label: "Generation Time" },
            { value: "6", label: "AI Tools" },
            { value: "Free", label: "To Start" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="text-white/80 font-semibold font-display">{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Hero preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="glass rounded-3xl p-1 shadow-premium max-w-4xl mx-auto">
            <div className="rounded-[22px] overflow-hidden bg-[#0a0a0a] p-6 sm:p-8">
              {/* Mock dashboard preview */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4 h-6 rounded-md bg-white/5 flex items-center px-3">
                  <span className="text-xs text-white/30">brandforge.ai/dashboard/generate</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Input panel */}
                <div className="sm:col-span-1 space-y-3">
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Brand Input</div>
                  {[
                    { label: "Brand Name", value: "Velora Studio" },
                    { label: "Industry", value: "Technology" },
                    { label: "Style", value: "Luxury / Modern" },
                  ].map((field) => (
                    <div key={field.label} className="glass rounded-xl p-3">
                      <div className="text-xs text-white/30 mb-1">{field.label}</div>
                      <div className="text-sm text-white/80 font-medium">{field.value}</div>
                    </div>
                  ))}
                  <button className="w-full btn-glow py-2.5 text-sm">
                    <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
                    Generate Brand
                  </button>
                </div>

                {/* Results panel */}
                <div className="sm:col-span-2 space-y-3">
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-3">AI Results</div>
                  <div className="grid grid-cols-3 gap-2">
                    {["#6D28D9", "#2563EB", "#EC4899", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                      <div
                        key={color}
                        className="h-8 rounded-lg opacity-80"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <div className="glass rounded-xl p-3 text-sm text-white/60 leading-relaxed">
                    <span className="text-violet-400 font-medium">Logo prompt: </span>
                    A minimalist geometric logo for Velora Studio, featuring interlocking V-shapes forming a diamond...
                  </div>
                  <div className="flex gap-2">
                    {["Innovation First", "Design Beyond Limits", "Shape Tomorrow"].map((s) => (
                      <span key={s} className="tag text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent rounded-b-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
