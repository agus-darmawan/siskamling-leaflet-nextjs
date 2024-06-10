import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TileState {
  selectedTile: string | null;
  setSelectedTile: (tile: string) => void;
  getSelectedTile: () => string | null;
}

const useTileStore = create<TileState>()(
    persist(
      (set, get) => ({
      selectedTile: "Default",
      setSelectedTile: (tile) => set({ selectedTile: tile }),
      getSelectedTile: () => get().selectedTile,
    }),
    {
      name: 'tile-store', 
    }
  )
);

export default useTileStore;
