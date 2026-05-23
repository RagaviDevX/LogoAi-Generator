"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#030303] text-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Something went wrong
          </h2>
          <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">
            {error.message || "An unexpected error occurred. Our team has been notified."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="btn-glow flex items-center gap-2 px-5 py-2.5"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all"
            >
              <Home className="w-4 h-4" />
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
