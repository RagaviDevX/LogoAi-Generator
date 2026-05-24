"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Wand2, Sparkles, Loader2, Copy, Check, Heart, Download,
  ChevronDown, Palette, Type, MessageSquare, Image, Lightbulb,
  Share2, FileText, RefreshCw, Zap,
} from "lucide-react";
import { INDUSTRIES, STYLES, copyToClipboard } from "@/utils";
import type { GenerationResult, ColorPalette, TypographySuggestion } from "@/types";

type TabType = "logo-prompt" | "slogans" | "colors" | "typography" | "brand-names" | "social";

const LOADING_STEPS = [
  "Analyzing brand context...",
  "Generating logo prompts...",
  "Creating color palettes...",
  "Crafting slogans...",
  "Suggesting typography...",
  "Building social ideas...",
];

export default function GeneratePage() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<Partial<GenerationResult> | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("logo-prompt");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleGenerate = async () => {
    if (!brandName.trim()) { toast.error("Please enter a brand name"); return; }
    if (!industry) { toast.error("Please select an industry"); return; }
    if (!style) { toast.error("Please select a style"); return; }

    setLoading(true);
    setResult(null);
    setIsSaved(false);
    setSavedId(null);
    setShareUrl(null);
    setLoadingStep(0);

    // Animate loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep((s) => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
    }, 800);

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
      if (data.result?.id) setSavedId(data.result.id);
      toast.success("Brand identity generated! 🎨");
      setActiveTab("logo-prompt");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Check your GROQ_API_KEY.");
    } finally {
      clearInterval(stepInterval);
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

  const handleSave = async () => {
    if (!result || isSaved) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/logos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: savedId, is_favorite: true }),
      });
      if (res.ok) {
        setIsSaved(true);
        toast.success("Saved to favorites! ❤️");
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = async () => {
    if (!result) return;
    setIsExporting(true);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName,
          industry,
          style,
          result,
        }),
      });

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${brandName.replace(/\s+/g, "-").toLowerCase()}-brand-kit.html`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Brand kit downloaded! 📄");
    } catch {
      toast.error("Export failed. Try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!savedId) {
      toast.error("Generate a brand first");
      return;
    }
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ generationId: savedId }),
      });
      const data = await res.json();
      if (data.shareUrl) {
        setShareUrl(data.shareUrl);
        setShowShareModal(true);
      }
    } catch {
      toast.error("Failed to create share link");
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
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          AI Brand Generator
        </h1>
        <p className="text-white/40 text-sm ml-12">Enter your brand details and get a complete identity kit in seconds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-2xl p-5 space-y-4">

            {/* Brand Name */}
            <div>
              <label className="block text-xs text-white/50 font-medium mb-2 uppercase tracking-wider">Brand Name *</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="e.g. Velora Studio"
                maxLength={50}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs text-white/50 font-medium mb-2 uppercase tracking-wider">Industry *</label>
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

            {/* Style */}
            <div>
              <label className="block text-xs text-white/50 font-medium mb-2 uppercase tracking-wider">Design Style *</label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStyle(s.value)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                      style === s.value
                        ? "bg-violet-600/20 border-violet-500/40 text-violet-300 shadow-glow"
                        : "bg-white/[0.03] border-white/[0.08] text-white/50 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-white/50 font-medium mb-2 uppercase tracking-wider">
                Additional Context <span className="text-white/20 normal-case">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Target audience, brand values, keywords..."
                rows={3}
                maxLength={300}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
              />
              <div className="text-right text-xs text-white/20 mt-1">{description.length}/300</div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !brandName || !industry || !style}
              className="w-full btn-glow py-4 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
              ) : (
                <><Zap className="w-4 h-4" /> Generate Brand Identity</>
              )}
            </button>
          </div>

          {/* Tips */}
          <div className="glass rounded-2xl p-4">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Pro Tips
            </div>
            <ul className="space-y-2 text-xs text-white/40 leading-relaxed">
              <li>• Be specific with your brand name for better results</li>
              <li>• Add context like "eco-friendly" or "luxury" for tailored output</li>
              <li>• Copy logo prompts to <strong className="text-white/60">Midjourney</strong> or <strong className="text-white/60">DALL-E 3</strong></li>
              <li>• Try different styles on the same brand name</li>
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
                className="glass rounded-2xl p-10"
              >
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-violet-400" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
                  </div>
                  <div className="font-display text-xl font-semibold text-white mb-2">
                    Crafting your brand identity...
                  </div>
                  <p className="text-white/30 text-sm mb-8">Powered by Llama 3.3 70B</p>

                  <div className="space-y-3 max-w-xs mx-auto text-left">
                    {LOADING_STEPS.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: i <= loadingStep ? 1 : 0.2, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          i < loadingStep ? "bg-violet-500" : i === loadingStep ? "border-2 border-violet-400 border-t-transparent animate-spin" : "border border-white/10"
                        }`}>
                          {i < loadingStep && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={i <= loadingStep ? "text-white/70" : "text-white/20"}>{step}</span>
                      </motion.div>
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
                {/* Brand header */}
                <div className="px-5 pt-5 pb-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-bold text-white">{brandName}</div>
                    <div className="text-xs text-white/40 capitalize">{industry} · {style}</div>
                  </div>
                  {/* Color preview dots */}
                  <div className="flex gap-1.5">
                    {result.color_palettes && (result.color_palettes as ColorPalette[])[0] && (
                      <>
                        <div className="w-5 h-5 rounded-full" style={{ background: (result.color_palettes as ColorPalette[])[0].primary }} />
                        <div className="w-5 h-5 rounded-full" style={{ background: (result.color_palettes as ColorPalette[])[0].secondary }} />
                        <div className="w-5 h-5 rounded-full" style={{ background: (result.color_palettes as ColorPalette[])[0].accent }} />
                      </>
                    )}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto scrollbar-hide border-b border-white/[0.06] px-3 pt-2 gap-1">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                        activeTab === tab.id
                          ? "text-violet-300 border-violet-500"
                          : "text-white/40 border-transparent hover:text-white hover:border-white/20"
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="p-5 min-h-[300px]">
                  <AnimatePresence mode="wait">

                    {/* Logo Prompt */}
                    {activeTab === "logo-prompt" && result.logo_prompt && (
                      <motion.div key="lp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm font-semibold text-white">🎨 AI Logo Prompt</div>
                          <button
                            onClick={() => handleCopy(result.logo_prompt!, "logo-prompt")}
                            className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 px-3 py-1.5 rounded-lg border border-violet-500/20 hover:border-violet-500/40 transition-all"
                          >
                            {copiedId === "logo-prompt" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedId === "logo-prompt" ? "Copied!" : "Copy Prompt"}
                          </button>
                        </div>
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-sm text-white/70 leading-relaxed font-mono">
                          {result.logo_prompt}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {["Midjourney", "DALL-E 3", "Stable Diffusion"].map((tool) => (
                            <div key={tool} className="text-center py-2 px-3 bg-white/[0.03] rounded-xl border border-white/[0.06] text-xs text-white/40">
                              Use in {tool}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Slogans */}
                    {activeTab === "slogans" && result.slogans && (
                      <motion.div key="sl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                        <div className="text-sm font-semibold text-white mb-4">💬 Brand Slogans</div>
                        {(result.slogans as string[]).map((slogan, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center justify-between p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl group hover:border-violet-500/20 hover:bg-violet-500/5 transition-all"
                          >
                            <span className="text-sm text-white/80 font-medium">"{slogan}"</span>
                            <button
                              onClick={() => handleCopy(slogan, `slogan-${i}`)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-lg ml-2 shrink-0"
                            >
                              {copiedId === `slogan-${i}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Colors */}
                    {activeTab === "colors" && result.color_palettes && (
                      <motion.div key="cp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                        <div className="text-sm font-semibold text-white">🎨 Color Palettes</div>
                        {(result.color_palettes as ColorPalette[]).map((palette, i) => (
                          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                            {/* Color bar */}
                            <div className="flex h-12">
                              {[palette.primary, palette.secondary, palette.accent, palette.background, palette.text].map((color, ci) => (
                                <button
                                  key={ci}
                                  onClick={() => handleCopy(color, `c-${i}-${ci}`)}
                                  className="flex-1 relative group transition-all hover:flex-[2]"
                                  style={{ background: color }}
                                  title={`Copy ${color}`}
                                >
                                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[9px] font-mono font-bold transition-opacity"
                                    style={{ color: color === '#ffffff' || color === '#fff' ? '#000' : '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                    {color}
                                  </span>
                                </button>
                              ))}
                            </div>
                            {/* Info */}
                            <div className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-xs font-semibold text-white/80">{palette.name}</div>
                                <button
                                  onClick={() => handleCopy(
                                    `Primary: ${palette.primary}\nSecondary: ${palette.secondary}\nAccent: ${palette.accent}`,
                                    `palette-${i}`
                                  )}
                                  className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
                                >
                                  {copiedId === `palette-${i}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                  Copy all
                                </button>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                {[
                                  { label: "Primary", val: palette.primary },
                                  { label: "Secondary", val: palette.secondary },
                                  { label: "Accent", val: palette.accent },
                                ].map(({ label, val }) => (
                                  <button
                                    key={label}
                                    onClick={() => handleCopy(val, `hex-${label}`)}
                                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                                  >
                                    <div className="w-3 h-3 rounded-sm" style={{ background: val }} />
                                    <span className="font-mono">{val}</span>
                                  </button>
                                ))}
                              </div>
                              {palette.description && (
                                <p className="text-xs text-white/30 mt-2 leading-relaxed">{palette.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Typography */}
                    {activeTab === "typography" && result.typography && (
                      <motion.div key="ty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div className="text-sm font-semibold text-white">✍️ Typography Pairings</div>
                        {(result.typography as TypographySuggestion[]).map((typo, i) => (
                          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="tag text-xs">{typo.mood}</span>
                              <span className="text-xs text-white/30">Pairing {i + 1}</span>
                            </div>
                            <div className="space-y-3 mb-4">
                              {[
                                { label: "Heading", font: typo.heading, size: "text-xl font-bold" },
                                { label: "Body", font: typo.body, size: "text-sm" },
                                { label: "Accent", font: typo.accent, size: "text-xs uppercase tracking-wider" },
                              ].map(({ label, font, size }) => (
                                <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                                  <span className="text-xs text-white/30 w-16 shrink-0">{label}</span>
                                  <span className={`${size} text-white/80 flex-1 text-center`}>{font}</span>
                                  <a
                                    href={`https://fonts.google.com/specimen/${font.replace(/\s+/g, "+")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-violet-400 hover:text-violet-300 shrink-0"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    ↗
                                  </a>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-white/40 leading-relaxed">{typo.pairing_reason}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Brand Names */}
                    {activeTab === "brand-names" && result.brand_names && (
                      <motion.div key="bn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="text-sm font-semibold text-white mb-4">💡 Alternative Brand Names</div>
                        <div className="grid grid-cols-2 gap-2">
                          {(result.brand_names as string[]).map((name, i) => (
                            <motion.button
                              key={i}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => handleCopy(name, `name-${i}`)}
                              className="flex items-center justify-between p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-violet-500/30 hover:bg-violet-500/5 transition-all group text-left"
                            >
                              <span className="font-display font-semibold text-sm text-white/80 group-hover:text-white">{name}</span>
                              {copiedId === `name-${i}` ? (
                                <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-white/20 group-hover:text-violet-400 transition-colors shrink-0" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Social Ideas */}
                    {activeTab === "social" && result.social_ideas && (
                      <motion.div key="si" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                        <div className="text-sm font-semibold text-white mb-4">📱 Social Media Ideas</div>
                        {(result.social_ideas as string[]).map((idea, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-3 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-violet-500/20 transition-all group"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[10px] font-bold text-white">{i + 1}</span>
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed flex-1">{idea}</p>
                            <button
                              onClick={() => handleCopy(idea, `social-${i}`)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-lg shrink-0"
                            >
                              {copiedId === `social-${i}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action bar */}
                <div className="border-t border-white/[0.06] p-4 flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleSave}
                    disabled={isSaving || isSaved}
                    className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border transition-all ${
                      isSaved
                        ? "border-pink-500/30 text-pink-400 bg-pink-500/10"
                        : "border-white/10 text-white/50 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Saved!" : isSaving ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
                  >
                    {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    {isExporting ? "Exporting..." : "Export Kit"}
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>

                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="ml-auto flex items-center gap-1.5 btn-glow text-xs px-4 py-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Regenerate
                  </button>
                </div>
              </motion.div>

            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-16 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600/20 to-blue-600/10 flex items-center justify-center mx-auto mb-6 animate-float">
                  <Wand2 className="w-10 h-10 text-violet-400" />
                </div>
                <div className="font-display text-xl font-semibold text-white mb-3">
                  Your brand identity appears here
                </div>
                <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed">
                  Fill in the form on the left and click{" "}
                  <span className="text-violet-400 font-medium">Generate Brand Identity</span>{" "}
                  to create a complete AI brand kit in seconds.
                </p>
                <div className="flex items-center justify-center gap-6 mt-8 text-xs text-white/25">
                  {["Logo Prompt", "Slogans", "Colors", "Fonts", "Names", "Social"].map((f) => (
                    <span key={f} className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-violet-500" />{f}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && shareUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl p-6 max-w-md w-full"
            >
              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3">
                  <Share2 className="w-6 h-6 text-violet-400" />
                </div>
                <div className="font-display text-lg font-bold text-white">Share your brand kit</div>
                <p className="text-white/40 text-sm mt-1">Anyone with this link can view your brand identity</p>
              </div>

              <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10 mb-4">
                <span className="text-xs text-white/60 flex-1 truncate font-mono">{shareUrl}</span>
                <button
                  onClick={() => {
                    copyToClipboard(shareUrl);
                    toast.success("Link copied!");
                  }}
                  className="btn-glow text-xs px-3 py-1.5 shrink-0"
                >
                  Copy
                </button>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-full py-2.5 text-sm text-white/40 hover:text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
