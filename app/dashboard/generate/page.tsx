"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Wand2, Sparkles, Loader2, Copy, Check, Heart, Download,
  ChevronDown, Palette, Type, MessageSquare, Image, Lightbulb,
} from "lucide-react";
import { INDUSTRIES, STYLES, copyToClipboard } from "@/utils";
import type { GenerationResult, ColorPalette, TypographySuggestion } from "@/types";

type TabType = "logo-prompt" | "slogans" | "colors" | "typography" | "brand-names" | "social";

export default function GeneratePage() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Partial<GenerationResult> | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("logo-prompt");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!brandName.trim()) { toast.error("Please enter a brand name"); return; }
    if (!industry) { toast.error("Please select an industry"); return; }
    if (!style) { toast.error("Please select a style"); return; }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandName, industry, style, description }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      setResult(data.result);
      toast.success("Brand identity generated!");
      setActiveTab("logo-prompt");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id);
      toast.success("Copied!");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const TABS = [
    { id: "logo-prompt" as TabType, label: "Logo Prompt", icon: Image },
    { id: "slogans" as TabType, label: "Slogans", icon: MessageSquare },
    { id: "colors" as TabType, label: "Colors", icon: Palette },
    { id: "typography" as TabType, label: "Typography", icon: Type },
    { id: "brand-names" as TabType, label: "Brand Names", icon: Lightbulb },
    { id: "social" as TabType, label: "Social Ideas", icon: Sparkles },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">AI Brand Generator</h1>
        <p className="text-white/40 text-sm">Enter your brand details and get a complete identity kit in seconds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input panel */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass rounded-2xl p-5 space-y-4">
            <div>
              <label className="block text-xs text-white/40 font-medium mb-2">Brand Name *</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Velora Studio"
                maxLength={50}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-white/40 font-medium mb-2">Industry *</label>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all cursor-pointer"
                >
                  <option value="" disabled className="bg-[#111]">Select industry...</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i.value} value={i.value} className="bg-[#111]">{i.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 font-medium mb-2">Design Style *</label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStyle(s.value)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                      style === s.value
                        ? "bg-violet-600/20 border-violet-500/40 text-violet-300"
                        : "bg-white/3 border-white/8 text-white/50 hover:text-white hover:border-white/15"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 font-medium mb-2">
                Additional Context <span className="text-white/20">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Target audience, brand values, keywords..."
                rows={3}
                maxLength={200}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !brandName || !industry || !style}
              className="w-full btn-glow py-3.5 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating brand identity...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate Brand Identity
                </>
              )}
            </button>
          </div>

          {/* Tips */}
          <div className="glass rounded-2xl p-4">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-3">💡 Tips</div>
            <ul className="space-y-2 text-xs text-white/40">
              <li>• Use your actual brand name for best results</li>
              <li>• The more specific your description, the better</li>
              <li>• Try multiple styles to find your perfect match</li>
              <li>• Copy logo prompts to Midjourney for visuals</li>
            </ul>
          </div>
        </div>

        {/* Results panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl p-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-5">
                    <Sparkles className="w-8 h-8 text-violet-400 animate-pulse" />
                  </div>
                  <div className="font-display text-lg font-semibold text-white mb-2">
                    AI is crafting your brand...
                  </div>
                  <p className="text-white/40 text-sm mb-6">This takes 3-5 seconds</p>
                  <div className="space-y-2 max-w-xs mx-auto">
                    {["Analyzing brand context", "Generating logo prompts", "Creating color palettes", "Crafting slogans"].map((step, i) => (
                      <div key={step} className="flex items-center gap-3 text-xs">
                        <div className="w-4 h-4 rounded-full border-2 border-violet-500/50 border-t-violet-400 animate-spin" style={{ animationDelay: `${i * 0.2}s` }} />
                        <span className="text-white/50">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl overflow-hidden"
              >
                {/* Tabs */}
                <div className="flex overflow-x-auto scrollbar-hide border-b border-white/[0.06] p-2 gap-1">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                        activeTab === tab.id
                          ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="p-5">
                  <AnimatePresence mode="wait">
                    {activeTab === "logo-prompt" && result.logo_prompt && (
                      <motion.div key="lp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm font-medium text-white">AI Logo Prompt</div>
                          <button
                            onClick={() => handleCopy(result.logo_prompt!, "logo-prompt")}
                            className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300"
                          >
                            {copiedId === "logo-prompt" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            Copy
                          </button>
                        </div>
                        <div className="bg-white/3 rounded-xl p-4 text-sm text-white/70 leading-relaxed font-mono">
                          {result.logo_prompt}
                        </div>
                        <p className="mt-3 text-xs text-white/30">
                          Paste this prompt directly into Midjourney, DALL-E 3, or Stable Diffusion
                        </p>
                      </motion.div>
                    )}

                    {activeTab === "slogans" && result.slogans && (
                      <motion.div key="sl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                        <div className="text-sm font-medium text-white mb-3">Brand Slogans</div>
                        {result.slogans.map((slogan, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white/3 rounded-xl group hover:bg-white/5 transition-colors">
                            <span className="text-sm text-white/80 font-medium">"{slogan}"</span>
                            <button
                              onClick={() => handleCopy(slogan, `slogan-${i}`)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-lg"
                            >
                              {copiedId === `slogan-${i}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
                            </button>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === "colors" && result.color_palettes && (
                      <motion.div key="cp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div className="text-sm font-medium text-white mb-3">Color Palettes</div>
                        {(result.color_palettes as ColorPalette[]).map((palette, i) => (
                          <div key={i} className="bg-white/3 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-xs font-semibold text-white/70">{palette.name}</div>
                            </div>
                            <div className="flex gap-2 mb-3">
                              {[palette.primary, palette.secondary, palette.accent, palette.background, palette.text].map((color, ci) => (
                                <button
                                  key={ci}
                                  onClick={() => handleCopy(color, `color-${i}-${ci}`)}
                                  className="group relative"
                                  title={color}
                                >
                                  <div
                                    className="w-10 h-10 rounded-xl ring-2 ring-offset-2 ring-offset-[#0a0a0a] ring-transparent hover:ring-white/20 transition-all"
                                    style={{ background: color }}
                                  />
                                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-white/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {color}
                                  </span>
                                </button>
                              ))}
                            </div>
                            <p className="text-xs text-white/40 mt-4">{palette.description}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === "typography" && result.typography && (
                      <motion.div key="ty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div className="text-sm font-medium text-white mb-3">Typography Pairings</div>
                        {(result.typography as TypographySuggestion[]).map((typo, i) => (
                          <div key={i} className="bg-white/3 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="tag">{typo.mood}</span>
                            </div>
                            <div className="space-y-2 mb-3">
                              {[
                                { label: "Heading", font: typo.heading },
                                { label: "Body", font: typo.body },
                                { label: "Accent", font: typo.accent },
                              ].map(({ label, font }) => (
                                <div key={label} className="flex items-center justify-between">
                                  <span className="text-xs text-white/30">{label}</span>
                                  <span className="text-sm text-white/80 font-medium">{font}</span>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-white/40 border-t border-white/5 pt-3">{typo.pairing_reason}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === "brand-names" && result.brand_names && (
                      <motion.div key="bn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                        <div className="text-sm font-medium text-white mb-3">Alternative Brand Names</div>
                        <div className="grid grid-cols-2 gap-2">
                          {result.brand_names.map((name, i) => (
                            <button
                              key={i}
                              onClick={() => handleCopy(name, `name-${i}`)}
                              className="flex items-center justify-between p-3 bg-white/3 rounded-xl hover:bg-white/5 transition-colors group text-left"
                            >
                              <span className="font-display font-semibold text-sm text-white/80">{name}</span>
                              <Copy className="w-3 h-3 text-white/20 group-hover:text-white/50 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "social" && result.social_ideas && (
                      <motion.div key="si" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                        <div className="text-sm font-medium text-white mb-3">Social Media Ideas</div>
                        {result.social_ideas.map((idea, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-white/3 rounded-xl">
                            <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[10px] text-violet-400 font-bold">{i + 1}</span>
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed">{idea}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action bar */}
                <div className="border-t border-white/[0.06] p-4 flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors px-3 py-2 hover:bg-white/5 rounded-xl">
                    <Heart className="w-3.5 h-3.5" />
                    Save
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors px-3 py-2 hover:bg-white/5 rounded-xl">
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="ml-auto flex items-center gap-1.5 btn-glow text-xs px-4 py-2"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    Regenerate
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-blue-600/10 flex items-center justify-center mx-auto mb-5">
                  <Wand2 className="w-8 h-8 text-violet-400" />
                </div>
                <div className="font-display text-xl font-semibold text-white mb-3">
                  Your brand identity appears here
                </div>
                <p className="text-white/40 text-sm max-w-sm mx-auto">
                  Fill in the form and click Generate to create a complete AI brand kit
                  — logo prompts, slogans, colors, and more.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
