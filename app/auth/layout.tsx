import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px]" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
          <Sparkles className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="font-display font-bold text-xl text-white">BrandForge AI</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="glass rounded-3xl p-8 shadow-premium">{children}</div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-white/25">
        © 2025 BrandForge AI · <Link href="/privacy" className="hover:text-white/50">Privacy</Link> · <Link href="/terms" className="hover:text-white/50">Terms</Link>
      </p>
    </div>
  );
}
