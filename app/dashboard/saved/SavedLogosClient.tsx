"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, Copy, BookmarkCheck, Wand2, Clock, Filter, Search } from "lucide-react";
import toast from "react-hot-toast";
import { formatRelativeTime, copyToClipboard } from "@/utils";
import { createClient } from "@/lib/supabase/client";
import type { GenerationResult, ColorPalette } from "@/types";

interface Props {
  initialGenerations: GenerationResult[];
}

export default function SavedLogosClient({ initialGenerations }: Props) {
  const [generations, setGenerations] = useState(initialGenerations);
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<GenerationResult | null>(null);
  const supabase = createClient();

  const filtered = generations.filter((g) => {
    if (filter === "favorites" && !g.is_favorite) return false;
    if (search && !g.brand_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleFavorite = async (gen: GenerationResult) => {
    const { error } = await supabase
      .from("logo_generations")
      .update({ is_favorite: !gen.is_favorite })
      .eq("id", gen.id);

    if (!error) {
      setGenerations((prev) =>
        prev.map((g) => g.id === gen.id ? { ...g, is_favorite: !g.is_favorite } : g)
      );
      toast.success(gen.is_favorite ? "Removed from favorites" : "Added to favorites");
    }
  };

  const deleteGeneration = async (id: string) => {
    const { error } = await supabase.from("logo_generations").delete().eq("id", id);
    if (!error) {
      setGenerations((prev) => prev.filter((g) => g.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success("Deleted");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Saved Logos</h1>
          <p className="text-white/40 text-sm">{generations.length} generations in your library</p>
        </div>
        <Link href="/dashboard/generate" className="btn-glow flex items-center gap-2 self-start sm:self-auto text-sm px-5 py-2.5">
          <Wand2 className="w-4 h-4" />
          New Generation
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand names..."
            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-violet-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "favorites"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
                  : "border border-white/8 text-white/40 hover:text-white hover:border-white/15"
              }`}
            >
              {f === "favorites" && <Heart className="w-3.5 h-3.5" />}
              {f === "all" && <Filter className="w-3.5 h-3.5" />}
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <BookmarkCheck className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <div className="font-medium text-white mb-2">No saved logos yet</div>
          <p className="text-white/40 text-sm mb-5">
            {filter === "favorites" ? "Mark some logos as favorite to see them here" : "Generate your first brand identity to get started"}
          </p>
          <Link href="/dashboard/generate" className="btn-glow inline-flex items-center gap-2 text-sm px-5 py-2.5">
            <Wand2 className="w-4 h-4" />
            Generate Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((gen) => {
            const palettes = Array.isArray(gen.color_palettes) ? gen.color_palettes as ColorPalette[] : [];
            const p = palettes[0];
            return (
              <motion.div
                key={gen.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-hover rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelected(gen)}
              >
                {/* Color strip */}
                <div className="flex h-20">
                  {p ? (
                    <>
                      <div className="flex-1" style={{ background: p.primary }} />
                      <div className="flex-1" style={{ background: p.secondary }} />
                      <div className="flex-1" style={{ background: p.accent }} />
                    </>
                  ) : (
                    <div className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600" />
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="font-display font-semibold text-white">{gen.brand_name}</div>
                      <div className="text-xs text-white/40 mt-0.5 capitalize">{gen.industry} · {gen.style}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(gen); }}
                      className={`p-1.5 rounded-lg transition-colors ${gen.is_favorite ? "text-pink-400" : "text-white/20 hover:text-pink-400"}`}
                    >
                      <Heart className={`w-4 h-4 ${gen.is_favorite ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-xs text-white/30">
                      <Clock className="w-3 h-3" />
                      {formatRelativeTime(gen.created_at)}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteGeneration(gen.id); }}
                      className="p-1.5 text-white/20 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-display text-xl font-bold text-white">{selected.brand_name}</div>
                  <div className="text-xs text-white/40 mt-0.5 capitalize">{selected.industry} · {selected.style}</div>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 text-white/40 hover:text-white rounded-xl hover:bg-white/5">✕</button>
              </div>

              {/* Colors */}
              {Array.isArray(selected.color_palettes) && selected.color_palettes.length > 0 && (
                <div className="mb-5">
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Colors</div>
                  <div className="flex gap-2">
                    {Object.values((selected.color_palettes as ColorPalette[])[0]).slice(0, 5).map((color, i) =>
                      typeof color === "string" && color.startsWith("#") ? (
                        <div key={i} className="w-10 h-10 rounded-xl" style={{ background: color }} title={color} />
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* Logo prompt */}
              {selected.logo_prompt && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-white/30 uppercase tracking-widest">Logo Prompt</div>
                    <button
                      onClick={() => copyToClipboard(selected.logo_prompt!).then(() => toast.success("Copied!"))}
                      className="text-xs text-violet-400 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <div className="text-sm text-white/60 bg-white/3 rounded-xl p-3 font-mono leading-relaxed">
                    {selected.logo_prompt}
                  </div>
                </div>
              )}

              {/* Slogans */}
              {Array.isArray(selected.slogans) && selected.slogans.length > 0 && (
                <div>
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Slogans</div>
                  <div className="space-y-2">
                    {(selected.slogans as string[]).slice(0, 4).map((s, i) => (
                      <div key={i} className="text-sm text-white/70 bg-white/3 rounded-xl px-3 py-2">"{s}"</div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
