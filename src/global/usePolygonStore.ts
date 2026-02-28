import { create } from "zustand";

type PolygonStage = "idle" | "loading" | "closing" | "loaded";

interface PolygonStore {
  activePolygon: string | null;

  stage: PolygonStage;

  setActivePolygon: (label: string) => void;
  setStage: (stage: PolygonStage) => void;

  resetPolygon: () => void;
}

export const usePolygonStore = create<PolygonStore>((set) => ({
  activePolygon: null,
  stage: "idle",

  setActivePolygon: (label) =>
    set({
      activePolygon: label,
      stage: "loading",
    }),

  setStage: (stage) => set({ stage }),

  resetPolygon: () =>
    set({
      activePolygon: null,
      stage: "idle",
    }),
}));
