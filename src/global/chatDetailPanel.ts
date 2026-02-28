import { create } from "zustand";

interface ChatStoreState {
  isChatDetailsOpen: boolean; // Left drawer
  toggleChatDetails: () => void; // ✅ name matches implementation
  closeChatDetails: () => void;
  openChatDetails: () => void;
}

export const useChatDetailStore = create<ChatStoreState>((set) => ({
  isChatDetailsOpen: true,

  toggleChatDetails: () =>
    set((state) => ({ isChatDetailsOpen: !state.isChatDetailsOpen })),

  closeChatDetails: () => set({ isChatDetailsOpen: false }),

  openChatDetails: () => set({ isChatDetailsOpen: true }),
}));
