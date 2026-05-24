"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const ROTATING_WORDS = ["Logos", "Brands", "Slogans", "Identities", "Palettes", "Futures"];

const FLOATING_TAGS = [
  { text: "#7C3AED", style: "top-[20%] left-[8%]", delay: 0 },
  { text: "Syne Bold", style: "top-[35%] right-[6%]", delay: 0.3 },
  { text: "Luxury", style: "top-[65%] left-[5%]", delay: 0.6 },
  { text: "#2563EB", style: "bottom-[25%] right-[8%]", delay: 0.2 },
  { text: "Minimalist", style: "top-[15%] right-[20%]", delay: 0.5 },
  { text: "Inter · Body", style: "bottom-[30%] left-[12%]", delay: 0.4 },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const word = ROTATING_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Layered background */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Radial gradient center */}
        <div className="absolute inset-0 bg-gradient-radial from-violet-950/30 via-transparent to-transparent" />
      </div>

      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-pink-600 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Floating tags */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {FLOATING_TAGS.map((tag) => (
          <motion.div
            key={tag.text}
            className={`absolute ${tag.style}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ delay: tag.delay + 1.5, duration: 4, repeat: Infinity, repeatType: "reverse" }}
          >
            <div className="glass px-3 py-1.5 rounded-full text-xs font-mono text-white/40 border border-white/[0.06] backdrop-blur-sm">
              {tag.text}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-10"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Powered by Llama 3.3 70B via Groq
          <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-xs">Free to start</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight mb-8"
        >
          <span className="text-white">Generate AI </span>
          <br />
          <span className="relative inline-block min-w-[4ch]">
            <span className="gradient-text text-glow">{displayed}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="gradient-text text-glow"
            >|</motion.span>
          </span>
          <br />
          <span className="text-white/80">in Seconds</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl text-white/45 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          BrandForge AI generates complete brand identities — logo prompts, slogans, color palettes,
          typography & more. Everything you need to launch your brand, in one click.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/auth/signup"
            className="group relative flex items-center gap-2.5 btn-glow text-base px-8 py-4 font-semibold"
          >
            <Zap className="w-4 h-4" />
            Start for Free — No card needed
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 px-6 py-4 rounded-xl text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 transition-all text-sm font-medium"
          >
            <Play className="w-3.5 h-3.5" />
            See how it works
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-20"
        >
          {[
            { value: "50K+", label: "Brands Created" },
            { value: "< 5s", label: "Generation Time" },
            { value: "6", label: "AI Tools" },
            { value: "4.9★", label: "User Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-white/30 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Hero demo card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-blue-600/10 to-pink-600/20 rounded-3xl blur-xl" />

          <div className="relative glass rounded-3xl p-1 shadow-premium">
            <div className="rounded-[22px] bg-[#0a0a0a] overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#080808] border-b border-white/[0.04]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 rounded-md bg-white/[0.04] flex items-center px-3 gap-2">
                    <div className="w-3 h-3 rounded-full border border-white/20" />
                    <span className="text-[11px] text-white/20 font-mono">logo-ai-generator-two.vercel.app/dashboard/generate</span>
                  </div>
                </div>
              </div>

              {/* Demo content */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="text-xs text-white/30 uppercase tracking-widest">Brand Input</div>
                  {[
                    { label: "Brand Name", val: "Velora Studio", active: true },
                    { label: "Industry", val: "Technology" },
                    { label: "Style", val: "Luxury · Minimal" },
                  ].map((f) => (
                    <div key={f.label} className={`rounded-xl p-3 border ${f.active ? "border-violet-500/30 bg-violet-500/5" : "border-white/[0.06] bg-white/[0.02]"}`}>
                      <div className="text-[10px] text-white/30 mb-0.5">{f.label}</div>
                      <div className="text-sm text-white/80 font-medium">{f.val}</div>
                    </div>
                  ))}
                  <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-xs font-semibold text-white text-center flex items-center justify-center gap-1.5 shadow-glow">
                    <Sparkles className="w-3.5 h-3.5" /> Generate Brand Identity
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs text-white/30 uppercase tracking-widest">AI Output</div>
                  <div className="flex gap-1.5">
                    {["#6D28D9", "#2563EB", "#EC4899", "#10B981", "#F59E0B", "#0EA5E9"].map((c) => (
                      <div key={c} className="flex-1 h-8 rounded-lg" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-xs text-white/50 font-mono leading-relaxed">
                    <span className="text-violet-400">prompt:</span> A minimalist geometric logo for Velora Studio, featuring interlocking V-shapes forming a sleek diamond mark...
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Innovation First", "Shape Tomorrow", "Design Beyond"].map((s) => (
                      <span key={s} className="tag text-xs">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {["Syne Bold", "Inter", "JetBrains Mono"].map((f) => (
                      <div key={f} className="text-[10px] text-white/30 bg-white/[0.03] px-2 py-1 rounded-lg">{f}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030303] to-transparent rounded-b-3xl pointer-events-none" />
        </motion.div>
      </motion.div>
    </section>
  );
}
