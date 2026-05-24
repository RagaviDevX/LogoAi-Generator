import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Sparkles, Copy } from "lucide-react";
import type { ColorPalette, TypographySuggestion } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("logo_generations").select("brand_name, industry").eq("id", id).single();
  return {
    title: data ? `${data.brand_name} — Brand Kit | BrandForge AI` : "Brand Kit | BrandForge AI",
    description: data ? `AI-generated brand identity for ${data.brand_name} in ${data.industry}` : "View brand kit",
  };
}

export default async function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: gen, error } = await supabase
    .from("logo_generations")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !gen) notFound();

  const palettes = (gen.color_palettes || []) as ColorPalette[];
  const typography = (gen.typography || []) as TypographySuggestion[];
  const slogans = (gen.slogans || []) as string[];
  const brandNames = (gen.brand_names || []) as string[];
  const socialIdeas = (gen.social_ideas || []) as string[];
  const p = palettes[0];

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display font-bold text-sm text-white">BrandForge AI</span>
        </Link>
        <Link href="/auth/signup" className="btn-glow text-xs px-4 py-2">
          Create your brand →
        </Link>
      </div>

      <div className="pt-20 pb-16 max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Color strip */}
          {p && (
            <div className="flex h-3 rounded-full overflow-hidden mb-8 max-w-xs mx-auto">
              <div className="flex-1" style={{ background: p.primary }} />
              <div className="flex-1" style={{ background: p.secondary }} />
              <div className="flex-1" style={{ background: p.accent }} />
            </div>
          )}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" /> AI-Generated Brand Kit
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            {gen.brand_name}
          </h1>
          <p className="text-white/40 capitalize">{gen.industry} · {gen.style}</p>
        </div>

        {/* Logo Prompt */}
        {gen.logo_prompt && (
          <section className="mb-8">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
              🎨 Logo Prompt
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <div className="glass rounded-2xl p-5 font-mono text-sm text-white/70 leading-relaxed relative group">
              {gen.logo_prompt}
            </div>
            <p className="text-xs text-white/25 mt-2 text-center">Use this prompt in Midjourney · DALL-E 3 · Stable Diffusion</p>
          </section>
        )}

        {/* Slogans */}
        {slogans.length > 0 && (
          <section className="mb-8">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
              💬 Slogans
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <div className="space-y-2">
              {slogans.map((s, i) => (
                <div key={i} className="glass rounded-xl px-4 py-3 text-sm text-white/70 italic">
                  "{s}"
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Color Palettes */}
        {palettes.length > 0 && (
          <section className="mb-8">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
              🎨 Color Palettes
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <div className="space-y-4">
              {palettes.map((pal, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden">
                  <div className="flex h-14">
                    {[pal.primary, pal.secondary, pal.accent, pal.background, pal.text].map((c, ci) => (
                      <div key={ci} className="flex-1" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-sm text-white mb-2">{pal.name}</div>
                    <div className="flex gap-3 flex-wrap">
                      {[
                        { l: "Primary", v: pal.primary },
                        { l: "Secondary", v: pal.secondary },
                        { l: "Accent", v: pal.accent },
                      ].map(({ l, v }) => (
                        <div key={l} className="flex items-center gap-1.5 text-xs text-white/50">
                          <div className="w-3 h-3 rounded-sm" style={{ background: v }} />
                          <span>{l}: <span className="font-mono text-white/70">{v}</span></span>
                        </div>
                      ))}
                    </div>
                    {pal.description && <p className="text-xs text-white/30 mt-2">{pal.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Typography */}
        {typography.length > 0 && (
          <section className="mb-8">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
              ✍️ Typography
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <div className="space-y-3">
              {typography.map((t, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="tag text-xs">{t.mood}</span>
                    <span className="text-xs text-white/30">Pairing {i + 1}</span>
                  </div>
                  {[{ l: "Heading", v: t.heading }, { l: "Body", v: t.body }, { l: "Accent", v: t.accent }].map(({ l, v }) => (
                    <div key={l} className="flex items-center justify-between py-1.5 text-sm border-b border-white/[0.04] last:border-0">
                      <span className="text-xs text-white/30 w-16">{l}</span>
                      <span className="text-white/70 font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Brand Names */}
        {brandNames.length > 0 && (
          <section className="mb-8">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
              💡 Alternative Brand Names
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {brandNames.map((name, i) => (
                <div key={i} className="glass rounded-xl p-3 text-center font-display font-semibold text-sm text-white/70">
                  {name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Social Ideas */}
        {socialIdeas.length > 0 && (
          <section className="mb-8">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
              📱 Social Media Ideas
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <div className="space-y-2">
              {socialIdeas.map((idea, i) => (
                <div key={i} className="flex items-start gap-3 glass rounded-xl p-4">
                  <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] text-violet-400 font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-white/60">{idea}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="glass rounded-2xl p-8 text-center">
          <div className="font-display text-xl font-bold text-white mb-2">
            Create your own brand kit
          </div>
          <p className="text-white/40 text-sm mb-5">
            Generate logo prompts, slogans, color palettes & more with AI in seconds
          </p>
          <Link href="/auth/signup" className="btn-glow inline-flex items-center gap-2 px-6 py-3">
            <Sparkles className="w-4 h-4" />
            Start for Free
          </Link>
        </div>
      </div>
    </div>
  );
}
