"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User, Mail, Globe, Building2, FileText, Save, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    company: "",
    website: "",
    bio: "",
  });
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }
      setEmail(user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setForm({
          full_name: profile.full_name || "",
          company: profile.company || "",
          website: profile.website || "",
          bio: profile.bio || "",
        });
        setAvatarUrl(profile.avatar_url || "");
      }
      setLoading(false);
    };
    load();
  }, [supabase, router]);

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ ...form, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (error) toast.error("Failed to save profile");
    else toast.success("Profile updated!");
    setSaving(false);
  };

  const initials = form.full_name?.slice(0, 2).toUpperCase() || email?.slice(0, 2).toUpperCase() || "U";

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-8 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 shimmer rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Profile</h1>
        <p className="text-white/40 text-sm">Manage your personal information</p>
      </div>

      {/* Avatar section */}
      <div className="glass rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-xl font-bold text-white shrink-0">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" className="w-full h-full rounded-2xl object-cover" />
          ) : initials}
        </div>
        <div>
          <div className="font-medium text-white">{form.full_name || "Your Name"}</div>
          <div className="text-sm text-white/40">{email}</div>
          <div className="text-xs text-white/30 mt-1">Avatar synced from Google (if signed in with Google)</div>
        </div>
      </div>

      {/* Form */}
      <div className="glass rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-xs text-white/40 font-medium mb-2">
            <User className="w-3 h-3 inline mr-1.5" />Full Name
          </label>
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            placeholder="Your full name"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-white/40 font-medium mb-2">
            <Mail className="w-3 h-3 inline mr-1.5" />Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white/40 opacity-60 cursor-not-allowed"
          />
          <p className="text-xs text-white/25 mt-1">Email cannot be changed here</p>
        </div>

        <div>
          <label className="block text-xs text-white/40 font-medium mb-2">
            <Building2 className="w-3 h-3 inline mr-1.5" />Company
          </label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Your company or project"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-white/40 font-medium mb-2">
            <Globe className="w-3 h-3 inline mr-1.5" />Website
          </label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="https://yourwebsite.com"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-white/40 font-medium mb-2">
            <FileText className="w-3 h-3 inline mr-1.5" />Bio
          </label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="A short bio about yourself"
            rows={3}
            maxLength={300}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-glow flex items-center gap-2 px-6 py-3 text-sm font-medium disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
