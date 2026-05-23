"use client";

import { useState } from "react";
import { Bell, Shield, Palette, Trash2, LogOut, ChevronRight, Moon } from "lucide-react";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface ToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-10 h-5.5 rounded-full transition-colors duration-300 ${
        enabled ? "bg-violet-600" : "bg-white/10"
      }`}
      style={{ height: "22px" }}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform duration-300 ${
          enabled ? "translate-x-[18px]" : "translate-x-0"
        }`}
        style={{ width: "18px", height: "18px" }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [notifications, setNotifications] = useState({
    email_generations: true,
    email_marketing: false,
    browser_notifications: true,
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  };

  const handleDeleteAccount = () => {
    toast.error("Please contact support to delete your account.");
  };

  const SECTIONS = [
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          label: "Generation complete emails",
          desc: "Get notified when your brand is ready",
          key: "email_generations" as const,
        },
        {
          label: "Marketing emails",
          desc: "Tips, updates, and product news",
          key: "email_marketing" as const,
        },
        {
          label: "Browser notifications",
          desc: "Real-time alerts in your browser",
          key: "browser_notifications" as const,
        },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-white/40 text-sm">Manage your account preferences</p>
      </div>

      {/* Notifications */}
      {SECTIONS.map((section) => (
        <div key={section.title} className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06]">
            <section.icon className="w-4 h-4 text-violet-400" />
            <span className="font-medium text-sm text-white">{section.title}</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {section.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="text-sm text-white/80">{item.label}</div>
                  <div className="text-xs text-white/30 mt-0.5">{item.desc}</div>
                </div>
                <Toggle
                  enabled={notifications[item.key]}
                  onChange={(v) => setNotifications((prev) => ({ ...prev, [item.key]: v }))}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Appearance */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06]">
          <Palette className="w-4 h-4 text-violet-400" />
          <span className="font-medium text-sm text-white">Appearance</span>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-white/80 flex items-center gap-2">
              <Moon className="w-3.5 h-3.5" /> Dark Mode
            </div>
            <div className="text-xs text-white/30 mt-0.5">Currently always dark (system default)</div>
          </div>
          <span className="tag text-xs">Active</span>
        </div>
      </div>

      {/* Security */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06]">
          <Shield className="w-4 h-4 text-violet-400" />
          <span className="font-medium text-sm text-white">Security</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors group">
            <div className="text-sm text-white/80">Change Password</div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
          </button>
          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors group">
            <div className="text-sm text-white/80">Active Sessions</div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="glass rounded-2xl overflow-hidden border-red-500/10">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <span className="font-medium text-sm text-red-400">Danger Zone</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-4 text-sm text-white/50 hover:text-white hover:bg-white/[0.02] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out of all devices
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full flex items-center gap-3 px-5 py-4 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete account
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-white/20 pb-4">
        BrandForge AI v1.0.0 · Built with Next.js + Supabase + Groq
      </p>
    </div>
  );
}
