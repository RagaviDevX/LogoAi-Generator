import Link from "next/link";
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">BrandForge AI</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The most powerful AI branding suite for founders, designers, and marketers.
              Generate complete brand identities in seconds.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4">Product</div>
            <div className="space-y-3">
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Generate Logo", href: "/dashboard/generate" },
                { label: "Brand Kits", href: "/dashboard/brand-kits" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="block text-sm text-white/40 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4">Legal</div>
            <div className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="block text-sm text-white/40 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-white/25">
            © 2025 BrandForge AI. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Built with Groq · Supabase · Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
