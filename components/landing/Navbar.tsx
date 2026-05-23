"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">BrandForge</span>
            <span className="text-xs px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 font-medium">
              AI
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="btn-glow text-sm px-5 py-2.5"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-xl pt-16 flex flex-col"
          >
            <div className="flex flex-col gap-2 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-white py-3 border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3 rounded-xl border border-white/10 text-white/70"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center btn-glow py-3"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
