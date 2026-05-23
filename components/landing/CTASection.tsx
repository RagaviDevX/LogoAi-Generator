"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Glow background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-violet-600/20 blur-[100px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gradient-border p-12"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-glow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5">
            Your brand starts{" "}
            <span className="gradient-text">right now</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Join 50,000+ founders who launched their brand with BrandForge AI.
            Free to start. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="group btn-glow text-base px-10 py-4 flex items-center gap-2">
              Start Generating Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#pricing" className="text-sm text-white/40 hover:text-white transition-colors">
              View Pricing →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
