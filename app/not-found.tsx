import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-[120px] sm:text-[160px] font-bold leading-none gradient-text text-glow mb-4">
          404
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
          Page not found
        </h1>
        <p className="text-white/40 text-base mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-glow flex items-center justify-center gap-2 px-6 py-3"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
