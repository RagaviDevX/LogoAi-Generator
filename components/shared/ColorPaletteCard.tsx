"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import type { ColorPalette } from "@/types";
import { getContrastColor } from "@/utils";

interface Props {
  palette: ColorPalette;
  index: number;
}

export default function ColorPaletteCard({ palette, index }: Props) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    toast.success(`Copied ${hex}`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const swatches = [
    { label: "Primary", color: palette.primary },
    { label: "Secondary", color: palette.secondary },
    { label: "Accent", color: palette.accent },
    { label: "Background", color: palette.background },
    { label: "Text", color: palette.text },
  ];

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Swatch bar */}
      <div className="flex h-14">
        {swatches.map(({ color }) => (
          <div
            key={color}
            className="flex-1 transition-transform hover:scale-y-110 origin-bottom cursor-pointer"
            style={{ background: color }}
            onClick={() => handleCopyColor(color)}
          />
        ))}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold text-white">{palette.name}</div>
            <div className="text-xs text-white/40 mt-0.5">Palette {index + 1}</div>
          </div>
        </div>

        {/* Color list */}
        <div className="space-y-1.5">
          {swatches.map(({ label, color }) => (
            <button
              key={label}
              onClick={() => handleCopyColor(color)}
              className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-md ring-1 ring-white/10"
                  style={{ background: color }}
                />
                <span className="text-xs text-white/50">{label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors">
                  {color}
                </span>
                {copiedColor === color ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-white/20 group-hover:text-white/50 transition-colors" />
                )}
              </div>
            </button>
          ))}
        </div>

        {palette.description && (
          <p className="text-xs text-white/30 mt-3 pt-3 border-t border-white/5 leading-relaxed">
            {palette.description}
          </p>
        )}
      </div>
    </div>
  );
}
