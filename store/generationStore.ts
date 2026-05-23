import { create } from "zustand";
import type { GenerationResult } from "@/types";

interface GenerationStore {
  currentResult: Partial<GenerationResult> | null;
  isGenerating: boolean;
  history: Partial<GenerationResult>[];
  setResult: (result: Partial<GenerationResult> | null) => void;
  setGenerating: (v: boolean) => void;
  addToHistory: (result: Partial<GenerationResult>) => void;
  clearResult: () => void;
}

export const useGenerationStore = create<GenerationStore>((set) => ({
  currentResult: null,
  isGenerating: false,
  history: [],

  setResult: (result) => set({ currentResult: result }),
  setGenerating: (v) => set({ isGenerating: v }),
  addToHistory: (result) =>
    set((state) => ({
      history: [result, ...state.history].slice(0, 20),
    })),
  clearResult: () => set({ currentResult: null }),
}));
