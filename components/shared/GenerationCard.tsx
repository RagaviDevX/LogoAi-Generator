"use client";

import { useState } from "react";
import { Heart, Trash2, Clock, Eye } from "lucide-react";
import { formatRelativeTime } from "@/utils";
import type { GenerationResult, ColorPalette } from "@/types";

interface Props {
  generation: GenerationResult;
  onFavoriteToggle: (gen: GenerationResult) => void;
  onDelete: (id: string) => void;
  onClick: () => void;
}

export default function GenerationCard({ generation, onFavoriteToggle, onDelete, onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  const palettes = Array.isArray(generation.color_palettes)
    ? (generation.color_palettes as ColorPalette[])
    : [];
  const p = palettes[0];

  return (
    <div
      className="glass-hover rounded-2xl overflow-hidden cursor-pointer group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Color preview */}
      <div className="flex h-20 relative overflow-hidden">
        {p ? (
          <>
            <div className="flex-1 transition-all duration-500" style={{ background: p.primary }} />
            <div className="flex-1 transition-all duration-500" style={{ background: p.secondary }} />
            <div className="flex-1 transition-all duration-500" style={{ background: p.accent }} />
          </>
        ) : (
          <div className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600" />
        )}

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-1.5 text-xs text-white font-medium">
            <Eye className="w-3.5 h-3.5" /> View Details
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-display font-semibold text-white text-sm truncate">
              {generation.brand_name}
            </div>
            <div className="text-xs text-white/40 mt-0.5 capitalize truncate">
              {generation.industry} · {generation.style}
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onFavoriteToggle(generation); }}
            className={`shrink-0 p-1.5 rounded-lg transition-all ${
              generation.is_favorite
                ? "text-pink-400 hover:bg-pink-500/10"
                : "text-white/20 hover:text-pink-400 hover:bg-pink-500/10"
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform hover:scale-110 ${generation.is_favorite ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-xs text-white/30">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(generation.created_at)}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(generation.id); }}
            className="p-1 text-white/15 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
