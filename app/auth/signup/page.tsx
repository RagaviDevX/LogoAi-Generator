"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, User, Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const PERKS = [
  "10 free generations per month",
  "All 6 AI branding tools",
  "No credit card required",
];

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Check your email to confirm.");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      toast.error(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-6">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Create your account</h1>
        <p className="text-white/40 text-sm">Start building brands with AI today</p>
      </div>

      {/* Perks */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {PERKS.map((p) => (
          <span key={p} className="flex items-center gap-1.5 text-xs text-white/50">
            <Check className="w-3 h-3 text-violet-400" /> {p}
          </span>
        ))}
      </div>

      {/* Google */}
      <button
        onClick={handleGoogleSignup}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-sm font-medium text-white/80 hover:text-white mb-5 disabled:opacity-50"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )}
        Continue with Google
      </button>

      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/8" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-[#0c0c0c] text-xs text-white/30">or with email</span>
        </div>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-xs text-white/40 mb-1.5 font-medium">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Johnson"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/40 mb-1.5 font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/40 mb-1.5 font-medium">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type={showPass ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-glow py-3 text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Creating account..." : "Create Free Account"}
        </button>
      </form>

      <p className="text-center text-xs text-white/25 mt-4">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-white/40 hover:text-white">Terms</Link> and{" "}
        <Link href="/privacy" className="text-white/40 hover:text-white">Privacy Policy</Link>
      </p>

      <p className="text-center text-sm text-white/40 mt-4">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-violet-400 hover:text-violet-300 font-medium">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
