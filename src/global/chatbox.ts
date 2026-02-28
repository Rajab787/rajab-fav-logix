import { create } from "zustand";

interface ChatStoreState {
  isChatListOpen: boolean; // Left drawer
  toggleChatList: () => void;
  closeChatList: () => void;
  openChatList: () => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  isChatListOpen: true,

  toggleChatList: () =>
    set((state) => ({ isChatListOpen: !state.isChatListOpen })),

  closeChatList: () => set({ isChatListOpen: false }),

  openChatList: () => set({ isChatListOpen: true }),
}));
