import type { TypographySuggestion } from "@/types";

interface Props {
  typography: TypographySuggestion;
  index: number;
}

export default function TypographyCard({ typography, index }: Props) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="tag">{typography.mood}</div>
        <span className="text-xs text-white/30">Pairing {index + 1}</span>
      </div>

      {/* Font preview */}
      <div className="space-y-4 mb-4">
        <div>
          <div className="text-xs text-white/30 uppercase tracking-widest mb-1.5">Heading</div>
          <div
            className="text-xl font-bold text-white"
            style={{ fontFamily: `"${typography.heading}", sans-serif` }}
          >
            {typography.heading}
          </div>
          <div className="text-xs text-white/40 mt-0.5">Use for: titles, hero text, display</div>
        </div>

        <div>
          <div className="text-xs text-white/30 uppercase tracking-widest mb-1.5">Body</div>
          <div
            className="text-sm text-white/70"
            style={{ fontFamily: `"${typography.body}", sans-serif` }}
          >
            {typography.body} — The quick brown fox jumps over the lazy dog.
          </div>
          <div className="text-xs text-white/40 mt-0.5">Use for: paragraphs, descriptions</div>
        </div>

        <div>
          <div className="text-xs text-white/30 uppercase tracking-widest mb-1.5">Accent</div>
          <div
            className="text-sm text-violet-300"
            style={{ fontFamily: `"${typography.accent}", sans-serif` }}
          >
            {typography.accent}
          </div>
          <div className="text-xs text-white/40 mt-0.5">Use for: labels, captions, UI text</div>
        </div>
      </div>

      {/* Rationale */}
      <div className="pt-4 border-t border-white/5">
        <p className="text-xs text-white/40 leading-relaxed">{typography.pairing_reason}</p>
      </div>

      {/* Google Fonts link */}
      <div className="mt-3 flex gap-2">
        {[typography.heading, typography.body].map((font) => (
          <a
            key={font}
            href={`https://fonts.google.com/specimen/${font.replace(/\s+/g, "+")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            {font} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
