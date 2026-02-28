import { create } from "zustand";

type PolygonStage = "idle" | "loading" | "closing" | "loaded";

interface PolygonStore {
  activePolygonId: string | null;
  stage: PolygonStage;

  setActivePolygon: (id: string | null) => void;
  setStage: (stage: PolygonStage) => void;
  resetPolygon: () => void;
}

export const usePolygonStore = create<PolygonStore>((set) => ({
  activePolygonId: null,
  stage: "idle",

  setActivePolygon: (id) =>
    set({
      activePolygonId: id,
      stage: id ? "loading" : "idle",
    }),

  setStage: (stage) => set({ stage }),

  resetPolygon: () =>
    set({
      activePolygonId: null,
      stage: "idle",
    }),
}));