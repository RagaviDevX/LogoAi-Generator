"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="glass rounded-2xl p-10 text-center max-w-md">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </div>
        <h2 className="font-display text-xl font-bold text-white mb-3">Something went wrong</h2>
        <p className="text-white/40 text-sm mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="btn-glow flex items-center gap-2 mx-auto px-5 py-2.5 text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
